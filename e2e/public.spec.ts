import { expect, test } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

/**
 * Retired-route behaviour (post-pivot).
 *
 * The dev server cannot emit real HTTP statuses for SPA routes — those come from `vercel.json`
 * (410 for retired course/commerce/registration paths, 404 for removed learner paths, 301 for
 * retired-SaaS marketing paths). What the app itself must guarantee, and what this spec pins
 * down, is the *body*: retired routes render an intentional branded response and never any
 * course, checkout, pricing or registration UI.
 */

test.beforeEach(async ({ page }) => {
  await applyPublicE2eMaintenanceBypass(page)
})

test.describe('Retired course routes', () => {
  for (const path of ['/learn', '/learn/free/ai-at-work-chatgpt', '/learn/courses/some-course', '/library/ai-foundations', '/libraries/ai-foundations', '/courses/learn-chatgpt-everyday-work', '/paths', '/learn/checkout']) {
    test(`${path} renders the retired-content response`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { name: /course page has been retired/i })).toBeVisible()
      const body = (await page.locator('body').innerText()).toLowerCase()
      expect(body).not.toMatch(/enrol|checkout|price|ksh|\$\d|certificate|lesson \d/i)
      const robots = await page.locator('meta[name="robots"]').getAttribute('content')
      expect(robots).toContain('noindex')
    })
  }
})

test.describe('Retired commerce routes', () => {
  for (const path of ['/pricing', '/refunds', '/settings/subscription']) {
    test(`${path} renders the retired response with nothing for sale`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { name: /has been retired/i })).toBeVisible()
      await expect(page.getByText(/nothing is for sale/i)).toBeVisible()
    })
  }
})

test.describe('Registration is closed', () => {
  test('/auth/sign-up renders the closed-registration response, no form', async ({ page }) => {
    await page.goto('/auth/sign-up')
    await expect(page.getByRole('heading', { name: /public registration is closed/i })).toBeVisible()
    await expect(page.locator('form')).toHaveCount(0)
    await expect(page.getByText(/invite-only/i)).toBeVisible()
  })

  test('legacy signup deep links no longer open any signup surface', async ({ page }) => {
    for (const q of ['/?auth=signup', '/?signup=1']) {
      await page.goto(q)
      const body = (await page.locator('body').innerText()).toLowerCase()
      expect(body).not.toContain('create your free account')
      expect(body).not.toContain('sign up')
      await expect(page.locator('input[type="password"]')).toHaveCount(0)
    }
  })
})

test.describe('Removed learner workspace', () => {
  for (const path of ['/dashboard', '/my-learning', '/account', '/reports']) {
    test(`${path} is a branded 404`, async ({ page }) => {
      await page.goto(path)
      await expect(page.getByRole('heading', { name: /page not found/i })).toBeVisible()
    })
  }
})

test.describe('Retired-SaaS marketing paths land on the homepage', () => {
  for (const path of ['/generate', '/studio', '/trends']) {
    test(`${path} redirects to /`, async ({ page }) => {
      await page.goto(path)
      await expect(page).toHaveURL(/\/$/)
    })
  }
})

test('legacy /disclaimer and /support consolidate into kept legal pages', async ({ page }) => {
  await page.goto('/disclaimer')
  await expect(page).toHaveURL(/\/terms$/)
  await page.goto('/support')
  await expect(page).toHaveURL(/\/contact$/)
})
