import { NextRequest, NextResponse } from 'next/server'
import { capturePayPalOrder } from '@/lib/paypal'
import { calculateBoyMonths } from '@/lib/bazi'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { orderId, birthDate } = body

    if (!orderId) {
      return NextResponse.json({ error: '缺少订单ID' }, { status: 400 })
    }

    if (!birthDate) {
      return NextResponse.json({ error: '缺少出生日期' }, { status: 400 })
    }

    // 1. 在 PayPal 确认支付
    const capture = await capturePayPalOrder(orderId)

    // 2. 检查支付状态
    const status = capture.status
    if (status !== 'COMPLETED') {
      return NextResponse.json({ error: '支付未完成' }, { status: 400 })
    }

    // 3. 支付成功，计算测算结果
    const date = new Date(birthDate)
    const birthYear = date.getFullYear()
    const result = calculateBoyMonths(birthYear)

    // 4. 返回结果和支付信息
    return NextResponse.json({
      success: true,
      captureId: capture.id,
      payerEmail: capture.payer?.email_address || '',
      result,
    })
  } catch (error) {
    console.error('Capture PayPal order error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '支付确认失败' },
      { status: 500 }
    )
  }
}