'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/store/authStore'
import { apiGet, apiPut, apiPost } from '@/lib/api'
import { UserProfile } from '@/types'

type SettingsTab = 'profile' | 'password' | 'notifications'

interface ProfileFormData {
  display_name: string
  avatar_url: string
  company: string
  position: string
  phone: string
  website: string
  bio: string
}

interface PasswordFormData {
  old_password: string
  new_password: string
  confirm_password: string
}

interface NotifFormData {
  notification_email: boolean
  notification_message: boolean
  notification_match: boolean
}

export default function SettingsPage() {
  const t = useTranslations()
  const { isAuthenticated, token, loadFromStorage, fetchMe } = useAuthStore()
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    loadFromStorage()
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      fetchMe()
    }
  }, [])

  if (!isAuthenticated && !token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="glass rounded-2xl p-12 text-center max-w-md">
          <h2 className="text-xl font-bold text-white mb-4">{t('auth.loginTitle')}</h2>
          <p className="text-sm text-gray-500 mb-6">{t('settings.title')}</p>
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

  const tabs: { key: SettingsTab; label: string }[] = [
    { key: 'profile', label: t('settings.profile') },
    { key: 'password', label: t('settings.password') },
    { key: 'notifications', label: t('settings.notifications') },
  ]

  const showToast = (msg: string) => {
    setSuccess(msg)
    setTimeout(() => setSuccess(''), 3000)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-white mb-8">{t('settings.title')}</h1>

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

        {success && (
          <div className="mb-6 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-sm text-emerald-400">
            {success}
          </div>
        )}

        {activeTab === 'profile' && (
          <ProfileForm token={token || ''} t={t} showToast={showToast} setError={setError} />
        )}
        {activeTab === 'password' && (
          <PasswordForm token={token || ''} t={t} showToast={showToast} setError={setError} />
        )}
        {activeTab === 'notifications' && (
          <NotificationsForm token={token || ''} t={t} showToast={showToast} setError={setError} />
        )}
      </div>
    </div>
  )
}

function ProfileForm({ token, t, showToast, setError }: {
  token: string
  t: ReturnType<typeof useTranslations>
  showToast: (msg: string) => void
  setError: (msg: string) => void
}) {
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data: UserProfile = await apiGet('/api/users/profile', token)
        reset({
          display_name: data.display_name || '',
          avatar_url: data.avatar_url || '',
          company: data.company || '',
          position: data.position || '',
          phone: data.phone || '',
          website: data.website || '',
          bio: data.bio || '',
        })
      } catch {
        setError(t('settings.loadError'))
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [token, reset, t, setError])

  const onSubmit = async (data: ProfileFormData) => {
    try {
      await apiPut('/api/users/profile', data, token)
      showToast(t('settings.profileSaved'))
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'))
    }
  }

  if (loading) {
    return (
      <div className="glass rounded-2xl p-8 animate-pulse space-y-5">
        {[1, 2, 3, 4, 5, 6, 7].map((i) => (
          <div key={i}>
            <div className="h-4 bg-white/5 rounded w-20 mb-2" />
            <div className="h-10 bg-white/5 rounded-xl" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">{t('settings.displayName')}</label>
          <input
            type="text"
            {...register('display_name')}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">{t('settings.avatarUrl')}</label>
          <input
            type="text"
            {...register('avatar_url')}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">{t('settings.company')}</label>
            <input
              type="text"
              {...register('company')}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">{t('settings.position')}</label>
            <input
              type="text"
              {...register('position')}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">{t('settings.phone')}</label>
            <input
              type="text"
              {...register('phone')}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">{t('settings.website')}</label>
            <input
              type="text"
              {...register('website')}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">{t('settings.bio')}</label>
          <textarea
            {...register('bio')}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
          />
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('common.saving') : t('settings.saveProfile')}
        </button>
      </form>
    </div>
  )
}

function PasswordForm({ token, t, showToast, setError }: {
  token: string
  t: ReturnType<typeof useTranslations>
  showToast: (msg: string) => void
  setError: (msg: string) => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<PasswordFormData>()

  const newPassword = watch('new_password')

  const onSubmit = async (data: PasswordFormData) => {
    try {
      await apiPost('/api/auth/change-password', {
        old_password: data.old_password,
        new_password: data.new_password,
      }, token)
      reset()
      showToast(t('settings.passwordChanged'))
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'))
    }
  }

  return (
    <div className="glass rounded-2xl p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">{t('settings.oldPassword')}</label>
          <input
            type="password"
            {...register('old_password', { required: t('auth.passwordRequired') })}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
          />
          {errors.old_password && <p className="mt-1 text-xs text-red-400">{errors.old_password.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">{t('settings.newPassword')}</label>
          <input
            type="password"
            {...register('new_password', {
              required: t('auth.passwordRequired'),
              minLength: { value: 6, message: t('auth.passwordMin') },
            })}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
          />
          {errors.new_password && <p className="mt-1 text-xs text-red-400">{errors.new_password.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">{t('settings.confirmPassword')}</label>
          <input
            type="password"
            {...register('confirm_password', {
              required: t('auth.confirmRequired'),
              validate: (value) => value === newPassword || t('auth.passwordMismatch'),
            })}
            className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
          />
          {errors.confirm_password && <p className="mt-1 text-xs text-red-400">{errors.confirm_password.message}</p>}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('common.saving') : t('settings.changePassword')}
        </button>
      </form>
    </div>
  )
}

function NotificationsForm({ token, t, showToast, setError }: {
  token: string
  t: ReturnType<typeof useTranslations>
  showToast: (msg: string) => void
  setError: (msg: string) => void
}) {
  const [loading, setLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NotifFormData>()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data: UserProfile = await apiGet('/api/users/profile', token)
        reset({
          notification_email: data.notification_email ?? true,
          notification_message: data.notification_message ?? true,
          notification_match: data.notification_match ?? true,
        })
      } catch {
        setError(t('settings.loadError'))
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [token, reset, t, setError])

  const onSubmit = async (data: NotifFormData) => {
    try {
      await apiPut('/api/users/profile', data, token)
      showToast(t('settings.notificationsSaved'))
    } catch (err) {
      setError(err instanceof Error ? err.message : t('common.error'))
    }
  }

  if (loading) {
    return (
      <div className="glass rounded-2xl p-8 animate-pulse space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="h-4 bg-white/5 rounded w-24" />
            <div className="h-6 bg-white/5 rounded w-12" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="glass rounded-2xl p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-300">{t('settings.notificationEmail')}</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register('notification_email')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/[0.08] rounded-full peer peer-checked:bg-cyan-500/30 peer-checked:after:bg-cyan-400 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>
        <div className="flex items-center justify-between py-2 border-t border-white/5">
          <span className="text-sm text-gray-300">{t('settings.notificationMessage')}</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register('notification_message')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/[0.08] rounded-full peer peer-checked:bg-cyan-500/30 peer-checked:after:bg-cyan-400 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>
        <div className="flex items-center justify-between py-2 border-t border-white/5">
          <span className="text-sm text-gray-300">{t('settings.notificationMatch')}</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              {...register('notification_match')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/[0.08] rounded-full peer peer-checked:bg-cyan-500/30 peer-checked:after:bg-cyan-400 after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-gray-400 after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
          </label>
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? t('common.saving') : t('settings.saveNotifications')}
        </button>
      </form>
    </div>
  )
}