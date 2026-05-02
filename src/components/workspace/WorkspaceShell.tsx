import { Outlet } from 'react-router-dom'
import { useAppAccess } from '../../access/useAppAccess'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { WorkspaceGeneratorProvider } from '../../workspace/WorkspaceGeneratorContext'
import { LearnerHelpAssistant } from '../teaching/LearnerHelpAssistant'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { LearnerTopNav } from '../learner-shell/LearnerTopNav'
import { learnerShellTokens } from '../learner-shell/learnerShellTokens'
import { WorkspaceNav } from './WorkspaceNav'

export function WorkspaceShell() {
  const { navVariant } = useAppAccess()
  const { user, signOut, signOutPending } = useAuth()
  const isLearner = navVariant === 'learner'

  const workspaceBlurb = 'Continue courses, manage your workspace, and open account tools from here.'

  return (
    <WorkspaceGeneratorProvider>
      <div
        className={
          isLearner
            ? learnerShellTokens.workspaceBg
            : 'min-h-screen w-full bg-[radial-gradient(ellipse_120%_80%_at_50%_-15%,rgba(255,255,255,0.06),transparent_55%),linear-gradient(180deg,_#0c0c0f_0%,_#09090b_52%,_#070709_100%)] text-zinc-100'
        }
      >
        <div className={isLearner ? learnerShellTokens.workspaceInner : 'relative mx-auto max-w-5xl px-4 pb-16 pt-8 sm:pb-20 sm:pt-10'}>
          {isLearner ? (
            <header className={`mb-10 flex flex-col gap-5 pb-6 sm:flex-row sm:items-center sm:justify-between ${learnerShellTokens.workspaceHeaderBorder}`}>
              <div className="min-w-0 shrink-0">
                <JifunzeBrandLogo to="/dashboard" size="lg" variant="full" surface="dark" />
              </div>
              <div className="flex min-w-0 flex-col items-stretch gap-3 sm:items-end">
                <div className="flex flex-wrap items-center justify-end gap-2">
                  {isSupabaseConfigured() && user ? (
                    <button
                      type="button"
                      disabled={signOutPending}
                      onClick={() => void signOut()}
                      className="inline-flex min-h-[2.25rem] shrink-0 items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.04] px-3 text-xs font-semibold text-zinc-100 transition hover:border-white/[0.14] hover:bg-white/[0.07] disabled:cursor-not-allowed disabled:opacity-50"
                      data-testid="workspace-shell-sign-out"
                    >
                      {signOutPending ? 'Signing out…' : 'Sign out'}
                    </button>
                  ) : null}
                </div>
                <LearnerTopNav className="justify-start sm:justify-end" />
              </div>
            </header>
          ) : (
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
          )}
          <Outlet />
        </div>
        <LearnerHelpAssistant />
      </div>
    </WorkspaceGeneratorProvider>
  )
}
