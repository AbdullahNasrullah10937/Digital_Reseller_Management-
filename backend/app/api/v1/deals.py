"""
Deals API — partner deal registration and admin approval workflow.
POST   /api/v1/deals          — partner registers a deal (auth required)
GET    /api/v1/deals          — partner views their own deals
GET    /api/v1/admin/deals    — admin views all deals
POST   /api/v1/admin/deals/{id}/approve    — admin approves
POST   /api/v1/admin/deals/{id}/reject     — admin rejects
POST   /api/v1/admin/deals/{id}/mark-won  — admin marks as Won → triggers commission
POST   /api/v1/admin/deals/{id}/mark-lost — admin marks as Lost
"""
import uuid
from datetime import datetime, timezone, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy import select, or_
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.models import Deal, Partner, Product, Commission, DealStatusHistory
from app.core.auth import get_current_user, require_admin, AuthUser
from app.core.config import settings

router = APIRouter(tags=["deals"])


# ── Schemas ───────────────────────────────────────────────────────────────────

class DealCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_phone: Optional[str] = None
    industry: str
    country: str
    product_id: str
    estimated_value: float
    currency: str = "USD"
    expected_close_date: str  # ISO date string YYYY-MM-DD
    notes: Optional[str] = None


class DealResponse(BaseModel):
    id: str
    customer_name: str
    customer_email: str
    industry: str
    country: str
    product_name: str
    estimated_value: float
    currency: str
    status: str
    is_flagged_duplicate: bool
    protection_expiry_date: Optional[datetime]
    created_at: datetime


class ApproveDealRequest(BaseModel):
    protection_days: int = 60


class RejectDealRequest(BaseModel):
    rejection_reason: str


# ── Partner Routes ────────────────────────────────────────────────────────────

partner_router = APIRouter(prefix="/deals")
admin_router = APIRouter(prefix="/admin/deals")


