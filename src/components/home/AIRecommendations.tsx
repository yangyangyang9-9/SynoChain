'use client'

const demoMatches = [
  {
    id: '1',
    match_score: 94,
    resource_title: '智能传感器生产线',
    demand_title: '工业传感器采购需求',
    reason: '供应链高度匹配，地理优势明显，技术规格完全符合采购方需求',
    industry: '智能制造',
  },
  {
    id: '2',
    match_score: 88,
    resource_title: '跨境电商物流渠道',
    demand_title: '东南亚市场准入渠道需求',
    reason: '物流网络覆盖目标市场区域，具备丰富的跨境通关经验',
    industry: '跨境物流',
  },
  {
    id: '3',
    match_score: 82,
    resource_title: '新能源电池组件供应',
    demand_title: '欧洲新能源采购合作需求',
    reason: '产品质量认证完善，产能充足，已有欧洲出口经验',
    industry: '新能源',
  },
]

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
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">AI 智能推荐</h2>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
            </span>
            <span className="text-xs text-cyan-400 font-medium">实时分析中</span>
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
                  AI 发现商机
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">匹配资源</p>
                  <p className="text-sm text-white font-medium">{match.resource_title}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">匹配需求</p>
                  <p className="text-sm text-white font-medium">{match.demand_title}</p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-xs text-gray-500 mb-1">AI 匹配理由</p>
                <p className="text-sm text-gray-400 leading-relaxed">{match.reason}</p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-gray-600">{match.industry}</span>
                <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
                  查看详情 →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}