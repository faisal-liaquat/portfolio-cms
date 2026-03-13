'use client'
import { useEffect, useState, useRef } from 'react'

interface MediaObject {
  url?: string
  filename?: string
  alt?: string
}

interface Slide {
  label: string
  color?: string | null
  bg?: string | null
  icon?: string | null
  image?: MediaObject | number | null
}

interface ArchBox {
  tech: string
}

interface ArchRow {
  label: string
  boxes?: ArchBox[] | null
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
  titleEm?: string | null
  sub?: string | null
  desc?: string | null
  tags?: TagItem[] | null
  visLabel?: string | null
  vcText?: string | null
  architecture?: ArchRow[] | null
  slides?: Slide[] | null
  featured?: boolean | null
  liveUrl?: string | null
  githubUrl?: string | null
}

interface Props {
  projects: Project[]
}

function resolveImageUrl(image: MediaObject | number | null | undefined): string | null {
  if (!image) return null
  if (typeof image === 'object' && image.url) return image.url
  return null
}

export default function ProjectsFeatured({ projects }: Props) {
  const defaultFeatIdx = projects.findIndex((p) => p.featured)
  const [featIdx, setFeatIdx] = useState(defaultFeatIdx >= 0 ? defaultFeatIdx : 0)
  const [slideIdx, setSlideIdx] = useState(0)
  const [fading, setFading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const proj = projects[featIdx]

  const pausedRef = useRef(false)

  const startSlideTimer = (idx: number) => {
    if (timerRef.current) clearInterval(timerRef.current)
    const slideCount = projects[idx]?.slides?.length ?? 1
    if (slideCount <= 1) return
    timerRef.current = setInterval(() => {
      if (!pausedRef.current) {
        setSlideIdx((i) => (i + 1) % slideCount)
      }
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
        {/* LEFT - info */}
        <div className="pf-info">
          <div className="pf-top">
            <span className="pf-badge">// featured</span>
            <span className="pf-id">
              {'proj_'}
              {proj.num}
              {' · '}
              {proj.year}
            </span>
          </div>

          <h3 className="pf-title">
            {proj.title} <em>{proj.titleEm}</em>
          </h3>

          <p className="pf-sub">{proj.sub}</p>
          <p className="pf-desc">{proj.desc}</p>

          {proj.architecture && proj.architecture.length > 0 && (
            <div className="arch">
              {proj.architecture.map((row, ri) => (
                <div className="ar" key={ri}>
                  {row.boxes?.map((b, bi) => (
                    <span key={bi} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <span className={bi === 0 ? 'ab-box hi' : 'ab-box'}>{b.tech}</span>
                      {bi < (row.boxes?.length ?? 0) - 1 && (
                        <span className="aa">{'──\u25b6'}</span>
                      )}
                    </span>
                  ))}
                  <span className="al">
                    {' · '}
                    {row.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="pf-tags">
            {proj.tags?.map((t, i) => (
              <span className="ptag" key={i}>
                {t.tag}
              </span>
            ))}
          </div>

          {(proj.liveUrl || proj.githubUrl) && (
            <div className="pf-links">
              {proj.liveUrl && (
                <a href={proj.liveUrl} target="_blank" rel="noopener noreferrer" className="pf-btn">
                  Live <span className="pf-btn-arrow">{'→'}</span>
                </a>
              )}
              {proj.githubUrl && (
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pf-btn pf-btn-ghost"
                >
                  GitHub <span className="pf-btn-arrow">{'→'}</span>
                </a>
              )}
            </div>
          )}
        </div>

        {/* RIGHT - visual panel */}
        <div className="pf-panel">
          <div
            className="pf-vis"
            style={{ position: 'relative' }}
            onMouseEnter={() => {
              pausedRef.current = true
            }}
            onMouseLeave={() => {
              pausedRef.current = false
            }}
          >
            {(proj.slides?.length ?? 0) > 1 && (
              <button
                className="pf-nav-btn prev"
                onClick={() => {
                  const count = proj.slides?.length ?? 1
                  setSlideIdx((i) => (i - 1 + count) % count)
                }}
                aria-label="Previous slide"
              >
                ‹
              </button>
            )}
            {(proj.slides?.length ?? 0) > 1 && (
              <button
                className="pf-nav-btn next"
                onClick={() => {
                  const count = proj.slides?.length ?? 1
                  setSlideIdx((i) => (i + 1) % count)
                }}
                aria-label="Next slide"
              >
                ›
              </button>
            )}
            <div className="pf-img-track">
              {proj.slides?.map((slide, i) => {
                const imageUrl = resolveImageUrl(slide.image)
                return (
                  <div
                    key={i}
                    className={i === slideIdx ? 'pf-img-slide active' : 'pf-img-slide'}
                    style={{ background: slide.bg ?? '#eaeaf8' }}
                  >
                    <div className="proj-visual" style={{ background: slide.bg ?? '#eaeaf8' }}>
                      {imageUrl ? (
                        <img src={imageUrl} alt={slide.label} className="proj-visual-img" />
                      ) : (
                        <div style={{ textAlign: 'center' }}>
                          <div
                            style={{
                              fontSize: 90,
                              color: slide.color ?? '#2d3561',
                              opacity: 0.18,
                              fontFamily: 'var(--head)',
                              fontWeight: 900,
                              letterSpacing: '-.04em',
                              lineHeight: 1,
                              userSelect: 'none',
                            }}
                          >
                            {slide.icon ?? proj.visLabel}
                          </div>
                          <div
                            style={{
                              fontFamily: 'var(--mono)',
                              fontSize: 10,
                              letterSpacing: '.2em',
                              textTransform: 'uppercase',
                              color: slide.color ?? '#2d3561',
                              opacity: 0.5,
                              marginTop: 12,
                            }}
                          >
                            {slide.label}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            {proj.vcText && <div className="pf-vc">{proj.vcText}</div>}
          </div>

          {(proj.slides?.length ?? 0) > 1 && (
            <div className="pf-dots">
              {proj.slides?.map((_, i) => (
                <div
                  key={i}
                  className={i === slideIdx ? 'pf-dot active' : 'pf-dot'}
                  onClick={() => setSlideIdx(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* PROJECT GRID */}
      <div className="pg rev">
        {projects.map((p: Project, i: number) => {
          const thumbUrl = resolveImageUrl(p.slides?.[0]?.image)
          return (
            <div
              key={p.id}
              className={i === featIdx ? 'pc rev pc-selected' : 'pc rev'}
              onClick={() => switchProject(i)}
              style={{ cursor: 'pointer' }}
            >
              <div className="pc-top">
                <div className="pc-vis" style={{ background: p.slides?.[0]?.bg ?? '#eaeaf8' }}>
                  <span
                    className="pc-vis-label"
                    style={{ color: p.slides?.[0]?.color ?? '#2d3561' }}
                  >
                    {p.visLabel ?? p.slides?.[0]?.icon ?? p.num}
                  </span>
                </div>
                <span className="pc-n">{p.num}</span>
              </div>

              <div className="pc-title">
                {p.title} <em>{p.titleEm}</em>
              </div>
              <div className="pc-sub">{p.sub}</div>

              <div className="pc-foot">
                {p.tags?.slice(0, 3).map((t: TagItem, ti: number) => (
                  <span className="ptag-s" key={ti}>
                    {t.tag}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
