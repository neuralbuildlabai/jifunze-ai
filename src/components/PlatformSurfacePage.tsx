import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'
import { validateStartupEnv } from '../lib/envCheck'
import { useMemo } from 'react'
import { InternalUatDiagnostics } from './InternalUatDiagnostics'
import { JifunzeBrandLogo } from './brand/JifunzeBrandLogo'
import { SystemStatusBanner } from './SystemStatusBanner'

/**
 * Internal / operator surface: runtime mode, env health, UAT diagnostics.
 * Not part of the default member workspace IA.
 */
export function PlatformSurfacePage() {
  const { session } = useAuth()
  const env = useMemo(() => validateStartupEnv(), [])
  const accessToken = session?.access_token

  return (
    <div className="min-h-screen w-full bg-zinc-950 px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/80 pb-6">
          <div className="flex min-w-0 items-center gap-3">
            <JifunzeBrandLogo to="/" size="lg" />
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                Platform
              </p>
              <h1 className="text-lg font-semibold text-white">Operations &amp; runtime</h1>
              <p className="text-xs text-zinc-500">Internal diagnostics — not shown in the member nav.</p>
            </div>
          </div>
          <Link
            to="/"
            className="rounded-lg border border-zinc-700 bg-zinc-900/60 px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-900"
          >
            Back to Create
          </Link>
        </header>

        <p className="text-sm leading-relaxed text-zinc-400">
          Generation mode, publishing simulation, and environment validation for operators. UAT database
          checks only appear when diagnostics are enabled.
        </p>

        <div className="overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900/40">
          <SystemStatusBanner env={env} accessToken={accessToken} audience="platform" />
        </div>

        <InternalUatDiagnostics />

        <p className="text-center text-[11px] text-zinc-600">
          For access questions, contact your platform owner. This surface is not shown to learners.
        </p>
      </div>
    </div>
  )
}
