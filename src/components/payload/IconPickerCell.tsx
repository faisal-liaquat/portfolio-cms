// src/components/payload/IconPickerCell.tsx
'use client'

import React from 'react'

interface CellProps {
  cellData?: unknown
}

export const IconPickerCell = ({ cellData }: CellProps) => {
  const slug = typeof cellData === 'string' ? cellData : undefined
  if (!slug) return <span style={{ color: 'var(--theme-elevation-400)', fontSize: 12 }}>—</span>

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt={slug}
      width={20}
      height={20}
      style={{ objectFit: 'contain', display: 'block' }}
      onError={(e) => {
        ;(e.target as HTMLImageElement).style.display = 'none'
      }}
    />
  )
}

export default IconPickerCell
