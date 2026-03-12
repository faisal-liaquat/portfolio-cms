'use client'
import { useEffect, useRef, useState } from 'react'

interface SysLine {
  key: string
  value: string
  type?: string
}
interface StatBar {
  label: string
  value: string
  highlight?: boolean
}

interface Props {
  eyebrow: string
  firstName: string
  role: string
  bio: string
  sysBoxLines: SysLine[]
  statsBar: StatBar[]
}

const SECOND_NAME = 'Liaquat.'
const TYPING_SPEED = 80
const CURSOR_BLINK = 530

export default function Hero({ eyebrow, firstName, role, bio, sysBoxLines, statsBar }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [typed, setTyped] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [doneTyping, setDoneTyping] = useState(false)

  /* ── Typing animation ── */
  useEffect(() => {
    let i = 0
    const delay = setTimeout(() => {
      const t = setInterval(() => {
        i++
        setTyped(SECOND_NAME.slice(0, i))
        if (i >= SECOND_NAME.length) {
          clearInterval(t)
          setDoneTyping(true)
        }
      }, TYPING_SPEED)
      return () => clearInterval(t)
    }, 900)
    return () => clearTimeout(delay)
  }, [])

  /* ── Cursor blink (stops after typing done + 2s) ── */
  useEffect(() => {
    if (doneTyping) {
      const t = setTimeout(() => setShowCursor(false), 2000)
      return () => clearTimeout(t)
    }
    const t = setInterval(() => setShowCursor((p) => !p), CURSOR_BLINK)
    return () => clearInterval(t)
  }, [doneTyping])

  /* ── Live uptime counter ── */
  useEffect(() => {
    const start = Date.now()
    const t = setInterval(() => {
      const s = Math.floor((Date.now() - start) / 1000)
      const d = Math.floor(s / 86400)
      const h = Math.floor((s % 86400) / 3600)
      const m = Math.floor((s % 3600) / 60)
    })
    return () => clearInterval(t)
  }, [])

  /* ── Canvas particle field ── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let W = 0,
      H = 0

    interface Particle {
      x: number
      y: number
      vx: number
      vy: number
      r: number
      alpha: number
      pulse: number
      speed: number
    }

    const particles: Particle[] = []
    const N = 55

    const resize = () => {
      W = canvas.width = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    const init = () => {
      particles.length = 0
      for (let i = 0; i < N; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.6 + 0.4,
          alpha: Math.random() * 0.35 + 0.08,
          pulse: Math.random() * Math.PI * 2,
          speed: Math.random() * 0.018 + 0.008,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      const t = performance.now() / 1000

      /* connection lines */
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(45,53,97,${(1 - dist / 120) * 0.07})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      /* dots */
      for (const p of particles) {
        p.pulse += p.speed
        const a = p.alpha * (0.7 + 0.3 * Math.sin(p.pulse + t))
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
        if (p.y < -10) p.y = H + 10
        if (p.y > H + 10) p.y = -10
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(45,53,97,${a})`
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    init()
    draw()
    window.addEventListener('resize', () => {
      resize()
      init()
    })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', () => {
        resize()
        init()
      })
    }
  }, [])

  const sysLines =
    sysBoxLines.length > 0
      ? sysBoxLines
      : [
          { key: 'role', value: 'full-stack developer', type: '' },
          { key: 'stack', value: 'React.js · Node.js · PostgreSQL', type: '' },
          { key: 'location', value: 'Pakistan', type: '' },
          { key: 'status', value: 'available for work', type: 'ok' },
        ]

  const stats =
    statsBar.length > 0
      ? statsBar
      : [
          { label: 'projects', value: '4+' },
          { label: 'education', value: 'BSc' },
          { label: 'stack', value: 'Full' },
          { label: 'location', value: 'PK' },
          { label: 'status', value: 'Open', highlight: true },
        ]

  return (
    <section id="hero">
      <canvas ref={canvasRef} id="hero-canvas" />

      {/* Floating gradient orbs */}
      <div className="h-orb h-orb1" aria-hidden="true" />
      <div className="h-orb h-orb2" aria-hidden="true" />
      <div className="h-orb h-orb3" aria-hidden="true" />

      <div className="h-wm">Engineer.</div>

      <div className="h-body">
        <div className="h-left">
          <div className="h-kicker">
            <span className="acc">// </span>
            {eyebrow || 'full-stack · web scraping · ML'}
          </div>
          <h1 className="h-name">
            <span className="n1">{firstName || 'Faisal'}</span>
            <span className="n2">
              {typed}
              {showCursor && <span className="h-cursor">|</span>}
            </span>
          </h1>
        </div>

        <div className="h-right">
          <p className="h-role">{role || 'Building things that feel as good as they function.'}</p>
          <p
            className="h-bio"
            dangerouslySetInnerHTML={{ __html: bio || 'Full-stack developer with a CS degree.' }}
          />

          <div className="h-sys">
            {sysLines.map((line, i) => (
              <div className="sl" key={i} style={{ animationDelay: `${i * 0.12 + 0.6}s` }}>
                <span className="sk">{line.key.padEnd(7, '\u00a0')}</span>
                <span
                  className={`sv${line.type === 'ok' ? ' ok' : line.type === 'act' ? ' act' : ''}`}
                >
                  {line.type === 'ok' ? `● ${line.value}` : line.value}
                </span>
              </div>
            ))}
          </div>

          <div className="h-rule" />
          <div className="h-cta">
            <a href="#projects" className="btn-p">
              <span>View My Work</span>
            </a>
            <a href="#contact" className="btn-g">
              get in touch →
            </a>
          </div>
        </div>
      </div>

      <div className="h-bar">
        {stats.map((s, i) => (
          <div className="hb" key={i}>
            <div className="hb-k">{s.label}</div>
            <div className={`hb-v${s.highlight ? ' ind' : ''}`}>{s.value}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
