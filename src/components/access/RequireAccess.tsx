import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { canAccessPlatformSurface, canAccessProLab, isAtLeastTier } from '../../access/appAccess'
import { useAppAccess } from '../../access/useAppAccess'

function workspaceFallbackPath(): string {
  return '/dashboard'
}

export function RequireProLab({ children }: { children: ReactNode }) {
  const { tier } = useAppAccess()
  if (!canAccessProLab(tier)) {
    return <Navigate to="/settings" replace />
  }
  return <>{children}</>
}

export function RequirePlatformSurface({ children }: { children: ReactNode }) {
  const { tier } = useAppAccess()
  if (!canAccessPlatformSurface(tier)) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}

/** Studio / Ideas / Trends — institution operators and platform admins only (not learner-facing). */
export function RequireInstitutionOperatorSurface({ children }: { children: ReactNode }) {
  const { tier } = useAppAccess()
  if (!isAtLeastTier(tier, 'workspace_admin')) {
    return <Navigate to={workspaceFallbackPath()} replace />
  }
  return <>{children}</>
}

/** Learning Insights — platform operators only. */
export function RequirePlatformInsights({ children }: { children: ReactNode }) {
  const { tier } = useAppAccess()
  if (!isAtLeastTier(tier, 'platform_admin')) {
    return <Navigate to={workspaceFallbackPath()} replace />
  }
  return <>{children}</>
}

/** Platform runtime / diagnostics — super-admin email only (see `CANONICAL_SUPER_ADMIN_EMAIL`). */
export function RequireSuperAdminSurface({ children }: { children: ReactNode }) {
  const { tier } = useAppAccess()
  if (tier !== 'super_admin') {
    return <Navigate to={workspaceFallbackPath()} replace />
  }
  return <>{children}</>
}

/** Training administration (assign catalog-backed plans). */
export function RequireTrainingPlanAdminSurface({ children }: { children: ReactNode }) {
  const { canManageInstitutionTrainingPlans } = useAppAccess()
  if (!canManageInstitutionTrainingPlans) {
    return <Navigate to="/dashboard" replace />
  }
  return <>{children}</>
}

export { RequireAdminAccess } from '../admin/RequireAdminAccess'
