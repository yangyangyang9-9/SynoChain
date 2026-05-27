'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/routing'

export default function HeroSection() {
  const t = useTranslations()

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 hero-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0f]" />

      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="gradient-text">{t('hero.title')}</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-3.5 rounded-xl text-base font-semibold bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-105"
            >
              {t('hero.cta1')}
            </Link>
            <Link
              href="#how-it-works"
              className="px-8 py-3.5 rounded-xl text-base font-semibold border border-white/20 text-white hover:bg-white/5 transition-all"
            >
              {t('hero.cta2')}
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="glass-light rounded-xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-1">10,000+</div>
              <div className="text-sm text-gray-500">{t('hero.stats.resources')}</div>
            </div>
            <div className="glass-light rounded-xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-1">5,000+</div>
              <div className="text-sm text-gray-500">{t('hero.stats.supplyChain')}</div>
            </div>
            <div className="glass-light rounded-xl p-6 text-center">
              <div className="text-3xl font-bold gradient-text mb-1">200+</div>
              <div className="text-sm text-gray-500">{t('hero.stats.industries')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}