import { test, expect } from '@playwright/test'

/**
 * Legacy training workspace routes are retired; deep links should land on the public catalog.
 */
test.describe('Autonomous learning loop (retired routes)', () => {
  test('/training redirects to the public career-skills homepage', async ({ page }) => {
    // Updated 20 Aug 2026: retired routes now land on the public career-skills homepage rather
    // than 404 or the frozen course catalog (AMENDMENT_001 §5). `/generate` matters most — the
    // April 2026 launch posts still link to it.
    await page.goto('/training')
    await expect(page).toHaveURL(/\/$/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/practical career, income and ai skills/i)
  })
})
