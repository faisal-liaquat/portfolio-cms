'use client'
import { useEffect, useState } from 'react'

interface NavProps {
  name: string
  navVersion: string
  status: string
  lastCommit: string
}

const FLLogo = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 220 160"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Faisal Liaquat"
  >
    {/* F */}
    <rect x="10" y="10" width="22" height="140" />
    <rect x="10" y="10" width="80" height="22" />
    <rect x="10" y="68" width="60" height="20" />
    {/* Diagonal slash */}
    <polygon points="85,150 108,10 130,10 107,150" />
    {/* L with mountain peak */}
    <rect x="125" y="10" width="22" height="140" />
    <rect x="125" y="128" width="85" height="22" />
    {/* Mountain peaks */}
    <polygon points="158,128 178,55 198,128" />
    <polygon points="188,128 203,80 213,65 210,128" opacity="0.6" />
  </svg>
)

export default function Nav({ name, navVersion, status, lastCommit }: NavProps) {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('dm')
    if (saved === '1') {
      document.body.classList.add('dark')
      setDark(true)
    }
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    document.body.classList.toggle('dark', next)
    localStorage.setItem('dm', next ? '1' : '0')
  }

  return (
    <nav>
      <a className="nb" href="#" aria-label={`${name} — home`}>
        <span className="nb-logo-wrap" title={`${name} ${navVersion}`}>
          <FLLogo className="nb-logo" />
        </span>
      </a>
      <div className="nl">
        <a href="#projects">Work</a>
        <a href="#skills">Stack</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
      </div>
      <div className="nr">
        <span className="nr-hash">
          last commit <b id="hash">{lastCommit}</b>
        </span>
        <div className="nr-avail">
          <div className="adot"></div>
          {status}
        </div>
        <button id="dm-toggle" title="Toggle dark mode" onClick={toggleDark}>
          {dark ? '☾' : '☀'}
        </button>
      </div>
    </nav>
  )
}
