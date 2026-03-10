'use client'
import { useEffect, useState } from 'react'

interface NavProps {
  name: string
  navVersion: string
  status: string
  lastCommit: string
}

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
      <a className="nb" href="#">
        <span className="nb-name">{name}</span>
        <span className="nb-ver">{navVersion}</span>
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
