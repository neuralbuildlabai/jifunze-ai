import {
  getContentMockNotice,
  getPublishingSimulatedNotice,
  getSystemSurfaceMode,
} from '../config/systemSurfaceMode'
import type { EnvCheckResult } from '../lib/envCheck'

export function SystemStatusBanner({ env }: { env: EnvCheckResult }) {
  const mode = getSystemSurfaceMode()
  const publishingLine = getPublishingSimulatedNotice()
  const contentLine = getContentMockNotice()
  const isLive = mode === 'live'

  return (
    <div
      className={`w-full border-b px-4 py-2.5 text-center sm:text-left ${
        !env.ok
          ? 'border-rose-900/55 bg-rose-950/35 text-rose-50/95'
          : isLive
            ? 'border-emerald-800/50 bg-emerald-950/35 text-emerald-100/95'
            : 'border-amber-800/45 bg-amber-950/30 text-amber-50/95'
      }`}
      role="status"
      aria-live="polite"
    >
      {!env.ok ? (
        <div className="mx-auto mb-2 max-w-3xl rounded-lg border border-rose-800/50 bg-rose-950/50 px-3 py-2 text-left text-[11px] text-rose-100/95">
          <p className="font-semibold">Configuration required</p>
          <p className="opacity-95">
            Set {env.missing.join(', ')} in your environment. Workspace features may be blocked until
            this is fixed.
          </p>
          {env.warnings.length ? (
            <p className="mt-1 text-rose-200/90">{env.warnings.join(' ')}</p>
          ) : null}
        </div>
      ) : null}
      <div className="mx-auto flex max-w-3xl flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <p className="text-xs font-semibold tracking-wide uppercase sm:shrink-0">
          {isLive ? 'Live mode' : 'Preview mode'}
        </p>
        <div className="space-y-0.5 text-[11px] leading-snug text-balance sm:text-right sm:text-left">
          {isLive ? (
            <p className="opacity-95">
              Remote caption generation and live publishing connectors are active — posts can reach
              real social accounts per your integration.
            </p>
          ) : null}
          {!isLive && publishingLine ? <p className="opacity-95">{publishingLine}</p> : null}
          {!isLive && contentLine ? (
            <p className={publishingLine ? 'text-amber-100/80' : 'opacity-95'}>{contentLine}</p>
          ) : null}
          {!isLive && !publishingLine && !contentLine ? (
            <p className="opacity-90">Automation is limited to this preview environment.</p>
          ) : null}
        </div>
      </div>
    </div>
  )
}
