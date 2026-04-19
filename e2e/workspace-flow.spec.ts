import { test, expect } from '@playwright/test'

test.describe('Workspace IA (demo / no Supabase env)', () => {
  test('ideas → studio via workspace nav', async ({ page }) => {
    await page.goto('/ideas')
    await expect(page.getByRole('heading', { level: 1, name: /^ideas$/i })).toBeVisible({
      timeout: 15_000,
    })
    await page.getByRole('navigation', { name: 'Workspace' }).getByRole('link', { name: 'Studio' }).click()
    await expect(page).toHaveURL(/\/studio$/)
    await expect(page.getByRole('heading', { level: 1, name: /^studio$/i })).toBeVisible()
  })
})
