import { Navigate } from 'react-router-dom'
import { useAdminAccess } from '../admin/useAdminAccess'

/** `/platform` is retired; admins go to Health, everyone else to the public catalog. */
export function LegacyPlatformRedirect() {
  const { canAccessAdmin } = useAdminAccess()
  if (canAccessAdmin) {
    return <Navigate to="/admin/health" replace />
  }
  return <Navigate to="/learn" replace />
}
