from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ResourceCreate(BaseModel):
    title: str
    description: str
    category: str
    contact: str
    country: str


class ResourceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    contact: Optional[str] = None
    country: Optional[str] = None


class ResourceResponse(BaseModel):
    id: str
    user_id: str
    title: str
    description: str
    category: str
    contact: str
    country: str
    is_premium: bool
    created_at: datetime