import { test, expect } from '@playwright/test'
import { gotoPublicHomeAnonymous } from './helpers/publicHomeAnonymous'

test.describe('Homepage learning-first (public)', () => {
  test('hero primary CTA navigates to /learn', async ({ page }) => {
    await gotoPublicHomeAnonymous(page)
    await expect(
      page.getByRole('heading', { level: 1, name: /learn ai.*practical tech/i }),
    ).toBeVisible({ timeout: 15_000 })
    const primary = page.getByTestId('landing-hero-primary-cta')
    await expect(primary).toHaveAttribute('href', /\/learn$/)
    await primary.click()
    await expect(page).toHaveURL(/\/learn$/)
  })

  test('home shows featured AI Essentials card linking to course page', async ({ page }) => {
    await gotoPublicHomeAnonymous(page)
    const card = page.getByTestId('home-featured-ai-essentials')
    await expect(card).toBeVisible()
    await expect(card.getByRole('link', { name: /^AI Essentials$/i })).toHaveAttribute(
      'href',
      /\/learn\/courses\/ai-essentials$/,
    )
  })

  test('/paths shows simplified pathway chooser', async ({ page }) => {
    await page.goto('/paths')
    await expect(page.getByRole('heading', { name: /choose a learning pathway/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /open pathway/i }).first()).toBeVisible()
  })

  test('header Courses reaches catalog', async ({ page }) => {
    await gotoPublicHomeAnonymous(page)
    await page.getByTestId('home-nav-courses').click()
    await expect(page).toHaveURL(/\/learn$/)
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible()
  })
})
