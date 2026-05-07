import { test, expect } from '@playwright/test'

/**
 * Integrated UAT-oriented flows (demo persistence / no Supabase in default Playwright webServer).
 * Asserts end-to-end presence of trust boundaries + core learning/content surfaces without claiming live Supabase.
 */

test.describe('UAT integrated flows (demo)', () => {
  test('Flow 1 — create plan → plan detail shows library + continuity + derived anchor → lesson loop → checkpoint trust', async ({
    page,
  }) => {
    test.setTimeout(90_000)
    await page.goto('/training/new', { waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('heading', { name: /take the first step toward a smarter learning path/i })).toBeVisible({ timeout: 25_000 })

    const blocked = page.getByText(/workspace is not available yet/i)
    if (await blocked.isVisible().catch(() => false)) {
      test.skip(true, 'Training create blocked — workspace not ready in this environment')
    }

    await page.getByTestId('training-wizard-continue').click()

    await page.getByLabel(/plan title/i).fill(`UAT Plan ${Date.now()}`)
    await page.getByLabel(/topic focus/i).fill('Applied practice design')
    await page.locator('textarea').first().fill('Ship one artifact per week with observable signals.')

    await page.getByTestId('training-wizard-continue').click()
    await page.getByTestId('training-wizard-continue').click()

    await page.getByTestId('training-wizard-build').click()
    await expect(page).toHaveURL(/\/training\/[0-9a-f-]{36}/i, { timeout: 25_000 })

    await expect(page.getByTestId('continuity-guidance-card')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('library-portfolio-panel')).toBeVisible({ timeout: 20_000 })

    await page.goto(`${page.url().split('#')[0]}#plan-derived-content`)
    await expect(page.locator('#plan-derived-content')).toBeVisible({ timeout: 15_000 })
    await expect(page.locator('#plan-derived-content').getByText('Content from this plan', { exact: true })).toBeVisible()

    const lessonLink = page.locator('a[href*="/lessons/"]').first()
    await expect(lessonLink).toBeVisible({ timeout: 15_000 })
    await lessonLink.click()
    await expect(page).toHaveURL(/\/training\/[^/]+\/lessons\/[^/]+/)
    await expect(page.getByTestId('lesson-learning-loop')).toBeVisible()
    await expect(page.getByText(/high-stakes certifications/i)).toBeVisible()

    await page.goBack()
    await expect(page).toHaveURL(/\/training\/[0-9a-f-]{36}/i)

    const checkpointLink = page.locator('a[href*="/quizzes/"]').filter({ hasNotText: /diagnostic/i }).first()
    await expect(checkpointLink).toBeVisible({ timeout: 15_000 })
    await checkpointLink.click()
    await expect(page).toHaveURL(/\/training\/[^/]+\/quizzes\/[^/]+/)
    await expect(page.getByTestId('checkpoint-trust-context')).toBeVisible({ timeout: 15_000 })
    await expect(page.getByTestId('checkpoint-trust-context')).toContainText(/official materials|plan’s items|exam preparation only|high-stakes/i)
  })

  test('Flow 2 — content-first: derived section + knowledge coherence copy', async ({ page }) => {
    await page.goto('/training')
    await expect(page.getByRole('heading', { name: /my training plans/i })).toBeVisible({ timeout: 20_000 })
    const planCandidates = page.locator('a[href^="/training/"]:not([href="/training/new"])')
    const n = await planCandidates.count()
    test.skip(n === 0, 'Requires at least one training plan — run Flow 1 first or seed demo data')
    await planCandidates.first().click()
    await expect(page).toHaveURL(/\/training\/[0-9a-f-]{36}/i)
    await page.goto(`${page.url().split('#')[0]}#plan-derived-content`)
    await expect(page.locator('#plan-derived-content').getByText(/same knowledge graph/i).first()).toBeVisible({
      timeout: 15_000,
    })
  })

  test('Flow 3 — facilitator privacy stance copy (visible to managers when section renders)', async ({ page }) => {
    await page.goto('/training')
    const planCandidates = page.locator('a[href^="/training/"]:not([href="/training/new"])')
    const n = await planCandidates.count()
    test.skip(n === 0, 'Requires at least one training plan')
    await planCandidates.first().click()
    const facilitatorHeading = page.getByText(/team & facilitator insight/i)
    if (await facilitatorHeading.isVisible().catch(() => false)) {
      await expect(page.getByText(/no raw answers/i)).toBeVisible()
      await expect(page.getByText(/aggregate or role-safe/i)).toBeVisible()
    } else {
      test.skip(true, 'Facilitator panel not shown for this workspace role — expected for non-manager demo')
    }
  })

  test('Flow 4 — trust surfaces: settings subscription boundary + public generate draft disclaimer', async ({ page }) => {
    await page.goto('/settings')
    await expect(page.getByText(/does not issue credentials/i).first()).toBeVisible({ timeout: 20_000 })

    await page.goto('/generate')
    await expect(page.getByTestId('public-generate-trust-boundary')).toContainText(/Review for accuracy before posting/i, {
      timeout: 15_000,
    })
  })

  test('Weak-area panel shows heuristic disclaimer when signals exist', async ({ page }) => {
    await page.goto('/training')
    const planCandidates = page.locator('a[href^="/training/"]:not([href="/training/new"])')
    const n = await planCandidates.count()
    test.skip(n === 0, 'Requires at least one plan with progression for weak-area UI')
    await planCandidates.first().click()
    const weak = page.getByTestId('weak-areas-panel')
    if (await weak.isVisible().catch(() => false)) {
      await expect(weak.getByText(/heuristic/i).first()).toBeVisible()
    }
  })
})
