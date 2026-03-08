import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access/publicRead'

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
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Your Name',
      required: true,
      defaultValue: 'Faisal',
    },
    {
      name: 'tagline',
      type: 'text',
      label: 'Tagline / Title',
      defaultValue: 'Full-Stack Developer',
    },
    {
      name: 'status',
      type: 'select',
      label: 'Availability Status',
      options: [
        { label: 'Available', value: 'available' },
        { label: 'Open to Offers', value: 'open' },
        { label: 'Busy', value: 'busy' },
        { label: 'Not Available', value: 'unavailable' },
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
      label: 'Nav Version Label',
      defaultValue: 'v1.0',
      admin: {
        description: 'Small version text shown in the top navigation bar',
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
  ],
}
