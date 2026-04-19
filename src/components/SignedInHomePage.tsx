import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { useDisclaimerAcknowledgment } from '../auth/useDisclaimerAcknowledgment'
import { isSupabaseConfigured } from '../config/supabaseEnv'
import { AuthForm } from './AuthForm'
import { WorkspaceNav } from './workspace/WorkspaceNav'
import { EmptyWorkspaceCreateBrand } from './EmptyWorkspaceCreateBrand'
import { JifunzeBrandLogo } from './brand/JifunzeBrandLogo'
import { SignedInEngagementStrip } from './SignedInEngagementStrip'
import { SignedInWelcomeBlock } from './SignedInWelcomeBlock'
import { SignedInQuickCreatePanel } from './SignedInQuickCreatePanel'
import { WorkspaceIdentityStrip } from './WorkspaceIdentityStrip'
import { useWorkspaceIdentity } from '../workspace/useWorkspaceIdentity'
import { DisclaimerAcknowledgmentModal } from './auth/DisclaimerAcknowledgmentModal'
import { EmailVerificationGate } from './auth/EmailVerificationGate'
import { recordTeachingSignal } from '../data/teaching/teachingSignals'

const WORKSPACE_ENTRY_ONCE_KEY = 'jifunze.signal.workspaceEntryOnce.v1'

