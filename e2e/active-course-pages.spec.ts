import { expect, test } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'
import {
  getFullCourseCatalogItems,
  getMicrolearningCatalogItems,
} from '../src/data/learning/availablePublicLearnCatalog'

test.describe('Active course pages (public)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('/learn renders without forbidden builder terms', async ({ page }) => {
    await page.goto('/learn')
    const hub = page.getByTestId('learning-discovery-hub')
    await expect(hub).toBeVisible({ timeout: 20_000 })
    const text = (await hub.innerText()).toLowerCase()
    expect(text).not.toContain('articulate')
    expect(text).not.toContain('storyline')
    expect(text).not.toContain('scorm')
  })

  for (const course of getMicrolearningCatalogItems()) {
    test(`microlearning ${course.slug}: route loads, one "Free" in page body`, async ({ page }) => {
      await page.goto(course.route)
      const root = page.getByTestId(
        course.slug === 'smart-workflows-with-ai'
          ? 'free-starter-smart-workflows-with-ai-page'
          : course.slug === 'business-analytics-decision-making'
            ? 'free-starter-business-analytics-decision-making-page'
            : 'free-starter-ai-at-work-chatgpt-page',
      )
      await expect(root).toBeVisible({ timeout: 20_000 })
      const body = (await root.innerText()).toLowerCase()
      expect(body).not.toContain('articulate')
      expect(body).not.toContain('account-wide')
      expect(body).not.toContain('sync is available')
      expect(body).not.toContain('not a full analytics')
      expect(body).not.toContain('native mastery')
      expect(body).not.toContain('learning hub paths')
      await expect(root.getByText(/^Free$/i)).toHaveCount(1)
      await expect(root.getByRole('heading', { level: 2, name: 'What you will be able to do' })).toBeVisible()
      const flowName =
        course.slug === 'smart-workflows-with-ai' ? 'Workshop flow' : 'Lesson flow'
      await expect(root.getByRole('heading', { level: 2, name: flowName })).toBeVisible()
    })
  }

  for (const course of getFullCourseCatalogItems()) {
    test(`full course ${course.slug}: catalog route resolves`, async ({ page }) => {
      await page.goto(course.route)
      await expect(page.getByTestId(`standalone-course-detail-${course.slug}`)).toBeVisible({ timeout: 20_000 })
    })
  }
})
