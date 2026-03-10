import type { CollectionConfig } from 'payload'
import { adminOnly } from '@/access/publicRead'

export const Experience: CollectionConfig = {
  slug: 'experience',
  labels: {
    singular: 'Experience',
    plural: 'Experience',
  },
  admin: {
    group: 'Portfolio',
    defaultColumns: ['company', 'role', 'startDate', 'current'],
    useAsTitle: 'company',
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
      defaultValue: 1,
      admin: {
        description: 'Lower number = shown first',
      },
    },
    {
      name: 'company',
      type: 'text',
      label: 'Company Name',
      required: true,
    },
    {
      name: 'companyLogo',
      type: 'upload',
      relationTo: 'media',
      label: 'Company Logo',
      admin: {
        description: 'Logo shown next to the company name',
      },
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      admin: {
        description: 'e.g. Remote · Pakistan, or Lahore, Pakistan',
      },
    },
    {
      name: 'role',
      type: 'text',
      label: 'Your Role / Title',
      required: true,
    },
    {
      name: 'employmentType',
      type: 'select',
      label: 'Employment Type',
      defaultValue: 'full-time',
      options: [
        { label: 'Full-Time', value: 'full-time' },
        { label: 'Part-Time', value: 'part-time' },
        { label: 'Internship', value: 'internship' },
        { label: 'Contract', value: 'contract' },
        { label: 'Freelance', value: 'freelance' },
      ],
    },
    {
      name: 'startDate',
      type: 'text',
      label: 'Start Date',
      required: true,
      admin: {
        description: 'e.g. Dec 2025, Jul 2024',
      },
    },
    {
      name: 'endDate',
      type: 'text',
      label: 'End Date',
      admin: {
        description: 'Leave blank if currently working here',
      },
    },
    {
      name: 'current',
      type: 'checkbox',
      label: 'Currently Working Here',
      defaultValue: false,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description (optional)',
      admin: {
        description: 'Short summary of your work there',
      },
    },
  ],
}
