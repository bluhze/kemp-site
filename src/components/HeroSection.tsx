'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

// Replace with a real tweet URL from @thekempire to display
const TWEET_URL = 'https://x.com/thekempire/status/1234567890123456789'

function TweetEmbed() {
  useEffect(() => {
    if (document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) return
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div className="hidden lg:block w-full max-w-[400px] [&_.twitter-tweet]:!max-w-full">
      <blockquote className="twitter-tweet" data-dnt="true" data-theme="dark">
        <a href={TWEET_URL}>Tweet from @thekempire</a>
      </blockquote>
    </div>
  )
}

export function HeroSection() {
  return (
    <section className="relative w-full bg-kempire-dark h-[100vh] flex items-end justify-center group cursor-pointer overflow-hidden">
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition duration-700 ease-out"
        >
          <source src="/kempreel.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-kempire-dark via-kempire-dark/50 to-transparent" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <motion.div
        className="relative z-10 max-w-[1440px] mx-auto px-6 w-full flex flex-col lg:flex-row items-end justify-between gap-8 pb-16"
        initial={false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <TweetEmbed />
        <div className="max-w-2xl flex flex-col items-end text-right w-full lg:w-auto">
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/icon.png"
              alt="KEMPIRE"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
          </div>

          <p className="font-display text-3xl md:text-4xl lg:text-5xl font-normal tracking-wide leading-[1.2] mb-6 text-balance hero-text-gradient uppercase">
            Your #1 source for Pop Culture News in Music, Entertainment, Reality TV and more.
          </p>

          <div className="flex items-center justify-end gap-6 mt-8">
            <button className="bg-kempire-gold hover:bg-white hover:text-kempire-dark text-kempire-dark px-8 py-4 font-bold uppercase tracking-wider text-sm transition flex items-center gap-2 rounded-sm">
              <i className="ph-fill ph-play" /> Watch Now
            </button>
            <a href="#" className="flex items-center gap-3 text-white hover:text-zinc-300 transition group/sub">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/sub:bg-red-600 transition">
                <i className="ph-fill ph-bell text-lg" />
              </div>
              <span className="font-semibold text-sm uppercase tracking-wide">Subscribe on YouTube</span>
            </a>
            <a href="#" className="flex items-center gap-3 text-white hover:text-zinc-300 transition group/sub">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover/sub:bg-[#1DA1F2] transition">
                <i className="ph-fill ph-twitter-logo text-lg" />
              </div>
              <span className="font-semibold text-sm uppercase tracking-wide">Follow on Twitter</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
