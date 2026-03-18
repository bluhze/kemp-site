'use client'

import Image from 'next/image'
import { StaggerContainer, StaggerItem } from './ScrollReveal'

const products = [
  { src: '/shop-tshirt.png', name: 'Are You OK?! T-Shirt', price: 'TBD' },
  { src: '/shop-hat.png', name: 'Are You OK?! Snapback Hat', price: 'TBD' },
  { src: '/shop-sweatshirt.png', name: 'Are You OK?! Sweatshirt', price: 'TBD' },
  { src: '/shop-mug.png', name: 'Are You OK?! Mug', price: 'TBD' },
]

export function ShopBanner() {
  return (
    <section className="border-t border-zinc-100 overflow-hidden" style={{ backgroundColor: '#d4a124' }}>
      <StaggerContainer className="max-w-[1440px] mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8" staggerDelay={0.08}>
        <StaggerItem className="flex items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
            <i className="ph ph-shopping-bag text-3xl text-white" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-normal tracking-wide text-white uppercase">Shop The Kempire Merch</h3>
            <p className="text-white/90">Support the channel and look good doing it.</p>
          </div>
        </StaggerItem>
        <StaggerItem>
          <button className="border-2 border-white text-white px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-white hover:text-[#d4a124] transition">
            Visit Store
          </button>
        </StaggerItem>
      </StaggerContainer>

      <div className="max-w-[1440px] mx-auto px-6 pb-16">
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.1}>
          {products.map((product) => (
            <StaggerItem key={product.src} className="group">
              <a
                href="#"
                className="block rounded-lg overflow-hidden hover:opacity-95 transition relative"
              >
                <div
                  className="absolute -inset-[5px] rounded-lg animate-gradient-border"
                  style={{
                    background: 'conic-gradient(from 0deg, #d4a124, #121212, #e8c04a, #d4a124)',
                  }}
                />
                <div className="relative z-10 m-[5px] rounded-md bg-white overflow-hidden">
                  <div className="relative aspect-square bg-white">
                    <Image
                      src={product.src}
                      alt={product.name}
                      fill
                      className="object-contain p-6"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  </div>
                  <div className="p-4 text-center border-t border-zinc-200">
                    <p className="font-display text-lg text-zinc-900 uppercase tracking-wide">{product.name}</p>
                    <p className="text-kempire-gold text-sm font-semibold mt-1">{product.price}</p>
                  </div>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}
