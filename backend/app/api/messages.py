from datetime import datetime
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status

from app.core.auth import get_current_user
from app.core.database import get_supabase_admin
from app.models.message import ConversationCreate, ConversationResponse, MessageCreate, MessageResponse
from app.services.ai_service import ai_service

router = APIRouter(prefix="/api/messages", tags=["messages"])


@router.get("/conversations", response_model=list[ConversationResponse])
def list_conversations(current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    user_id = current_user["id"]

    participations = (
        supabase.table("conversation_participants")
        .select("conversation_id")
        .eq("user_id", user_id)
        .execute()
    )
    conversation_ids = [p["conversation_id"] for p in participations.data]
    if not conversation_ids:
        return []

    conversations_result = (
        supabase.table("conversations")
        .select("*")
        .in_("id", conversation_ids)
        .order("updated_at", desc=True)
        .execute()
    )
    conversations = conversations_result.data

    result = []
    for conv in conversations:
        conv_id = conv["id"]

        participants_result = (
            supabase.table("conversation_participants")
            .select("user_id")
            .eq("conversation_id", conv_id)
            .execute()
        )
        participant_user_ids = [p["user_id"] for p in participants_result.data]

        participants_info = []
        for puid in participant_user_ids:
            user_result = (
                supabase.table("users")
                .select("id,email")
                .eq("id", puid)
                .execute()
            )
            if user_result.data:
                participants_info.append(user_result.data[0])

        last_message = None
        last_msg_result = (
            supabase.table("messages")
            .select("content")
            .eq("conversation_id", conv_id)
            .order("created_at", desc=True)
            .limit(1)
            .execute()
        )
        if last_msg_result.data:
            last_message = last_msg_result.data[0]["content"]

        my_participation = None
        for p in participants_result.data:
            if p["user_id"] == user_id:
                my_participation = p
                break

        unread_count = 0
        if my_participation and my_participation.get("last_read_at"):
            unread_result = (
                supabase.table("messages")
                .select("id")
                .eq("conversation_id", conv_id)
                .gt("created_at", my_participation["last_read_at"])
                .neq("sender_id", user_id)
                .execute()
            )
            unread_count = len(unread_result.data)
        else:
            unread_result = (
                supabase.table("messages")
                .select("id")
                .eq("conversation_id", conv_id)
                .neq("sender_id", user_id)
                .execute()
            )
            unread_count = len(unread_result.data)

        result.append(
            ConversationResponse(
                id=conv["id"],
                subject=conv.get("subject", ""),
                resource_id=conv.get("resource_id"),
                demand_id=conv.get("demand_id"),
                created_at=conv["created_at"],
                updated_at=conv["updated_at"],
                last_message=last_message,
                unread_count=unread_count,
                participants=participants_info,
            )
        )

    return result


@router.post("/conversations", response_model=ConversationResponse, status_code=status.HTTP_201_CREATED)
def create_conversation(conv: ConversationCreate, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    user_id = current_user["id"]

    new_conv = {
        "subject": conv.subject,
    }
    if conv.resource_id:
        new_conv["resource_id"] = conv.resource_id
    if conv.demand_id:
        new_conv["demand_id"] = conv.demand_id

    conv_result = supabase.table("conversations").insert(new_conv).execute()
    if not conv_result.data:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to create conversation")

    created_conv = conv_result.data[0]
    conv_id = created_conv["id"]

    supabase.table("conversation_participants").insert({
        "conversation_id": conv_id,
        "user_id": user_id,
    }).execute()

    if conv.participant_id != user_id:
        supabase.table("conversation_participants").insert({
            "conversation_id": conv_id,
            "user_id": conv.participant_id,
        }).execute()

    participants_result = (
        supabase.table("conversation_participants")
        .select("user_id")
        .eq("conversation_id", conv_id)
        .execute()
    )
    participant_user_ids = [p["user_id"] for p in participants_result.data]
    participants_info = []
    for puid in participant_user_ids:
        user_result = supabase.table("users").select("id,email").eq("id", puid).execute()
        if user_result.data:
            participants_info.append(user_result.data[0])

    return ConversationResponse(
        id=created_conv["id"],
        subject=created_conv.get("subject", ""),
        resource_id=created_conv.get("resource_id"),
        demand_id=created_conv.get("demand_id"),
        created_at=created_conv["created_at"],
        updated_at=created_conv["updated_at"],
        last_message=None,
        unread_count=0,
        participants=participants_info,
    )


@router.get("/conversations/{conversation_id}", response_model=ConversationResponse)
def get_conversation(conversation_id: str, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    user_id = current_user["id"]

    participant_check = (
        supabase.table("conversation_participants")
        .select("id")
        .eq("conversation_id", conversation_id)
        .eq("user_id", user_id)
        .execute()
    )
    if not participant_check.data:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not a participant of this conversation")

    conv_result = (
        supabase.table("conversations")
        .select("*")
        .eq("id", conversation_id)
        .execute()
    )
    if not conv_result.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Conversation not found")
    conv = conv_result.data[0]

    participants_result = (
        supabase.table("conversation_participants")
        .select("user_id")
        .eq("conversation_id", conversation_id)
        .execute()
    )
    participant_user_ids = [p["user_id"] for p in participants_result.data]
    participants_info = []
    for puid in participant_user_ids:
        user_result = supabase.table("users").select("id,email").eq("id", puid).execute()
        if user_result.data:
            participants_info.append(user_result.data[0])

    last_message = None
    last_msg_result = (
        supabase.table("messages")
        .select("content")
        .eq("conversation_id", conversation_id)
        .order("created_at", desc=True)
        .limit(1)
        .execute()
    )
    if last_msg_result.data:
        last_message = last_msg_result.data[0]["content"]

    my_participation = participant_check.data[0]
    unread_count = 0
    if my_participation.get("last_read_at"):
        unread_result = (
            supabase.table("messages")
            .select("id")
            .eq("conversation_id", conversation_id)
            .gt("created_at", my_participation["last_read_at"])
            .neq("sender_id", user_id)
            .execute()
        )
        unread_count = len(unread_result.data)
    else:
        unread_result = (
            supabase.table("messages")
            .select("id")
            .eq("conversation_id", conversation_id)
            .neq("sender_id", user_id)
            .execute()
        )
        unread_count = len(unread_result.data)

    supabase.table("conversation_participants").update({
        "last_read_at": datetime.utcnow().isoformat()
    }).eq("conversation_id", conversation_id).eq("user_id", user_id).execute()

    return ConversationResponse(
        id=conv["id"],
        subject=conv.get("subject", ""),
        resource_id=conv.get("resource_id"),
        demand_id=conv.get("demand_id"),
        created_at=conv["created_at"],
        updated_at=conv["updated_at"],
        last_message=last_message,
        unread_count=unread_count,
        participants=participants_info,
    )


@router.get("/conversations/{conversation_id}/messages", response_model=list[MessageResponse])
def list_messages(
    conversation_id: str,
    page: int = Query(1, ge=1),
    page_size: int = Query(50, ge=1, le=200),
    current_user: dict = Depends(get_current_user),
):
    supabase = get_supabase_admin()
    user_id = current_user["id"]

    participant_check = (
        supabase.table("conversation_participants")
        .select("id")
        .eq("conversation_id", conversation_id)
        .eq("user_id", user_id)
        .execute()
    )
    if not participant_check.data:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not a participant of this conversation")

    offset = (page - 1) * page_size
    messages_result = (
        supabase.table("messages")
        .select("*")
        .eq("conversation_id", conversation_id)
        .order("created_at", asc=True)
        .range(offset, offset + page_size - 1)
        .execute()
    )

    sender_ids = list({m["sender_id"] for m in messages_result.data})
    sender_email_map = {}
    if sender_ids:
        users_result = (
            supabase.table("users")
            .select("id,email")
            .in_("id", sender_ids)
            .execute()
        )
        for u in users_result.data:
            sender_email_map[u["id"]] = u["email"]

    return [
        MessageResponse(
            id=m["id"],
            conversation_id=m["conversation_id"],
            sender_id=m["sender_id"],
            content=m["content"],
            content_type=m.get("content_type", "text"),
            created_at=m["created_at"],
            sender_email=sender_email_map.get(m["sender_id"]),
        )
        for m in messages_result.data
    ]


@router.post("/messages", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
def send_message(message: MessageCreate, current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    user_id = current_user["id"]

    participant_check = (
        supabase.table("conversation_participants")
        .select("id")
        .eq("conversation_id", message.conversation_id)
        .eq("user_id", user_id)
        .execute()
    )
    if not participant_check.data:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not a participant of this conversation")

    new_message = {
        "conversation_id": message.conversation_id,
        "sender_id": user_id,
        "content": message.content,
        "content_type": message.content_type,
    }
    msg_result = supabase.table("messages").insert(new_message).execute()
    if not msg_result.data:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to send message")

    supabase.table("conversations").update({
        "updated_at": datetime.utcnow().isoformat()
    }).eq("id", message.conversation_id).execute()

    try:
        participant_ids_result = (
            supabase.table("conversation_participants")
            .select("user_id")
            .eq("conversation_id", message.conversation_id)
            .neq("user_id", user_id)
            .execute()
        )
        for p in participant_ids_result.data:
            supabase.table("conversation_participants").update({
                "last_read_at": datetime.utcnow().isoformat()
            }).eq("conversation_id", message.conversation_id).eq("user_id", user_id).execute()
    except Exception:
        pass

    try:
        ai_service.analyze_text(message.content)
    except Exception:
        pass

    m = msg_result.data[0]
    user_result = supabase.table("users").select("email").eq("id", user_id).execute()
    sender_email = user_result.data[0]["email"] if user_result.data else None

    return MessageResponse(
        id=m["id"],
        conversation_id=m["conversation_id"],
        sender_id=m["sender_id"],
        content=m["content"],
        content_type=m.get("content_type", "text"),
        created_at=m["created_at"],
        sender_email=sender_email,
    )


@router.get("/unread-count")
def get_unread_count(current_user: dict = Depends(get_current_user)):
    supabase = get_supabase_admin()
    user_id = current_user["id"]

    participations = (
        supabase.table("conversation_participants")
        .select("conversation_id,last_read_at")
        .eq("user_id", user_id)
        .execute()
    )

    total_unread = 0
    for p in participations.data:
        conv_id = p["conversation_id"]
        if p.get("last_read_at"):
            unread_result = (
                supabase.table("messages")
                .select("id")
                .eq("conversation_id", conv_id)
                .gt("created_at", p["last_read_at"])
                .neq("sender_id", user_id)
                .execute()
            )
            total_unread += len(unread_result.data)
        else:
            unread_result = (
                supabase.table("messages")
                .select("id")
                .eq("conversation_id", conv_id)
                .neq("sender_id", user_id)
                .execute()
            )
            total_unread += len(unread_result.data)

    return {"unread_count": total_unread}