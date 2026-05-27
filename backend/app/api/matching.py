from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.core.auth import get_current_user
from app.core.database import get_supabase_admin
from app.models.match import MatchRequest, MatchResponse
from app.services.ai_service import ai_service

router = APIRouter(prefix="/api/matching", tags=["matching"])


@router.post("/match", response_model=MatchResponse)
def match_resource_demand(request: MatchRequest, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()

    resource_result = supabase.table("resources").select("*").eq("id", request.resource_id).execute()
    if not resource_result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Resource not found")
    resource = resource_result.data[0]

    demand_result = supabase.table("demands").select("*").eq("id", request.demand_id).execute()
    if not demand_result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Demand not found")
    demand = demand_result.data[0]

    match_result = ai_service.match_resource_demand(
        resource={"title": resource["title"], "description": resource["description"], "category": resource["category"], "country": resource["country"]},
        demand={"title": demand["title"], "description": demand["description"], "category": demand["category"], "country": demand["country"]},
    )

    insert_data = {
        "resource_id": request.resource_id,
        "demand_id": request.demand_id,
        "score": match_result["score"],
        "reason": match_result["reason"],
        "industry": match_result["industry"],
        "recommendation": match_result["recommendation"],
    }
    result = supabase.table("ai_matches").insert(insert_data).execute()

    if not result.data:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to save match result")

    saved = result.data[0]
    return MatchResponse(
        id=saved["id"],
        resource_id=saved["resource_id"],
        demand_id=saved["demand_id"],
        score=saved["score"],
        reason=saved["reason"],
        industry=saved["industry"],
        recommendation=saved["recommendation"],
    )


@router.get("/results", response_model=list[MatchResponse])
def get_match_results(page: int = Query(1, ge=1), page_size: int = Query(20, ge=1, le=100)):
    supabase = get_supabase_admin()
    offset = (page - 1) * page_size
    result = (
        supabase.table("ai_matches")
        .select("*")
        .order("created_at", desc=True)
        .range(offset, offset + page_size - 1)
        .execute()
    )
    return [
        MatchResponse(
            id=m["id"],
            resource_id=m["resource_id"],
            demand_id=m["demand_id"],
            score=m["score"],
            reason=m["reason"],
            industry=m["industry"],
            recommendation=m["recommendation"],
        )
        for m in result.data
    ]


@router.get("/results/{match_id}", response_model=MatchResponse)
def get_match_result(match_id: str):
    supabase = get_supabase_admin()
    result = supabase.table("ai_matches").select("*").eq("id", match_id).execute()
    if not result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Match result not found")
    m = result.data[0]
    return MatchResponse(
        id=m["id"],
        resource_id=m["resource_id"],
        demand_id=m["demand_id"],
        score=m["score"],
        reason=m["reason"],
        industry=m["industry"],
        recommendation=m["recommendation"],
    )


@router.get("/recommendations")
def get_recommendations(current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    result = (
        supabase.table("ai_matches")
        .select("*")
        .order("created_at", desc=True)
        .limit(20)
        .execute()
    )
    return [
        {
            "id": m["id"],
            "match_score": m["score"],
            "reason": m["reason"],
            "is_read": False,
            "created_at": m["created_at"],
        }
        for m in result.data
    ]


@router.post("/analyze")
def analyze_text(payload: dict):
    text = payload.get("text", "")
    if not text:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Text is required")
    result = ai_service.analyze_text(text)
    return result