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
          {dark ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="5" />
              <line
                x1="12"
                y1="1"
                x2="12"
                y2="3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="21"
                x2="12"
                y2="23"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="4.22"
                y1="4.22"
                x2="5.64"
                y2="5.64"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="18.36"
                y1="18.36"
                x2="19.78"
                y2="19.78"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="1"
                y1="12"
                x2="3"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="21"
                y1="12"
                x2="23"
                y2="12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="4.22"
                y1="19.78"
                x2="5.64"
                y2="18.36"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="18.36"
                y1="5.64"
                x2="19.78"
                y2="4.22"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
    </nav>
  )
}
