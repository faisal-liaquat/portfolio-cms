// src/app/robots.ts
export default function robots() {
  const siteUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? 'https://yourportfolio.vercel.app'

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/api/'],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
