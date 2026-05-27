'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function SubscriptionBanner() {
  const t = useTranslations()

  const benefitIcons = [
    <svg key="0" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>,
    <svg key="1" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>,
    <svg key="2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>,
    <svg key="3" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>,
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="gradient-border rounded-2xl bg-[#1a1a2e] p-8 sm:p-12 lg:p-16">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
              <span className="gradient-text-amber">{t('home.subscriptionTitle')}</span>
            </h2>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/5">
                  {benefitIcons[i]}
                  <span className="text-sm text-gray-300">{t(`home.benefits.${i}`)}</span>
                </div>
              ))}
            </div>

            <Link
              href="/subscription"
              className="mt-10 inline-block px-10 py-4 rounded-xl text-base font-semibold bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-105"
            >
              {t('home.subscribeNow')}
            </Link>

            <p className="mt-4 text-xs text-gray-600">{t('home.subscriptionSubtitle')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}