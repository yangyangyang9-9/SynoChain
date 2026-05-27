'use client'

import { useState, useEffect, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { apiGet } from '@/lib/api'
import { useAuthStore } from '@/store/authStore'
import { Resource, categoryColors, countryList, resourceCategories } from '@/types'

export default function ResourcesPage() {
  const t = useTranslations()
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [country, setCountry] = useState('')
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { isAuthenticated } = useAuthStore()

  const fetchResources = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const params: Record<string, string> = { page: String(page), limit: '12' }
      if (search) params.search = search
      if (category) params.category = category
      if (country) params.country = country
      const query = '?' + new URLSearchParams(params).toString()
      const data = await apiGet(`/api/resources${query}`)
      setResources(Array.isArray(data) ? data : data.items || [])
      setTotalPages(data.total_pages || Math.ceil((data.total || 0) / 12) || 1)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'))
    } finally {
      setLoading(false)
    }
  }, [search, category, country, page, t])

  useEffect(() => {
    fetchResources()
  }, [fetchResources])

  const getCountryInfo = (countryName: string) => {
    return countryList.find((c) => c.code === countryName || c.name === countryName)
  }

  const getCategoryClass = (cat: string) => {
    return categoryColors[cat] || categoryColors['其他']
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">{t('resources.title')}</h1>
          {isAuthenticated && (
            <Link
              href="/resources/publish"
              className="px-5 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/25"
            >
              + {t('resources.publish')}
            </Link>
          )}
        </div>

        <div className="glass rounded-xl p-4 mb-8 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1) }}
            placeholder={t('resources.searchPlaceholder')}
            className="flex-1 px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 text-sm"
          />
          <select
            value={category}
            onChange={(e) => { setCategory(e.target.value); setPage(1) }}
            className="px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-gray-300 text-sm focus:outline-none focus:border-cyan-500/50"
          >
            <option value="">{t('resources.allCategories')}</option>
            {resourceCategories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={country}
            onChange={(e) => { setCountry(e.target.value); setPage(1) }}
            className="px-4 py-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-gray-300 text-sm focus:outline-none focus:border-cyan-500/50"
          >
            <option value="">{t('resources.allCountries')}</option>
            {countryList.map((c) => (
              <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="glass rounded-xl p-6 animate-pulse">
                <div className="h-5 bg-white/5 rounded w-16 mb-4" />
                <div className="h-6 bg-white/5 rounded w-3/4 mb-3" />
                <div className="h-4 bg-white/5 rounded w-full mb-2" />
                <div className="h-4 bg-white/5 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <button
              onClick={fetchResources}
              className="px-4 py-2 rounded-lg text-sm bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors"
            >
              {t('common.retry')}
            </button>
          </div>
        ) : resources.length === 0 ? (
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-gray-500">{t('resources.noResults')}</p>
            {isAuthenticated && (
              <Link href="/resources/publish" className="text-sm text-cyan-400 hover:text-cyan-300 mt-2 inline-block">
                {t('resources.publish')}
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((resource) => {
                const countryInfo = getCountryInfo(resource.country)
                return (
                  <div
                    key={resource.id}
                    className="glass rounded-xl p-6 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all group"
                  >
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryClass(resource.category)}`}
                    >
                      {resource.category}
                    </span>
                    <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                      {resource.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400 line-clamp-2 leading-relaxed">
                      {resource.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        {countryInfo ? `${countryInfo.flag} ${countryInfo.name}` : resource.country}
                      </span>
                      <span className="text-sm text-gray-600">{resource.contact}</span>
                    </div>
                  </div>
                )
              })}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg text-sm border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {t('common.back')}
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`w-10 h-10 rounded-lg text-sm transition-colors ${
                      p === page
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'border border-white/10 text-gray-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {p}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg text-sm border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                >
                  {t('home.viewAll')}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}