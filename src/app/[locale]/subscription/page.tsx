'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'
import { useAuthStore } from '@/store/authStore'

export default function SubscriptionPage() {
  const t = useTranslations()
  const { isAuthenticated, user } = useAuthStore()

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            <span className="gradient-text-amber">{t('subscriptionPage.title')}</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            {t('home.subscriptionSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="glass rounded-2xl p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">{t('subscriptionPage.free')}</h2>
              <p className="text-4xl font-bold gradient-text">$0</p>
              <p className="text-sm text-gray-500 mt-1">/month</p>
            </div>

            <div className="space-y-3 mb-8">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-500 flex-shrink-0">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-sm text-gray-400">{t(`subscriptionPage.freeFeatures.${i}`)}</span>
                </div>
              ))}
            </div>

            <Link
              href="/register"
              className="block w-full py-3 rounded-xl text-sm font-medium text-center border border-white/10 text-white hover:bg-white/5 transition-colors"
            >
              {isAuthenticated ? t('subscriptionPage.free') : t('subscriptionPage.free')}
            </Link>
          </div>

          <div className="gradient-border rounded-2xl bg-[#1a1a2e] p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium rounded-bl-xl">
              {t('subscriptionPage.premium')}
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">{t('subscriptionPage.premium')}</h2>
              <p className="text-4xl font-bold gradient-text-amber">{t('subscriptionPage.price')}</p>
              <p className="text-sm text-gray-500 mt-1">/month</p>
            </div>

            <div className="space-y-3 mb-8">
              {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                <div key={i} className="flex items-center gap-3">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-amber-400 flex-shrink-0">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                  <span className="text-sm text-gray-300">{t(`subscriptionPage.premiumFeatures.${i}`)}</span>
                </div>
              ))}
            </div>

            <button
              className="block w-full py-3 rounded-xl text-sm font-semibold text-center bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40"
            >
              {user?.is_subscribed ? t('subscriptionPage.subscribeBtn') : t('subscriptionPage.subscribeBtn')}
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-16 p-8 glass rounded-2xl">
          <h3 className="text-lg font-semibold text-white mb-4">{t('subscriptionPage.paymentInfo')}</h3>
          <p className="text-sm text-gray-400 mb-4">
            {t('subscriptionPage.paymentInfo')}
          </p>
          <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-400">
                  <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-white font-medium">PayPal</p>
                <p className="text-xs text-gray-500">{t('subscriptionPage.paypalEmail')}</p>
              </div>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-600">
            {t('footer.contactUs')}
          </p>
        </div>
      </div>
    </div>
  )
}