'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useAuthStore } from '@/store/authStore'

interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const { register: registerUser } = useAuthStore()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>()

  const onSubmit = async (data: RegisterFormData) => {
    setServerError('')
    setSuccessMsg('')
    try {
      await registerUser(data.email, data.password)
      setSuccessMsg('注册成功！正在跳转登录页面...')
      setTimeout(() => {
        router.push('/login')
      }, 1500)
    } catch (err) {
      setServerError(err instanceof Error ? err.message : '注册失败，请重试')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 pt-16">
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold gradient-text">注册 SynoChain AI</h1>
            <p className="text-sm text-gray-500 mt-2">创建您的账号，开始全球商业连接</p>
          </div>

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
              <label className="block text-sm font-medium text-gray-400 mb-2">
                邮箱地址
              </label>
              <input
                type="email"
                {...register('email', {
                  required: '请输入邮箱地址',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: '请输入有效的邮箱地址',
                  },
                })}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                密码
              </label>
              <input
                type="password"
                {...register('password', {
                  required: '请输入密码',
                  minLength: {
                    value: 6,
                    message: '密码至少需要6个字符',
                  },
                })}
                placeholder="至少6个字符"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                确认密码
              </label>
              <input
                type="password"
                {...register('confirmPassword', {
                  required: '请确认密码',
                  validate: (value) => value === watch('password') || '两次输入的密码不一致',
                })}
                placeholder="再次输入密码"
                className="w-full px-4 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-xs text-red-400">{errors.confirmPassword.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl text-sm font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '注册中...' : '创建账号'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              已有账号？{' '}
              <Link href="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                立即登录
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}