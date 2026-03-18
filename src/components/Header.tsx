import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-100 transition-all duration-300">
      <div className="max-w-[1440px] mx-auto px-6 h-20 flex items-center justify-between">
        <button className="lg:hidden text-zinc-900 hover:text-kempire-gold transition" aria-label="Menu">
          <i className="ph ph-list text-2xl" />
        </button>

        <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold tracking-wide uppercase">
          <Link href="/" className="text-zinc-900 hover:text-kempire-gold transition">Home</Link>
          <Link href="/watch" className="text-zinc-900 hover:text-kempire-gold transition">Watch</Link>
          <Link href="/podcasts" className="text-zinc-900 hover:text-kempire-gold transition">Podcasts</Link>
          <Link href="/shop" className="text-zinc-900 hover:text-kempire-gold transition">Shop</Link>
        </nav>

        <Link href="/" className="flex items-center justify-center absolute left-1/2 -translate-x-1/2 h-16">
          <Image
            src="/logo.png"
            alt="KEMPIRE - King of Pop Culture"
            width={180}
            height={64}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        <div className="flex items-center gap-5">
          <div className="hidden md:flex items-center gap-4 text-zinc-600">
            <a href="#" className="hover:text-kempire-gold transition" aria-label="YouTube"><i className="ph-fill ph-youtube-logo text-xl" /></a>
            <a href="#" className="hover:text-kempire-gold transition" aria-label="TikTok"><i className="ph-fill ph-tiktok-logo text-xl" /></a>
            <a href="#" className="hover:text-kempire-gold transition" aria-label="Twitter"><i className="ph-fill ph-twitter-logo text-xl" /></a>
            <a href="#" className="hover:text-kempire-gold transition" aria-label="Instagram"><i className="ph-fill ph-instagram-logo text-xl" /></a>
          </div>
          <div className="w-px h-6 bg-zinc-200 hidden md:block" />
          <button className="text-zinc-900 hover:text-kempire-gold transition" aria-label="Search">
            <i className="ph ph-magnifying-glass text-xl" />
          </button>
        </div>
      </div>
    </header>
  )
}
