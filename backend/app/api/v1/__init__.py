from fastapi import APIRouter
from app.api.v1 import applications, products, deals, commissions, partners

api_router = APIRouter()

# Public endpoints
api_router.include_router(applications.router)

# Authenticated partner endpoints
api_router.include_router(products.router)
api_router.include_router(partners.router)
api_router.include_router(deals.partner_router)
api_router.include_router(commissions.partner_router)

# Admin endpoints
api_router.include_router(deals.admin_router)
api_router.include_router(commissions.admin_router)
