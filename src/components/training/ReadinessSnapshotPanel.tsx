import type { ReadinessSnapshot } from '../../training/readinessIndicators'
import { Link } from 'react-router-dom'
import { LEGAL_ROUTES, TRUST_COPY } from '../../training/trustCopy'

export function ReadinessSnapshotPanel(props: { snapshot: ReadinessSnapshot }) {
  const { snapshot } = props
  return (
    <section className="rounded-xl border border-sky-500/20 bg-sky-950/15 p-4 ring-1 ring-sky-500/10">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sky-400/90">
        Preparation indicators · revision spine
      </p>
      <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">
        Readiness bands are heuristic planning signals—not credentials.{' '}
        <Link className="font-medium text-violet-300 hover:text-violet-200" to={LEGAL_ROUTES.disclaimer}>
          Full disclaimer
        </Link>
      </p>
      <div className="mt-3 flex flex-wrap items-baseline gap-2">
        <span className="text-lg font-semibold text-white">{snapshot.bandLabel}</span>
        <span className="text-[11px] text-zinc-500">Band {snapshot.band + 1}/4</span>
      </div>
      <p className="mt-2 text-sm text-zinc-300">{snapshot.confidenceLine}</p>
      <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">{TRUST_COPY.readinessCompositeShort}</p>
      {snapshot.nextSpacedReview ? (
        <p className="mt-3 text-xs text-zinc-400">
          <span className="font-medium text-zinc-200">Spaced reinforcement: </span>
          {snapshot.nextSpacedReview.label}
          <span className="text-zinc-600"> · </span>
          <time dateTime={snapshot.nextSpacedReview.dueIso}>
            {new Date(snapshot.nextSpacedReview.dueIso).toLocaleString()}
          </time>
        </p>
      ) : (
        <p className="mt-3 text-xs text-zinc-500">Complete a lesson to unlock the first spacing cue.</p>
      )}
      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-zinc-400">
        <span className="rounded-full border border-white/[0.08] bg-zinc-950/40 px-2 py-0.5">
          Fast review {snapshot.fastReviewAvailable ? 'available on lessons (?fast=1)' : 'locked until progress'}
        </span>
        <span className="rounded-full border border-white/[0.08] bg-zinc-950/40 px-2 py-0.5">
          Mixed-topic review {snapshot.mixedReviewUnlocked ? 'path unlocked' : 'needs more modules'}
        </span>
        <span className="rounded-full border border-white/[0.08] bg-zinc-950/40 px-2 py-0.5">
          Exam-style drills {snapshot.examPracticeEnabled ? 'enabled at plan-level' : 'follow standard checkpoints'}
        </span>
      </div>
      {snapshot.revisionExcerpts.length ? (
        <div className="mt-4 rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Revision excerpts</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-400">
            {snapshot.revisionExcerpts.map((x, i) => (
              <li key={i}>{x}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}
