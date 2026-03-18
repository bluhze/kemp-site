import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-barlow)', 'sans-serif'],
        display: ['var(--font-bebas)', 'sans-serif'],
        serif: ['var(--font-barlow)', 'serif'],
      },
      colors: {
        kempire: {
          gold: '#D4AF37',
          dark: '#121212',
          gray: '#F5F5F7'
        }
      }
    },
  },
  plugins: [],
}

export default config
