"""
Commissions & Payouts API.
GET  /api/v1/commissions              — partner views their commissions
POST /api/v1/commissions/payout-request — partner requests a payout
GET  /api/v1/admin/commissions        — admin views all commissions
POST /api/v1/admin/commissions/{id}/approve — admin approves commission (customer payment confirmed)
GET  /api/v1/admin/payouts            — admin views all payout requests
POST /api/v1/admin/payouts/{id}/mark-paid — admin marks payout as paid
"""
import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.models import Commission, Payout, Partner
from app.core.auth import get_current_user, require_admin, AuthUser
from app.core.config import settings

partner_router = APIRouter(tags=["commissions"])
admin_router = APIRouter(tags=["admin-commissions"])


# ── Schemas ────────────────────────────────────────────────────────────────────

class CommissionResponse(BaseModel):
    id: str
    deal_id: str
    deal_value: float
    applied_tier: str
    commission_rate: float
    commission_amount: float
    currency: str
    status: str
    approved_at: Optional[datetime]
    paid_at: Optional[datetime]
    created_at: datetime


class PayoutResponse(BaseModel):
    id: str
    partner_id: str
    total_amount: float
    currency: str
    status: str
    payment_method: str
    transaction_reference: Optional[str]
    notes: Optional[str]
    paid_at: Optional[datetime]
    created_at: datetime


class PayoutRequestCreate(BaseModel):
    currency: str = "USD"


class MarkPaidRequest(BaseModel):
    transaction_reference: str


# ── Partner Endpoints ─────────────────────────────────────────────────────────

