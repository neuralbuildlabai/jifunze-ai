import { test, expect } from '@playwright/test'

test.describe('Disclaimer acknowledgment (guest / no Supabase)', () => {
  test('protected routes do not mount the signed-in acknowledgment modal without auth', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByTestId('disclaimer-acknowledgment-modal')).toHaveCount(0)
  })

  test('public landing does not show signed-in acknowledgment modal', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByTestId('disclaimer-acknowledgment-modal')).toHaveCount(0)
  })

  test('/generate remains accessible without acknowledgment modal', async ({ page }) => {
    await page.goto('/generate')
    await expect(page.getByTestId('disclaimer-acknowledgment-modal')).toHaveCount(0)
    await expect(page.getByTestId('public-generate-trust-boundary')).toBeVisible()
  })
})

/**
 * Full acknowledgment flow requires a real Supabase session + Playwright auth storage.
 * Run manually or wire a CI project with `VITE_SUPABASE_*` and `storageState`.
 */
