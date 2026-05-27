from datetime import datetime
from typing import List

from pydantic import BaseModel


class MatchRequest(BaseModel):
    resource_id: str
    demand_id: str


class MatchResponse(BaseModel):
    id: str
    resource_id: str
    demand_id: str
    score: float
    reason: str
    industry: str
    recommendation: str


class BatchMatchResponse(BaseModel):
    matches: List[MatchResponse]


class AIRecommendationResponse(BaseModel):
    id: str
    match_score: float
    reason: str
    is_read: bool
    created_at: datetime