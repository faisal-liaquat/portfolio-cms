import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access/publicRead'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Contact: GlobalConfig = {
  slug: 'contact',
  label: 'Contact Section',
  admin: {
    group: 'Content',
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
      name: 'eyebrow',
      type: 'text',
      label: 'Eyebrow',
      defaultValue: "04 — let's work together",
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'Got a project in mind?',
    },
    {
      name: 'subtext',
      type: 'text',
      label: 'Subtext',
      defaultValue: 'Open to freelance, collaborations & full-time roles.',
    },
    {
      name: 'email',
      type: 'email',
      label: 'Email Address',
      required: true,
      defaultValue: 'mfaisal1801@protonmail.com',
    },
    {
      name: 'responseTime',
      type: 'text',
      label: 'Response Time',
      defaultValue: '< 24h',
    },
    {
      name: 'availability',
      type: 'select',
      label: 'Availability',
      options: [
        { label: 'Open', value: 'open' },
        { label: 'Busy', value: 'busy' },
        { label: 'Closed', value: 'closed' },
      ],
      defaultValue: 'open',
    },
    {
      name: 'preferredWork',
      type: 'text',
      label: 'Preferred Work Types',
      defaultValue: 'freelance · collab · ft',
    },
  ],
}
