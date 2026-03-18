'use client'

import { useEffect, useState } from 'react'

function TikTokEmbed({ videoId }: { videoId: string }) {
  const embedUrl = `https://www.tiktok.com/player/v1/${videoId}`
  return (
    <div className="flex justify-center">
      <iframe
        src={embedUrl}
        width="325"
        height="575"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={`TikTok video ${videoId}`}
        className="rounded-lg max-w-full"
      />
    </div>
  )
}

function TikTokSkeleton() {
  return (
    <div className="relative w-full aspect-[9/16] max-w-[320px] mx-auto bg-zinc-200 rounded-lg animate-pulse" />
  )
}

export function TikTokSection() {
  const [videoIds, setVideoIds] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/tiktok')
      .then((res) => res.json())
      .then((data) => {
        setVideoIds(Array.isArray(data) ? data : [])
      })
      .catch(() => setVideoIds([]))
      .finally(() => setLoading(false))
  }, [])


  return (
    <section className="py-24 bg-kempire-gray">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex items-center justify-between mb-12 border-b border-zinc-200 pb-4">
          <h2 className="font-display text-3xl font-normal tracking-wide text-zinc-900 uppercase">Latest on TikTok</h2>
          <a
            href="https://www.tiktok.com/@thekempire"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold uppercase tracking-wider text-kempire-gold hover:text-zinc-900 transition flex items-center gap-1"
          >
            View Profile <i className="ph-bold ph-arrow-right" />
          </a>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <TikTokSkeleton key={i} />
            ))}
          </div>
        ) : videoIds.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {videoIds.map((id) => (
              <TikTokEmbed key={id} videoId={id} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-zinc-500 mb-4">Unable to load TikTok videos.</p>
            <a
              href="https://www.tiktok.com/@thekempire"
              target="_blank"
              rel="noopener noreferrer"
              className="text-kempire-gold font-semibold hover:underline"
            >
              Visit @thekempire on TikTok
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
