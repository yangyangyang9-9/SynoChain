'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from '@/i18n/routing'
import { useAuthStore } from '@/store/authStore'
import { apiPost } from '@/lib/api'

interface ChatButtonProps {
  resourceUserId: string
  resourceTitle: string
  resourceId?: string
  demandId?: string
}

export default function ChatButton({ resourceUserId, resourceTitle, resourceId, demandId }: ChatButtonProps) {
  const t = useTranslations()
  const router = useRouter()
  const { token, user, isAuthenticated } = useAuthStore()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  if (!isAuthenticated || !token) return null

  if (user?.id === resourceUserId) return null

  const handleClick = async () => {
    setLoading(true)
    setError('')
    try {
      const body: Record<string, string> = {
        participant_id: resourceUserId,
        subject: resourceTitle,
      }
      if (resourceId) body.resource_id = resourceId
      if (demandId) body.demand_id = demandId

      const result = await apiPost('/api/messages/conversations', body, token)
      const conversationId = result.id || result.conversation_id
      if (conversationId) {
        router.push(`/messages/${conversationId}`)
      } else {
        setError(t('messages.createError'))
      }
    } catch {
      setError(t('messages.createError'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            {t('common.loading')}
          </span>
        ) : (
          t('common.contact')
        )}
      </button>
      {error && (
        <p className="text-xs text-red-400 mt-1">{error}</p>
      )}
    </div>
  )
}