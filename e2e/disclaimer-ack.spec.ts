import { test, expect } from '@playwright/test'

test.describe('Disclaimer acknowledgment (guest / no Supabase)', () => {
  test('protected routes do not mount the signed-in acknowledgment modal without auth', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByTestId('disclaimer-acknowledgment-modal')).toHaveCount(0)
  })

  test('root redirect to catalog does not show signed-in acknowledgment modal', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL(/\/learn$/, { timeout: 15_000 })
    await expect(page.getByTestId('disclaimer-acknowledgment-modal')).toHaveCount(0)
  })

  test('/generate redirects to /learn without disclaimer acknowledgment modal', async ({ page }) => {
    await page.goto('/generate')
    await expect(page).toHaveURL(/\/learn$/, { timeout: 15_000 })
    await expect(page.getByTestId('disclaimer-acknowledgment-modal')).toHaveCount(0)
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
  })
})

/**
 * Full acknowledgment flow requires a real Supabase session + Playwright auth storage.
 * Run manually or wire a CI project with `VITE_SUPABASE_*` and `storageState`.
 */
