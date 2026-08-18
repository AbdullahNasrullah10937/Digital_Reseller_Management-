import asyncio
from sqlalchemy import select
from app.db.session import engine, AsyncSessionLocal, Base
from app.models.models import (
    User, Partner, TierPricingRule, Product, Deal, Commission, Payout, AuditLog
)
from app.core.security import get_password_hash, encrypt_sensitive_data
from app.db.seed_products import LAUNCH_PRODUCTS_30

async def init_supabase():
    print("=== Initializing Supabase PostgreSQL Database Schema ===")
    
    # Create all tables in Supabase PostgreSQL
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    print("SUCCESS: All 10 database tables created successfully in Supabase!")

    async with AsyncSessionLocal() as session:
        # 1. Seed Tier Pricing Rules
        print("Seeding Tier Pricing Rules...")
        tiers_data = [
            {"tier": "AFFILIATE", "min": 10.00, "max": 20.00, "default": 15.00, "discount": 0.00},
            {"tier": "REFERRAL_PARTNER", "min": 15.00, "max": 25.00, "default": 20.00, "discount": 5.00},
            {"tier": "RESELLER", "min": 25.00, "max": 40.00, "default": 30.00, "discount": 10.00},
            {"tier": "CERTIFIED_RESELLER", "min": 30.00, "max": 50.00, "default": 35.00, "discount": 15.00},
        ]
        for t in tiers_data:
            stmt = select(TierPricingRule).where(TierPricingRule.tier == t["tier"])
            res = await session.execute(stmt)
            if not res.scalar_one_or_none():
                session.add(TierPricingRule(
                    tier=t["tier"],
                    min_commission_rate=t["min"],
                    max_commission_rate=t["max"],
                    default_commission_rate=t["default"],
                    tier_discount_percent=t["discount"]
                ))
        await session.commit()
        print("SUCCESS: Tier Pricing Rules seeded!")

        # 2. Seed 30 Launch Products
        print("Seeding 30 Launch Products into Supabase...")
        for p in LAUNCH_PRODUCTS_30:
            stmt = select(Product).where(Product.name == p["name"])
            res = await session.execute(stmt)
            if not res.scalar_one_or_none():
                session.add(Product(
                    name=p["name"],
                    category=p["category"],
                    retail_price_usd=p["usd"],
                    retail_price_pkr=p["pkr"],
                    is_confirmed=False,
                    price_status="DRAFT_ESTIMATE",
                    is_active=True
                ))
        await session.commit()
        print("SUCCESS: 30 Launch Products seeded into Supabase!")

        # 3. Seed Initial HR Admin User
        print("Seeding Initial HR Admin User (hr@digitalsofts.com)...")
        stmt_hr = select(User).where(User.email == "hr@digitalsofts.com")
        res_hr = await session.execute(stmt_hr)
        hr_user = res_hr.scalar_one_or_none()
        if not hr_user:
            hr_user = User(
                email="hr@digitalsofts.com",
                hashed_password=get_password_hash("Digitalsofts718!"),
                role="ADMIN",
                is_active=True
            )
            session.add(hr_user)
            await session.commit()
            await session.refresh(hr_user)
            print("SUCCESS: HR Admin User created (hr@digitalsofts.com)!")

        # 4. Seed Demo Partner User
        print("Seeding Demo Partner User (ali@techsolutions.com)...")
        stmt_partner_user = select(User).where(User.email == "ali@techsolutions.com")
        res_p = await session.execute(stmt_partner_user)
        partner_user = res_p.scalar_one_or_none()
        if not partner_user:
            partner_user = User(
                email="ali@techsolutions.com",
                hashed_password=get_password_hash("PartnerPass123!"),
                role="PARTNER",
                is_active=True
            )
            session.add(partner_user)
            await session.commit()
            await session.refresh(partner_user)

            # Add partner profile with encrypted bank details
            partner_profile = Partner(
                user_id=partner_user.id,
                full_name="Muhammad Ali",
                company_name="TechSolutions Ltd",
                phone="+92 300 1234567",
                country="Pakistan",
                city="Lahore",
                industry_focus="POS/Retail",
                website="https://techsolutions.com",
                referral_code="DS-10283",
                tier="RESELLER",
                commission_rate=30.00,
                status="ACTIVE",
                bank_name="Meezan Bank Limited",
                account_title="TechSolutions Private Limited",
                encrypted_iban=encrypt_sensitive_data("PK42MEZN0001029384918234"),
                encrypted_swift_code=encrypt_sensitive_data("MEZNPKKA")
            )
            session.add(partner_profile)
            await session.commit()
            print("SUCCESS: Demo Partner Profile created (DS-10283 with AES-256 bank encryption)!")

    print("\n=== Supabase Database Setup & Initialization Complete ===")

if __name__ == "__main__":
    asyncio.run(init_supabase())
