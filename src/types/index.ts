export interface User {
  id: string
  email: string
  role: string
  is_subscribed: boolean
  created_at: string
}

export interface Resource {
  id: string
  user_id: string
  title: string
  description: string
  category: string
  contact: string
  country: string
  is_premium: boolean
  created_at: string
}

export interface Demand {
  id: string
  user_id: string
  title: string
  description: string
  category: string
  country: string
  created_at: string
}

export interface MatchResult {
  id: string
  resource_id: string
  demand_id: string
  score: number
  reason: string
  industry: string
  recommendation: string
  created_at: string
}

export interface Subscription {
  id: string
  user_id: string
  plan: string
  status: string
  amount: number
  started_at: string
  expires_at: string
}

export interface PremiumResource {
  id: string
  title: string
  description: string
  category: string
  industry: string
  country: string
  contact_info: string
  verified: boolean
}

export interface AIRecommendation {
  id: string
  match_score: number
  reason: string
  is_read: boolean
  created_at: string
  resource?: Resource
  demand?: Demand
}

export const countryList = [
  { code: 'CN', name: '中国', flag: '🇨🇳' },
  { code: 'US', name: '美国', flag: '🇺🇸' },
  { code: 'JP', name: '日本', flag: '🇯🇵' },
  { code: 'KR', name: '韩国', flag: '🇰🇷' },
  { code: 'DE', name: '德国', flag: '🇩🇪' },
  { code: 'GB', name: '英国', flag: '🇬🇧' },
  { code: 'FR', name: '法国', flag: '🇫🇷' },
  { code: 'IN', name: '印度', flag: '🇮🇳' },
  { code: 'BR', name: '巴西', flag: '🇧🇷' },
  { code: 'AU', name: '澳大利亚', flag: '🇦🇺' },
  { code: 'SG', name: '新加坡', flag: '🇸🇬' },
  { code: 'VN', name: '越南', flag: '🇻🇳' },
  { code: 'TH', name: '泰国', flag: '🇹🇭' },
  { code: 'MY', name: '马来西亚', flag: '🇲🇾' },
  { code: 'ID', name: '印度尼西亚', flag: '🇮🇩' },
  { code: 'PH', name: '菲律宾', flag: '🇵🇭' },
  { code: 'RU', name: '俄罗斯', flag: '🇷🇺' },
  { code: 'CA', name: '加拿大', flag: '🇨🇦' },
  { code: 'MX', name: '墨西哥', flag: '🇲🇽' },
  { code: 'AE', name: '阿联酋', flag: '🇦🇪' },
]

export const resourceCategories = ['工厂', '产品', '渠道', '服务', '跨境资源', '供应链资源', '其他']

export const demandCategories = ['采购需求', '合作需求', '代理需求', '供应链需求', '海外渠道需求', '其他']

export const categoryColors: Record<string, string> = {
  '工厂': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  '产品': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  '渠道': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  '服务': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  '跨境资源': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
  '供应链资源': 'bg-sky-500/20 text-sky-400 border-sky-500/30',
  '采购需求': 'bg-red-500/20 text-red-400 border-red-500/30',
  '合作需求': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
  '代理需求': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  '供应链需求': 'bg-teal-500/20 text-teal-400 border-teal-500/30',
  '海外渠道需求': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  '其他': 'bg-gray-500/20 text-gray-400 border-gray-500/30',
}