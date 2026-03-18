import { NextResponse } from 'next/server'

// Curated video IDs for @thekempire
const VIDEO_IDS = [
    '7617577784197631263',
    '7617583593576992030',
    '7618290635505749278',
    '7618674140630797599',
]

export async function GET() {
  // Allow override via env
  const envIds = process.env.TIKTOK_VIDEO_IDS
  if (envIds) {
    const ids = envIds.split(',').map((id) => id.trim()).filter(Boolean)
    if (ids.length > 0) {
      return NextResponse.json(ids.slice(0, 4))
    }
  }
  return NextResponse.json(VIDEO_IDS)
}
