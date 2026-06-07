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
  const ageIsOdd = age % 2 === 1

  const boyMonths: BoyMonthResult[] = []

  for (let lunarMonth = 1; lunarMonth <= 12; lunarMonth++) {
    const monthIsOdd = lunarMonth % 2 === 1
    const isBoy = ageIsOdd ? !monthIsOdd : monthIsOdd

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

  const results = suitableMonths.slice(0, 3)

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