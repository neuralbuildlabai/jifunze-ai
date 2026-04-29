import { expect, test } from '@playwright/test'

import { E2E_BILLING_INVOKE_STORAGE_KEY } from '../src/lib/billingStripe'
import { isLearnerMonetizationUiDisabled } from './helpers/learnerMonetizationUi'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

/**
 * Uses `VITE_E2E_BILLING_INVOKE_MOCK=true` (see `playwright.billing-mock.config.ts`) — no Stripe network.
 * Asserts wiring for success redirect + return URLs + missing-URL guard.
 */
test.describe('Billing checkout (mocked invoke — no live Stripe)', () => {
  test.beforeEach(async ({ page }, testInfo) => {
    await applyPublicE2eMaintenanceBypass(page)
    if (isLearnerMonetizationUiDisabled()) {
      testInfo.skip(
        true,
        'Checkout UI is hidden when learner monetization UI is disabled. Run `npm run test:e2e:billing-mock` (playwright.billing-mock.config.ts sets VITE_LEARNER_MONETIZATION_UI_DISABLED=false).',
      )
    }
  })

  test.afterEach(async ({ page }) => {
    await page.evaluate((k) => sessionStorage.removeItem(k), E2E_BILLING_INVOKE_STORAGE_KEY)
  })

  test('monthly SKU checkout redirects back with success query (invoke + redirect wiring)', async ({ page }) => {
    await page.goto('/settings/subscription')
    const cta = page.getByTestId('checkout-jifunze_monthly')
    await expect(cta).toBeVisible({ timeout: 20_000 })
    await expect(cta).toBeEnabled()
    await cta.click()
    await page.waitForURL(/checkout=success/, { timeout: 15_000 })
    await expect(page.getByTestId('billing-checkout-banner')).toContainText(/Payment received/i)
  })

  test('cancel return shows neutral banner copy (Stripe return simulation)', async ({ page }) => {
    await page.goto('/settings/subscription?checkout=cancel')
    await expect(page.getByTestId('billing-checkout-banner')).toContainText(/Checkout was canceled/i)
  })

  test('refresh on billing return URL keeps banner stable', async ({ page }) => {
    await page.goto('/settings/subscription?checkout=success')
    await expect(page.getByTestId('billing-checkout-banner')).toContainText(/Payment received/i)
    await page.reload()
    await expect(page.getByTestId('billing-checkout-banner')).toContainText(/Payment received/i)
  })

  test('missing checkout URL surfaces error copy (client guard)', async ({ page }) => {
    await page.goto('/settings/subscription')
    await page.evaluate((k) => sessionStorage.setItem(k, 'missing_url'), E2E_BILLING_INVOKE_STORAGE_KEY)
    await page.getByTestId('checkout-jifunze_monthly').click()
    await expect(page.getByTestId('billing-checkout-banner')).toContainText(/Checkout URL missing/i, {
      timeout: 10_000,
    })
  })
})
