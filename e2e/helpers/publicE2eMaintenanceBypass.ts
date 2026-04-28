import type { Page } from '@playwright/test'

/**
 * Must match `webServer.env.VITE_MAINTENANCE_BYPASS_TOKEN` in `playwright.config.ts`.
 * Lets anonymous Playwright sessions see marketing surfaces while `FORCE_PUBLIC_MAINTENANCE_UI`
 * is enabled in `maintenanceMode.ts`.
 */
export const PUBLIC_E2E_MAINTENANCE_BYPASS_TOKEN = 'playwright-maintenance-bypass'

const SESSION_BYPASS_KEY = 'jf_maintenance_preview_v1'

/**
 * Clears cookies, strips common auth keys from localStorage, and sets the maintenance preview
 * bypass in sessionStorage so non-exempt public routes render the real UI.
 */
export async function applyPublicE2eMaintenanceBypass(page: Page): Promise<void> {
  await page.context().clearCookies()
  await page.addInitScript(
    ({ sessionKey, token }) => {
      try {
        for (const k of Object.keys(localStorage)) {
          if (/supabase|sb-|jifunze\.auth/i.test(k)) localStorage.removeItem(k)
        }
        sessionStorage.clear()
        sessionStorage.setItem(sessionKey, token)
      } catch {
        /* ignore */
      }
    },
    { sessionKey: SESSION_BYPASS_KEY, token: PUBLIC_E2E_MAINTENANCE_BYPASS_TOKEN },
  )
}
