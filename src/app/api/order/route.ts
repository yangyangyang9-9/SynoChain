import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const orderSchema = z.object({
  name: z.string().min(1, '姓名不能为空'),
  gender: z.enum(['male', 'female']),
  birthDate: z.string().min(1, '出生日期不能为空'),
  birthHour: z.string().min(1, '出生时辰不能为空'),
  email: z.string().email('邮箱格式不正确'),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = orderSchema.parse(body)

    const { name, gender, birthDate, birthHour, email } = validated

    const paypalClientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || 'sb'
    const paypalSecret = process.env.PAYPAL_CLIENT_SECRET || 'sb'

    const auth = Buffer.from(`${paypalClientId}:${paypalSecret}`).toString('base64')

    const tokenRes = await fetch('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${auth}`,
      },
      body: 'grant_type=client_credentials',
    })

    const tokenData = await tokenRes.json()
    const accessToken = tokenData.access_token

    const orderRes = await fetch('https://api-m.sandbox.paypal.com/v2/checkout/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: '199.00',
            },
            description: '八字命理择时测算服务',
          },
        ],
        application_context: {
          brand_name: '必生儿子',
          landing_page: 'NO_PREFERENCE',
          user_action: 'PAY_NOW',
          return_url: `${request.nextUrl.origin}/success`,
          cancel_url: `${request.nextUrl.origin}/order`,
        },
      }),
    })

    const paypalOrder = await orderRes.json()

    const orderId = `BOY${Date.now()}${Math.random().toString(36).slice(2, 8).toUpperCase()}`

    const orderData = {
      orderId,
      paypalOrderId: paypalOrder.id,
      name,
      gender,
      birthDate,
      birthHour,
      email,
      amount: 199.00,
      currency: 'USD',
      status: 'pending',
      createdAt: new Date().toISOString(),
    }

    if (!(globalThis as any).__orders) (globalThis as any).__orders = {}
    ;(globalThis as any).__orders[orderId] = orderData

    return NextResponse.json({
      orderId,
      paypalOrderId: paypalOrder.id,
      amount: 199.00,
      currency: 'USD',
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: '表单验证失败', details: error.issues }, { status: 400 })
    }
    return NextResponse.json({ error: '创建订单失败' }, { status: 500 })
  }
}