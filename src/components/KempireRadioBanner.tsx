'use client'

import { StaggerContainer, StaggerItem } from './ScrollReveal'

export function KempireRadioBanner() {
  return (
    <section className="border-t border-zinc-100 overflow-hidden" style={{ backgroundColor: '#d4a124' }}>
      <StaggerContainer className="max-w-[1440px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8" staggerDelay={0.08}>
        <StaggerItem className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <i className="ph-fill ph-radio text-3xl text-white" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-normal tracking-wide text-white uppercase">Kempire Radio</h3>
            <p className="text-white/90">Listen to the latest episodes and pop culture talk.</p>
          </div>
        </StaggerItem>
        <StaggerItem className="flex items-center gap-4">
          <a
            href="https://www.amazon.com/Kempire-Radio/dp/B08JJPXGTP"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#d4a124] transition"
            aria-label="Listen on Amazon Music"
          >
            <i className="ph-fill ph-amazon-logo text-2xl" />
          </a>
          <a
            href="https://open.spotify.com/show/2Vc9qrpg8lucrQqWuNaThD"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-[#1DB954] hover:text-white transition"
            aria-label="Listen on Spotify"
          >
            <i className="ph-fill ph-spotify-logo text-2xl" />
          </a>
          <a
            href="https://podcasts.apple.com/us/podcast/kempire-king-of-pop-culture/id1510062385"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#d4a124] transition"
            aria-label="Listen on Apple Podcasts"
          >
            <i className="ph-fill ph-apple-podcasts-logo text-2xl" />
          </a>
        </StaggerItem>
      </StaggerContainer>
    </section>
  )
}
