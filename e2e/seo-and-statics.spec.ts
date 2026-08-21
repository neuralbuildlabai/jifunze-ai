import { expect, test } from '@playwright/test'

/**
 * Static discovery + brand assets: correct files exist, parse, and carry no retired content.
 * (MIME behaviour in production additionally depends on vercel.json's filesystem handler;
 * what the app repo can guarantee is asserted here.)
 */

test('favicon and app icons are served', async ({ request }) => {
  for (const path of ['/favicon.ico', '/favicon-32x32.png', '/favicon-16x16.png', '/apple-touch-icon.png', '/icon-192.png', '/icon-512.png']) {
    const res = await request.get(path)
    expect(res.status(), path).toBe(200)
    expect(res.headers()['content-type'], path).not.toContain('text/html')
  }
})

test('the web manifest is valid JSON with the approved identity', async ({ request }) => {
  const res = await request.get('/site.webmanifest')
  expect(res.status()).toBe(200)
  const manifest = JSON.parse(await res.text()) as { name: string; theme_color: string; icons: unknown[] }
  expect(manifest.name).toBe('Jifunze')
  expect(manifest.theme_color.toUpperCase()).toBe('#7C3AED')
  expect(manifest.icons.length).toBeGreaterThanOrEqual(2)
})

test('robots.txt allows the public site and disallows admin', async ({ request }) => {
  const res = await request.get('/robots.txt')
  expect(res.status()).toBe(200)
  const text = await res.text()
  expect(text).toContain('Disallow: /admin/')
  expect(text).toContain('Sitemap: https://www.jifunze.ai/sitemap.xml')
  expect(text).not.toMatch(/learn|course/i)
})

test('sitemap.xml parses and contains no retired routes', async ({ request }) => {
  const res = await request.get('/sitemap.xml')
  expect(res.status()).toBe(200)
  const xml = await res.text()
  expect(xml).toContain('<urlset')
  for (const bad of ['/learn', '/library', '/pricing', '/auth/', '/admin', '/dashboard']) {
    expect(xml, `sitemap contains ${bad}`).not.toContain(bad)
  }
  expect(xml).toContain('https://www.jifunze.ai/ai-disclosure')
  expect(xml).toContain('https://www.jifunze.ai/contact')
})

test('feed.xml is an RSS feed of the published lessons only', async ({ request }) => {
  const res = await request.get('/feed.xml')
  expect(res.status()).toBe(200)
  const xml = await res.text()
  expect(xml).toContain('<rss')
  expect(xml).not.toMatch(/\/learn|\/library|\/courses\//)
})

test('the old lightning-bolt favicon and icon sprite are gone', async ({ request }) => {
  for (const path of ['/favicon.svg', '/icons.svg']) {
    const res = await request.get(path)
    // The dev server serves index.html for unknown paths; production returns 404 via
    // vercel.json. Either way the raw SVG asset must not come back.
    const type = res.headers()['content-type'] ?? ''
    expect(type, path).not.toContain('image/svg')
  }
})

test('the retired tagline and old wordmark never reach the browser', async ({ page }) => {
  for (const path of ['/', '/about', '/social', '/admin/login']) {
    await page.goto(path)
    const html = await page.content()
    expect(html).not.toMatch(/create smarter, grow faster/i)
    expect(html).not.toMatch(/jifunze-logo-(light|dark|icon)\.png/)
    expect(html).not.toMatch(/jf-learn-warm/)
  }
})
