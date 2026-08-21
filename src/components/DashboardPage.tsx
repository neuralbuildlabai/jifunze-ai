import { Navigate } from 'react-router-dom'
import { LearnerDashboardPage } from './learning/LearnerDashboardPage'
import { useAuth } from '../auth/AuthContext'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { useAdminAccess } from './admin/useAdminAccess'
import { ADMIN_DEFAULT_SIGNED_IN_PATH } from '../lib/signedInDefaultRoute'

/**
 * Signed-in learner home — progress, continue learning, and next steps (warm shell via {@link LearnerAppShell}).
 *
 * Post-Wave-1 (2026-05-18): workspace/tenant bootstrap removed. The "account setup recovery" UI
 * is gone — signed-in users either reach the dashboard or, if they're admins, are redirected to
 * the admin shell. Auth loading still produces a brief loading state.
 */
export function DashboardPage() {
  const { user, loading: authLoading } = useAuth()
  const { canAccessAdmin, tierLoading, playwrightAdminShellBypass } = useAdminAccess()

  if (
    isSupabaseConfigured() &&
    user &&
    canAccessAdmin &&
    !tierLoading &&
    !playwrightAdminShellBypass
  ) {
    return <Navigate to={ADMIN_DEFAULT_SIGNED_IN_PATH} replace />
  }

  if (isSupabaseConfigured() && authLoading) {
    return (
      <div className="mx-auto flex min-h-[min(70vh,48rem)] w-full max-w-2xl items-center justify-center px-4 py-12">
        <p className="text-sm text-stone-600">Loading…</p>
      </div>
    )
  }

  return <LearnerDashboardPage />
}
