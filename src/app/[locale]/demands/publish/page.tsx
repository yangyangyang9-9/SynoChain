'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link, useRouter } from '@/i18n/routing'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/store/authStore'
import { apiPost } from '@/lib/api'
import { demandCategories, countryList } from '@/types'

interface DemandFormData {
  title: string
  description: string
  category: string
  country: string
}

export default function PublishDemandPage() {
  const t = useTranslations()
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const { isAuthenticated, token } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DemandFormData>()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="glass rounded-2xl p-12 text-center max-w-md">
          <h2 className="text-xl font-bold text-white mb-4">{t('auth.loginTitle')}</h2>
          <p className="text-sm text-gray-500 mb-6">{t('demands.publishTitle')}</p>
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
    )
  }

  const onSubmit = async (data: DemandFormData) => {
    setServerError('')
    setSuccessMsg('')
    try {
      await apiPost('/api/demands', data, token || undefined)
      setSuccessMsg(t('demands.published'))
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : t('common.error'))
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-bold gradient-text mb-8 text-center">{t('demands.publishTitle')}</h1>

          {serverError && (
            <div className="mb-6 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-sm text-red-400">
              {serverError}
            </div>
          )}

          {successMsg && (
            <div className="mb-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-sm text-emerald-400">
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{t('demands.titleField')}</label>
              <input
                type="text"
                {...register('title', { required: t('demands.titleRequired') })}
                placeholder={t('demands.titleField')}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
              {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{t('demands.description')}</label>
              <textarea
                {...register('description', { required: t('demands.descriptionRequired') })}
                placeholder={t('demands.description')}
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
              />
              {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{t('demands.category')}</label>
              <select
                {...register('category', { required: t('demands.categoryRequired') })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-gray-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              >
                <option value="">{t('demands.category')}</option>
                {demandCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-400">{errors.category.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">{t('demands.country')}</label>
              <select
                {...register('country', { required: t('demands.country') })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-gray-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              >
                <option value="">{t('demands.country')}</option>
                {countryList.map((c) => (
                  <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
                ))}
              </select>
              {errors.country && <p className="mt-1 text-xs text-red-400">{errors.country.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t('common.loading') : t('demands.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}