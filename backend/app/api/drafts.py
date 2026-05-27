from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.core.auth import get_current_user
from app.core.database import get_supabase_admin
from app.models.draft import (
    DemandDraftCreate,
    DemandDraftResponse,
    DemandDraftUpdate,
    ResourceDraftCreate,
    ResourceDraftResponse,
    ResourceDraftUpdate,
)

router = APIRouter(prefix="/api/drafts", tags=["drafts"])


def _build_resource_draft_response(d: dict) -> ResourceDraftResponse:
    return ResourceDraftResponse(
        id=d["id"],
        user_id=d["user_id"],
        title=d.get("title"),
        description=d.get("description"),
        category=d.get("category"),
        contact=d.get("contact"),
        country=d.get("country"),
        industry=d.get("industry"),
        tags=d.get("tags"),
        budget=d.get("budget"),
        quantity=d.get("quantity"),
        image_urls=d.get("image_urls"),
        status=d.get("status", "draft"),
        created_at=d["created_at"],
        updated_at=d["updated_at"],
    )


def _build_demand_draft_response(d: dict) -> DemandDraftResponse:
    return DemandDraftResponse(
        id=d["id"],
        user_id=d["user_id"],
        title=d.get("title"),
        description=d.get("description"),
        category=d.get("category"),
        country=d.get("country"),
        industry=d.get("industry"),
        tags=d.get("tags"),
        budget=d.get("budget"),
        quantity=d.get("quantity"),
        image_urls=d.get("image_urls"),
        status=d.get("status", "draft"),
        created_at=d["created_at"],
        updated_at=d["updated_at"],
    )


