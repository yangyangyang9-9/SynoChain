'use client'

import { useTranslations } from 'next-intl'

function CircularProgress({ score }: { score: number }) {
  const radius = 28
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (score / 100) * circumference

  return (
    <svg width="72" height="72" viewBox="0 0 72 72">
      <circle cx="36" cy="36" r={radius} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="4" />
      <circle
        cx="36"
        cy="36"
        r={radius}
        fill="none"
        stroke="url(#score-grad)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform="rotate(-90 36 36)"
        className="transition-all duration-1000"
      />
      <defs>
        <linearGradient id="score-grad" x1="0" y1="0" x2="72" y2="72">
          <stop stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <text x="36" y="36" textAnchor="middle" dominantBaseline="central" fill="white" fontSize="16" fontWeight="bold">
        {score}%
      </text>
    </svg>
  )
}

export default function AIRecommendations() {
  const t = useTranslations()

  const demoMatches = [
    {
      id: '1',
      match_score: 94,
      resource_title: t('home.aiMatchDemo.title1'),
      demand_title: '',
      reason: t('home.aiMatchDemo.reason1'),
      industry: '智能制造',
    },
    {
      id: '2',
      match_score: 88,
      resource_title: t('home.aiMatchDemo.title2'),
      demand_title: '',
      reason: t('home.aiMatchDemo.reason2'),
      industry: '跨境物流',
    },
    {
      id: '3',
      match_score: 82,
      resource_title: t('home.aiMatchDemo.title3'),
      demand_title: '',
      reason: t('home.aiMatchDemo.reason3'),
      industry: '新能源',
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">{t('home.aiRecommendTitle')}</h2>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
            </span>
            <span className="text-xs text-cyan-400 font-medium">{t('home.aiRecommendSubtitle')}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demoMatches.map((match) => (
            <div
              key={match.id}
              className="gradient-border rounded-xl bg-[#1a1a2e] p-6 hover:shadow-lg hover:shadow-cyan-500/10 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <CircularProgress score={match.match_score} />
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-cyan-500/15 text-cyan-400 border border-cyan-500/30">
                  {t('home.aiRecommendTitle')}
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">{t('aiRecommend.viewDetail')}</p>
                  <p className="text-sm text-white font-medium">{match.resource_title}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-gray-500 mb-1">{t('aiRecommend.score')}</p>
                <p className="text-sm text-gray-400 leading-relaxed">{match.reason}</p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-600">{match.industry}</span>
                <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                  {t('aiRecommend.viewDetail')} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}