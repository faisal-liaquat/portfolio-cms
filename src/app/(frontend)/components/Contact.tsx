'use client'

import React from 'react'

interface SocialLink {
  platform: string
  url: string
}

interface Props {
  eyebrow: string
  heading: string
  subtext: string
  email: string
  responseTime: string
  availability: string
  preferredWork: string
  socials: SocialLink[]
}

const SOC_ICONS: Record<string, React.ReactElement> = {
  github: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  'read.cv': (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M18.905 0H5.095A2.095 2.095 0 0 0 3 2.095v19.81A2.095 2.095 0 0 0 5.095 24h13.81A2.095 2.095 0 0 0 21 21.905V2.095A2.095 2.095 0 0 0 18.905 0zM7.5 6h9a.75.75 0 0 1 0 1.5h-9A.75.75 0 0 1 7.5 6zm0 3.75h9a.75.75 0 0 1 0 1.5h-9a.75.75 0 0 1 0-1.5zm0 3.75h6a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1 0-1.5z" />
    </svg>
  ),
}

const FALLBACK_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
  </svg>
)

function getIcon(platform: string): React.ReactElement {
  return SOC_ICONS[platform.toLowerCase()] ?? FALLBACK_ICON
}

type WordEntry = { text: string; isLast: boolean; hasBreakBefore: boolean }

export default function Contact({
  eyebrow,
  heading,
  subtext,
  email,
  responseTime,
  availability,
  preferredWork,
  socials,
}: Props) {
  const headingParts = heading?.split('\n') || ['Got a', 'project', 'in mind?']

  const allWords: WordEntry[] = []
  headingParts.forEach((part, pi) => {
    const words = part.split(' ').filter(Boolean)
    words.forEach((word, wi) => {
      allWords.push({
        text: word,
        isLast: pi === headingParts.length - 1 && wi === words.length - 1,
        hasBreakBefore: wi === 0 && pi > 0,
      })
    })
  })

  return (
    <section id="contact">
      <div className="ct-l rev">
        <div>
          <div className="ct-ey">04 — {eyebrow}</div>
          <h2 className="ct-hd">
            {allWords.map((w, i) => (
              <React.Fragment key={i}>
                {w.hasBreakBefore && <br />}
                <span className="word" style={{ animationDelay: `${0.04 + i * 0.09}s` }}>
                  {w.isLast ? <em>{w.text}</em> : w.text}
                </span>
                {!w.isLast && !allWords[i + 1]?.hasBreakBefore && '\u00A0'}
              </React.Fragment>
            ))}
          </h2>
        </div>

        <div>
          <p className="ct-sub">{subtext}</p>
          <div className="ct-socs">
            {socials.map((s, i) => (
              <a
                key={i}
                href={s.url}
                className="soc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.platform}
                title={s.platform}
              >
                {getIcon(s.platform)}
              </a>
            ))}
          </div>
          <div className="ct-logo-wrap" aria-hidden="true">
            <svg
              className="ct-logo"
              viewBox="0 0 220 160"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="10" y="10" width="22" height="140" />
              <rect x="10" y="10" width="80" height="22" />
              <rect x="10" y="68" width="60" height="20" />
              <polygon points="85,150 108,10 130,10 107,150" />
              <rect x="125" y="10" width="22" height="140" />
              <rect x="125" y="128" width="85" height="22" />
              <polygon points="158,128 178,55 198,128" />
              <polygon points="188,128 203,80 213,65 210,128" opacity="0.6" />
            </svg>
          </div>
        </div>
      </div>

      <div className="ct-r rev">
        <div className="ct-elbl">// direct_email</div>
        <a href={`mailto:${email}`} className="ct-eml">
          {email}
        </a>
        <a href={`mailto:${email}`} className="btn-ct">
          Send a Message →
        </a>
        <div className="ct-stat">
          <div className="sl">
            <span className="k">response_time </span>
            <span className="v">{responseTime}</span>
          </div>
          <div className="sl">
            <span className="k">availability </span>
            <span className={`v${availability === 'open' ? ' ok' : ''}`}>{availability}</span>
          </div>
          <div className="sl">
            <span className="k">preferred </span>
            <span className="v">{preferredWork}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
