'use client'
import { useEffect, useState, useRef } from 'react'

interface Slide {
  label: string
  color: string
  bg: string
  icon: string
}
interface ArchBox {
  tech: string
}
interface ArchRow {
  label: string
  boxes: ArchBox[]
}
interface TagItem {
  tag: string
}

interface Project {
  id: number
  num: string
  type: string
  year: string
  title: string
  titleEm: string
  sub: string
  desc: string
  tags: TagItem[]
  visLabel: string
  vcText: string
  architecture: ArchRow[]
  slides: Slide[]
}

interface Props {
  projects: Project[]
}

export default function ProjectsFeatured({ projects }: Props) {
  const [featIdx, setFeatIdx] = useState(0)
  const [slideIdx, setSlideIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const proj = projects[featIdx]

  const startSlideTimer = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setSlideIdx((i) => (i + 1) % (projects[idx]?.slides?.length || 1))
    }, 3000)
  }

  useEffect(() => {
    setSlideIdx(0)
    startSlideTimer(featIdx)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [featIdx])

  const switchProject = (idx: number) => {
    if (idx === featIdx) return
    setFading(true)
    setTimeout(() => {
      setFeatIdx(idx)
      setSlideIdx(0)
      setFading(false)
    }, 200)
  }

  if (!proj) return null

  return (
    <>
      {/* FEATURED BLOCK */}
      <div
        className="pf rev"
        id="featured-block"
        style={{ opacity: fading ? 0 : 1, transition: 'opacity 0.2s ease' }}
      >
        <div className="pf-info">
          <div className="pf-top">
            <span className="pf-badge">// featured</span>
            <span className="pf-id">
              proj_{proj.num} · {proj.year}
            </span>
          </div>
          <h3 className="pf-title">
            {proj.title} <em>{proj.titleEm}</em>
          </h3>
          <p className="pf-sub">{proj.sub}</p>
          <p className="pf-desc">{proj.desc}</p>
          <div className="arch">
            {proj.architecture?.map((row, ri) => (
              <div className="ar" key={ri}>
                {row.boxes?.map((b, bi) => (
                  <span key={bi} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <span className={`ab-box${bi === 0 ? ' hi' : ''}`}>{b.tech}</span>
                    {bi < row.boxes.length - 1 && <span className="aa">──▶</span>}
                  </span>
                ))}
                <span className="al">· {row.label}</span>
              </div>
            ))}
          </div>
          <div className="pf-tags">
            {proj.tags?.map((t, i) => (
              <span className="ptag" key={i}>
                {t.tag}
              </span>
            ))}
          </div>
        </div>

        <div className="pf-panel">
          <div className="pf-vis">
            <div className="pf-img-track">
              {proj.slides?.map((slide, i) => (
                <div
                  key={i}
                  className={`pf-img-slide${i === slideIdx ? ' active' : ''}`}
                  style={{ background: slide.bg }}
                >
                  <div className="proj-visual" style={{ background: slide.bg }}>
                    <div style={{ textAlign: 'center' }}>
                      <div
                        style={{
                          fontSize: 90,
                          color: slide.color,
                          opacity: 0.18,
                          fontFamily: 'var(--head)',
                          fontWeight: 900,
                          letterSpacing: '-.04em',
                          lineHeight: 1,
                          userSelect: 'none',
                        }}
                      >
                        {proj.visLabel}
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--mono)',
                          fontSize: 10,
                          letterSpacing: '.2em',
                          textTransform: 'uppercase',
                          color: slide.color,
                          opacity: 0.5,
                          marginTop: 12,
                        }}
                      >
                        {slide.label}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="pf-vc">{proj.vcText}</div>
          </div>
          <div className="pf-dots">
            {proj.slides?.map((_, i) => (
              <div
                key={i}
                className={`pf-dot${i === slideIdx ? ' active' : ''}`}
                onClick={() => setSlideIdx(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* PROJECT GRID — only non-featured cards */}
      <div className="pg rev">
        {projects.map((p, i) => (
          <div
            key={p.id}
            className={`pc rev${i === featIdx ? ' pc-selected' : ''}`}
            onClick={() => switchProject(i)}
            style={{ cursor: 'pointer' }}
          >
            <div className="pc-top">
              <div className="pc-vis" style={{ background: p.slides?.[0]?.bg || '#eaeaf8' }}>
                <span style={{ color: p.slides?.[0]?.color || '#2d3561' }}>{p.visLabel}</span>
              </div>
              <span className="pc-n">{p.num}</span>
            </div>
            <div className="pc-title">
              {p.title} <em>{p.titleEm}</em>
            </div>
            <div className="pc-sub">{p.sub}</div>
            <div className="pc-foot">
              {p.tags?.slice(0, 3).map((t, ti) => (
                <span className="ptag-s" key={ti}>
                  {t.tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
