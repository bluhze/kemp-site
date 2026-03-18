'use client'

import { ScrollReveal } from './ScrollReveal'
import { HeroSection } from './HeroSection'
import { LatestStoriesSection } from './LatestStoriesSection'
import { TikTokSection } from './TikTokSection'
import { KempireRadioBanner } from './KempireRadioBanner'
import { AboutSection } from './AboutSection'
import { ShopBanner } from './ShopBanner'

export function AnimatedPageContent() {
  return (
    <main className="overflow-x-hidden">
      <HeroSection />
      <ScrollReveal delay={0.1} duration={0.9}>
        <AboutSection />
      </ScrollReveal>
      <ScrollReveal delay={0.1} duration={0.8}>
        <LatestStoriesSection />
      </ScrollReveal>
      <ScrollReveal direction="left" delay={0.2} duration={0.7}>
        <KempireRadioBanner />
      </ScrollReveal>
      <ScrollReveal delay={0.1} duration={0.8}>
        <TikTokSection />
      </ScrollReveal>
      <ScrollReveal direction="right" delay={0.2} duration={0.7}>
        <ShopBanner />
      </ScrollReveal>
    </main>
  )
}
