import { useCallback, useContext, useMemo } from 'react'
import { useAuth } from '../auth/AuthContext'
import { AccessTierContext } from './accessTierContext'
import {
  type AccessTier,
  canAccessPlatformSurface,
  canAccessProLab,
  canSeeTenantMetadata,
  canSeeWorkspaceAdminSettings,
  resolveAccessTier,
} from './appAccess'
import {
  canManageInstitutionTrainingPlans,
  canViewOperatorInsightsNav,
  workspaceNavVariant,
} from './navRole'

export function useAppAccess() {
  const { user } = useAuth()
  const email = user?.email ?? null
  const accessTier = useContext(AccessTierContext)

  const fallbackTier: AccessTier = useMemo(() => resolveAccessTier(email), [email])
  const tier: AccessTier = accessTier?.tier ?? fallbackTier

  const refreshAccessTier = useCallback(async () => {
    await accessTier?.refreshAccessTier?.()
  }, [accessTier])

  return {
    tier,
    tierLoading: accessTier?.tierLoading ?? false,
    email,
    refreshAccessTier,
    showProLabNav: canAccessProLab(tier),
    showPlatformNav: canAccessPlatformSurface(tier),
    showTenantMetadata: canSeeTenantMetadata(tier),
    showWorkspaceAdminSettings: canSeeWorkspaceAdminSettings(tier),
    navVariant: workspaceNavVariant(tier),
    canManageInstitutionTrainingPlans: canManageInstitutionTrainingPlans(tier),
    canViewOperatorInsights: canViewOperatorInsightsNav(tier),
  }
}
