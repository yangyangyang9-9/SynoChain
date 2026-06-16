'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useGameStore } from '@/lib/store'
import { levels, categoryNames, categoryColors } from '@/lib/levels'
import { useTranslation } from 'react-i18next'
import '@/lib/i18n'
import Link from 'next/link'

export default function Game() {
  const { t, i18n } = useTranslation()
  const router = useRouter()
  const { user, answerQuestion, checkIn, useSkipCard, useSpeedCard, useReviveCard } = useGameStore()
  
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [checkedIn, setCheckedIn] = useState(false)

  useEffect(() => {
    if (!user) {
      router.push('/login')
    }
  }, [user, router])

  useEffect(() => {
    if (user?.in_treatment && user.treatment_end_time) {
      const timer = setInterval(() => {
        const now = new Date().getTime()
        const end = new Date(user.treatment_end_time!).getTime()
        const distance = end - now

        if (distance <= 0) {
          clearInterval(timer)
          window.location.reload()
        } else {
          setCountdown({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          })
        }
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [user?.in_treatment, user?.treatment_end_time])

  useEffect(() => {
    if (user) {
      const today = new Date().toISOString().split('T')[0]
      const checkinDate = user.created_at ? new Date(user.created_at).toISOString().split('T')[0] : ''
      setCheckedIn(today === checkinDate)
    }
  }, [user])

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-primary text-2xl">{t('common.loading')}</div>
      </div>
    )
  }

  const currentLevel = levels.find(l => l.id === user.current_level)
  if (!currentLevel) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col">
        <div className="text-4xl text-primary mb-4">🎉</div>
        <div className="text-2xl text-primary">恭喜通关！</div>
      </div>
    )
  }

  const handleAnswer = async () => {
    if (selectedAnswer === null) return
    
    const result = await answerQuestion(user.current_level, selectedAnswer)
    setIsCorrect(result)
    setShowResult(true)
  }

  const handleCheckIn = async () => {
    try {
      await checkIn()
      setCheckedIn(true)
    } catch (err: any) {
      alert(err.message)
    }
  }

  const handleUseSkipCard = async () => {
    if (user.skip_cards <= 0) {
      alert('没有跳过卡')
      return
    }
    if (confirm('确定使用跳过卡？')) {
      await useSkipCard()
    }
  }

  const handleUseSpeedCard = async () => {
    if (user.speed_cards <= 0) {
      alert('没有加速卡')
      return
    }
    if (confirm('确定使用加速卡？减少3天治疗时间')) {
      await useSpeedCard()
    }
  }

  const handleUseReviveCard = async () => {
    if (user.revive_cards <= 0) {
      alert('没有复活卡')
      return
    }
    if (confirm('确定使用复活卡？恢复3点生命值')) {
      await useReviveCard()
    }
  }

  return (
    <div className="min-h-screen bg-darker">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="pixel-text text-primary text-xl">
            {t('app.title')}
          </Link>
          <div className="flex items-center gap-4">
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'zh' ? 'en' : 'zh')}
              className="px-3 py-1 bg-primary/20 text-primary rounded-lg hover:bg-primary/30 transition text-sm"
            >
              {i18n.language === 'zh' ? 'EN' : '中文'}
            </button>
            <Link href="/shop" className="px-4 py-2 bg-warning/20 text-warning rounded-lg hover:bg-warning/30 transition">
              {t('nav.shop')}
            </Link>
            <Link href="/ranking" className="px-4 py-2 bg-success/20 text-success rounded-lg hover:bg-success/30 transition">
              {t('nav.ranking')}
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* User Stats */}
        <div className="game-card p-6 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-primary">{user.current_level}</div>
              <div className="text-white/60 text-sm">{t('game.currentLevel')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-secondary">{user.lives}/3</div>
              <div className="text-white/60 text-sm">{t('game.lives')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">{user.coins}</div>
              <div className="text-white/60 text-sm">{t('game.coins')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">{user.skip_cards}</div>
              <div className="text-white/60 text-sm">{t('game.skipCards')}</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-primary">{user.speed_cards}</div>
              <div className="text-white/60 text-sm">{t('game.speedCards')}</div>
            </div>
          </div>
        </div>

        {/* Treatment State */}
        {user.in_treatment && user.treatment_end_time ? (
          <div className="game-card p-8 mb-6 border-2 border-danger">
            <h3 className="text-2xl font-bold text-danger mb-4 text-center neon-text-danger">
              {t('game.inTreatment')}
            </h3>
            <div className="text-center mb-6">
              <div className="text-white/80 mb-2">{t('game.treatmentEnds')}</div>
              <div className="text-4xl font-bold text-primary">
                {countdown.days} {t('game.days')} {countdown.hours.toString().padStart(2, '0')}:{countdown.minutes.toString().padStart(2, '0')}:{countdown.seconds.toString().padStart(2, '0')}
              </div>
            </div>
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={handleCheckIn}
                disabled={checkedIn}
                className="btn-success disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkedIn ? t('game.checkedIn') : t('game.checkIn')}
              </button>
              <button
                onClick={handleUseSpeedCard}
                disabled={user.speed_cards <= 0}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {t('game.useSpeedCard')} ({user.speed_cards})
              </button>
              <button
                onClick={handleUseReviveCard}
                disabled={user.revive_cards <= 0}
                className="btn-danger disabled:opacity-50 disabled:cursor-not-allowed"
              >
                使用复活卡 ({user.revive_cards})
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Question Card */}
            <div className="game-card p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <span className="text-white/60 text-sm">{t('game.currentLevel')}</span>
                  <span className="text-primary font-bold ml-2">#{currentLevel.id}</span>
                </div>
                <div
                  className="px-3 py-1 rounded-full text-sm font-bold"
                  style={{ backgroundColor: categoryColors[currentLevel.category] + '33', color: categoryColors[currentLevel.category] }}
                >
                  {categoryNames[currentLevel.category][i18n.language as 'zh' | 'en']}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">
                {currentLevel.disease[i18n.language as 'zh' | 'en']}
              </h3>
              <p className="text-xl text-white/90 mb-8">
                {currentLevel.question[i18n.language as 'zh' | 'en']}
              </p>

              <div className="space-y-3">
                {currentLevel.options[i18n.language as 'zh' | 'en'].map((option, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAnswer(index)}
                    disabled={showResult}
                    className={`w-full p-4 rounded-lg text-left transition ${
                      selectedAnswer === index
                        ? 'bg-primary text-white'
                        : 'bg-dark border border-border hover:border-primary text-white/80'
                    } ${showResult && index === currentLevel.correctAnswer ? 'bg-success text-white' : ''} ${
                      showResult && selectedAnswer === index && index !== currentLevel.correctAnswer ? 'bg-danger text-white' : ''
                    } disabled:cursor-not-allowed`}
                  >
                    <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span>
                    {option}
                  </button>
                ))}
              </div>

              {!showResult ? (
                <button
                  onClick={handleAnswer}
                  disabled={selectedAnswer === null}
                  className="w-full mt-6 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {t('game.submit')}
                </button>
              ) : (
                <div className="mt-6">
                  <div className={`p-4 rounded-lg mb-4 ${isCorrect ? 'bg-success/20 border border-success' : 'bg-danger/20 border border-danger'}`}>
                    <div className={`text-xl font-bold mb-2 ${isCorrect ? 'text-success' : 'text-danger'}`}>
                      {isCorrect ? t('game.correct') : t('game.wrong')}
                    </div>
                    <div className="text-white/80">
                      {currentLevel.explanation[i18n.language as 'zh' | 'en']}
                    </div>
                  </div>
                  {isCorrect && (
                    <button
                      onClick={() => {
                        setShowResult(false)
                        setSelectedAnswer(null)
                      }}
                      className="w-full btn-success"
                    >
                      {t('game.nextLevel')}
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-center flex-wrap">
              <button
                onClick={handleCheckIn}
                disabled={checkedIn}
                className="btn-success disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {checkedIn ? t('game.checkedIn') : t('game.checkIn')}
              </button>
              <button
                onClick={handleUseSkipCard}
                disabled={user.skip_cards <= 0}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                使用跳过卡 ({user.skip_cards})
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
