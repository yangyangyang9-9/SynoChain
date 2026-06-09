function getPaypalConfig() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET
  const environment = process.env.PAYPAL_ENVIRONMENT

  if (!clientId || !clientSecret) {
    throw new Error('PayPal 环境变量未配置，请在 Vercel 设置 NEXT_PUBLIC_PAYPAL_CLIENT_ID 和 PAYPAL_CLIENT_SECRET')
  }

  return {
    api: environment === 'live'
      ? 'https://api-m.paypal.com'
      : 'https://api-m.sandbox.paypal.com',
    clientId,
    clientSecret,
  }
}

async function getAccessToken(): Promise<string> {
  const { api, clientId, clientSecret } = getPaypalConfig()

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64')

  const res = await fetch(`${api}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!res.ok) {
    const errorText = await res.text()
    console.error('PayPal token error:', {
      status: res.status,
      statusText: res.statusText,
      body: errorText,
      environment: process.env.PAYPAL_ENVIRONMENT,
    })
    throw new Error(`获取 PayPal 访问令牌失败 (${res.status})`)
  }

  const data = await res.json()
  return data.access_token
}

export interface CreateOrderParams {
  amount: string
  description: string
  birthDate: string
  birthHour?: string
}

export async function createPayPalOrder(params: CreateOrderParams) {
  const [accessToken, { api }] = await Promise.all([
    getAccessToken(),
    Promise.resolve(getPaypalConfig()),
  ])

  const res = await fetch(`${api}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      intent: 'CAPTURE',
      purchase_units: [
        {
          description: params.description,
          amount: {
            currency_code: 'USD',
            value: params.amount,
          },
          custom_id: JSON.stringify({
            birthDate: params.birthDate,
            birthHour: params.birthHour || '',
          }),
        },
      ],
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
            landing_page: 'LOGIN',
            user_action: 'PAY_NOW',
            return_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/order?payment=success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/order?payment=cancelled`,
          },
        },
      },
    }),
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Failed to create PayPal order')
  }

  return res.json()
}

export async function capturePayPalOrder(orderId: string) {
  const [accessToken, { api }] = await Promise.all([
    getAccessToken(),
    Promise.resolve(getPaypalConfig()),
  ])

  const res = await fetch(`${api}/v2/checkout/orders/${orderId}/capture`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error.message || 'Failed to capture PayPal order')
  }

  return res.json()
}