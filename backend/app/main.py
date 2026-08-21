import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import api_router

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="Digitalsofts Partner Portal API — Phase 1 MVP",
)

# CORS — local Next.js, production domain, plus Render env CORS_ORIGINS
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "https://partners.digitalsofts.com",
]
origins.extend(
    origin.strip()
    for origin in os.getenv("CORS_ORIGINS", "").split(",")
    if origin.strip()
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount all API routes under /api/v1
app.include_router(api_router, prefix=settings.API_V1_STR)


@app.get("/")
def root():
    return {
        "message": "Digitalsofts Partner Portal API",
        "version": settings.VERSION,
        "docs": "/docs",
        "health": "/health",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "payout_threshold_pkr": settings.MIN_PAYOUT_THRESHOLD_PKR,
        "payout_threshold_usd": settings.MIN_PAYOUT_THRESHOLD_USD,
    }
