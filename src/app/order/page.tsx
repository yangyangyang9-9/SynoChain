'use client'

import { useState, FormEvent } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Loader2, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

interface FormData {
  name: string
  gender: 'male' | 'female' | ''
  birthDate: string
  birthHour: string
  email: string
}

interface FormErrors {
  name?: string
  gender?: string
  birthDate?: string
  birthHour?: string
  email?: string
}

const SHICHEN_OPTIONS = [
  { value: 'zi', label: '子时 23:00-01:00' },
  { value: 'chou', label: '丑时 01:00-03:00' },
  { value: 'yin', label: '寅时 03:00-05:00' },
  { value: 'mao', label: '卯时 05:00-07:00' },
  { value: 'chen', label: '辰时 07:00-09:00' },
  { value: 'si', label: '巳时 09:00-11:00' },
  { value: 'wu', label: '午时 11:00-13:00' },
  { value: 'wei', label: '未时 13:00-15:00' },
  { value: 'shen', label: '申时 15:00-17:00' },
  { value: 'you', label: '酉时 17:00-19:00' },
  { value: 'xu', label: '戌时 19:00-21:00' },
  { value: 'hai', label: '亥时 21:00-23:00' },
]

export default function OrderPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    gender: '',
    birthDate: '',
    birthHour: '',
    email: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = '请输入您的姓名'
    }
    if (!formData.gender) {
      newErrors.gender = '请选择性别'
    }
    if (!formData.birthDate) {
      newErrors.birthDate = '请选择出生日期'
    }
    if (!formData.birthHour) {
      newErrors.birthHour = '请选择出生时辰'
    }
    if (!formData.email.trim()) {
      newErrors.email = '请输入邮箱地址'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '请输入有效的邮箱地址'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setLoading(true)
    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        if (data.details) {
          const apiErrors: FormErrors = {}
          data.details.forEach((d: { path: string[]; message: string }) => {
            const field = d.path[0] as keyof FormErrors
            apiErrors[field] = d.message
          })
          setErrors(apiErrors)
        } else {
          setErrors({ name: data.error || '提交失败' })
        }
        setLoading(false)
        return
      }

      window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${data.paypalOrderId}`
    } catch {
      setErrors({ name: '网络错误，请稍后重试' })
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white placeholder-[#666] focus:outline-none focus:border-[#c9a96e] transition-colors duration-200'

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="bg-[#111] border border-[#c9a96e] rounded-2xl p-8 md:p-12 gold-glow"
        >
          <h1 className="text-2xl md:text-3xl font-serif text-center mb-10 bg-gradient-to-r from-[#c9a96e] to-[#e2c882] bg-clip-text text-transparent">
            填写测算信息
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#c9a96e] text-sm mb-2 font-medium">姓名</label>
              <input
                type="text"
                className={inputClass}
                placeholder="请输入您的姓名"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value })
                  if (errors.name) setErrors({ ...errors, name: undefined })
                }}
              />
              {errors.name && <p className="text-[#c41e3a] text-sm mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-[#c9a96e] text-sm mb-2 font-medium">性别</label>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, gender: 'male' })
                    if (errors.gender) setErrors({ ...errors, gender: undefined })
                  }}
                  className={`flex-1 py-3 rounded-lg border transition-all duration-200 ${
                    formData.gender === 'male'
                      ? 'bg-[#c9a96e] text-[#0a0a0a] border-[#c9a96e] font-medium'
                      : 'bg-[#1a1a1a] text-[#888] border-[#333] hover:border-[#c9a96e] hover:text-[#f5f0e8]'
                  }`}
                >
                  男
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, gender: 'female' })
                    if (errors.gender) setErrors({ ...errors, gender: undefined })
                  }}
                  className={`flex-1 py-3 rounded-lg border transition-all duration-200 ${
                    formData.gender === 'female'
                      ? 'bg-[#c9a96e] text-[#0a0a0a] border-[#c9a96e] font-medium'
                      : 'bg-[#1a1a1a] text-[#888] border-[#333] hover:border-[#c9a96e] hover:text-[#f5f0e8]'
                  }`}
                >
                  女
                </button>
              </div>
              {errors.gender && <p className="text-[#c41e3a] text-sm mt-1">{errors.gender}</p>}
            </div>

            <div>
              <label className="block text-[#c9a96e] text-sm mb-2 font-medium">出生日期</label>
              <input
                type="date"
                className={`${inputClass} [color-scheme:dark]`}
                value={formData.birthDate}
                onChange={(e) => {
                  setFormData({ ...formData, birthDate: e.target.value })
                  if (errors.birthDate) setErrors({ ...errors, birthDate: undefined })
                }}
              />
              {errors.birthDate && <p className="text-[#c41e3a] text-sm mt-1">{errors.birthDate}</p>}
            </div>

            <div>
              <label className="block text-[#c9a96e] text-sm mb-2 font-medium">出生时辰</label>
              <select
                className={`${inputClass} appearance-none cursor-pointer`}
                value={formData.birthHour}
                onChange={(e) => {
                  setFormData({ ...formData, birthHour: e.target.value })
                  if (errors.birthHour) setErrors({ ...errors, birthHour: undefined })
                }}
              >
                <option value="" className="text-[#666]">
                  请选择出生时辰
                </option>
                {SHICHEN_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value} className="text-white">
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.birthHour && <p className="text-[#c41e3a] text-sm mt-1">{errors.birthHour}</p>}
            </div>

            <div>
              <label className="block text-[#c9a96e] text-sm mb-2 font-medium">邮箱</label>
              <input
                type="text"
                className={inputClass}
                placeholder="请输入您的邮箱地址"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value })
                  if (errors.email) setErrors({ ...errors, email: undefined })
                }}
              />
              {errors.email && <p className="text-[#c41e3a] text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="pt-4 border-t border-[#333]">
              <div className="flex justify-between items-center mb-4">
                <span className="text-[#888]">测算服务费</span>
                <span className="text-[#c9a96e] text-xl font-semibold">$199.00 USD</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-[#c9a96e] text-[#0a0a0a] font-bold rounded-lg hover:bg-[#e2c882] transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    处理中...
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-5 h-5" />
                    PayPal 支付 $199
                  </>
                )}
              </button>
            </div>
          </form>
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
    </div>
  )
}