'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { StaggerContainer, StaggerItem } from './ScrollReveal'

interface YouTubeVideo {
  videoId: string
  title: string
  description: string
  publishedAt: string
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  if (seconds < 3600) return `${Math.floor(seconds / 60)} min ago`
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`
  return date.toLocaleDateString()
}

function VideoCardSkeleton({ featured }: { featured?: boolean }) {
  if (featured) {
    return (
      <article className="lg:col-span-7 animate-pulse">
        <div className="aspect-video bg-zinc-200 rounded mb-4" />
        <div className="h-4 bg-zinc-200 rounded w-1/3 mb-3" />
        <div className="h-10 bg-zinc-200 rounded w-full" />
      </article>
    )
  }
  return (
    <article className="grid grid-cols-3 gap-6 items-center animate-pulse">
      <div className="col-span-1 aspect-square bg-zinc-200 rounded" />
        <div className="col-span-2 space-y-3">
        <div className="h-3 bg-zinc-200 rounded w-16" />
        <div className="h-5 bg-zinc-200 rounded w-full" />
      </div>
    </article>
  )
}

function VideoCard({
  video,
  featured,
}: {
  video: YouTubeVideo
  featured?: boolean
}) {
  const [imgError, setImgError] = useState(false)
  const thumbnailUrl = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
  const youtubeUrl = `https://www.youtube.com/watch?v=${video.videoId}`

  if (featured) {
    return (
      <article className="lg:col-span-7 group cursor-pointer hover-lift flex flex-col">
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative w-full aspect-video overflow-hidden mb-4 bg-zinc-100"
        >
          {imgError ? (
            <div className="absolute inset-0 bg-kempire-dark flex items-center justify-center">
              <i className="ph-fill ph-play-circle text-kempire-gold text-6xl" />
            </div>
          ) : (
            <Image
              src={thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 66vw"
              onError={() => setImgError(true)}
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <i className="ph-fill ph-play-circle text-white text-6xl" />
          </div>
        </a>

        <div className="flex flex-col justify-center pr-8">
          <div className="flex items-center gap-3 mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            <span>By The Kempire</span>
            <span className="w-1 h-1 rounded-full bg-zinc-300" />
            <span>{formatTimeAgo(video.publishedAt)}</span>
          </div>

          <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">
            <h3 className="font-display text-3xl md:text-4xl font-normal leading-tight group-hover:text-kempire-gold transition decoration-2 decoration-kempire-gold underline-offset-4 tracking-wide">
              {video.title}
            </h3>
          </a>
        </div>
      </article>
    )
  }

  return (
    <article className="group cursor-pointer">
      <a
        href={youtubeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="grid grid-cols-3 gap-6 items-center"
      >
        <div className="col-span-1 relative aspect-video overflow-hidden bg-zinc-100 rounded-sm">
          {imgError ? (
            <div className="absolute inset-0 bg-kempire-dark flex items-center justify-center">
              <i className="ph-fill ph-play-circle text-kempire-gold text-3xl" />
            </div>
          ) : (
            <Image
              src={thumbnailUrl}
              alt={video.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="150px"
              onError={() => setImgError(true)}
              unoptimized
            />
          )}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <i className="ph-fill ph-play-circle text-white text-3xl" />
          </div>
        </div>
        <div className="col-span-2">
          <h4 className="font-display text-xl font-normal leading-snug group-hover:text-zinc-600 transition line-clamp-2 tracking-wide">
            {video.title}
          </h4>
        </div>
      </a>
    </article>
  )
}

const POLL_INTERVAL_MS = 60_000 // 1 minute

export function LatestStoriesSection() {
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/youtube')
      .then((res) => res.json())
      .then((data) => {
        setVideos(Array.isArray(data) ? data : [])
      })
      .catch(() => setVideos([]))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (videos.length === 0) return

    const lastSeenVideoId = videos[0].videoId

    const poll = () => {
      fetch(`/api/youtube/check?lastSeenVideoId=${encodeURIComponent(lastSeenVideoId)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.hasNewVideo && data.video) {
            const newVideo: YouTubeVideo = {
              videoId: data.video.id,
              title: data.video.title,
              description: '',
              publishedAt: data.video.publishedAt,
            }
            setVideos((prev) => [newVideo, ...prev.slice(0, 4)])
          }
        })
        .catch(() => {})
    }

    const interval = setInterval(poll, POLL_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [videos.length === 0 ? null : videos[0]?.videoId])

  return (
    <section className="py-24 max-w-[1440px] mx-auto px-6 bg-white">
      <div className="flex items-center justify-between mb-12 border-b border-zinc-200 pb-4">
        <h2 className="font-display text-3xl font-normal tracking-wide text-zinc-900 uppercase">Latest Videos</h2>
        <a
          href="https://www.youtube.com/@Kempire"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold uppercase tracking-wider text-kempire-gold hover:text-zinc-900 transition flex items-center gap-1"
        >
          View Channel <i className="ph-bold ph-arrow-right" />
        </a>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-end">
          <VideoCardSkeleton featured />
          <div className="lg:col-span-5 flex flex-col gap-10 lg:pl-8 lg:border-l border-zinc-200">
            {[1, 2, 3].map((i) => (
              <div key={i}>
                <VideoCardSkeleton />
                {i < 3 && <div className="w-full h-px bg-zinc-100 mt-10" />}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <StaggerContainer className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-end" staggerDelay={0.12}>
          {videos[0] && (
            <StaggerItem className="lg:col-span-7">
              <VideoCard video={videos[0]} featured />
            </StaggerItem>
          )}
          <StaggerItem className="lg:col-span-5 flex flex-col gap-10 lg:pl-8 lg:border-l border-zinc-200">
            {videos.slice(1, 5).map((video, index) => (
              <div key={video.videoId}>
                <VideoCard video={video} />
                {index < 3 && <div className="w-full h-px bg-zinc-100 mt-10" />}
              </div>
            ))}
          </StaggerItem>
        </StaggerContainer>
      )}
    </section>
  )
}
