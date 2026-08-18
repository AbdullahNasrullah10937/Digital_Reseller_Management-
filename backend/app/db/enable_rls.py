import asyncio
import asyncpg
from app.core.config import settings

tables = [
    "users",
    "partners",
    "partner_applications",
    "tier_pricing_rules",
    "products",
    "deals",
    "deal_status_history",
    "commissions",
    "payouts",
    "audit_logs"
]

async def enable_rls():
    print("=== Enabling Row Level Security (RLS) in Supabase ===")
    conn = await asyncpg.connect(
        user="postgres.ipvqflwwsuovmwctdqvc",
        password="Digitalsofts718",
        database="postgres",
        host="aws-0-ap-south-1.pooler.supabase.com",
        port=6543,
        ssl="require",
        statement_cache_size=0
    )
    
    for t in tables:
        await conn.execute(f"ALTER TABLE public.{t} ENABLE ROW LEVEL SECURITY;")
        print(f"SUCCESS: RLS enabled for table '{t}'")
        
    await conn.close()
    print("\n=== All 10 Tables Now Have RLS Enabled in Supabase! ===")

if __name__ == "__main__":
    asyncio.run(enable_rls())
