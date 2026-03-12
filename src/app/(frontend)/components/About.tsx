'use client'
import { useEffect, useRef } from 'react'
import ExperienceSection from './ExperienceSection'

interface Fact {
  key: string
  value: string
}
interface ProcessStep {
  number: string
  title: string
  desc: string
}
interface ExperienceItem {
  id: number
  company: string
  companyLogo?: { url?: string } | null
  location?: string | null
  role: string
  employmentType?: string | null
  startDate: string
  endDate?: string | null
  current?: boolean | null
}

interface Props {
  eyebrow: string
  heading: string
  bio1: string
  bio2: string
  facts: Fact[]
  processSteps: ProcessStep[]
  experience: ExperienceItem[]
  profileImage?: string | null
}

export default function About({
  eyebrow,
  heading,
  bio1,
  bio2,
  facts,
  processSteps,
  experience,
  profileImage,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    // Only run the canvas animation if there's no profile image
    if (profileImage) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles: {
      x: number
      y: number
      r: number
      vx: number
      vy: number
      opacity: number
    }[] = []
    for (let i = 0; i < 20; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.15 + 0.05,
      })
    }

    let raf: number
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.globalAlpha = p.opacity
        ctx.fillStyle = '#2d3561'
        ctx.fill()
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [profileImage])

  return (
    <section id="about" className="sec">
      <div className="sec-hd rev">
        <span className="sec-n">03</span>
        <h2 className="sec-t">
          The Person <em>Behind It</em>
        </h2>
        <span className="sec-a">Developer who thinks like a designer.</span>
      </div>
      <div className="ab-grid">
        <div className="rev">
          <div className="ab-img">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Faisal"
                style={{
                  objectFit: 'cover',
                  borderRadius: '12px',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                }}
              />
            ) : (
              <>
                <canvas ref={canvasRef} id="portrait-canvas" />
                <div className="ab-letter">F.</div>
              </>
            )}
            <div className="ab-foot">
              <span>Faisal Liaquat</span>
              <span>PK · 2026</span>
            </div>
          </div>
        </div>
        <div className="rev">
          <p className="ab-intro">
            Drawn to the intersection of <span>technology</span> and expression.
          </p>
          <p className="ab-body">
            {bio1}
            <br />
            <br />
            {bio2}
          </p>
          <div className="ab-facts">
            {facts?.map((f, i) => (
              <div className="fact" key={i}>
                <div className="fk">{f.key}</div>
                <div className="fv">{f.value}</div>
              </div>
            ))}
          </div>
          <ExperienceSection items={experience} />
          {processSteps && processSteps.length > 0 && (
            <div className="process">
              <div className="proc-title">// process</div>
              <div className="proc-grid">
                {processSteps.map((step, i) => (
                  <div className="ps" key={i}>
                    <div className="ps-n">{step.number}</div>
                    <div className="ps-t">{step.title}</div>
                    <div className="ps-d">{step.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
