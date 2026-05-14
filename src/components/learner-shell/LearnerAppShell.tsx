import { Outlet } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { LearnerHelpAssistant } from '../teaching/LearnerHelpAssistant'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { LearnerTopNav } from './LearnerTopNav'
import { LearnerProfileMenu } from './LearnerProfileMenu'
import { learnerShellTokens } from './learnerShellTokens'

/**
 * Signed-in learner layout — public-catalog aesthetic only (no operator workspace chrome).
 */
export function LearnerAppShell() {
  const { user } = useAuth()

  return (
    <div className={`jf-learn-warm min-h-screen w-full ${learnerShellTokens.workspaceBg}`}>
      <div className={learnerShellTokens.workspaceInner}>
        <header
          className={`mb-10 flex flex-col gap-5 pb-6 sm:flex-row sm:items-center sm:justify-between ${learnerShellTokens.workspaceHeaderBorder}`}
        >
          <div className="min-w-0 shrink-0">
            <JifunzeBrandLogo to="/" size="lg" variant="full" surface="light" />
          </div>
          <div className="flex min-w-0 flex-col items-stretch gap-3 sm:items-end">
            <div className="flex flex-wrap items-center justify-end gap-2">
              {isSupabaseConfigured() && user ? <LearnerProfileMenu /> : null}
            </div>
            <LearnerTopNav className="justify-start sm:justify-end" />
          </div>
        </header>
        <Outlet />
      </div>
      <LearnerHelpAssistant />
    </div>
  )
}
