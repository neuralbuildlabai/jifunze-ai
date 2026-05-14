import { Outlet } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { WorkspaceGeneratorProvider } from '../../workspace/WorkspaceGeneratorContext'
import { LearnerHelpAssistant } from '../teaching/LearnerHelpAssistant'
import { WorkspaceNav } from './WorkspaceNav'

/**
 * Operator / institution workspace chrome (studio-adjacent tools). Learners use {@link LearnerAppShell} via {@link SignedInSurfacesOutlet}.
 */
export function WorkspaceShell() {
  const { user, signOut, signOutPending } = useAuth()

  const workspaceBlurb = 'Assign training, review learner progress, and run internal tools — learner-facing views stay in the catalog and My Learning.'

  return (
    <WorkspaceGeneratorProvider>
      <div className="min-h-screen w-full bg-[radial-gradient(ellipse_120%_80%_at_50%_-15%,rgba(255,255,255,0.06),transparent_55%),linear-gradient(180deg,_#0c0c0f_0%,_#09090b_52%,_#070709_100%)] text-zinc-100">
        <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-8 sm:pb-20 sm:pt-10">
          <div className="mb-8 flex flex-col gap-4 border-b border-white/[0.06] pb-6 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Jifunze.AI workspace</p>
              <p className="mt-1 text-sm text-zinc-400">{workspaceBlurb}</p>
            </div>
            <div className="flex flex-col items-stretch gap-3 sm:items-end">
              {isSupabaseConfigured() && user ? (
                <button
                  type="button"
                  disabled={signOutPending}
                  onClick={() => void signOut()}
                  className="inline-flex min-h-[2.25rem] shrink-0 items-center justify-center self-end rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 text-xs font-semibold text-zinc-200 transition hover:border-violet-400/30 hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
                  data-testid="workspace-shell-sign-out"
                >
                  {signOutPending ? 'Signing out…' : 'Sign out'}
                </button>
              ) : null}
              <WorkspaceNav className="justify-end sm:justify-end" />
            </div>
          </div>
          <Outlet />
        </div>
        <LearnerHelpAssistant />
      </div>
    </WorkspaceGeneratorProvider>
  )
}
