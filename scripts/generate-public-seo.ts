/**
 * Generates the static discovery files that a client-rendered SPA cannot produce at runtime:
 *
 *   public/robots.txt   — crawl policy + sitemap pointer
 *   public/sitemap.xml  — every public route, including one URL per lesson and per topic
 *   public/feed.xml     — RSS 2.0 feed of the published lessons
 *
 *   npx tsx scripts/generate-public-seo.ts
 *
 * The route list is derived from the same modules the app renders from, so a new lesson or pillar
 * cannot be missing from the sitemap. Private routes (/admin/*) are excluded and disallowed.
 */
import { writeFileSync, mkdirSync } from 'node:fs'
import { join } from 'node:path'
import { CANONICAL_ORIGIN, BRAND_SITE_NAME, PUBLIC_POSITIONING } from '../src/social/brand.ts'
import { PILLARS } from '../src/social/pillars.ts'
import { GUIDES, GUIDE_LIBRARY_DATE } from '../src/social/guides.ts'

const OUT = join(process.cwd(), 'public')
mkdirSync(OUT, { recursive: true })

const escapeXml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// --- robots.txt ------------------------------------------------------------
const robots = `# ${BRAND_SITE_NAME}
User-agent: *
Allow: /
Disallow: /admin/

Sitemap: ${CANONICAL_ORIGIN}/sitemap.xml
`
writeFileSync(join(OUT, 'robots.txt'), robots)

// --- sitemap.xml -----------------------------------------------------------
type Entry = { loc: string; changefreq: string; priority: string; lastmod?: string }

const entries: Entry[] = [
  { loc: '/', changefreq: 'daily', priority: '1.0' },
  { loc: '/content', changefreq: 'daily', priority: '0.9' },
  { loc: '/social', changefreq: 'monthly', priority: '0.6' },
  { loc: '/about', changefreq: 'monthly', priority: '0.7' },
  { loc: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { loc: '/terms', changefreq: 'yearly', priority: '0.3' },
  { loc: '/contact', changefreq: 'yearly', priority: '0.3' },
  { loc: '/ai-disclosure', changefreq: 'yearly', priority: '0.4' },
  ...PILLARS.map((p) => ({ loc: `/topics/${p.slug}`, changefreq: 'weekly', priority: '0.8' })),
  ...GUIDES.map((g) => ({
    loc: `/content/${g.slug}`,
    changefreq: 'monthly',
    priority: '0.7',
    lastmod: GUIDE_LIBRARY_DATE,
  })),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) =>
      `  <url>\n    <loc>${CANONICAL_ORIGIN}${e.loc}</loc>\n${
        e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>\n` : ''
      }    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
  )
  .join('\n')}
</urlset>
`
writeFileSync(join(OUT, 'sitemap.xml'), sitemap)

// --- feed.xml --------------------------------------------------------------
const pubDate = new Date(`${GUIDE_LIBRARY_DATE}T00:00:00Z`).toUTCString()
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(BRAND_SITE_NAME)}</title>
    <link>${CANONICAL_ORIGIN}/</link>
    <description>${escapeXml(PUBLIC_POSITIONING)}</description>
    <language>en</language>
    <atom:link href="${CANONICAL_ORIGIN}/feed.xml" rel="self" type="application/rss+xml" />
${GUIDES.map(
  (g) => `    <item>
      <title>${escapeXml(g.title)}</title>
      <link>${CANONICAL_ORIGIN}/content/${g.slug}</link>
      <guid isPermaLink="true">${CANONICAL_ORIGIN}/content/${g.slug}</guid>
      <category>${escapeXml(g.pillar)}</category>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeXml(g.summary)}</description>
    </item>`,
).join('\n')}
  </channel>
</rss>
`
writeFileSync(join(OUT, 'feed.xml'), feed)

console.log(`[seo] wrote public/robots.txt, public/sitemap.xml (${entries.length} urls), public/feed.xml (${GUIDES.length} items)`)
