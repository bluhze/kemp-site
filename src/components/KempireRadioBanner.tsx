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
        <StaggerItem>
          <button className="border-2 border-white text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#d4a124] transition">
            Listen Now
          </button>
        </StaggerItem>
      </StaggerContainer>
    </section>
  )
}
