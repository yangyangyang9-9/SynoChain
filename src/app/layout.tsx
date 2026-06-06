import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '必生儿子 - 八字命理择时测算 | 科学备孕生男孩',
  description: '基于中国传统八字命理学，为您精确计算最近几个月最适合怀男孩的黄金时间。权威命理师团队，$199/次，邮件发送个性化测算报告。',
  keywords: '必生儿子,生男孩测算,八字择时,生儿子时间,命理推算,生男生女,科学备孕',
  openGraph: {
    title: '必生儿子 - 八字命理择时测算',
    description: '基于中国传统八字命理学，为您精确计算最适合怀男孩的黄金时间',
    type: 'website',
    locale: 'zh_CN',
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