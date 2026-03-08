import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access/publicRead'

export const NowBar: GlobalConfig = {
  slug: 'now-bar',
  label: 'Now Bar',
  admin: {
    group: 'Content',
  },
  access: {
    read: () => true,
    update: adminOnly,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      label: 'Label',
      defaultValue: 'currently building',
      admin: {
        description: 'Small prefix label (e.g. "currently building")',
      },
    },
    {
      name: 'text',
      type: 'text',
      label: 'Text',
      required: true,
      defaultValue: 'This portfolio CMS with Next.js + Payload',
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link URL (optional)',
    },
  ],
}
