/**
 * Per-route document metadata for the public career-skills site.
 *
 * This app is a client-rendered SPA, so these tags are applied after hydration. Search engines
 * that execute JavaScript read them correctly; social-network link scrapers generally do not, and
 * fall back to the static block in `index.html`. That is a known limitation and is recorded in
 * `docs/social/WEBSITE_CONTENT_HUB.md` together with the recommended fix (prerender the public
 * routes at build time). Never rely on these tags for anything security-relevant.
 */
import { useEffect } from 'react'
import { CANONICAL_ORIGIN, BRAND_SITE_NAME, BRAND_TAGLINE, BRAND_DISPLAY_NAME } from './brand.ts'
import { SOCIAL_SAME_AS } from './socialAccounts.ts'

const JSON_LD_ID = 'jf-route-jsonld'

export type PageMeta = {
  title: string
  description: string
  /** Path only, e.g. `/content/cv-ats-language`. */
  path: string
  /** Absolute image URL. Defaults to the site share image. */
  image?: string
  ogType?: 'website' | 'article'
  /** Optional structured data for this route, merged into the page as a second JSON-LD block. */
  jsonLd?: Record<string, unknown>
  /** Set on pages that must not be indexed. */
  noIndex?: boolean
}

function setMetaTag(selector: string, attr: 'name' | 'property', key: string, content: string) {
  if (typeof document === 'undefined') return
  let el = document.head.querySelector<HTMLMetaElement>(selector)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function setLinkRel(rel: string, href: string) {
  if (typeof document === 'undefined') return
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function absoluteUrl(path: string): string {
  return `${CANONICAL_ORIGIN}${path.startsWith('/') ? path : `/${path}`}`
}

/** Organization structured data. Emitted once from `index.html`; exported here for the sitemap tooling. */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND_DISPLAY_NAME,
    alternateName: BRAND_SITE_NAME,
    url: `${CANONICAL_ORIGIN}/`,
    slogan: BRAND_TAGLINE,
    sameAs: [...SOCIAL_SAME_AS],
  }
}

export function usePageMeta(meta: PageMeta) {
  const { title, description, path, image, ogType, jsonLd, noIndex } = meta
  const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : ''

  useEffect(() => {
    if (typeof document === 'undefined') return
    const url = absoluteUrl(path)
    const shareImage = image ?? `${CANONICAL_ORIGIN}/og-image.png`

    document.title = title
    setMetaTag('meta[name="description"]', 'name', 'description', description)
    setLinkRel('canonical', url)

    setMetaTag('meta[property="og:title"]', 'property', 'og:title', title)
    setMetaTag('meta[property="og:description"]', 'property', 'og:description', description)
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', url)
    setMetaTag('meta[property="og:type"]', 'property', 'og:type', ogType ?? 'website')
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', shareImage)

    setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', title)
    setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', description)
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', shareImage)

    setMetaTag('meta[name="robots"]', 'name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow')

    const existing = document.getElementById(JSON_LD_ID)
    if (existing) existing.remove()
    if (serializedJsonLd) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = JSON_LD_ID
      script.textContent = serializedJsonLd
      document.head.appendChild(script)
    }

    return () => {
      document.getElementById(JSON_LD_ID)?.remove()
    }
  }, [title, description, path, image, ogType, serializedJsonLd, noIndex])
}
