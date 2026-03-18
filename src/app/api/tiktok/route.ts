import { NextResponse } from 'next/server'

const TIKTOK_USERNAME = 'thekempire'
const PROFILE_URL = `https://www.tiktok.com/@${TIKTOK_USERNAME}`

function extractVideoIdsFromHtml(html: string): string[] {
  const ids: string[] = []
  // TikTok video IDs are 19 digits; look for video URLs in page
  const videoUrlMatches = html.matchAll(/tiktok\.com\/@[\w.]+\/video\/(\d{19})/g)
  for (const match of videoUrlMatches) {
    if (match[1] && !ids.includes(match[1])) {
      ids.push(match[1])
    }
  }
  // Fallback: look for 19-digit IDs in JSON-like structures (common in TikTok's hydrated data)
  if (ids.length === 0) {
    const longIds = html.match(/\d{19}/g) || []
    const seen = new Set<string>()
    for (const id of longIds) {
      if (!seen.has(id) && ids.length < 4) {
        seen.add(id)
        ids.push(id)
      }
    }
  }
  return ids.slice(0, 4)
}

export async function GET() {
  // Allow manual override via env
  const envIds = process.env.TIKTOK_VIDEO_IDS
  if (envIds) {
    const ids = envIds.split(',').map((id) => id.trim()).filter(Boolean)
    if (ids.length > 0) {
      return NextResponse.json(ids.slice(0, 4))
    }
  }

  try {
    const res = await fetch(PROFILE_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html',
      },
      next: { revalidate: 3600 },
    })

    const html = await res.text()
    const ids = extractVideoIdsFromHtml(html)
    if (ids.length > 0) {
      return NextResponse.json(ids)
    }
  } catch (error) {
    console.error('TikTok fetch error:', error)
  }

  // Fallback: static IDs from @thekempire (update periodically if needed)
  const fallbackIds = [
    '7078299661441702406',
    '7078299661806606854',
    '7078299662016322054',
    '7078299662544804357',
  ]
  return NextResponse.json(fallbackIds)
}
