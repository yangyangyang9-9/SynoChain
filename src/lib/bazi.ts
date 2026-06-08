export interface BoyMonthResult {
  month: string
  lunarMonth: number
  isBoy: boolean
  distance: number
  gregorianRange: string
}

export interface CalculationResult {
  age: number
  results: BoyMonthResult[]
}

function getCurrentLunarMonth(): number {
  const now = new Date()
  const gregorianMonth = now.getMonth() + 1
  return ((gregorianMonth - 2 + 12) % 12) || 12
}

function getGregorianEstimate(lunarMonth: number): string {
  const now = new Date()
  const currentYear = now.getFullYear()
  const gregorianMonth = ((lunarMonth + 2) % 12) || 12

  const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

  let targetYear = currentYear
  if (gregorianMonth < now.getMonth() + 1) {
    targetYear = currentYear + 1
  }

  return `${targetYear}年${monthNames[gregorianMonth - 1]}`
}

function getCircularDistance(from: number, to: number): number {
  let d = to - from
  if (d < 0) d += 12
  // 当月时间太近，不利于用户备孕，排到最后
  if (d === 0) d = 12
  return d
}

// 2026年各农历月对应的公历起始日（基于正月初一=2月17日推算）
// 奇数月30天，偶数月29天
const LUNAR_MONTH_STARTS: Record<number, { month: number; day: number }> = {
  1:  { month: 2, day: 17 },  // 正月
  2:  { month: 3, day: 19 },  // 二月
  3:  { month: 4, day: 17 },  // 三月
  4:  { month: 5, day: 17 },  // 四月
  5:  { month: 6, day: 15 },  // 五月
  6:  { month: 7, day: 15 },  // 六月
  7:  { month: 8, day: 13 },  // 七月
  8:  { month: 9, day: 11 },  // 八月
  9:  { month: 10, day: 10 }, // 九月
  10: { month: 11, day: 9 },  // 十月
  11: { month: 12, day: 8 },  // 十一月
  12: { month: 1, day: 6 },   // 十二月（跨年）
}

const LUNAR_MONTH_DAYS: Record<number, number> = {
  1: 30, 2: 29, 3: 30, 4: 29, 5: 30, 6: 29,
  7: 30, 8: 29, 9: 30, 10: 29, 11: 30, 12: 29,
}

function getGregorianRange(lunarMonth: number): string {
  const start = LUNAR_MONTH_STARTS[lunarMonth]
  const days = LUNAR_MONTH_DAYS[lunarMonth]
  if (!start || !days) return ''

  // 计算结束日期
  let endMonth = start.month
  let endDay = start.day + days - 1
  const daysInStartMonth = new Date(2026, start.month, 0).getDate()
  if (endDay > daysInStartMonth) {
    endDay -= daysInStartMonth
    endMonth++
  }

  return `${start.month}月${start.day}日 - ${endMonth}月${endDay}日`
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
      gregorianRange: getGregorianRange(lunarMonth),
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