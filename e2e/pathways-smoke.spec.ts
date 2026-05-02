import { test, expect } from '@playwright/test'

test.describe('Employable pathways smoke', () => {
  test('/paths renders and public nav includes Pathways without training console', async ({ page }) => {
    await page.goto('/paths')
    await expect(page.getByRole('heading', { name: /structured learning.*clear pathways.*evidence you can show/i })).toBeVisible({ timeout: 15_000 })
    const nav = page.getByRole('navigation', { name: 'Public' })
    await expect(nav.getByRole('link', { name: /^pathways$/i })).toBeVisible()
    await expect(nav.getByRole('link', { name: /^training$/i })).toHaveCount(0)
  })

  test('/paths/:slug renders progress summary and planned courses are labeled', async ({ page }) => {
    await page.goto('/paths/digital-work-starter')
    await expect(page.getByRole('heading', { name: /digital work starter pathway/i })).toBeVisible({ timeout: 15_000 })
    await expect(page.getByTestId('pathway-progress-summary')).toBeVisible()
    const plannedRows = page.getByTestId('pathway-planned-course-row')
    await expect(plannedRows.first()).toBeVisible()
    await expect(plannedRows.first()).toContainText(/planned|coming soon/i)
  })

  test('anonymous pathway signup CTA includes returnUrl when auth surface is shown', async ({ page }) => {
    await page.goto('/paths/digital-work-starter')
    const signup = page.getByTestId('pathway-cta-signup')
    if (await signup.isVisible()) {
      await expect(signup).toHaveAttribute('href', /returnUrl=/)
      await expect(signup).toHaveAttribute('href', /digital-work-starter/)
      await expect(signup).toContainText(/follow/i)
    }
  })

  test('anonymous active pathway does not show signed-in follow control', async ({ page }) => {
    await page.goto('/paths/digital-work-starter')
    await expect(page.getByTestId('pathway-cta-follow')).toHaveCount(0)
  })

  test('coming_soon pathway does not expose primary follow for anonymous', async ({ page }) => {
    await page.goto('/paths/junior-tech-builder')
    await expect(page.getByTestId('pathway-cta-follow')).toHaveCount(0)
  })
})
