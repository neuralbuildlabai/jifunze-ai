import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { deriveDerivedAssetText } from '../../knowledge/deriveDerivedAsset'
import { LEGAL_ROUTES, TRUST_COPY } from '../../training/trustCopy'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import {
  DERIVED_CONTENT_LINEAGE_SCHEMA_ID,
  audienceClassForAssetType,
} from '../../knowledge/derivedContentLineage'
import { formatConceptCoverageSummaryLine } from '../../training/conceptCoverageHints'
import { buildCompletionIntelligence } from '../../training/completionIntelligence'
import {
  buildCohortRepeatedWeakHintsFromSnapshots,
  buildRemediationRevisionContinuityFromSnapshots,
  formatCohortWeakHistoryAppendixMarkdown,
  formatPriorCheckpointHistoryMarkdown,
} from '../../training/intelligenceContinuity'
import { computeReadinessSnapshot } from '../../training/readinessIndicators'
import { isDerivedContentAssetType } from '../../knowledge/derivedContentAssetTypes'
import type { DerivedContentAssetType } from '../../knowledge/types'
import { KNOWLEDGE_SPEC_VERSION } from '../../knowledge/types'
import { buildMiniLibraryBlueprint } from '../../knowledge/learningLibraryModel'
import {
  buildExamPrepAggregateAppendixMarkdown,
  buildExamPrepLearnerAppendixMarkdown,
} from '../../training/examPrepDerivedContent'
import { buildLearnerWeakAreaReport, formatRemediationAppendixMarkdown } from '../../training/weakAreaAnalysis'
import { formatFacilitatorInsightAppendixMarkdown } from '../../training/facilitatorInsight'
import {
  createTrainingAssignmentMvp,
  useFacilitatorTeamInsight,
  useTenantMembersList,
  useWorkspaceTrainingRole,
} from '../../training/teamTrainingHooks'
import { buildSignalDrivenLibraryHints } from '../../training/signalDrivenLibraryHints'
import { buildPlanContinuityGuidance } from '../../training/continuityGuidance'
import { countPlanProgress, pickNextTrainingStep } from '../../training/trainingProgress'
import {
  useDerivedContentAssetsForPlan,
  useLearnerIntelligenceOnPlan,
  useLearnerPlacementForPlan,
  useTrainingPlanDetail,
  useTrainingPlanKnowledgeSpec,
  useWorkspaceIntelligenceSnapshotsForPlan,
} from '../../training/trainingHooks'
import { sbInsertDerivedContentAsset } from '../../training/supabaseTraining'
import { useTrainingWorkspace } from '../../training/useTrainingWorkspace'
import { LibraryPortfolioPanel } from './LibraryPortfolioPanel'
import { ContinuityGuidanceCard } from './ContinuityGuidanceCard'
import { TrainingInlineAlert } from './TrainingInlineAlert'
import { ReadinessSnapshotPanel } from './ReadinessSnapshotPanel'
import { CompletionIntelligencePanel } from './CompletionIntelligencePanel'
import { FacilitatorInsightPanel } from './FacilitatorInsightPanel'
import { LearningIntelligenceContinuityCard } from './LearningIntelligenceContinuityCard'
import { WeakAreasPanel } from './WeakAreasPanel'

const ASSET_TYPE_OPTIONS: { value: DerivedContentAssetType; label: string }[] = [
  { value: 'study_notes', label: 'Study notes' },
  { value: 'revision_sheet', label: 'Revision sheet' },
  { value: 'trainer_guide', label: 'Trainer guide' },
  { value: 'handout', label: 'Handout' },
  { value: 'slide_outline', label: 'Slide outline' },
  { value: 'faq_sheet', label: 'FAQ sheet' },
  { value: 'educational_brief', label: 'Educational brief' },
  { value: 'refresher_handout', label: 'Refresher handout (team)' },
  { value: 'manager_coaching_brief', label: 'Manager coaching brief' },
  { value: 'facilitator_discussion_guide', label: 'Facilitator discussion guide' },
  { value: 'team_recap_sheet', label: 'Team recap sheet' },
]

