from fastapi import APIRouter, Depends, HTTPException, status

from app.core.auth import get_current_user, get_password_hash, verify_password
from app.core.database import get_supabase_admin
from app.models.profile import PasswordChange, UserProfileResponse, UserProfileUpdate

router = APIRouter(prefix="/api/profile", tags=["profile"])


def _ensure_profile(user_id: str) -> dict:
    supabase = get_supabase_admin()
    result = supabase.table("user_profiles").select("*").eq("user_id", user_id).execute()
    if not result.data:
        new_profile = {"user_id": user_id}
        insert_result = supabase.table("user_profiles").insert(new_profile).execute()
        if not insert_result.data:
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create profile")
        return insert_result.data[0]
    return result.data[0]


def _build_profile_response(p: dict) -> UserProfileResponse:
    return UserProfileResponse(
        id=p["id"],
        user_id=p["user_id"],
        display_name=p.get("display_name"),
        avatar_url=p.get("avatar_url"),
        company=p.get("company"),
        position=p.get("position"),
        phone=p.get("phone"),
        website=p.get("website"),
        bio=p.get("bio"),
        notification_email=p.get("notification_email", True),
        notification_message=p.get("notification_message", True),
        notification_match=p.get("notification_match", True),
    )


@router.get("/", response_model=UserProfileResponse)
def get_profile(current_user: dict = Depends(get_current_user)):
    profile = _ensure_profile(current_user["id"])
    return _build_profile_response(profile)


@router.put("/", response_model=UserProfileResponse)
def update_profile(profile: UserProfileUpdate, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    _ensure_profile(current_user["id"])

    update_data = profile.model_dump(exclude_none=True)
    if not update_data:
        existing = _ensure_profile(current_user["id"])
        return _build_profile_response(existing)

    result = (
        supabase.table("user_profiles")
        .update(update_data)
        .eq("user_id", current_user["id"])
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to update profile")
    return _build_profile_response(result.data[0])


@router.put("/password", status_code=status.HTTP_200_OK)
def change_password(payload: PasswordChange, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()

    user_result = supabase.table("users").select("*").eq("id", current_user["id"]).execute()
    if not user_result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    user = user_result.data[0]
    if not verify_password(payload.old_password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="旧密码不正确")

    new_hash = get_password_hash(payload.new_password)
    supabase.table("users").update({"password_hash": new_hash}).eq("id", current_user["id"]).execute()

    return {"message": "密码更新成功"}