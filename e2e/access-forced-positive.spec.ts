import { test, expect } from '@playwright/test'

/**
 * Requires `npm run test:e2e:access-forced` — build embeds VITE_FORCE_PRO_TOOLS / VITE_FORCE_PLATFORM_TOOLS.
 * Lab remains behind workspace sign-in; this asserts the **tier gate** does not bounce to /settings.
 */
test.describe('Access gates (forced pro/platform via build flags)', () => {
  test('lab route is not blocked by tier guard when pro tools are forced', async ({ page }) => {
    await page.goto('/lab', { waitUntil: 'load' })
    await expect(page).toHaveURL(/\/lab$/, { timeout: 20_000 })
    await expect(page.getByRole('heading', { level: 1, name: /learning lab/i })).toBeVisible({
      timeout: 20_000,
    })
  })

  test('platform surface is reachable when platform tools are forced', async ({ page }) => {
    await page.goto('/platform')
    await expect(page.getByRole('heading', { name: /operations & runtime/i })).toBeVisible({
      timeout: 20_000,
    })
  })
})
