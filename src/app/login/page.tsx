'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/lib/store'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n'

export default function Login() {
  const { t } = useTranslation()
  const router = useRouter()
  const { login, register } = useGameStore()
  
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (isLogin) {
        await login(email, password)
      } else {
        if (!username) {
          setError('请输入用户名')
          setLoading(false)
          return
        }
        await register(email, password, username)
      }
      router.push('/game')
    } catch (err: any) {
      setError(err.message || '登录失败')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-darker flex items-center justify-center px-4">
      <div className="game-card p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-primary mb-6 text-center neon-text">
          {isLogin ? t('auth.login') : t('auth.register')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-white/80 mb-2">{t('auth.username')}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-dark border border-border rounded-lg text-white focus:border-primary focus:outline-none transition"
                required={!isLogin}
              />
            </div>
          )}

          <div>
            <label className="block text-white/80 mb-2">{t('auth.email')}</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-dark border border-border rounded-lg text-white focus:border-primary focus:outline-none transition"
              required
            />
          </div>

          <div>
            <label className="block text-white/80 mb-2">{t('auth.password')}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-dark border border-border rounded-lg text-white focus:border-primary focus:outline-none transition"
              required
              minLength={6}
            />
          </div>

          {error && (
            <div className="text-danger text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? t('common.loading') : (isLogin ? t('auth.loginButton') : t('auth.registerButton'))}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-primary hover:underline"
          >
            {isLogin ? t('auth.noAccount') : t('auth.hasAccount')}
          </button>
        </div>
      </div>
    </div>
  )
}
