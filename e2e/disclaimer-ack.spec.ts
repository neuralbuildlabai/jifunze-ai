import { test, expect } from '@playwright/test'

test.describe('Disclaimer acknowledgment (guest / no Supabase)', () => {
  test('protected routes do not mount the signed-in acknowledgment modal without auth', async ({ page }) => {
    await page.goto('/dashboard')
    await expect(page.getByTestId('disclaimer-acknowledgment-modal')).toHaveCount(0)
  })

  // Updated 20 Aug 2026: `/` no longer redirects to the course catalog. Signed-out visitors get
  // the public career-skills homepage (AMENDMENT_001 §5). The assertion that matters here —
  // no acknowledgment modal without a session — is unchanged.
  test('public homepage does not show the signed-in acknowledgment modal', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible({ timeout: 15_000 })
    await expect(page.getByTestId('disclaimer-acknowledgment-modal')).toHaveCount(0)
  })

  test('the course catalog still shows no acknowledgment modal without auth', async ({ page }) => {
    await page.goto('/learn')
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('disclaimer-acknowledgment-modal')).toHaveCount(0)
  })

  test('/generate redirects home without a disclaimer acknowledgment modal', async ({ page }) => {
    // Updated 20 Aug 2026: retired routes now land on the public career-skills homepage rather
    // than 404 or the frozen course catalog (AMENDMENT_001 §5). `/generate` matters most — the
    // April 2026 launch posts still link to it.
    await page.goto('/generate')
    await expect(page).toHaveURL(/\/$/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/practical career, income and ai skills/i)
    await expect(page.getByTestId('disclaimer-acknowledgment-modal')).toHaveCount(0)
  })
})

/**
 * Full acknowledgment flow requires a real Supabase session + Playwright auth storage.
 * Run manually or wire a CI project with `VITE_SUPABASE_*` and `storageState`.
 */
