import { useMemo } from 'react'
import type { TrainingLearnerIntelligenceSnapshotRow } from '../../training/trainingTypes'
import {
  parseIntelligenceSnapshotPayload,
  type IntelligenceSnapshotPayloadV1,
} from '../../training/learnerIntelligencePayload'
import { buildRemediationRevisionContinuityFromSnapshots } from '../../training/intelligenceContinuity'
import { TRUST_COPY } from '../../training/trustCopy'

function trendLabel(prev: IntelligenceSnapshotPayloadV1 | null, latest: IntelligenceSnapshotPayloadV1): string {
  if (!prev) return 'Baseline captured'
  const a = prev.readiness_band
  const b = latest.readiness_band
  if (b > a) return 'Readiness band improving vs prior checkpoint'
  if (b < a) return 'Readiness band dipped — reinforce retrieval'
  return 'Readiness band stable vs prior checkpoint'
}

export function LearningIntelligenceContinuityCard(props: {
  snapshots: TrainingLearnerIntelligenceSnapshotRow[]
  /** Total snapshot rows visible for this plan (RLS-scoped). */
  planSignalCount: number
}) {
  const { snapshots, planSignalCount } = props
  const continuity = useMemo(
    () => (snapshots.length ? buildRemediationRevisionContinuityFromSnapshots(snapshots) : null),
    [snapshots],
  )
  const parsed = snapshots
    .map((s) => ({ row: s, payload: parseIntelligenceSnapshotPayload(s.payload_json) }))
    .filter((x): x is { row: TrainingLearnerIntelligenceSnapshotRow; payload: IntelligenceSnapshotPayloadV1 } =>
      Boolean(x.payload),
    )

  const latest = parsed[0]?.payload ?? null
  const previous = parsed[1]?.payload ?? null

  return (
    <section className="rounded-xl border border-teal-500/20 bg-teal-950/15 p-4 ring-1 ring-teal-500/10">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-teal-300/90">Learning intelligence · memory</p>
      <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
        Checkpoint snapshots store weak-area and readiness summaries (never raw answers) so continuity improves over time.
      </p>
      <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">{TRUST_COPY.readinessTrajectoryVsBand}</p>

      <div className="mt-3 grid gap-3 text-xs text-zinc-300 sm:grid-cols-2">
        <div className="rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Your checkpoints saved</p>
          <p className="mt-2 text-lg font-semibold text-white">{snapshots.length}</p>
          <p className="mt-1 text-[11px] text-zinc-500">Most recent captures weak + readiness bands after quizzes.</p>
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Plan signal volume (visible)</p>
          <p className="mt-2 text-lg font-semibold text-white">{planSignalCount}</p>
          <p className="mt-1 text-[11px] text-zinc-500">
            Rows you can see for this plan — managers may see aggregate cohort totals for coaching context.
          </p>
        </div>
      </div>

      {latest ? (
        <div className="mt-4 rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-3 text-sm">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Latest checkpoint</p>
          <p className="mt-2 text-xs text-teal-200/95">{trendLabel(previous, latest)}</p>
          <p className="mt-2 text-xs text-zinc-300">
            Readiness <span className="font-medium text-white">{latest.readiness_band_label}</span>
            <span className="text-zinc-600"> · </span>
            weak signals: <span className="text-zinc-200">{latest.weak_summary_line}</span>
          </p>
          {latest.plan_complete_after ? (
            <p className="mt-2 text-[11px] font-medium text-emerald-300/90">Plan marked complete after this checkpoint.</p>
          ) : null}
        </div>
      ) : (
        <p className="mt-4 text-sm text-zinc-500">
          Finish a quiz checkpoint — we’ll snapshot compact weak/readiness cues for future revision decisions.
        </p>
      )}

      {continuity &&
      (continuity.remediationContinuityBullets.length > 0 || continuity.revisionFocusBullets.length > 0) ? (
        <div className="mt-4 rounded-lg border border-teal-500/15 bg-zinc-950/35 px-3 py-3">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-teal-300/90">
            Remediation & revision continuity
          </p>
          <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">{continuity.readinessTrajectoryLine}</p>
          {continuity.remediationContinuityBullets.length ? (
            <div className="mt-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Persistent remediation</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
                {continuity.remediationContinuityBullets.slice(0, 5).map((b, i) => (
                  <li key={`rem-${i}`}>{b}</li>
                ))}
              </ul>
            </div>
          ) : null}
          {continuity.revisionFocusBullets.length ? (
            <div className="mt-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Revision focus</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-300">
                {continuity.revisionFocusBullets.slice(0, 5).map((b, i) => (
                  <li key={`rev-${i}`}>{b}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}
