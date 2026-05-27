'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { useAuthStore } from '@/store/authStore'
import { apiGet, apiPut, apiDelete } from '@/lib/api'
import { Resource, Demand, AIRecommendation, Draft, categoryColors, resourceCategories, demandCategories, countryList } from '@/types'
import { useForm } from 'react-hook-form'

type Tab = 'resources' | 'demands' | 'drafts' | 'recommendations' | 'subscription'

export default function DashboardPage() {
  const t = useTranslations()
  const { isAuthenticated, token, user, fetchMe, loadFromStorage } = useAuthStore()
  const [activeTab, setActiveTab] = useState<Tab>('resources')
  const [resources, setResources] = useState<Resource[]>([])
  const [demands, setDemands] = useState<Demand[]>([])
  const [resourceDrafts, setResourceDrafts] = useState<Draft[]>([])
  const [demandDrafts, setDemandDrafts] = useState<Draft[]>([])
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [draftsLoading, setDraftsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [editModal, setEditModal] = useState<{ type: 'resource' | 'demand'; id: string } | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ type: 'resource' | 'demand' | 'draft'; id: string; draftType?: 'resource' | 'demand' } | null>(null)
  const [actionMsg, setActionMsg] = useState('')

  useEffect(() => {
    loadFromStorage()
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      fetchMe()
    }
  }, [])

  useEffect(() => {
    if (!token) return
    const fetchData = async () => {
      setLoading(true)
      setError(null)
      try {
        const [resData, demData, recData] = await Promise.all([
          apiGet('/api/resources/my', token),
          apiGet('/api/demands/my', token),
          apiGet('/api/matching/recommendations', token).catch(() => []),
        ])
        setResources(Array.isArray(resData) ? resData : resData.items || [])
        setDemands(Array.isArray(demData) ? demData : demData.items || [])
        setRecommendations(Array.isArray(recData) ? recData : recData.items || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : t('common.error'))
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [token, t])

  const fetchDrafts = async () => {
    if (!token) return
    setDraftsLoading(true)
    try {
      const [resDrafts, demDrafts] = await Promise.all([
        apiGet('/api/drafts/resources', token),
        apiGet('/api/drafts/demands', token),
      ])
      setResourceDrafts(Array.isArray(resDrafts) ? resDrafts : resDrafts.items || [])
      setDemandDrafts(Array.isArray(demDrafts) ? demDrafts : demDrafts.items || [])
    } catch (err) {
      setActionMsg(err instanceof Error ? err.message : t('dashboard.loadDraftError'))
      setTimeout(() => setActionMsg(''), 3000)
    } finally {
      setDraftsLoading(false)
    }
  }

  useEffect(() => {
    if (activeTab === 'drafts' && token) {
      fetchDrafts()
    }
  }, [activeTab, token])

  const handleDelete = async () => {
    if (!deleteConfirm || !token) return
    try {
      if (deleteConfirm.type === 'draft' && deleteConfirm.draftType) {
        const endpoint = deleteConfirm.draftType === 'resource' ? '/api/drafts/resources' : '/api/drafts/demands'
        await apiDelete(`${endpoint}/${deleteConfirm.id}`, token)
        if (deleteConfirm.draftType === 'resource') {
          setResourceDrafts((prev) => prev.filter((d) => d.id !== deleteConfirm.id))
        } else {
          setDemandDrafts((prev) => prev.filter((d) => d.id !== deleteConfirm.id))
        }
      } else {
        const endpoint = deleteConfirm.type === 'resource' ? '/api/resources' : '/api/demands'
        await apiDelete(`${endpoint}/${deleteConfirm.id}`, token)
        if (deleteConfirm.type === 'resource') {
          setResources((prev) => prev.filter((r) => r.id !== deleteConfirm.id))
        } else {
          setDemands((prev) => prev.filter((d) => d.id !== deleteConfirm.id))
        }
      }
      setActionMsg(t('dashboard.deleted'))
      setTimeout(() => setActionMsg(''), 3000)
    } catch (err) {
      setActionMsg(err instanceof Error ? err.message : t('common.error'))
      setTimeout(() => setActionMsg(''), 3000)
    }
    setDeleteConfirm(null)
  }

  if (!isAuthenticated && !token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="glass rounded-2xl p-12 text-center max-w-md">
          <h2 className="text-xl font-bold text-white mb-4">{t('auth.loginTitle')}</h2>
          <p className="text-sm text-gray-500 mb-6">{t('dashboard.title')}</p>
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

  const tabs: { key: Tab; label: string }[] = [
    { key: 'resources', label: t('dashboard.myResources') },
    { key: 'demands', label: t('dashboard.myDemands') },
    { key: 'drafts', label: t('dashboard.drafts') },
    { key: 'recommendations', label: t('dashboard.aiRecommend') },
    { key: 'subscription', label: t('dashboard.subscription') },
  ]

  const getCategoryClass = (cat: string) => {
    return categoryColors[cat] || categoryColors['其他']
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-white">{t('dashboard.title')}</h1>
          <span className="text-sm text-gray-500">{user?.email}</span>
        </div>

        {actionMsg && (
          <div className={`mb-6 p-3 rounded-lg text-sm ${
            actionMsg.includes('成功') || actionMsg.includes('Success')
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}>
            {actionMsg}
          </div>
        )}

        <div className="flex gap-1 mb-8 border-b border-white/5 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 -mb-px ${
                activeTab === tab.key
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-500 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-gray-500">{t('dashboard.loading')}</p>
          </div>
        ) : error ? (
          <div className="glass rounded-xl p-12 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <>
            {activeTab === 'resources' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">{t('dashboard.myResources')}</h2>
                  <Link
                    href="/resources/publish"
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                  >
                    + {t('resources.publish')}
                  </Link>
                </div>
                {resources.length === 0 ? (
                  <div className="glass rounded-xl p-12 text-center">
                    <p className="text-gray-500 mb-4">{t('dashboard.noResources')}</p>
                    <Link href="/resources/publish" className="text-sm text-cyan-400 hover:text-cyan-300">
                      {t('resources.publish')}
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {resources.map((resource) => (
                      <div key={resource.id} className="glass rounded-xl p-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryClass(resource.category)}`}>
                          {resource.category}
                        </span>
                        <h3 className="mt-3 text-lg font-semibold text-white">{resource.title}</h3>
                        <p className="mt-2 text-sm text-gray-400 line-clamp-2">{resource.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-gray-600">{resource.country}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditModal({ type: 'resource', id: resource.id })}
                              className="text-xs text-cyan-400 hover:text-cyan-300"
                            >
                              {t('dashboard.edit')}
                            </button>
                            <button
                              onClick={() => setDeleteConfirm({ type: 'resource', id: resource.id })}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              {t('dashboard.delete')}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'demands' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-white">{t('dashboard.myDemands')}</h2>
                  <Link
                    href="/demands/publish"
                    className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                  >
                    + {t('demands.publish')}
                  </Link>
                </div>
                {demands.length === 0 ? (
                  <div className="glass rounded-xl p-12 text-center">
                    <p className="text-gray-500 mb-4">{t('dashboard.noDemands')}</p>
                    <Link href="/demands/publish" className="text-sm text-cyan-400 hover:text-cyan-300">
                      {t('demands.publish')}
                    </Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {demands.map((demand) => (
                      <div key={demand.id} className="glass rounded-xl p-6">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium border ${getCategoryClass(demand.category)}`}>
                          {demand.category}
                        </span>
                        <h3 className="mt-3 text-lg font-semibold text-white">{demand.title}</h3>
                        <p className="mt-2 text-sm text-gray-400 line-clamp-2">{demand.description}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-gray-600">{demand.country}</span>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setEditModal({ type: 'demand', id: demand.id })}
                              className="text-xs text-cyan-400 hover:text-cyan-300"
                            >
                              {t('dashboard.edit')}
                            </button>
                            <button
                              onClick={() => setDeleteConfirm({ type: 'demand', id: demand.id })}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              {t('dashboard.delete')}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'drafts' && (
              <div>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-white mb-4">{t('dashboard.resourceDrafts')}</h2>
                  {draftsLoading ? (
                    <div className="glass rounded-xl p-8 text-center">
                      <p className="text-gray-500">{t('dashboard.loading')}</p>
                    </div>
                  ) : resourceDrafts.length === 0 ? (
                    <div className="glass rounded-xl p-8 text-center">
                      <p className="text-gray-500">{t('dashboard.noDrafts')}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {resourceDrafts.map((draft) => (
                        <div key={draft.id} className="glass rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-2">
                            {draft.category && (
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryClass(draft.category)}`}>
                                {draft.category}
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded-full text-xs bg-amber-500/15 text-amber-400 border border-amber-500/30">
                              {t('dashboard.draft')}
                            </span>
                          </div>
                          <h3 className="text-sm font-medium text-white truncate">{draft.title || t('dashboard.noDrafts')}</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(draft.updated_at).toLocaleDateString('zh-CN')}
                          </p>
                          <div className="mt-3 flex gap-2">
                            <Link
                              href={`/resources/publish`}
                              className="text-xs text-cyan-400 hover:text-cyan-300"
                            >
                              {t('dashboard.edit')}
                            </Link>
                            <button
                              onClick={() => setDeleteConfirm({ type: 'draft', id: draft.id, draftType: 'resource' })}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              {t('dashboard.delete')}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-white mb-4">{t('dashboard.demandDrafts')}</h2>
                  {draftsLoading ? (
                    <div className="glass rounded-xl p-8 text-center">
                      <p className="text-gray-500">{t('dashboard.loading')}</p>
                    </div>
                  ) : demandDrafts.length === 0 ? (
                    <div className="glass rounded-xl p-8 text-center">
                      <p className="text-gray-500">{t('dashboard.noDrafts')}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {demandDrafts.map((draft) => (
                        <div key={draft.id} className="glass rounded-xl p-5">
                          <div className="flex items-center gap-2 mb-2">
                            {draft.category && (
                              <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium border ${getCategoryClass(draft.category)}`}>
                                {draft.category}
                              </span>
                            )}
                            <span className="px-2 py-0.5 rounded-full text-xs bg-amber-500/15 text-amber-400 border border-amber-500/30">
                              {t('dashboard.draft')}
                            </span>
                          </div>
                          <h3 className="text-sm font-medium text-white truncate">{draft.title || t('dashboard.noDrafts')}</h3>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(draft.updated_at).toLocaleDateString('zh-CN')}
                          </p>
                          <div className="mt-3 flex gap-2">
                            <Link
                              href={`/demands/publish`}
                              className="text-xs text-cyan-400 hover:text-cyan-300"
                            >
                              {t('dashboard.edit')}
                            </Link>
                            <button
                              onClick={() => setDeleteConfirm({ type: 'draft', id: draft.id, draftType: 'demand' })}
                              className="text-xs text-red-400 hover:text-red-300"
                            >
                              {t('dashboard.delete')}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'recommendations' && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">{t('dashboard.aiRecommend')}</h2>
                {recommendations.length === 0 ? (
                  <div className="glass rounded-xl p-12 text-center">
                    <p className="text-gray-500 mb-4">{t('dashboard.noRecommend')}</p>
                    <p className="text-xs text-gray-600">
                      {t('aiRecommend.publishToGet')}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {recommendations.map((rec) => (
                      <div key={rec.id} className="glass rounded-xl p-6 gradient-border">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-lg font-bold gradient-text">{rec.match_score}% {t('aiRecommend.score')}</span>
                          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                            {t('dashboard.aiRecommend')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-400 leading-relaxed">{rec.reason}</p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-xs text-gray-600">
                            {new Date(rec.created_at).toLocaleDateString('zh-CN')}
                          </span>
                          <button className="text-xs text-cyan-400 hover:text-cyan-300">{t('aiRecommend.viewDetail')}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'subscription' && (
              <div>
                <h2 className="text-xl font-semibold text-white mb-6">{t('dashboard.subscription')}</h2>
                {user?.is_subscribed ? (
                  <div className="glass rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-lg font-semibold text-white">{t('subscriptionPage.premium')}</p>
                        <p className="text-sm text-gray-400">{t('home.subscriptionSubtitle')}</p>
                      </div>
                    </div>
                    <Link
                      href="/resources"
                      className="inline-block px-6 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    >
                      {t('home.subscriptionTitle')}
                    </Link>
                  </div>
                ) : (
                  <div className="glass rounded-xl p-8 text-center">
                    <p className="text-gray-400 mb-2">{t('subscriptionPage.free')}</p>
                    <p className="text-sm text-gray-600 mb-6">{t('home.subscriptionTitle')}</p>
                    <Link
                      href="/subscription"
                      className="inline-block px-8 py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/25"
                    >
                      {t('subscriptionPage.subscribeBtn')}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>

      {editModal && (
        <EditModal
          type={editModal.type}
          id={editModal.id}
          token={token || ''}
          onClose={() => setEditModal(null)}
          onSuccess={(msg) => {
            setActionMsg(msg)
            setEditModal(null)
            setTimeout(() => setActionMsg(''), 3000)
          }}
        />
      )}

      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="glass rounded-2xl p-8 max-w-sm w-full text-center">
            <h3 className="text-lg font-semibold text-white mb-2">{t('dashboard.confirmDelete')}</h3>
            <p className="text-sm text-gray-400 mb-6">{t('dashboard.confirmDeleteDesc')}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={handleDelete}
                className="px-6 py-2.5 rounded-lg text-sm font-medium bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-colors"
              >
                {t('dashboard.confirm')}
              </button>
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-6 py-2.5 rounded-lg text-sm font-medium border border-white/10 text-gray-400 hover:text-white transition-colors"
              >
                {t('dashboard.cancel')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function EditModal({ type, id, token, onClose, onSuccess }: {
  type: 'resource' | 'demand'
  id: string
  token: string
  onClose: () => void
  onSuccess: (msg: string) => void
}) {
  const t = useTranslations()
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(true)

  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<{
    title: string
    description: string
    category: string
    contact?: string
    country: string
  }>()

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const endpoint = type === 'resource' ? '/api/resources' : '/api/demands'
        const data = await apiGet(`${endpoint}/${id}`, token)
        reset({
          title: data.title,
          description: data.description,
          category: data.category,
          contact: data.contact || '',
          country: data.country,
        })
      } catch {
        setServerError(t('common.error'))
      } finally {
        setLoading(false)
      }
    }
    fetchItem()
  }, [id, type, token, reset, t])

  const onSubmit = async (data: Record<string, string>) => {
    const endpoint = type === 'resource' ? '/api/resources' : '/api/demands'
    try {
      await apiPut(`${endpoint}/${id}`, data, token)
      onSuccess(t('dashboard.updated'))
    } catch (err) {
      setServerError(err instanceof Error ? err.message : t('common.error'))
    }
  }

  const categories = type === 'resource' ? resourceCategories : demandCategories
  const modalTitle = type === 'resource' ? t('dashboard.editResource') : t('dashboard.editDemand')

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="glass rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">
            {modalTitle}
          </h3>
          <button onClick={onClose} className="text-gray-500 hover:text-white">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>

        {loading ? (
          <p className="text-gray-500 text-center py-8">{t('dashboard.loading')}</p>
        ) : (
          <>
            {serverError && (
              <div className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400">
                {serverError}
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('resources.titleField')}</label>
                <input
                  type="text"
                  {...register('title', { required: t('resources.titleRequired') })}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                />
                {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('resources.description')}</label>
                <textarea
                  {...register('description', { required: t('resources.descriptionRequired') })}
                  rows={4}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50 resize-none"
                />
                {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('resources.category')}</label>
                <select
                  {...register('category', { required: t('resources.categoryRequired') })}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-gray-300 text-sm focus:outline-none focus:border-cyan-500/50"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              {type === 'resource' && (
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('resources.contact')}</label>
                  <input
                    type="text"
                    {...register('contact')}
                    className="w-full px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1.5">{t('resources.country')}</label>
                <select
                  {...register('country', { required: t('resources.country') })}
                  className="w-full px-3 py-2.5 rounded-lg bg-white/[0.05] border border-white/10 text-gray-300 text-sm focus:outline-none focus:border-cyan-500/50"
                >
                  {countryList.map((c) => (
                    <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2.5 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white disabled:opacity-50"
              >
                {isSubmitting ? t('common.loading') : t('dashboard.save')}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}