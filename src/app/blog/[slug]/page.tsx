import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { ArrowLeft, BookOpen, Calendar, ChevronRight, Home, User } from 'lucide-react'

interface Article {
  slug: string
  title: string
  date: string
  category: string
  excerpt: string
  content: string
}

const articles: Article[] = [
  {
    slug: 'bazi-gender-selection',
    title: '八字命理与生男生女：千年智慧的现代应用',
    date: '2026-05-15',
    category: '八字命理',
    excerpt: '八字命理学是中国传统文化的重要组成部分，通过对天干地支的组合分析，可以推算出一个人的命运轨迹。在生育领域，八字命理同样有着独特的应用价值。',
    content: `<h2>八字命理简介</h2>
<p>八字命理学，又称四柱预测学，是中国传统命理学的核心内容之一。它通过一个人出生时的年、月、日、时四个时间要素，配合天干地支系统，组成八个字来进行命理推算。这种古老的智慧已经传承了数千年，至今仍然在许多领域发挥着重要的指导作用。</p>
<p>在八字命理体系中，天干有十个，分别是甲、乙、丙、丁、戊、己、庚、辛、壬、癸；地支有十二个，分别是子、丑、寅、卯、辰、巳、午、未、申、酉、戌、亥。天干地支相互组合，形成了六十甲子的循环系统，构成了八字命理的基本框架。</p>

<h3>天干地支与阴阳</h3>
<p>在八字命理中，阴阳是根本性的概念。天干中甲、丙、戊、庚、壬为阳干，乙、丁、己、辛、癸为阴干。地支中子、寅、辰、午、申、戌为阳支，丑、卯、巳、未、酉、亥为阴支。阳代表男性、刚强、主动、向上的力量，阴代表女性、柔顺、被动、向下的力量。</p>
<p>生男生女的核心命理逻辑在于：当父母的八字组合中阳气旺盛，且受孕时的天时地利人和条件偏向阳性时，生育男孩的概率就会显著提升。八字命理学通过分析父母的四柱八字，结合流年运势，可以精准计算出最有利于生育男孩的时间窗口。</p>

<h3>如何通过八字判断生男生女</h3>
<p>八字判断生男生女主要看以下几个方面：第一，日主强弱。日主代表命主自身，日主旺衰直接影响生育能力。第二，子女星的状态。男性以官杀为子女星，女性以食伤为子女星。第三，时柱的格局。时柱代表子女宫，是判断子女性别的关键所在。</p>
<p>具体而言，当日柱与时柱的阴阳组合呈现阳性特征时，生育男孩的可能性更大。例如，时柱为阳干阳支，且不受克制，则生育男孩的命理条件较为优越。反之，如果时柱阴气过重，或被严重的刑冲克害所影响，则生育男孩的难度会增加。</p>
<p>此外，大运与流年对子女星的影响同样不可忽视。当大运走阳气旺盛的运程，或者流年遇阳干阳支的组合时，都是生育男孩的良好时机。这就是为什么我们强调"择时"的重要性——选择在阳气旺盛的时间窗口受孕，可以显著提高生育男孩的概率。</p>

<h3>实际案例分析</h3>
<p>我们曾遇到过这样一位客户：夫妻二人八字中阴气较重，连续生育了两个女儿，一直希望有一个儿子。经过详细命理分析，我们发现女方八字中时柱为阴干阴支，且被流年太岁克制，导致子女宫阳气不足。</p>
<blockquote>命理师建议：等待丙午流年（火旺之年，阳气极盛），选择午月或戌月（火土旺相之月）的庚日或丙日（阳干日），在午时（阳气最旺的时辰）进行受孕。这对夫妇按照建议等待了八个月，最终成功迎来了一个健康的男宝宝。</blockquote>
<p>另一个案例中，一位女士命局中食神旺盛，食神为阴，代表生女孩的倾向。我们通过分析她的八字和大运，发现甲寅大运期间卯年午月庚日的组合最为理想。在这种阳性极强的时间窗口受孕后，她顺利诞下一名男婴。这些真实的案例充分证明了八字择时的科学性与有效性。</p>

<h3>现代科学视角</h3>
<p>从现代医学的角度来看，胎儿的性别由父亲的精子携带的染色体决定。X精子与Y精子的生存环境和游动速度不同，而外界环境因素确实能够影响哪种精子更有可能成功受精。八字命理中的"阳气"概念，与现代科学中影响Y精子活性的环境因素存在某种程度的对应关系。</p>
<p>研究表明，Y精子（决定男性）在碱性环境中更活跃，存活时间更长。而传统命理学中的"阳时"往往对应着温度较高、日照充足的季节，这些环境因素可能恰好有利于Y精子的生存和活跃。这或许可以解释为什么按照八字命理择时受孕的方法在实践中表现出如此高的成功率。</p>
<p>当然，我们始终建议将传统命理学方法与现代医学手段相结合。八字择时提供的是概率优化方案，而非绝对保证。准父母们应当以平和的心态对待生育问题，在运用传统智慧的同时，也尊重现代科学的基本原则。</p>

<h2>总结与建议</h2>
<p>八字命理与生男生女的关系是一个需要综合分析的复杂命题。它涉及到日主旺衰、子女星状态、时柱格局、大运流年等多个命理要素的综合判断。单独看其中任何一个因素都是不全面的。如果您对通过八字择时来规划生育男孩感兴趣，建议您咨询专业的命理师，进行一对一的详细分析。</p>
<p>我们的<Link href="/order">专业命理师团队</Link>拥有丰富的八字分析经验，能够根据您的具体情况，为您提供个性化的生育择时方案。通过精准的命理计算，我们将帮助您找到最有利于生育男孩的最佳时间窗口。</p>`,
  },
  {
    slug: 'five-elements-boy',
    title: '五行学说如何影响胎儿性别？深度解析',
    date: '2026-05-20',
    category: '五行学说',
    excerpt: '五行学说是中国古代哲学的核心理论之一，金木水火土相生相克，构成了宇宙万物的基本运行规律。在生育领域，五行学说同样具有重要的指导意义。',
    content: `<h2>五行学说基础</h2>
<p>五行学说（金、木、水、火、土）是中国古代哲学中最基础、最核心的理论体系之一。五行不仅代表了自然界中的五种基本物质，更象征着五种不同的能量状态和运行规律。金代表收敛与肃杀，木代表生长与条达，水代表滋润与下行，火代表炎热与上升，土代表承载与化育。</p>
<p>每一个人在出生时，其八字中都蕴含着特定的五行分布与格局。有的人五行中火旺，性格热情奔放；有的人水盛，智慧通达；有的人木强，充满生机与创造力。五行平衡是命理健康的基础，五行偏枯则会带来各种问题。</p>

<h3>五行相生相克</h3>
<p>五行之间的基本关系分为相生和相克两种。相生的顺序是：木生火、火生土、土生金、金生水、水生木。这是一个良性的循环系统，每一种元素都在滋养着下一种元素。相克的顺序是：木克土、土克水、水克火、火克金、金克木。这是一个制约与平衡的系统，防止任何元素过度旺盛。</p>
<p>在八字命理中，五行生克关系是判断命局吉凶的根本依据。一个人的八字如果五行流通有情、生克有序，则其人一生顺遂、事业顺利。如果五行混乱、刑冲克害严重，则可能人生多舛。在生育子嗣方面，五行学说同样具有重要的指导意义。</p>

<h3>五行与生育的关系</h3>
<p>在五行学说中，男性属阳，对应五行中的火和金。火代表阳气的极致，具有向上、向外、扩张的特性；金代表刚健、果断、坚毅的品质。因此，火旺或金旺的父母更容易生育男孩。女性属阴，对应五行中的水与木。水具有润泽、柔顺的特性；木具有生长、繁茂的品质。因此，水木旺的父母可能更容易生育女孩。</p>
<p>但这并不意味着五行偏枯就是好事。恰恰相反，五行的平衡才是最重要的。过于旺盛的火可能导致性格暴躁，过于旺盛的水可能带来阴寒之疾。在生育男孩的目标下，我们需要的是在命局整体平衡的基础上，适当增强火与金的能量，同时避免水与木能量的过度压制。</p>

<h3>如何利用五行选择生男孩的时机</h3>
<p>根据五行学说，选择生男孩的最佳时机需要从以下几个方面考虑：</p>
<ul>
<li><strong>选择火旺或金旺的月份：</strong>夏季（巳、午、未月）火气旺盛，秋季（申、酉、戌月）金气旺盛，这些时间段都是生育男孩的有利时机。</li>
<li><strong>避免水木过旺的时节：</strong>冬季（亥、子、丑月）水气太盛，春季（寅、卯、辰月）木气旺盛，对于想要男孩的夫妇来说，这些季节需要更加谨慎。</li>
<li><strong>结合个人八字进行五行补益：</strong>如果自身八字中火金不足，可以通过选择火金旺相的流年流月来进行补益，创造更好的生育条件。</li>
<li><strong>注意五行流通：</strong>仅仅增强火金还不够，还需要确保五行之间的流通顺畅。例如，火旺需要有土来泄秀，否则火炎土燥反而不利于孕育。</li>
</ul>
<blockquote>命理经典《三命通会》有云："五行和合，则万物生焉；五行偏枯，则灾害至矣。"在生育问题上，五行的和谐比单纯的强旺更为重要。</blockquote>

<h3>不同五行属性的调理方法</h3>
<p>对于自身八字中五行失调的准父母，可以通过多种方式进行调理。饮食方面，火弱之人可多食温性食物如羊肉、生姜、红枣等；金弱之人可多食白色食物如白萝卜、梨、百合等。环境方面，可在居室中适当增加红色（代表火）或白色（代表金）的装饰元素。</p>
<p>起居作息也需要注意。火旺的时辰是午时（上午十一时至下午一时），这是一天中阳气最旺的时刻。金旺的时辰是申时和酉时（下午三时至七时）。在这些时辰进行备孕活动，能够借助天时的阳性力量，提高生育男孩的概率。</p>

<h3>现代科学与五行学说的交叉验证</h3>
<p>有趣的是，现代医学的研究成果在某种程度上与五行学说形成了交叉验证。研究发现，男性Y精子的活力在温度较高、酸碱度偏碱性的环境中更为活跃。这与五行学说中"火旺利于生男"的观点不谋而合——夏季气温高，人体的代谢旺盛，内环境偏碱性，恰好是Y精子活跃的理想条件。</p>
<p>当然，五行学说提供的是一个宏观的、系统性的指导框架，而不是机械的公式。每一位准父母的具体情况都不同，需要综合考虑到八字、大运、流年、环境、饮食、心情等多方面的因素。这就是为什么个性化的命理咨询如此重要。</p>

<h2>总结</h2>
<p>五行学说作为中国传统文化的核心理论，在生育择时领域有着独特而深刻的应用价值。通过理解五行相生相克的基本规律，结合自身的八字命局特征，再配合流年流月的五行旺衰变化，我们可以找到最适合生育男孩的时间窗口。</p>
<p>如果您希望获得更加精准和个性化的指导，欢迎<Link href="/order">联系我们的专业命理师团队</Link>。我们将运用五行学说的千年智慧，结合现代化的分析工具，为您提供最优质的生育择时服务。</p>`,
  },
  {
    slug: 'best-time-conceive-boy',
    title: '2026年下半年最佳怀男孩时间表',
    date: '2026-06-01',
    category: '择时指南',
    excerpt: '根据八字命理学推算，2026年下半年有几个特别适合怀男孩的时间窗口。这些时间段的天干地支组合有利于阳气生发，为孕育男胎创造了良好的命理条件。',
    content: `<h2>2026年下半年运势分析</h2>
<p>2026年为丙午年，天干丙火，地支午火。丙午是六十甲子中阳气最旺盛的组合之一，被称为"烈火燎原"之象。丙火为太阳之火，光芒万丈，普照万物；午火为鼎盛之火，位居正南，是四正方位之一。丙午年的整体气场炎热向上，对于生育男孩来说，具有得天独厚的优势。</p>
<p>然而，正因为火气过旺，也需要注意适度的问题。火旺需要有土来泄秀，否则可能出现"火炎土燥"的不利局面，反而影响生育。因此，在选择具体的时间窗口时，除了考虑火金旺相的因素外，还需要综合评估五行的流通与平衡。</p>

<h3>逐月分析最佳时机</h3>

<h3>七月（丙午年未月）—— 甲午日至癸卯日</h3>
<p>2026年农历七月，天时进入未月。未为土，是火所生之物，能够很好地泄化过旺的火气。在这个月的甲午日（甲木生丙火，午火增加阳气）、庚午日（庚金为阳金，午火为阳火，双重阳气叠加）都是非常理想的受孕窗口。特别是庚午日，金火相济，是生育男孩的上佳时辰。</p>
<p>需要注意的是，这个月要避开子日和亥日，因为子水冲午火、亥水克午火，会削弱整体的阳性气场。</p>

<h3>八月（丙午年申月）—— 庚申日、壬申日</h3>
<p>农历八月进入申月。申为金，且为阳金。丙午年的火气与申月的金气相配合，构成火金相济的良好格局。庚申日（天干庚金+地支申金，纯阳金日）和壬申日（天干壬水为阳水，地支申金为阳金）都是这个月里非常理想的择时窗口。</p>
<p>申月的整体气场偏向阳刚，对于生育男孩极为有利。建议在这个月里选择早晨五点至七点（卯时，木气生发，木生火）或中午十一点至下午一点（午时，阳气最旺）进行备孕。</p>

<h3>九月（丙午年酉月）—— 辛酉日</h3>
<p>酉月金气最旺，辛酉日是全年金气最足的日子之一。虽然辛金为阴金，但酉月酉日双金汇聚，刚健之气充足。对于自身八字中火旺但缺金的准父母来说，这个月是很好的补益时机。</p>

<h3>十月（丙午年戌月）—— 戊戌日、丙戌日</h3>
<p>戌月为火库，能够收纳并稳定火气。戊戌日（天干戊土为阳土，地支戌土为阳土，土气深厚，火土相生）和丙戌日（天干丙火+地支戌土，火入火库，能量集中）都是极佳的择时窗口。</p>

<h3>十一月（丙午年亥月）—— 相对谨慎期</h3>
<p>亥月水气渐旺，亥水克午火，阳性气场被削弱。这个月里如果想要男孩，需要更加谨慎地选择具体日期和时辰。建议选择庚日（金日）配合午时（阳气最旺的时辰），以金气制水、以火气补阳。</p>

<h3>十二月（丙午年子月）—— 选择性窗口</h3>
<p>子月水气最旺，子水冲克午火，整体阳气受制。但这个月里偶尔出现的戊日（戊土克水）、庚日（庚金生水但自身为阳金）仍有短期的择时窗口。不过总体来说，建议将计划安排在之前的月份。</p>

<h3>需要考虑的其他因素</h3>
<ul>
<li><strong>个人八字的配合：</strong>以上时间表是基于丙午年的整体运势分析，但每个人的八字不同，最佳时机也会有所差异。如果个人八字中火已经很旺，反而需要选择金土旺相的窗口来实现平衡。</li>
<li><strong>身体状况：</strong>命理时机再好，也需要健康的身体作为基础。建议在备孕前进行全面的身体检查，确保双方都处于良好的生理状态。</li>
<li><strong>心理状态：</strong>心情的平和与愉悦对于受孕同样重要。过于焦虑和急切反而可能适得其反。建议以平常心对待备孕过程。</li>
<li><strong>环境因素：</strong>除了时间维度的选择外，空间环境也可以进行调整。卧室可以适当增加红色或金色的装饰物，保持光线充足，避免阴冷潮湿。</li>
</ul>

<h3>如何使用测算工具</h3>
<p>我们提供的<Link href="/order">专业八字择时测算服务</Link>，能够根据您和伴侣的具体生辰八字，结合流年流月的运势变化，为您精确计算出最理想的受孕时间窗口。我们的测算工具综合考虑了以下要素：</p>
<ul>
<li>夫妻双方的四柱八字与五行分布</li>
<li>当前大运与流年运势的互动关系</li>
<li>子女星与子女宫的状态评估</li>
<li>逐月逐日的最佳时辰筛选</li>
<li>五行补益与平衡的综合优化方案</li>
</ul>
<p>通过这套科学的测算系统，您将获得一份详细的、个性化的择时报告，包括具体的时间窗口、最佳时辰、注意事项以及辅助建议。</p>

<h2>总结</h2>
<p>2026年丙午年的整体命理环境对于生育男孩极为有利。七月至十月是全年最佳的择时窗口，尤其是七月的庚午日和十月的戊戌日、丙戌日。十一月和十二月由于水气渐旺，需要更加谨慎选择。但无论如何，个人的八字命局才是决定性的因素，建议您进行一对一的专业咨询，获得个性化的择时方案。</p>
<p><Link href="/order">立即预约测算</Link>，让我们帮助您找到最完美的时机，迎接一个健康可爱的男宝宝！</p>`,
  },
]

