import { NextRequest, NextResponse } from 'next/server'
import { calculateFavorableMonths } from '@/lib/bazi'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paypalOrderId } = body

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

    const captureRes = await fetch(
      `https://api-m.sandbox.paypal.com/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`,
        },
      }
    )

    const captureData = await captureRes.json()

    if (captureData.status === 'COMPLETED') {
      const orders = (globalThis as any).__orders || {}
      let orderData = null

      for (const key of Object.keys(orders)) {
        if (orders[key].paypalOrderId === paypalOrderId) {
          orderData = orders[key]
          orders[key].status = 'paid'
          break
        }
      }

      if (orderData) {
        const result = calculateFavorableMonths(orderData.birthDate, orderData.birthHour)

        const emailHtml = `
<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:serif;background:#0a0a0a;color:#f5f0e8;padding:40px">
<div style="max-width:600px;margin:0 auto;border:1px solid #c9a96e;border-radius:16px;padding:40px">
<h1 style="color:#c9a96e;text-align:center;font-size:28px">必生儿子 · 测算报告</h1>
<p style="color:#8b7355;text-align:center">订单编号: ${orderData.orderId}</p>
<hr style="border-color:#c9a96e33;margin:30px 0">
<h2 style="color:#c9a96e">您的八字</h2>
<p>年柱: ${result.bazi.year} | 月柱: ${result.bazi.month} | 日柱: ${result.bazi.day} | 时柱: ${result.bazi.hour}</p>
<h2 style="color:#c9a96e;margin-top:30px">五行分析</h2>
<p>${Object.entries(result.wuxing).map(([k,v]) => k + ':' + v + '分').join(' | ')}</p>
<h2 style="color:#c9a96e;margin-top:30px">推荐月份（按匹配度排序）</h2>
<div style="background:#1a1a1a;border-radius:12px;padding:20px;margin-top:15px">
${result.favorableMonths.map((m, i) => `
<div style="margin-bottom:20px;padding-bottom:20px;border-bottom:1px solid #333">
<div style="display:flex;justify-content:space-between;align-items:center">
<span style="font-size:18px;color:#c9a96e">${m.month}</span>
<span style="background:#c9a96e;color:#000;padding:4px 12px;border-radius:20px;font-size:14px">${m.score}分</span>
</div>
<p style="color:#8b7355;margin-top:8px">${m.reasoning}</p>
</div>
`).join('')}
</div>
<h2 style="color:#c9a96e;margin-top:30px">综合建议</h2>
<p style="line-height:1.8">${result.summary}</p>
<div style="margin-top:40px;padding:20px;background:#c41e3a11;border-radius:12px;border:1px solid #c41e3a33">
<p style="color:#c9a96e;text-align:center">此报告由必生儿子命理团队基于传统八字命理学生成，仅供参考。</p>
</div>
</div></body></html>`

        try {
          const resendApiKey = process.env.RESEND_API_KEY || ''
          if (resendApiKey) {
            await fetch('https://api.resend.com/emails', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${resendApiKey}`,
              },
              body: JSON.stringify({
                from: '必生儿子 <noreply@bazi-baby.com>',
                to: orderData.email,
                subject: '您的必生儿子测算报告',
                html: emailHtml,
              }),
            })
          }
        } catch {
        }
      }

      return NextResponse.json({
        success: true,
        message: '支付成功，测算报告已发送至您的邮箱',
        estimatedDelivery: '24小时内',
      })
    }

    return NextResponse.json({ success: false, message: '支付未完成' }, { status: 400 })
  } catch (error) {
    return NextResponse.json({ error: '处理支付失败' }, { status: 500 })
  }
}