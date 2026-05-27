from datetime import datetime

from pydantic import BaseModel


class SubscriptionCreate(BaseModel):
    plan: str


class SubscriptionResponse(BaseModel):
    id: str
    user_id: str
    plan: str
    status: str
    amount: float
    started_at: datetime
    expires_at: datetime


class PremiumResourceResponse(BaseModel):
    id: str
    title: str
    description: str
    category: str
    industry: str
    country: str
    contact_info: str
    verified: bool