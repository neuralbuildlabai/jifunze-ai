import { test, expect, type Page } from '@playwright/test'

const hasSmokeCreds = Boolean(process.env.SMOKE_EMAIL?.trim() && process.env.SMOKE_PASSWORD?.trim())

function attachDiagnostics(page: Page, critical: string[]) {
  page.on('pageerror', (err) => {
    critical.push(`pageerror: ${err.message}`)
  })
  page.on('requestfailed', (req) => {
    const u = req.url()
    if (u.includes('favicon')) return
    critical.push(`requestfailed: ${req.method()} ${u} ${req.failure()?.errorText ?? ''}`)
  })
}

test.describe('Live authenticated UAT (real Supabase)', () => {
  test.skip(!hasSmokeCreds, 'Set SMOKE_EMAIL and SMOKE_PASSWORD (e.g. .env.smoke.local from uatProvisionSmokeUser)')

  test('full session: sign in → learn catalog → learner dashboard → sign out', async ({ page, context, baseURL }) => {
    const critical: string[] = []
    attachDiagnostics(page, critical)

    await context.clearCookies()

    const email = process.env.SMOKE_EMAIL!.trim()
    const password = process.env.SMOKE_PASSWORD!.trim()

    await page.goto(`${baseURL}/?auth=signin#auth`, { waitUntil: 'domcontentloaded' })

    await page.getByLabel(/^email$/i).fill(email)
    await page.getByLabel(/^password$/i).fill(password)
    await page.getByRole('button', { name: /^sign in$/i }).click()

    await expect(page.getByRole('button', { name: /sign out/i })).toBeVisible({ timeout: 120_000 })

    await page.goto(`${baseURL}/learn`, { waitUntil: 'domcontentloaded' })
    await expect(page.getByTestId('learning-discovery-hub')).toBeVisible({ timeout: 60_000 })

    await page.goto(`${baseURL}/dashboard`, { waitUntil: 'domcontentloaded' })
    await expect(page.getByTestId('learner-dashboard-home')).toBeVisible({ timeout: 60_000 })

    await page.goto(`${baseURL}/ideas`, { waitUntil: 'domcontentloaded' })
    await expect(page).toHaveURL(/\/learn$/, { timeout: 60_000 })

    await page.goto(`${baseURL}/platform`, { waitUntil: 'domcontentloaded' })
    await expect(page).toHaveURL(/\/(learn|dashboard|admin\/health)$/, { timeout: 60_000 })

    await page.getByRole('button', { name: /sign out/i }).click()
    await expect(page.getByRole('button', { name: /sign out/i })).toHaveCount(0, { timeout: 30_000 })

    expect(critical, `Hard failures:\n${critical.join('\n')}`).toEqual([])
  })
})
