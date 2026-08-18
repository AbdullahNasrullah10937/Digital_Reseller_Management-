"""
Partner dashboard summary endpoint.
GET /api/v1/partners/dashboard — returns aggregated stats for the logged-in partner.
"""
import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select, func
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.models import Partner, Deal, Commission
from app.core.auth import get_current_user, AuthUser

router = APIRouter(prefix="/partners", tags=["partners"])


class DashboardResponse(BaseModel):
    total_revenue: float
    pending_commission: float
    paid_commission: float
    active_deals: int
    tier: str
    commission_rate: float
    referral_code: str
    full_name: str
    company_name: str
    recent_deals: list


@router.get("/dashboard", response_model=DashboardResponse)
async def get_partner_dashboard(
    current_user: AuthUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Returns aggregated dashboard statistics for the currently authenticated partner."""
    # Get partner profile
    result = await db.execute(
        select(Partner).where(Partner.user_id == uuid.UUID(current_user.user_id))
    )
    partner = result.scalar_one_or_none()
    if not partner:
        raise HTTPException(status_code=404, detail="Partner profile not found for this user.")

    # Active deals count (PENDING_APPROVAL + APPROVED)
    active_result = await db.execute(
        select(func.count()).where(
            Deal.partner_id == partner.id,
            Deal.status.in_(["PENDING_APPROVAL", "APPROVED"]),
        )
    )
    active_deals = active_result.scalar() or 0

    # Total revenue from WON deals
    revenue_result = await db.execute(
        select(func.sum(Deal.estimated_value)).where(
            Deal.partner_id == partner.id,
            Deal.status == "WON",
        )
    )
    total_revenue = float(revenue_result.scalar() or 0)

    # Pending commission (PENDING status in commissions)
    pending_comm_result = await db.execute(
        select(func.sum(Commission.commission_amount)).where(
            Commission.partner_id == partner.id,
            Commission.status == "PENDING",
        )
    )
    pending_commission = float(pending_comm_result.scalar() or 0)

    # Paid commission total
    paid_comm_result = await db.execute(
        select(func.sum(Commission.commission_amount)).where(
            Commission.partner_id == partner.id,
            Commission.status == "PAID",
        )
    )
    paid_commission = float(paid_comm_result.scalar() or 0)

    # 5 most recent deals
    recent_result = await db.execute(
        select(Deal)
        .where(Deal.partner_id == partner.id)
        .order_by(Deal.created_at.desc())
        .limit(5)
    )
    recent_deals_raw = recent_result.scalars().all()
    recent_deals = [
        {
            "id": str(d.id),
            "customer_name": d.customer_name,
            "status": d.status,
            "estimated_value": float(d.estimated_value),
            "currency": d.currency,
            "created_at": d.created_at.isoformat(),
        }
        for d in recent_deals_raw
    ]

    return DashboardResponse(
        total_revenue=total_revenue,
        pending_commission=pending_commission,
        paid_commission=paid_commission,
        active_deals=active_deals,
        tier=partner.tier,
        commission_rate=float(partner.commission_rate),
        referral_code=partner.referral_code,
        full_name=partner.full_name,
        company_name=partner.company_name,
        recent_deals=recent_deals,
    )
