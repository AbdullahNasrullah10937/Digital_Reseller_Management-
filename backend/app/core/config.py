import os
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Digitalsofts Partner Portal API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    # Secret keys
    SECRET_KEY: str = os.getenv("SECRET_KEY", "digitalsofts_super_secret_jwt_key_2026_change_in_prod")
    FERNET_KEY: str = os.getenv("FERNET_KEY", "gAAAAABl-sample-fernet-key-replace-in-production-1234567890=")
    
    # JWT configuration
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    ALGORITHM: str = "HS256"
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "postgresql+asyncpg://postgres.ipvqflwwsuovmwctdqvc:Digitalsofts718@aws-0-ap-south-1.pooler.supabase.com:6543/postgres")
    
    # Business Rules Defaults
    MIN_PAYOUT_THRESHOLD_PKR: float = 5000.0
    MIN_PAYOUT_THRESHOLD_USD: float = 50.0
    DEFAULT_DEAL_PROTECTION_DAYS: int = 60

    class Config:
        case_sensitive = True

settings = Settings()
