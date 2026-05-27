'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/store/authStore'
import { apiPost } from '@/lib/api'
import { resourceCategories, countryList } from '@/types'

interface ResourceFormData {
  title: string
  description: string
  category: string
  contact: string
  country: string
}

export default function PublishResourcePage() {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const { isAuthenticated, token } = useAuthStore()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResourceFormData>()

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 pt-16">
        <div className="glass rounded-2xl p-12 text-center max-w-md">
          <h2 className="text-xl font-bold text-white mb-4">请先登录</h2>
          <p className="text-sm text-gray-500 mb-6">您需要登录后才能发布资源</p>
          <div className="flex gap-3 justify-center">
            <Link
              href="/login"
              className="px-6 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
            >
              登录
            </Link>
            <Link
              href="/register"
              className="px-6 py-2.5 rounded-xl text-sm font-medium border border-white/10 text-white"
            >
              注册
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const onSubmit = async (data: ResourceFormData) => {
    setServerError('')
    setSuccessMsg('')
    try {
      await apiPost('/api/resources', data, token || undefined)
      setSuccessMsg('资源发布成功！正在跳转到控制台...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : '发布失败，请重试')
    }
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-2xl mx-auto px-4">
        <div className="glass rounded-2xl p-8">
          <h1 className="text-2xl font-bold gradient-text mb-8 text-center">发布商业资源</h1>

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
              <label className="block text-sm font-medium text-gray-400 mb-2">标题</label>
              <input
                type="text"
                {...register('title', { required: '请输入资源标题' })}
                placeholder="输入资源标题"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
              {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">描述</label>
              <textarea
                {...register('description', { required: '请输入资源描述' })}
                placeholder="详细描述您的商业资源"
                rows={5}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all resize-none"
              />
              {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">分类</label>
              <select
                {...register('category', { required: '请选择分类' })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-gray-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              >
                <option value="">选择分类</option>
                {resourceCategories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && <p className="mt-1 text-xs text-red-400">{errors.category.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">联系方式</label>
              <input
                type="text"
                {...register('contact', { required: '请输入联系方式' })}
                placeholder="邮箱、电话或其他联系方式"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
              {errors.contact && <p className="mt-1 text-xs text-red-400">{errors.contact.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">所在国家</label>
              <select
                {...register('country', { required: '请选择国家' })}
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-gray-300 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              >
                <option value="">选择国家</option>
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
              {isSubmitting ? '发布中...' : '发布资源'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}