'use client'

interface Skill {
  id: number
  name: string
  category: string
  iconSlug: string
  iconColor: string
  hot: boolean
}

interface Props {
  skills: Skill[]
}

const CATEGORY_ORDER = ['frontend', 'languages', 'backend', 'database', 'tools', 'devops', 'ai_ml']

const CATEGORY_LABELS: Record<string, { label: string; cls: string }> = {
  frontend: { label: 'Frontend', cls: 'cat-fe' },
  languages: { label: 'Languages', cls: 'cat-fe' },
  backend: { label: 'Backend & Data', cls: 'cat-be' },
  database: { label: 'Database', cls: 'cat-be' },
  tools: { label: 'Tools & Platform', cls: 'cat-tl' },
  devops: { label: 'DevOps', cls: 'cat-tl' },
  ai_ml: { label: 'AI / ML', cls: 'cat-be' },
}

function SkillIcon({ slug, color, name }: { slug: string; color: string; name: string }) {
  return (
    <div className="si">
      <img
        src={`https://cdn.simpleicons.org/${slug}/${color.replace('#', '')}`}
        alt={name}
        width={16}
        height={16}
        onError={(e) => {
          ;(e.target as HTMLImageElement).style.display = 'none'
        }}
      />
    </div>
  )
}

export default function Skills({ skills }: Props) {
  // Deduplicate by id, then group
  const seen = new Set<number>()
  const unique = skills.filter((s) => {
    if (seen.has(s.id)) return false
    seen.add(s.id)
    return true
  })

  const grouped: Record<string, Skill[]> = {}
  for (const s of unique) {
    if (!grouped[s.category]) grouped[s.category] = []
    grouped[s.category].push(s)
  }

  return (
    <section id="skills" className="sec">
      <div className="sec-hd rev">
        <span className="sec-n">02</span>
        <h2 className="sec-t">
          Stack &amp; <em>Skills</em>
        </h2>
        <span className="sec-a">Chosen for the right reasons.</span>
      </div>
      <div className="sk-layout rev">
        <div>
          <p className="sk-lede">
            <strong>Full-stack depth</strong> from pixel to database.
          </p>
          <p className="sk-sublede" style={{ marginTop: 14 }}>
            Blue&nbsp;→&nbsp;frontend
            <br />
            Green&nbsp;→&nbsp;backend
            <br />
            Amber&nbsp;→&nbsp;tools
          </p>
        </div>
        <div className="sk-cats">
          {CATEGORY_ORDER.filter((cat) => grouped[cat]?.length > 0).map((cat) => {
            const meta = CATEGORY_LABELS[cat]
            return (
              <div key={cat} className={meta.cls}>
                <div className="scat-hd">
                  <div className="scat-bar"></div>
                  {meta.label}
                </div>
                <div className="spills">
                  {grouped[cat].map((skill) => (
                    <div key={skill.id} className={`sp${skill.hot ? ' hot' : ''}`}>
                      <SkillIcon slug={skill.iconSlug} color={skill.iconColor} name={skill.name} />
                      <span>{skill.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