@partner_router.get("/commissions", response_model=list[CommissionResponse])
async def get_my_commissions(
    current_user: AuthUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Partner: view their own commissions across all won deals."""
    partner_result = await db.execute(
        select(Partner).where(Partner.user_id == uuid.UUID(current_user.user_id))
    )
    partner = partner_result.scalar_one_or_none()
    if not partner:
        raise HTTPException(404, "Partner profile not found.")

    result = await db.execute(
        select(Commission)
        .where(Commission.partner_id == partner.id)
        .order_by(Commission.created_at.desc())
    )
    commissions = result.scalars().all()

    return [
        CommissionResponse(
            id=str(c.id),
            deal_id=str(c.deal_id),
            deal_value=float(c.deal_value),
            applied_tier=c.applied_tier,
            commission_rate=float(c.commission_rate),
            commission_amount=float(c.commission_amount),
            currency=c.currency,
            status=c.status,
            approved_at=c.approved_at,
            paid_at=c.paid_at,
            created_at=c.created_at,
        )
        for c in commissions
    ]


@partner_router.post("/commissions/payout-request", status_code=status.HTTP_201_CREATED)
async def request_payout(
    payload: PayoutRequestCreate,
    current_user: AuthUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """
    Partner requests a payout.
    Only allowed if total APPROVED unpaid commission >= minimum threshold.
    PKR threshold: 5,000 | USD threshold: 50
    """
    partner_result = await db.execute(
        select(Partner).where(Partner.user_id == uuid.UUID(current_user.user_id))
    )
    partner = partner_result.scalar_one_or_none()
    if not partner:
        raise HTTPException(404, "Partner profile not found.")

    # Sum all APPROVED commissions not yet in a payout
    total_result = await db.execute(
        select(func.sum(Commission.commission_amount))
        .where(
            Commission.partner_id == partner.id,
            Commission.status == "APPROVED",
            Commission.payout_id == None,
            Commission.currency == payload.currency,
        )
    )
    total = float(total_result.scalar() or 0)

    threshold = settings.MIN_PAYOUT_THRESHOLD_PKR if payload.currency == "PKR" else settings.MIN_PAYOUT_THRESHOLD_USD
    if total < threshold:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Total approved commission ({payload.currency} {total:,.2f}) is below the minimum payout threshold ({payload.currency} {threshold:,.2f}).",
        )

    # Create payout
    payout = Payout(
        id=uuid.uuid4(),
        partner_id=partner.id,
        total_amount=total,
        currency=payload.currency,
        status="REQUESTED",
        payment_method="BANK_TRANSFER",
        created_at=datetime.now(timezone.utc),
    )
    db.add(payout)
    await db.flush()  # get payout.id

    # Link APPROVED commissions to this payout
    all_approved = await db.execute(
        select(Commission).where(
            Commission.partner_id == partner.id,
            Commission.status == "APPROVED",
            Commission.payout_id == None,
            Commission.currency == payload.currency,
        )
    )
    for comm in all_approved.scalars().all():
        comm.payout_id = payout.id

    await db.commit()

    return {
        "message": "Payout request submitted.",
        "payout_id": str(payout.id),
        "total_amount": total,
        "currency": payload.currency,
        "status": "REQUESTED",
    }


# ── Admin Endpoints ────────────────────────────────────────────────────────────

@admin_router.get("/admin/commissions", response_model=list[CommissionResponse])
async def admin_list_commissions(
    admin: AuthUser = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    status_filter: Optional[str] = None,
):
    """Admin: view all commissions across all partners."""
    query = select(Commission).order_by(Commission.created_at.desc())
    if status_filter:
        query = query.where(Commission.status == status_filter.upper())

    result = await db.execute(query)
    commissions = result.scalars().all()

    return [
        CommissionResponse(
            id=str(c.id),
            deal_id=str(c.deal_id),
            deal_value=float(c.deal_value),
            applied_tier=c.applied_tier,
            commission_rate=float(c.commission_rate),
            commission_amount=float(c.commission_amount),
            currency=c.currency,
            status=c.status,
            approved_at=c.approved_at,
            paid_at=c.paid_at,
            created_at=c.created_at,
        )
        for c in commissions
    ]


@admin_router.post("/admin/commissions/{comm_id}/approve")
async def approve_commission(
    comm_id: str,
    admin: AuthUser = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """Admin approves a commission — indicates customer payment has been confirmed."""
    result = await db.execute(select(Commission).where(Commission.id == uuid.UUID(comm_id)))
    commission = result.scalar_one_or_none()
    if not commission:
        raise HTTPException(404, "Commission not found.")
    if commission.status != "PENDING":
        raise HTTPException(400, f"Commission is already {commission.status}.")

    commission.status = "APPROVED"
    commission.approved_at = datetime.now(timezone.utc)
    await db.commit()

    return {"message": "Commission approved.", "commission_id": comm_id}


@admin_router.get("/admin/payouts", response_model=list[PayoutResponse])
async def admin_list_payouts(
    admin: AuthUser = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """Admin: list all payout requests."""
    result = await db.execute(select(Payout).order_by(Payout.created_at.desc()))
    payouts = result.scalars().all()

    return [
        PayoutResponse(
            id=str(p.id),
            partner_id=str(p.partner_id),
            total_amount=float(p.total_amount),
            currency=p.currency,
            status=p.status,
            payment_method=p.payment_method,
            transaction_reference=p.transaction_reference,
            notes=p.notes,
            paid_at=p.paid_at,
            created_at=p.created_at,
        )
        for p in payouts
    ]


@admin_router.post("/admin/payouts/{payout_id}/mark-paid")
async def mark_payout_paid(
    payout_id: str,
    payload: MarkPaidRequest,
    admin: AuthUser = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """
    Admin marks a payout as Paid after manually sending the bank transfer.
    Updates all linked commission records to PAID status.
    """
    result = await db.execute(select(Payout).where(Payout.id == uuid.UUID(payout_id)))
    payout = result.scalar_one_or_none()
    if not payout:
        raise HTTPException(404, "Payout not found.")
    if payout.status == "PAID":
        raise HTTPException(400, "Payout already marked as Paid.")

    payout.status = "PAID"
    payout.transaction_reference = payload.transaction_reference
    payout.processed_by_id = uuid.UUID(admin.user_id)
    payout.paid_at = datetime.now(timezone.utc)

    # Mark all linked commissions as PAID
    comm_result = await db.execute(
        select(Commission).where(Commission.payout_id == payout.id)
    )
    for comm in comm_result.scalars().all():
        comm.status = "PAID"
        comm.paid_at = datetime.now(timezone.utc)

    await db.commit()
    return {"message": "Payout marked as Paid.", "payout_id": payout_id, "transaction_reference": payload.transaction_reference}
