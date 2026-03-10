import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access/publicRead'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Hero: GlobalConfig = {
  slug: 'hero',
  label: 'Hero Section',
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
      label: 'Eyebrow Text',
      defaultValue: 'available for work',
      admin: {
        description: 'Small text above the name (e.g. "available for work")',
      },
    },
    {
      name: 'firstName',
      type: 'text',
      label: 'First Name',
      required: true,
      defaultValue: 'Faisal',
    },
    {
      name: 'role',
      type: 'text',
      label: 'Role / Title',
      required: true,
      defaultValue: 'Full-Stack Developer',
    },
    {
      name: 'bio',
      type: 'textarea',
      label: 'Bio',
      required: true,
      defaultValue:
        'I build clean, performant web applications — from idea to deployment. Focused on Next.js, Node.js, and everything in between.',
    },
    {
      name: 'sysBoxLines',
      type: 'array',
      label: 'System Box Lines',
      admin: {
        description: 'Key-value lines shown in the terminal-style sys box',
      },
      fields: [
        {
          name: 'key',
          type: 'text',
          required: true,
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
        {
          name: 'highlight',
          type: 'checkbox',
          label: 'Highlight value',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'nowBarText',
      type: 'text',
      label: 'Now Bar Text',
      defaultValue: 'Building this portfolio CMS',
      admin: {
        description: 'Text in the "currently building" bar below the hero',
      },
    },
    {
      name: 'statsBar',
      type: 'array',
      label: 'Stats Bar Items',
      admin: {
        description: 'Small stats shown in the hero bottom bar (e.g. projects, experience)',
      },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: { description: 'e.g. 5+' },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'e.g. projects shipped' },
        },
      ],
    },
  ],
}
