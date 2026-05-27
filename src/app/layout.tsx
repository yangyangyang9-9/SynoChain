import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'SynoChain AI - 全球AI商业连接平台',
  description:
    'SynoChain AI 是全球领先的AI驱动商业连接平台，通过人工智能技术自动匹配全球资源与需求，帮助企业和供应商快速建立商业合作。覆盖5000+优质供应链，涵盖所有行业。',
  keywords: 'AI商业连接, 全球供应链, 商业资源匹配, AI推荐, B2B平台',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body className="bg-[#0a0a0f] text-white antialiased min-h-screen">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}