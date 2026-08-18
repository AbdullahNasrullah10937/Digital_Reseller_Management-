import base64
from datetime import datetime, timedelta, timezone
from typing import Optional, Any
import jwt
from passlib.context import CryptContext
from cryptography.fernet import Fernet
from app.core.config import settings

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Ensure Fernet key is 32 url-safe base64 encoded bytes
def _get_fernet() -> Fernet:
    try:
        return Fernet(settings.FERNET_KEY.encode('utf-8'))
    except Exception:
        # Fallback deterministic 32-byte key generator for local dev if key invalid
        key = base64.urlsafe_b64encode(settings.SECRET_KEY.zfill(32)[:32].encode('utf-8'))
        return Fernet(key)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password: str) -> str:
    return pwd_context.hash(password)

def encrypt_sensitive_data(plain_text: str) -> str:
    if not plain_text:
        return ""
    fernet = _get_fernet()
    return fernet.encrypt(plain_text.encode('utf-8')).decode('utf-8')

def decrypt_sensitive_data(encrypted_text: str) -> str:
    if not encrypted_text:
        return ""
    try:
        fernet = _get_fernet()
        return fernet.decrypt(encrypted_text.encode('utf-8')).decode('utf-8')
    except Exception:
        return "[Decryption Failed]"

def mask_bank_field(value: str) -> str:
    if not value or len(value) < 6:
        return "****"
    return f"{value[:4]} **** **** {value[-4:]}"

def create_access_token(subject: Any, role: str, expires_delta: Optional[timedelta] = None) -> str:
    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    
    to_encode = {
        "exp": expire,
        "sub": str(subject),
        "role": role,
        "type": "access"
    }
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def create_refresh_token(subject: Any, role: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    to_encode = {
        "exp": expire,
        "sub": str(subject),
        "role": role,
        "type": "refresh"
    }
    return jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)

def decode_token(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        return payload
    except jwt.PyJWTError:
        return None
