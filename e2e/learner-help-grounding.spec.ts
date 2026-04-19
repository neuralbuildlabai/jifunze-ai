import { test, expect } from '@playwright/test'

test.describe('Learner help grounding (public lessons)', () => {
  test('embedded help returns a KB-grounded answer for a strong curriculum query', async ({ page }) => {
    await page.goto('/library/ai-foundations/ai-foundations-what-ai-is-and-what-it-is-not')
    await expect(page.getByRole('heading', { name: /What AI Is and What It Is Not/i }).first()).toBeVisible()

    await page.getByLabel(/your question/i).fill(
      'Explain hallucination confidence limits knowledge boundaries verification',
    )
    await page.getByRole('button', { name: /ask \(grounded\)/i }).click()

    await expect(page.getByTestId('learner-help-answer-title')).not.toContainText(/not enough grounded overlap/i, {
      timeout: 15_000,
    })
    await expect(page.getByText(/confidence:/i).first()).toBeVisible()
  })

  test('embedded help fails gracefully when query has no curriculum overlap', async ({ page }) => {
    await page.goto('/library/ai-foundations/ai-foundations-what-ai-is-and-what-it-is-not')
    // Avoid accidental substring hits against KB text (e.g. “token” matching “tokens”).
    await page.getByLabel(/your question/i).fill('xxxxxx yyyyyy zzzzzz vvvvvv wwwwww')
    await page.getByRole('button', { name: /ask \(grounded\)/i }).click()

    await expect(page.getByTestId('learner-help-answer-title')).toContainText(/not enough grounded overlap/i, {
      timeout: 15_000,
    })
  })

  test('ML lesson help answers a grounded supervised/unsupervised query on the public starter lesson', async ({
    page,
  }) => {
    // Use the public starter ML module (module 1) so anonymous browsers still see embedded help under access rules.
    await page.goto('/library/machine-learning-foundations/machine-learning-foundations-what-machine-learning-means')
    await expect(page.getByRole('heading', { name: /What Machine Learning Means/i }).first()).toBeVisible()

    await page.getByLabel(/your question/i).fill('supervised vs unsupervised learning difference examples')
    await page.getByRole('button', { name: /ask \(grounded\)/i }).click()

    await expect(page.getByTestId('learner-help-answer-title')).not.toContainText(/not enough grounded overlap/i, {
      timeout: 15_000,
    })
    await expect(page.getByText(/supervised/i).first()).toBeVisible()
  })
})
