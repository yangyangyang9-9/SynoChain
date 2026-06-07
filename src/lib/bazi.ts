const _K = [0x10, 0x09, 0x0b, 0x0d, 0x13, 0x0a, 0x0c, 0x0e, 0x12, 0x0f, 0x15, 0x11]
const _S = [0x27, 0x2e, 0x2c, 0x3a, 0x2b, 0x2f, 0x3d, 0x29, 0x3e, 0x28, 0x3b, 0x2d, 0x3c, 0x3f, 0x30, 0x31]

function _d(k: number): number {
  let r = 0
  for (let i = 0; i < _K.length; i++) {
    r += (_K[i] ^ (_S[i % _S.length] & 0x1f)) * (k & 0x1)
    k = k >> 1
  }
  return r & 0xff
}

function _e(v: number): number {
  return ((v ^ _d(0x7a3e)) * _d(0x5f1c)) % _d(0x9b4d)
}

function _g(a: number, b: number): number {
  return ((a + _d(0x3e8)) % _d(0x4e20)) + b
}

function _h(a: number, b: number): boolean {
  const x = _g(a, b)
  const y = _e(x)
  return (y & 0x1) === 0x1
}

function _f(a: number, b: number): number {
  return (_g(a, b) + _d(0x2a)) & 0xffff
}

export interface BoyMonthResult {
  month: string
  lunarMonth: number
  isBoy: boolean
}

export interface CalculationResult {
  age: number
  results: BoyMonthResult[]
}

function lunarMonthToName(lunarMonth: number): string {
  const names = ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '腊月']
  return names[(lunarMonth - 1 + 12) % 12]
}

function getGregorianDateFromLunarMonth(lunarMonth: number): string {
  const now = new Date()
  const currentYear = now.getFullYear()

  const lunarBase = lunarMonth - 1
  let gregorianMonth = lunarBase

  if (lunarBase <= 2) {
    gregorianMonth = lunarBase + 10
  } else {
    gregorianMonth = lunarBase - 2
  }

  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  let targetYear = gregorianMonth >= 10 ? currentYear - 1 : currentYear
  if (gregorianMonth >= 12) {
    gregorianMonth -= 12
    targetYear += 1
  }

  return `${targetYear}年${monthNames[gregorianMonth]}`
}

export function calculateBoyMonths(birthYear: number): CalculationResult {
  const now = new Date()
  const currentYear = now.getFullYear()
  const age = currentYear - birthYear

  const boyMonths: BoyMonthResult[] = []

  for (let lunarMonth = 1; lunarMonth <= 12; lunarMonth++) {
    const isBoy = _h(age, lunarMonth)
    const gregorianDate = getGregorianDateFromLunarMonth(lunarMonth)

    boyMonths.push({
      month: gregorianDate,
      lunarMonth,
      isBoy,
    })
  }

  const boyResults = boyMonths.filter(m => m.isBoy)
  const sortedResults = boyResults.slice(0, 3)

  return {
    age,
    results: sortedResults,
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