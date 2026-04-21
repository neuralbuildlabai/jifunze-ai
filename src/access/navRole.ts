import type { AccessTier } from './appAccess'
import { isAtLeastTier } from './appAccess'

/** Workspace shell navigation variant aligned to primary product surfaces. */
export type WorkspaceNavVariant = 'learner' | 'institution_admin' | 'platform_admin' | 'super_admin'

export function workspaceNavVariant(tier: AccessTier): WorkspaceNavVariant {
  if (tier === 'super_admin') return 'super_admin'
  if (tier === 'platform_admin') return 'platform_admin'
  if (tier === 'workspace_admin') return 'institution_admin'
  return 'learner'
}

export function canViewOperatorInsightsNav(tier: AccessTier): boolean {
  return isAtLeastTier(tier, 'platform_admin')
}

/** Assign training plans, cohort paths, team learning administration. */
export function canManageInstitutionTrainingPlans(tier: AccessTier): boolean {
  return isAtLeastTier(tier, 'workspace_admin')
}
