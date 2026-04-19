import { useEffect, useReducer } from 'react'
import {
  getContentMockNotice,
  getPublishingSimulatedNotice,
  getSystemSurfaceMode,
  isStrictDemoContentGeneration,
  refreshContentRuntimeStatus,
} from '../config/systemSurfaceMode'
import type { EnvCheckResult } from '../lib/envCheck'

export function SystemStatusBanner({
  env,
  accessToken,
  /** `user` surfaces only blocking misconfiguration; full runtime strips live on the Platform page. */
  audience = 'user',
}: {
  env: EnvCheckResult
  accessToken?: string
  audience?: 'user' | 'platform'
}) {
  const [, forceRefresh] = useReducer((n: number) => n + 1, 0)
  useEffect(() => {
    let cancelled = false
    ;(async () => {
      await refreshContentRuntimeStatus(accessToken)
      if (!cancelled) forceRefresh()
    })()
    return () => {
      cancelled = true
    }
  }, [accessToken])

  const mode = getSystemSurfaceMode()
  const publishingLine = getPublishingSimulatedNotice()
  const contentLine = getContentMockNotice()
  const isLive = mode === 'live'
  const strictDemo = isStrictDemoContentGeneration()

  if (!env.ok) {
    return (
      <div
        className="w-full border-b border-rose-900/55 bg-rose-950/35 px-4 py-2.5 text-rose-50/95 text-center sm:text-left"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto max-w-3xl rounded-lg border border-rose-800/50 bg-rose-950/50 px-3 py-2 text-left text-[11px] text-rose-100/95">
          <p className="font-semibold">Configuration required</p>
          <p className="opacity-95">
            Set {env.missing.join(', ')} in your environment. Workspace features may be blocked until
            this is fixed.
          </p>
          {env.warnings.length ? (
            <p className="mt-1 text-rose-200/90">{env.warnings.join(' ')}</p>
          ) : null}
        </div>
      </div>
    )
  }

  if (audience === 'user') {
    return null
  }

  /** Real backend generation + simulated publishing: no “preview mode” strip for signed-in users. */
  if (env.ok && !strictDemo && !isLive) {
    return null
  }

  if (env.ok && !strictDemo && isLive) {
    return (
      <div
        className="w-full border-b border-emerald-800/50 bg-emerald-950/35 px-4 py-2.5 text-center text-emerald-100/95 sm:text-left"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <p className="text-xs font-semibold tracking-wide uppercase sm:shrink-0">Live mode</p>
          <p className="text-[11px] leading-snug text-balance opacity-95 sm:text-left">
            Remote caption generation and live publishing connectors are active — posts can reach real
            social accounts per your integration.
          </p>
        </div>
      </div>
    )
  }

  /** Demo / mock generation only — clear, not “preview mode”. */
  if (env.ok && strictDemo) {
    return (
      <div
        className="w-full border-b border-amber-800/45 bg-amber-950/30 px-4 py-2.5 text-center text-amber-50/95 sm:text-left"
        role="status"
        aria-live="polite"
      >
        <div className="mx-auto flex max-w-3xl flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <p className="text-xs font-semibold tracking-wide uppercase sm:shrink-0">Demo generation</p>
          <div className="space-y-0.5 text-[11px] leading-snug text-balance sm:text-right sm:text-left">
            {publishingLine ? <p className="opacity-95">{publishingLine}</p> : null}
            {contentLine ? (
              <p className={publishingLine ? 'text-amber-100/80' : 'opacity-95'}>{contentLine}</p>
            ) : null}
            {!publishingLine && !contentLine ? (
              <p className="opacity-90">Automation is limited in this demo setup.</p>
            ) : null}
          </div>
        </div>
      </div>
    )
  }

  return null
}
