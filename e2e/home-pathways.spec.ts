import { test, expect } from '@playwright/test'
import { gotoPublicHomeAnonymous } from './helpers/publicHomeAnonymous'

test.describe('Homepage pathways-first (public)', () => {
  test('hero primary CTA navigates to /paths', async ({ page }) => {
    await gotoPublicHomeAnonymous(page)
    await expect(
      page.getByRole('heading', { level: 1, name: /learn skills.*build proof.*become employable/i }),
    ).toBeVisible({ timeout: 15_000 })
    const primary = page.getByTestId('landing-hero-primary-cta')
    await expect(primary).toHaveAttribute('href', /\/paths$/)
    await primary.click()
    await expect(page).toHaveURL(/\/paths$/)
  })

  test('home pathways section lists featured pathway cards', async ({ page }) => {
    await gotoPublicHomeAnonymous(page)
    const section = page.getByTestId('home-employable-pathways')
    await expect(section).toBeVisible()
    await expect(section.getByRole('link', { name: /open pathway/i }).first()).toBeVisible()
    await expect(section.getByTestId('home-pathways-primary-cta')).toHaveAttribute('href', /\/paths$/)
  })

  test('/paths shows intro and featured pathways section', async ({ page }) => {
    await page.goto('/paths')
    await expect(page.getByRole('heading', { name: /structured learning.*clear pathways.*evidence you can show/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /featured pathways/i })).toBeVisible()
    await expect(page.getByRole('link', { name: /open pathway/i }).first()).toBeVisible()
  })

  test('header Explore courses reaches catalog', async ({ page }) => {
    await gotoPublicHomeAnonymous(page)
    await page.getByTestId('home-nav-courses').click()
    await expect(page).toHaveURL(/\/learn$/)
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible()
  })
})
