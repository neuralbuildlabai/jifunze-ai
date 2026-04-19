import { expect, test } from '@playwright/test'

test.describe('Learning discovery (public)', () => {
  test('/learn hub renders featured courses + category cards', async ({ page }) => {
    await page.goto('/learn')
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByTestId('discovery-trending-course_chatgpt_everyday')).toBeVisible()
    await expect(page.getByTestId('discovery-section-course-index')).toBeVisible()
    await expect(page.getByTestId('learning-discovery-category-card-chatgpt')).toBeVisible()
  })

  test('category page renders browse surface + subscription note', async ({ page }) => {
    await page.goto('/learn/category/cybersecurity')
    await expect(page.getByTestId('learning-discovery-category-cybersecurity')).toBeVisible({ timeout: 20_000 })
    await expect(page.getByText(/Subscriptions · claim-safe framing/i)).toBeVisible()
    await expect(page.getByTestId('category-faq-cybersecurity')).toBeVisible()
    await expect(page.getByTestId('category-learn-more-cybersecurity')).toBeVisible()
  })

  test('invalid category slug redirects to /learn', async ({ page }) => {
    await page.goto('/learn/category/does-not-exist')
    await expect(page).toHaveURL(/\/learn$/)
  })
})
