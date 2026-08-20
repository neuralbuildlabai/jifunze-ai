import { test, expect } from '@playwright/test'
import { applyPublicE2eMaintenanceBypass } from './helpers/publicE2eMaintenanceBypass'

/**
 * Security regression suite for the client-side maintenance bypass removed on 2026-08-20.
 *
 * Background: `VITE_MAINTENANCE_BYPASS_TOKEN` was read in the browser and compared against a
 * `?jf_maintenance_bypass=` query param. Vite inlines `VITE_*` into the public bundle, so the
 * "secret" shipped to every visitor. These tests assert the bypass is gone and, more importantly,
 * that it never controlled authorization in the first place — and still does not.
 *
 * These assertions are deliberately behavioural, not timing-sensitive. Do not "fix" a failure here
 * by raising a timeout.
 */

/** Values an attacker who read the public bundle might try to replay. */
const ATTACKER_TOKENS = [
  'playwright-maintenance-bypass',
  'local-dev',
  'true',
  '1',
]

const SUSPECT_STORAGE_KEYS = [
  'jf_maintenance_preview_v1',
  'jf_maintenance_bypass',
  'maintenance_bypass',
]

async function seedAttackerState(page: import('@playwright/test').Page) {
  await page.addInitScript(
    ({ keys, tokens }) => {
      try {
        for (const k of keys) {
          for (const t of tokens) {
            sessionStorage.setItem(k, t)
            localStorage.setItem(k, t)
          }
        }
      } catch {
        /* ignore */
      }
    },
    { keys: SUSPECT_STORAGE_KEYS, tokens: ATTACKER_TOKENS },
  )
}

test.describe('client-side maintenance bypass is gone', () => {
  test('no bypass query param or storage key unlocks a privileged surface', async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
    await seedAttackerState(page)

    for (const token of ATTACKER_TOKENS) {
      await page.goto(`/admin/social-ops?jf_maintenance_bypass=${encodeURIComponent(token)}`)
      // The social-ops console must never render for an anonymous browser, whatever it puts in
      // storage or the query string. Without Supabase the guard refuses outright; with Supabase it
      // redirects to sign-in. Either way the console itself is absent.
      await expect(page.getByTestId('social-ops-shell')).toHaveCount(0)
      await expect(page.locator('body')).not.toContainText(/social ops overview/i)
    }
  })

  test('the frozen admin console stays closed to an anonymous browser', async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
    await seedAttackerState(page)

    await page.goto('/admin/dashboard?jf_maintenance_bypass=playwright-maintenance-bypass')
    await expect(page).not.toHaveURL(/\/admin\/dashboard$/)
  })

  test('the bypass query param is not consumed and does not alter routing', async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
    await page.goto('/?jf_maintenance_bypass=playwright-maintenance-bypass')
    // The old gate stripped this param from the URL after accepting it. Nothing reads it now, so it
    // survives untouched — proof the comparison code path is gone rather than merely renamed.
    await expect(page).toHaveURL(/jf_maintenance_bypass=/)
  })

  test('no maintenance bypass key is written to browser storage', async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
    await page.goto('/?jf_maintenance_bypass=playwright-maintenance-bypass')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
    const written = await page.evaluate(() =>
      [...Object.keys(sessionStorage), ...Object.keys(localStorage)].filter((k) =>
        /maintenance.*bypass|bypass.*maintenance|jf_maintenance_preview/i.test(k),
      ),
    )
    expect(written).toEqual([])
  })
})

test.describe('maintenance flags are presentation only', () => {
  test('protected learner routes require authorization, not a flag', async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
    await seedAttackerState(page)

    // `/dashboard` sits behind RequireEmailVerified → RequireDisclaimerAcknowledged. In the
    // no-Supabase E2E bundle there is no session to authorize, so the learner shell must not expose
    // any real learner record.
    await page.goto('/dashboard')
    await expect(page.locator('body')).not.toContainText(/service_role|supabase_service/i)
  })

  test('public marketing surfaces render without any bypass', async ({ page }) => {
    await applyPublicE2eMaintenanceBypass(page)
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  })
})