@partner_router.post("", response_model=DealResponse, status_code=status.HTTP_201_CREATED)
async def register_deal(
    payload: DealCreate,
    current_user: AuthUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Partner registers a new deal. Performs duplicate customer check."""
    # Get partner record
    partner_result = await db.execute(
        select(Partner).where(Partner.user_id == uuid.UUID(current_user.user_id))
    )
    partner = partner_result.scalar_one_or_none()
    if not partner:
        raise HTTPException(status_code=404, detail="Partner profile not found.")

    # Get product
    product_result = await db.execute(
        select(Product).where(Product.id == uuid.UUID(payload.product_id))
    )
    product = product_result.scalar_one_or_none()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found.")

    # Non-blocking duplicate check: flag if same customer email already has an active deal
    dup_result = await db.execute(
        select(Deal).where(
            Deal.customer_email == payload.customer_email,
            Deal.status.in_(["PENDING_APPROVAL", "APPROVED", "WON"]),
        )
    )
    existing = dup_result.scalar_one_or_none()
    is_flagged = existing is not None
    dup_notes = f"Duplicate: customer email already in deal {existing.id}" if existing else None

    deal = Deal(
        id=uuid.uuid4(),
        partner_id=partner.id,
        customer_name=payload.customer_name,
        customer_email=payload.customer_email,
        customer_phone=payload.customer_phone,
        industry=payload.industry,
        country=payload.country,
        product_id=uuid.UUID(payload.product_id),
        estimated_value=payload.estimated_value,
        currency=payload.currency,
        expected_close_date=datetime.fromisoformat(payload.expected_close_date).date(),
        status="PENDING_APPROVAL",
        is_flagged_duplicate=is_flagged,
        duplicate_notes=dup_notes,
        notes=payload.notes,
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc),
    )
    db.add(deal)
    await db.commit()
    await db.refresh(deal)

    return DealResponse(
        id=str(deal.id),
        customer_name=deal.customer_name,
        customer_email=deal.customer_email,
        industry=deal.industry,
        country=deal.country,
        product_name=product.name,
        estimated_value=float(deal.estimated_value),
        currency=deal.currency,
        status=deal.status,
        is_flagged_duplicate=deal.is_flagged_duplicate,
        protection_expiry_date=deal.protection_expiry_date,
        created_at=deal.created_at,
    )


@partner_router.get("", response_model=list[DealResponse])
async def get_my_deals(
    current_user: AuthUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Partner views only their own registered deals."""
    partner_result = await db.execute(
        select(Partner).where(Partner.user_id == uuid.UUID(current_user.user_id))
    )
    partner = partner_result.scalar_one_or_none()
    if not partner:
        raise HTTPException(status_code=404, detail="Partner profile not found.")

    result = await db.execute(
        select(Deal, Product.name.label("product_name"))
        .join(Product, Deal.product_id == Product.id)
        .where(Deal.partner_id == partner.id)
        .order_by(Deal.created_at.desc())
    )
    rows = result.all()

    return [
        DealResponse(
            id=str(row.Deal.id),
            customer_name=row.Deal.customer_name,
            customer_email=row.Deal.customer_email,
            industry=row.Deal.industry,
            country=row.Deal.country,
            product_name=row.product_name,
            estimated_value=float(row.Deal.estimated_value),
            currency=row.Deal.currency,
            status=row.Deal.status,
            is_flagged_duplicate=row.Deal.is_flagged_duplicate,
            protection_expiry_date=row.Deal.protection_expiry_date,
            created_at=row.Deal.created_at,
        )
        for row in rows
    ]


# ── Admin Routes ──────────────────────────────────────────────────────────────

@admin_router.get("", response_model=list[DealResponse])
async def admin_list_deals(
    admin: AuthUser = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    status_filter: Optional[str] = None,
):
    """Admin: view all deals across all partners."""
    query = (
        select(Deal, Product.name.label("product_name"))
        .join(Product, Deal.product_id == Product.id)
        .order_by(Deal.created_at.desc())
    )
    if status_filter:
        query = query.where(Deal.status == status_filter.upper())

    result = await db.execute(query)
    rows = result.all()

    return [
        DealResponse(
            id=str(row.Deal.id),
            customer_name=row.Deal.customer_name,
            customer_email=row.Deal.customer_email,
            industry=row.Deal.industry,
            country=row.Deal.country,
            product_name=row.product_name,
            estimated_value=float(row.Deal.estimated_value),
            currency=row.Deal.currency,
            status=row.Deal.status,
            is_flagged_duplicate=row.Deal.is_flagged_duplicate,
            protection_expiry_date=row.Deal.protection_expiry_date,
            created_at=row.Deal.created_at,
        )
        for row in rows
    ]


@admin_router.post("/{deal_id}/approve")
async def approve_deal(
    deal_id: str,
    payload: ApproveDealRequest,
    admin: AuthUser = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    deal = await _get_deal(deal_id, db)
    if deal.status != "PENDING_APPROVAL":
        raise HTTPException(400, detail=f"Deal is already {deal.status}.")

    protection_days = payload.protection_days or settings.DEFAULT_DEAL_PROTECTION_DAYS
    deal.status = "APPROVED"
    deal.protection_expiry_date = datetime.now(timezone.utc) + timedelta(days=protection_days)
    deal.reviewed_by_id = uuid.UUID(admin.user_id)
    deal.reviewed_at = datetime.now(timezone.utc)
    deal.updated_at = datetime.now(timezone.utc)
    await db.commit()

    return {"message": "Deal approved.", "deal_id": deal_id, "protection_expires": deal.protection_expiry_date.isoformat()}


@admin_router.post("/{deal_id}/reject")
async def reject_deal(
    deal_id: str,
    payload: RejectDealRequest,
    admin: AuthUser = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    deal = await _get_deal(deal_id, db)
    deal.status = "REJECTED"
    deal.rejection_reason = payload.rejection_reason
    deal.reviewed_by_id = uuid.UUID(admin.user_id)
    deal.reviewed_at = datetime.now(timezone.utc)
    deal.updated_at = datetime.now(timezone.utc)
    await db.commit()
    return {"message": "Deal rejected.", "deal_id": deal_id}


@admin_router.post("/{deal_id}/mark-won")
async def mark_deal_won(
    deal_id: str,
    admin: AuthUser = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """
    Admin marks deal as Won → automatically calculates and creates a Commission record.
    Commission = deal.estimated_value × partner.commission_rate / 100
    """
    deal = await _get_deal(deal_id, db)
    if deal.status not in ("APPROVED",):
        raise HTTPException(400, detail="Only APPROVED deals can be marked as Won.")

    # Get partner commission rate
    partner_result = await db.execute(select(Partner).where(Partner.id == deal.partner_id))
    partner = partner_result.scalar_one_or_none()
    if not partner:
        raise HTTPException(404, detail="Partner not found.")

    commission_rate = float(partner.commission_rate)
    commission_amount = float(deal.estimated_value) * commission_rate / 100

    deal.status = "WON"
    deal.updated_at = datetime.now(timezone.utc)

    # Create commission record (idempotent — unique constraint on deal_id)
    commission = Commission(
        id=uuid.uuid4(),
        deal_id=deal.id,
        partner_id=partner.id,
        deal_value=deal.estimated_value,
        applied_tier=partner.tier,
        commission_rate=partner.commission_rate,
        commission_amount=commission_amount,
        currency=deal.currency,
        status="PENDING",
        created_at=datetime.now(timezone.utc),
    )
    db.add(commission)
    await db.commit()

    return {
        "message": "Deal marked as Won. Commission created.",
        "deal_id": deal_id,
        "commission_amount": commission_amount,
        "currency": deal.currency,
        "commission_rate": commission_rate,
    }


@admin_router.post("/{deal_id}/mark-lost")
async def mark_deal_lost(
    deal_id: str,
    admin: AuthUser = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    deal = await _get_deal(deal_id, db)
    deal.status = "LOST"
    deal.updated_at = datetime.now(timezone.utc)
    await db.commit()
    return {"message": "Deal marked as Lost.", "deal_id": deal_id}


# ── Helpers ────────────────────────────────────────────────────────────────────

async def _get_deal(deal_id: str, db: AsyncSession) -> Deal:
    result = await db.execute(select(Deal).where(Deal.id == uuid.UUID(deal_id)))
    deal = result.scalar_one_or_none()
    if not deal:
        raise HTTPException(status_code=404, detail="Deal not found.")
    return deal
