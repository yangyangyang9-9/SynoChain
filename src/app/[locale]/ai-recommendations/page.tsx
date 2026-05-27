'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { apiGet } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { AIRecommendation } from '@/types'

function CircularProgress({ score }: { score: number }) {
  const radius = 32
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <svg width="80" height="80" viewBox="0 0 80 80">
      <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="5" />
      <circle
        cx="40"
        cy="40"
        r={radius}
        fill="none"
        stroke="url(#rec-grad)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 40 40)"
        className="transition-all duration-1000"
      />
      <defs>
        <linearGradient id="rec-grad" x1="0" y1="0" x2="80" y2="80">
          <stop stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <text x="40" y="40" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="18" fontWeight="bold">
        {score}%
      </text>
    </svg>
  )
}

export default function AIRecommendationsPage() {
  const t = useTranslations()
  const { isAuthenticated, token, loadFromStorage, fetchMe } = useAuthStore()
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadFromStorage()
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      fetchMe()
    }
  }, [])

  useEffect(() => {
    if (!token) {
      setLoading(false)
      return
    }

    const fetchRecommendations = async () => {
      try {
        const data = await apiGet('/api/matching/recommendations', token)
        setRecommendations(Array.isArray(data) ? data : data.items || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : t('common.error'))
      } finally {
        setLoading(false)
      }
    }

    fetchRecommendations()
  }, [token, t])

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <h1 className="text-3xl sm:text-4xl font-bold text-white">{t('aiRecommend.title')}</h1>
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
              </span>
            </div>
          </div>

          <div className="glass rounded-2xl p-12 text-center max-w-lg mx-auto">
            <h2 className="text-xl font-bold text-white mb-4">{t('aiRecommend.title')}</h2>
            <p className="text-sm text-gray-500 mb-6">
              {t('aiRecommend.notLoggedIn')}
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/login"
                className="px-6 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
              >
                {t('auth.loginBtn')}
              </Link>
              <Link
                href="/register"
                className="px-6 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white"
              >
                {t('auth.registerBtn')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-white">{t('aiRecommend.title')}</h1>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass rounded-xl p-6 animate-pulse">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-20 h-20 bg-white/5 rounded-full" />
                  <div className="h-6 bg-white/5 rounded w-20" />
                </div>
                <div className="h-4 bg-white/5 rounded w-full mb-2" />
                <div className="h-4 bg-white/5 rounded w-3/4 mb-2" />
                <div className="h-4 bg-white/5 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center gap-3 mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{t('aiRecommend.title')}</h1>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
          </span>
        </div>

        {error ? (
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : recommendations.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center max-w-lg mx-auto">
            <h3 className="text-lg font-semibold text-white mb-3">{t('aiRecommend.noData')}</h3>
            <p className="text-sm text-gray-500 mb-6">
              {t('aiRecommend.publishToGet')}
            </p>
            <div className="flex gap-3 justify-center">
              <Link
                href="/resources/publish"
                className="px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
              >
                {t('resources.publish')}
              </Link>
              <Link
                href="/demands/publish"
                className="px-5 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white"
              >
                {t('demands.publish')}
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="gradient-border rounded-xl bg-[#1a1a2e] p-6 hover:shadow-lg hover:shadow-cyan-500/10 transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <CircularProgress score={rec.match_score} />
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                    {t('aiRecommend.title')}
                  </span>
                </div>

                <div className="space-y-3">
                  {rec.resource && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t('resources.title')}</p>
                      <p className="text-sm text-white font-medium">{rec.resource.title}</p>
                    </div>
                  )}
                  {rec.demand && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t('demands.title')}</p>
                      <p className="text-sm text-white font-medium">{rec.demand.title}</p>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-4 border-t border-white/5">
                  <p className="text-xs text-gray-500 mb-1">{t('aiRecommend.score')}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{rec.reason}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-gray-600">
                    {new Date(rec.created_at).toLocaleDateString('zh-CN')}
                  </span>
                  <div className="flex items-center gap-2">
                    {!rec.is_read && (
                      <span className="w-2 h-2 rounded-full bg-cyan-500" />
                    )}
                    <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                      {t('aiRecommend.viewDetail')}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {recommendations.length > 0 && (
          <div className="text-center mt-12">
            <p className="text-sm text-gray-600">
              {t('home.aiRecommendSubtitle')}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}