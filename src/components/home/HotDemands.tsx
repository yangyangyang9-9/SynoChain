'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { apiGet } from '@/lib/api'
import { Demand, categoryColors, countryList } from '@/types'

export default function HotDemands() {
  const t = useTranslations()
  const [demands, setDemands] = useState<Demand[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDemands = async () => {
      try {
        const data = await apiGet('/api/demands?limit=6')
        setDemands(Array.isArray(data) ? data : data.items || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : t('common.error'))
      } finally {
        setLoading(false)
      }
    }
    fetchDemands()
  }, [t])

  const getCountryInfo = (country: string) => {
    return countryList.find((c) => c.code === country || c.name === country)
  }

  const getCategoryClass = (category: string) => {
    return categoryColors[category] || categoryColors['其他']
  }

  if (loading) {
    return (
      <section className="py-20 bg-[#0a0a0f]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{t('home.hotDemands')}</h2>
          </div>
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
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-20 bg-[#0a0a0f]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">{t('home.hotDemands')}</h2>
          </div>
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-gray-500">{t('common.error')}: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-[#0a0a0f]/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{t('home.hotDemands')}</h2>
          <Link
            href="/demands"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
          >
            {t('home.viewAll')}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {demands.length === 0 ? (
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-gray-500">{t('demands.noResults')}</p>
            <Link href="/demands/publish" className="text-sm text-cyan-400 hover:text-cyan-300 mt-2 inline-block">
              {t('demands.publish')}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {demands.slice(0, 6).map((demand) => {
              const countryInfo = getCountryInfo(demand.country)
              return (
                <Link
                  key={demand.id}
                  href="/demands"
                  className="glass rounded-xl p-6 hover:border-cyan-500/30 hover:bg-white/[0.04] transition-all group"
                >
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryClass(demand.category)}`}
                  >
                    {demand.category}
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-white group-hover:text-cyan-400 transition-colors line-clamp-1">
                    {demand.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-400 line-clamp-2 leading-relaxed">
                    {demand.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {countryInfo ? `${countryInfo.flag} ${countryInfo.name}` : demand.country}
                    </span>
                    <span className="text-sm text-cyan-400 group-hover:translate-x-1 transition-transform">
                      {t('demands.details')} &rarr;
                    </span>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}