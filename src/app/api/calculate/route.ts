import { NextRequest, NextResponse } from 'next/server'
import { calculateBoyMonths } from '@/lib/bazi'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { birthDate } = body

    if (!birthDate || typeof birthDate !== 'string') {
      return NextResponse.json({ error: '请提供出生日期' }, { status: 400 })
    }

    const date = new Date(birthDate)
    if (isNaN(date.getTime())) {
      return NextResponse.json({ error: '出生日期格式不正确' }, { status: 400 })
    }

    const birthYear = date.getFullYear()

    const result = calculateBoyMonths(birthYear)

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: '计算失败，请稍后重试' }, { status: 500 })
  }
}