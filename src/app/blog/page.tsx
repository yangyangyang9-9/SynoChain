import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowRight, BookOpen, Calendar, Tag } from 'lucide-react'

export const metadata: Metadata = {
  title: '命理知识 - 必生儿子 | 八字择时生男孩指南',
  description: '深入了解八字命理、生男生女原理、五行择时等传统命理学知识。权威命理师团队为您解析生男孩的科学与传统方法。',
  keywords: '八字命理,生男生女,五行择时,命理知识,天干地支,生男孩方法',
  openGraph: {
    title: '命理知识 - 必生儿子',
    description: '深入了解八字命理、生男生女原理、五行择时等传统命理学知识',
    type: 'website',
    locale: 'zh_CN',
  },
}

const articles = [
  {
    slug: 'bazi-gender-selection',
    title: '八字命理与生男生女：千年智慧的现代应用',
    date: '2026-05-15',
    excerpt: '八字命理学是中国传统文化的重要组成部分，通过对天干地支的组合分析，可以推算出一个人的命运轨迹。在生育领域，八字命理同样有着独特的应用价值，能够帮助准父母选择更有利于生育男孩的时机。',
    category: '八字命理',
  },
  {
    slug: 'five-elements-boy',
    title: '五行学说如何影响胎儿性别？深度解析',
    date: '2026-05-20',
    excerpt: '五行学说是中国古代哲学的核心理论之一，金木水火土相生相克，构成了宇宙万物的基本运行规律。在生育领域，五行学说同样具有重要的指导意义，可以帮助我们理解并影响胎儿的性别形成。',
    category: '五行学说',
  },
  {
    slug: 'best-time-conceive-boy',
    title: '2026年下半年最佳怀男孩时间表',
    date: '2026-06-01',
    excerpt: '根据八字命理学推算，2026年下半年有几个特别适合怀男孩的时间窗口。这些时间段的天干地支组合有利于阳气生发，为孕育男胎创造了良好的命理条件。以下将详细解析每个月份的吉时。',
    category: '择时指南',
  },
  {
    slug: 'benefits-of-having-son',
    title: '生儿子对父亲的积极影响：有儿子的父亲为何更优秀',
    date: '2026-06-06',
    excerpt: '研究表明，拥有儿子的父亲在事业成就、家庭责任感、社会地位等方面表现更加出色。本文将深入探讨生儿子对父亲带来的积极变化，以及有儿子的父亲在各方面的优秀表现。',
    category: '家庭研究',
  },
  {
    slug: 'fathers-with-sons',
    title: '有儿子的父亲在事业、家庭、社会中的卓越表现',
    date: '2026-06-06',
    excerpt: '从职场晋升到家庭幸福，从社会责任到心理健康，有儿子的父亲在多个维度表现出显著优势。本文通过大量数据和研究，揭示生儿子对父亲成长的深远影响。',
    category: '家庭研究',
  },
  {
    slug: 'benefits-of-having-son-en',
    title: 'The Positive Impact of Having a Son on Fathers: Why Dads with Sons Excel',
    date: '2026-06-06',
    excerpt: 'Research shows that fathers with sons demonstrate superior performance in career achievement, family responsibility, and social status. This article explores the positive changes that having a son brings to fathers.',
    category: 'Family Research',
  },
  {
    slug: 'fathers-with-sons-en',
    title: 'Fathers with Sons: Excellence in Career, Family, and Society',
    date: '2026-06-06',
    excerpt: 'From career advancement to family happiness, from social responsibility to mental health, fathers with sons show significant advantages across multiple dimensions. Discover the profound impact of raising a son on father development.',
    category: 'Family Research',
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8]">
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-b from-[#c9a96e]/5 to-transparent" />
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#c9a96e]/30 bg-[#c9a96e]/10 px-4 py-2">
            <BookOpen className="h-4 w-4 text-[#c9a96e]" />
            <span className="font-sans text-sm text-[#c9a96e]">命理知识库</span>
          </div>
          <h1 className="bg-gradient-to-r from-[#c9a96e] via-[#e0c37a] to-[#c9a96e] bg-clip-text font-serif text-4xl font-bold text-transparent sm:text-5xl">
            命理知识
          </h1>
          <p className="mt-4 font-sans text-lg text-gray-400">
            探索千年命理智慧，洞悉生男生女的天机奥秘
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group rounded-xl border border-[#c9a96e]/20 bg-[#111] p-6 transition-all duration-300 hover:border-[#c9a96e]/40 hover:shadow-[0_0_30px_rgba(201,169,110,0.15)]"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="inline-block rounded-full bg-[#c9a96e] px-3 py-1 font-sans text-xs font-medium text-[#0a0a0a]">
                  {article.category}
                </span>
              </div>
              <h2 className="font-serif text-xl text-[#f5f0e8] transition-colors duration-300 group-hover:text-[#c9a96e]">
                {article.title}
              </h2>
              <div className="mt-3 flex items-center gap-1 text-sm text-gray-500">
                <Calendar className="h-3.5 w-3.5" />
                <span>{article.date}</span>
              </div>
              <p className="mt-4 line-clamp-3 font-sans leading-relaxed text-gray-400">
                {article.excerpt}
              </p>
              <div className="mt-5 flex items-center gap-1 font-sans text-sm text-[#c9a96e] transition-all duration-300 group-hover:gap-2">
                <span>阅读全文</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24 sm:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-[#c9a96e]/30 bg-gradient-to-br from-[#c9a96e]/10 to-[#c41e3a]/5 p-8 text-center sm:p-12">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[#c9a96e]/10 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-[#c41e3a]/10 blur-3xl" />
          <div className="relative">
            <h2 className="font-serif text-2xl text-[#c9a96e] sm:text-3xl">
              想了解自己的最佳时机？
            </h2>
            <p className="mt-3 font-sans text-gray-400">
              我们的命理师团队将根据您的生辰八字，为您精准计算出最有利于生育男孩的最佳时间窗口。
            </p>
            <Link
              href="/order"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c9a96e] px-8 py-3 font-sans text-sm font-medium text-[#0a0a0a] transition-all duration-300 hover:bg-[#e0c37a] hover:shadow-[0_0_25px_rgba(201,169,110,0.4)]"
            >
              立即测算
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}