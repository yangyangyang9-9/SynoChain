from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class DemandCreate(BaseModel):
    title: str
    description: str
    category: str
    country: str


class DemandUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    country: Optional[str] = None


class DemandResponse(BaseModel):
    id: str
    user_id: str
    title: str
    description: str
    category: str
    country: str
    created_at: datetime