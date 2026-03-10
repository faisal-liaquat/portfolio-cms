// src/lib/iconRegistry.ts
// Master registry of 80+ dev tools for the icon picker.
// Each entry: { name, slug (simpleicons.org), color (hex), category }

export interface IconEntry {
  name: string
  slug: string
  color: string
  category: string
}

export const ICON_REGISTRY: IconEntry[] = [
  // ── Languages ──────────────────────────────────────────
  { name: 'JavaScript', slug: 'javascript', color: '#F7DF1E', category: 'Languages' },
  { name: 'TypeScript', slug: 'typescript', color: '#3178C6', category: 'Languages' },
  { name: 'Python', slug: 'python', color: '#3776AB', category: 'Languages' },
  { name: 'Rust', slug: 'rust', color: '#000000', category: 'Languages' },
  { name: 'Go', slug: 'go', color: '#00ADD8', category: 'Languages' },
  { name: 'Java', slug: 'java', color: '#007396', category: 'Languages' },
  { name: 'C#', slug: 'csharp', color: '#239120', category: 'Languages' },
  { name: 'PHP', slug: 'php', color: '#777BB4', category: 'Languages' },
  { name: 'Ruby', slug: 'ruby', color: '#CC342D', category: 'Languages' },
  { name: 'Swift', slug: 'swift', color: '#F05138', category: 'Languages' },
  { name: 'Kotlin', slug: 'kotlin', color: '#7F52FF', category: 'Languages' },
  { name: 'C++', slug: 'cplusplus', color: '#00599C', category: 'Languages' },

  // ── Frontend ───────────────────────────────────────────
  { name: 'React', slug: 'react', color: '#61DAFB', category: 'Frontend' },
  { name: 'Next.js', slug: 'nextdotjs', color: '#000000', category: 'Frontend' },
  { name: 'Vue', slug: 'vuedotjs', color: '#4FC08D', category: 'Frontend' },
  { name: 'Nuxt', slug: 'nuxtdotjs', color: '#00DC82', category: 'Frontend' },
  { name: 'Svelte', slug: 'svelte', color: '#FF3E00', category: 'Frontend' },
  { name: 'SvelteKit', slug: 'svelte', color: '#FF3E00', category: 'Frontend' },
  { name: 'Astro', slug: 'astro', color: '#FF5D01', category: 'Frontend' },
  { name: 'Angular', slug: 'angular', color: '#DD0031', category: 'Frontend' },
  { name: 'Remix', slug: 'remix', color: '#000000', category: 'Frontend' },
  { name: 'Solid', slug: 'solid', color: '#2C4F7C', category: 'Frontend' },

  // ── Styling ────────────────────────────────────────────
  { name: 'Tailwind CSS', slug: 'tailwindcss', color: '#06B6D4', category: 'Styling' },
  { name: 'CSS', slug: 'css3', color: '#1572B6', category: 'Styling' },
  { name: 'Sass', slug: 'sass', color: '#CC6699', category: 'Styling' },
  { name: 'Bootstrap', slug: 'bootstrap', color: '#7952B3', category: 'Styling' },
  { name: 'Styled Components', slug: 'styledcomponents', color: '#DB7093', category: 'Styling' },
  { name: 'Framer Motion', slug: 'framer', color: '#0055FF', category: 'Styling' },

  // ── Backend ────────────────────────────────────────────
  { name: 'Node.js', slug: 'nodedotjs', color: '#339933', category: 'Backend' },
  { name: 'Express', slug: 'express', color: '#000000', category: 'Backend' },
  { name: 'FastAPI', slug: 'fastapi', color: '#009688', category: 'Backend' },
  { name: 'Django', slug: 'django', color: '#092E20', category: 'Backend' },
  { name: 'Flask', slug: 'flask', color: '#000000', category: 'Backend' },
  { name: 'Laravel', slug: 'laravel', color: '#FF2D20', category: 'Backend' },
  { name: 'Rails', slug: 'rubyonrails', color: '#CC0000', category: 'Backend' },
  { name: 'Spring', slug: 'spring', color: '#6DB33F', category: 'Backend' },
  { name: 'NestJS', slug: 'nestjs', color: '#E0234E', category: 'Backend' },
  { name: 'Hono', slug: 'hono', color: '#E36002', category: 'Backend' },

  // ── Databases ──────────────────────────────────────────
  { name: 'PostgreSQL', slug: 'postgresql', color: '#4169E1', category: 'Databases' },
  { name: 'MySQL', slug: 'mysql', color: '#4479A1', category: 'Databases' },
  { name: 'MongoDB', slug: 'mongodb', color: '#47A248', category: 'Databases' },
  { name: 'Redis', slug: 'redis', color: '#DC382D', category: 'Databases' },
  { name: 'SQLite', slug: 'sqlite', color: '#003B57', category: 'Databases' },
  { name: 'Supabase', slug: 'supabase', color: '#3ECF8E', category: 'Databases' },
  { name: 'PlanetScale', slug: 'planetscale', color: '#000000', category: 'Databases' },
  { name: 'Turso', slug: 'turso', color: '#4FF8D2', category: 'Databases' },

  // ── Cloud / Infra ──────────────────────────────────────
  { name: 'Vercel', slug: 'vercel', color: '#000000', category: 'Cloud / Infra' },
  { name: 'Netlify', slug: 'netlify', color: '#00C7B7', category: 'Cloud / Infra' },
  { name: 'AWS', slug: 'amazonaws', color: '#232F3E', category: 'Cloud / Infra' },
  { name: 'GCP', slug: 'googlecloud', color: '#4285F4', category: 'Cloud / Infra' },
  { name: 'Azure', slug: 'microsoftazure', color: '#0078D4', category: 'Cloud / Infra' },
  { name: 'Railway', slug: 'railway', color: '#0B0D0E', category: 'Cloud / Infra' },
  { name: 'Fly.io', slug: 'flydotio', color: '#7B3BE2', category: 'Cloud / Infra' },
  { name: 'Docker', slug: 'docker', color: '#2496ED', category: 'Cloud / Infra' },
  { name: 'Kubernetes', slug: 'kubernetes', color: '#326CE5', category: 'Cloud / Infra' },
  { name: 'Cloudinary', slug: 'cloudinary', color: '#3448C5', category: 'Cloud / Infra' },

  // ── Tools ──────────────────────────────────────────────
  { name: 'Git', slug: 'git', color: '#F05032', category: 'Tools' },
  { name: 'GitHub', slug: 'github', color: '#181717', category: 'Tools' },
  { name: 'GitLab', slug: 'gitlab', color: '#FC6D26', category: 'Tools' },
  { name: 'VS Code', slug: 'visualstudiocode', color: '#007ACC', category: 'Tools' },
  { name: 'Figma', slug: 'figma', color: '#F24E1E', category: 'Tools' },
  { name: 'Postman', slug: 'postman', color: '#FF6C37', category: 'Tools' },
  { name: 'Insomnia', slug: 'insomnia', color: '#4000BF', category: 'Tools' },
  { name: 'Linux', slug: 'linux', color: '#FCC624', category: 'Tools' },
  { name: 'Bash', slug: 'gnubash', color: '#4EAA25', category: 'Tools' },
  { name: 'GitHub Actions', slug: 'githubactions', color: '#2088FF', category: 'Tools' },
  { name: 'Payload CMS', slug: 'payloadcms', color: '#000000', category: 'Tools' },

  // ── AI / ML ────────────────────────────────────────────
  { name: 'PyTorch', slug: 'pytorch', color: '#EE4C2C', category: 'AI / ML' },
  { name: 'TensorFlow', slug: 'tensorflow', color: '#FF6F00', category: 'AI / ML' },
  { name: 'OpenCV', slug: 'opencv', color: '#5C3EE8', category: 'AI / ML' },
  { name: 'Hugging Face', slug: 'huggingface', color: '#FFD21E', category: 'AI / ML' },
  { name: 'LangChain', slug: 'langchain', color: '#1C3C3C', category: 'AI / ML' },

  // ── Other ──────────────────────────────────────────────
  { name: 'Prisma', slug: 'prisma', color: '#2D3748', category: 'Other' },
  { name: 'Drizzle', slug: 'drizzle', color: '#C5F74F', category: 'Other' },
  { name: 'tRPC', slug: 'trpc', color: '#2596BE', category: 'Other' },
  { name: 'GraphQL', slug: 'graphql', color: '#E10098', category: 'Other' },
  { name: 'WebSockets', slug: 'websocket', color: '#010101', category: 'Other' },
  { name: 'Stripe', slug: 'stripe', color: '#008CDD', category: 'Other' },
  { name: 'Clerk', slug: 'clerk', color: '#6C47FF', category: 'Other' },
  { name: 'Auth.js', slug: 'authjs', color: '#EB5424', category: 'Other' },
  { name: 'Apify', slug: 'apify', color: '#00B14F', category: 'Other' },
  { name: 'OpenAI', slug: 'openai', color: '#412991', category: 'Other' },
]

// Helper: find by slug (used by picker to pre-select)
export function findIconBySlug(slug: string): IconEntry | undefined {
  return ICON_REGISTRY.find((e) => e.slug === slug)
}

// Helper: all unique categories in registry order
export const REGISTRY_CATEGORIES = Array.from(new Set(ICON_REGISTRY.map((e) => e.category)))
