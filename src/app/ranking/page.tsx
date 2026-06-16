'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n'
import Link from 'next/link'

interface RankingUser {
  username: string
  current_level: number
  coins: number
}

export default function Ranking() {
  const { t, i18n } = useTranslation()
  const [users, setUsers] = useState<RankingUser[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchRanking = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('users')
        .select('username, current_level, coins')
        .order('current_level', { ascending: false })
        .order('coins', { ascending: false })
        .limit(50)

      if (error) {
        console.error('Error fetching ranking:', error)
      } else {
        setUsers(data || [])
      }
      setLoading(false)
    }

    fetchRanking()
  }, [])

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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-primary mb-8 text-center neon-text">
          🏆 {t('ranking.title')}
        </h2>

        {loading ? (
          <div className="text-center text-primary text-2xl">{t('common.loading')}</div>
        ) : (
          <div className="game-card overflow-hidden max-w-4xl mx-auto">
            <table className="w-full">
              <thead className="bg-dark">
                <tr>
                  <th className="px-6 py-4 text-left text-primary font-bold">{t('ranking.rank')}</th>
                  <th className="px-6 py-4 text-left text-primary font-bold">{t('ranking.username')}</th>
                  <th className="px-6 py-4 text-left text-primary font-bold">{t('ranking.level')}</th>
                  <th className="px-6 py-4 text-left text-primary font-bold">{t('ranking.coins')}</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={index}
                    className={`border-t border-border ${
                      index === 0 ? 'bg-warning/10' :
                      index === 1 ? 'bg-primary/10' :
                      index === 2 ? 'bg-secondary/10' :
                      ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <span className="text-2xl">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white font-bold">{user.username}</td>
                    <td className="px-6 py-4 text-primary font-bold">{user.current_level}</td>
                    <td className="px-6 py-4 text-warning font-bold">💰 {user.coins}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link href="/game" className="text-primary hover:underline">
            ← 返回游戏
          </Link>
        </div>
      </div>
    </div>
  )
}
