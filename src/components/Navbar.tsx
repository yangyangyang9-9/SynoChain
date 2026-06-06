'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Link from 'next/link'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-[#c9a96e]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex-shrink-0">
            <span className="text-2xl font-bold gold-gradient font-serif whitespace-nowrap">
              必生儿子
            </span>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-parchment/80 hover:text-gold-500 transition-colors duration-200 text-sm font-medium"
            >
              首页
            </Link>
            <Link
              href="#cta"
              className="text-parchment/80 hover:text-gold-500 transition-colors duration-200 text-sm font-medium"
            >
              立即测算
            </Link>
            <Link
              href="#faq"
              className="text-parchment/80 hover:text-gold-500 transition-colors duration-200 text-sm font-medium"
            >
              命理知识
            </Link>
            <Link
              href="#cta"
              className="px-5 py-2 text-sm font-medium text-gold-500 border border-[#c9a96e]/50 rounded hover:bg-[#c9a96e]/10 transition-all duration-200"
            >
              立即测算
            </Link>
          </div>

          <button
            className="md:hidden text-parchment/80 hover:text-gold-500 transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-[#0a0a0a]/95 backdrop-blur-lg border-b border-[#c9a96e]/20">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/"
              className="block text-parchment/80 hover:text-gold-500 transition-colors duration-200 text-sm font-medium py-2"
              onClick={() => setOpen(false)}
            >
              首页
            </Link>
            <Link
              href="#cta"
              className="block text-parchment/80 hover:text-gold-500 transition-colors duration-200 text-sm font-medium py-2"
              onClick={() => setOpen(false)}
            >
              立即测算
            </Link>
            <Link
              href="#faq"
              className="block text-parchment/80 hover:text-gold-500 transition-colors duration-200 text-sm font-medium py-2"
              onClick={() => setOpen(false)}
            >
              命理知识
            </Link>
            <Link
              href="#cta"
              className="block w-full text-center px-5 py-2 text-sm font-medium text-gold-500 border border-[#c9a96e]/50 rounded hover:bg-[#c9a96e]/10 transition-all duration-200"
              onClick={() => setOpen(false)}
            >
              立即测算
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}