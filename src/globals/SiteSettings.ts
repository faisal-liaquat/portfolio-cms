import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access/publicRead'
import { revalidateGlobal } from '@/hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  access: {
    read: () => true,
    update: adminOnly,
  },
  hooks: {
    afterChange: [revalidateGlobal],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Your Name',
      required: true,
      defaultValue: 'Faisal Liaquat',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline',
      defaultValue: 'Full-Stack Developer',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Availability Status',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Busy', value: 'busy' },
        { label: 'Open to offers', value: 'open to offers' },
      ],
      defaultValue: 'available',
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      defaultValue: 'Pakistan',
    },
    {
      name: 'timezone',
      type: 'text',
      label: 'Timezone',
      defaultValue: 'PKT',
    },
    {
      name: 'navVersion',
      type: 'text',
      label: 'Nav Version Tag',
      defaultValue: 'v1.0',
      admin: {
        description: 'Small version label shown in nav (e.g. v1.0)',
      },
    },
    {
      name: 'lastCommit',
      type: 'text',
      label: 'Last Commit Hash (short)',
      defaultValue: 'a4f3c1',
      admin: {
        description: '6-char git hash shown in nav. Update manually or via CI.',
      },
    },
    {
      name: 'githubUrl',
      type: 'text',
      label: 'GitHub URL',
    },
    {
      name: 'linkedinUrl',
      type: 'text',
      label: 'LinkedIn URL',
    },
    {
      name: 'readcvUrl',
      type: 'text',
      label: 'Read.cv URL',
    },
    {
      name: 'nowBarChips',
      type: 'array',
      label: 'Now Bar Tech Chips',
      admin: {
        description: 'Tech chips shown in the Now Bar strip (e.g. TypeScript, Next.js)',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Chip Label',
          required: true,
        },
      ],
    },
  ],
}
