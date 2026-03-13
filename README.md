# faisal-liaquat.com

Personal portfolio of **Faisal Liaquat** — full-stack developer based in Pakistan.

Live at [faisal-liaquat.com](https://faisal-liaquat.com)

---

## What this is

A fully CMS-driven portfolio where every piece of content — projects, skills, experience, bio, social links, the "currently building" bar — is managed through a secure admin dashboard. Zero code changes needed for content updates.

---

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| CMS | Payload CMS 3.0 |
| Database | PostgreSQL via Neon |
| Media | Cloudinary |
| Deployment | Vercel |
| Domain / DNS | Cloudflare Registrar |
| Language | TypeScript |

---

## Features

- **Fully headless CMS** — all content editable from `/admin` with no code deploys
- **Projects** — featured spotlight with image slides, architecture diagrams, tech tags, live/GitHub links
- **Skills** — icon-driven skill grid sourced from simpleicons.org, categorised by frontend / backend / tools
- **Experience** — work history with company logos, roles, dates, employment type
- **About** — bio, facts grid, process steps, profile image
- **Contact** — availability status, preferred work, response time
- **Now Bar** — live "currently building" strip driven from CMS
- **Dark mode** — persisted via localStorage
- **Animated hero** — typed name effect, floating gradient orbs
- **Rate limiting** — middleware-level API rate limiting
- **Cloudinary media** — all uploads stored and served via Cloudinary CDN
- **On-demand revalidation** — CMS changes trigger instant frontend updates via revalidation secret
- **Security hardened** — CORS, CSRF, CSP headers, registration locked

---

## Content collections

- `Projects` — selected work with slides, architecture, tags
- `Skills` — tech stack with Simple Icons integration
- `Experience` — work history

## Globals

- `Site Settings` — name, status, nav version, social links, chip bar
- `Hero` — eyebrow, name, role, bio, sys box, stats bar
- `Now Bar` — currently building label + text
- `About` — bio, facts, process steps, profile image
- `Contact` — email, availability, preferred work type

---

## Architecture

```
Next.js 15 (App Router)
├── /app/(frontend)      → public-facing portfolio pages
│   ├── components/      → Hero, Nav, Projects, Skills, About, Contact, NowBar, Experience
│   └── styles/          → portfolio.css (single stylesheet)
├── /app/(payload)       → Payload CMS admin panel
├── /collections/        → Users, Media, Projects, Skills, Experience
├── /globals/            → SiteSettings, Hero, NowBar, About, Contact
├── /lib/                → Cloudinary adapter, revalidation helpers
└── /middleware.ts       → Rate limiting, registration lock
```

---

## Deployment

Deployed on **Vercel** with automatic deploys from `main`. Custom domain managed via **Cloudflare Registrar** with DNS proxying disabled (grey cloud) for Vercel compatibility.

Environment variables (Vercel):
- `DATABASE_URI` — Neon PostgreSQL connection string
- `PAYLOAD_SECRET` — Payload auth secret
- `NEXT_PUBLIC_SERVER_URL` — canonical URL (`https://www.faisal-liaquat.com`)
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- `REVALIDATION_SECRET` — shared secret for on-demand ISR

---

## Admin

The admin panel is available at [faisal-liaquat.com/admin](https://faisal-liaquat.com/admin). Access is restricted to a single user account. Self-registration is disabled at the middleware level.

---

## License

This is a personal project. The code is public for reference. 