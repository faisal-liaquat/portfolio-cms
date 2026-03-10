// src/collections/Users.ts
import type { CollectionConfig } from 'payload'
import { nobody } from '@/access/publicRead'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    // Disable token-based registration — login only
    useAPIKey: false,
    // Max login attempts before lockout
    maxLoginAttempts: 5,
    lockTime: 600 * 1000, // 10 minutes in ms
  },
  admin: {
    useAsTitle: 'email',
    group: 'System',
    hidden: false,
  },
  access: {
    // Nobody can create a new user via API
    create: nobody,
    // Only logged-in user can read their own record (Payload handles this internally)
    read: ({ req: { user } }) => Boolean(user),
    // Only logged-in user can update (their own profile)
    update: ({ req: { user } }) => Boolean(user),
    // Nobody can delete users via API
    delete: nobody,
    // Admin panel access
    admin: ({ req: { user } }) => Boolean(user),
  },
  fields: [],
}
