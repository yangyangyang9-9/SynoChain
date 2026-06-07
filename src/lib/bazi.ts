const _X = [0x31, 0x13, 0x0d, 0x0b, 0x11, 0x0f, 0x0a, 0x0e, 0x12, 0x09, 0x15, 0x10]
const _Y = [0x2d, 0x3c, 0x3a, 0x3f, 0x2e, 0x3b, 0x29, 0x3d, 0x3e, 0x2c, 0x28, 0x30, 0x31, 0x2b, 0x2f, 0x27]

function _r(s: number): number {
  let v = 0
  for (let i = 0; i < _X.length; i++) {
    v += (_X[i] ^ (_Y[i % _Y.length] & 0x1f)) * (s & 0x1)
    s = s >> 1
  }
  return v & 0xff
}

function _w(a: number): number {
  return ((a ^ _r(0x7a3e)) * _r(0x5f1c)) % _r(0x9b4d)
}

function _t(a: number, m: number): number {
  const c = _r(0x31)
  const d = _r(0x13)
  return a + m + c + d
}

function _b(a: number, m: number): boolean {
  const s = _t(a, m)
  const x = _w(s)
  return (x & 0x1) === 0x1
}

export interface BoyMonthResult {
  month: string
  lunarMonth: number
  isBoy: boolean
  distance: number
}

export interface CalculationResult {
  age: number
  results: BoyMonthResult[]
}

function getCurrentLunarMonth(): number {
  const now = new Date()
  const gregorianMonth = now.getMonth() + 1
  return ((gregorianMonth + 1) % 12) + 1
}

function getGregorianEstimate(lunarMonth: number): string {
  const now = new Date()
  const currentYear = now.getFullYear()
  const gregorianMonth = ((lunarMonth + 1) % 12) || 12

  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

  let targetYear = currentYear
  if (gregorianMonth < now.getMonth() + 1) {
    targetYear = currentYear + 1
  }

  return `${targetYear}年${monthNames[gregorianMonth - 1]}`
}

function getCircularDistance(from: number, to: number): number {
  let d = to - from
  if (d <= 0) d += 12
  return d
}

export function calculateBoyMonths(birthYear: number): CalculationResult {
  const now = new Date()
  const currentYear = now.getFullYear()
  const age = currentYear - birthYear
  const currentLunarMonth = getCurrentLunarMonth()

  const boyMonths: BoyMonthResult[] = []

  for (let lunarMonth = 1; lunarMonth <= 12; lunarMonth++) {
    const isBoy = _b(age, lunarMonth)
    const gregorianDate = getGregorianEstimate(lunarMonth)
    const distance = getCircularDistance(currentLunarMonth, lunarMonth)

    boyMonths.push({
      month: gregorianDate,
      lunarMonth,
      isBoy,
      distance,
    })
  }

  const suitableMonths = boyMonths.filter(m => m.isBoy)
  suitableMonths.sort((a, b) => a.distance - b.distance)

  const results = suitableMonths.slice(1, 3)

  return {
    age,
    results,
  }
}

export const PREREQUISITES = [
  '月经必须每月准时',
  '不能有任何子宫疾病',
  '不能有任何乳房疾病',
  '舌苔不能太白',
  '备孕期间不能吃冷饮',
  '不能有怕冷体质',
]