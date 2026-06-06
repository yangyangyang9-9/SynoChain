const TIAN_GAN = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'] as const
const DI_ZHI = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'] as const
const SHENG_XIAO = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪'] as const
const WU_XING = ['金', '木', '水', '火', '土'] as const

const GAN_WUXING: Record<string, string> = {
  '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
  '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
}

const ZHI_WUXING: Record<string, string> = {
  '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土', '巳': '火',
  '午': '火', '未': '土', '申': '金', '酉': '金', '戌': '土', '亥': '水'
}

const ZHI_CANG_GAN: Record<string, string[]> = {
  '子': ['癸'], '丑': ['己', '癸', '辛'], '寅': ['甲', '丙', '戊'],
  '卯': ['乙'], '辰': ['戊', '乙', '癸'], '巳': ['丙', '庚', '戊'],
  '午': ['丁', '己'], '未': ['己', '丁', '乙'], '申': ['庚', '壬', '戊'],
  '酉': ['辛'], '戌': ['戊', '辛', '丁'], '亥': ['壬', '甲']
}

const GAN_YIN_YANG: Record<string, '阳' | '阴'> = {
  '甲': '阳', '乙': '阴', '丙': '阳', '丁': '阴', '戊': '阳',
  '己': '阴', '庚': '阳', '辛': '阴', '壬': '阳', '癸': '阴'
}

const DI_ZHI_SHI_CHEN: { name: string; time: string; zhi: string }[] = [
  { name: '子时', time: '23:00-01:00', zhi: '子' },
  { name: '丑时', time: '01:00-03:00', zhi: '丑' },
  { name: '寅时', time: '03:00-05:00', zhi: '寅' },
  { name: '卯时', time: '05:00-07:00', zhi: '卯' },
  { name: '辰时', time: '07:00-09:00', zhi: '辰' },
  { name: '巳时', time: '09:00-11:00', zhi: '巳' },
  { name: '午时', time: '11:00-13:00', zhi: '午' },
  { name: '未时', time: '13:00-15:00', zhi: '未' },
  { name: '申时', time: '15:00-17:00', zhi: '申' },
  { name: '酉时', time: '17:00-19:00', zhi: '酉' },
  { name: '戌时', time: '19:00-21:00', zhi: '戌' },
  { name: '亥时', time: '21:00-23:00', zhi: '亥' },
]

export interface BaziResult {
  year: string
  month: string
  day: string
  hour: string
}

export interface FavorableMonth {
  month: string
  score: number
  reasoning: string
}

export interface CalculationResult {
  bazi: BaziResult
  wuxing: Record<string, number>
  favorableMonths: FavorableMonth[]
  summary: string
}

function getYearGanZhi(year: number): string {
  const baseYear = 1984
  const offset = year - baseYear
  const ganIndex = ((offset % 10) + 10) % 10
  const zhiIndex = ((offset % 12) + 12) % 12
  return TIAN_GAN[ganIndex] + DI_ZHI[zhiIndex]
}

const JIE_QI = [
  { month: 0, gan: '丙', zhi: '寅' },
  { month: 1, gan: '丁', zhi: '卯' },
  { month: 2, gan: '戊', zhi: '辰' },
  { month: 3, gan: '己', zhi: '巳' },
  { month: 4, gan: '庚', zhi: '午' },
  { month: 5, gan: '辛', zhi: '未' },
  { month: 6, gan: '壬', zhi: '申' },
  { month: 7, gan: '癸', zhi: '酉' },
  { month: 8, gan: '甲', zhi: '戌' },
  { month: 9, gan: '乙', zhi: '亥' },
  { month: 10, gan: '丙', zhi: '子' },
  { month: 11, gan: '丁', zhi: '丑' },
]

function getMonthGanZhi(yearGan: string, month: number): string {
  const monthGanMap: Record<string, string[]> = {
    '甲': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
    '乙': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
    '丙': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
    '丁': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
    '戊': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'],
    '己': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
    '庚': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
    '辛': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
    '壬': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
    '癸': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'],
  }
  const zhi = JIE_QI[month].zhi
  const gan = monthGanMap[yearGan] ? monthGanMap[yearGan][month] : '甲'
  return gan + zhi
}

function getDayGanZhi(date: Date): string {
  const base = new Date(1900, 0, 31)
  const diff = Math.floor((date.getTime() - base.getTime()) / (1000 * 60 * 60 * 24))
  const ganIndex = ((diff % 10) + 10) % 10
  const zhiIndex = ((diff % 12) + 12) % 12
  return TIAN_GAN[ganIndex] + DI_ZHI[zhiIndex]
}

function getHourGanZhi(dayGan: string, shiZhiIndex: number): string {
  const hourGanMap: Record<string, string[]> = {
    '甲': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'],
    '乙': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
    '丙': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
    '丁': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
    '戊': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
    '己': ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙'],
    '庚': ['丙', '丁', '戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁'],
    '辛': ['戊', '己', '庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己'],
    '壬': ['庚', '辛', '壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛'],
    '癸': ['壬', '癸', '甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'],
  }
  const gan = hourGanMap[dayGan] ? hourGanMap[dayGan][shiZhiIndex] : '甲'
  return gan + DI_ZHI[shiZhiIndex]
}

