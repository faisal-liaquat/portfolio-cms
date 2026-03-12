import type { Metadata } from 'next'
import './styles/portfolio.css'

export const metadata: Metadata = {
  title: 'Faisal Liaquat',
  description: 'Full-stack developer with a CS degree. Building things that work.',
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 160' fill='%232d3561'%3E%3Crect x='10' y='10' width='22' height='140'/%3E%3Crect x='10' y='10' width='80' height='22'/%3E%3Crect x='10' y='68' width='60' height='20'/%3E%3Cpolygon points='85,150 108,10 130,10 107,150'/%3E%3Crect x='125' y='10' width='22' height='140'/%3E%3Crect x='125' y='128' width='85' height='22'/%3E%3Cpolygon points='158,128 178,55 198,128'/%3E%3Cpolygon points='188,128 203,80 213,65 210,128' opacity='.6'/%3E%3C/svg%3E",
        type: 'image/svg+xml',
      },
    ],
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=Inter:wght@300;400;500;600&family=IBM+Plex+Mono:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
