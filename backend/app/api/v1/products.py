"""
Products API endpoint — authenticated partners only.
GET /api/v1/products — returns the full product catalog.
"""
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from decimal import Decimal
from typing import Optional

from app.db.session import get_db
from app.models.models import Product
from app.core.auth import get_current_user, AuthUser

router = APIRouter(prefix="/products", tags=["products"])


class ProductResponse(BaseModel):
    id: str
    name: str
    category: str
    description: Optional[str]
    retail_price_usd: float
    retail_price_pkr: float
    is_confirmed: bool
    price_status: str

    class Config:
        from_attributes = True


@router.get("", response_model=list[ProductResponse])
async def list_products(
    current_user: AuthUser = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
    category: Optional[str] = None,
):
    """
    Authenticated partners only — returns the full active product catalog.
    Optionally filter by category (e.g. ?category=POS/Retail).
    """
    query = select(Product).where(Product.is_active == True).order_by(Product.category, Product.name)
    if category:
        query = query.where(Product.category == category)

    result = await db.execute(query)
    products = result.scalars().all()

    return [
        ProductResponse(
            id=str(p.id),
            name=p.name,
            category=p.category,
            description=p.description,
            retail_price_usd=float(p.retail_price_usd),
            retail_price_pkr=float(p.retail_price_pkr),
            is_confirmed=p.is_confirmed,
            price_status=p.price_status,
        )
        for p in products
    ]
