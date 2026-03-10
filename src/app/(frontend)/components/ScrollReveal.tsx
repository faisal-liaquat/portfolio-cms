'use client'
import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
          }
        }
      },
      { threshold: 0.12 },
    )
    document.querySelectorAll('.rev').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return null
}
