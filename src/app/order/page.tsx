'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Loader2, X, Star } from 'lucide-react'
import Link from 'next/link'
import { PREREQUISITES, BoyMonthResult } from '@/lib/bazi'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'

interface FormData {
  birthDate: string
  birthHour: string
}

interface FormErrors {
  birthDate?: string
}

const PAYPAL_CLIENT_ID = 'AbihYVkuRXCYaU49TO0QCLlCpH5srnNl0-43eJLUb-rU4fLwkfQKMHvIJLnjf3hRHX5X5FVcrkFsxWeM'

function OrderForm() {
  const [formData, setFormData] = useState<FormData>({
    birthDate: '',
    birthHour: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [showResult, setShowResult] = useState(false)
  const [resultData, setResultData] = useState<{
    age: number
    results: BoyMonthResult[]
  } | null>(null)
  const [paymentStep, setPaymentStep] = useState<'form' | 'paying' | 'paid'>('form')

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!formData.birthDate) {
      newErrors.birthDate = '请选择母亲的出生日期（农历）'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handlePaymentSuccess = useCallback(async (orderId: string) => {
    setLoading(true)
    setPaymentStep('paid')
    try {
      const res = await fetch('/api/payments/capture-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId,
          birthDate: formData.birthDate,
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setErrors({ birthDate: data.error || '支付确认失败' })
        setLoading(false)
        setPaymentStep('form')
        return
      }

      if (data.success && data.result) {
        setResultData(data.result)
        setShowResult(true)
      } else {
        setErrors({ birthDate: '获取测算结果失败' })
      }
    } catch {
      setErrors({ birthDate: '网络错误，请稍后重试' })
    } finally {
      setLoading(false)
    }
  }, [formData.birthDate])

  const inputClass =
    'w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white placeholder-[#666] focus:outline-none focus:border-[#c9a96e] transition-colors duration-200'

  return (
    <>
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-[#111] border border-[#c9a96e] rounded-2xl p-8 md:p-12 gold-glow"
        >
          <h1 className="text-2xl md:text-3xl font-serif text-center mb-2 bg-gradient-to-r from-[#c9a96e] to-[#e2c882] bg-clip-text text-transparent">
            填写测算信息
          </h1>
          <p className="text-center text-[#888] text-sm mb-10">
            测算费用 <span className="text-[#c9a96e] font-bold">$199 USD</span> / 次
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-[#c9a96e] text-sm mb-2 font-medium">
                母亲的出生日期 <span className="text-[#c41e3a]">*</span>
              </label>
              <input
                type="date"
                className={`${inputClass} [color-scheme:dark]`}
                value={formData.birthDate}
                onChange={(e) => {
                  setFormData({ ...formData, birthDate: e.target.value })
                  if (errors.birthDate) setErrors({ ...errors, birthDate: undefined })
                }}
                disabled={paymentStep !== 'form'}
              />
              <p className="text-[#666] text-xs mt-1">请输入母亲的农历出生日期</p>
              {errors.birthDate && <p className="text-[#c41e3a] text-sm mt-1">{errors.birthDate}</p>}
            </div>

            <div>
              <label className="block text-[#c9a96e] text-sm mb-2 font-medium">
                出生时辰 <span className="text-[#666] text-xs">(选填)</span>
              </label>
              <select
                className={`${inputClass} appearance-none cursor-pointer`}
                value={formData.birthHour}
                onChange={(e) => setFormData({ ...formData, birthHour: e.target.value })}
                disabled={paymentStep !== 'form'}
              >
                <option value="" className="text-[#666]">
                  请选择出生时辰（选填）
                </option>
                <option value="zi" className="text-white">子时 23:00-01:00</option>
                <option value="chou" className="text-white">丑时 01:00-03:00</option>
                <option value="yin" className="text-white">寅时 03:00-05:00</option>
                <option value="mao" className="text-white">卯时 05:00-07:00</option>
                <option value="chen" className="text-white">辰时 07:00-09:00</option>
                <option value="si" className="text-white">巳时 09:00-11:00</option>
                <option value="wu" className="text-white">午时 11:00-13:00</option>
                <option value="wei" className="text-white">未时 13:00-15:00</option>
                <option value="shen" className="text-white">申时 15:00-17:00</option>
                <option value="you" className="text-white">酉时 17:00-19:00</option>
                <option value="xu" className="text-white">戌时 19:00-21:00</option>
                <option value="hai" className="text-white">亥时 21:00-23:00</option>
              </select>
            </div>

            <div className="pt-4">
              {paymentStep === 'form' || paymentStep === 'paid' ? (
                <PayPalScriptProvider
                  options={{
                    clientId: PAYPAL_CLIENT_ID,
                    currency: 'USD',
                    intent: 'capture',
                  }}
                >
                  <PayPalButtons
                    style={{
                      shape: 'rect',
                      layout: 'vertical',
                      color: 'gold',
                      label: 'pay',
                      height: 48,
                    }}
                    disabled={!formData.birthDate || paymentStep !== 'form'}
                    createOrder={async () => {
                      if (!validate()) {
                        throw new Error('表单验证失败')
                      }
                      setPaymentStep('paying')
                      const res = await fetch('/api/payments/create-order', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          birthDate: formData.birthDate,
                          birthHour: formData.birthHour || undefined,
                        }),
                      })
                      const data = await res.json()
                      if (!res.ok) {
                        setErrors({ birthDate: data.error || '创建订单失败' })
                        setPaymentStep('form')
                        throw new Error(data.error || '创建订单失败')
                      }
                      return data.orderId
                    }}
                    onApprove={async (data) => {
                      if (data.orderID) {
                        await handlePaymentSuccess(data.orderID)
                      }
                    }}
                    onCancel={() => {
                      setPaymentStep('form')
                      setErrors({ birthDate: '支付已取消' })
                    }}
                    onError={(err) => {
                      console.error('PayPal error:', err)
                      setPaymentStep('form')
                      setErrors({ birthDate: '支付出错，请重试' })
                    }}
                  />
                </PayPalScriptProvider>
              ) : null}

              {paymentStep === 'paying' && (
                <div className="w-full py-4 bg-[#c9a96e]/20 text-[#c9a96e] font-bold rounded-lg flex items-center justify-center gap-2 text-lg">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  正在跳转支付...
                </div>
              )}

              {paymentStep === 'paid' && loading && (
                <div className="w-full py-4 bg-[#c9a96e]/20 text-[#c9a96e] font-bold rounded-lg flex items-center justify-center gap-2 text-lg">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  支付成功，正在测算...
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-6"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#888] hover:text-[#c9a96e] transition-colors duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
        </motion.div>
      </div>

      <AnimatePresence>
        {showResult && resultData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowResult(false)
              setPaymentStep('form')
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="bg-[#111] border border-[#c9a96e] rounded-2xl p-6 md:p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-serif text-[#c9a96e]">测算结果</h2>
                <button
                  onClick={() => {
                    setShowResult(false)
                    setPaymentStep('form')
                  }}
                  className="text-[#666] hover:text-[#f5f0e8] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center mb-6">
                <p className="text-[#888] text-sm">母亲的当前年龄</p>
                <p className="text-3xl font-bold text-[#c9a96e] mt-1">{resultData.age} 岁</p>
              </div>

              <p className="text-[#888] text-sm mb-4">最近适合生儿子的农历月份：</p>

              {resultData.results.length > 0 ? (
                <div className="space-y-3">
                  {resultData.results.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#1a1a1a] border border-[#c9a96e]/30 rounded-xl p-4 flex items-center gap-4"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#c9a96e]/15 flex items-center justify-center shrink-0">
                        <Star className="w-5 h-5 text-[#c9a96e]" />
                      </div>
                      <div>
                        <p className="text-[#f5f0e8] font-medium text-base">
                          农历{_lunarName(item.lunarMonth)}
                        </p>
                        <p className="text-[#888] text-xs mt-0.5">
                          新历 {item.gregorianRange}
                        </p>
                        <span className="inline-block mt-1 px-2 py-0.5 bg-[#c9a96e]/10 border border-[#c9a96e]/30 rounded text-[#c9a96e] text-xs">
                          适合生男孩
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[#888]">暂未找到合适的月份</p>
                </div>
              )}

              <div className="bg-[#c41e3a]/10 border border-[#c41e3a]/30 rounded-xl p-4 mt-6">
                <p className="text-[#c41e3a] text-sm font-medium mb-2">重要前提条件</p>
                <ul className="space-y-1.5">
                  {PREREQUISITES.map((item, index) => (
                    <li key={index} className="text-[#c41e3a]/80 text-xs flex items-start gap-2">
                      <span className="shrink-0 mt-0.5">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-[#c41e3a]/70 text-xs mt-3 leading-relaxed">
                  如条件不满足，请发邮件至
                  <a href="mailto:yuzhouyixue@gmail.com" className="text-[#c9a96e] hover:text-[#e2c882] ml-1">
                    yuzhouyixue@gmail.com
                  </a>
                  进行咨询调理并测算精准受孕日期
                </p>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => {
                    setShowResult(false)
                    setPaymentStep('form')
                  }}
                  className="flex-1 py-3 rounded-lg border border-[#333] text-[#888] hover:border-[#c9a96e] hover:text-[#f5f0e8] transition-colors duration-200 text-sm"
                >
                  关闭
                </button>
                <Link
                  href="/"
                  className="flex-1 py-3 rounded-lg bg-[#c9a96e] text-[#0a0a0a] font-bold hover:bg-[#e2c882] transition-colors duration-200 text-sm text-center"
                >
                  返回首页
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default function OrderPage() {
  return <OrderForm />
}

function _lunarName(lunarMonth: number): string {
  const names = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '腊月']
  return names[(lunarMonth - 1 + 12) % 12]
}