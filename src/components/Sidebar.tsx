'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const navItems = [
  { href: '/', label: 'Home', icon: 'ph-house' },
  { href: '/watch', label: 'Watch', icon: 'ph-play-circle' },
  { href: '/podcasts', label: 'Podcasts', icon: 'ph-microphone' },
  { href: '/shop', label: 'Shop', icon: 'ph-shopping-bag' },
]

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 w-12 h-12 rounded-lg bg-kempire-dark text-white flex items-center justify-center hover:bg-zinc-800 transition"
        aria-label="Open menu"
      >
        <i className="ph ph-list text-2xl" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-40 h-full w-64 bg-kempire-dark text-white
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0
          border-r border-white/10
          ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{
          boxShadow: 'rgba(60, 64, 67, 0.3) 1px 0 2px 0, rgba(60, 64, 67, 0.15) 1px 0 3px 1px',
        }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="relative p-6 border-b border-white/10 flex justify-center">
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition text-white"
              aria-label="Close menu"
            >
              <i className="ph ph-x text-xl" />
            </button>
            <Link href="/" className="block flex justify-center" onClick={() => setMobileOpen(false)}>
              <Image
                src="/logo-sidebar.png"
                alt="KEMPIRE - King of Pop Culture"
                width={180}
                height={64}
                className="h-12 w-auto object-contain [filter:brightness(0)_invert(1)]"
              />
            </Link>
          </div>

          {/* Nav */}
          <nav className="flex-1 p-4">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium text-sm uppercase tracking-wider text-white"
                  >
                    <i className={`ph ${item.icon} text-xl`} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social & Search */}
          <div className="flex flex-col shrink-0 mt-auto p-4 border-t border-white/10 space-y-4">
              <div className="flex items-center gap-3">
                <a href="https://www.youtube.com/channel/UCXgUrYSScF2wKhMpru-u-Eg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition text-white" aria-label="YouTube">
                  <i className="ph-fill ph-youtube-logo text-xl" />
                </a>
                <a href="https://www.tiktok.com/@thekempire" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition text-white" aria-label="TikTok">
                  <i className="ph-fill ph-tiktok-logo text-xl" />
                </a>
                <a href="https://x.com/TheKempire" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition text-white" aria-label="Twitter">
                  <i className="ph-fill ph-twitter-logo text-xl" />
                </a>
                <a href="https://www.instagram.com/thekempire" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg flex items-center justify-center hover:bg-white/10 transition text-white" aria-label="Instagram">
                  <i className="ph-fill ph-instagram-logo text-xl" />
                </a>
              </div>
              <button
                className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/10 transition font-medium text-sm text-white"
                aria-label="Search"
              >
                <i className="ph ph-magnifying-glass text-xl" />
                Search
              </button>
          </div>
        </div>
      </aside>
    </>
  )
}