export function SignedInHomePage() {
  const {
    user,
    emailVerified,
    brands,
    supabase,
    loading: authLoading,
    error: authError,
    workspaceTenantResolved,
    workspaceShellReady,
    signOut,
    signOutPending,
    retryWorkspaceBootstrap,
  } = useAuth()

  const { mustAcknowledge, acknowledge } = useDisclaimerAcknowledgment()

  const brand = brands[0] ?? null
  const workspaceIdentity = useWorkspaceIdentity()

  const [promptInjection, setPromptInjection] = useState<{ token: number; text: string } | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    try {
      if (window.sessionStorage.getItem(WORKSPACE_ENTRY_ONCE_KEY)) return
      window.sessionStorage.setItem(WORKSPACE_ENTRY_ONCE_KEY, '1')
      recordTeachingSignal({
        kind: 'signed_in_workspace_entry',
        payload: { surface: 'signed_in_home', schemaVersion: 1 },
      })
    } catch {
      // ignore storage failures
    }
  }, [])

  const applyEngagementPrompt = useCallback((text: string) => {
    setPromptInjection({ token: Date.now(), text })
  }, [])

  if (isSupabaseConfigured() && user && !emailVerified) {
    return <EmailVerificationGate />
  }

  if (isSupabaseConfigured() && user && emailVerified && mustAcknowledge) {
    return <DisclaimerAcknowledgmentModal onAcknowledge={acknowledge} />
  }

  const workspaceBootstrapNeedsRecovery =
    isSupabaseConfigured() &&
    Boolean(user) &&
    !workspaceTenantResolved &&
    authError != null

  if (workspaceBootstrapNeedsRecovery) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <header className="space-y-2">
            <h1 className="text-2xl font-semibold text-white">Workspace setup</h1>
            <p className="whitespace-pre-wrap text-sm text-rose-300/90">{authError}</p>
          </header>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => void retryWorkspaceBootstrap()}
              className="rounded-lg border border-violet-500/40 bg-violet-600/25 px-4 py-2 text-sm font-medium text-violet-100 hover:bg-violet-600/35"
            >
              Retry workspace setup
            </button>
            <button
              type="button"
              disabled={signOutPending}
              onClick={() => void signOut()}
              className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (isSupabaseConfigured() && authLoading && !workspaceShellReady) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <p className="text-sm text-zinc-400">Loading workspace…</p>
        </div>
      </div>
    )
  }

  if (isSupabaseConfigured() && !user) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
        <div className="w-full max-w-2xl space-y-6 text-center">
          <header className="space-y-2">
            <h1 className="text-2xl font-semibold text-white">Jifunze.AI</h1>
            <p className="text-sm text-zinc-500">Sign in to continue.</p>
          </header>
          <div className="flex justify-center">
            <AuthForm />
          </div>
        </div>
      </div>
    )
  }

  if (isSupabaseConfigured() && user && brands.length === 0) {
    return <EmptyWorkspaceCreateBrand gate="empty_brands" />
  }

  if (!brand) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
        <div className="w-full max-w-2xl text-center text-sm text-zinc-500">No brand profile loaded.</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-[radial-gradient(circle_at_top,_rgba(109,40,217,0.16),_transparent_40%),linear-gradient(180deg,_rgb(30,24,42)_0%,_rgb(21,18,31)_48%,_rgb(18,16,25)_100%)] text-zinc-100">
      <div className="pointer-events-none absolute left-1/2 top-0 h-[28rem] w-[min(100%,56rem)] -translate-x-1/2 rounded-full bg-violet-500/[0.07] blur-3xl" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-8 sm:pb-20 sm:pt-10">
        <header className="flex flex-col gap-4 border-b border-white/[0.06] pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 flex-1 flex-wrap items-start gap-3 sm:gap-4">
              <JifunzeBrandLogo to="/" size="xl" />
              <div className="h-8 w-px shrink-0 bg-gradient-to-b from-transparent via-white/[0.14] to-transparent" aria-hidden />
              <WorkspaceIdentityStrip brandName={brand.name} identity={workspaceIdentity} />
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <button
                type="button"
                disabled={signOutPending}
                onClick={() => void signOut()}
                className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-xs font-medium text-zinc-200 transition-colors hover:border-violet-300/25 hover:bg-white/[0.05] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {signOutPending ? 'Signing out…' : 'Sign out'}
              </button>
            </div>
          </div>
          <WorkspaceNav className="w-full justify-start" />
        </header>

        <SignedInWelcomeBlock user={user!} brand={brand} identity={workspaceIdentity} />

        <SignedInEngagementStrip brand={brand} onApplyPrompt={applyEngagementPrompt} />

        <div className="mt-8">
          <SignedInQuickCreatePanel
            supabase={supabase}
            sectionId="signed-in-create"
            promptInjection={promptInjection}
          />
        </div>

        <section className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.12)] ring-1 ring-white/[0.03] sm:p-6">
          <h2 className="text-sm font-semibold text-white">What you can do next</h2>
          <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-zinc-500/90">
            A few simple moves when you are ready — stay at your own pace.
          </p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-3">
            <li className="rounded-xl border border-white/[0.06] bg-zinc-950/25 px-3 py-3">
              <p className="text-[13px] font-medium text-zinc-100">Ship what you made</p>
              <p className="mt-1 text-[12px] leading-relaxed text-zinc-500/90">
                Copy your caption and hashtags and post where you planned — Instagram, X, or
                anywhere you chose above.
              </p>
            </li>
            <li className="rounded-xl border border-white/[0.06] bg-zinc-950/25 px-3 py-3">
              <p className="text-[13px] font-medium text-zinc-100">Refine and regenerate</p>
              <p className="mt-1 text-[12px] leading-relaxed text-zinc-500/90">
                Tweak the topic or tone and generate again until the voice feels unmistakably yours.
              </p>
            </li>
            <li className="rounded-xl border border-white/[0.06] bg-zinc-950/25 px-3 py-3">
              <p className="text-[13px] font-medium text-zinc-100">Explore ideas &amp; studio</p>
              <p className="mt-1 text-[12px] leading-relaxed text-zinc-500/90">
                Browse ranked recommendations on{' '}
                <Link to="/ideas" className="text-violet-300/90 hover:text-violet-200">
                  Ideas
                </Link>
                , then generate on{' '}
                <Link to="/studio" className="text-violet-300/90 hover:text-violet-200">
                  Studio
                </Link>
                .
              </p>
            </li>
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-violet-500/35 bg-violet-950/25 p-5 ring-1 ring-violet-400/15 sm:p-6">
          <h2 className="text-sm font-semibold text-white">Ready for more?</h2>
          <p className="mt-1 max-w-2xl text-[12px] leading-relaxed text-zinc-400/95">
            Move through focused pages — Ideas for discovery, Studio to generate, Lab for experiments,
            and Insights for what Jifunze learned.
          </p>
          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              to="/ideas"
              className="inline-flex items-center justify-center rounded-xl bg-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition-colors hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/60"
            >
              Browse ideas
            </Link>
            <Link
              to="/studio"
              className="inline-flex items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-100 transition-colors hover:border-violet-400/35 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/50"
            >
              Open Studio
            </Link>
            <Link
              to="/insights"
              className="inline-flex items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 text-sm font-semibold text-zinc-100 transition-colors hover:border-violet-400/35 hover:bg-white/[0.07] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/50"
            >
              View learning insights
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
