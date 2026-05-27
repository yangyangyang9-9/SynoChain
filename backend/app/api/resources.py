from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.core.auth import get_current_user
from app.core.database import get_supabase_admin
from app.models.resource import ResourceCreate, ResourceResponse, ResourceUpdate

router = APIRouter(prefix="/api/resources", tags=["resources"])


@router.get("/", response_model=list[ResourceResponse])
def list_resources(
    category: Optional[str] = Query(None),
    country: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
):
    supabase = get_supabase_admin()
    query = supabase.table("resources").select("*").order("created_at", desc=True)
    if category:
        query = query.eq("category", category)
    if country:
        query = query.eq("country", country)
    if search:
        query = query.or_(f"title.ilike.%{search}%,description.ilike.%{search}%")
    result = query.execute()
    return [
        ResourceResponse(
            id=r["id"],
            user_id=r["user_id"],
            title=r["title"],
            description=r["description"],
            category=r["category"],
            contact=r["contact"],
            country=r["country"],
            is_premium=r.get("is_premium", False),
            industry=r.get("industry"),
            tags=r.get("tags"),
            budget=r.get("budget"),
            quantity=r.get("quantity"),
            image_urls=r.get("image_urls"),
            created_at=r["created_at"],
        )
        for r in result.data
    ]


@router.get("/my", response_model=list[ResourceResponse])
def my_resources(current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    result = supabase.table("resources").select("*").eq("user_id", current_user["id"]).order("created_at", desc=True).execute()
    return [
        ResourceResponse(
            id=r["id"],
            user_id=r["user_id"],
            title=r["title"],
            description=r["description"],
            category=r["category"],
            contact=r["contact"],
            country=r["country"],
            is_premium=r.get("is_premium", False),
            industry=r.get("industry"),
            tags=r.get("tags"),
            budget=r.get("budget"),
            quantity=r.get("quantity"),
            image_urls=r.get("image_urls"),
            created_at=r["created_at"],
        )
        for r in result.data
    ]


@router.get("/{resource_id}", response_model=ResourceResponse)
def get_resource(resource_id: str):
    supabase = get_supabase_admin()
    result = supabase.table("resources").select("*").eq("id", resource_id).execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found")
    r = result.data[0]
    return ResourceResponse(
        id=r["id"],
        user_id=r["user_id"],
        title=r["title"],
        description=r["description"],
        category=r["category"],
        contact=r["contact"],
        country=r["country"],
        is_premium=r.get("is_premium", False),
        industry=r.get("industry"),
        tags=r.get("tags"),
        budget=r.get("budget"),
        quantity=r.get("quantity"),
        image_urls=r.get("image_urls"),
        created_at=r["created_at"],
    )


@router.post("/", response_model=ResourceResponse, status_code=status.HTTP_201_CREATED)
def create_resource(resource: ResourceCreate, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    new_resource = {
        "user_id": current_user["id"],
        "title": resource.title,
        "description": resource.description,
        "category": resource.category,
        "contact": resource.contact,
        "country": resource.country,
        "is_premium": False,
    }
    if resource.industry:
        new_resource["industry"] = resource.industry
    if resource.tags:
        new_resource["tags"] = resource.tags
    if resource.budget:
        new_resource["budget"] = resource.budget
    if resource.quantity:
        new_resource["quantity"] = resource.quantity
    if resource.image_urls:
        new_resource["image_urls"] = resource.image_urls
    result = supabase.table("resources").insert(new_resource).execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create resource")
    r = result.data[0]
    return ResourceResponse(
        id=r["id"],
        user_id=r["user_id"],
        title=r["title"],
        description=r["description"],
        category=r["category"],
        contact=r["contact"],
        country=r["country"],
        is_premium=r.get("is_premium", False),
        industry=r.get("industry"),
        tags=r.get("tags"),
        budget=r.get("budget"),
        quantity=r.get("quantity"),
        image_urls=r.get("image_urls"),
        created_at=r["created_at"],
    )


@router.put("/{resource_id}", response_model=ResourceResponse)
def update_resource(resource_id: str, resource: ResourceUpdate, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    check = supabase.table("resources").select("*").eq("id", resource_id).eq("user_id", current_user["id"]).execute()
    if not check.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found or not authorized")
    update_data = {}
    if resource.title is not None:
        update_data["title"] = resource.title
    if resource.description is not None:
        update_data["description"] = resource.description
    if resource.category is not None:
        update_data["category"] = resource.category
    if resource.contact is not None:
        update_data["contact"] = resource.contact
    if resource.country is not None:
        update_data["country"] = resource.country
    if resource.industry is not None:
        update_data["industry"] = resource.industry
    if resource.tags is not None:
        update_data["tags"] = resource.tags
    if resource.budget is not None:
        update_data["budget"] = resource.budget
    if resource.quantity is not None:
        update_data["quantity"] = resource.quantity
    if resource.image_urls is not None:
        update_data["image_urls"] = resource.image_urls
    result = supabase.table("resources").update(update_data).eq("id", resource_id).execute()
    r = result.data[0]
    return ResourceResponse(
        id=r["id"],
        user_id=r["user_id"],
        title=r["title"],
        description=r["description"],
        category=r["category"],
        contact=r["contact"],
        country=r["country"],
        is_premium=r.get("is_premium", False),
        industry=r.get("industry"),
        tags=r.get("tags"),
        budget=r.get("budget"),
        quantity=r.get("quantity"),
        image_urls=r.get("image_urls"),
        created_at=r["created_at"],
    )


@router.delete("/{resource_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_resource(resource_id: str, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    check = supabase.table("resources").select("*").eq("id", resource_id).eq("user_id", current_user["id"]).execute()
    if not check.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found or not authorized")
    supabase.table("resources").delete().eq("id", resource_id).execute()
    return None