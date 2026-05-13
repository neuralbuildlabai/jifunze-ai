import { expect, test } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

test.describe('Paid / deep course pages (public)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('flagship detail (generic): one access pill, no builder jargon', async ({ page }) => {
    await page.goto('/learn/courses/data-and-decisions')
    const main = page.locator('main').first()
    await expect(main.getByTestId('flagship-detail-access-label')).toHaveCount(1)
    const text = (await main.innerText()).toLowerCase()
    expect(text).not.toContain('articulate')
    expect(text).not.toContain('storyline')
    expect(text).not.toContain('scorm')
    expect(text).not.toContain('account-wide')
  })

  test('AI Essentials flagship detail: hero CTA and curriculum', async ({ page }) => {
    await page.goto('/learn/courses/ai-essentials')
    await expect(page.getByTestId('ae-hero-primary-cta')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByRole('heading', { name: /^AI Essentials$/ })).toBeVisible()
    const hub = page.locator('main').first()
    const lower = (await hub.innerText()).toLowerCase()
    expect(lower).not.toContain('articulate')
  })

  test('paid hosted flagship: access line and launch controls', async ({ page }) => {
    await page.goto('/learn/courses/ai-productivity-smart-workflows')
    await expect(page.getByTestId('paid-hosted-rise-flagship-section')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('paid-hosted-flagship-access')).toBeVisible()
    await expect(page.getByTestId('paid-rise-launch-course')).toBeVisible()
    await expect(page.getByTestId('paid-rise-open-new-tab')).toBeVisible()
  })

  test('extended library index shows learning catalog nav', async ({ page }) => {
    await page.goto('/library/cybersecurity-defense')
    await expect(page.getByRole('link', { name: 'Learning catalog' })).toBeVisible({ timeout: 20_000 })
  })
})
