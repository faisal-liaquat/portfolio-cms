// src/access/isAdmin.ts
import type { AccessArgs } from 'payload'

export const isAdmin = ({ req: { user } }: AccessArgs): boolean => Boolean(user)

export const isAdminOrPublicRead = ({ req: { user } }: AccessArgs): boolean => Boolean(user)
