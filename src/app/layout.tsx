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
  title: 'KEMPIRE | King of Pop Culture',
  description: 'Your #1 source for Pop Culture News in Music, Entertainment, Reality TV and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${barlow.variable}`}>
      <body className="bg-white text-zinc-900 font-sans antialiased selection:bg-kempire-gold selection:text-white">
        <Script
          src="https://unpkg.com/@phosphor-icons/web"
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  )
}
