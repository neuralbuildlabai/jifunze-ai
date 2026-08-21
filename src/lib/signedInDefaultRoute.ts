import type { AccessTier } from '../access/appAccess'
import { resolveAccessTier } from '../access/appAccess'
import { isAdminTier } from './admin/adminAccess'
import { safeReturnUrl } from './safeReturnUrl'

/**
 * Signed-in defaults after the pivot (Amendment 003): there is no learner workspace any more.
 * Admins land in the admin console; anyone else stays on the public site.
 */

/** Default signed-in home for non-admin accounts: the public site. */
export const LEARNER_DEFAULT_SIGNED_IN_PATH = '/' as const

/** Default signed-in home for platform / super admins. */
export const ADMIN_DEFAULT_SIGNED_IN_PATH = '/admin' as const

export function defaultPostAuthPathForTier(tier: AccessTier): string {
  return isAdminTier(tier) ? ADMIN_DEFAULT_SIGNED_IN_PATH : LEARNER_DEFAULT_SIGNED_IN_PATH
}

/**
 * After sign-in: admins land in the admin console unless `returnUrl` points at a specific
 * `/admin` path they explicitly requested. Non-admin accounts can never be routed into `/admin`
 * via a returnUrl; they land on the public site.
 */
export function resolvePostAuthNavigatePath(email: string, returnUrlParam: string | null | undefined): string {
  const tier = resolveAccessTier(email.trim().toLowerCase())
  const safe = safeReturnUrl(returnUrlParam)

  if (!isAdminTier(tier)) {
    return LEARNER_DEFAULT_SIGNED_IN_PATH
  }

  if (safe && safe.startsWith('/admin')) return safe
  return ADMIN_DEFAULT_SIGNED_IN_PATH
}
