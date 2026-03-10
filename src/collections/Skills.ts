// src/collections/Skills.ts
import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/publicRead'
import { revalidateCollection } from '@/hooks/revalidate'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'iconSlug', 'category', 'hot', 'order'],
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
    // ── Icon picker (custom UI field — no data stored here) ──────────
    {
      name: 'iconPicker',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/payload/IconPickerField#IconPickerField',
        },
      },
    },
    // ── These two fields are what actually store the data ────────────
    {
      name: 'iconSlug',
      type: 'text',
      label: 'Icon Slug',
      admin: {
        description:
          'Auto-filled by the icon picker above. You can also type a simpleicons.org slug manually.',
        components: {
          Cell: '@/components/payload/IconPickerCell#IconPickerCell',
        },
      },
    },
    {
      name: 'iconColor',
      type: 'text',
      label: 'Icon Color (hex)',
      admin: {
        description: 'Auto-filled by the icon picker. Brand hex color, e.g. #61DAFB.',
      },
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
      name: 'hot',
      type: 'checkbox',
      label: 'Currently Using (Hot)',
      defaultValue: false,
      admin: {
        description: 'Mark skills you are actively using right now.',
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
