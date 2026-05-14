import type { Page } from '@playwright/test'

import { applyPublicE2eMaintenanceBypass } from './publicE2eMaintenanceBypass'

/**
 * Visit the public learning catalog as an anonymous visitor: maintenance bypass (when configured) + auth cleanup
 * so Playwright does not inherit a signed-in session when reusing a local dev server.
 */
export async function gotoPublicHomeAnonymous(page: Page): Promise<void> {
  await applyPublicE2eMaintenanceBypass(page)
  await page.goto('/learn')
}
