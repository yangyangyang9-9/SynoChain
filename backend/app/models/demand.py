from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class DemandCreate(BaseModel):
    title: str
    description: str
    category: str
    country: str
    industry: Optional[str] = None
    tags: Optional[list[str]] = None
    budget: Optional[str] = None
    quantity: Optional[str] = None
    image_urls: Optional[list[str]] = None


class DemandUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    country: Optional[str] = None
    industry: Optional[str] = None
    tags: Optional[list[str]] = None
    budget: Optional[str] = None
    quantity: Optional[str] = None
    image_urls: Optional[list[str]] = None


class DemandResponse(BaseModel):
    id: str
    user_id: str
    title: str
    description: str
    category: str
    country: str
    industry: Optional[str] = None
    tags: Optional[list[str]] = None
    budget: Optional[str] = None
    quantity: Optional[str] = None
    image_urls: Optional[list[str]] = None
    created_at: datetime