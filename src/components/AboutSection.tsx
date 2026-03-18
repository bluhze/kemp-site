'use client'

import Image from 'next/image'
import { StaggerContainer, StaggerItem } from './ScrollReveal'

export function AboutSection() {
  return (
    <section className="py-24 overflow-hidden" style={{ backgroundColor: '#d4a124' }}>
      <StaggerContainer className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-[35fr_65fr] gap-12 md:gap-16 items-center" staggerDelay={0.1}>
        <StaggerItem className="flex justify-center md:justify-end">
          <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden shrink-0">
            <div
              className="absolute -inset-[5px] rounded-full animate-gradient-border"
              style={{
                background: 'conic-gradient(from 0deg, #d4a124, #121212, #e8c04a, #d4a124)',
              }}
            />
            <div className="absolute inset-[5px] z-10 rounded-full overflow-hidden">
              <Image
                src="/about-avatar-static.png"
                alt="The Kempire"
                width={256}
                height={256}
                className="w-full h-full object-cover rounded-full object-top"
              />
            </div>
          </div>
        </StaggerItem>
        <StaggerItem className="flex flex-col md:items-start md:text-left text-center">
          <h3 className="font-sans font-bold text-sm tracking-[0.3em] uppercase text-white/90 mb-4">You&apos;ve Now Entered</h3>
          <h2 className="font-display text-5xl font-normal tracking-wider text-white mb-8 uppercase">THE KEMPIRE</h2>
          <p className="text-xl text-white/90 font-light leading-relaxed mb-8 max-w-xl text-balance">
            Your #1 source for Pop Culture News in Music, Entertainment, Reality TV and more. See what you have been missing, follow me on my social media for more and don&apos;t be afraid to share!
          </p>
          <div className="flex items-center gap-2">
            <span className="w-8 h-px bg-white/70" />
            <span className="font-bold tracking-widest text-sm uppercase text-white">Kempire</span>
            <span className="w-8 h-px bg-white/70" />
          </div>
        </StaggerItem>
      </StaggerContainer>
    </section>
  )
}
