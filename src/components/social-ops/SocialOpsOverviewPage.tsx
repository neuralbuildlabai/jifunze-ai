import { useMemo, useState } from 'react'
import { DataTable, EmptyState, Panel, Pill, Stat } from './socialOpsUi'
import { useSocialOpsSnapshot } from './useSocialOpsSnapshot'
import { requestManualRefresh } from '../../services/socialOps/socialOpsData'
import {
  engagementRate,
  formatMetric,
  freshness,
  growthSince,
  pipelineHealth,
  sumLatest,
  syncStatus,
  topPillar,
  topPosts,
} from '../../services/socialOps/socialOpsSummary'

const RANGES = [
  { key: '7', label: '7 days', days: 7 },
  { key: '30', label: '30 days', days: 30 },
  { key: '90', label: '90 days', days: 90 },
] as const

export function SocialOpsOverviewPage() {
  const { snapshot, loading, error, reload } = useSocialOpsSnapshot()
  const [range, setRange] = useState<(typeof RANGES)[number]['key']>('30')
  const [refreshMessage, setRefreshMessage] = useState<string | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  // Pure: the timestamp the data itself was loaded at, not a fresh clock read during render.
  const nowMs = snapshot ? Date.parse(snapshot.loadedAt) : 0

  const derived = useMemo(() => {
    if (!snapshot) return null
    const days = RANGES.find((r) => r.key === range)?.days ?? 30
    const sinceMs = nowMs - days * 86_400_000
    return {
      followers: sumLatest(snapshot.snapshots, 'followers'),
      views: sumLatest(snapshot.snapshots, 'views'),
      reach: sumLatest(snapshot.snapshots, 'reach'),
      engagement: sumLatest(snapshot.snapshots, 'engagement'),
      engagementRate: engagementRate(snapshot.snapshots),
      followerGrowth: growthSince(snapshot.snapshots, 'followers', sinceMs),
      viewGrowth: growthSince(snapshot.snapshots, 'views', sinceMs),
      pipeline: pipelineHealth(snapshot.content, snapshot.publications),
      sync: syncStatus(snapshot.runs, snapshot.alerts, nowMs),
      top: topPosts(snapshot.snapshots, snapshot.publications, snapshot.content, 5),
      pillar: topPillar(snapshot.snapshots, snapshot.publications, snapshot.content),
      newestSnapshotAt:
        snapshot.snapshots.map((s) => s.captured_at).sort().at(-1) ?? null,
    }
  }, [snapshot, range, nowMs])

  const onRefresh = async () => {
    setRefreshing(true)
    setRefreshMessage(null)
    const outcome = await requestManualRefresh()
    setRefreshMessage(outcome.message)
    setRefreshing(false)
    if (outcome.ok) reload()
  }

  if (loading) return <p className="text-[13px] text-zinc-400">Loading…</p>
  if (error) return <EmptyState>{error}</EmptyState>
  if (!snapshot) return <EmptyState>No data.</EmptyState>

  if (!snapshot.configured) {
    return (
      <EmptyState>
        Supabase is not configured in this build, so there is nothing to read. No figures are shown
        rather than placeholder numbers.
      </EmptyState>
    )
  }

  const dataFreshness = freshness(derived?.newestSnapshotAt ?? null, nowMs)

  return (
    <div className="space-y-6">
      {snapshot.errors.length ? (
        <div role="alert" className="rounded-xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-[13px] text-amber-100">
          <p className="font-semibold">Some data could not be loaded.</p>
          <ul className="mt-1 list-disc pl-5">
            {snapshot.errors.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Reporting period">
          {RANGES.map((r) => (
            <button
              key={r.key}
              type="button"
              aria-pressed={range === r.key}
              onClick={() => setRange(r.key)}
              className={`inline-flex min-h-[2.25rem] items-center rounded-full border px-3.5 text-[13px] font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6] ${
                range === r.key
                  ? 'border-[#7C3AED] bg-[#7C3AED] text-white'
                  : 'border-white/12 text-zinc-300 hover:border-white/25'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <span aria-live="polite" className="text-[12px] text-zinc-400">
            {refreshMessage ?? ''}
          </span>
          <button
            type="button"
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex min-h-[2.25rem] items-center rounded-full border border-white/15 px-4 text-[13px] font-medium text-zinc-200 transition hover:border-white/30 disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
          >
            {refreshing ? 'Requesting…' : 'Refresh metrics now'}
          </button>
        </div>
      </div>

      <Panel title="Audience">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Total audience" value={formatMetric(derived?.followers ?? null)} freshness={dataFreshness} />
          <Stat
            label={`Follower growth (${range}d)`}
            value={
              derived?.followerGrowth
                ? `${derived.followerGrowth.absolute >= 0 ? '+' : ''}${formatMetric(derived.followerGrowth.absolute)}`
                : '—'
            }
            hint={
              derived?.followerGrowth?.percent !== null && derived?.followerGrowth
                ? `${derived.followerGrowth.percent}%`
                : 'needs two readings'
            }
          />
          <Stat label="Total views" value={formatMetric(derived?.views ?? null)} />
          <Stat label="Reach / impressions" value={formatMetric(derived?.reach ?? null)} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat label="Engagement" value={formatMetric(derived?.engagement ?? null)} />
          <Stat
            label="Engagement rate"
            value={derived?.engagementRate !== null && derived ? `${derived.engagementRate}%` : '—'}
            hint="engagement ÷ reach"
          />
          <Stat
            label="Top topic"
            value={derived?.pillar?.pillar ?? '—'}
            hint={derived?.pillar ? `${formatMetric(derived.pillar.views)} views` : 'no post metrics yet'}
          />
          <Stat
            label="Website traffic from social"
            value="—"
            hint="needs an analytics source; none is connected"
          />
        </div>
        <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">
          A dash means no reading exists, not zero. Figures come only from platform APIs that have
          actually returned data — nothing here is estimated or back-filled. The Kazi Kit does not
          exist, so there is no conversion figure to show.
        </p>
      </Panel>

      <Panel title="Last synchronisation">
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          <Stat
            label="Last run"
            value={derived?.sync.lastRun?.status ?? '—'}
            freshness={derived?.sync.lastRunFreshness}
          />
          <Stat label="Platforms refreshed" value={String(derived?.sync.lastRun?.platforms_ok ?? 0)} />
          <Stat label="Platforms skipped" value={String(derived?.sync.lastRun?.platforms_skipped ?? 0)} />
          <Stat label="Platforms failed" value={String(derived?.sync.lastRun?.platforms_failed ?? 0)} />
        </div>
        {derived?.sync.overdue ? (
          <p className="mt-3 text-[13px] text-amber-300">
            The two-hour sync has not completed recently. Data above is stale.
          </p>
        ) : null}
      </Panel>

      <Panel title="Top content">
        {derived?.top.length ? (
          <DataTable head={['Title', 'Platform', 'Views', 'Link']}>
            {derived.top.map((t) => (
              <tr key={t.key}>
                <td className="px-3 py-2 text-zinc-200">{t.item.title}</td>
                <td className="px-3 py-2 text-zinc-400">{t.item.platform}</td>
                <td className="px-3 py-2 text-zinc-200">{formatMetric(t.value)}</td>
                <td className="px-3 py-2">
                  {t.item.url ? (
                    <a
                      className="rounded text-[#A78BFA] underline decoration-white/20 underline-offset-4 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#8B5CF6]"
                      href={t.item.url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Open
                    </a>
                  ) : (
                    <span className="text-zinc-600">—</span>
                  )}
                </td>
              </tr>
            ))}
          </DataTable>
        ) : (
          <EmptyState>
            Nothing has been published to a platform yet, so there is no post to rank.
          </EmptyState>
        )}
      </Panel>

      <Panel title="Open alerts">
        {derived?.sync.openAlerts.length ? (
          <ul className="space-y-2">
            {derived.sync.openAlerts.map((a) => (
              <li key={a.id} className="flex flex-wrap items-center gap-2 text-[13px]">
                <Pill tone={a.severity === 'error' ? 'bad' : a.severity === 'warning' ? 'warn' : 'muted'}>
                  {a.severity}
                </Pill>
                <span className="text-zinc-400">{a.platform ?? 'system'}</span>
                <span className="text-zinc-200">{a.message}</span>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState>No open alerts.</EmptyState>
        )}
      </Panel>
    </div>
  )
}
