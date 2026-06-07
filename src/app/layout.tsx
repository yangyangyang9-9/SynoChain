import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '必生儿子 - 八字命理择时测算 | Select Baby Boy Timing',
  description: '根据母亲的八字命理，精准计算最近几个月最适合怀男孩的农历时间。$199/次，PayPal支付，即时获得结果。Based on Chinese Bazi astrology, calculate the best lunar months to conceive a boy.',
  keywords: '生男孩,生儿子,八字择时,命理测算,清宫表,农历受孕,baby boy gender selection,Chinese gender calendar,boy conception timing,Bazi calculation',
  openGraph: {
    title: '必生儿子 - 八字命理择时测算 | Select Baby Boy Timing',
    description: '根据母亲的八字命理，精准计算最近几个月最适合怀男孩的农历时间。$199/次，PayPal支付，即时获得结果。',
    type: 'website',
    locale: 'zh_CN',
    siteName: '必生儿子',
    url: 'https://baby-boy-timing.vercel.app',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://baby-boy-timing.vercel.app',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: '必生儿子 - Baby Boy Timing',
              url: 'https://baby-boy-timing.vercel.app',
              description: 'Based on Chinese Bazi astrology, calculate the best lunar months to conceive a boy. 根据母亲八字命理，精准计算最适合怀男孩的农历时间。',
              inLanguage: ['zh-CN', 'en-US'],
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://baby-boy-timing.vercel.app/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}