'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuthStore } from '@/store/authStore'
import { usePathname } from 'next/navigation'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { isAuthenticated, user, logout, loadFromStorage, fetchMe } = useAuthStore()
  const pathname = usePathname()

  useEffect(() => {
    loadFromStorage()
    const token = localStorage.getItem('token')
    if (token) {
      fetchMe()
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { href: '/', label: '首页' },
    { href: '/resources', label: '全球资源' },
    { href: '/demands', label: '全球需求' },
    { href: '/ai-recommendations', label: 'AI推荐' },
    { href: '/subscription', label: '订阅服务' },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/60 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              className="transition-transform duration-300 group-hover:scale-110"
            >
              <rect width="32" height="32" rx="8" fill="url(#chain-gradient)" />
              <path
                d="M10 12h4l2 4-2 4h-4l-2-4 2-4z"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M18 12h4l2 4-2 4h-4l-2-4 2-4z"
                stroke="white"
                strokeWidth="1.5"
                fill="none"
              />
              <circle cx="14" cy="16" r="1.5" fill="white" />
              <circle cx="22" cy="16" r="1.5" fill="white" />
              <defs>
                <linearGradient id="chain-gradient" x1="0" y1="0" x2="32" y2="32">
                  <stop stopColor="#0ea5e9" />
                  <stop offset="1" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
            </svg>
            <span className="text-xl font-bold gradient-text">SynoChain AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  pathname === link.href
                    ? 'text-cyan-400'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  后台
                </Link>
                <span className="text-sm text-gray-500">{user?.email}</span>
                <button
                  onClick={logout}
                  className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                >
                  退出
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm text-gray-300 hover:text-white transition-colors"
                >
                  登录
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 transition-all shadow-lg shadow-cyan-500/25"
                >
                  注册
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-white transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M6 6l12 12M6 18L18 6" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-4 border-t border-white/5 animate-fade-in">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`text-sm py-2 transition-colors ${
                    pathname === link.href ? 'text-cyan-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="border-t border-white/5 pt-3 mt-1">
                {isAuthenticated ? (
                  <div className="flex flex-col gap-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="text-sm text-gray-300 hover:text-white"
                    >
                      后台
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false) }}
                      className="text-sm text-left text-red-400 hover:text-red-300"
                    >
                      退出
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="text-sm text-gray-300 hover:text-white"
                    >
                      登录
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    >
                      注册
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}