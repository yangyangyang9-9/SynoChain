const PAYPAL_API = process.env.PAYPAL_ENVIRONMENT === 'live'
  ? 'https://api-m.paypal.com'
  : 'https://api-m.sandbox.paypal.com'

const CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
const CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!

async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')

  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })

  if (!res.ok) {
    throw new Error('Failed to get PayPal access token')
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
  const accessToken = await getAccessToken()

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
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
  const accessToken = await getAccessToken()

  const res = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`, {
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