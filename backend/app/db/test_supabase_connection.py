import asyncio
import asyncpg

user = "postgres.ipvqflwwsuovmwctdqvc"
password = "Digitalsofts718"
database = "postgres"
host = "aws-0-ap-south-1.pooler.supabase.com"

async def test_connect():
    print(f"Connecting to Supabase Transaction Pooler ({host}:6543)...")
    conn = await asyncpg.connect(
        user=user,
        password=password,
        database=database,
        host=host,
        port=6543,
        ssl="require",
        statement_cache_size=0
    )
    val = await conn.fetchval("SELECT version();")
    print("SUCCESSFUL CONNECTION TO SUPABASE POSTGRESQL!")
    print(f"PostgreSQL Version: {val[:60]}")
    await conn.close()

if __name__ == "__main__":
    asyncio.run(test_connect())
