import { expect, test } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'
import {
  SMART_WORKFLOWS_MICROLEARNING_HERO_BADGE,
  SMART_WORKFLOWS_MICROLEARNING_LESSON_FLOW,
} from '../src/data/learning/smartWorkflowsMicrolearningPageCopy'

test.describe('Smart Workflows microlearning detail page', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('compact starter layout: single Free badge, outline, embed, no duplicate primary CTAs', async ({ page }) => {
    await page.goto('/learn/free/smart-workflows-with-ai')
    const root = page.getByTestId('free-starter-smart-workflows-with-ai-page')
    await expect(root).toBeVisible({ timeout: 20_000 })

    await expect(page.getByTestId('smart-workflows-free-badge')).toHaveText(SMART_WORKFLOWS_MICROLEARNING_HERO_BADGE)
    await expect(root.getByText(/\bFree\b/i)).toHaveCount(1)

    const shellText = (await root.innerText()).toLowerCase()
    expect(shellText).not.toMatch(/\barticulate\b/i)
    expect(shellText).not.toContain('account-wide')
    expect(shellText).not.toContain('sync is available')
    expect(shellText).not.toContain('learn with a guided jifunze.ai interactive course')
    expect(shellText).not.toMatch(/\brise\b/)
    expect(shellText).not.toContain('scorm')

    await expect(page.getByRole('heading', { level: 1, name: 'Smart Workflows with AI' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 2, name: /^What you will be able to do$/i })).toHaveCount(0)
    await expect(page.getByRole('heading', { level: 2, name: /^Course outline$/i })).toBeVisible()

    for (const title of SMART_WORKFLOWS_MICROLEARNING_LESSON_FLOW) {
      await expect(root.getByText(title, { exact: true })).toBeVisible()
    }

    const frame = page.locator('iframe[title="Smart Workflows with AI — interactive workshop"]')
    await expect(frame).toBeVisible()
    await expect(frame).toHaveAttribute('src', /\/course-assets\/interactive\/smart-workflows-with-ai\/content\/index\.html$/)

    await expect(page.getByTestId('free-starter-smart-workflows-start')).toBeVisible()
    await expect(page.getByTestId('free-starter-smart-workflows-open-tab')).toHaveText('Open in new window')

    await expect(page.getByRole('link', { name: /free courses/i })).toHaveCount(0)
    await expect(page.getByTestId('learner-catalog-footer-bar').getByRole('link', { name: /^privacy$/i })).toBeVisible()
  })
})
