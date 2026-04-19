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

  test('full session: sign in → bootstrap → pages → generate → sign out', async ({ page, context, baseURL }) => {
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

    await page.reload({ waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('button', { name: /sign out/i })).toBeVisible({ timeout: 60_000 })

    await page.goto(`${baseURL}/ideas`, { waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('heading', { level: 1, name: /^ideas$/i })).toBeVisible({ timeout: 60_000 })

    await page.goto(`${baseURL}/studio`, { waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('heading', { level: 1, name: /^studio$/i })).toBeVisible({ timeout: 60_000 })

    await page.goto(`${baseURL}/settings`, { waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('heading', { level: 1, name: /^settings$/i })).toBeVisible({ timeout: 60_000 })

    await page.goto(`${baseURL}/lab`, { waitUntil: 'domcontentloaded' })
    await expect
      .poll(() => new URL(page.url()).pathname)
      .toMatch(/^\/(lab|settings)$/)

    await page.goto(`${baseURL}/platform`, { waitUntil: 'domcontentloaded' })
    await expect
      .poll(() => new URL(page.url()).pathname)
      .toMatch(/^\/(platform)?$/)

    await page.goto(`${baseURL}/`, { waitUntil: 'domcontentloaded' })
    await expect(page.getByRole('heading', { name: /create your first post/i })).toBeVisible({ timeout: 60_000 })

    await page.getByPlaceholder(/e\.g\. launching a new skincare product/i).fill('UAT live verification — short topic line')
    await page.locator('#signed-in-create').getByRole('button', { name: /^generate$/i }).click()

    await expect(page.getByText(/^Hashtags$/i).first()).toBeVisible({ timeout: 120_000 })

    const copyBtn = page.getByRole('button', { name: /copy result/i })
    if (await copyBtn.isVisible().catch(() => false)) {
      await copyBtn.click()
    }

    await page.getByRole('button', { name: /sign out/i }).click()
    await expect(page.getByRole('button', { name: /sign out/i })).toHaveCount(0, { timeout: 30_000 })
    await expect(
      page.getByRole('heading', { name: /turn one idea into a ready-to-post caption/i }),
    ).toBeVisible({ timeout: 30_000 })

    expect(critical, `Hard failures:\n${critical.join('\n')}`).toEqual([])
  })
})
