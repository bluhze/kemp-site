import { NextResponse } from 'next/server'

const KEMPIRE_URL = 'https://thekempire.com/'

export interface KempireArticle {
  title: string
  description: string
  url: string
}

function parseArticlesFromHtml(html: string): KempireArticle[] {
  const articles: KempireArticle[] = []

  // Match h2/h3 headings followed by paragraph - common WordPress structure
  const headingRegex = /<h[23][^>]*>([^<]+)<\/h[23]>/gi
  const linkRegex = /<a[^>]+href="([^"]+)"[^>]*>[\s\S]*?<h[23]/gi

  // Alternative: look for entry-content or post content blocks
  const entryMatch = html.match(/class="[^"]*entry-content[^"]*"[\s\S]*?<\/div>/i)
  const content = entryMatch ? entryMatch[0] : html

  // Find all h2/h3 with text
  const headings: { title: string; index: number }[] = []
  let match
  const hRegex = /<h[23][^>]*>([^<]+)<\/h[23]>/gi
  while ((match = hRegex.exec(content)) !== null) {
    const title = match[1].replace(/&amp;/g, '&').replace(/&#39;/g, "'").trim()
    if (title && !title.toLowerCase().includes("you've now entered")) {
      headings.push({ title, index: match.index })
    }
  }

  // Find paragraphs after each heading
  for (let i = 0; i < headings.length; i++) {
    const start = headings[i].index
    const end = headings[i + 1] ? headings[i + 1].index : content.length
    const block = content.slice(start, end)

    const pMatch = block.match(/<p[^>]*>([\s\S]*?)<\/p>/)
    const description = pMatch
      ? pMatch[1]
          .replace(/<[^>]+>/g, '')
          .replace(/&amp;/g, '&')
          .replace(/&#39;/g, "'")
          .trim()
      : ''

    const urlMatch = block.match(/href="(https:\/\/thekempire\.com[^"]*)"/)
    const url = urlMatch ? urlMatch[1] : `https://thekempire.com/?s=${encodeURIComponent(headings[i].title)}`

    articles.push({
      title: headings[i].title,
      description: description.slice(0, 300),
      url,
    })
  }

  return articles.slice(0, 6)
}

export async function GET() {
  try {
    const res = await fetch(KEMPIRE_URL, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html',
      },
      next: { revalidate: 3600 },
    })

    const html = await res.text()
    const articles = parseArticlesFromHtml(html)

    if (articles.length > 0) {
      return NextResponse.json(articles)
    }
  } catch (error) {
    console.error('Kempire fetch error:', error)
  }

  // Fallback: content from thekempire.com (as of fetch)
  const fallback: KempireArticle[] = [
    {
      title: "Wendy Williams Sparks Concern From Fans After Stepping Out Looking Frail & Disoriented",
      description:
        "The former daytime talk show host, Wendy Williams has her fans very concerned after she looked frail and disoriented during a recent outing. They also got even more concerned when a new promo dropped for her podcast.",
      url: "https://thekempire.com/",
    },
    {
      title: "Stephen 'tWitch' Boss' MOM Speaks Out + Note Found at Scene of His Death",
      description:
        "Dancer/DJ and former executive producer of The Ellen Degeneres Show, DJ Stephen Twitch Boss' mother is speaking out for the first time since his death. Also, did the dancer, DJ and producer leave behind a note that might indicate why he did this?",
      url: "https://thekempire.com/",
    },
    {
      title: 'Married "GMA" Anchors T.J. Holmes & Amy Robach\'s Affair EXPOSED',
      description:
        "Married Good Morning America co-anchors, T.J. Holmes and Amy Robach allegedly had an affair that they tried to keep secret even from ABC News. They are apparently are going public with their affair and have left their significant others, Andrew Shue and Marilee Holmes.",
      url: "https://thekempire.com/",
    },
  ]

  return NextResponse.json(fallback)
}
