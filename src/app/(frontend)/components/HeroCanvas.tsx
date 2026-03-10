'use client'
import { useEffect, useRef } from 'react'

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const words = [
      'React',
      'Node.js',
      'TypeScript',
      'Python',
      'PostgreSQL',
      'Next.js',
      'Docker',
      'Git',
      'API',
      'SQL',
      'CSS',
      'HTML',
      'Express',
      'Payload',
      'Tailwind',
      'Vercel',
      'CI/CD',
      'Auth',
      'REST',
      'GraphQL',
    ]
    const particles: {
      x: number
      y: number
      word: string
      opacity: number
      size: number
      speed: number
    }[] = []
    for (let i = 0; i < 35; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        word: words[Math.floor(Math.random() * words.length)],
        opacity: Math.random() * 0.07 + 0.02,
        size: Math.random() * 3 + 9,
        speed: Math.random() * 0.15 + 0.05,
      })
    }

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.font = `300 ${particles[0].size}px 'IBM Plex Mono'`
      for (const p of particles) {
        ctx.globalAlpha = p.opacity
        ctx.fillStyle =
          getComputedStyle(document.documentElement).getPropertyValue('--ind') || '#2d3561'
        ctx.font = `300 ${p.size}px 'IBM Plex Mono'`
        ctx.fillText(p.word, p.x, p.y)
        p.y -= p.speed
        if (p.y < -20) {
          p.y = canvas.height + 20
          p.x = Math.random() * canvas.width
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      id="hero-canvas"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}
