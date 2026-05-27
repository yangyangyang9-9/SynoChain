from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ResourceCreate(BaseModel):
    title: str
    description: str
    category: str
    contact: str
    country: str
    industry: Optional[str] = None
    tags: Optional[list[str]] = None
    budget: Optional[str] = None
    quantity: Optional[str] = None
    image_urls: Optional[list[str]] = None


class ResourceUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    contact: Optional[str] = None
    country: Optional[str] = None
    industry: Optional[str] = None
    tags: Optional[list[str]] = None
    budget: Optional[str] = None
    quantity: Optional[str] = None
    image_urls: Optional[list[str]] = None


class ResourceResponse(BaseModel):
    id: str
    user_id: str
    title: str
    description: str
    category: str
    contact: str
    country: str
    is_premium: bool
    industry: Optional[str] = None
    tags: Optional[list[str]] = None
    budget: Optional[str] = None
    quantity: Optional[str] = None
    image_urls: Optional[list[str]] = None
    created_at: datetime