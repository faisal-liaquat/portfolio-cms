import type { AccessArgs } from 'payload'

export const isAdmin = ({ req: { user } }: AccessArgs): boolean => {
  return Boolean(user)
}

export const isAdminOrPublicRead = ({ req: { user } }: AccessArgs): boolean => {
  return Boolean(user)
}
