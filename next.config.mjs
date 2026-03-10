// next.config.mjs
import { withPayload } from '@payloadcms/next/withPayload'

const isDev = process.env.NODE_ENV === 'development'

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
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
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

              isDev
                ? `script-src 'self' 'unsafe-inline' 'unsafe-eval'`
                : `script-src 'self' 'unsafe-inline'`,

              `style-src 'self' 'unsafe-inline' https://fonts.googleapis.com`,

              `img-src 'self' data: blob: http://localhost:3000 https://res.cloudinary.com https://cdn.simpleicons.org`,

              `font-src 'self' data: https://fonts.gstatic.com`,

              isDev
                ? `connect-src 'self' ws: wss: https://res.cloudinary.com`
                : `connect-src 'self' https://res.cloudinary.com`,

              `media-src 'self' https://res.cloudinary.com`,

              `frame-src 'none'`,
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
