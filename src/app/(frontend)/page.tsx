import { getPayload } from 'payload'
import config from '@payload-config'
import Nav from './components/Nav'
import Hero from './components/Hero'
import NowBar from './components/NowBar'
import ProjectsFeatured from './components/ProjectsFeatured'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CursorAndProgress from './components/CursorAndProgress'
import ScrollReveal from './components/ScrollReveal'

export const revalidate = 60

async function getPageData() {
  const payload = await getPayload({ config })

  const [heroData, nowBarData, aboutData, contactData, siteData] = await Promise.all([
    payload.findGlobal({ slug: 'hero' }),
    payload.findGlobal({ slug: 'now-bar' }),
    payload.findGlobal({ slug: 'about', depth: 1 }), // depth:1 resolves image.url
    payload.findGlobal({ slug: 'contact' }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])

  const projectsRes = await payload.find({
    collection: 'projects',
    sort: 'order',
    limit: 20,
    depth: 2,
  })

  const skillsRes = await payload.find({
    collection: 'skills',
    sort: 'order',
    limit: 100,
    depth: 1,
  })

  const experienceRes = await payload.find({
    collection: 'experience',
    sort: 'order',
    limit: 20,
    depth: 2,
  })

  return {
    heroData,
    nowBarData,
    aboutData,
    contactData,
    siteData,
    projectsRes,
    skillsRes,
    experienceRes,
  }
}

export default async function HomePage() {
  const {
    heroData,
    nowBarData,
    aboutData,
    contactData,
    siteData,
    projectsRes,
    skillsRes,
    experienceRes,
  } = await getPageData()

  const socials = [
    siteData.githubUrl && { platform: 'GitHub', url: siteData.githubUrl },
    siteData.linkedinUrl && { platform: 'LinkedIn', url: siteData.linkedinUrl },
    siteData.readcvUrl && { platform: 'Read.cv', url: siteData.readcvUrl },
  ].filter(Boolean) as { platform: string; url: string }[]

  const chips = (siteData.nowBarChips ?? []).map((c: { label: string }) => c.label)

  return (
    <>
      <CursorAndProgress />
      <Nav
        name={siteData.name}
        navVersion={siteData.navVersion ?? 'v1.0'}
        status={siteData.status ?? 'available'}
        lastCommit={siteData.lastCommit ?? 'a4f3c1'}
      />
      <Hero
        eyebrow={heroData.eyebrow ?? ''}
        firstName={heroData.firstName}
        role={heroData.role}
        bio={heroData.bio}
        sysBoxLines={heroData.sysBoxLines ?? []}
        statsBar={heroData.statsBar ?? []}
      />
      <NowBar
        label={nowBarData.label ?? 'currently_building'}
        text={nowBarData.text}
        chips={chips.length > 0 ? chips : ['TypeScript', 'Node.js', 'Next.js']}
      />
      <section id="projects" className="sec">
        <div className="sec-hd rev">
          <span className="sec-n">01</span>
          <h2 className="sec-t">
            Selected <em>Work</em>
          </h2>
          <span className="sec-a">Depth over breadth. Built to matter.</span>
        </div>
        <ProjectsFeatured projects={projectsRes.docs as any} />
      </section>
      <Skills skills={skillsRes.docs as any} />
      <About
        eyebrow={aboutData.eyebrow ?? ''}
        heading={aboutData.heading ?? ''}
        bio1={aboutData.bio1 ?? ''}
        bio2={aboutData.bio2 ?? ''}
        facts={aboutData.facts ?? []}
        processSteps={aboutData.processSteps ?? []}
        experience={experienceRes.docs as any}
        profileImage={
          aboutData.image && typeof aboutData.image === 'object'
            ? ((aboutData.image as { url?: string }).url ?? null)
            : null
        }
      />
      <Contact
        eyebrow={contactData.eyebrow ?? "let's work together"}
        heading={contactData.heading ?? 'Got a\nproject\nin mind?'}
        subtext={contactData.subtext ?? ''}
        email={contactData.email}
        responseTime={contactData.responseTime ?? '< 24h'}
        availability={contactData.availability ?? 'open'}
        preferredWork={contactData.preferredWork ?? 'freelance · collab · ft'}
        socials={socials}
      />
      <Footer name={siteData.name} year={new Date().getFullYear()} />
      <ScrollReveal />
    </>
  )
}
