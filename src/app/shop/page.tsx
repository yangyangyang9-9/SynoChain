'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/lib/store'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n'
import Link from 'next/link'

export default function Shop() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { user } = useGameStore()

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-2xl">{t('common.loading')}</div>
      </div>
    )
  }

  const items = [
    {
      id: 'skip',
      name: t('shop.items.skipCard.name'),
      desc: t('shop.items.skipCard.desc'),
      price: 100,
      icon: '⏭️',
      color: 'primary',
    },
    {
      id: 'revive',
      name: t('shop.items.reviveCard.name'),
      desc: t('shop.items.reviveCard.desc'),
      price: 150,
      icon: '❤️',
      color: 'secondary',
    },
    {
      id: 'speed',
      name: t('shop.items.speedCard.name'),
      desc: t('shop.items.speedCard.desc'),
      price: 80,
      icon: '⚡',
      color: 'warning',
    },
  ]

  const handleBuy = (itemId: string, price: number) => {
    if (user.coins < price) {
      alert('金币不足')
      return
    }
    
    if (!confirm(`确定花费 ${price} 金币购买？`)) {
      return
    }

    // TODO: 实现购买逻辑，需要调用 Supabase 更新用户数据
    alert('购买功能开发中...')
  }

  return (
    <div className="min-h-screen bg-darker">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/game" className="pixel-text text-primary text-xl">
            {t('app.title')}
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')}
              className="px-3 py-1 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition text-sm"
            >
              {i18n.language === 'zh' ? 'EN' : '中文'}
            </button>
            <div className="px-4 py-2 bg-warning/20 text-warning rounded-lg">
              💰 {user.coins}
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center neon-text">
          {t('shop.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {items.map((item) => (
            <div key={item.id} className="game-card p-6 text-center">
              <div className="text-6xl mb-4">{item.icon}</div>
              <h3 className={`text-xl font-bold text-${item.color} mb-2`}>
                {item.name}
              </h3>
              <p className="text-white/70 mb-4 text-sm">{item.desc}</p>
              <div className="text-warning font-bold mb-4">💰 {item.price}</div>
              <button
                onClick={() => handleBuy(item.id, item.price)}
                disabled={user.coins < item.price}
                className={`w-full btn-${item.color} disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {t('shop.buy')}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/game" className="text-primary hover:underline">
            ← 返回游戏
          </Link>
        </div>
      </div>
    </div>
  )
}
