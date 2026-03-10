'use client'
import { useEffect } from 'react'

export default function CursorAndProgress() {
  useEffect(() => {
    const cur = document.getElementById('cur')
    const curR = document.getElementById('curR')
    const prog = document.getElementById('prog')

    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0

    const onMove = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (cur) {
        cur.style.left = mx + 'px'
        cur.style.top = my + 'px'
      }
    }

    const lerp = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (curR) {
        curR.style.left = rx + 'px'
        curR.style.top = ry + 'px'
      }
      requestAnimationFrame(lerp)
    }
    lerp()

    const onScroll = () => {
      const h = document.documentElement
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
      if (prog) prog.style.width = pct + '%'
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('scroll', onScroll)
    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  return (
    <>
      <div id="prog"></div>
      <div id="cur"></div>
      <div id="curR"></div>
    </>
  )
}
