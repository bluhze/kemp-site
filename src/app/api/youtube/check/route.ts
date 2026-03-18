import { NextRequest, NextResponse } from 'next/server'

const KEMPIRE_CHANNEL_ID = 'UCXgUrYSScF2wKhMpru-u-Eg'

interface MonitorResponse {
  hasNewVideo: boolean
  video: {
    id: string
    title: string
    thumbnail: string
    publishedAt: string
    url: string
    embedUrl: string
  } | null
  error?: string
}

function parseLatestVideoFromRss(xml: string): { id: string; title: string; publishedAt: string } | null {
  const entryMatch = xml.match(/<entry>([\s\S]*?)<\/entry>/)
  if (!entryMatch) return null

  const entry = entryMatch[1]
  const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)
  const titleMatch = entry.match(/<title>([^<]+)<\/title>/)
  const publishedMatch = entry.match(/<published>([^<]+)<\/published>/)

  if (!videoIdMatch) return null

  return {
    id: videoIdMatch[1],
    title: titleMatch ? titleMatch[1].replace(/&amp;/g, '&').replace(/&#39;/g, "'") : '',
    publishedAt: publishedMatch ? publishedMatch[1] : '',
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lastSeenVideoId = searchParams.get('lastSeenVideoId') ?? ''
  const channelId = searchParams.get('channelId') ?? KEMPIRE_CHANNEL_ID

  const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`

  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 300 },
    })

    if (!res.ok) {
      return NextResponse.json({
        hasNewVideo: false,
        video: null,
        error: 'fetch_failed',
      } satisfies MonitorResponse)
    }

    const xml = await res.text()
    const latest = parseLatestVideoFromRss(xml)

    if (!latest) {
      return NextResponse.json({
        hasNewVideo: false,
        video: null,
      } satisfies MonitorResponse)
    }

    if (lastSeenVideoId && latest.id === lastSeenVideoId) {
      return NextResponse.json({
        hasNewVideo: false,
        video: null,
      } satisfies MonitorResponse)
    }

    return NextResponse.json({
      hasNewVideo: true,
      video: {
        id: latest.id,
        title: latest.title,
        thumbnail: `https://img.youtube.com/vi/${latest.id}/hqdefault.jpg`,
        publishedAt: latest.publishedAt,
        url: `https://www.youtube.com/watch?v=${latest.id}`,
        embedUrl: `https://www.youtube.com/embed/${latest.id}`,
      },
    } satisfies MonitorResponse)
  } catch (error) {
    console.error('YouTube check error:', error)
    return NextResponse.json({
      hasNewVideo: false,
      video: null,
      error: 'fetch_failed',
    } satisfies MonitorResponse)
  }
}
