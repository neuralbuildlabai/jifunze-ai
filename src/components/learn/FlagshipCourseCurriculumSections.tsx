import type { FlagshipCourse } from '../../data/learning/flagshipCoursesCatalog'
import {
  countModulesByStage,
  curriculumPracticeAndRevisionTotals,
  flagshipStageLabel,
  type FlagshipCourseCurriculum,
  type FlagshipDepthStage,
} from '../../data/learning/flagshipCourseCurricula'
import type { FlagshipSession } from '../../data/learning/flagshipCourseSessions'
import type { FlagshipCourseProgressApi } from '../../hooks/useFlagshipCourseProgress'
import { FlagshipCourseLearningPath } from './FlagshipCourseLearningPath'
import { FlagshipSupportMaterials } from './FlagshipSupportMaterials'

const STAGE_DESC_KEY: Record<FlagshipDepthStage, keyof FlagshipCourse['depthStages']> = {
  foundations: 'foundations',
  applied_practice: 'appliedPractice',
  professional_execution: 'professionalExecution',
  mastery_outputs: 'masteryOutputs',
}

const STAGE_FLOW: FlagshipDepthStage[] = [
  'foundations',
  'applied_practice',
  'professional_execution',
  'mastery_outputs',
]

export function FlagshipCourseCurriculumSections(props: {
  courseSlug: string
  course: FlagshipCourse
  curriculum: FlagshipCourseCurriculum
  sessions: FlagshipSession[]
  progress: FlagshipCourseProgressApi
}) {
  const { courseSlug, course, curriculum, sessions, progress } = props
  const byStage = countModulesByStage(curriculum)
  const { practiceAnchors, revisionPoints } = curriculumPracticeAndRevisionTotals(curriculum)

  return (
    <>
      {/* Meta strip */}
      <div
        className="mt-10 flex flex-col gap-3 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-5 py-4 shadow-[var(--jf-shadow-soft)] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4"
        data-testid="flagship-course-meta-strip"
      >
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-[13px] text-[color:var(--jf-muted)]">
          <span>
            <span className="font-semibold text-[color:var(--jf-text)]">{curriculum.modules.length}</span> modules
          </span>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <span>
            <span className="font-semibold text-[color:var(--jf-text)]">{sessions.length}</span> sessions
          </span>
          <span className="hidden sm:inline" aria-hidden>
            ·
          </span>
          <span>{course.levelRange}</span>
        </div>
        <p className="text-[12px] leading-snug text-[color:var(--jf-subtle)] sm:max-w-md sm:text-right">{curriculum.depthLabel}</p>
      </div>
      <p className="mt-3 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{curriculum.estimatedDurationLabel}</p>
      <p className="mt-2 max-w-xl text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">
        Self-paced — session effort is qualitative until timing models are anchored to block-level work. Prefer depth over clock-chasing.
      </p>

      {/* Structure overview — stages tied to real module counts */}
      <section className="mt-14" aria-labelledby="structure-overview-heading" data-testid="flagship-curriculum-structure">
        <h2 id="structure-overview-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
          Course structure overview
        </h2>
        <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
          The Jifunze depth model maps directly onto your module path—each stage has dedicated modules, not a label pasted on thin content.
        </p>
        <ol className="mt-8 grid gap-4 sm:grid-cols-2">
          {STAGE_FLOW.map((stage, i) => (
            <li
              key={stage}
              className="rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] p-5 ring-1 ring-black/[0.02]"
            >
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">
                  Stage {i + 1} · {flagshipStageLabel(stage)}
                </p>
                <p className="font-mono text-[12px] font-semibold tabular-nums text-[color:var(--jf-text)]">{byStage[stage]} mods</p>
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{course.depthStages[STAGE_DESC_KEY[stage]]}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Practice & reinforcement */}
      <section className="mt-14 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-5 py-6 sm:px-8 sm:py-8" aria-labelledby="reinforcement-heading">
        <h2 id="reinforcement-heading" className="text-lg font-semibold tracking-tight text-[color:var(--jf-text)]">
          Practice, revision, and real-world work
        </h2>
        <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
          Depth signals in this path:{' '}
          <span className="font-medium text-[color:var(--jf-text)]">{practiceAnchors}</span> modules with applied tasks ·{' '}
          <span className="font-medium text-[color:var(--jf-text)]">{revisionPoints}</span> revision or recap checkpoints.
        </p>
        <ul className="mt-6 space-y-3">
          {curriculum.reinforcementSignals.map((line) => (
            <li key={line} className="flex gap-3 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700/45" aria-hidden />
              {line}
            </li>
          ))}
          <li className="flex gap-3 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-700/45" aria-hidden />
            Mastery checkpoints on practice sessions plus capstone prep after defensible readiness—consistent across every flagship track.
          </li>
        </ul>
      </section>

      <FlagshipCourseLearningPath courseSlug={courseSlug} curriculum={curriculum} sessions={sessions} progress={progress} />

      <FlagshipSupportMaterials courseSlug={courseSlug} curriculum={curriculum} sessions={sessions} progress={progress} />

      {/* Capstone */}
      <section
        className="mt-14 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface-elevated)] px-5 py-8 sm:px-8"
        aria-labelledby="capstone-deep-heading"
        data-testid="flagship-capstone-deep"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:var(--jf-muted)]">Capstone project</p>
        <h2 id="capstone-deep-heading" className="mt-3 text-xl font-semibold tracking-tight text-[color:var(--jf-text)]">
          {curriculum.capstone.title}
        </h2>
        <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">{curriculum.capstone.description}</p>

        {!progress.capstoneUnlocked ? (
          <p className="mt-4 rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-4 py-3 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
            Capstone preparation opens after you finish module sessions ({progress.remainingBeforeCapstone} sessions remaining). Checkpoint evidence on practice
            sessions must also be satisfied before prep reflects readiness.
          </p>
        ) : !progress.capstonePrepAccessible ? (
          <p className="mt-4 rounded-xl border border-amber-900/35 bg-amber-950/[0.12] px-4 py-3 text-[13px] leading-relaxed text-amber-100/90">
            Module sessions are complete—finish the mastery checkpoints listed in your learning path before capstone prep is available. This keeps the capstone tied
            to demonstrated judgment, not completion alone.
          </p>
        ) : (
          <p className="mt-4 rounded-xl border border-emerald-900/25 bg-emerald-950/[0.12] px-4 py-3 text-[13px] leading-relaxed text-emerald-100/85">
            {progress.capstonePrepComplete
              ? 'Capstone preparation marked complete—keep refining deliverables until they meet your bar.'
              : 'Capstone preparation is ready. Use the prep session in your learning path to align deliverables before calling the project done.'}
          </p>
        )}

        <p className="mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:var(--jf-muted)]">Deliverables</p>
        <ul className="mt-3 space-y-2">
          {curriculum.capstone.deliverables.map((d) => (
            <li key={d} className="flex gap-3 text-[14px] leading-relaxed text-[color:var(--jf-text)]">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--jf-muted)]" aria-hidden />
              {d}
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
