'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, BookOpen, Check, Clock, Mail, ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function SuccessContent() {
  const searchParams = useSearchParams()
  const [orderId, setOrderId] = useState<string | null>(null)

  useEffect(() => {
    const id = searchParams.get('orderId')
    if (id) setOrderId(id)
  }, [searchParams])

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: 'spring',
              stiffness: 200,
              damping: 12,
              delay: 0.2,
            }}
            className="mx-auto mb-8 w-24 h-24 rounded-full bg-gradient-to-br from-[#c9a96e] to-[#4a7c3f] flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            >
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </motion.div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-3xl font-serif bg-gradient-to-r from-[#c9a96e] to-[#e2c882] bg-clip-text text-transparent mb-4"
          >
            支付成功！
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="text-[#888] mb-10"
          >
            感谢您的信任，我们将尽快为您处理
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="bg-[#111] border border-[#c9a96e] rounded-xl p-6 text-left mb-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#c9a96e] shrink-0" />
                <div>
                  <p className="text-[#666] text-xs">订单编号</p>
                  <p className="text-[#f5f0e8] font-mono text-sm">
                    {orderId || '---'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#c9a96e] shrink-0" />
                <div>
                  <p className="text-[#666] text-xs">服务内容</p>
                  <p className="text-[#f5f0e8] text-sm">八字命理择时测算</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#c9a96e] shrink-0" />
                <div>
                  <p className="text-[#666] text-xs">支付金额</p>
                  <p className="text-[#c9a96e] font-semibold">$199.00 USD</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#c9a96e] shrink-0" />
                <div>
                  <p className="text-[#666] text-xs">预计发送</p>
                  <p className="text-[#f5f0e8] text-sm">24小时内发送至您的邮箱</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link
              href="/"
              className="flex-1 py-3 rounded-lg border border-[#c9a96e] text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              返回首页
            </Link>
            <Link
              href="/blog"
              className="flex-1 py-3 rounded-lg bg-[#c9a96e] text-[#0a0a0a] font-medium hover:bg-[#e2c882] transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              了解命理知识
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#c9a96e] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  )
}