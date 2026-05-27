from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.core.auth import get_current_user
from app.core.database import get_supabase_admin
from app.models.demand import DemandCreate, DemandResponse, DemandUpdate

router = APIRouter(prefix="/api/demands", tags=["demands"])


@router.get("/", response_model=list[DemandResponse])
def list_demands(
    category: Optional[str] = Query(None),
    country: Optional[str] = Query(None),
    search: Optional[str] = Query(None),
):
    supabase = get_supabase_admin()
    query = supabase.table("demands").select("*").order("created_at", desc=True)
    if category:
        query = query.eq("category", category)
    if country:
        query = query.eq("country", country)
    if search:
        query = query.or_(f"title.ilike.%{search}%,description.ilike.%{search}%")
    result = query.execute()
    return [
        DemandResponse(
            id=d["id"],
            user_id=d["user_id"],
            title=d["title"],
            description=d["description"],
            category=d["category"],
            country=d["country"],
            created_at=d["created_at"],
        )
        for d in result.data
    ]


@router.get("/my", response_model=list[DemandResponse])
def my_demands(current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    result = supabase.table("demands").select("*").eq("user_id", current_user["id"]).order("created_at", desc=True).execute()
    return [
        DemandResponse(
            id=d["id"],
            user_id=d["user_id"],
            title=d["title"],
            description=d["description"],
            category=d["category"],
            country=d["country"],
            created_at=d["created_at"],
        )
        for d in result.data
    ]


@router.get("/{demand_id}", response_model=DemandResponse)
def get_demand(demand_id: str):
    supabase = get_supabase_admin()
    result = supabase.table("demands").select("*").eq("id", demand_id).execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Demand not found")
    d = result.data[0]
    return DemandResponse(
        id=d["id"],
        user_id=d["user_id"],
        title=d["title"],
        description=d["description"],
        category=d["category"],
        country=d["country"],
        created_at=d["created_at"],
    )


@router.post("/", response_model=DemandResponse, status_code=status.HTTP_201_CREATED)
def create_demand(demand: DemandCreate, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    new_demand = {
        "user_id": current_user["id"],
        "title": demand.title,
        "description": demand.description,
        "category": demand.category,
        "country": demand.country,
    }
    result = supabase.table("demands").insert(new_demand).execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create demand")
    d = result.data[0]
    return DemandResponse(
        id=d["id"],
        user_id=d["user_id"],
        title=d["title"],
        description=d["description"],
        category=d["category"],
        country=d["country"],
        created_at=d["created_at"],
    )


@router.put("/{demand_id}", response_model=DemandResponse)
def update_demand(demand_id: str, demand: DemandUpdate, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    check = supabase.table("demands").select("*").eq("id", demand_id).eq("user_id", current_user["id"]).execute()
    if not check.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Demand not found or not authorized")
    update_data = {}
    if demand.title is not None:
        update_data["title"] = demand.title
    if demand.description is not None:
        update_data["description"] = demand.description
    if demand.category is not None:
        update_data["category"] = demand.category
    if demand.country is not None:
        update_data["country"] = demand.country
    result = supabase.table("demands").update(update_data).eq("id", demand_id).execute()
    d = result.data[0]
    return DemandResponse(
        id=d["id"],
        user_id=d["user_id"],
        title=d["title"],
        description=d["description"],
        category=d["category"],
        country=d["country"],
        created_at=d["created_at"],
    )


@router.delete("/{demand_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_demand(demand_id: str, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    check = supabase.table("demands").select("*").eq("id", demand_id).eq("user_id", current_user["id"]).execute()
    if not check.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Demand not found or not authorized")
    supabase.table("demands").delete().eq("id", demand_id).execute()
    return None