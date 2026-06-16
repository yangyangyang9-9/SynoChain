'use client'

import { useEffect } from 'react'
import { useGameStore } from '@/lib/store'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n'

export default function Home() {
  const { t, i18n } = useTranslation()
  const { user, setUser, loading } = useGameStore()

  useEffect(() => {
    const supabase = createClient()
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data) setUser(data)
          })
      }
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data) setUser(data)
          })
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [setUser])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-2xl">{t('common.loading')}</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-darker">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="pixel-text text-primary text-2xl">{t('app.title')}</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')}
              className="px-4 py-2 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition"
            >
              {i18n.language === 'zh' ? 'EN' : '中文'}
            </button>
            {user ? (
              <Link href="/game" className="btn-primary">
                {t('nav.game')}
              </Link>
            ) : (
              <Link href="/login" className="btn-primary">
                {t('nav.login')}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-primary mb-6 neon-text">
          {t('home.welcome')}
        </h2>
        <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
          {t('home.description')}
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/game" className="btn-primary text-lg px-8 py-4">
            {t('home.startGame')}
          </Link>
          <Link href="/ranking" className="btn-success text-lg px-8 py-4">
            {t('home.viewRanking')}
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center text-primary mb-12">
          {t('home.features.title')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(t('home.features.items', { returnObjects: true }) as any[]).map((item: any, index) => (
            <div key={index} className="game-card p-6">
              <h4 className="text-xl font-bold text-primary mb-3">{item.title}</h4>
              <p className="text-white/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      {user && (
        <section className="container mx-auto px-4 py-20">
          <div className="game-card p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-primary mb-6 text-center">你的状态</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary">{user.current_level}</div>
                <div className="text-white/60">{t('game.currentLevel')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-secondary">{user.lives}</div>
                <div className="text-white/60">{t('game.lives')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-warning">{user.coins}</div>
                <div className="text-white/60">{t('game.coins')}</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success">{user.skip_cards + user.revive_cards + user.speed_cards}</div>
                <div className="text-white/60">道具</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="bg-card border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-white/60">
          <p>&copy; 2024 Health Quest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
