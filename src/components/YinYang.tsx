'use client'

export default function YinYang() {
  return (
    <div className="absolute yin-yang" style={{ opacity: 0.15, width: 200, height: 200 }}>
      <svg viewBox="0 0 200 200" width="200" height="200">
        <circle cx="100" cy="100" r="100" fill="#c9a96e" />
        <path
          d="M100 0 A50 50 0 0 0 100 100 A100 100 0 0 1 100 200 A100 100 0 0 1 100 0 Z"
          fill="#0a0a0a"
        />
        <circle cx="100" cy="40" r="14" fill="#c9a96e" />
        <circle cx="100" cy="160" r="14" fill="#0a0a0a" />
      </svg>
    </div>
  )
}