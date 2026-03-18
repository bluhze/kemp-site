'use client'

import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-white text-zinc-900 h-[200px] flex items-center justify-center">
      <div className="max-w-[1440px] mx-auto px-6 flex flex-col items-center text-center gap-4">
        <Image
          src="/logo-footer.png"
          alt="KEMPIRE - King of Pop Culture"
          width={180}
          height={64}
          className="h-10 w-auto object-contain"
        />

        <div className="flex gap-6 text-zinc-600 justify-center">
          <a href="#" className="hover:text-kempire-gold transition" aria-label="YouTube"><i className="ph-fill ph-youtube-logo text-2xl" /></a>
          <a href="#" className="hover:text-kempire-gold transition" aria-label="TikTok"><i className="ph-fill ph-tiktok-logo text-2xl" /></a>
          <a href="#" className="hover:text-kempire-gold transition" aria-label="Twitter"><i className="ph-fill ph-twitter-logo text-2xl" /></a>
          <a href="#" className="hover:text-kempire-gold transition" aria-label="Instagram"><i className="ph-fill ph-instagram-logo text-2xl" /></a>
          <a href="#" className="hover:text-kempire-gold transition" aria-label="Facebook"><i className="ph-fill ph-facebook-logo text-2xl" /></a>
        </div>

        <div className="flex items-center justify-center gap-4 flex-wrap text-xs text-zinc-500 font-medium tracking-wide">
          <span>© 2026 The Kempire</span>
          <span className="w-1 h-1 bg-zinc-400 rounded-full" />
          <a href="#" className="hover:text-zinc-900 transition">Privacy Policy</a>
          <span className="w-1 h-1 bg-zinc-400 rounded-full" />
          <span>Site by Komposition</span>
        </div>
      </div>
    </footer>
  )
}
