import { NextRequest, NextResponse } from 'next/server'
import { createPayPalOrder } from '@/lib/paypal'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { birthDate, birthHour } = body

    if (!birthDate) {
      return NextResponse.json({ error: '请提供出生日期' }, { status: 400 })
    }

    const order = await createPayPalOrder({
      amount: '199.00',
      description: '八字命理择时测算 - 必生儿子',
      birthDate,
      birthHour,
    })

    return NextResponse.json({
      orderId: order.id,
      order,
    })
  } catch (error) {
    console.error('Create PayPal order error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '创建支付订单失败' },
      { status: 500 }
    )
  }
}