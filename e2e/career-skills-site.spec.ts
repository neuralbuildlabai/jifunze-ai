import { expect, test, type Page } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'
import { OFFICIAL_SOCIAL_ACCOUNTS } from '../src/social/socialAccounts'
import { PILLARS } from '../src/social/pillars'
import { GUIDES } from '../src/social/guides'
import { BRAND_TAGLINE } from '../src/social/brand'

/**
 * The public career-skills site and the private social-ops console.
 *
 * These run against the demo bundle (no Supabase env), which is exactly the state in which a
 * private console must stay closed — so the authorization assertions here are meaningful.
 */

const FIRST_GUIDE = GUIDES[0]

test.describe('Public career-skills site', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('the homepage presents the career-skills brand, not a course platform', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText(
      /practical career, income and ai skills/i,
    )
    await expect(page.getByText(BRAND_TAGLINE).first()).toBeVisible()
    await expect(page.getByRole('link', { name: /browse the content hub/i })).toBeVisible()

    const body = (await page.locator('body').innerText()).toLowerCase()
    // The retired multi-tenant SaaS must not be describable anywhere on the front door.
    expect(body).not.toContain('create smarter social content')
    expect(body).not.toContain('content generator')
    expect(body).not.toContain('brands and creators')
    expect(body).not.toContain('accredited')
    expect(body).not.toContain('guaranteed job')
    expect(body).not.toContain('link in bio')
  })

  test('the homepage sets the approved document title and description', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Jifunze\.ai — Career, Income and Practical AI Skills/)
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    expect(description).toMatch(/practical career, income and ai skills/i)
    const canonical = await page.locator('link[rel="canonical"]').getAttribute('href')
    expect(canonical).toBe('https://www.jifunze.ai/')
  })

  test('the content hub lists every lesson and filters by topic', async ({ page }) => {
    await page.goto('/content')
    await expect(page.getByRole('heading', { level: 1, name: /every lesson, in one place/i })).toBeVisible()

    const allCards = page.locator('main article')
    await expect(allCards).toHaveCount(GUIDES.length)

    const cvCount = GUIDES.filter((g) => g.pillar === 'cv').length
    await page.getByRole('button', { name: `CV (${cvCount})`, exact: true }).click()
    await expect(allCards).toHaveCount(cvCount)
  })

  test('a lesson detail page renders its full readable text, not just an embed', async ({ page }) => {
    await page.goto(`/content/${FIRST_GUIDE.slug}`)
    await expect(page.getByRole('heading', { level: 1, name: FIRST_GUIDE.title })).toBeVisible()
    await expect(page.getByRole('heading', { name: /the steps/i })).toBeVisible()
    for (const step of FIRST_GUIDE.steps) {
      await expect(page.getByText(step, { exact: true })).toBeVisible()
    }
    await expect(page.getByRole('heading', { name: /related lessons/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /copy link/i })).toBeVisible()
    await expect(page).toHaveTitle(new RegExp(FIRST_GUIDE.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')))
  })

  test('an unknown lesson slug renders the 404 page and is marked noindex', async ({ page }) => {
    await page.goto('/content/this-lesson-does-not-exist')
    await expect(page.getByRole('heading', { name: /page not found/i })).toBeVisible()
    const robots = await page.locator('meta[name="robots"]').getAttribute('content')
    expect(robots).toContain('noindex')
  })

  test('every content pillar has a working topic page', async ({ page }) => {
    // Navigates six routes in sequence; the default 30s budget is tight under parallel load.
    test.setTimeout(90_000)
    for (const pillar of PILLARS) {
      await page.goto(`/topics/${pillar.slug}`)
      await expect(page.getByRole('heading', { level: 1, name: pillar.label })).toBeVisible()
      await expect(page.locator('main article').first()).toBeVisible()
    }
  })

  test('an unknown topic slug renders the 404 page', async ({ page }) => {
    await page.goto('/topics/not-a-real-topic')
    await expect(page.getByRole('heading', { name: /page not found/i })).toBeVisible()
  })

  test('the social directory lists every official account, and no others', async ({ page }) => {
    await page.goto('/social')
    const directory = page.getByRole('navigation', { name: /official jifunze\.ai accounts/i })
    const links = directory.getByRole('link')
    await expect(links).toHaveCount(OFFICIAL_SOCIAL_ACCOUNTS.length)

    for (const account of OFFICIAL_SOCIAL_ACCOUNTS) {
      const link = directory.getByRole('link', { name: new RegExp(`^${account.name},`) })
      await expect(link).toHaveAttribute('href', account.href)
      await expect(link).toHaveAttribute('target', '_blank')
      await expect(link).toHaveAttribute('rel', /noreferrer/)
    }

    const hrefs = await directory.getByRole('link').evaluateAll((els) =>
      els.map((e) => (e as HTMLAnchorElement).href),
    )
    expect(hrefs.some((h) => /github\.com/i.test(h))).toBe(false)
    expect(hrefs.some((h) => /calmsignal/i.test(h))).toBe(false)
    expect(hrefs.some((h) => /\/generate/i.test(h))).toBe(false)
  })

  test('the footer renders the social links on every public page', async ({ page }) => {
    for (const path of ['/', '/content', '/about', `/content/${FIRST_GUIDE.slug}`]) {
      await page.goto(path)
      const footerNav = page.getByRole('navigation', { name: /footer/i })
      await expect(footerNav.getByRole('link', { name: /^Instagram,/ })).toBeVisible()
      await expect(footerNav.getByRole('link', { name: /^TikTok,/ })).toBeVisible()
      await expect(footerNav.getByRole('link', { name: /^Pinterest,/ })).toBeVisible()
    }
  })

  test('social links are reachable by keyboard and expose an accessible name', async ({ page }) => {
    await page.goto('/social')
    const first = page
      .getByRole('navigation', { name: /official jifunze\.ai accounts/i })
      .getByRole('link')
      .first()
    await first.focus()
    await expect(first).toBeFocused()
    const label = await first.getAttribute('aria-label')
    expect(label).toMatch(/opens in a new tab/i)
  })

  test('the "how it works" page explains selection without overclaiming', async ({ page }) => {
    await page.goto('/about')
    await expect(page.getByRole('heading', { name: /how a lesson is chosen/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /what we do not claim/i })).toBeVisible()
    const body = (await page.locator('body').innerText()).toLowerCase()
    expect(body).toContain('we do not guarantee a job')
    // Accreditation may only ever be mentioned as a disclaimer, never as a claim.
    expect(body).toContain('not an accredited training provider')
    expect(body).not.toMatch(/\bwe are an accredited\b/)
    expect(body).not.toMatch(/\boffers? accredited training\b/)
  })

  test('the frozen learning platform is untouched and still reachable', async ({ page }) => {
    await page.goto('/learn')
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
  })

  test('legal pages are linked from the public footer', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /^Privacy$/ }).click()
    await expect(page).toHaveURL(/\/privacy$/)
    await expect(page.getByRole('heading', { name: /privacy policy/i })).toBeVisible()
  })

  test('the layout works on a small screen with no horizontal overflow', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 720 })
    for (const path of ['/', '/content', '/social', `/content/${FIRST_GUIDE.slug}`]) {
      await page.goto(path)
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      )
      expect(overflow, `${path} overflows horizontally by ${overflow}px`).toBeLessThanOrEqual(1)
    }
  })

  test('each public page has exactly one h1 and no skipped heading level', async ({ page }) => {
    for (const path of ['/', '/content', '/social', '/about', `/content/${FIRST_GUIDE.slug}`]) {
      await page.goto(path)
      const levels = await page.evaluate(() =>
        [...document.querySelectorAll('main h1, main h2, main h3, main h4')].map((h) =>
          Number(h.tagName.slice(1)),
        ),
      )
      expect(levels.filter((l) => l === 1).length, `${path} h1 count`).toBe(1)
      for (let i = 1; i < levels.length; i++) {
        expect(levels[i] - levels[i - 1], `${path} skips a heading level`).toBeLessThanOrEqual(1)
      }
    }
  })

  test('every internal link on the public site resolves to a real route', async ({ page }) => {
    // Crawls every public route reachable from the front door; deliberately generous.
    test.setTimeout(180_000)
    const visited = new Set<string>()
    const checkInternalLinks = async (p: Page, from: string) => {
      await p.goto(from)
      const hrefs = await p.$$eval('a[href^="/"]', (els) =>
        els.map((e) => (e as HTMLAnchorElement).getAttribute('href') ?? ''),
      )
      for (const href of new Set(hrefs)) {
        if (!href || href.startsWith('//') || visited.has(href)) continue
        visited.add(href)
        // Static assets are served directly and are checked by the SEO test suite.
        if (/\.(xml|txt|png|svg|ico)$/.test(href)) continue
        const response = await p.goto(href)
        expect(response?.status(), `${href} (linked from ${from})`).toBeLessThan(400)
        const heading = await p.locator('h1').first().innerText()
        expect(heading.toLowerCase(), `${href} is a 404`).not.toContain('page not found')
      }
    }
    await checkInternalLinks(page, '/')
    await checkInternalLinks(page, '/content')
  })
})

