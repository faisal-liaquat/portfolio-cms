// src/components/payload/IconPickerField.tsx
'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import { useField, useFormFields } from '@payloadcms/ui'
import type { TextFieldClientComponent } from 'payload'
import { ICON_REGISTRY, REGISTRY_CATEGORIES, type IconEntry } from '@/lib/iconRegistry'

// ── Inline styles (no external CSS file needed) ────────────────────────
const S = {
  wrap: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--theme-text)',
    marginBottom: 2,
  },
  preview: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '10px 14px',
    background: 'var(--theme-elevation-50)',
    border: '1px solid var(--theme-elevation-150)',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'border-color 0.15s',
  },
  previewImg: {
    width: 24,
    height: 24,
    objectFit: 'contain' as const,
  },
  previewName: {
    flex: 1,
    fontSize: 14,
    color: 'var(--theme-text)',
  },
  previewSlug: {
    fontSize: 12,
    color: 'var(--theme-elevation-600)',
    fontFamily: 'monospace',
  },
  chevron: {
    fontSize: 12,
    color: 'var(--theme-elevation-600)',
  },
  panel: {
    border: '1px solid var(--theme-elevation-150)',
    borderRadius: 8,
    background: 'var(--theme-elevation-0)',
    boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
    overflow: 'hidden',
    zIndex: 100,
  },
  searchRow: {
    padding: '10px 12px',
    borderBottom: '1px solid var(--theme-elevation-100)',
    display: 'flex',
    gap: 8,
  },
  searchInput: {
    flex: 1,
    padding: '7px 10px',
    fontSize: 13,
    border: '1px solid var(--theme-elevation-150)',
    borderRadius: 6,
    background: 'var(--theme-elevation-50)',
    color: 'var(--theme-text)',
    outline: 'none',
  },
  catRow: {
    display: 'flex',
    gap: 6,
    padding: '8px 12px',
    borderBottom: '1px solid var(--theme-elevation-100)',
    overflowX: 'auto' as const,
    flexWrap: 'nowrap' as const,
  },
  catBtn: (active: boolean) => ({
    padding: '3px 10px',
    borderRadius: 20,
    border: '1px solid var(--theme-elevation-200)',
    background: active ? 'var(--theme-success-500)' : 'var(--theme-elevation-50)',
    color: active ? '#fff' : 'var(--theme-text)',
    fontSize: 11,
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    transition: 'all 0.15s',
  }),
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
    gap: 4,
    padding: 10,
    maxHeight: 280,
    overflowY: 'auto' as const,
  },
  tile: (selected: boolean) => ({
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    padding: '10px 4px',
    borderRadius: 8,
    border: selected
      ? '2px solid var(--theme-success-500)'
      : '1px solid var(--theme-elevation-100)',
    background: selected ? 'var(--theme-elevation-100)' : 'transparent',
    cursor: 'pointer',
    transition: 'all 0.15s',
  }),
  tileImg: {
    width: 26,
    height: 26,
    objectFit: 'contain' as const,
  },
  tileName: {
    fontSize: 10,
    color: 'var(--theme-text)',
    textAlign: 'center' as const,
    lineHeight: 1.2,
    maxWidth: 72,
    wordBreak: 'break-word' as const,
  },
  empty: {
    padding: 24,
    textAlign: 'center' as const,
    color: 'var(--theme-elevation-600)',
    fontSize: 13,
  },
  clearBtn: {
    padding: '4px 10px',
    fontSize: 12,
    border: '1px solid var(--theme-elevation-200)',
    borderRadius: 6,
    background: 'transparent',
    color: 'var(--theme-elevation-600)',
    cursor: 'pointer',
  },
}

// ── Component ──────────────────────────────────────────────────────────
export const IconPickerField: TextFieldClientComponent = ({ path }) => {
  const { value: slugValue, setValue: setSlug } = useField<string>({ path: 'iconSlug' })
  const { value: colorValue, setValue: setColor } = useField<string>({ path: 'iconColor' })

  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const panelRef = useRef<HTMLDivElement>(null)

  // Close panel on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [open])

  const currentEntry = ICON_REGISTRY.find((e) => e.slug === slugValue)

  const filtered = ICON_REGISTRY.filter((entry) => {
    const matchCat = activeCategory === 'All' || entry.category === activeCategory
    const matchSearch =
      !search ||
      entry.name.toLowerCase().includes(search.toLowerCase()) ||
      entry.slug.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const handleSelect = useCallback(
    (entry: IconEntry) => {
      setSlug(entry.slug)
      setColor(entry.color)
      setOpen(false)
      setSearch('')
    },
    [setSlug, setColor],
  )

  const handleClear = useCallback(() => {
    setSlug('')
    setColor('')
  }, [setSlug, setColor])

  return (
    <div style={S.wrap}>
      <div style={S.label}>Icon</div>

      {/* Preview / Trigger button */}
      <div
        style={S.preview}
        onClick={() => setOpen((v) => !v)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && setOpen((v) => !v)}
      >
        {currentEntry ? (
          <>
            <img
              src={`https://cdn.simpleicons.org/${currentEntry.slug}/${currentEntry.color.replace('#', '')}`}
              alt={currentEntry.name}
              style={S.previewImg}
              onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
            />
            <span style={S.previewName}>{currentEntry.name}</span>
            <span style={S.previewSlug}>{currentEntry.slug}</span>
          </>
        ) : (
          <span style={{ ...S.previewName, color: 'var(--theme-elevation-600)' }}>
            Click to choose an icon…
          </span>
        )}
        <span style={S.chevron}>{open ? '▲' : '▼'}</span>
      </div>

      {/* Dropdown panel */}
      {open && (
        <div style={S.panel} ref={panelRef}>
          {/* Search + Clear */}
          <div style={S.searchRow}>
            <input
              style={S.searchInput}
              placeholder="Search icon name or slug…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            {slugValue && (
              <button style={S.clearBtn} onClick={handleClear} type="button">
                Clear
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div style={S.catRow}>
            {['All', ...REGISTRY_CATEGORIES].map((cat) => (
              <button
                key={cat}
                style={S.catBtn(activeCategory === cat)}
                onClick={() => setActiveCategory(cat)}
                type="button"
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Icon grid */}
          <div style={S.grid}>
            {filtered.length === 0 ? (
              <div style={{ ...S.empty, gridColumn: '1/-1' }}>No icons match "{search}"</div>
            ) : (
              filtered.map((entry) => (
                <div
                  key={`${entry.slug}-${entry.name}`}
                  style={S.tile(entry.slug === slugValue && entry.name === currentEntry?.name)}
                  onClick={() => handleSelect(entry)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleSelect(entry)}
                  title={`${entry.name} — ${entry.slug}`}
                >
                  <img
                    src={`https://cdn.simpleicons.org/${entry.slug}/${entry.color.replace('#', '')}`}
                    alt={entry.name}
                    style={S.tileImg}
                    onError={(e) => {
                      ;(e.target as HTMLImageElement).src =
                        `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><rect width='24' height='24' rx='4' fill='%23666'/><text x='12' y='16' text-anchor='middle' font-size='10' fill='white'>${entry.name.slice(0, 2)}</text></svg>`
                    }}
                  />
                  <span style={S.tileName}>{entry.name}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Hidden native inputs so Payload tracks the values */}
      <div style={{ display: 'none' }}>
        <span>slug: {slugValue}</span>
        <span>color: {colorValue}</span>
      </div>
    </div>
  )
}

export default IconPickerField