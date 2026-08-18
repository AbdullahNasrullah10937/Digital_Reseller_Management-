import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Column, String, Boolean, DateTime, ForeignKey, Numeric, Text, Date, UniqueConstraint, JSON
)
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from app.db.session import Base

def generate_uuid():
    return uuid.uuid4()

class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    email = Column(String(255), unique=True, nullable=False, index=True)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False, default="PARTNER")  # PARTNER, ADMIN, FINANCE
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    partner_profile = relationship("Partner", back_populates="user", uselist=False)

class Partner(Base):
    __tablename__ = "partners"

    id = Column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    full_name = Column(String(255), nullable=False)
    company_name = Column(String(255), nullable=False)
    phone = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)
    city = Column(String(100), nullable=False)
    industry_focus = Column(String(100), nullable=False)
    website = Column(String(255), nullable=True)
    referral_code = Column(String(50), unique=True, nullable=False, index=True) # e.g. DS-10283
    tier = Column(String(50), nullable=False, default="RESELLER") # AFFILIATE, REFERRAL_PARTNER, RESELLER, CERTIFIED_RESELLER
    commission_rate = Column(Numeric(5, 2), nullable=False, default=30.00) # e.g. 30.00 %
    status = Column(String(50), nullable=False, default="ACTIVE") # PENDING_REVIEW, ACTIVE, REJECTED, SUSPENDED
    
    # Encrypted Banking Details (AES-256 Fernet)
    bank_name = Column(String(255), nullable=True)
    account_title = Column(String(255), nullable=True)
    encrypted_iban = Column(Text, nullable=True)
    encrypted_swift_code = Column(Text, nullable=True)
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    user = relationship("User", back_populates="partner_profile")
    deals = relationship("Deal", back_populates="partner")
    commissions = relationship("Commission", back_populates="partner")
    payouts = relationship("Payout", back_populates="partner")

class PartnerApplication(Base):
    __tablename__ = "partner_applications"

    id = Column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    full_name = Column(String(255), nullable=False)
    email = Column(String(255), nullable=False, index=True)
    phone = Column(String(100), nullable=False)
    company_name = Column(String(255), nullable=False)
    country = Column(String(100), nullable=False)
    city = Column(String(100), nullable=False)
    industry_focus = Column(String(100), nullable=False)
    website = Column(String(255), nullable=True)
    preferred_tier = Column(String(50), nullable=True)
    status = Column(String(50), nullable=False, default="PENDING_REVIEW") # PENDING_REVIEW, APPROVED, REJECTED
    rejection_reason = Column(Text, nullable=True)
    reviewed_by_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    reviewed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class TierPricingRule(Base):
    __tablename__ = "tier_pricing_rules"

    id = Column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    tier = Column(String(50), unique=True, nullable=False) # AFFILIATE, REFERRAL_PARTNER, RESELLER, CERTIFIED_RESELLER
    min_commission_rate = Column(Numeric(5, 2), nullable=False)
    max_commission_rate = Column(Numeric(5, 2), nullable=False)
    default_commission_rate = Column(Numeric(5, 2), nullable=False)
    tier_discount_percent = Column(Numeric(5, 2), nullable=False, default=0.00)
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

class Product(Base):
    __tablename__ = "products"

    id = Column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    name = Column(String(255), nullable=False)
    category = Column(String(100), nullable=False) # POS/Retail, Industry ERP, Hospitality ERP, SME ERP, Real Estate ERP
    description = Column(Text, nullable=True)
    retail_price_usd = Column(Numeric(10, 2), nullable=False)
    retail_price_pkr = Column(Numeric(12, 2), nullable=False)
    is_confirmed = Column(Boolean, default=False) # false for draft market estimates
    price_status = Column(String(50), default="DRAFT_ESTIMATE") # DRAFT_ESTIMATE, CONFIRMED_LAUNCH
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