export function TrainingPlanDetailPage() {
  const { planId } = useParams<{ planId: string }>()
  const [searchParams, setSearchParams] = useSearchParams()
  const { workspaceShellReady, user, tenantId, supabase } = useAuth()
  const mode = useTrainingWorkspace(user, tenantId, supabase)
  const { isManager } = useWorkspaceTrainingRole()
  const { members } = useTenantMembersList()
  const { tree, loading, error, progress, quizAttempts, refetch } = useTrainingPlanDetail(planId)
  const { spec: knowledgeSpec, loading: knowledgeLoading } = useTrainingPlanKnowledgeSpec(planId, tree)
  const { placement: learnerPlacement, loading: placementLoading } = useLearnerPlacementForPlan(planId)
  const { assets: derivedAssets, refetch: refetchDerivedAssets } = useDerivedContentAssetsForPlan(planId)
  const {
    insight: facilitatorInsight,
    loading: facilitatorInsightLoading,
    error: facilitatorInsightError,
    refetch: refetchFacilitatorInsight,
  } = useFacilitatorTeamInsight(planId, tree ?? null, knowledgeSpec)
  const {
    snapshots: learnerIntelSnapshots,
    planSignalCount,
    loading: learnerIntelLoading,
    error: learnerIntelError,
    refetch: refetchLearnerIntel,
  } = useLearnerIntelligenceOnPlan(planId)

  const {
    snapshots: workspaceIntelSnapshots,
    loading: workspaceIntelLoading,
    error: workspaceIntelError,
    refetch: refetchWorkspaceIntel,
  } = useWorkspaceIntelligenceSnapshotsForPlan(planId)

  const assetType = useMemo((): DerivedContentAssetType => {
    const at = searchParams.get('assetType')
    return at && isDerivedContentAssetType(at) ? at : 'revision_sheet'
  }, [searchParams])

  function setAssetType(next: DerivedContentAssetType) {
    setSearchParams(
      (prev) => {
        const p = new URLSearchParams(prev)
        p.set('assetType', next)
        return p
      },
      { replace: true },
    )
  }

  const [includeExamPrepLearnerSignals, setIncludeExamPrepLearnerSignals] = useState(
    () => searchParams.get('examPrepLearner') === '1',
  )
  const [includeExamPrepAggregateSignals, setIncludeExamPrepAggregateSignals] = useState(
    () => searchParams.get('examPrepAggregate') === '1',
  )
  const [includeRemediationInDerivation, setIncludeRemediationInDerivation] = useState(true)
  const [includePriorIntelInDerivation, setIncludePriorIntelInDerivation] = useState(true)
  const [includeCohortPatternsInDerivation, setIncludeCohortPatternsInDerivation] = useState(false)
  const [includeFacilitatorInsightInDerivation, setIncludeFacilitatorInsightInDerivation] = useState(false)
  const [assetPreview, setAssetPreview] = useState('')
  const [assetSaveBusy, setAssetSaveBusy] = useState(false)
  const [assetSaveError, setAssetSaveError] = useState<string | null>(null)

  const [assignOpen, setAssignOpen] = useState(false)
  const [assigneeId, setAssigneeId] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [assignBusy, setAssignBusy] = useState(false)
  const [assignError, setAssignError] = useState<string | null>(null)

  const assignableMembers = useMemo(() => {
    return members.filter((m) => m.user_id !== user?.id)
  }, [members, user?.id])

  const resumeStep = tree ? pickNextTrainingStep(tree, progress, quizAttempts) : null
  const diagnosticPending = (() => {
    if (!tree?.diagnostic_quiz) return false
    const n = tree.diagnostic_quiz.questions.length
    const att = quizAttempts.find((a) => a.quiz_id === tree.diagnostic_quiz!.id)
    return !(att?.status === 'completed' && n > 0 && (att.score ?? 0) >= n)
  })()
  const resumeHref =
    resumeStep?.kind === 'lesson' || resumeStep?.kind === 'quiz'
      ? resumeStep.href
      : resumeStep?.kind === 'done' && planId
        ? `/training/${planId}`
        : null
  const resumeLabel =
    resumeStep?.kind === 'lesson'
      ? `Continue: ${resumeStep.lesson.title}`
      : resumeStep?.kind === 'quiz'
        ? resumeStep.label
        : resumeStep?.kind === 'done'
          ? 'Plan complete — review'
          : null

  const counts = tree
    ? countPlanProgress({ tree, progress, attempts: quizAttempts })
    : null

  const weakAreaReport = useMemo(() => {
    if (!tree) return null
    return buildLearnerWeakAreaReport({
      tree,
      progress,
      quizAttempts,
      placement: learnerPlacement ?? null,
      knowledgeSpec: knowledgeSpec ?? null,
    })
  }, [tree, progress, quizAttempts, learnerPlacement, knowledgeSpec])

  const conceptCoverageLine = useMemo(() => {
    if (!knowledgeSpec || !weakAreaReport) return null
    return formatConceptCoverageSummaryLine(knowledgeSpec, weakAreaReport)
  }, [knowledgeSpec, weakAreaReport])

  const readinessSnapshot = useMemo(() => {
    if (!tree) return null
    return computeReadinessSnapshot({
      tree,
      progress,
      attempts: quizAttempts,
      knowledgeSpec: knowledgeSpec ?? null,
      placement: learnerPlacement ?? null,
    })
  }, [tree, progress, quizAttempts, knowledgeSpec, learnerPlacement])

  const cohortRepeatedWeakHints = useMemo(() => {
    if (!isManager || !workspaceIntelSnapshots.length) return []
    return buildCohortRepeatedWeakHintsFromSnapshots(workspaceIntelSnapshots)
  }, [isManager, workspaceIntelSnapshots])

  const completionIntel = useMemo(() => {
    if (!tree || !weakAreaReport) return null
    return buildCompletionIntelligence({
      tree,
      progress,
      quizAttempts,
      placement: learnerPlacement ?? null,
      knowledgeSpec: knowledgeSpec ?? null,
      weakReport: weakAreaReport,
      learnerSnapshotHistory: learnerIntelSnapshots,
    })
  }, [tree, progress, quizAttempts, learnerPlacement, knowledgeSpec, weakAreaReport, learnerIntelSnapshots])

  const remediationContinuityForGuidance = useMemo(
    () =>
      learnerIntelSnapshots.length ? buildRemediationRevisionContinuityFromSnapshots(learnerIntelSnapshots) : null,
    [learnerIntelSnapshots],
  )

  const continuityGuidance = useMemo(() => {
    if (!tree) return null
    return buildPlanContinuityGuidance({
      nextStep: pickNextTrainingStep(tree, progress, quizAttempts),
      continuity: remediationContinuityForGuidance,
      weakAreaReport: weakAreaReport ?? null,
    })
  }, [tree, progress, quizAttempts, remediationContinuityForGuidance, weakAreaReport])

  const supplementalQuizKinds = useMemo(
    () =>
      tree?.plan_supplemental_quizzes?.map((q) => String(q.quiz_kind ?? '').trim()).filter(Boolean) ?? [],
    [tree],
  )

  const miniLibraryBlueprint = useMemo(() => {
    if (!knowledgeSpec) return null
    return buildMiniLibraryBlueprint(knowledgeSpec, supplementalQuizKinds)
  }, [knowledgeSpec, supplementalQuizKinds])

  const signalDrivenLibraryHints = useMemo(() => {
    const topic = (tree?.plan.topic ?? knowledgeSpec?.domain.topic ?? 'this topic').trim() || 'this topic'
    return buildSignalDrivenLibraryHints({
      topic,
      continuity: remediationContinuityForGuidance,
      weakReport: weakAreaReport ?? null,
    })
  }, [tree?.plan.topic, knowledgeSpec?.domain.topic, remediationContinuityForGuidance, weakAreaReport])

  return (
    <div className="mx-auto w-full max-w-3xl space-y-8 px-4 py-10 text-zinc-100">
      <header className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.06] pb-6">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">Training plan</p>
          <h1 className="mt-1 text-xl font-semibold text-white">
            {tree?.plan.title ?? (loading ? 'Loading…' : 'Plan')}
          </h1>
          {tree?.plan.topic ? (
            <p className="mt-2 text-sm text-zinc-400">{tree.plan.topic}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to="/training"
            className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800"
          >
            All plans
          </Link>
          {isManager && planId ? (
            <button
              type="button"
              onClick={() => {
                setAssignError(null)
                setAssigneeId(assignableMembers[0]?.user_id ?? '')
                setDueDate('')
                setAssignOpen(true)
              }}
              className="rounded-lg border border-violet-500/35 bg-violet-950/25 px-3 py-1.5 text-xs font-semibold text-violet-100 hover:bg-violet-950/40"
            >
              Assign training
            </button>
          ) : null}
          {planId && resumeHref ? (
            <Link
              to={resumeHref}
              className="rounded-lg bg-violet-600/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500"
            >
              {resumeLabel ?? 'Continue'}
            </Link>
          ) : null}
        </div>
      </header>

      <TrustBoundaryStrip dataTestId="plan-detail-trust-boundary" />

      {isSupabaseConfigured() && !workspaceShellReady ? (
        <p className="text-sm text-zinc-400">Loading workspace…</p>
      ) : null}

      {error ? (
        <TrainingInlineAlert
          error={error}
          onRetry={() => void refetch()}
          retryLabel="Retry"
        />
      ) : null}

      {loading ? (
        <p className="text-sm text-zinc-400">Loading plan…</p>
      ) : !tree ? (
        <p className="text-sm text-zinc-500">Plan not found.</p>
      ) : (
        <>
          {assignOpen ? (
            <div
              className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 px-4 py-10"
              role="dialog"
              aria-modal="true"
              aria-labelledby="assign-training-title"
            >
              <div className="w-full max-w-md rounded-2xl border border-white/[0.1] bg-zinc-950 p-5 shadow-2xl ring-1 ring-white/[0.06]">
                <h2 id="assign-training-title" className="text-sm font-semibold text-white">
                  Assign this plan
                </h2>
                <p className="mt-1 text-xs text-zinc-500">
                  Creates a workspace assignment. Learners keep using the same lessons, checkpoints, and progress
                  records.
                </p>
                <div className="mt-4 space-y-3">
                  {assignableMembers.length === 0 ? (
                    <p className="text-sm text-zinc-400">
                      No other members are visible in this workspace yet.{' '}
                      <Link to="/team/members" className="text-violet-300 hover:text-violet-200">
                        Open members
                      </Link>{' '}
                      to confirm your roster.
                    </p>
                  ) : (
                    <label className="block text-xs font-medium text-zinc-400">
                      Team member
                      <select
                        value={assigneeId}
                        onChange={(e) => setAssigneeId(e.target.value)}
                        className="mt-1 w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
                      >
                        <option value="">Select…</option>
                        {assignableMembers.map((m) => (
                          <option key={m.user_id} value={m.user_id}>
                            {m.user_id.slice(0, 8)}… ({m.role})
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                  <label className="block text-xs font-medium text-zinc-400">
                    Due date (optional)
                    <input
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="mt-1 w-full rounded-lg border border-white/[0.08] bg-zinc-900 px-3 py-2 text-sm text-zinc-100"
                    />
                  </label>
                </div>
                {assignError ? (
                  <p className="mt-3 text-xs text-rose-300/90" role="alert">
                    {assignError}
                  </p>
                ) : null}
                <div className="mt-5 flex flex-wrap justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setAssignOpen(false)}
                    className="rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={assignBusy || !planId || !assigneeId || assignableMembers.length === 0}
                    onClick={() => {
                      void (async () => {
                        if (!planId || !assigneeId) return
                        setAssignBusy(true)
                        setAssignError(null)
                        const dueIso = dueDate.trim() ? new Date(`${dueDate}T12:00:00`).toISOString() : null
                        const { error: e } = await createTrainingAssignmentMvp({
                          mode,
                          planId,
                          assignedTo: assigneeId,
                          dueDate: dueIso,
                        })
                        if (e) {
                          setAssignError(e.message)
                          setAssignBusy(false)
                          return
                        }
                        setAssignBusy(false)
                        setAssignOpen(false)
                      })()
                    }}
                    className="rounded-lg bg-violet-600/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {assignBusy ? 'Saving…' : 'Create assignment'}
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04]">
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Progress</p>
            <p className="mt-2 text-sm text-zinc-200">
              {counts
                ? `${counts.completedLessons} / ${counts.totalLessons} lessons · ${counts.completedQuizzes} / ${counts.totalQuizzes} checkpoints · ${counts.modulesDone} / ${counts.totalModules} modules complete`
                : '—'}
            </p>
            {counts?.planDone ? (
              <p className="mt-2 text-sm text-emerald-300/90">Plan complete.</p>
            ) : counts ? (
              <p className="mt-2 text-sm text-zinc-500">
                Next:{' '}
                {resumeLabel ? (
                  <span className="text-zinc-300">{resumeLabel}</span>
                ) : (
                  <span className="text-zinc-300">Review this plan</span>
                )}
              </p>
            ) : null}
            {tree.plan.objective ? (
              <p className="mt-3 text-sm text-zinc-400">
                <span className="font-medium text-zinc-300">Objective: </span>
                {tree.plan.objective}
              </p>
            ) : null}
            {tree.plan.expected_outcomes ? (
              <div className="mt-3 rounded-lg border border-white/[0.06] bg-zinc-950/35 px-3 py-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                  Expected outcomes
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm text-zinc-300">{tree.plan.expected_outcomes}</p>
              </div>
            ) : null}
          </section>

          {continuityGuidance ? (
            <ContinuityGuidanceCard
              guidance={continuityGuidance}
              derivedContentHref={`/training/${tree.plan.id}#plan-derived-content`}
            />
          ) : null}

          {counts?.planDone && completionIntel ? <CompletionIntelligencePanel intel={completionIntel} /> : null}

          {tree?.diagnostic_quiz && diagnosticPending ? (
            <div className="rounded-xl border border-violet-500/25 bg-violet-950/20 px-4 py-3 text-sm text-violet-100">
              <p className="font-semibold text-white">Start with the placement diagnostic</p>
              <p className="mt-1 text-xs text-violet-200/90">
                Complete the short diagnostic first so checkpoints align with where you actually are.
              </p>
              <Link
                to={`/training/${tree.plan.id}/quizzes/${tree.diagnostic_quiz.id}`}
                className="mt-3 inline-flex rounded-lg bg-violet-600/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500"
              >
                Open diagnostic
              </Link>
            </div>
          ) : null}

          {readinessSnapshot ? <ReadinessSnapshotPanel snapshot={readinessSnapshot} /> : null}

          {!placementLoading && learnerPlacement ? (
            <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04]">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Your placement</p>
              <p className="mt-2 text-sm text-zinc-200">
                Recommended starting level:{' '}
                <span className="font-medium text-white">{learnerPlacement.recommended_level}</span>
              </p>
              {learnerPlacement.diagnostic_score_percent != null ? (
                <p className="mt-1 text-xs text-zinc-400">
                  Quick check score: {String(learnerPlacement.diagnostic_score_percent)}%
                </p>
              ) : null}
              {learnerPlacement.self_confidence_1_5 != null ? (
                <p className="mt-1 text-xs text-zinc-400">
                  Self-confidence at setup: {learnerPlacement.self_confidence_1_5}/5
                </p>
              ) : null}
              {Array.isArray(learnerPlacement.foundation_gap_concept_ids) &&
              learnerPlacement.foundation_gap_concept_ids.length > 0 ? (
                <p className="mt-2 text-xs text-amber-200/90">
                  Foundation gaps flagged — expect extra reinforcement on:{' '}
                  {(learnerPlacement.foundation_gap_concept_ids as string[]).join(', ')}
                </p>
              ) : null}
            </section>
          ) : null}

          {weakAreaReport ? <WeakAreasPanel report={weakAreaReport} planId={tree.plan.id} /> : null}

          {knowledgeSpec && miniLibraryBlueprint ? (
            <LibraryPortfolioPanel
              blueprint={miniLibraryBlueprint}
              hints={signalDrivenLibraryHints}
              derivedContentHref={`/training/${tree.plan.id}#plan-derived-content`}
            />
          ) : null}

          {knowledgeSpec && weakAreaReport ? (
            <section className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04]">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                Assessment coverage · preparation context
              </p>
              <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                Knowledge engine coherence: one canonical spec (v{KNOWLEDGE_SPEC_VERSION}) anchors lessons, quizzes, and
                derived assets for this plan — edits propagate through the shared graph.
              </p>
              {conceptCoverageLine ? (
                <p className="mt-2 text-[11px] leading-relaxed text-zinc-300">{conceptCoverageLine}</p>
              ) : null}
              <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">{TRUST_COPY.assessmentCoverageVisibility}</p>
              {tree.plan_supplemental_quizzes.some(
                (q) => q.quiz_kind === 'exam_practice' || q.quiz_kind === 'mixed_review',
              ) ? (
                <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">{TRUST_COPY.examPrepSeriousnessBoundary}</p>
              ) : null}
            </section>
          ) : null}

          {learnerIntelError ? (
            <TrainingInlineAlert error={learnerIntelError} onRetry={() => void refetchLearnerIntel()} />
          ) : null}
          {workspaceIntelError ? (
            <TrainingInlineAlert error={workspaceIntelError} onRetry={() => void refetchWorkspaceIntel()} />
          ) : null}

          {!learnerIntelLoading ? (
            <LearningIntelligenceContinuityCard
              snapshots={learnerIntelSnapshots}
              planSignalCount={planSignalCount}
            />
          ) : (
            <p className="text-sm text-zinc-500">Loading learning memory…</p>
          )}
          {isManager && workspaceIntelLoading ? (
            <p className="text-[11px] text-zinc-600">Loading cohort checkpoint patterns…</p>
          ) : null}

          {isManager ? (
            <FacilitatorInsightPanel
              insight={facilitatorInsight}
              loading={facilitatorInsightLoading}
              error={facilitatorInsightError?.message ?? null}
              onRetry={() => void refetchFacilitatorInsight()}
              checkpointSignalCount={planSignalCount}
              cohortRepeatedWeakHints={cohortRepeatedWeakHints}
            />
          ) : null}

          <section
            id="plan-derived-content"
            className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">Content from this plan</p>
            <p className="mt-2 text-xs text-zinc-500">
              Generate facilitator or study assets from the same knowledge graph as lessons and quizzes. Preview is
              local; saving stores a copy in your workspace (Supabase).
            </p>
            <p className="mt-3 text-[11px] leading-relaxed text-zinc-600">
              Content tools stay assistive—review outputs before sharing.{' '}
              <Link className="font-medium text-violet-300 hover:text-violet-200" to={LEGAL_ROUTES.disclaimer}>
                Full disclaimer
              </Link>
              .
            </p>
            {searchParams.get('examFocus') === '1' ? (
              <p className="mt-2 rounded-lg border border-sky-500/20 bg-sky-950/25 px-3 py-2 text-[11px] leading-relaxed text-sky-100/90">
                Exam-prep shortcut: asset type{searchParams.get('examPrepLearner') === '1' ? ' and learner exam-prep' : ''}{' '}
                came from your rehearsal link — use the exam-prep checkboxes under “Content from this plan” to add
                segment/coverage signals and (for facilitators) aggregate cohort outlines.
              </p>
            ) : null}
            {audienceClassForAssetType(assetType) === 'publishable' ? (
              <p className="mt-2 rounded-lg border border-amber-500/25 bg-amber-950/25 px-3 py-2 text-[11px] leading-relaxed text-amber-100/95">
                {TRUST_COPY.publishableEducationalDraft} {TRUST_COPY.publishingExternalReview}
              </p>
            ) : null}
            {knowledgeLoading ? (
              <p className="mt-3 text-sm text-zinc-500">Loading knowledge graph…</p>
            ) : !knowledgeSpec ? (
              <p className="mt-3 text-sm text-zinc-500">No knowledge graph available for this plan.</p>
            ) : (
              <div className="mt-4 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <label className="text-xs text-zinc-500" htmlFor="derived-asset-type">
                    Asset type
                  </label>
                  <select
                    id="derived-asset-type"
                    value={assetType}
                    onChange={(e) => setAssetType(e.target.value as DerivedContentAssetType)}
                    className="rounded-lg border border-white/[0.1] bg-zinc-950/60 px-2 py-1.5 text-xs text-zinc-100"
                  >
                    {ASSET_TYPE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <label className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <input
                      type="checkbox"
                      checked={includeRemediationInDerivation}
                      onChange={(e) => setIncludeRemediationInDerivation(e.target.checked)}
                      className="rounded border-zinc-600"
                    />
                    Target weak areas in output
                  </label>
                  <label className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <input
                      type="checkbox"
                      checked={includePriorIntelInDerivation}
                      onChange={(e) => setIncludePriorIntelInDerivation(e.target.checked)}
                      disabled={!learnerIntelSnapshots.length}
                      className="rounded border-zinc-600 disabled:opacity-40"
                    />
                    Include prior checkpoint memory (your summaries)
                  </label>
                  {isManager ? (
                    <label className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                      <input
                        type="checkbox"
                        checked={includeCohortPatternsInDerivation}
                        onChange={(e) => setIncludeCohortPatternsInDerivation(e.target.checked)}
                        disabled={!cohortRepeatedWeakHints.length}
                        className="rounded border-zinc-600 disabled:opacity-40"
                      />
                      Cohort weak-label patterns (aggregate)
                    </label>
                  ) : null}
                  {isManager ? (
                    <label className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                      <input
                        type="checkbox"
                        checked={includeFacilitatorInsightInDerivation}
                        onChange={(e) => setIncludeFacilitatorInsightInDerivation(e.target.checked)}
                        disabled={!facilitatorInsight}
                        className="rounded border-zinc-600 disabled:opacity-40"
                      />
                      Include facilitator cohort insight
                    </label>
                  ) : null}
                  <label className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <input
                      type="checkbox"
                      checked={includeExamPrepLearnerSignals}
                      onChange={(e) => setIncludeExamPrepLearnerSignals(e.target.checked)}
                      disabled={!tree || !knowledgeSpec}
                      className="rounded border-zinc-600 disabled:opacity-40"
                    />
                    Exam-prep learner signals (scores · segments · graph domains)
                  </label>
                  <label className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <input
                      type="checkbox"
                      checked={includeExamPrepAggregateSignals}
                      onChange={(e) => setIncludeExamPrepAggregateSignals(e.target.checked)}
                      disabled={!knowledgeSpec}
                      className="rounded border-zinc-600 disabled:opacity-40"
                    />
                    Exam-prep cohort outline (aggregate-safe)
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setAssetSaveError(null)
                      const appendix =
                        includeRemediationInDerivation && weakAreaReport
                          ? formatRemediationAppendixMarkdown(weakAreaReport, { planTitle: tree.plan.title })
                          : undefined
                      const facilitatorAppendix =
                        isManager &&
                        includeFacilitatorInsightInDerivation &&
                        facilitatorInsight
                          ? formatFacilitatorInsightAppendixMarkdown(facilitatorInsight, {
                              planTitle: tree.plan.title,
                            })
                          : undefined
                      const learnerContinuity = learnerIntelSnapshots.length
                        ? buildRemediationRevisionContinuityFromSnapshots(learnerIntelSnapshots)
                        : null
                      const priorIntelMd =
                        includePriorIntelInDerivation && learnerContinuity
                          ? formatPriorCheckpointHistoryMarkdown(learnerContinuity, { planTitle: tree.plan.title })
                          : undefined
                      const cohortPatternsMd =
                        isManager &&
                        includeCohortPatternsInDerivation &&
                        cohortRepeatedWeakHints.length
                          ? formatCohortWeakHistoryAppendixMarkdown(cohortRepeatedWeakHints)
                          : undefined
                      const examPrepLearnerMd =
                        includeExamPrepLearnerSignals && tree && knowledgeSpec
                          ? buildExamPrepLearnerAppendixMarkdown({
                              tree,
                              quizAttempts,
                              knowledgeSpec,
                              weakAreaReport: weakAreaReport ?? null,
                              planTitle: tree.plan.title,
                            })
                          : undefined
                      const examPrepAggregateMd =
                        includeExamPrepAggregateSignals && tree && knowledgeSpec
                          ? buildExamPrepAggregateAppendixMarkdown({
                              planTitle: tree.plan.title,
                              knowledgeSpec,
                              cohortRepeatedWeakHints,
                            })
                          : undefined
                      setAssetPreview(
                        deriveDerivedAssetText({
                          spec: knowledgeSpec,
                          assetType,
                          remediationAppendixMarkdown: appendix,
                          facilitatorInsightMarkdown: facilitatorAppendix,
                          priorCheckpointHistoryMarkdown: priorIntelMd,
                          cohortCheckpointPatternsMarkdown: cohortPatternsMd,
                          examPrepLearnerAppendixMarkdown: examPrepLearnerMd,
                          examPrepAggregateAppendixMarkdown: examPrepAggregateMd,
                        }),
                      )
                    }}
                    className="rounded-lg border border-zinc-600 bg-zinc-800/80 px-3 py-1.5 text-xs text-zinc-200 hover:bg-zinc-800"
                  >
                    Preview
                  </button>
                  {mode.kind === 'live' && planId && user?.id ? (
                    <button
                      type="button"
                      disabled={assetSaveBusy || !assetPreview.trim()}
                      onClick={() => {
                        if (!supabase || !planId || !user?.id) return
                        if (mode.kind !== 'live') return
                        setAssetSaveBusy(true)
                        setAssetSaveError(null)
                        void (async () => {
                          const { error: e } = await sbInsertDerivedContentAsset({
                            supabase,
                            workspaceId: mode.workspaceId,
                            userId: user.id,
                            sourceTrainingPlanId: planId,
                            assetType,
                            audienceLevel: tree.plan.skill_level,
                            content: assetPreview,
                            metadataJson: {
                              ontology: DERIVED_CONTENT_LINEAGE_SCHEMA_ID,
                              generated_from: 'knowledge_spec_v1',
                              knowledge_spec_version: KNOWLEDGE_SPEC_VERSION,
                              source_training_plan_id: planId,
                              asset_type: assetType,
                              audience_class: audienceClassForAssetType(assetType),
                              weak_area_appendix: includeRemediationInDerivation,
                              facilitator_appendix: includeFacilitatorInsightInDerivation && Boolean(facilitatorInsight),
                              prior_intel_appendix: includePriorIntelInDerivation && Boolean(learnerIntelSnapshots.length),
                              cohort_patterns_appendix:
                                includeCohortPatternsInDerivation && Boolean(cohortRepeatedWeakHints.length),
                              exam_prep_learner_appendix: includeExamPrepLearnerSignals && Boolean(tree && knowledgeSpec),
                              exam_prep_aggregate_appendix:
                                includeExamPrepAggregateSignals && Boolean(tree && knowledgeSpec),
                            },
                          })
                          setAssetSaveBusy(false)
                          if (e) {
                            setAssetSaveError(e.message)
                            return
                          }
                          void refetchDerivedAssets()
                        })()
                      }}
                      className="rounded-lg bg-violet-600/90 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {assetSaveBusy ? 'Saving…' : 'Save to workspace'}
                    </button>
                  ) : (
                    <span className="text-[11px] text-zinc-600">Connect Supabase to save assets.</span>
                  )}
                </div>
                {assetSaveError ? <p className="text-xs text-rose-300/90">{assetSaveError}</p> : null}
                {assetPreview ? (
                  <div className="space-y-2">
                    <div className="rounded-lg border border-white/[0.06] bg-zinc-950/45 px-3 py-2 text-[10px] leading-relaxed text-zinc-500">
                      <span className="font-semibold text-zinc-400">Preview lineage · </span>
                      {DERIVED_CONTENT_LINEAGE_SCHEMA_ID} · knowledge spec v{KNOWLEDGE_SPEC_VERSION} · audience{' '}
                      <span className="text-zinc-400">{audienceClassForAssetType(assetType)}</span>
                      {' · '}
                      appendices:{' '}
                      <span className="text-zinc-400">
                        {[
                          includeRemediationInDerivation && 'weak-area',
                          includePriorIntelInDerivation && 'checkpoint-memory',
                          isManager && includeCohortPatternsInDerivation && 'cohort-patterns',
                          isManager && includeFacilitatorInsightInDerivation && 'facilitator-insight',
                          includeExamPrepLearnerSignals && 'exam-learner',
                          includeExamPrepAggregateSignals && 'exam-cohort',
                        ]
                          .filter(Boolean)
                          .join(', ') || 'none'}
                      </span>
                    </div>
                    <textarea
                      readOnly
                      value={assetPreview}
                      rows={12}
                      className="w-full resize-y rounded-lg border border-white/[0.08] bg-zinc-950/50 px-3 py-2 font-mono text-[11px] leading-relaxed text-zinc-200"
                    />
                  </div>
                ) : null}
                {derivedAssets.length > 0 ? (
                  <div className="border-t border-white/[0.06] pt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">
                      Saved in workspace
                    </p>
                    <ul className="mt-2 space-y-1 text-xs text-zinc-400">
                      {derivedAssets.slice(0, 8).map((a) => (
                        <li key={a.id}>
                          <span className="text-zinc-300">{a.asset_type}</span>
                          <span className="text-zinc-600"> · </span>
                          {new Date(a.created_at).toLocaleString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            )}
          </section>

          <section className="space-y-6">
            {tree.modules.map((m) => (
              <div key={m.id}>
                <h2 className="text-sm font-semibold text-white">{m.title}</h2>
                {m.description ? <p className="mt-1 text-xs text-zinc-500">{m.description}</p> : null}
                {m.module_goal ? (
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    <span className="font-medium text-zinc-300">Module goal: </span>
                    {m.module_goal}
                  </p>
                ) : null}
                {m.why_it_matters ? (
                  <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                    <span className="font-medium text-zinc-400">Why it matters: </span>
                    {m.why_it_matters}
                  </p>
                ) : null}
                <ul className="mt-3 space-y-2">
                  {m.lessons.map((l) => {
                    const st = progress.find((p) => p.lesson_id === l.id)?.status ?? 'not_started'
                    const done = st === 'completed'
                    return (
                      <li key={l.id}>
                        <Link
                          to={`/training/${tree.plan.id}/lessons/${l.id}`}
                          className="flex items-center justify-between gap-3 rounded-lg border border-white/[0.06] bg-zinc-950/40 px-3 py-2 text-sm text-zinc-100 transition hover:border-violet-400/25"
                        >
                          <span>{l.title}</span>
                          <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                            {done ? 'Done' : st === 'in_progress' ? 'In progress' : 'Not started'}
                          </span>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
                {m.quiz ? (
                  <div className="mt-3">
                    <Link
                      to={`/training/${tree.plan.id}/quizzes/${m.quiz.id}`}
                      className="flex items-center justify-between gap-3 rounded-lg border border-violet-500/25 bg-violet-950/20 px-3 py-2 text-sm text-zinc-100 transition hover:border-violet-400/35"
                    >
                      <span>{m.quiz.title}</span>
                      <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                        {(() => {
                          const att = quizAttempts.find((a) => a.quiz_id === m.quiz!.id)
                          const n = m.quiz!.questions.length
                          const passed =
                            att?.status === 'completed' && n > 0 && (att.score ?? 0) >= n
                          return passed ? 'Passed' : 'Checkpoint'
                        })()}
                      </span>
                    </Link>
                  </div>
                ) : null}
              </div>
            ))}
          </section>

          {tree.plan_supplemental_quizzes.length > 0 ? (
            <section className="space-y-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-4 ring-1 ring-white/[0.04]">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-zinc-500">
                  Plan-level review & exam-prep drills
                </p>
                <p className="mt-2 text-xs text-zinc-500">
                  Recap, mixed-topic, and exam-style practice unlock after module checkpoints complete — same quiz UI,
                  with stakes-oriented rehearsal framing for external credential prep (supports preparation; not a
                  credential guarantee — timed simulations may be added later).
                </p>
              </div>
              <ul className="space-y-2">
                {tree.plan_supplemental_quizzes.map((q) => {
                  const att = quizAttempts.find((a) => a.quiz_id === q.id)
                  const n = q.questions.length
                  const passed = att?.status === 'completed' && n > 0 && (att.score ?? 0) >= n
                  const kind = q.quiz_kind ?? ''
                  const chip =
                    kind === 'recap_checkpoint'
                      ? 'Recap'
                      : kind === 'mixed_review'
                        ? 'Mixed review'
                        : kind === 'exam_practice'
                          ? 'Exam-style'
                          : 'Review'
                  return (
                    <li key={q.id}>
                      <Link
                        to={`/training/${tree.plan.id}/quizzes/${q.id}`}
                        className="flex items-center justify-between gap-3 rounded-lg border border-sky-500/25 bg-sky-950/15 px-3 py-2 text-sm text-zinc-100 transition hover:border-sky-400/35"
                      >
                        <span>
                          <span className="mr-2 rounded bg-sky-900/60 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-200">
                            {chip}
                          </span>
                          {q.title}
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                          {passed ? 'Passed' : 'Open'}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          ) : null}
        </>
      )}
    </div>
  )
}
