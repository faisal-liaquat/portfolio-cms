import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'cdn.simpleicons.org' },
    ],
  },
}

export default withPayload(nextConfig)