class Deal(Base):
    __tablename__ = "deals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    partner_id = Column(UUID(as_uuid=True), ForeignKey("partners.id"), nullable=False)
    customer_name = Column(String(255), nullable=False)
    customer_email = Column(String(255), nullable=False, index=True)
    customer_phone = Column(String(100), nullable=True)
    industry = Column(String(100), nullable=False)
    country = Column(String(100), nullable=False)
    product_id = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    estimated_value = Column(Numeric(12, 2), nullable=False)
    currency = Column(String(10), nullable=False, default="USD") # USD, PKR
    expected_close_date = Column(Date, nullable=False)
    status = Column(String(50), nullable=False, default="PENDING_APPROVAL") # PENDING_APPROVAL, APPROVED, REJECTED, WON, LOST
    protection_expiry_date = Column(DateTime(timezone=True), nullable=True)
    is_flagged_duplicate = Column(Boolean, default=False) # Non-blocking duplicate flag
    duplicate_notes = Column(Text, nullable=True)
    notes = Column(Text, nullable=True)
    rejection_reason = Column(Text, nullable=True)
    reviewed_by_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    reviewed_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    partner = relationship("Partner", back_populates="deals")
    product = relationship("Product")
    commission = relationship("Commission", back_populates="deal", uselist=False)
    status_history = relationship("DealStatusHistory", back_populates="deal")

class DealStatusHistory(Base):
    __tablename__ = "deal_status_history"

    id = Column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    deal_id = Column(UUID(as_uuid=True), ForeignKey("deals.id"), nullable=False)
    from_status = Column(String(50), nullable=False)
    to_status = Column(String(50), nullable=False)
    changed_by_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    deal = relationship("Deal", back_populates="status_history")

class Commission(Base):
    __tablename__ = "commissions"

    id = Column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    deal_id = Column(UUID(as_uuid=True), ForeignKey("deals.id"), unique=True, nullable=False) # UNIQUE for idempotency
    partner_id = Column(UUID(as_uuid=True), ForeignKey("partners.id"), nullable=False)
    deal_value = Column(Numeric(12, 2), nullable=False)
    applied_tier = Column(String(50), nullable=False)
    commission_rate = Column(Numeric(5, 2), nullable=False)
    commission_amount = Column(Numeric(12, 2), nullable=False)
    currency = Column(String(10), nullable=False, default="USD")
    status = Column(String(50), nullable=False, default="PENDING") # PENDING, APPROVED, PAID
    payout_id = Column(UUID(as_uuid=True), ForeignKey("payouts.id"), nullable=True)
    approved_at = Column(DateTime(timezone=True), nullable=True)
    paid_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    deal = relationship("Deal", back_populates="commission")
    partner = relationship("Partner", back_populates="commissions")
    payout = relationship("Payout", back_populates="commissions")

class Payout(Base):
    __tablename__ = "payouts"

    id = Column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    partner_id = Column(UUID(as_uuid=True), ForeignKey("partners.id"), nullable=False)
    total_amount = Column(Numeric(12, 2), nullable=False)
    currency = Column(String(10), nullable=False, default="USD") # USD, PKR
    status = Column(String(50), nullable=False, default="REQUESTED") # REQUESTED, PROCESSING, PAID, REJECTED
    payment_method = Column(String(50), nullable=False, default="BANK_TRANSFER")
    transaction_reference = Column(String(255), nullable=True)
    notes = Column(Text, nullable=True)
    processed_by_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    paid_at = Column(DateTime(timezone=True), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))

    partner = relationship("Partner", back_populates="payouts")
    commissions = relationship("Commission", back_populates="payout")

class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=generate_uuid)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    action = Column(String(100), nullable=False) # PARTNER_APPROVED, DEAL_STATUS_CHANGED, COMMISSION_APPROVED, PAYOUT_MARKED_PAID, PRICING_UPDATED
    entity_type = Column(String(100), nullable=False)
    entity_id = Column(UUID(as_uuid=True), nullable=True)
    changes = Column(JSON, nullable=True) # JSON snapshot of before & after states
    ip_address = Column(String(100), nullable=True)
    user_agent = Column(String(255), nullable=True)
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
