import type { AccessTier } from '../access/appAccess'
import { resolveAccessTier } from '../access/appAccess'
import { isAdminTier } from './admin/adminAccess'
import { safeReturnUrl } from './safeReturnUrl'

/** Default signed-in home for non-admin learners. */
export const LEARNER_DEFAULT_SIGNED_IN_PATH = '/dashboard' as const

/** Default signed-in home for platform / super admins. */
export const ADMIN_DEFAULT_SIGNED_IN_PATH = '/admin/dashboard' as const

export function defaultPostAuthPathForTier(tier: AccessTier): string {
  return isAdminTier(tier) ? ADMIN_DEFAULT_SIGNED_IN_PATH : LEARNER_DEFAULT_SIGNED_IN_PATH
}

/**
 * After sign-in / magic-link: admins land in the admin console unless `returnUrl` points at a
 * specific learner or public path they explicitly requested.
 */
export function resolvePostAuthNavigatePath(email: string, returnUrlParam: string | null | undefined): string {
  const tier = resolveAccessTier(email.trim().toLowerCase())
  const safe = safeReturnUrl(returnUrlParam)

  if (!isAdminTier(tier)) {
    if (!safe) return LEARNER_DEFAULT_SIGNED_IN_PATH
    if (safe.startsWith('/admin')) return LEARNER_DEFAULT_SIGNED_IN_PATH
    return safe
  }

  if (!safe) return ADMIN_DEFAULT_SIGNED_IN_PATH

  if (safe.startsWith('/admin')) return safe

  const learnerOrPublic =
    safe.startsWith('/learn') ||
    safe.startsWith('/library') ||
    safe.startsWith('/account') ||
    safe.startsWith('/my-learning') ||
    safe.startsWith('/reports') ||
    safe.startsWith('/settings') ||
    safe.startsWith('/disclaimer') ||
    safe.startsWith('/privacy') ||
    safe.startsWith('/terms') ||
    safe.startsWith('/support') ||
    safe.startsWith('/contact') ||
    safe.startsWith('/refunds') ||
    safe.startsWith('/pricing')

  if (learnerOrPublic) return safe

  if (safe === '/dashboard' || safe === '/' || safe === '') return ADMIN_DEFAULT_SIGNED_IN_PATH

  return ADMIN_DEFAULT_SIGNED_IN_PATH
}
