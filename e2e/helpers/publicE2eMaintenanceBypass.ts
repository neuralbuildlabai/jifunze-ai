import type { Page } from '@playwright/test'

/**
 * Anonymous-visitor reset for public E2E specs.
 *
 * HISTORY (2026-08-20): this helper used to write a `VITE_MAINTENANCE_BYPASS_TOKEN` value into
 * `sessionStorage` to unlock the maintenance shell. That client-side bypass has been removed from
 * the application (see `src/lib/maintenanceMode.ts`), because any `VITE_*` value is compiled into
 * the public browser bundle and therefore cannot be a secret.
 *
 * The function name is retained so the ~20 public specs that call it keep working unchanged. It now
 * does only what those specs actually need: start each test as a clean anonymous visitor. Playwright
 * runs against the dev server, where maintenance mode is off by default, so no bypass is required.
 *
 * If a suite ever needs to exercise a maintenance-ON build, sign a user in — authenticated users
 * are exempt by design. Do not reintroduce a token.
 */
export async function applyPublicE2eMaintenanceBypass(page: Page): Promise<void> {
  await page.context().clearCookies()
  await page.addInitScript(() => {
    try {
      for (const k of Object.keys(localStorage)) {
        if (/supabase|sb-|jifunze\.auth/i.test(k)) localStorage.removeItem(k)
      }
      sessionStorage.clear()
    } catch {
      /* ignore */
    }
  })
}
