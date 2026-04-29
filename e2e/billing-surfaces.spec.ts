import { expect, test } from '@playwright/test'
import { isLearnerMonetizationUiDisabled } from './helpers/learnerMonetizationUi'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

test.describe('Billing surfaces (public)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('/pricing shows paused copy when learner monetization UI is disabled (default)', async ({ page }) => {
    test.skip(!isLearnerMonetizationUiDisabled(), 'Paused /pricing is asserted only when VITE_LEARNER_MONETIZATION_UI_DISABLED is not explicitly false')
    await page.goto('/pricing')
    await expect(page.getByRole('heading', { name: /plans are not available yet/i })).toBeVisible()
    await expect(page.getByTestId('public-pricing-focused')).toBeVisible()
  })

  test('/settings/subscription shows paused public copy when learner monetization UI is disabled', async ({ page }) => {
    test.skip(!isLearnerMonetizationUiDisabled(), 'Paused subscription copy is only expected when monetization UI is disabled')
    await page.goto('/settings/subscription')
    await expect(page.getByTestId('public-subscription-paused')).toBeVisible()
    await expect(page.getByText(/plans are not available yet/i)).toBeVisible()
  })

  test('/pricing exposes simplified subscription CTAs when monetization UI is enabled', async ({ page }) => {
    test.skip(isLearnerMonetizationUiDisabled(), 'Full pricing grid requires VITE_LEARNER_MONETIZATION_UI_DISABLED=false on the dev server (see playwright docs / CI env)')
    await page.goto('/pricing')
    await expect(page.getByTestId('pricing-plan-monthly')).toBeVisible()
    await expect(page.getByTestId('pricing-plan-annual')).toBeVisible()
    await expect(page.getByTestId('pricing-plan-single-course')).toBeVisible()
    await expect(page.getByTestId('pricing-monthly-price')).toBeVisible()
    await expect(page.getByTestId('pricing-monthly-price')).toContainText('$29')
    await expect(page.getByText('Cancel anytime.')).toBeVisible()
    await expect(page.getByTestId('pricing-annual-summary')).toBeVisible()
    await expect(page.getByTestId('pricing-plan-annual')).toContainText('$199/year')
    await expect(page.getByTestId('pricing-plan-single-course')).toContainText('$59')

    const ctaMonthly = page.getByTestId('public-pricing-cta-monthly')
    await expect(ctaMonthly).toBeVisible()
    const href = await ctaMonthly.getAttribute('href')
    expect(
      href === '/settings/subscription' ||
        href === '/?auth=signin#auth' ||
        href === '/?auth=signup#auth',
    ).toBeTruthy()

    await expect(page.getByTestId('pricing-buy-one-course-browse')).toBeVisible()
    await expect(page.getByTestId('pricing-buy-one-course-billing')).toBeVisible()

    await expect(page.getByTestId('pricing-plan-free')).toHaveCount(0)
    await expect(page.getByTestId('pricing-advanced-sku-catalog')).toHaveCount(0)
  })
})
