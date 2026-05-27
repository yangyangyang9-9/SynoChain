import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import '../globals.css'

export const metadata: Metadata = {
  title: 'SynoChain AI - 全球AI商业连接平台',
  description:
    'SynoChain AI 是全球领先的AI驱动商业连接平台，通过人工智能技术自动匹配全球资源与需求，帮助企业和供应商快速建立商业合作。覆盖5000+优质供应链，涵盖所有行业。',
  keywords: 'AI商业连接, 全球供应链, 商业资源匹配, AI推荐, B2B平台',
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'zh-CN' | 'en-US')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html lang={locale === 'zh-CN' ? 'zh-CN' : 'en'} className="scroll-smooth">
      <body className="bg-[#0a0a0f] text-white antialiased min-h-screen">
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}