import { expect, test } from '@playwright/test'
import { PRACTICAL_MATH_SLUG } from '../src/data/courses/practicalMathematicsCourseConstants'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

test.describe('Standalone full course pages (public)', () => {
  test.beforeEach(async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
  })

  test('Practical Mathematics detail: one Free access label', async ({ page }) => {
    await page.goto(`/learn/${PRACTICAL_MATH_SLUG}`)
    const root = page.getByTestId(`standalone-course-detail-${PRACTICAL_MATH_SLUG}`)
    await expect(root).toBeVisible({ timeout: 20_000 })
    await expect(root.getByTestId(`standalone-course-access-label-${PRACTICAL_MATH_SLUG}`)).toHaveCount(1)
    await expect(root.getByTestId(`standalone-course-access-label-${PRACTICAL_MATH_SLUG}`)).toHaveText(/^Free$/)
  })

  test('certificate page (locked) renders eligibility copy', async ({ page }) => {
    await page.goto(`/learn/${PRACTICAL_MATH_SLUG}/certificate`)
    await expect(page.getByTestId('standalone-certificate-locked')).toBeVisible({ timeout: 20_000 })
    const text = (await page.getByTestId('standalone-certificate-locked').innerText()).toLowerCase()
    expect(text).not.toContain('account-wide')
    expect(text).not.toContain('sync is available')
  })
})
