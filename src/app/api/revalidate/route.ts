import { revalidatePath, revalidateTag } from 'next/cache'
import { NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  // Verify the secret so random people can't bust your cache
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }

  const body = await req.json().catch(() => ({}))
  const tag = body.tag as string | undefined
  const path = body.path as string | undefined

  try {
    if (tag) {
      revalidateTag(tag)
    }
    if (path) {
      revalidatePath(path)
    }
    // Always revalidate the homepage
    revalidatePath('/')

    return Response.json({
      revalidated: true,
      tag,
      path,
      now: Date.now(),
    })
  } catch (err) {
    return Response.json({ message: 'Error revalidating', error: String(err) }, { status: 500 })
  }
}

// Allow GET for easy manual testing: /api/revalidate?secret=xxx
export async function GET(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret')

  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath('/')

  return Response.json({ revalidated: true, now: Date.now() })
}
