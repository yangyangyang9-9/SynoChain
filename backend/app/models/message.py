from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class ConversationCreate(BaseModel):
    participant_id: str
    subject: str
    resource_id: Optional[str] = None
    demand_id: Optional[str] = None


class ConversationResponse(BaseModel):
    id: str
    subject: str
    resource_id: Optional[str] = None
    demand_id: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    last_message: Optional[str] = None
    unread_count: int = 0
    participants: list[dict] = []


class MessageCreate(BaseModel):
    conversation_id: str
    content: str
    content_type: str = "text"


class MessageResponse(BaseModel):
    id: str
    conversation_id: str
    sender_id: str
    content: str
    content_type: str
    created_at: datetime
    sender_email: Optional[str] = None