'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/routing'
import { useAuthStore } from '@/store/authStore'
import { apiGet, apiPost } from '@/lib/api'
import { Conversation, Message } from '@/types'

export default function MessagesPage() {
  const t = useTranslations()
  const router = useRouter()
  const { isAuthenticated, token, user, loadFromStorage, fetchMe } = useAuthStore()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConv, setSelectedConv] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [loadingConvs, setLoadingConvs] = useState(true)
  const [loadingMsgs, setLoadingMsgs] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showList, setShowList] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    loadFromStorage()
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      fetchMe()
    }
  }, [])

  const fetchConversations = useCallback(async () => {
    if (!token) return
    setError(null)
    try {
      const data = await apiGet('/api/messages/conversations', token)
      setConversations(Array.isArray(data) ? data : data.items || [])
    } catch {
      setError(t('messages.loadError'))
    } finally {
      setLoadingConvs(false)
    }
  }, [token, t])

  useEffect(() => {
    if (!token) {
      setLoadingConvs(false)
      return
    }
    fetchConversations()
  }, [token, fetchConversations])

  const fetchMessages = useCallback(async (conversationId: string) => {
    if (!token) return
    setLoadingMsgs(true)
    try {
      const data = await apiGet(`/api/messages/conversations/${conversationId}/messages`, token)
      setMessages(Array.isArray(data) ? data : data.items || [])
    } catch {
      setError(t('messages.loadError'))
    } finally {
      setLoadingMsgs(false)
    }
  }, [token, t])

  useEffect(() => {
    if (selectedConv) {
      fetchMessages(selectedConv)
    }
  }, [selectedConv, fetchMessages])

  useEffect(() => {
    if (!selectedConv || !token) return
    pollingRef.current = setInterval(() => {
      fetchMessages(selectedConv)
    }, 10000)
    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current)
    }
  }, [selectedConv, token, fetchMessages])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSelectConversation = (id: string) => {
    setSelectedConv(id)
    setShowList(false)
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConv || !token) return
    try {
      await apiPost(
        `/api/messages/conversations/${selectedConv}/messages`,
        { content: newMessage.trim(), content_type: 'text' },
        token
      )
      setNewMessage('')
      fetchMessages(selectedConv)
      fetchConversations()
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

  const getOtherParticipant = (conv: Conversation) => {
    if (!user) return 'Unknown'
    const other = conv.participants?.find((p) => p.user_id !== user.id)
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

  const selectedConversation = conversations.find((c) => c.id === selectedConv)

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
      <div className="max-w-7xl mx-auto px-0 sm:px-4 lg:px-6 h-[calc(100vh-64px)]">
        <div className="glass rounded-none sm:rounded-xl h-full flex overflow-hidden">

          <div className={`w-full sm:w-80 lg:w-96 border-r border-white/5 flex flex-col shrink-0 ${
            showList ? 'block' : 'hidden sm:block'
          }`}>
            <div className="p-4 border-b border-white/5">
              <h1 className="text-lg font-bold text-white">{t('messages.title')}</h1>
            </div>

            <div className="flex-1 overflow-y-auto">
              {loadingConvs ? (
                <div className="p-4 space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="animate-pulse flex gap-3 p-3">
                      <div className="w-10 h-10 rounded-full bg-white/5 shrink-0" />
                      <div className="flex-1">
                        <div className="h-4 bg-white/5 rounded w-32 mb-2" />
                        <div className="h-3 bg-white/5 rounded w-48" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : error ? (
                <div className="p-8 text-center">
                  <p className="text-red-400 text-sm mb-3">{error}</p>
                  <button
                    onClick={fetchConversations}
                    className="px-4 py-2 rounded-lg text-sm bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
                  >
                    {t('common.retry')}
                  </button>
                </div>
              ) : conversations.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-500 text-sm">{t('messages.noConversations')}</p>
                </div>
              ) : (
                conversations.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => handleSelectConversation(conv.id)}
                    className={`w-full text-left p-4 hover:bg-white/[0.03] transition-colors border-b border-white/[0.02] ${
                      selectedConv === conv.id ? 'bg-white/[0.05]' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center text-sm font-medium text-cyan-400 shrink-0">
                        {getOtherParticipant(conv).charAt(0).toUpperCase()}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white truncate">
                            {getOtherParticipant(conv)}
                          </span>
                          <span className="text-xs text-gray-600 shrink-0 ml-2">
                            {formatTime(conv.updated_at)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 truncate mt-1">{conv.last_message || conv.subject}</p>
                      </div>
                      {conv.unread_count > 0 && (
                        <span className="shrink-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {conv.unread_count > 99 ? '99+' : conv.unread_count}
                        </span>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className={`flex-1 flex flex-col min-w-0 ${
            !showList ? 'block' : 'hidden sm:flex'
          }`}>
            {selectedConv && selectedConversation ? (
              <>
                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                  <button
                    onClick={() => { setShowList(true); setSelectedConv(null) }}
                    className="sm:hidden text-gray-400 hover:text-white"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 18l-6-6 6-6" />
                    </svg>
                  </button>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 flex items-center justify-center text-xs font-medium text-cyan-400">
                    {getOtherParticipant(selectedConversation).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-white">{getOtherParticipant(selectedConversation)}</p>
                    <p className="text-xs text-gray-500">{selectedConversation.subject}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                  {loadingMsgs ? (
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`animate-pulse flex ${i % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
                          <div className="h-12 bg-white/5 rounded-xl w-48" />
                        </div>
                      ))}
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
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-700 mx-auto mb-4">
                    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                  </svg>
                  <p className="text-gray-500 text-sm">{t('messages.selectConversation')}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}