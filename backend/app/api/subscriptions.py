from datetime import datetime, timedelta
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.core.auth import get_current_user
from app.core.database import get_supabase_admin
from app.models.subscription import PremiumResourceResponse, SubscriptionCreate, SubscriptionResponse

router = APIRouter(prefix="/api/subscriptions", tags=["subscriptions"])


@router.post("/", response_model=SubscriptionResponse)
def create_subscription(subscription: SubscriptionCreate, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    now = datetime.utcnow()
    plan_amounts = {"basic": 9.99, "pro": 29.99, "enterprise": 99.99}
    amount = plan_amounts.get(subscription.plan, 9.99)
    new_subscription = {
        "user_id": current_user["id"],
        "plan": subscription.plan,
        "status": "active",
        "amount": amount,
        "started_at": now.isoformat(),
        "expires_at": (now + timedelta(days=30)).isoformat(),
    }
    result = supabase.table("subscriptions").insert(new_subscription).execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create subscription")

    supabase.table("users").update({"is_subscribed": True}).eq("id", current_user["id"]).execute()

    s = result.data[0]
    return SubscriptionResponse(
        id=s["id"],
        user_id=s["user_id"],
        plan=s["plan"],
        status=s["status"],
        amount=s["amount"],
        started_at=s["started_at"],
        expires_at=s["expires_at"],
    )


@router.get("/", response_model=Optional[SubscriptionResponse])
def get_subscription(current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    result = (
        supabase.table("subscriptions")
        .select("*")
        .eq("user_id", current_user["id"])
        .order("created_at", desc=True)
        .limit(1)
        .execute()
    )
    if not result.data:
        return None
    s = result.data[0]
    return SubscriptionResponse(
        id=s["id"],
        user_id=s["user_id"],
        plan=s["plan"],
        status=s["status"],
        amount=s["amount"],
        started_at=s["started_at"],
        expires_at=s["expires_at"],
    )


@router.get("/premium-resources", response_model=list[PremiumResourceResponse])
def get_premium_resources(current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    user_result = supabase.table("users").select("is_subscribed").eq("id", current_user["id"]).execute()
    if not user_result.data or not user_result.data[0].get("is_subscribed"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Subscription required to access premium resources")

    result = supabase.table("resources").select("*").eq("is_premium", True).order("created_at", desc=True).execute()
    return [
        PremiumResourceResponse(
            id=r["id"],
            title=r["title"],
            description=r["description"],
            category=r["category"],
            industry=r.get("industry", r["category"]),
            country=r["country"],
            contact_info=r["contact"],
            verified=r.get("verified", False),
        )
        for r in result.data
    ]


@router.get("/premium-resources/search", response_model=list[PremiumResourceResponse])
def search_premium_resources(
    category: Optional[str] = Query(None),
    industry: Optional[str] = Query(None),
    country: Optional[str] = Query(None),
    keyword: Optional[str] = Query(None),
    current_user: dict = Depends(get_current_user),
):
    supabase = get_supabase_admin()
    user_result = supabase.table("users").select("is_subscribed").eq("id", current_user["id"]).execute()
    if not user_result.data or not user_result.data[0].get("is_subscribed"):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Subscription required to access premium resources")

    query = supabase.table("resources").select("*").eq("is_premium", True)
    if category:
        query = query.eq("category", category)
    if industry:
        query = query.eq("category", industry)
    if country:
        query = query.eq("country", country)
    if keyword:
        query = query.or_(f"title.ilike.%{keyword}%,description.ilike.%{keyword}%")
    result = query.order("created_at", desc=True).execute()
    return [
        PremiumResourceResponse(
            id=r["id"],
            title=r["title"],
            description=r["description"],
            category=r["category"],
            industry=r.get("industry", r["category"]),
            country=r["country"],
            contact_info=r["contact"],
            verified=r.get("verified", False),
        )
        for r in result.data
    ]