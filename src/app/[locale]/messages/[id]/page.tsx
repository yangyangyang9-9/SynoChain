'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/routing'
import { useAuthStore } from '@/store/authStore'
import { apiGet, apiPost } from '@/lib/api'
import { Message, Conversation } from '@/types'
import { use } from 'react'

export default function ConversationDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const t = useTranslations()
  const router = useRouter()
  const { isAuthenticated, token, user, loadFromStorage, fetchMe } = useAuthStore()
  const [conversation, setConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loadingConv, setLoadingConv] = useState(true)
  const [loadingMsgs, setLoadingMsgs] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    loadFromStorage()
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      fetchMe()
    }
  }, [])

  const fetchConversation = useCallback(async () => {
    if (!token) return
    try {
      const data = await apiGet(`/api/messages/conversations/${id}`, token)
      setConversation(data)
    } catch {
      setError(t('messages.loadError'))
    } finally {
      setLoadingConv(false)
    }
  }, [id, token, t])

  const fetchMessages = useCallback(async () => {
    if (!token) return
    setLoadingMsgs(true)
    try {
      const data = await apiGet(`/api/messages/conversations/${id}/messages`, token)
      setMessages(Array.isArray(data) ? data : data.items || [])
    } catch {
      setError(t('messages.loadError'))
    } finally {
      setLoadingMsgs(false)
    }
  }, [id, token, t])

  useEffect(() => {
    if (!token) return
    fetchConversation()
    fetchMessages()
  }, [token, fetchConversation, fetchMessages])

  useEffect(() => {
    if (!token) return
    pollingRef.current = setInterval(() => {
      fetchMessages()
    }, 10000)
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [token, fetchMessages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !token) return
    try {
      await apiPost(
        `/api/messages/conversations/${id}/messages`,
        { content: newMessage.trim(), content_type: 'text' },
        token
      )
      setNewMessage('')
      fetchMessages()
    } catch {
      setError(t('messages.loadError'))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const getOtherParticipant = () => {
    if (!user || !conversation) return 'Unknown'
    const other = conversation.participants?.find((p) => p.user_id !== user.id)
    return other?.email || 'Unknown'
  }

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (diffDays === 0) {
      return date.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })
    }
    if (diffDays === 1) return '昨天'
    if (diffDays < 7) return `${diffDays}天前`
    return date.toLocaleDateString('zh-CN')
  }

  if (!isAuthenticated && !token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="glass rounded-2xl p-12 text-center max-w-md">
          <h2 className="text-xl font-bold text-white mb-4">{t('auth.loginTitle')}</h2>
          <p className="text-sm text-gray-500 mb-6">{t('messages.title')}</p>
          <Link
            href="/login"
            className="px-6 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
          >
            {t('auth.loginBtn')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="max-w-3xl mx-auto px-0 sm:px-4 h-[calc(100vh-64px)]">
        <div className="glass rounded-none sm:rounded-xl h-full flex flex-col">

          <div className="p-4 border-b border-white/5 flex items-center gap-3">
            <Link
              href="/messages"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </Link>
            {loadingConv ? (
              <div className="animate-pulse flex-1">
                <div className="h-4 bg-white/5 rounded w-32" />
              </div>
            ) : conversation ? (
              <>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center text-xs font-medium text-cyan-400">
                  {getOtherParticipant().charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{getOtherParticipant()}</p>
                  <p className="text-xs text-gray-500">{conversation.subject}</p>
                </div>
              </>
            ) : null}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {loadingMsgs ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`animate-pulse flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                    <div className="h-12 bg-white/5 rounded-xl w-48" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <p className="text-red-400 text-sm mb-3">{error}</p>
                  <button
                    onClick={fetchMessages}
                    className="px-4 py-2 rounded-lg text-sm bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                  >
                    {t('common.retry')}
                  </button>
                </div>
              </div>
            ) : messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <p className="text-gray-500 text-sm">{t('messages.noMessages')}</p>
              </div>
            ) : (
              messages.map((msg) => {
                const isMine = msg.sender_id === user?.id
                return (
                  <div key={msg.id} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    {!isMine && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-gray-500/30 to-gray-600/30 flex items-center justify-center text-xs text-gray-400 shrink-0 mr-2 mt-1">
                        {msg.sender_email?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="max-w-[70%]">
                      <div
                        className={`px-4 py-2 rounded-2xl text-sm break-words ${
                          isMine
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-br-md'
                            : 'bg-white/[0.06] text-gray-200 rounded-bl-md'
                        }`}
                      >
                        {msg.content}
                      </div>
                      <p className={`text-xs text-gray-600 mt-1 ${isMine ? 'text-right' : 'text-left'}`}>
                        {formatTime(msg.created_at)}
                      </p>
                    </div>
                    {isMine && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center text-xs text-cyan-400 shrink-0 ml-2 mt-1">
                        {user?.email?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                )
              })
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 border-t border-white/5">
            <div className="flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t('messages.typeMessage')}
                className="flex-1 px-4 py-2.5 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 text-sm"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-sm font-medium hover:from-cyan-400 hover:to-blue-400 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                {t('messages.send')}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}