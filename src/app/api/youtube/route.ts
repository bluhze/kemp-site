import { NextResponse } from 'next/server'

const KEMPIRE_CHANNEL_ID = 'UCXgUrYSScF2wKhMpru-u-Eg'
const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${KEMPIRE_CHANNEL_ID}`

export interface YouTubeVideo {
  videoId: string
  title: string
  description: string
  publishedAt: string
}

function parseYouTubeRss(xml: string): YouTubeVideo[] {
  const videos: YouTubeVideo[] = []
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g
  let match

  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1]
    const videoIdMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)
    const titleMatch = entry.match(/<title>([^<]+)<\/title>/)
    const publishedMatch = entry.match(/<published>([^<]+)<\/published>/)
    const descriptionMatch = entry.match(/<media:description>([^<]*)<\/media:description>/)

    if (videoIdMatch) {
      videos.push({
        videoId: videoIdMatch[1],
        title: titleMatch ? titleMatch[1].replace(/&amp;/g, '&').replace(/&#39;/g, "'") : '',
        description: descriptionMatch ? descriptionMatch[1].replace(/&amp;/g, '&').replace(/&#39;/g, "'").slice(0, 200) : '',
        publishedAt: publishedMatch ? publishedMatch[1] : '',
      })
    }
  }

  return videos.slice(0, 6)
}

export async function GET() {
  try {
    const res = await fetch(RSS_URL, {
      next: { revalidate: 3600 },
    })
    const xml = await res.text()
    const videos = parseYouTubeRss(xml)
    return NextResponse.json(videos)
  } catch (error) {
    console.error('YouTube RSS fetch error:', error)
    return NextResponse.json([], { status: 500 })
  }
}
