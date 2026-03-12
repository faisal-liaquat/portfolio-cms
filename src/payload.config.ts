import * as dotenv from 'dotenv'
import { resolve } from 'path'
dotenv.config({ path: resolve(process.cwd(), '.env.local') })

import { postgresAdapter } from '@payloadcms/db-postgres'
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Projects } from './collections/Projects'
import { Skills } from './collections/Skills'
import { Experience } from './collections/Experience'

import { SiteSettings } from './globals/SiteSettings'
import { Hero } from './globals/Hero'
import { NowBar } from './globals/NowBar'
import { About } from './globals/About'
import { Contact } from './globals/Contact'

import { cloudinaryAdapter } from './lib/cloudinaryAdapter'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const hasCloudinary =
  !!process.env.CLOUDINARY_CLOUD_NAME &&
  !!process.env.CLOUDINARY_API_KEY &&
  !!process.env.CLOUDINARY_API_SECRET

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

// Build allowed origins — always include both www and non-www variants
const allowedOrigins = [
  serverURL,
  'http://localhost:3000',
  'https://faisal-liaquat.com',
  'https://www.faisal-liaquat.com',
]

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: '— Portfolio CMS',
    },
  },
  collections: [Users, Media, Projects, Skills, Experience],
  globals: [SiteSettings, Hero, NowBar, About, Contact],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  serverURL,
  cors: allowedOrigins,
  csrf: allowedOrigins,
  plugins: hasCloudinary
    ? [
        cloudStoragePlugin({
          collections: {
            media: {
              adapter: cloudinaryAdapter(),
              disableLocalStorage: true,
            },
          },
        }),
      ]
    : [],
  upload: {
    limits: {
      fileSize: 10000000,
    },
  },
})