test.describe('Private social operations console', () => {
  test('/admin/social-ops is closed without a configured backend', async ({ page }) => {
    await page.goto('/admin/social-ops')
    await expect(page.getByRole('heading', { name: /social ops is unavailable/i })).toBeVisible({
      timeout: 15_000,
    })
    // The console's own data must never render for an unauthorized visitor.
    await expect(page.getByText(/total audience/i)).toHaveCount(0)
    await expect(page.getByText(/kill switch/i)).toHaveCount(0)
  })

  test('every social-ops sub-route is equally closed', async ({ page }) => {
    for (const path of [
      '/admin/social-ops/accounts',
      '/admin/social-ops/pipeline',
      '/admin/social-ops/safety',
    ]) {
      await page.goto(path)
      await expect(page.getByRole('heading', { name: /social ops is unavailable/i })).toBeVisible({
        timeout: 15_000,
      })
    }
  })

  test('the console is not discoverable from the public site', async ({ page }) => {
    await page.goto('/')
    const hrefs = await page.$$eval('a[href]', (els) =>
      els.map((e) => (e as HTMLAnchorElement).getAttribute('href') ?? ''),
    )
    expect(hrefs.some((h) => h.includes('social-ops'))).toBe(false)
  })

  test('the frozen admin shell still behaves exactly as before', async ({ page }) => {
    await page.goto('/admin/dashboard')
    await expect(page).toHaveURL(/\/dashboard$/, { timeout: 20_000 })
  })
})
