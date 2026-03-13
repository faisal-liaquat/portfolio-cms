'use client'
import { useEffect, useState } from 'react'

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
