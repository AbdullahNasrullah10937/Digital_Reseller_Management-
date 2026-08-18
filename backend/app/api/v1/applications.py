"""
Partner Application endpoint.
POST /api/v1/applications — public, no auth required (applicants haven't signed in yet).
GET  /api/v1/applications — Admin only: list all applications.
"""
import uuid
from datetime import datetime, timezone
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db.session import get_db
from app.models.models import PartnerApplication
from app.core.auth import require_admin, AuthUser

router = APIRouter(prefix="/applications", tags=["applications"])


# ── Schemas ───────────────────────────────────────────────────────────────────

class ApplicationCreate(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    company_name: str
    country: str
    city: str
    industry_focus: str
    website: Optional[str] = None
    preferred_tier: Optional[str] = None


class ApplicationResponse(BaseModel):
    id: str
    full_name: str
    email: str
    phone: str
    company_name: str
    country: str
    city: str
    industry_focus: str
    website: Optional[str]
    preferred_tier: Optional[str]
    status: str
    rejection_reason: Optional[str]
    created_at: datetime

    class Config:
        from_attributes = True


class ApproveApplicationRequest(BaseModel):
    assigned_tier: str   # e.g. RESELLER
    assigned_rate: float  # e.g. 30.0


class RejectApplicationRequest(BaseModel):
    rejection_reason: str


# ── Endpoints ─────────────────────────────────────────────────────────────────

@router.post("", response_model=ApplicationResponse, status_code=status.HTTP_201_CREATED)
async def submit_application(
    payload: ApplicationCreate,
    db: AsyncSession = Depends(get_db),
):
    """
    Public endpoint — creates a new partner application with status PENDING_REVIEW.
    No authentication required (the applicant hasn't been approved yet).
    """
    # Check for duplicate email
    existing = await db.execute(
        select(PartnerApplication).where(
            PartnerApplication.email == payload.email,
            PartnerApplication.status == "PENDING_REVIEW"
        )
    )
    if existing.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="An application with this email is already pending review.",
        )

    application = PartnerApplication(
        id=uuid.uuid4(),
        full_name=payload.full_name,
        email=payload.email,
        phone=payload.phone,
        company_name=payload.company_name,
        country=payload.country,
        city=payload.city,
        industry_focus=payload.industry_focus,
        website=payload.website,
        preferred_tier=payload.preferred_tier,
        status="PENDING_REVIEW",
        created_at=datetime.now(timezone.utc),
    )
    db.add(application)
    await db.commit()
    await db.refresh(application)

    return ApplicationResponse(
        id=str(application.id),
        full_name=application.full_name,
        email=application.email,
        phone=application.phone,
        company_name=application.company_name,
        country=application.country,
        city=application.city,
        industry_focus=application.industry_focus,
        website=application.website,
        preferred_tier=application.preferred_tier,
        status=application.status,
        rejection_reason=application.rejection_reason,
        created_at=application.created_at,
    )


@router.get("", response_model=list[ApplicationResponse])
async def list_applications(
    admin: AuthUser = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
    status_filter: Optional[str] = None,
):
    """Admin only: list all partner applications, optionally filtered by status."""
    query = select(PartnerApplication).order_by(PartnerApplication.created_at.desc())
    if status_filter:
        query = query.where(PartnerApplication.status == status_filter.upper())
    result = await db.execute(query)
    apps = result.scalars().all()
    return [
        ApplicationResponse(
            id=str(a.id),
            full_name=a.full_name,
            email=a.email,
            phone=a.phone,
            company_name=a.company_name,
            country=a.country,
            city=a.city,
            industry_focus=a.industry_focus,
            website=a.website,
            preferred_tier=a.preferred_tier,
            status=a.status,
            rejection_reason=a.rejection_reason,
            created_at=a.created_at,
        )
        for a in apps
    ]


@router.post("/{app_id}/approve", status_code=status.HTTP_200_OK)
async def approve_application(
    app_id: str,
    payload: ApproveApplicationRequest,
    admin: AuthUser = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """
    Admin: approve a partner application.
    Creates a User + Partner record in the database.
    The partner can then be sent credentials to log in.
    """
    app_uuid = uuid.UUID(app_id)
    result = await db.execute(select(PartnerApplication).where(PartnerApplication.id == app_uuid))
    application = result.scalar_one_or_none()

    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    if application.status != "PENDING_REVIEW":
        raise HTTPException(status_code=400, detail=f"Application is already {application.status}.")

    application.status = "APPROVED"
    application.reviewed_at = datetime.now(timezone.utc)
    # Store assigned tier and rate for the onboarding step
    application.preferred_tier = payload.assigned_tier

    await db.commit()

    return {
        "message": "Application approved.",
        "application_id": app_id,
        "assigned_tier": payload.assigned_tier,
        "assigned_rate": payload.assigned_rate,
        "next_step": "Send onboarding email to partner with login credentials.",
    }


@router.post("/{app_id}/reject", status_code=status.HTTP_200_OK)
async def reject_application(
    app_id: str,
    payload: RejectApplicationRequest,
    admin: AuthUser = Depends(require_admin),
    db: AsyncSession = Depends(get_db),
):
    """Admin: reject a partner application with a reason."""
    app_uuid = uuid.UUID(app_id)
    result = await db.execute(select(PartnerApplication).where(PartnerApplication.id == app_uuid))
    application = result.scalar_one_or_none()

    if not application:
        raise HTTPException(status_code=404, detail="Application not found.")
    if application.status != "PENDING_REVIEW":
        raise HTTPException(status_code=400, detail=f"Application is already {application.status}.")

    application.status = "REJECTED"
    application.rejection_reason = payload.rejection_reason
    application.reviewed_at = datetime.now(timezone.utc)
    await db.commit()

    return {"message": "Application rejected.", "application_id": app_id}
