import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '健康闯关 - Health Quest | 199关健康挑战游戏',
  description: '从感冒到癌症，199关健康问答闯关游戏。答对进入下一关，答错需要等待治疗时间。签到抵扣治疗时间，好友助力加速康复。',
  keywords: '健康游戏,闯关游戏,疾病问答,健康挑战,签到打卡,好友助力,health game,quiz game,disease challenge',
  openGraph: {
    title: '健康闯关 - Health Quest',
    description: '199关健康问答闯关游戏，从感冒到癌症，挑战你的健康知识！',
    type: 'website',
    locale: 'zh_CN',
    siteName: '健康闯关',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  )
}
