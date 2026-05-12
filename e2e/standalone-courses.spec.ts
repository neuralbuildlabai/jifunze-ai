import { expect, test } from '@playwright/test'

import {
  AGENTIC_AI_REAL_WORK_LANDING_PATH,
  AGENTIC_AI_REAL_WORK_PUBLIC_BASE_PATH,
  CLAUDE_WRITING_RESEARCH_LANDING_PATH,
  CLAUDE_WRITING_RESEARCH_PUBLIC_BASE_PATH,
  GEMINI_WORKSPACE_PRODUCTIVITY_LANDING_PATH,
  PROMPT_ENGINEERING_MODELS_LANDING_PATH,
} from '../src/data/learning/standaloneCoursesCatalog'

test.describe('Standalone courses (public)', () => {
  test('legacy Learn ChatGPT everyday-work URLs redirect to AI at Work microlearning', async ({ page }) => {
    await page.goto('/courses/learn-chatgpt-everyday-work')
    await expect(page).toHaveURL(/\/learn\/free\/ai-at-work-chatgpt$/)

    await page.goto('/courses/learn-chatgpt-everyday-work/learn')
    await expect(page).toHaveURL(/\/learn\/free\/ai-at-work-chatgpt$/)

    await page.goto('/courses/learn-chatgpt-everyday-work/learn/lcew-m01-mental-models-what-chatgpt-is-in-plain-workplace-terms')
    await expect(page).toHaveURL(/\/learn\/free\/ai-at-work-chatgpt$/)
  })

  test('Prompt engineering course landing renders', async ({ page }) => {
    await page.goto(PROMPT_ENGINEERING_MODELS_LANDING_PATH)
    await expect(page.getByRole('heading', { name: /Prompt Engineering Across ChatGPT/i })).toBeVisible({
      timeout: 20_000,
    })
  })

  test('Gemini Workspace course landing renders', async ({ page }) => {
    await page.goto(GEMINI_WORKSPACE_PRODUCTIVITY_LANDING_PATH)
    await expect(page.getByRole('heading', { name: /Gemini for Productivity and Google Workspace/i })).toBeVisible({
      timeout: 20_000,
    })
  })

  test('Claude writing course landing + curriculum renders', async ({ page }) => {
    await page.goto(CLAUDE_WRITING_RESEARCH_LANDING_PATH)
    await expect(page.getByRole('heading', { name: /Claude for Writing, Research, and Deep Thinking/i })).toBeVisible({
      timeout: 20_000,
    })
    await expect(page.getByTestId('standalone-course-subscription-inclusion')).toBeVisible()

    await page.goto(`${CLAUDE_WRITING_RESEARCH_PUBLIC_BASE_PATH}`)
    await expect(page.getByText(/Deep-learning reader map/i)).toBeVisible({ timeout: 20_000 })

    await page.goto(
      `${CLAUDE_WRITING_RESEARCH_PUBLIC_BASE_PATH}/clw-m01-foundations-what-claude-style-assistance-means-in-writing-and-research`,
    )
    await expect(page.getByRole('heading', { name: /Concept teaching/i })).toBeVisible({ timeout: 20_000 })
  })

  test('Agentic AI course landing renders', async ({ page }) => {
    await page.goto(AGENTIC_AI_REAL_WORK_LANDING_PATH)
    await expect(page.getByRole('heading', { name: /Agentic AI and AI Agents for Real Work/i })).toBeVisible({
      timeout: 20_000,
    })
    await expect(page.getByTestId('standalone-course-subscription-inclusion')).toBeVisible()

    await page.goto(`${AGENTIC_AI_REAL_WORK_PUBLIC_BASE_PATH}`)
    await expect(page.getByText(/Deep-learning reader map/i)).toBeVisible({ timeout: 20_000 })
  })
})
