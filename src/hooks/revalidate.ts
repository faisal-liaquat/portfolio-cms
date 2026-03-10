import type { CollectionAfterChangeHook, GlobalAfterChangeHook } from 'payload'

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || ''
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

async function triggerRevalidate(tag?: string) {
  // Skip silently if no secret configured
  if (!REVALIDATION_SECRET) return

  try {
    const params = new URLSearchParams({ secret: REVALIDATION_SECRET })
    if (tag) params.set('tag', tag)

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)

    const res = await fetch(`${SERVER_URL}/api/revalidate?${params}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tag, path: '/' }),
      signal: controller.signal,
    })

    clearTimeout(timeout)

    if (!res.ok) {
      console.warn(`[revalidate] Failed: ${res.status}`)
    } else {
      console.log(`[revalidate] ✓ tag="${tag ?? 'homepage'}" revalidated`)
    }
  } catch (err: any) {
    // Silently ignore connection refused (server not running = seeding or CI)
    if (err?.cause?.code === 'ECONNREFUSED' || err?.name === 'AbortError') return
    console.warn('[revalidate] Could not reach server:', err?.message)
  }
}

export const revalidateCollection: CollectionAfterChangeHook = async ({ collection }) => {
  await triggerRevalidate(collection.slug)
}

export const revalidateGlobal: GlobalAfterChangeHook = async ({ global }) => {
  await triggerRevalidate(global.slug)
}
