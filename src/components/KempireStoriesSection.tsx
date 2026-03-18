'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { NewsletterForm } from './NewsletterForm'

interface KempireArticle {
  title: string
  description: string
  url: string
}

function ArticleSkeleton({ featured }: { featured?: boolean }) {
  if (featured) {
    return (
      <article className="lg:col-span-7 animate-pulse">
        <div className="aspect-[4/3] bg-zinc-200 rounded mb-6" />
        <div className="h-4 bg-zinc-200 rounded w-1/3 mb-4" />
        <div className="h-12 bg-zinc-200 rounded w-full mb-6" />
        <div className="h-4 bg-zinc-200 rounded w-16 mb-6" />
        <div className="space-y-2">
          <div className="h-4 bg-zinc-200 rounded w-full" />
          <div className="h-4 bg-zinc-200 rounded w-full" />
          <div className="h-4 bg-zinc-200 rounded w-2/3" />
        </div>
      </article>
    )
  }
  return (
    <article className="grid grid-cols-3 gap-6 items-center animate-pulse">
      <div className="col-span-1 aspect-square bg-zinc-200 rounded" />
      <div className="col-span-2 space-y-3">
        <div className="h-3 bg-zinc-200 rounded w-16" />
        <div className="h-5 bg-zinc-200 rounded w-full" />
        <div className="h-4 bg-zinc-200 rounded w-full" />
      </div>
    </article>
  )
}

export function KempireStoriesSection() {
  const [articles, setArticles] = useState<KempireArticle[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/kempire')
      .then((res) => res.json())
      .then((data) => {
        setArticles(Array.isArray(data) ? data : [])
      })
      .catch(() => setArticles([]))
      .finally(() => setLoading(false))
  }, [])

  const featured = articles[0]
  const sidebar = articles.slice(1, 4)

  return (
    <section className="py-24 max-w-[1440px] mx-auto px-6">
      <div className="flex items-center justify-between mb-12 border-b border-zinc-200 pb-4">
        <h2 className="font-serif text-3xl font-bold text-zinc-900">Latest Stories</h2>
        <a
          href="https://thekempire.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold uppercase tracking-wider text-kempire-gold hover:text-zinc-900 transition flex items-center gap-1"
        >
          View All <i className="ph-bold ph-arrow-right" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {loading ? (
          <>
            <ArticleSkeleton featured />
            <div className="lg:col-span-5 flex flex-col gap-10 lg:pl-8 lg:border-l border-zinc-200">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <ArticleSkeleton />
                  {i < 3 && <div className="w-full h-px bg-zinc-100 mt-10" />}
                </div>
              ))}
            </div>
          </>
        ) : (
          <>
            {featured && (
              <article className="lg:col-span-7 group cursor-pointer hover-lift flex flex-col">
                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative w-full aspect-[4/3] overflow-hidden mb-6 bg-zinc-100"
                >
                  <Image
                    src="https://images.unsplash.com/photo-1588514528340-e2ff01c801e8?q=80&w=1200&auto=format&fit=crop"
                    alt={featured.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    unoptimized
                  />
                  <div className="absolute top-4 left-4 bg-white px-3 py-1 text-xs font-bold uppercase tracking-wider text-zinc-900">
                    Pop Culture
                  </div>
                </a>
                <div className="flex-grow flex flex-col justify-center pr-8">
                  <div className="flex items-center gap-3 mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    <span>By The Kempire</span>
                    <span className="w-1 h-1 rounded-full bg-zinc-300" />
                    <span>From thekempire.com</span>
                  </div>
                  <a href={featured.url} target="_blank" rel="noopener noreferrer">
                    <h3 className="font-serif text-4xl md:text-5xl font-bold leading-tight mb-6 group-hover:text-kempire-gold transition">
                      {featured.title}
                    </h3>
                  </a>
                  <div className="w-16 h-1 bg-kempire-gold mb-6" />
                  <p className="text-zinc-600 text-lg leading-relaxed line-clamp-3">
                    {featured.description}
                  </p>
                </div>
              </article>
            )}

            <div className="lg:col-span-5 flex flex-col gap-10 lg:pl-8 lg:border-l border-zinc-200">
              {sidebar.map((article, index) => (
                <div key={article.title}>
                  <article className="group cursor-pointer">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="grid grid-cols-3 gap-6 items-center"
                    >
                      <div className="col-span-1 relative aspect-video overflow-hidden bg-zinc-100 rounded-sm">
                        <Image
                          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop"
                          alt={article.title}
                          fill
                          className="object-cover transition duration-500 group-hover:scale-105"
                          sizes="150px"
                          unoptimized
                        />
                      </div>
                      <div className="col-span-2">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-kempire-gold block mb-2">
                          Story
                        </span>
                        <h4 className="font-serif text-xl font-bold leading-snug mb-3 group-hover:text-zinc-600 transition line-clamp-2">
                          {article.title}
                        </h4>
                        <div className="w-8 h-0.5 bg-kempire-gold/50 mb-3" />
                        <p className="text-zinc-500 text-sm line-clamp-2">
                          {article.description}
                        </p>
                      </div>
                    </a>
                  </article>
                  {index < sidebar.length - 1 && (
                    <div className="w-full h-px bg-zinc-100 mt-10" />
                  )}
                </div>
              ))}
              <div className="w-full h-px bg-zinc-100" />
              <NewsletterForm />
            </div>
          </>
        )}
      </div>
    </section>
  )
}
