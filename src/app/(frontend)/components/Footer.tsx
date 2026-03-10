'use client'

interface Props {
  name: string
  year: number
}

const MARQUEE_ITEMS = [
  'Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Payload CMS',
  'Tailwind',
  'Svelte',
  'Python',
  'JavaScript',
  'Vercel',
  'React',
  'Express.js',
  'GitHub Actions',
  'Git',
  'Apify',
  'Cloudinary',
  'Neon',
  'MongoDB',
  'Supabase',
  'OpenCV',
  'Next.js',
  'TypeScript',
  'Node.js',
  'PostgreSQL',
  'Payload CMS',
  'Tailwind',
  'Svelte',
  'Python',
  'JavaScript',
  'Vercel',
  'React',
  'Express.js',
  'GitHub Actions',
  'Git',
  'Apify',
  'Cloudinary',
  'Neon',
  'MongoDB',
  'Supabase',
  'OpenCV',
]

export default function Footer({ name, year }: Props) {
  return (
    <footer className="foot">
      <div className="foot-marquee">
        <div className="foot-marquee-track">
          {MARQUEE_ITEMS.map((item, i) => (
            <span className="foot-marquee-item" key={i}>
              {item}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
