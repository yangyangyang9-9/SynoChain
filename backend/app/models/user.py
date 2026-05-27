from datetime import datetime
from typing import Optional

from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    id: str
    email: str
    role: str
    is_subscribed: bool
    created_at: datetime


class UserUpdate(BaseModel):
    is_subscribed: Optional[bool] = None
    subscription_expires_at: Optional[datetime] = None