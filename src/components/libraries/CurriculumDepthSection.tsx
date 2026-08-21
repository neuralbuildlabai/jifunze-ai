import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import type { TeachingLibraryId } from '../../data/teaching/teachingTypes'
import { curriculumQualityForLibrary } from '../../data/learning/curriculumQualityLayer'
import {
  curriculumFreshnessReviewPrompts,
  globalFreshnessHealthSummary,
  rollupTeachingSignals,
} from '../../data/learning/curriculumFreshnessPipeline'
import { LEGAL_ROUTES } from '../../shared/legalRoutes'

export function CurriculumDepthSection({
  libraryId,
  className,
}: {
  libraryId: TeachingLibraryId
  className?: string
}) {
  const q = curriculumQualityForLibrary(libraryId)
  const roll = rollupTeachingSignals()
  const freshnessPrompts = useMemo(() => curriculumFreshnessReviewPrompts(libraryId), [libraryId])

  return (
    <section
      className={`rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.035] to-[rgba(18,16,26,0.55)] p-5 sm:p-7 ${className ?? ''}`}
    >
      <div className="border-b border-white/[0.06] pb-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Curriculum depth · living library</p>
        <h2 className="mt-2 text-lg font-semibold text-white">Competency map, scenarios, capstones, freshness</h2>
        <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-zinc-400">{q.headline}</p>
        <p className="mt-3 text-[12px] leading-relaxed text-zinc-500">
          <span className="font-semibold text-zinc-300">Target capability: </span>
          {q.targetCapability}
        </p>
        <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">
          Instructional scaffolding only—materials access varies by account/plan and does not guarantee mastery, certification, hiring
          outcomes, or professional qualification.{' '}
          <Link to={LEGAL_ROUTES.disclaimer} className="font-medium text-violet-300/85 underline-offset-2 hover:underline">
            Disclaimer
          </Link>
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Free → signed-in → deeper</p>
          <p className="mt-2 text-[12px] leading-relaxed text-zinc-400">
            <span className="font-semibold text-zinc-300">Public starter: </span>
            {q.freeToPaidSkillShape.publicStarter}
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-zinc-400">
            <span className="font-semibold text-zinc-300">Signed-in continuity: </span>
            {q.freeToPaidSkillShape.signedInContinuity}
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-zinc-400">
            <span className="font-semibold text-zinc-300">Deeper materials: </span>
            {q.freeToPaidSkillShape.deeperMaterials}
          </p>
        </div>

        <div className="rounded-xl border border-emerald-400/12 bg-emerald-500/[0.05] p-4 lg:col-span-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-200/75">Scenario-based assessment plan</p>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">{q.scenarioAssessment.summary}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Formats</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] leading-relaxed text-zinc-400">
                {q.scenarioAssessment.formats.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Where it shows up</p>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] leading-relaxed text-zinc-400">
                {q.scenarioAssessment.anchors.map((a) => (
                  <li key={a}>{a}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">
            Bridges: {q.scenarioAssessment.bridges.join(' · ')} ·{' '}
            <Link className="font-semibold text-violet-300/90 hover:text-violet-200" to="/learning/labs">
              Teaching labs
            </Link>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Competency progression</p>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {q.competencyStages.map((s) => (
            <article key={s.id} className="rounded-xl border border-white/[0.06] bg-black/20 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                  {s.id}
                </span>
                <h3 className="text-[14px] font-semibold text-white">{s.label}</h3>
              </div>
              <p className="mt-2 text-[12px] leading-relaxed text-zinc-400">{s.summary}</p>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Prerequisites</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-[12px] text-zinc-500">
                {s.prerequisites.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">You should now be able to</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-[12px] text-zinc-300">
                {s.youShouldNowBeAbleTo.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Good understanding looks like</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-[12px] text-zinc-400">
                {s.goodUnderstandingLooksLike.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Common failure modes</p>
              <ul className="mt-1 list-disc space-y-1 pl-5 text-[12px] text-zinc-500">
                {s.commonFailureModes.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <div className="rounded-xl border border-violet-400/12 bg-violet-500/[0.06] p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-violet-200/80">Capstone / portfolio direction</p>
          <h3 className="mt-2 text-[15px] font-semibold text-white">{q.capstone.title}</h3>
          <p className="mt-2 text-[13px] leading-relaxed text-zinc-300">{q.capstone.description}</p>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Artifacts</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] text-zinc-400">
            {q.capstone.portfolioArtifacts.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
          <p className="mt-3 text-[11px] leading-relaxed text-zinc-500">{q.capstone.accessShaping}</p>
        </div>

        <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Human capabilities threaded in</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] leading-relaxed text-zinc-400">
            {q.humanSkillsThreads.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
          <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Data literacy · ethics · responsible use</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[12px] leading-relaxed text-zinc-400">
            {q.ethicsDataLiteracyThreads.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-amber-400/12 bg-amber-500/[0.05] p-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-amber-200/85">Freshness & evolution (not trend-chasing)</p>
        <p className="mt-2 text-[12px] leading-relaxed text-zinc-400">
          Watchlist topics: <span className="text-zinc-300">{q.freshness.risingTopics.join(' · ')}</span>
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-zinc-400">
          Representative ecosystems (neutral framing): <span className="text-zinc-300">{q.freshness.toolAndPlatformClusters.join(' · ')}</span>
        </p>
        <p className="mt-2 text-[12px] leading-relaxed text-zinc-500">{q.freshness.updatePrinciples}</p>
        <div className="mt-4 border-t border-white/[0.06] pt-4">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Local signal rollup (device sandbox)</p>
          <p className="mt-2 text-[11px] leading-relaxed text-zinc-600">{globalFreshnessHealthSummary()}</p>
          <p className="mt-2 text-[11px] text-zinc-600">
            Events captured here: {roll.totalEvents} · lesson views {roll.lessonViews} · completes {roll.lessonCompletes} · revisits{' '}
            {roll.lessonRevisits} · checkpoints {roll.checkpointAttempts} · lab starts {roll.labStarts} · lab completes {roll.labCompletes} · weak/no-match{' '}
            {roll.weakAreaSignals} · help {roll.helpQueries} · lab hints {roll.labHintRequests} · low-confidence matches {roll.lowConfidenceHelpMatches}
          </p>
          <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Review prompts (curriculum team)</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[11px] leading-relaxed text-zinc-500">
            {freshnessPrompts.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
