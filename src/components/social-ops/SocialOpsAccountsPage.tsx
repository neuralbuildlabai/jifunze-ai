import { useMemo } from 'react'
import { DataTable, EmptyState, Panel, Pill } from './socialOpsUi'
import { useSocialOpsSnapshot } from './useSocialOpsSnapshot'
import { accountHealth } from '../../services/socialOps/socialOpsSummary'
import { PLATFORM_MATRIX, READINESS_LABEL } from '../../social/platformMatrix'

function readinessTone(readiness: string) {
  switch (readiness) {
    case 'ready':
      return 'ok' as const
    case 'manual_only':
      return 'muted' as const
    case 'paid_access_required':
      return 'bad' as const
    default:
      return 'warn' as const
  }
}

export function SocialOpsAccountsPage() {
  const { snapshot, loading, error } = useSocialOpsSnapshot()
  const nowMs = snapshot ? Date.parse(snapshot.loadedAt) : 0

  const rows = useMemo(() => {
    if (!snapshot) return []
    return accountHealth(snapshot.accounts, snapshot.connections, nowMs)
  }, [snapshot, nowMs])

  if (loading) return <p className="text-[13px] text-zinc-400">Loading…</p>
  if (error) return <EmptyState>{error}</EmptyState>

  return (
    <div className="space-y-6">
      <Panel title="Account health">
        {rows.length ? (
          <DataTable
            head={[
              'Platform',
              'Handle',
              'Connection',
              'Token',
              'Last successful sync',
              'Last publish',
              'Required action',
            ]}
          >
            {rows.map((r) => (
              <tr key={r.platform}>
                <td className="px-3 py-2">
                  <a
                    className="rounded text-zinc-100 underline decoration-white/20 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
                    href={r.profileUrl || undefined}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    {r.platform}
                  </a>
                  <div className="mt-1">
                    <Pill tone={readinessTone(r.readiness)}>{READINESS_LABEL[r.readiness]}</Pill>
                  </div>
                </td>
                <td className="px-3 py-2 text-zinc-400">{r.handle}</td>
                <td className="px-3 py-2">
                  <Pill
                    tone={
                      r.connectionStatus === 'connected'
                        ? 'ok'
                        : r.connectionStatus === 'error'
                          ? 'bad'
                          : 'warn'
                    }
                  >
                    {r.connectionStatus}
                  </Pill>
                  {r.missingEnvVars.length ? (
                    <p className="mt-1 text-[12px] text-zinc-500">
                      missing: {r.missingEnvVars.join(', ')}
                    </p>
                  ) : null}
                </td>
                <td className="px-3 py-2 text-zinc-400">
                  {r.tokenExpiresAt ? (
                    <>
                      <span>{r.tokenExpiresAt.slice(0, 10)}</span>
                      {r.tokenWarning ? (
                        <p className="mt-1 text-[12px] text-amber-300">{r.tokenWarning}</p>
                      ) : null}
                    </>
                  ) : (
                    <span className="text-zinc-600">—</span>
                  )}
                </td>
                <td className={`px-3 py-2 ${r.lastSuccessfulSync.stale ? 'text-amber-300' : 'text-zinc-300'}`}>
                  {r.lastSuccessfulSync.label}
                </td>
                <td className="px-3 py-2 text-zinc-400">
                  {r.lastPublishSuccessAt?.slice(0, 10) ?? '—'}
                </td>
                <td className="px-3 py-2 text-zinc-300">
                  {r.requiredAction ?? r.error ?? '—'}
                </td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <EmptyState>
            No account rows. Apply `20260820120000_social_ops_core.sql`, which seeds the ten
            official channels.
          </EmptyState>
        )}
      </Panel>

      <Panel title="Platform capability matrix">
        <p className="mb-3 text-[12px] leading-relaxed text-zinc-500">
          What is true today, not what the code could do. An adapter with finished code but no
          credentials is never shown as ready.
        </p>
        <DataTable head={['Platform', 'Read metrics', 'Publish', 'Readiness', 'Cost', 'Blocker']}>
          {PLATFORM_MATRIX.map((p) => (
            <tr key={p.id}>
              <td className="px-3 py-2 text-zinc-200">{p.label}</td>
              <td className="px-3 py-2 text-zinc-400">
                {p.readsAccountMetrics ? 'account' : '—'}
                {p.readsPostMetrics ? ' + post' : ''}
              </td>
              <td className="px-3 py-2 text-zinc-400">{p.canPublish ? 'yes' : 'no'}</td>
              <td className="px-3 py-2">
                <Pill tone={readinessTone(p.readiness)}>{READINESS_LABEL[p.readiness]}</Pill>
              </td>
              <td className="px-3 py-2 text-zinc-400">{p.cost}</td>
              <td className="px-3 py-2 text-zinc-400">{p.blocker}</td>
            </tr>
          ))}
        </DataTable>
      </Panel>
    </div>
  )
}
