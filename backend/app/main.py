from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# CORS Configuration
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {
        "message": "Welcome to Digitalsofts Partner Portal API",
        "version": settings.VERSION,
        "docs": "/docs"
    }

@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": settings.PROJECT_NAME,
        "payout_threshold_pkr": settings.MIN_PAYOUT_THRESHOLD_PKR,
        "payout_threshold_usd": settings.MIN_PAYOUT_THRESHOLD_USD
    }
