'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { apiGet } from '@/lib/api'
import { Resource, categoryColors, countryList } from '@/types'

export default function HotResources() {
  const [resources, setResources] = useState<Resource[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = await apiGet('/api/resources?limit=6')
        setResources(Array.isArray(data) ? data : data.items || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load resources')
      } finally {
        setLoading(false)
      }
    }
    fetchResources()
  }, [])

  const getCountryInfo = (country: string) => {
    return countryList.find((c) => c.code === country || c.name === country)
  }

  const getCategoryClass = (category: string) => {
    return categoryColors[category] || categoryColors['其他']
  }

  if (loading) {
    return (
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">热门商业资源</h2>
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">热门商业资源</h2>
          </div>
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-gray-500">加载失败: {error}</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">热门商业资源</h2>
          <Link
            href="/resources"
            className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
          >
            查看全部
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {resources.length === 0 ? (
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-gray-500">暂无资源数据</p>
            <Link href="/resources/publish" className="text-sm text-cyan-400 hover:text-cyan-300 mt-2 inline-block">
              发布第一个资源
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resources.slice(0, 6).map((resource) => {
              const countryInfo = getCountryInfo(resource.country)
              return (
                <Link
                  key={resource.id}
                  href={`/resources`}
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
                    <span className="text-sm text-cyan-400 group-hover:translate-x-1 transition-transform">
                      查看详情 &rarr;
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