"""
Supabase JWT Authentication dependency.
Validates Bearer tokens issued by Supabase Auth, extracts user_id and role.
No separate JWT stack needed — Supabase handles token issuance.
"""
import os
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from dataclasses import dataclass

SUPABASE_JWT_SECRET = os.getenv(
    "SUPABASE_JWT_SECRET",
    ""  # Set in .env: from Supabase Dashboard → Project Settings → API → JWT Secret
)

http_bearer = HTTPBearer(auto_error=False)


@dataclass
class AuthUser:
    user_id: str
    email: str
    role: str  # PARTNER | ADMIN | FINANCE


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(http_bearer),
) -> AuthUser:
    """
    Validates the Supabase JWT Bearer token and returns the authenticated user.
    Raises HTTP 401 if the token is missing or invalid.
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required. Provide a valid Bearer token.",
        )

    token = credentials.credentials

    try:
        payload = jwt.decode(
            token,
            SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            audience="authenticated",
        )
        user_id: str = payload.get("sub", "")
        email: str = payload.get("email", "")
        # Role is stored in Supabase user_metadata
        user_meta = payload.get("user_metadata", {})
        role: str = user_meta.get("role", "PARTNER").upper()

        if not user_id:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token: missing sub.")

        return AuthUser(user_id=user_id, email=email, role=role)

    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Token validation failed: {exc}",
        )


def require_admin(current_user: AuthUser = Depends(get_current_user)) -> AuthUser:
    if current_user.role not in ("ADMIN", "FINANCE"):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Admin or Finance role required.",
        )
    return current_user
