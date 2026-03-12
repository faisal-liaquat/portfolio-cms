'use client'
import { useEffect, useRef } from 'react'

interface Props {
  label: string
  text: string
  chips: string[]
}

export default function NowBar({ label, text, chips }: Props) {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = barRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      el.style.setProperty('--mx', `${x}%`)
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div id="now" ref={barRef}>
      <div className="now-s">
        <div className="now-ey">
          <span className="pdot"></span>
          active
        </div>
        <div className="now-sub">// {label}</div>
      </div>
      <div className="now-b">
        <div className="now-main">
          <div className="now-t">{text}</div>
        </div>
        <div className="now-cs">
          {chips.map((c, i) => (
            <span className="chip" key={i}>
              {c}
            </span>
          ))}
        </div>
        <div className="now-beam" aria-hidden="true"></div>
      </div>
    </div>
  )
}
