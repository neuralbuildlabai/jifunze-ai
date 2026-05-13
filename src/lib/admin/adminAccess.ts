import type { AccessTier } from '../../access/appAccess'
import { isAtLeastTier } from '../../access/appAccess'

export function isSuperAdmin(tier: AccessTier): boolean {
  return tier === 'super_admin'
}

export function isPlatformAdmin(tier: AccessTier): boolean {
  return tier === 'platform_admin'
}

/** Platform operators who may use /admin (excludes workspace_admin and learners). */
export function isAdminTier(tier: AccessTier): boolean {
  return isAtLeastTier(tier, 'platform_admin')
}
