'use client'

import { useEffect, useRef } from 'react'

interface ParticleData {
  id: number
  left: number
  delay: number
  duration: number
  size: number
}

export default function Particles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const particles = useRef<ParticleData[]>([])

  if (particles.current.length === 0) {
    for (let i = 0; i < 20; i++) {
      particles.current.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 6,
        duration: 4 + Math.random() * 6,
        size: 1 + Math.random() * 3,
      })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      particles.current = []
      for (let i = 0; i < 20; i++) {
        particles.current.push({
          id: Date.now() + i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 4 + Math.random() * 6,
          size: 1 + Math.random() * 3,
        })
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.current.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: `${p.left}%`,
            bottom: '0px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  )
}