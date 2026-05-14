import { expect, test } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'
import {
  getFullCourseCatalogItems,
  getMicrolearningCatalogItems,
} from '../src/data/learning/availablePublicLearnCatalog'

function microlearningPageRootTestId(slug: string): string {
  switch (slug) {
    case 'smart-workflows-with-ai':
      return 'free-starter-smart-workflows-with-ai-page'
    case 'business-analytics-decision-making':
      return 'free-starter-business-analytics-decision-making-page'
    case 'ai-at-work-chatgpt':
      return 'free-starter-ai-at-work-chatgpt-page'
    case '5-day-mental-wellbeing-reset':
      return 'free-starter-5-day-mental-wellbeing-reset-page'
    default:
      throw new Error(`Unhandled microlearning slug in E2E: ${slug}`)
  }
}

function microlearningEmbedTestId(slug: string, pageRootTestId: string): string {
  return slug === '5-day-mental-wellbeing-reset' ? 'wellbeing-reset-embed' : `${pageRootTestId}-embed`
}

function microlearningFlowOutlineHeading(slug: string): string {
  return slug === '5-day-mental-wellbeing-reset' ? 'Five-day rhythm' : 'Course outline'
}

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
      const pageRootTestId = microlearningPageRootTestId(course.slug)
      const root = page.getByTestId(pageRootTestId)
      await expect(root).toBeVisible({ timeout: 20_000 })
      const body = (await root.innerText()).toLowerCase()
      expect(body).not.toContain('articulate')
      expect(body).not.toContain('storyline')
      expect(body).not.toContain('scorm')
      expect(body).not.toMatch(/\brise\s*360\b/i)
      expect(body).not.toContain('account-wide')
      expect(body).not.toContain('sync is available')
      expect(body).not.toContain('not a full analytics')
      expect(body).not.toContain('native mastery')
      expect(body).not.toContain('learning hub paths')
      await expect(root.getByText(/^Free$/i)).toHaveCount(1)
      await expect(root.getByRole('heading', { level: 2, name: 'What you will be able to do' })).toHaveCount(0)
      await expect(root.getByRole('heading', { level: 2, name: microlearningFlowOutlineHeading(course.slug) })).toBeVisible()
      if (course.slug === '5-day-mental-wellbeing-reset') {
        await expect(root.locator('#day-1')).toBeVisible()
      } else {
        await expect(root.locator('#flow-1')).toBeVisible()
      }
      await expect(root.getByTestId(microlearningEmbedTestId(course.slug, pageRootTestId))).toBeVisible()
      await expect(root.getByTestId('learner-catalog-footer-bar')).toBeVisible()
      await expect(root.getByTestId('learner-catalog-footer-bar').getByRole('link', { name: /^Disclaimer$/i })).toBeVisible()
    })
  }

  for (const course of getFullCourseCatalogItems()) {
    test(`full course ${course.slug}: catalog route resolves`, async ({ page }) => {
      await page.goto(course.route)
      await expect(page.getByTestId(`standalone-course-detail-${course.slug}`)).toBeVisible({ timeout: 20_000 })
    })
  }
})
