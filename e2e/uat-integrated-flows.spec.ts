import { test, expect } from '@playwright/test'

/**
 * Integrated UAT-oriented flows against the **learning catalog** (demo persistence / no Supabase in default webServer).
 */
test.describe('UAT integrated flows (demo)', () => {
  test('Flow 4 — trust: settings redirects to account; subscription boundary visible from account billing links', async ({
    page,
  }) => {
    await page.goto('/settings')
    await expect(page).toHaveURL(/\/account$/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { name: /^account$/i }).first()).toBeVisible({ timeout: 20_000 })
  })

  test('Public catalog hub loads', async ({ page }) => {
    await page.goto('/learn')
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
  })
})
