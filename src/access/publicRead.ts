// src/access/publicRead.ts
import type { AccessArgs } from 'payload'

// Public read, admin write
export const publicRead = (): boolean => true

// Must be logged in
export const adminOnly = ({ req: { user } }: AccessArgs): boolean => Boolean(user)

// Absolute lock — nobody can do this (used to block user creation/deletion)
export const nobody = (): boolean => false
