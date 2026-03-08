import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/publicRead'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'year', 'order', 'featured'],
    group: 'Portfolio',
  },
  access: {
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'order',
      type: 'number',
      label: 'Display Order',
      defaultValue: 99,
      admin: {
        description: 'Lower number = shown first',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Featured Project',
      defaultValue: false,
      admin: {
        description: 'Show this project in the featured spotlight',
      },
    },
    {
      name: 'num',
      type: 'text',
      label: 'Project Number',
      required: true,
      admin: {
        description: 'e.g. 001, 002, 003',
      },
    },
    {
      name: 'type',
      type: 'select',
      label: 'Project Type',
      required: true,
      options: [
        { label: 'Platform', value: 'platform' },
        { label: 'Tool', value: 'tool' },
        { label: 'Full Stack', value: 'fullstack' },
        { label: 'Machine Learning', value: 'ml' },
        { label: 'Finance', value: 'finance' },
        { label: 'Mobile', value: 'mobile' },
        { label: 'Design', value: 'design' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'year',
      type: 'text',
      label: 'Year',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
    },
    {
      name: 'titleEm',
      type: 'text',
      label: 'Title Emphasis (italic part)',
      required: true,
      admin: {
        description: 'The italic/highlighted part of the project title',
      },
    },
    {
      name: 'sub',
      type: 'text',
      label: 'Subtitle',
      required: true,
      admin: {
        description: 'One-line summary shown on card',
      },
    },
    {
      name: 'desc',
      type: 'textarea',
      label: 'Description',
      required: true,
      admin: {
        description: 'Full description shown in featured view',
      },
    },
    {
      name: 'tags',
      type: 'array',
      label: 'Tech Tags',
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'liveUrl',
      type: 'text',
      label: 'Live URL',
    },
    {
      name: 'githubUrl',
      type: 'text',
      label: 'GitHub URL',
    },
    {
      name: 'visLabel',
      type: 'text',
      label: 'Visual Label',
      admin: {
        description: 'Large decorative text/emoji shown in visual area (e.g. 3D, TS, ₿)',
      },
    },
    {
      name: 'vcText',
      type: 'text',
      label: 'Visual Caption Text',
      admin: {
        description: 'Small caption under the visual (e.g. interactive · collab)',
      },
    },
    {
      name: 'architecture',
      type: 'array',
      label: 'Architecture Rows',
      admin: {
        description: 'Tech stack flow diagram rows',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Row Label',
          required: true,
          admin: {
            description: 'e.g. data, realtime, deploy',
          },
        },
        {
          name: 'boxes',
          type: 'array',
          label: 'Tech Boxes',
          fields: [
            {
              name: 'tech',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'slides',
      type: 'array',
      label: 'Image Slides',
      admin: {
        description: 'Slides shown in the featured project visual area',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Slide Label',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Slide Image',
          admin: {
            description: 'Upload a screenshot. If empty, uses color/icon fallback.',
          },
        },
        {
          name: 'color',
          type: 'text',
          label: 'Accent Color',
          admin: {
            description: 'Hex color for fallback visual (e.g. #2d3561)',
          },
        },
        {
          name: 'bg',
          type: 'text',
          label: 'Background Color',
          admin: {
            description: 'Hex color for slide background (e.g. #eaeaf8)',
          },
        },
        {
          name: 'icon',
          type: 'text',
          label: 'Fallback Icon',
          admin: {
            description: 'Symbol shown when no image uploaded',
          },
        },
      ],
    },
  ],
}