export function calculateBazi(birthDate: string, birthHour: string): BaziResult {
  const date = new Date(birthDate)
  const year = date.getFullYear()
  const month = date.getMonth()

  const shiChen = DI_ZHI_SHI_CHEN.find(s => s.name === birthHour)
  const shiZhiIndex = shiChen ? DI_ZHI.indexOf(shiChen.zhi as typeof DI_ZHI[number]) : 0

  const yearGZ = getYearGanZhi(year)
  const monthGZ = getMonthGanZhi(yearGZ[0], month)
  const dayGZ = getDayGanZhi(date)
  const hourGZ = getHourGanZhi(dayGZ[0], shiZhiIndex)

  return {
    year: yearGZ,
    month: monthGZ,
    day: dayGZ,
    hour: hourGZ,
  }
}

function analyzeWuxing(bazi: BaziResult): Record<string, number> {
  const counts: Record<string, number> = {}
  const allGanZhi = [bazi.year, bazi.month, bazi.day, bazi.hour]

  for (const gz of allGanZhi) {
    const gan = gz[0]
    const zhi = gz[1]
    const gwx = GAN_WUXING[gan] || ''
    const zwx = ZHI_WUXING[zhi] || ''
    counts[gwx] = (counts[gwx] || 0) + 1
    counts[zwx] = (counts[zwx] || 0) + 1

    const cangGan = ZHI_CANG_GAN[zhi] || []
    for (const cg of cangGan) {
      const cgwx = GAN_WUXING[cg] || ''
      counts[cgwx] = (counts[cgwx] || 0) + 0.5
    }
  }
  return counts
}

function getDayMaster(bazi: BaziResult): string {
  return bazi.day[0]
}

function getFutureMonthGanZhi(startMonth: number, count: number): { gan: string; zhi: string; full: string }[] {
  const now = new Date()
  const currentYear = now.getFullYear()
  const currentMonth = now.getMonth()
  const startM = startMonth || currentMonth

  const results: { gan: string; zhi: string; full: string }[] = []

  for (let i = 0; i < count; i++) {
    const m = (startM + i) % 12
    const yearOffset = Math.floor((startM + i) / 12)
    const y = currentYear + yearOffset
    const yearGZ = getYearGanZhi(y)
    const monthGZ = getMonthGanZhi(yearGZ[0], m)
    const yearLabel = y
    const monthLabel = m + 1
    results.push({
      gan: monthGZ[0],
      zhi: monthGZ[1],
      full: `${yearLabel}年${monthLabel}月 (${monthGZ})`,
    })
  }

  return results
}

const WUXING_SHENG: Record<string, string> = {
  '木': '火', '火': '土', '土': '金', '金': '水', '水': '木'
}

const WUXING_KE: Record<string, string> = {
  '木': '土', '土': '水', '水': '火', '火': '金', '金': '木'
}

export function calculateFavorableMonths(birthDate: string, birthHour: string): CalculationResult {
  const bazi = calculateBazi(birthDate, birthHour)
  const wuxing = analyzeWuxing(bazi)
  const dayMaster = getDayMaster(bazi)
  const dayMasterWx = GAN_WUXING[dayMaster] || ''

  const now = new Date()
  const futureMonths = getFutureMonthGanZhi(now.getMonth(), 6)

  const favorableMonths: FavorableMonth[] = []

  for (const fm of futureMonths) {
    let score = 50
    const reasons: string[] = []

    const monthGanWx = GAN_WUXING[fm.gan] || ''
    const monthZhiWx = ZHI_WUXING[fm.zhi] || ''

    if (GAN_YIN_YANG[fm.gan] === '阳') {
      score += 15
      reasons.push('月干为阳，阳气旺盛')
    }

    if (monthGanWx === dayMasterWx) {
      score += 10
      reasons.push('月干与日主五行相同')
    }

    if (WUXING_SHENG[monthGanWx] === dayMasterWx) {
      score += 12
      reasons.push('月干五行生助日主')
    }

    if (WUXING_SHENG[dayMasterWx] === monthGanWx) {
      score += 8
      reasons.push('日主生月干，能量流通')
    }

    if (WUXING_KE[monthGanWx] === dayMasterWx) {
      score -= 15
      reasons.push('月干五行克日主')
    }

    const zhiCang = ZHI_CANG_GAN[fm.zhi] || []
    const hasYangGan = zhiCang.some(g => GAN_YIN_YANG[g] === '阳')
    if (hasYangGan) {
      score += 10
      reasons.push('月支藏阳干')
    }

    const hasFire = zhiCang.some(g => GAN_WUXING[g] === '火')
    if (hasFire && dayMasterWx !== '水') {
      score += 5
      reasons.push('月支藏火，阳气充足')
    }

    score = Math.max(0, Math.min(100, score))

    const monthName = `${fm.full.slice(0, 7)}`
    const gongliMonth = `${fm.full.slice(0, 7)}（公历）`

    favorableMonths.push({
      month: gongliMonth,
      score,
      reasoning: reasons.length > 0 ? reasons.join('；') : '综合评估',
    })
  }

  favorableMonths.sort((a, b) => b.score - a.score)

  const topMonth = favorableMonths[0]
  const dayMasterName = `${dayMaster}（${dayMasterWx}）`
  const summary = `根据您的八字 ${bazi.year} ${bazi.month} ${bazi.day} ${bazi.hour} 分析，日主为${dayMasterName}。`
    + `五行分布：${Object.entries(wuxing).map(([k, v]) => `${k}${v}分`).join('、')}。`
    + `未来6个月中，${topMonth.month}最适宜，匹配度${topMonth.score}分。${topMonth.reasoning}。`

  return {
    bazi,
    wuxing,
    favorableMonths,
    summary,
  }
}

export { DI_ZHI_SHI_CHEN, TIAN_GAN, DI_ZHI, WU_XING, GAN_WUXING, ZHI_WUXING, GAN_YIN_YANG }