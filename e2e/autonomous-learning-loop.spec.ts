import { test, expect } from '@playwright/test'

/**
 * UAT-oriented: integrated training loop surfaces (demo / no Supabase in default Playwright webServer).
 * When no plan exists, we still assert list + create path — no fake data.
 */
test.describe('Autonomous learning loop (demo E2E)', () => {
  test('training index and optional plan → plan detail + derived content anchor', async ({ page }) => {
    await page.goto('/training')
    await expect(page.getByRole('heading', { name: /my training plans/i })).toBeVisible({ timeout: 20_000 })

    const newLink = page.getByRole('link', { name: /^create training plan$/i })
    await expect(newLink).toBeVisible()

    const planCandidates = page.locator('a[href^="/training/"]:not([href="/training/new"])')
    const n = await planCandidates.count()
    if (n === 0) {
      await expect(page.getByText(/no training plans yet/i)).toBeVisible()
      return
    }

    await planCandidates.first().click()
    await expect(page).toHaveURL(/\/training\/[0-9a-f-]{36}/i, { timeout: 15_000 })

    await expect(page.getByTestId('continuity-guidance-card')).toBeVisible({ timeout: 15_000 })

    await page.goto(`${page.url().split('#')[0]}#plan-derived-content`)
    await expect(page.locator('#plan-derived-content')).toBeVisible({ timeout: 15_000 })
    await expect(
      page.locator('#plan-derived-content').getByText('Content from this plan', { exact: true }),
    ).toBeVisible({ timeout: 15_000 })
  })

  test('lesson page exposes learning-loop strip when navigated from plan', async ({ page }) => {
    await page.goto('/training')
    await expect(page.getByRole('heading', { name: /my training plans/i })).toBeVisible({ timeout: 20_000 })

    const planCandidates = page.locator('a[href^="/training/"]:not([href="/training/new"])')
    const n = await planCandidates.count()
    test.skip(n === 0, 'Requires at least one training plan in demo store')

    await planCandidates.first().click()
    await expect(page).toHaveURL(/\/training\/[0-9a-f-]{36}/i)

    const lessonLink = page.locator('a[href*="/lessons/"]').first()
    await expect(lessonLink).toBeVisible({ timeout: 15_000 })
    await lessonLink.click()
    await expect(page).toHaveURL(/\/training\/[^/]+\/lessons\/[^/]+/)

    await expect(page.getByTestId('lesson-learning-loop')).toBeVisible()
    await expect(page.getByRole('link', { name: /revision & study assets/i })).toBeVisible()
  })
})
