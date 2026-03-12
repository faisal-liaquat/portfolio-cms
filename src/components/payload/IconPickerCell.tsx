// src/components/payload/IconPickerCell.tsx
'use client'

interface CellProps {
  cellData?: unknown
  rowData?: unknown
}

export function IconPickerCell({ cellData }: CellProps) {
  const slug = typeof cellData === 'string' ? cellData : null

  if (!slug) {
    return <span style={{ color: 'var(--theme-elevation-400)', fontSize: 12 }}>—</span>
  }

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
      <img
        src={`https://cdn.simpleicons.org/${slug}`}
        alt={slug}
        width={16}
        height={16}
        style={{ objectFit: 'contain' }}
        onError={(e) => {
          ;(e.currentTarget as HTMLImageElement).style.display = 'none'
        }}
      />
      <span style={{ fontSize: 12 }}>{slug}</span>
    </span>
  )
}

export default IconPickerCell
