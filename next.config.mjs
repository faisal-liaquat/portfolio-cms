// next.config.mjs
import { withPayload } from '@payloadcms/next/withPayload'

const isDev = process.env.NODE_ENV === 'development'
const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              `default-src 'self'`,
              // unsafe-eval needed for Payload admin in production (lexical editor)
              `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live`,
              `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,
              // https: covers Cloudinary, simpleicons, any image CDN
              `img-src 'self' data: blob: https: http://localhost:3000`,
              `font-src 'self' data: https://fonts.gstatic.com`,
              // 'self' covers any hostname this app is served from (custom domain + vercel previews)
              // serverURL covers the explicit production domain for SSR fetches
              isDev
                ? `connect-src 'self' ws: wss: https://res.cloudinary.com https://vercel.live wss://ws-us3.pusher.com`
                : `connect-src 'self' ${serverURL} https://res.cloudinary.com https://vercel.live wss://ws-us3.pusher.com`,
              `media-src 'self' https://res.cloudinary.com`,
              // vercel.live preview toolbar uses an iframe
              `frame-src 'none' https://vercel.live`,
              `frame-ancestors 'none'`,
              `object-src 'none'`,
              `base-uri 'self'`,
              `form-action 'self'`,
            ].join('; '),
          },
        ],
      },
    ]
  },
}

export default withPayload(nextConfig)
