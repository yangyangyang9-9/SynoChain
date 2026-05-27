from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ResourceDraftCreate(BaseModel):
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


class ResourceDraftUpdate(BaseModel):
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


class ResourceDraftResponse(BaseModel):
    id: str
    user_id: str
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
    status: str = "draft"
    created_at: datetime
    updated_at: datetime


class DemandDraftCreate(BaseModel):
    title: str
    description: str
    category: str
    country: str
    industry: Optional[str] = None
    tags: Optional[list[str]] = None
    budget: Optional[str] = None
    quantity: Optional[str] = None
    image_urls: Optional[list[str]] = None


class DemandDraftUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    country: Optional[str] = None
    industry: Optional[str] = None
    tags: Optional[list[str]] = None
    budget: Optional[str] = None
    quantity: Optional[str] = None
    image_urls: Optional[list[str]] = None


class DemandDraftResponse(BaseModel):
    id: str
    user_id: str
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    country: Optional[str] = None
    industry: Optional[str] = None
    tags: Optional[list[str]] = None
    budget: Optional[str] = None
    quantity: Optional[str] = None
    image_urls: Optional[list[str]] = None
    status: str = "draft"
    created_at: datetime
    updated_at: datetime