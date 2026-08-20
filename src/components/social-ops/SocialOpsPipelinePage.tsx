import { useMemo } from 'react'
import { DataTable, EmptyState, Panel, Pill, Stat } from './socialOpsUi'
import { useSocialOpsSnapshot } from './useSocialOpsSnapshot'
import { pipelineHealth, syncStatus } from '../../services/socialOps/socialOpsSummary'

export function SocialOpsPipelinePage() {
  const { snapshot, loading, error } = useSocialOpsSnapshot()
  const nowMs = snapshot ? Date.parse(snapshot.loadedAt) : 0

  const derived = useMemo(() => {
    if (!snapshot) return null
    return {
      pipeline: pipelineHealth(snapshot.content, snapshot.publications),
      sync: syncStatus(snapshot.runs, snapshot.alerts, nowMs),
    }
  }, [snapshot, nowMs])

  if (loading) return <p className="text-[13px] text-zinc-400">Loading…</p>
  if (error) return <EmptyState>{error}</EmptyState>
  if (!snapshot || !derived) return <EmptyState>No data.</EmptyState>

  return (
    <div className="space-y-6">
      <Panel title="Content pipeline">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Ledger items" value={String(derived.pipeline.itemsTotal)} />
          <Stat label="Awaiting approval" value={String(derived.pipeline.awaitingApproval)} />
          <Stat label="Approved, not published" value={String(derived.pipeline.approvedNotPublished)} />
          <Stat label="Published" value={String(derived.pipeline.published)} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Blocked by safety" value={String(derived.pipeline.blockedBySafety)} />
          <Stat label="Publications queued" value={String(derived.pipeline.publicationsQueued)} />
          <Stat label="Publications failed" value={String(derived.pipeline.publicationsFailed)} />
          <Stat
            label="Signals"
            value="—"
            hint="ingest-signals writes to ingested_signals; not surfaced here yet"
          />
        </div>
      </Panel>

      <Panel title="Recent sync runs">
        {snapshot.runs.length ? (
          <DataTable head={['Run', 'Mode', 'Status', 'Started', 'Finished', 'ok / skipped / failed']}>
            {snapshot.runs.slice(0, 20).map((r) => (
              <tr key={r.id}>
                <td className="px-3 py-2 font-mono text-[12px] text-zinc-400">{r.id}</td>
                <td className="px-3 py-2">
                  <Pill tone={r.dry_run ? 'muted' : 'brand'}>{r.dry_run ? 'dry run' : 'live'}</Pill>
                </td>
                <td className="px-3 py-2">
                  <Pill tone={r.status === 'ok' ? 'ok' : r.status === 'failed' ? 'bad' : 'warn'}>
                    {r.status}
                  </Pill>
                </td>
                <td className="px-3 py-2 text-zinc-400">{r.started_at.replace('T', ' ').slice(0, 16)}</td>
                <td className="px-3 py-2 text-zinc-400">
                  {r.finished_at ? r.finished_at.replace('T', ' ').slice(0, 16) : '—'}
                </td>
                <td className="px-3 py-2 text-zinc-300">
                  {r.platforms_ok} / {r.platforms_skipped} / {r.platforms_failed}
                </td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <EmptyState>No sync run has been recorded yet.</EmptyState>
        )}
      </Panel>

      <Panel title="Publication records">
        {snapshot.publications.length ? (
          <DataTable head={['Content', 'Platform', 'Status', 'Post id', 'Published', 'Metrics synced']}>
            {snapshot.publications.slice(0, 50).map((p) => (
              <tr key={`${p.content_id}:${p.platform}`}>
                <td className="px-3 py-2 text-zinc-200">{p.content_id}</td>
                <td className="px-3 py-2 text-zinc-400">{p.platform}</td>
                <td className="px-3 py-2">
                  <Pill tone={p.status === 'published' ? 'ok' : p.status === 'failed' ? 'bad' : 'warn'}>
                    {p.status}
                  </Pill>
                </td>
                <td className="px-3 py-2 font-mono text-[12px] text-zinc-500">
                  {p.platform_post_id ?? '—'}
                </td>
                <td className="px-3 py-2 text-zinc-400">{p.published_at?.slice(0, 10) ?? '—'}</td>
                <td className="px-3 py-2 text-zinc-400">{p.last_metrics_sync_at?.slice(0, 10) ?? '—'}</td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <EmptyState>
            Nothing has been published to a platform yet. That is expected: publishing is off.
          </EmptyState>
        )}
      </Panel>
    </div>
  )
}
