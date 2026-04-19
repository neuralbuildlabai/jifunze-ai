import { expect, test } from '@playwright/test'

import { E2E_BILLING_INVOKE_STORAGE_KEY } from '../src/lib/billingStripe'

/**
 * Uses `VITE_E2E_BILLING_INVOKE_MOCK=true` (see `playwright.billing-mock.config.ts`) — no Stripe network.
 * Asserts wiring for success redirect + return URLs + missing-URL guard.
 */
test.describe('Billing checkout (mocked invoke — no live Stripe)', () => {
  test.afterEach(async ({ page }) => {
    await page.evaluate((k) => sessionStorage.removeItem(k), E2E_BILLING_INVOKE_STORAGE_KEY)
  })

  test('legacy Creator checkout redirects back with success query (invoke + redirect wiring)', async ({ page }) => {
    await page.goto('/settings/subscription')
    const cta = page.getByTestId('checkout-creator')
    await expect(cta).toBeVisible({ timeout: 20_000 })
    await expect(cta).toBeEnabled()
    await cta.click()
    await page.waitForURL(/checkout=success/, { timeout: 15_000 })
    await expect(page.getByTestId('billing-checkout-banner')).toContainText(/Checkout completed/i)
  })

  test('cancel return shows neutral banner copy (Stripe return simulation)', async ({ page }) => {
    await page.goto('/settings/subscription?checkout=cancel')
    await expect(page.getByTestId('billing-checkout-banner')).toContainText(/canceled/i)
  })

  test('refresh on billing return URL keeps banner stable', async ({ page }) => {
    await page.goto('/settings/subscription?checkout=success')
    await expect(page.getByTestId('billing-checkout-banner')).toContainText(/Checkout completed/i)
    await page.reload()
    await expect(page.getByTestId('billing-checkout-banner')).toContainText(/Checkout completed/i)
  })

  test('missing checkout URL surfaces error copy (client guard)', async ({ page }) => {
    await page.goto('/settings/subscription')
    await page.evaluate((k) => sessionStorage.setItem(k, 'missing_url'), E2E_BILLING_INVOKE_STORAGE_KEY)
    await page.getByTestId('checkout-creator').click()
    await expect(page.getByTestId('billing-checkout-banner')).toContainText(/Checkout URL missing/i, {
      timeout: 10_000,
    })
  })
})
