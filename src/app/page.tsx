import { User, CreditCard, Mail, Star, ChevronDown, Calendar, Droplets, Compass } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Particles from '@/components/Particles'
import YinYang from '@/components/YinYang'
import Accordion from '@/components/Accordion'

const steps = [
  {
    icon: User,
    title: '填写信息',
    description: '填写您的出生日期（农历）',
  },
  {
    icon: Calendar,
    title: '免费测算',
    description: '确认前提条件，免费测算',
  },
  {
    icon: Mail,
    title: '即时结果',
    description: '支付成功后立即获得结果',
  },
]

const principles = [
  {
    icon: Calendar,
    title: '八字排盘',
    description: '根据您提供的出生日期与时辰，精准排出四柱八字，分析命主五行旺衰与格局高低。',
  },
  {
    icon: Droplets,
    title: '五行分析',
    description: '通过五行生克制化原理，推算子女宫与子嗣运，判断最佳受孕时机与性别倾向。',
  },
  {
    icon: Compass,
    title: '择时推荐',
    description: '结合流年流月五行流转，为您推荐未来数月中最利于怀男孩的黄金时间窗口。',
  },
]

const testimonials = [
  {
    initials: 'LS',
    name: '李女士',
    stars: 5,
    quote: '按照测算的时间备孕，真的如愿以偿生了儿子！非常感谢必生儿子团队的专业服务。',
  },
  {
    initials: 'WX',
    name: '王先生',
    stars: 5,
    quote: '报告非常详细，不仅有最佳时间推荐，还有调理建议。专业性让人信服。',
  },
  {
    initials: 'ZM',
    name: '张妈妈',
    stars: 5,
    quote: '一开始半信半疑，但收到报告后发现分析很透彻。现在已经怀孕了，期待好消息！',
  },
]

const faqItems = [
  {
    question: '测算需要什么信息？',
    answer: '只需提供您的农历出生日期即可，出生时辰为选填项。',
  },
  {
    question: '多久能收到结果？',
    answer: '确认前提条件后，支付成功即可立即获得测算结果。',
  },
  {
    question: '测算准确吗？',
    answer: '基于千年传统命理学中的清宫表算法，结合现代数据处理技术，已帮助数千家庭。',
  },
  {
    question: '支持退款吗？',
    answer: '测算结果即时显示，不支持退款。如有疑问请联系 yuzhouyixue@gmail.com。',
  },
  {
    question: '需要付费吗？',
    answer: '当前免费测算。如需精准调理方案，请联系 yuzhouyixue@gmail.com 进行专业咨询。',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-void text-parchment relative">
      <Particles />
      <Navbar />

      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-16">
        <div className="absolute top-20 right-10 md:top-32 md:right-20">
          <YinYang />
        </div>

        <div className="text-center z-10 max-w-4xl mx-auto">
          <h1 className="text-7xl md:text-8xl font-bold font-serif gold-gradient leading-tight opacity-0 fade-in-up stagger-1">
            必生儿子
          </h1>
          <p className="mt-6 text-lg md:text-xl text-parchment/70 leading-relaxed opacity-0 fade-in-up stagger-2">
            基于千年八字命理学，AI 精准计算最佳怀男孩时间
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 fade-in-up stagger-3">
            <a
              href="#cta"
              className="px-8 py-3 bg-gold-500 text-void font-bold rounded-lg hover:bg-gold-400 transition-all duration-200 text-base"
            >
              免费测算
            </a>
            <a
              href="#how-it-works"
              className="px-8 py-3 border border-[#c9a96e]/50 text-gold-500 rounded-lg hover:bg-[#c9a96e]/10 transition-all duration-200 text-base"
            >
              了解更多
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 animate-bounce">
          <ChevronDown size={28} className="text-gold-500/50" />
        </div>
      </section>

      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-center gold-gradient">
            三步测算流程
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className="border border-[#c9a96e]/20 rounded-xl p-8 text-center bg-[#0a0a0a] gold-glow hover:border-[#c9a96e]/40 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto rounded-full bg-[#c9a96e]/10 flex items-center justify-center mb-5">
                  <step.icon size={26} className="text-gold-500" />
                </div>
                <h3 className="text-xl font-bold font-serif text-gold-500 mb-3">
                  {step.title}
                </h3>
                <p className="text-parchment/50 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="principles" className="py-20 px-4 bg-[#0a0a0a]/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-center gold-gradient">
            命理原理
          </h2>
          <p className="mt-4 text-center text-parchment/50 text-sm max-w-2xl mx-auto leading-relaxed">
            八字命理学认为，子嗣性别与父母八字中的阴阳五行配置密切相关。
            通过精准分析命局子女宫与流年流月的五行互动，可以推算出最利于怀男孩的时间窗口。
          </p>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((item, index) => (
              <div
                key={index}
                className="border border-[#c9a96e]/20 rounded-xl p-8 bg-[#0a0a0a] gold-glow"
              >
                <div className="w-12 h-12 rounded-lg bg-[#c9a96e]/10 flex items-center justify-center mb-5">
                  <item.icon size={24} className="text-gold-500" />
                </div>
                <h3 className="text-lg font-bold font-serif text-gold-500 mb-3">
                  {item.title}
                </h3>
                <p className="text-parchment/50 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="testimonials" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-center gold-gradient">
            用户反馈
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <div
                key={index}
                className="border border-[#c9a96e]/20 rounded-xl p-6 bg-[#0a0a0a] gold-glow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#c9a96e]/15 flex items-center justify-center">
                    <span className="text-gold-500 text-sm font-bold">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-parchment text-sm font-medium">{t.name}</p>
                    <div className="flex gap-0.5 mt-0.5">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <Star key={i} size={12} className="text-gold-500 fill-gold-500" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-parchment/50 text-sm leading-relaxed italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="py-20 px-4 bg-[#0a0a0a]/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-serif text-center gold-gradient">
            常见问题
          </h2>
          <div className="mt-12">
            <Accordion items={faqItems} />
          </div>
        </div>
      </section>

      <section id="cta" className="py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold font-serif gold-gradient leading-tight">
            准备好迎接您的儿子了吗？
          </h2>
          <p className="mt-4 text-parchment/50 text-base">
            立即开始您的专属测算，科学择时，心想事成
          </p>
          <div className="mt-8">
            <a
              href="/order"
              className="inline-block px-10 py-4 bg-gold-500 text-void font-bold rounded-lg hover:bg-gold-400 transition-all duration-200 text-lg gold-glow"
            >
              立即开始测算
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}