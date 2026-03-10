import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/publicRead'
import { revalidateCollection } from '@/hooks/revalidate'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'hot', 'order'],
    group: 'Portfolio',
  },
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    afterChange: [revalidateCollection],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Skill Name',
      required: true,
    },
    {
      name: 'category',
      type: 'select',
      label: 'Category',
      required: true,
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'Database', value: 'database' },
        { label: 'DevOps / Cloud', value: 'devops' },
        { label: 'Tools', value: 'tools' },
        { label: 'Languages', value: 'languages' },
        { label: 'Mobile', value: 'mobile' },
        { label: 'AI / ML', value: 'ai_ml' },
      ],
    },
    {
      name: 'iconSlug',
      type: 'text',
      label: 'Simple Icons Slug',
      admin: {
        description:
          'Slug from simpleicons.org — e.g. "react", "typescript", "nextdotjs". Used to render the brand icon automatically.',
      },
    },
    {
      name: 'iconColor',
      type: 'text',
      label: 'Icon Color (hex)',
      admin: {
        description: 'Brand color hex e.g. #61DAFB for React. Used for icon tint.',
      },
    },
    {
      name: 'hot',
      type: 'checkbox',
      label: 'Currently Using (Hot)',
      defaultValue: false,
      admin: {
        description: 'Mark skills you are actively using right now',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 99,
    },
  ],
}
