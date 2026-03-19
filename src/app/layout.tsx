import type { Metadata } from 'next'
import Script from 'next/script'
import { Bebas_Neue, Barlow } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
})

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-barlow',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'https://thekempire.com'),
  title: 'KEMPIRE | King of Pop Culture',
  description: 'Your #1 source for Pop Culture News in Music, Entertainment, Reality TV and more.',
  openGraph: {
    title: 'KEMPIRE | King of Pop Culture',
    description: 'Your #1 source for Pop Culture News in Music, Entertainment, Reality TV and more.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KEMPIRE | King of Pop Culture',
    description: 'Your #1 source for Pop Culture News in Music, Entertainment, Reality TV and more.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${barlow.variable}`}>
      <body className="bg-white text-zinc-900 font-sans antialiased selection:bg-kempire-gold selection:text-white overflow-x-hidden">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Script
          src="https://unpkg.com/@phosphor-icons/web"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  )
}
