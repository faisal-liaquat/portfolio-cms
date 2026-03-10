import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Faisal — Full-Stack Developer',
  description: 'Full-stack developer with a CS degree.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
