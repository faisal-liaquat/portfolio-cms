import * as dotenv from 'dotenv'
import { resolve } from 'path'

dotenv.config({ path: resolve(process.cwd(), '.env.local') })

import payload from 'payload'
import config from './payload.config'

async function seed() {
  await payload.init({ config })

  console.log('🌱 Seeding database...')

  // ── SITE SETTINGS ──────────────────────────────────
  await payload.updateGlobal({
    slug: 'site-settings',
    data: {
      name: 'Faisal Liaquat',
      tagline: 'Full-Stack Developer',
      status: 'available',
      location: 'Pakistan',
      timezone: 'PKT',
      navVersion: 'v1.0',
      lastCommit: 'a4f3c1',
      githubUrl: 'https://github.com/faisal-liaquat',
      linkedinUrl: 'https://www.linkedin.com/in/faisal-liaquat-73aa47231/',
      readcvUrl: 'https://read.cv/',
      nowBarChips: [
        { label: 'TypeScript' },
        { label: 'Node.js' },
        { label: 'Express.js' },
        { label: 'GitHub Actions' },
        { label: 'Apify' },
      ],
    },
  })
  console.log('✅ SiteSettings seeded')

  // ── HERO ───────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'hero',
    data: {
      eyebrow: 'available for work',
      firstName: 'Faisal',
      role: 'Full-Stack Developer',
      bio: 'I build clean, performant web applications - from idea to deployment. Focused on React.js, Node.js, and everything in between.',
      sysBoxLines: [
        { key: 'role', value: 'full-stack developer', highlight: false },
        { key: 'stack', value: 'React.js · Node.js · PostgreSQL', highlight: false },
        { key: 'location', value: 'Pakistan', highlight: false },
        { key: 'status', value: 'available for work', highlight: true },
      ],
      nowBarText: 'Building this portfolio CMS with Next.js + Payload',
      statsBar: [
        { value: '5+', label: 'projects shipped' },
        { value: '2+', label: 'years experience' },
        { value: '∞', label: 'cups of coffee' },
      ],
    },
  })
  console.log('✅ Hero seeded')

  // ── NOW BAR ────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'now-bar',
    data: {
      label: 'currently building',
      text: 'This portfolio CMS with Next.js + Payload CMS',
      link: '',
    },
  })
  console.log('✅ NowBar seeded')

  // ── ABOUT ──────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'about',
    data: {
      eyebrow: '03 — person behind it',
      heading: 'The person\nbehind the code',
      bio1: "I'm Faisal - a full-stack developer based in Pakistan with a focus on building clean, performant, and purposeful web applications.",
      bio2: 'I care about the craft. Every project I ship is designed and engineered to work well, look good, and scale gracefully.',
      facts: [
        { key: 'based_in', value: 'Pakistan' },
        { key: 'timezone', value: 'PKT · UTC+5' },
        { key: 'focus', value: 'Full-Stack Web Dev' },
        { key: 'experience', value: '2+ years' },
        { key: 'available', value: 'for ft & freelance' },
      ],
      processSteps: [
        {
          number: '01',
          title: 'Understand',
          desc: 'Deep dive into the problem space and requirements',
        },
        {
          number: '02',
          title: 'Design',
          desc: 'Plan the architecture and UX before writing a line of code',
        },
        {
          number: '03',
          title: 'Build',
          desc: 'Ship clean, typed, tested code with attention to detail',
        },
        { number: '04', title: 'Refine', desc: 'Iterate based on feedback until it is right' },
      ],
    },
  })
  console.log('✅ About seeded')

  // ── CONTACT ────────────────────────────────────────
  await payload.updateGlobal({
    slug: 'contact',
    data: {
      eyebrow: "04 — let's work together",
      heading: 'Got a project in mind?',
      subtext: 'Open to freelance, collaborations & full-time roles.',
      email: 'mfaisal1801@protonmail.com',
      responseTime: '< 24h',
      availability: 'open',
      preferredWork: 'freelance · collab · ft',
    },
  })
  console.log('✅ Contact seeded')

  // ── PROJECTS ───────────────────────────────────────
  const projectsData = [
    {
      order: 1,
      featured: true,
      num: '001',
      type: 'platform' as const,
      year: '2026',
      title: 'Digital Exhibition',
      titleEm: 'Builder',
      sub: 'Immersive 3D gallery platform for digital artists.',
      desc: 'A full-stack platform for curating and displaying digital art exhibitions with 3D spatial navigation, real-time collaboration, and rich media support.',
      tags: [
        { tag: 'Next.js' },
        { tag: 'React Three Fiber' },
        { tag: 'PostgreSQL' },
        { tag: 'Prisma' },
        { tag: 'Auth.js' },
        { tag: 'Cloudinary' },
        { tag: 'Liveblocks' },
      ],
      visLabel: '3D',
      vcText: 'interactive · collab',
      architecture: [
        {
          label: 'data',
          boxes: [{ tech: 'Next.js' }, { tech: 'REST API' }, { tech: 'PostgreSQL' }],
        },
        {
          label: 'realtime',
          boxes: [{ tech: 'R3F Scene' }, { tech: 'Liveblocks' }, { tech: 'Cloudinary' }],
        },
        {
          label: 'deploy',
          boxes: [{ tech: 'Auth.js' }, { tech: 'Prisma ORM' }, { tech: 'Vercel Edge' }],
        },
      ],
      slides: [
        { label: 'Gallery View', color: '#2d3561', bg: '#eaeaf8', icon: '🖼' },
        { label: '3D Navigation', color: '#4a5090', bg: '#e0e1f5', icon: '◈' },
        { label: 'Collaboration', color: '#6b72b8', bg: '#d8d9f0', icon: '⬡' },
        { label: 'Media Upload', color: '#8b92c9', bg: '#d0d2ec', icon: '⊕' },
        { label: 'Auth System', color: '#a0a8d8', bg: '#c8cbe8', icon: '⊗' },
      ],
    },
    {
      order: 2,
      featured: false,
      num: '002',
      type: 'tool' as const,
      year: '2025',
      title: 'Apify Scraping',
      titleEm: 'Suite',
      sub: 'TypeScript monorepo of automated web scraping actors.',
      desc: 'Built and maintained a TypeScript monorepo of automated web scraping actors on the Apify platform, including scrapers for GitHub, Dribbble, and Godly.website. REST API with Express.js and CI/CD via GitHub Actions.',
      tags: [
        { tag: 'TypeScript' },
        { tag: 'Node.js' },
        { tag: 'Apify' },
        { tag: 'Express.js' },
        { tag: 'GitHub Actions' },
        { tag: 'Playwright' },
      ],
      visLabel: 'TS',
      vcText: 'scraping · automation',
      architecture: [
        {
          label: 'ci/cd',
          boxes: [{ tech: 'TypeScript' }, { tech: 'Apify SDK' }, { tech: 'GitHub Actions' }],
        },
        {
          label: 'api',
          boxes: [{ tech: 'Express.js' }, { tech: 'REST API' }, { tech: 'npm publish' }],
        },
      ],
      slides: [
        { label: 'GitHub Scraper', color: '#161b22', bg: '#e8f0fe', icon: '⬡' },
        { label: 'Dribbble Actor', color: '#ea4c89', bg: '#fde8f4', icon: '◉' },
        { label: 'REST API', color: '#10b981', bg: '#e8faf4', icon: '⟳' },
        { label: 'CI/CD Pipeline', color: '#2088ff', bg: '#e8f0ff', icon: '▶' },
        { label: 'Versioning', color: '#f59e0b', bg: '#fef3e8', icon: '⊞' },
      ],
    },
    {
      order: 3,
      featured: false,
      num: '003',
      type: 'fullstack' as const,
      year: '2024',
      title: 'ClearBooks',
      titleEm: 'Accounting',
      sub: 'Multi-user bookkeeping platform with role-based access.',
      desc: 'Online bookkeeping web app with ledger management, receipt generation, and role-based access. Built full stack with C#, ASP.NET, JavaScript, and SQL Server.',
      tags: [
        { tag: 'C#' },
        { tag: 'ASP.NET' },
        { tag: 'JavaScript' },
        { tag: 'SQL Server' },
        { tag: 'HTML/CSS' },
      ],
      visLabel: '₿',
      vcText: 'accounting · finance',
      architecture: [
        {
          label: 'stack',
          boxes: [{ tech: 'C# / ASP.NET' }, { tech: 'SQL Server' }, { tech: 'JavaScript' }],
        },
        {
          label: 'features',
          boxes: [{ tech: 'Role-Based Auth' }, { tech: 'Ledger Engine' }, { tech: 'Receipt Gen' }],
        },
      ],
      slides: [
        { label: 'Dashboard', color: '#1e40af', bg: '#eff6ff', icon: '▦' },
        { label: 'Ledger', color: '#1e3a8a', bg: '#dbeafe', icon: '≡' },
        { label: 'Receipts', color: '#1d4ed8', bg: '#bfdbfe', icon: '⬜' },
        { label: 'Roles', color: '#2563eb', bg: '#93c5fd', icon: '⊛' },
      ],
    },
    {
      order: 4,
      featured: false,
      num: '004',
      type: 'ml' as const,
      year: '2024',
      title: 'Football Analysis',
      titleEm: 'System',
      sub: 'Real-time player tracking using computer vision.',
      desc: 'Real-time player tracking and performance analysis system using YOLOv8 and OpenCV. Detects and tracks players across match footage, generating performance metrics.',
      tags: [
        { tag: 'Python' },
        { tag: 'YOLOv8' },
        { tag: 'OpenCV' },
        { tag: 'NumPy' },
        { tag: 'Computer Vision' },
      ],
      visLabel: '⚽',
      vcText: 'computer vision · ML',
      architecture: [
        { label: 'vision', boxes: [{ tech: 'Python' }, { tech: 'YOLOv8' }, { tech: 'OpenCV' }] },
        {
          label: 'analysis',
          boxes: [{ tech: 'NumPy' }, { tech: 'Matplotlib' }, { tech: 'Video I/O' }],
        },
      ],
      slides: [
        { label: 'Player Detection', color: '#065f46', bg: '#ecfdf5', icon: '◎' },
        { label: 'Tracking', color: '#047857', bg: '#d1fae5', icon: '⟿' },
        { label: 'Heatmap', color: '#059669', bg: '#a7f3d0', icon: '▣' },
        { label: 'Metrics', color: '#10b981', bg: '#6ee7b7', icon: '↗' },
      ],
    },
    {
      order: 5,
      featured: false,
      num: '005',
      type: 'finance' as const,
      year: '2026',
      title: 'PennyWise',
      titleEm: 'Finance',
      sub: 'Personal finance tracker with analytics and multi-currency.',
      desc: 'Personal finance tracker with custom budget periods, analytics charts, and multi-currency support. Clean UI built with Svelte and Supabase.',
      tags: [
        { tag: 'Svelte' },
        { tag: 'Supabase' },
        { tag: 'PostgreSQL' },
        { tag: 'Tailwind CSS' },
        { tag: 'Chart.js' },
      ],
      visLabel: '₱',
      vcText: 'finance · analytics',
      architecture: [
        {
          label: 'stack',
          boxes: [{ tech: 'Svelte' }, { tech: 'Supabase' }, { tech: 'PostgreSQL' }],
        },
        {
          label: 'ui',
          boxes: [{ tech: 'Tailwind CSS' }, { tech: 'Chart.js' }, { tech: 'Multi-Currency' }],
        },
      ],
      slides: [
        { label: 'Dashboard', color: '#7c3aed', bg: '#f5f3ff', icon: '▤' },
        { label: 'Budget Periods', color: '#6d28d9', bg: '#ede9fe', icon: '◷' },
        { label: 'Analytics', color: '#5b21b6', bg: '#ddd6fe', icon: '↗' },
        { label: 'Multi-Currency', color: '#4c1d95', bg: '#c4b5fd', icon: '⊕' },
      ],
    },
  ]

  for (const project of projectsData) {
    await payload.create({ collection: 'projects', data: project })
    console.log(`✅ Project seeded: ${project.title}`)
  }

  // ── SKILLS ─────────────────────────────────────────
  const skillsData: Array<{
    name: string
    category: 'frontend' | 'backend' | 'database' | 'devops' | 'tools' | 'languages' | 'ai_ml'
    iconSlug: string
    iconColor: string
    hot: boolean
    order: number
  }> = [
    {
      name: 'React',
      category: 'frontend',
      iconSlug: 'react',
      iconColor: '#61DAFB',
      hot: true,
      order: 1,
    },
    {
      name: 'Next.js',
      category: 'frontend',
      iconSlug: 'nextdotjs',
      iconColor: '#000000',
      hot: true,
      order: 2,
    },
    {
      name: 'TypeScript',
      category: 'languages',
      iconSlug: 'typescript',
      iconColor: '#3178C6',
      hot: true,
      order: 3,
    },
    {
      name: 'Tailwind CSS',
      category: 'frontend',
      iconSlug: 'tailwindcss',
      iconColor: '#06B6D4',
      hot: true,
      order: 4,
    },
    {
      name: 'Svelte',
      category: 'frontend',
      iconSlug: 'svelte',
      iconColor: '#FF3E00',
      hot: false,
      order: 5,
    },
    {
      name: 'Node.js',
      category: 'backend',
      iconSlug: 'nodedotjs',
      iconColor: '#339933',
      hot: true,
      order: 6,
    },
    {
      name: 'Express.js',
      category: 'backend',
      iconSlug: 'express',
      iconColor: '#000000',
      hot: false,
      order: 7,
    },
    {
      name: 'Python',
      category: 'languages',
      iconSlug: 'python',
      iconColor: '#3776AB',
      hot: false,
      order: 8,
    },
    {
      name: 'PostgreSQL',
      category: 'database',
      iconSlug: 'postgresql',
      iconColor: '#4169E1',
      hot: true,
      order: 9,
    },
    {
      name: 'Supabase',
      category: 'database',
      iconSlug: 'supabase',
      iconColor: '#3ECF8E',
      hot: false,
      order: 10,
    },
    {
      name: 'Prisma',
      category: 'tools',
      iconSlug: 'prisma',
      iconColor: '#2D3748',
      hot: true,
      order: 11,
    },
    {
      name: 'Vercel',
      category: 'devops',
      iconSlug: 'vercel',
      iconColor: '#000000',
      hot: true,
      order: 12,
    },
    {
      name: 'GitHub Actions',
      category: 'devops',
      iconSlug: 'githubactions',
      iconColor: '#2088FF',
      hot: false,
      order: 13,
    },
    {
      name: 'Cloudinary',
      category: 'tools',
      iconSlug: 'cloudinary',
      iconColor: '#3448C5',
      hot: true,
      order: 14,
    },
    { name: 'Git', category: 'tools', iconSlug: 'git', iconColor: '#F05032', hot: true, order: 15 },
    {
      name: 'Payload CMS',
      category: 'tools',
      iconSlug: 'payloadcms',
      iconColor: '#000000',
      hot: true,
      order: 16,
    },
    {
      name: 'JavaScript',
      category: 'languages',
      iconSlug: 'javascript',
      iconColor: '#F7DF1E',
      hot: true,
      order: 17,
    },
    {
      name: 'C#',
      category: 'languages',
      iconSlug: 'csharp',
      iconColor: '#239120',
      hot: false,
      order: 18,
    },
    {
      name: 'OpenCV',
      category: 'ai_ml',
      iconSlug: 'opencv',
      iconColor: '#5C3EE8',
      hot: false,
      order: 19,
    },
  ]

  for (const skill of skillsData) {
    await payload.create({ collection: 'skills', data: skill })
    console.log(`✅ Skill seeded: ${skill.name}`)
  }

  // ── EXPERIENCE ────────────────────────────────────
  await payload.create({
    collection: 'experience',
    data: {
      order: 1,
      company: 'Rogue Agency',
      location: 'Remote',
      role: 'Software Developer',
      employmentType: 'full-time',
      startDate: 'Dec 2025',
      endDate: '',
      current: true,
      description:
        'Built and maintained a TypeScript monorepo of automated web scraping actors on the Apify platform, including scrapers for GitHub, Dribbble, and Godly.website. Developed shared infrastructure packages, a REST API with Express.js, and CI/CD pipelines via GitHub Actions.',
    },
  })
  await payload.create({
    collection: 'experience',
    data: {
      order: 2,
      company: 'Logico Solutions',
      location: 'Lahore, Pakistan',
      role: 'Web Development Intern',
      employmentType: 'internship',
      startDate: 'Jul 2024',
      endDate: 'Sep 2024',
      current: false,
      description:
        'Contributed to development and maintenance of web applications using HTML, CSS, JavaScript, and C#. Collaborated with cross-functional teams to enhance functionality and optimize performance.',
    },
  })
  console.log('✅ Experience seeded')

  console.log('\n🎉 Seeding complete!')
  process.exit(0)
}

seed().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
