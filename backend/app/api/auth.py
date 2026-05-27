from fastapi import APIRouter, Depends, HTTPException, status

from app.core.auth import create_access_token, get_current_user, get_password_hash, verify_password
from app.core.database import get_supabase_admin
from app.models.user import UserCreate, UserLogin, UserResponse, UserUpdate

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/register", response_model=UserResponse)
def register(user: UserCreate):
    supabase = get_supabase_admin()
    existing = supabase.table("users").select("*").eq("email", user.email).execute()
    if existing.data:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    hashed_password = get_password_hash(user.password)
    new_user = {
        "email": user.email,
        "password_hash": hashed_password,
        "role": "user",
        "is_subscribed": False,
    }
    result = supabase.table("users").insert(new_user).execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create user")
    created = result.data[0]
    return UserResponse(
        id=created["id"],
        email=created["email"],
        role=created["role"],
        is_subscribed=created["is_subscribed"],
        created_at=created["created_at"],
    )


@router.post("/login")
def login(user: UserLogin):
    supabase = get_supabase_admin()
    result = supabase.table("users").select("*").eq("email", user.email).execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    db_user = result.data[0]
    if not verify_password(user.password, db_user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    token = create_access_token(data={"sub": db_user["id"], "email": db_user["email"], "role": db_user["role"]})
    return {
        "access_token": token,
        "token_type": "bearer",
        "user": UserResponse(
            id=db_user["id"],
            email=db_user["email"],
            role=db_user["role"],
            is_subscribed=db_user["is_subscribed"],
            created_at=db_user["created_at"],
        ),
    }


@router.get("/me", response_model=UserResponse)
def get_me(current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    result = supabase.table("users").select("*").eq("id", current_user["id"]).execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    db_user = result.data[0]
    return UserResponse(
        id=db_user["id"],
        email=db_user["email"],
        role=db_user["role"],
        is_subscribed=db_user["is_subscribed"],
        created_at=db_user["created_at"],
    )


@router.put("/me", response_model=UserResponse)
def update_me(update: UserUpdate, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    update_data = {}
    if update.is_subscribed is not None:
        update_data["is_subscribed"] = update.is_subscribed
    if update.subscription_expires_at is not None:
        update_data["subscription_expires_at"] = update.subscription_expires_at.isoformat()
    result = supabase.table("users").update(update_data).eq("id", current_user["id"]).execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    db_user = result.data[0]
    return UserResponse(
        id=db_user["id"],
        email=db_user["email"],
        role=db_user["role"],
        is_subscribed=db_user["is_subscribed"],
        created_at=db_user["created_at"],
    )