@router.get("/resources", response_model=list[ResourceDraftResponse])
def list_resource_drafts(current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    result = (
        supabase.table("resource_drafts")
        .select("*")
        .eq("user_id", current_user["id"])
        .order("updated_at", desc=True)
        .execute()
    )
    return [_build_resource_draft_response(d) for d in result.data]


@router.post("/resources", response_model=ResourceDraftResponse, status_code=status.HTTP_201_CREATED)
def create_resource_draft(draft: ResourceDraftCreate, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    new_draft = {
        "user_id": current_user["id"],
        "title": draft.title,
        "description": draft.description,
        "category": draft.category,
        "contact": draft.contact,
        "country": draft.country,
    }
    if draft.industry:
        new_draft["industry"] = draft.industry
    if draft.tags:
        new_draft["tags"] = draft.tags
    if draft.budget:
        new_draft["budget"] = draft.budget
    if draft.quantity:
        new_draft["quantity"] = draft.quantity
    if draft.image_urls:
        new_draft["image_urls"] = draft.image_urls

    result = supabase.table("resource_drafts").insert(new_draft).execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create draft")
    return _build_resource_draft_response(result.data[0])


@router.get("/resources/{draft_id}", response_model=ResourceDraftResponse)
def get_resource_draft(draft_id: str, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    result = (
        supabase.table("resource_drafts")
        .select("*")
        .eq("id", draft_id)
        .eq("user_id", current_user["id"])
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Draft not found")
    return _build_resource_draft_response(result.data[0])


@router.put("/resources/{draft_id}", response_model=ResourceDraftResponse)
def update_resource_draft(draft_id: str, draft: ResourceDraftUpdate, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    check = (
        supabase.table("resource_drafts")
        .select("*")
        .eq("id", draft_id)
        .eq("user_id", current_user["id"])
        .execute()
    )
    if not check.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Draft not found")

    update_data = {}
    for field in ["title", "description", "category", "contact", "country", "industry", "budget", "quantity"]:
        value = getattr(draft, field, None)
        if value is not None:
            update_data[field] = value
    if draft.tags is not None:
        update_data["tags"] = draft.tags
    if draft.image_urls is not None:
        update_data["image_urls"] = draft.image_urls

    if update_data:
        result = supabase.table("resource_drafts").update(update_data).eq("id", draft_id).execute()
        return _build_resource_draft_response(result.data[0])
    return _build_resource_draft_response(check.data[0])


@router.delete("/resources/{draft_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_resource_draft(draft_id: str, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    check = (
        supabase.table("resource_drafts")
        .select("*")
        .eq("id", draft_id)
        .eq("user_id", current_user["id"])
        .execute()
    )
    if not check.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Draft not found")
    supabase.table("resource_drafts").delete().eq("id", draft_id).execute()
    return None


@router.post("/resources/{draft_id}/publish", response_model=ResourceDraftResponse)
def publish_resource_draft(draft_id: str, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    draft_result = (
        supabase.table("resource_drafts")
        .select("*")
        .eq("id", draft_id)
        .eq("user_id", current_user["id"])
        .execute()
    )
    if not draft_result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Draft not found")

    draft = draft_result.data[0]
    new_resource = {
        "user_id": current_user["id"],
        "title": draft["title"] or "",
        "description": draft.get("description") or "",
        "category": draft.get("category") or "",
        "contact": draft.get("contact") or "",
        "country": draft.get("country") or "",
        "is_premium": False,
    }
    if draft.get("industry"):
        new_resource["industry"] = draft["industry"]
    if draft.get("tags"):
        new_resource["tags"] = draft["tags"]
    if draft.get("budget"):
        new_resource["budget"] = draft["budget"]
    if draft.get("quantity"):
        new_resource["quantity"] = draft["quantity"]
    if draft.get("image_urls"):
        new_resource["image_urls"] = draft["image_urls"]

    resource_result = supabase.table("resources").insert(new_resource).execute()
    if not resource_result.data:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to publish resource")

    supabase.table("resource_drafts").delete().eq("id", draft_id).execute()

    return _build_resource_draft_response(draft)


@router.get("/demands", response_model=list[DemandDraftResponse])
def list_demand_drafts(current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    result = (
        supabase.table("demand_drafts")
        .select("*")
        .eq("user_id", current_user["id"])
        .order("updated_at", desc=True)
        .execute()
    )
    return [_build_demand_draft_response(d) for d in result.data]


@router.post("/demands", response_model=DemandDraftResponse, status_code=status.HTTP_201_CREATED)
def create_demand_draft(draft: DemandDraftCreate, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    new_draft = {
        "user_id": current_user["id"],
        "title": draft.title,
        "description": draft.description,
        "category": draft.category,
        "country": draft.country,
    }
    if draft.industry:
        new_draft["industry"] = draft.industry
    if draft.tags:
        new_draft["tags"] = draft.tags
    if draft.budget:
        new_draft["budget"] = draft.budget
    if draft.quantity:
        new_draft["quantity"] = draft.quantity
    if draft.image_urls:
        new_draft["image_urls"] = draft.image_urls

    result = supabase.table("demand_drafts").insert(new_draft).execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create draft")
    return _build_demand_draft_response(result.data[0])


@router.get("/demands/{draft_id}", response_model=DemandDraftResponse)
def get_demand_draft(draft_id: str, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    result = (
        supabase.table("demand_drafts")
        .select("*")
        .eq("id", draft_id)
        .eq("user_id", current_user["id"])
        .execute()
    )
    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Draft not found")
    return _build_demand_draft_response(result.data[0])


@router.put("/demands/{draft_id}", response_model=DemandDraftResponse)
def update_demand_draft(draft_id: str, draft: DemandDraftUpdate, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    check = (
        supabase.table("demand_drafts")
        .select("*")
        .eq("id", draft_id)
        .eq("user_id", current_user["id"])
        .execute()
    )
    if not check.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Draft not found")

    update_data = {}
    for field in ["title", "description", "category", "country", "industry", "budget", "quantity"]:
        value = getattr(draft, field, None)
        if value is not None:
            update_data[field] = value
    if draft.tags is not None:
        update_data["tags"] = draft.tags
    if draft.image_urls is not None:
        update_data["image_urls"] = draft.image_urls

    if update_data:
        result = supabase.table("demand_drafts").update(update_data).eq("id", draft_id).execute()
        return _build_demand_draft_response(result.data[0])
    return _build_demand_draft_response(check.data[0])


@router.delete("/demands/{draft_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_demand_draft(draft_id: str, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    check = (
        supabase.table("demand_drafts")
        .select("*")
        .eq("id", draft_id)
        .eq("user_id", current_user["id"])
        .execute()
    )
    if not check.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Draft not found")
    supabase.table("demand_drafts").delete().eq("id", draft_id).execute()
    return None


@router.post("/demands/{draft_id}/publish", response_model=DemandDraftResponse)
def publish_demand_draft(draft_id: str, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    draft_result = (
        supabase.table("demand_drafts")
        .select("*")
        .eq("id", draft_id)
        .eq("user_id", current_user["id"])
        .execute()
    )
    if not draft_result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Draft not found")

    draft = draft_result.data[0]
    new_demand = {
        "user_id": current_user["id"],
        "title": draft["title"] or "",
        "description": draft.get("description") or "",
        "category": draft.get("category") or "",
        "country": draft.get("country") or "",
    }
    if draft.get("industry"):
        new_demand["industry"] = draft["industry"]
    if draft.get("tags"):
        new_demand["tags"] = draft["tags"]
    if draft.get("budget"):
        new_demand["budget"] = draft["budget"]
    if draft.get("quantity"):
        new_demand["quantity"] = draft["quantity"]
    if draft.get("image_urls"):
        new_demand["image_urls"] = draft["image_urls"]

    demand_result = supabase.table("demands").insert(new_demand).execute()
    if not demand_result.data:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to publish demand")

    supabase.table("demand_drafts").delete().eq("id", draft_id).execute()

    return _build_demand_draft_response(draft)