import { test, expect } from '@playwright/test'

/**
 * Legacy training workspace routes are retired; deep links should land on the public catalog.
 */
test.describe('Autonomous learning loop (retired routes)', () => {
  test('/training redirects to public learn catalog', async ({ page }) => {
    await page.goto('/training')
    await expect(page).toHaveURL(/\/learn$/, { timeout: 20_000 })
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible()
  })
})
