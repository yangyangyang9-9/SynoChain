'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'
import { useTransition } from 'react'

export default function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const toggleLocale = () => {
    const nextLocale = locale === 'zh-CN' ? 'en-US' : 'zh-CN'
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200 ${
        isPending
          ? 'opacity-50 cursor-wait'
          : 'border-white/10 hover:border-white/30 text-gray-300 hover:text-white bg-white/5 hover:bg-white/10'
      }`}
      title={locale === 'zh-CN' ? 'Switch to English' : '切换到中文'}
    >
      {locale === 'zh-CN' ? 'EN' : '中文'}
    </button>
  )
}