// UAT evidence capture against the local dist server (vercel.json semantics).
import { chromium } from '@playwright/test'
import { mkdirSync } from 'node:fs'

const base = 'http://127.0.0.1:4173'
const out = '/tmp/uat-shots'
mkdirSync(out, { recursive: true })

const routes = [
  ['home', '/'], ['content', '/content'], ['topic-practical-ai', '/topics/practical-ai'],
  ['social', '/social'], ['about', '/about'], ['privacy', '/privacy'], ['terms', '/terms'],
  ['ai-disclosure', '/ai-disclosure'], ['contact', '/contact'], ['admin-login', '/admin/login'],
  ['retired-learn', '/learn'], ['retired-signup', '/auth/sign-up'], ['unknown-404', '/this-route-does-not-exist'],
]

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' })
const findings = []

for (const [w, h, tag] of [[1280, 800, 'desktop'], [390, 844, 'mobile']]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } })
  const page = await ctx.newPage()
  for (const [name, path] of routes) {
    await page.goto(base + path, { waitUntil: 'networkidle' })
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1)
    const noindex = await page.evaluate(() => !!document.querySelector('meta[name="robots"][content*="noindex"]'))
    const h1s = await page.locator('h1').count()
    findings.push({ tag, path, overflow, noindex, h1s, title: await page.title() })
    await page.screenshot({ path: `${out}/${tag}-${name}.png`, fullPage: name === 'home' })
  }
  // Homepage content assertions (once per viewport)
  await page.goto(base + '/', { waitUntil: 'networkidle' })
  const text = await page.evaluate(() => document.body.innerText)
  findings.push({
    tag, path: '/#content-checks',
    tagline: text.includes('Your idea never sleeps.'),
    adminLoginHeader: await page.locator('header >> text=Admin').count(),
    adminLoginFooter: await page.locator('footer >> text=Admin').count(),
    aiDisclosure: /AI/.test(text) && text.toLowerCase().includes('disclosure'),
    noLearnCTA: !/enroll|pricing|sign up|start learning|get started/i.test(text),
    pillars: ['Practical AI', 'Career', 'Income', 'Digital', 'Productivity', 'Opportunit'].map(p => [p, text.includes(p)]),
    socialCount: await page.locator('footer a[href*="instagram"], footer a[href*="tiktok"], footer a[href*="threads"], footer a[href*="youtube"], footer a[href*="facebook"], footer a[href*="x.com"], footer a[href*="linkedin"], footer a[href*="pinterest"]').count(),
  })
  await ctx.close()
}
await browser.close()
console.log(JSON.stringify(findings, null, 1))
