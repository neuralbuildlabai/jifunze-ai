import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { canAccessPlatformSurface, canAccessProLab } from '../../access/appAccess'
import { useAppAccess } from '../../access/useAppAccess'

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
