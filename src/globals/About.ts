import type { GlobalConfig } from 'payload'
import { adminOnly } from '@/access/publicRead'
import { revalidateGlobal } from '@/hooks/revalidate'

export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Section',
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
      defaultValue: '03 — person behind it',
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Heading',
      defaultValue: 'The person\nbehind the code',
    },
    {
      name: 'bio1',
      type: 'textarea',
      label: 'Bio Paragraph 1',
      defaultValue:
        "I'm Faisal — a full-stack developer based in Pakistan with a focus on building clean, performant, and purposeful web applications.",
    },
    {
      name: 'bio2',
      type: 'textarea',
      label: 'Bio Paragraph 2',
      defaultValue:
        'I care about the craft. Every project I ship is designed and engineered to work well, look good, and scale gracefully.',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Profile Photo',
    },
    {
      name: 'facts',
      type: 'array',
      label: 'Quick Facts',
      admin: {
        description: 'Key-value facts shown in the about section grid',
      },
      fields: [
        {
          name: 'key',
          type: 'text',
          required: true,
          admin: { description: 'e.g. based_in, experience, focus' },
        },
        {
          name: 'value',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'processSteps',
      type: 'array',
      label: 'Process Steps',
      admin: {
        description: 'The numbered process steps shown below the bio',
      },
      fields: [
        {
          name: 'number',
          type: 'text',
          required: true,
          admin: { description: 'e.g. 01, 02, 03' },
        },
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'desc',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
