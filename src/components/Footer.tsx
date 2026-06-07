import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#c9a96e]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-2xl font-bold gold-gradient font-serif">
              必生儿子
            </span>
            <p className="mt-3 text-parchment/50 text-sm leading-relaxed">
              基于千年命理学智慧，科学择时助您圆梦
            </p>
          </div>

          <div>
            <h3 className="text-gold-500 font-medium text-sm mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-parchment/50 hover:text-gold-500 transition-colors text-sm">
                  首页
                </Link>
              </li>
              <li>
                <Link href="#cta" className="text-parchment/50 hover:text-gold-500 transition-colors text-sm">
                  立即测算
                </Link>
              </li>
              <li>
                <Link href="#faq" className="text-parchment/50 hover:text-gold-500 transition-colors text-sm">
                  命理知识
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-gold-500 font-medium text-sm mb-4">联系方式</h3>
            <ul className="space-y-2">
              <li className="text-parchment/50 text-sm">
                邮箱: yuzhouyixue@gmail.com
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[#c9a96e]/10">
          <p className="text-center text-parchment/30 text-xs">
            &copy; {new Date().getFullYear()} 必生儿子. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}