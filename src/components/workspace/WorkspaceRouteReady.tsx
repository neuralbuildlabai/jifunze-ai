import { Link } from 'react-router-dom'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { AuthForm } from '../AuthForm'
import { EmptyWorkspaceCreateBrand } from '../EmptyWorkspaceCreateBrand'
import { useWorkspaceGenerator } from '../../workspace/WorkspaceGeneratorContext'

export function WorkspaceRouteReady({ children }: { children: React.ReactNode }) {
  const { viewState, authError, retryWorkspaceBootstrap, signOut, signOutPending } =
    useWorkspaceGenerator()

  if (viewState.kind === 'recovery') {
    return (
      <div className="mx-auto flex min-h-[min(70vh,48rem)] w-full max-w-2xl flex-col items-center justify-center space-y-6 px-4 py-12 text-center text-zinc-100">
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
    )
  }

  if (viewState.kind === 'loading') {
    return (
      <div className="mx-auto flex min-h-[min(70vh,48rem)] w-full max-w-2xl items-center justify-center px-4 py-12 text-zinc-100">
        <p className="text-sm text-zinc-400">Loading workspace…</p>
      </div>
    )
  }

  if (viewState.kind === 'sign_in') {
    return (
      <div className="mx-auto flex min-h-[min(70vh,48rem)] w-full max-w-2xl flex-col items-center justify-center space-y-6 px-4 py-12 text-center text-zinc-100">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-white">Jifunze.AI</h1>
          <p className="text-sm text-zinc-500">Sign in to continue.</p>
        </header>
        <div className="flex justify-center">
          <AuthForm />
        </div>
        <p className="text-xs text-zinc-600">
          <Link to="/" className="text-violet-300/90 hover:text-violet-200">
            Back to Create
          </Link>
        </p>
      </div>
    )
  }

  if (viewState.kind === 'empty_brands') {
    return <EmptyWorkspaceCreateBrand gate="empty_brands" />
  }

  if (viewState.kind === 'no_brand') {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-12 text-center text-sm text-zinc-500">
        No brand profile loaded.
      </div>
    )
  }

  return <>{children}</>
}

export function WorkspaceRouteShell({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  const { user, signOut, signOutPending } = useWorkspaceGenerator()

  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 px-4 py-10 text-zinc-100">
      <header className="space-y-2 border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Workspace</p>
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        {subtitle ? <p className="max-w-2xl text-sm leading-relaxed text-zinc-500">{subtitle}</p> : null}
        {isSupabaseConfigured() && user ? (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              type="button"
              disabled={signOutPending}
              onClick={() => void signOut()}
              className="text-[11px] text-violet-300/90 hover:text-violet-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {signOutPending ? 'Signing out…' : 'Sign out'}
            </button>
          </div>
        ) : null}
      </header>
      {children}
    </div>
  )
}