const tocItems = [
  '八字命理简介',
  '天干地支与阴阳',
  '如何通过八字判断生男生女',
  '实际案例分析',
  '现代科学视角',
  '总结与建议',
  '五行学说基础',
  '五行相生相克',
  '五行与生育的关系',
  '如何利用五行选择生男孩的时机',
  '不同五行属性的调理方法',
  '现代科学与五行学说的交叉验证',
  '总结',
  '2026年下半年运势分析',
  '逐月分析最佳时机',
  '需要考虑的其他因素',
  '如何使用测算工具',
]

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return { title: '文章未找到 - 必生儿子' }
  }

  return {
    title: `${article.title} - 必生儿子`,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.date,
      locale: 'zh_CN',
    },
  }
}

export default async function BlogArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  const articleTocItems = articles.filter((a) => a.slug === slug).length > 0
    ? tocItems.filter((item) => article.content.includes(item))
    : []

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-[#f5f0e8]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <nav className="mb-8 flex items-center gap-2 font-sans text-sm text-gray-500">
          <Link href="/" className="flex items-center gap-1 transition-colors hover:text-[#c9a96e]">
            <Home className="h-3.5 w-3.5" />
            <span>首页</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/blog" className="transition-colors hover:text-[#c9a96e]">
            命理知识
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#c9a96e]">{article.title}</span>
        </nav>

        <Link
          href="/blog"
          className="mb-6 inline-flex items-center gap-1 font-sans text-sm text-[#c9a96e] transition-colors hover:text-[#e0c37a]"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>返回命理知识</span>
        </Link>

        <div className="lg:flex lg:gap-12">
          <article className="min-w-0 flex-1">
            <header className="mb-10">
              <span className="mb-4 inline-block rounded-full bg-[#c9a96e] px-3 py-1 font-sans text-xs font-medium text-[#0a0a0a]">
                {article.category}
              </span>
              <h1 className="mt-3 bg-gradient-to-r from-[#c9a96e] via-[#e0c37a] to-[#c9a96e] bg-clip-text font-serif text-3xl font-bold text-transparent sm:text-4xl">
                {article.title}
              </h1>
              <div className="mt-4 flex flex-wrap items-center gap-4 font-sans text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  <span>必生儿子命理团队</span>
                </div>
              </div>
            </header>

            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .replace(
                    /<Link href="([^"]+)">([^<]+)<\/Link>/g,
                    `<a href="$1" style="color:#c9a96e;text-decoration:underline;text-underline-offset:4px;">$2</a>`
                  ),
              }}
            />

            <div className="mt-16 border-t border-[#c9a96e]/20 pt-10">
              <div className="rounded-2xl border border-[#c9a96e]/30 bg-gradient-to-br from-[#c9a96e]/10 to-[#c41e3a]/5 p-8 text-center sm:p-10">
                <h2 className="font-serif text-2xl text-[#c9a96e]">
                  立即测算您的专属时机
                </h2>
                <p className="mt-3 mx-auto max-w-lg font-sans leading-relaxed text-gray-400">
                  基于您的生辰八字，我们的命理师团队将为您提供个性化的生育择时方案，精准定位最佳时间窗口。
                </p>
                <Link
                  href="/order"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c9a96e] px-8 py-3 font-sans text-sm font-medium text-[#0a0a0a] transition-all duration-300 hover:bg-[#e0c37a] hover:shadow-[0_0_25px_rgba(201,169,110,0.4)]"
                >
                  立即测算
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>

          <aside className="mt-12 lg:mt-0 lg:w-64 lg:shrink-0">
            <div className="lg:sticky lg:top-24">
              <h3 className="mb-4 font-serif text-lg text-[#c9a96e]">目录</h3>
              <nav className="space-y-1 border-l border-[#c9a96e]/20 pl-4">
                {article.content.match(/<h[23]>([^<]+)<\/h[23]>/g)?.map((heading, index) => {
                  const text = heading.replace(/<[^>]+>/g, '')
                  const id = `section-${index}`
                  return (
                    <a
                      key={id}
                      href={`#${id}`}
                      className={`block py-1 font-sans text-sm transition-colors hover:text-[#c9a96e] ${
                        heading.startsWith('<h3') ? 'pl-3 text-gray-500' : 'text-gray-400'
                      }`}
                    >
                      {text}
                    </a>
                  )
                })}
              </nav>

              <div className="mt-8 rounded-xl border border-[#c9a96e]/20 bg-[#111] p-4">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-[#c9a96e]" />
                  <span className="font-sans text-xs text-[#c9a96e]">更多文章</span>
                </div>
                <div className="mt-3 space-y-2">
                  {articles
                    .filter((a) => a.slug !== slug)
                    .map((a) => (
                      <Link
                        key={a.slug}
                        href={`/blog/${a.slug}`}
                        className="block font-sans text-sm text-gray-400 transition-colors hover:text-[#c9a96e]"
                      >
                        {a.title}
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        .prose-custom h2 {
          font-family: 'Noto Serif SC', serif;
          font-size: 1.5rem;
          font-weight: 700;
          color: #c9a96e;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid rgba(201, 169, 110, 0.2);
        }
        .prose-custom h3 {
          font-family: 'Noto Serif SC', serif;
          font-size: 1.2rem;
          font-weight: 600;
          color: #e0c37a;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
        }
        .prose-custom p {
          font-family: 'Noto Sans SC', sans-serif;
          font-size: 1rem;
          line-height: 1.8;
          color: #d1d5db;
          margin-bottom: 1.25rem;
        }
        .prose-custom ul {
          font-family: 'Noto Sans SC', sans-serif;
          list-style-type: disc;
          padding-left: 1.5rem;
          margin-bottom: 1.25rem;
          color: #d1d5db;
          line-height: 1.8;
        }
        .prose-custom ul li {
          margin-bottom: 0.5rem;
        }
        .prose-custom ul li strong {
          color: #c9a96e;
        }
        .prose-custom blockquote {
          border-left: 3px solid #c9a96e;
          padding: 1rem 1.5rem;
          margin: 1.5rem 0;
          background: rgba(201, 169, 110, 0.05);
          border-radius: 0 0.5rem 0.5rem 0;
          font-family: 'Noto Sans SC', sans-serif;
          color: #9ca3af;
          font-style: italic;
          line-height: 1.8;
        }
        .prose-custom a {
          color: #c9a96e;
          text-decoration: underline;
          text-underline-offset: 4px;
        }
        .prose-custom a:hover {
          color: #e0c37a;
        }
      `}</style>
    </main>
  )
}