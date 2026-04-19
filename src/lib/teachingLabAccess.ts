import type { AccessTier } from '../access/appAccess'
import { isAtLeastTier } from '../access/appAccess'
import type { TeachingLab } from '../data/teaching/teachingTypes'

/** Matches premium lesson gating pattern: eligible plans expand materials—never outcomes. */
export function canAccessTeachingLab(user: unknown, tier: AccessTier, lab: TeachingLab): boolean {
  if (lab.labAccess === 'public') return true
  if (lab.labAccess === 'signed_in') return Boolean(user)
  return Boolean(user) && isAtLeastTier(tier, 'pro')
}

export function teachingLabAccessLabel(lab: TeachingLab): string {
  if (lab.labAccess === 'public') return 'Public starter lab'
  if (lab.labAccess === 'signed_in') return 'Signed-in lab'
  return 'Deeper lab (eligible plans)'
}
