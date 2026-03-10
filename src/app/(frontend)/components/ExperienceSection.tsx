import Image from 'next/image'

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
  description?: string | null
}

interface Props {
  items: ExperienceItem[]
}

const TYPE_LABELS: Record<string, string> = {
  'full-time': 'Full-Time',
  'part-time': 'Part-Time',
  internship: 'Internship',
  contract: 'Contract',
  freelance: 'Freelance',
}

export default function ExperienceSection({ items }: Props) {
  if (!items || items.length === 0) return null

  return (
    <div className="exp-section">
      <div className="exp-section-label">experience</div>
      <div className="exp-list">
        {items.map((item) => {
          const initials = item.company.slice(0, 2).toUpperCase()
          const dateRange = item.current
            ? `${item.startDate} — Present`
            : `${item.startDate}${item.endDate ? ` — ${item.endDate}` : ''}`

          return (
            <div className="exp-item" key={item.id}>
              <div className="exp-logo">
                {item.companyLogo?.url ? (
                  <Image src={item.companyLogo.url} alt={item.company} width={36} height={36} />
                ) : (
                  initials
                )}
              </div>
              <div className="exp-body">
                <div className="exp-company">{item.company}</div>
                <div className="exp-role">{item.role}</div>
                {item.location && <div className="exp-meta">{item.location}</div>}
              </div>
              <div className="exp-right">
                <div className="exp-dates">{dateRange}</div>
                {item.employmentType && (
                  <div className="exp-badge">
                    {TYPE_LABELS[item.employmentType] ?? item.employmentType}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
