import type { AccessArgs } from 'payload'

// Anyone can read, only authenticated can write
export const publicRead = ({ req: { user } }: AccessArgs): boolean => {
  // For read operations this returns true (public can read)
  // For write operations the collection uses isAdmin
  return true
}

export const adminOnly = ({ req: { user } }: AccessArgs): boolean => {
  return Boolean(user)
}
