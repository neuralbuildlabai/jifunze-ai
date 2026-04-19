import { expect, test } from '@playwright/test'

test.describe('Billing surfaces (public)', () => {
  test('/pricing exposes simplified subscription CTAs without legacy SKU disclosure', async ({ page }) => {
    await page.goto('/pricing')
    await expect(page.getByTestId('pricing-plan-monthly')).toBeVisible()
    await expect(page.getByTestId('pricing-plan-annual')).toBeVisible()
    await expect(page.getByTestId('pricing-plan-single-course')).toBeVisible()
    await expect(page.getByTestId('pricing-monthly-price')).toBeVisible()
    await expect(page.getByTestId('pricing-monthly-price')).toContainText('$29')
    await expect(page.getByText('Cancel anytime.')).toBeVisible()
    await expect(page.getByTestId('pricing-annual-summary')).toBeVisible()
    await expect(page.getByTestId('pricing-plan-annual')).toContainText('$199/year')
    await expect(page.getByTestId('pricing-plan-single-course')).toContainText('$49')

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

    await page.getByTestId('pricing-audience-team').click()
    await expect(page.getByTestId('pricing-team-path')).toBeVisible()
    await expect(page.getByTestId('pricing-plan-monthly')).toHaveCount(0)
  })
})
