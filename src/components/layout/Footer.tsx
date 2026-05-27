'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function Footer() {
  const t = useTranslations()

  return (
    <footer className="border-t border-white/5 bg-[#0a0a0f]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="url(#chain-grad-footer)" />
                <path d="M10 12h4l2 4-2 4h-4l-2-4 2-4z" stroke="white" strokeWidth="1.5" fill="none" />
                <path d="M18 12h4l2 4-2 4h-4l-2-4 2-4z" stroke="white" strokeWidth="1.5" fill="none" />
                <circle cx="14" cy="16" r="1.5" fill="white" />
                <circle cx="22" cy="16" r="1.5" fill="white" />
                <defs>
                  <linearGradient id="chain-grad-footer" x1="0" y1="0" x2="32" y2="32">
                    <stop stopColor="#0ea5e9" />
                    <stop offset="1" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="text-lg font-bold gradient-text">SynoChain AI</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">
              {t('footer.tagline')}
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t('footer.quickLinks')}</h4>
            <div className="grid grid-cols-2 gap-2">
              <Link href="/" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                {t('footer.about')}
              </Link>
              <Link href="/resources" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                {t('nav.resources')}
              </Link>
              <Link href="/demands" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                {t('nav.demands')}
              </Link>
              <Link href="/ai-recommendations" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                {t('nav.aiRecommend')}
              </Link>
              <Link href="/subscription" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                {t('nav.subscription')}
              </Link>
              <a href="mailto:support@synochain.ai" className="text-sm text-gray-500 hover:text-cyan-400 transition-colors">
                {t('footer.contact')}
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">{t('footer.contactUs')}</h4>
            <a
              href="mailto:support@synochain.ai"
              className="text-sm text-gray-500 hover:text-cyan-400 transition-colors"
            >
              support@synochain.ai
            </a>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-gray-600">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  )
}