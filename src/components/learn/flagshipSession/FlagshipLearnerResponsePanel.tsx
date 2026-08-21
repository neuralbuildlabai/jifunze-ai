import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { FlagshipSessionContentBlock } from '../../../data/learning/flagshipSessionContentTypes'
import { validateFlagshipLearnerResponse } from '../../../lib/flagshipResponseValidation'
import { parseLearnerFeedback, serializeLearnerFeedback } from '../../../lib/learnerFeedbackFormat'
import type { LearnerArtifactValidationStatus, LearnerCourseArtifactRow } from '../../../lib/learnerCourseArtifactTypes'
import { loadLocalArtifactsForSession, type LocalLearnerArtifact, saveLocalArtifact } from '../../../lib/learnerCourseArtifactsLocal'
import { inferArtifactType } from '../../../lib/flagshipSessionResponseBlocks'
import {
  fetchLearnerArtifactsForSession,
  upsertLearnerCourseArtifact,
} from '../../../services/learnerState/learnerCourseArtifactsRemote'
import type { FlagshipSessionResponseContext } from './flagshipSessionResponseTypes'

export type { FlagshipSessionResponseContext } from './flagshipSessionResponseTypes'

const STATUS_LABEL: Record<LearnerArtifactValidationStatus, string> = {
  draft: 'Draft',
  needs_more_work: 'Needs more work',
  almost_ready: 'Almost ready',
  accepted: 'Accepted',
  strong_portfolio_evidence: 'Portfolio-ready',
}

function secondaryEvidenceSubtitle(row: LearnerCourseArtifactRow): string | null {
  if (row.validation_status === 'draft') return null
  if (row.accepted_as_module_evidence && row.capstone_candidate) {
    return 'Saved as module evidence · Available for capstone'
  }
  if (row.accepted_as_module_evidence) return 'Saved as module evidence'
  if (row.capstone_candidate) return 'Available for capstone'
  return null
}

function artifactEvidenceLabel(type: string): string {
  const map: Record<string, string> = {
    reflection: 'Reflection',
    output: 'Output draft',
    practice: 'Practice',
    capstone_prep: 'Capstone prep',
    verification: 'Verification',
    decision_memo: 'Decision memo',
    workflow: 'Workflow',
    written_response: 'Written response',
  }
  return map[type] ?? 'Written response'
}

function LearnerFeedbackView({ raw, className = '' }: { raw: string; className?: string }) {
  const fb = useMemo(() => parseLearnerFeedback(raw), [raw])
  const hasBody =
    Boolean(fb.summary?.trim()) || fb.strengths.length > 0 || fb.improvements.length > 0 || Boolean(fb.nextStep?.trim())
  if (!hasBody) return null

  return (
    <div
      className={`space-y-2 rounded-lg border border-[color:var(--jf-border)] bg-stone-50/80 px-3 py-2.5 sm:px-3.5 ${className}`.trim()}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-subtle)]">Feedback</p>
      {fb.summary?.trim() ? (
        <p className="text-[13px] leading-relaxed text-[color:var(--jf-text)]">{fb.summary.trim()}</p>
      ) : null}

      {fb.strengths.length > 0 ? (
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-subtle)]">What went well</p>
          <ul className="list-disc space-y-0.5 pl-3.5 text-[12px] leading-relaxed text-[color:var(--jf-muted)] marker:text-[color:var(--jf-subtle)]">
            {fb.strengths.map((s, i) => (
              <li key={`s-${i}`}>{s}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {fb.improvements.length > 0 ? (
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-subtle)]">To improve</p>
          <ul className="list-disc space-y-0.5 pl-3.5 text-[12px] leading-relaxed text-[color:var(--jf-muted)] marker:text-[color:var(--jf-subtle)]">
            {fb.improvements.map((s, i) => (
              <li key={`i-${i}`}>{s}</li>
            ))}
          </ul>
        </div>
      ) : null}

      {fb.nextStep?.trim() ? (
        <div className="space-y-0.5 pt-0.5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-subtle)]">Next step</p>
          <p className="text-[12px] leading-relaxed text-[color:var(--jf-muted)]">{fb.nextStep.trim()}</p>
        </div>
      ) : null}
    </div>
  )
}

function formatTs(iso: string | null | undefined): string | null {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    })
  } catch {
    return null
  }
}

function rowFromLocal(blockKey: string, local: LocalLearnerArtifact | undefined): LearnerCourseArtifactRow | null {
  if (!local) return null
  const now = new Date().toISOString()
  return {
    id: `local-${blockKey}`,
    user_id: 'local',
    course_slug: '',
    module_id: '',
    session_id: '',
    block_key: blockKey,
    block_label: null,
    artifact_type: null,
    response_text: local.response_text,
    validation_status: local.validation_status,
    validation_feedback: local.validation_feedback,
    validation_score: local.validation_score,
    accepted_as_module_evidence: local.accepted_as_module_evidence,
    capstone_candidate: local.capstone_candidate,
    attempt_count: local.attempt_count,
    archived_after_module_completion: local.archived_after_module_completion,
    final_evidence_text: local.final_evidence_text,
    metadata: {},
    created_at: now,
    updated_at: local.updated_at,
    reviewed_at: null,
  }
}

export function FlagshipLearnerResponsePanel(props: {
  block: FlagshipSessionContentBlock
  ctx: FlagshipSessionResponseContext
  /** When false, the short portfolio helper line is omitted (first block in session shows it). */
  isFirstLearnerResponseBlock?: boolean
  /** Larger, calmer surface for practice-lab task workspaces */
  surface?: 'default' | 'workspace'
}) {
  const { block, ctx, isFirstLearnerResponseBlock = true, surface = 'default' } = props
  const {
    courseSlug,
    moduleId,
    sessionId,
    userId,
    supabase,
    usesWorkspacePersistence,
    canEdit,
    moduleFullyComplete,
  } = ctx

  const artifactType = inferArtifactType(block)
  const blockLabel = [block.eyebrow, block.title].filter(Boolean).join(' · ').slice(0, 240)

  const [draft, setDraft] = useState('')
  const [remoteRow, setRemoteRow] = useState<LearnerCourseArtifactRow | null>(null)
  const [saving, setSaving] = useState(false)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [localOnly, setLocalOnly] = useState(false)
  const [responseFieldExpanded, setResponseFieldExpanded] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const useRemote = Boolean(userId && usesWorkspacePersistence && supabase)

  const reload = useCallback(async () => {
    if (!userId) {
      setRemoteRow(null)
      setDraft('')
      return
    }
    setError(null)
    if (useRemote && supabase) {
      const rows = await fetchLearnerArtifactsForSession(supabase, userId, courseSlug, sessionId)
      const mine = rows.find((r) => r.block_key === block.id) ?? null
      setRemoteRow(mine)
      setDraft(mine?.response_text ?? '')
      setLocalOnly(false)
      return
    }
    const local = loadLocalArtifactsForSession(userId, courseSlug, sessionId)[block.id]
    setRemoteRow(rowFromLocal(block.id, local))
    setDraft(local?.response_text ?? '')
    setLocalOnly(true)
  }, [userId, useRemote, supabase, courseSlug, sessionId, block.id])

  useEffect(() => {
    void reload()
  }, [reload, moduleFullyComplete])

  /** Remote archive runs after module completion; refetch once so archived drafts replace the editor. */
  useEffect(() => {
    if (!moduleFullyComplete || !useRemote) return
    const t = window.setTimeout(() => void reload(), 500)
    return () => window.clearTimeout(t)
  }, [moduleFullyComplete, useRemote, reload])

  const persistLocal = useCallback(
    (patch: Partial<LocalLearnerArtifact> & Pick<LocalLearnerArtifact, 'response_text' | 'validation_status'>) => {
      if (!userId) return
      const prev = loadLocalArtifactsForSession(userId, courseSlug, sessionId)[block.id]
      const next: LocalLearnerArtifact = {
        response_text: patch.response_text,
        validation_status: patch.validation_status,
        validation_feedback: patch.validation_feedback ?? prev?.validation_feedback ?? null,
        validation_score: patch.validation_score ?? prev?.validation_score ?? null,
        accepted_as_module_evidence: patch.accepted_as_module_evidence ?? prev?.accepted_as_module_evidence ?? false,
        capstone_candidate: patch.capstone_candidate ?? prev?.capstone_candidate ?? false,
        attempt_count: patch.attempt_count ?? prev?.attempt_count ?? 0,
        archived_after_module_completion:
          patch.archived_after_module_completion ?? prev?.archived_after_module_completion ?? false,
        final_evidence_text: patch.final_evidence_text ?? prev?.final_evidence_text ?? null,
        updated_at: new Date().toISOString(),
      }
      saveLocalArtifact(userId, courseSlug, sessionId, block.id, next)
      setRemoteRow(rowFromLocal(block.id, next))
    },
    [userId, courseSlug, sessionId, block.id],
  )

  const onSaveDraft = useCallback(async () => {
    if (!userId || !canEdit) return
    setSaving(true)
    setError(null)
    try {
      if (useRemote && supabase) {
        const attempt = remoteRow?.attempt_count ?? 0
        const { row: next, error: err } = await upsertLearnerCourseArtifact(supabase, {
          user_id: userId,
          course_slug: courseSlug,
          module_id: moduleId,
          session_id: sessionId,
          block_key: block.id,
          block_label: blockLabel || null,
          artifact_type: artifactType,
          response_text: draft,
          validation_status: 'draft',
          validation_feedback: remoteRow?.validation_feedback ?? null,
          validation_score: remoteRow?.validation_score ?? null,
          accepted_as_module_evidence: remoteRow?.accepted_as_module_evidence ?? false,
          capstone_candidate: remoteRow?.capstone_candidate ?? false,
          attempt_count: attempt,
          archived_after_module_completion: remoteRow?.archived_after_module_completion ?? false,
          final_evidence_text: remoteRow?.final_evidence_text ?? null,
        })
        if (err || !next) setError(err ?? 'Could not save')
        else setRemoteRow(next)
      } else {
        persistLocal({
          response_text: draft,
          validation_status: 'draft',
          attempt_count: remoteRow?.attempt_count ?? 0,
        })
      }
    } finally {
      setSaving(false)
    }
  }, [
    userId,
    canEdit,
    useRemote,
    supabase,
    courseSlug,
    moduleId,
    sessionId,
    block.id,
    blockLabel,
    artifactType,
    draft,
    remoteRow,
    persistLocal,
  ])

  const onSaveAndCheck = useCallback(async () => {
    if (!userId || !canEdit) return
    setChecking(true)
    setError(null)
    try {
      const result = validateFlagshipLearnerResponse(block, draft)
      const nextAttempt = (remoteRow?.attempt_count ?? 0) + 1
      const reviewedAt = new Date().toISOString()
      const finalText =
        result.status === 'accepted' || result.status === 'strong_portfolio_evidence'
          ? draft.trim()
          : remoteRow?.final_evidence_text ?? null

      const feedback = serializeLearnerFeedback({
        summary: result.summary,
        strengths: result.strengths,
        improvements: result.improvements,
        nextStep: result.nextStep,
      })

      if (useRemote && supabase) {
        const { row: next, error: err } = await upsertLearnerCourseArtifact(supabase, {
          user_id: userId,
          course_slug: courseSlug,
          module_id: moduleId,
          session_id: sessionId,
          block_key: block.id,
          block_label: blockLabel || null,
          artifact_type: artifactType,
          response_text: draft,
          validation_status: result.status,
          validation_feedback: feedback,
          validation_score: result.score,
          accepted_as_module_evidence: result.acceptedAsModuleEvidence,
          capstone_candidate: result.capstoneCandidate,
          attempt_count: nextAttempt,
          archived_after_module_completion: remoteRow?.archived_after_module_completion ?? false,
          final_evidence_text: finalText,
          reviewed_at: reviewedAt,
        })
        if (err || !next) setError(err ?? 'Could not save review')
        else setRemoteRow(next)
      } else {
        persistLocal({
          response_text: draft,
          validation_status: result.status,
          validation_feedback: feedback,
          validation_score: result.score,
          accepted_as_module_evidence: result.acceptedAsModuleEvidence,
          capstone_candidate: result.capstoneCandidate,
          attempt_count: nextAttempt,
          final_evidence_text: finalText,
        })
      }
    } finally {
      setChecking(false)
    }
  }, [
    userId,
    canEdit,
    block,
    draft,
    remoteRow,
    useRemote,
    supabase,
    courseSlug,
    moduleId,
    sessionId,
    blockLabel,
    artifactType,
    persistLocal,
  ])

  const row = remoteRow
  const lastSaved = formatTs(row?.updated_at)

  const isAcceptedLike = Boolean(
    row && (row.validation_status === 'accepted' || row.validation_status === 'strong_portfolio_evidence'),
  )
  const needsAttention = Boolean(
    row && (row.validation_status === 'needs_more_work' || row.validation_status === 'almost_ready'),
  )

  const statusBadgeClass = useMemo(() => {
    if (!row) return 'border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] text-[color:var(--jf-muted)]'
    if (row.validation_status === 'needs_more_work') {
      return 'border-amber-300/70 bg-amber-50 text-amber-950/95'
    }
    if (row.validation_status === 'almost_ready') {
      return 'border-amber-200/70 bg-amber-50/85 text-amber-950/92'
    }
    if (row.validation_status === 'accepted' || row.validation_status === 'strong_portfolio_evidence') {
      return 'border-emerald-200/70 bg-emerald-50 text-emerald-950/92'
    }
    return 'border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] text-[color:var(--jf-muted)]'
  }, [row])

  const showAcceptedReadOnly =
    moduleFullyComplete &&
    row &&
    (row.validation_status === 'accepted' || row.validation_status === 'strong_portfolio_evidence') &&
    Boolean((row.final_evidence_text || row.response_text)?.trim())

  const showArchivedDraft =
    moduleFullyComplete &&
    Boolean(row?.archived_after_module_completion) &&
    !row?.accepted_as_module_evidence &&
    Boolean(row?.response_text?.trim())

  const showEditor = Boolean(canEdit && userId && !showAcceptedReadOnly && !showArchivedDraft)

  const secondarySubtitle = row ? secondaryEvidenceSubtitle(row) : null
  const acceptedCalmTextarea =
    isAcceptedLike && showEditor && !responseFieldExpanded ? true : false
  const textareaRows = acceptedCalmTextarea ? 5 : 8
  const checkButtonLabel = isAcceptedLike && row ? 'Check again' : 'Save & Check'

  const editorHelperLine = useMemo(() => {
    if (!showEditor) return null
    if (row && isAcceptedLike) {
      return (
        <p className="mt-2 text-[12px] leading-relaxed text-[color:var(--jf-muted)]">
          This version is saved as module evidence. You can still revise and check again.
        </p>
      )
    }
    if (isFirstLearnerResponseBlock) {
      return (
        <p className="mt-2 text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">
          Saved work can support your portfolio.
        </p>
      )
    }
    return null
  }, [showEditor, row, isAcceptedLike, isFirstLearnerResponseBlock])

  const focusResponseField = useCallback(() => {
    setResponseFieldExpanded(true)
    queueMicrotask(() => textareaRef.current?.focus())
  }, [])

  if (!userId) {
    return (
      <div
        className="mt-5 rounded-lg border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-3 py-3 text-[13px] text-[color:var(--jf-muted)] sm:px-4"
        data-testid={`flagship-learner-response-${block.id}`}
      >
        Sign in to save your written work for this block. Lesson progress still saves through the course as usual.
      </div>
    )
  }

  const shellBorder = needsAttention ? 'border-amber-300/70' : 'border-[color:var(--jf-border)]'
  const workspaceShell =
    surface === 'workspace'
      ? `mt-5 rounded-xl border ${shellBorder} bg-amber-50/70 px-4 py-4 sm:px-5 sm:py-4`
      : `mt-5 rounded-lg border ${shellBorder} bg-[color:var(--jf-bg-page)]/50 px-3 py-3 sm:px-4 sm:py-3.5`
  const responseLabel = surface === 'workspace' ? 'Your workspace' : 'Your response'
  const responseLabelClass =
    surface === 'workspace'
      ? 'text-[12px] font-semibold text-[color:var(--jf-muted)]'
      : 'text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-subtle)]'

  return (
    <div className={workspaceShell} data-testid={`flagship-learner-response-${block.id}`}>
      <div className="flex flex-col gap-1.5 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:gap-3">
        <p className={responseLabelClass}>{responseLabel}</p>
        {row ? (
          <div className="flex flex-col items-start gap-1 sm:items-end">
            <span
              className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusBadgeClass}`}
            >
              {STATUS_LABEL[row.validation_status] ?? row.validation_status}
            </span>
            {secondarySubtitle ? (
              <span className="max-w-[min(100%,22rem)] text-left text-[10px] font-medium leading-snug text-[color:var(--jf-subtle)] sm:text-right">
                {secondarySubtitle}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      {localOnly ? (
        <p className="mt-2 text-[12px] leading-relaxed text-amber-200/85">
          Stored on this device only until your workspace syncs. Copy anything important if you might switch browsers.
        </p>
      ) : null}

      {showAcceptedReadOnly ? (
        <p className="mt-2 text-[12px] text-[color:var(--jf-muted)]">Saved as module evidence.</p>
      ) : null}

      {error ? <p className="mt-2 text-[12px] text-red-300/95">{error}</p> : null}

      {showAcceptedReadOnly ? (
        <div className="mt-3 space-y-3">
          <pre className="whitespace-pre-wrap rounded-lg border border-[color:var(--jf-border)] bg-stone-50 px-3 py-3 font-sans text-[14px] leading-relaxed text-[color:var(--jf-text)]">
            {(row!.final_evidence_text || row!.response_text).trim()}
          </pre>
          {row?.validation_feedback ? <LearnerFeedbackView raw={row.validation_feedback} className="mt-1" /> : null}
        </div>
      ) : showArchivedDraft ? (
        <details className="mt-3">
          <summary className="cursor-pointer text-[13px] font-medium text-[color:var(--jf-muted)]">Earlier draft (archived)</summary>
          <pre className="mt-2 whitespace-pre-wrap rounded-lg border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-3 py-3 font-sans text-[13px] text-[color:var(--jf-subtle)]">
            {row!.response_text}
          </pre>
        </details>
      ) : showEditor ? (
        <>
          {editorHelperLine}

          {isAcceptedLike && row ? (
            <div className="mt-3 flex flex-col gap-2 rounded-lg border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-3 py-2 text-[11px] text-[color:var(--jf-muted)] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
              <div className="flex min-w-0 flex-wrap items-baseline gap-x-2 gap-y-0.5">
                <span className="font-medium text-[color:var(--jf-text)]">Evidence saved</span>
                {lastSaved ? <span className="text-[color:var(--jf-subtle)]">· {lastSaved}</span> : null}
                <span className="text-[color:var(--jf-subtle)]">· {artifactEvidenceLabel(artifactType)}</span>
              </div>
              <button
                type="button"
                onClick={focusResponseField}
                className="shrink-0 self-start rounded-md px-2 py-1 text-[11px] font-semibold text-[color:var(--jf-muted)] underline-offset-2 hover:bg-stone-100 hover:text-[color:var(--jf-text)] hover:underline sm:self-auto"
              >
                Edit response
              </button>
            </div>
          ) : null}

          <label className="sr-only" htmlFor={`jf-response-${block.id}`}>
            {responseLabel}
          </label>
          <textarea
            ref={textareaRef}
            id={`jf-response-${block.id}`}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onFocus={() => setResponseFieldExpanded(true)}
            onBlur={() => {
              if (isAcceptedLike) setResponseFieldExpanded(false)
            }}
            disabled={saving || checking}
            rows={textareaRows}
            className="mt-2 w-full resize-y rounded-lg border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-3 py-2.5 text-[15px] leading-relaxed text-[color:var(--jf-text)] placeholder:text-[color:var(--jf-subtle)] focus-visible:border-orange-300/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)] disabled:opacity-50 sm:text-[15px]"
            placeholder="Use your own words. A few concrete details go further than generic statements."
          />

          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              disabled={saving || checking}
              onClick={() => void onSaveDraft()}
              className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full border px-4 text-[13px] font-semibold transition-colors disabled:opacity-50 ${
                isAcceptedLike
                  ? 'border-[color:var(--jf-border)] bg-transparent text-[color:var(--jf-muted)] hover:bg-stone-50 hover:text-[color:var(--jf-text)]'
                  : 'border-[color:var(--jf-border)] text-[color:var(--jf-text)] hover:bg-stone-50'
              }`}
            >
              {saving ? 'Saving…' : 'Save draft'}
            </button>
            <button
              type="button"
              disabled={saving || checking || draft.trim().length === 0}
              onClick={() => void onSaveAndCheck()}
              className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-4 text-[13px] font-semibold transition-colors disabled:opacity-50 ${
                isAcceptedLike
                  ? 'border border-[color:var(--jf-border)] bg-transparent text-[color:var(--jf-text)] hover:bg-stone-50'
                  : 'bg-[var(--jf-brand)] text-white hover:bg-[var(--jf-brand-hover)]'
              }`}
            >
              {checking ? 'Checking…' : checkButtonLabel}
            </button>
          </div>

          {lastSaved ? (
            <p className="mt-1.5 text-[11px] text-[color:var(--jf-subtle)]">Last saved {lastSaved}</p>
          ) : null}

          {row && row.validation_status !== 'draft' && row.validation_feedback ? (
            <div className="mt-3">
              <LearnerFeedbackView raw={row.validation_feedback} />
              {row.validation_status === 'needs_more_work' || row.validation_status === 'almost_ready' ? (
                <p className="mt-2 text-[12px] text-[color:var(--jf-subtle)]">Update your answer above, then tap Save & Check again.</p>
              ) : null}
            </div>
          ) : null}
        </>
      ) : (
        <p className="mt-3 text-[13px] text-[color:var(--jf-muted)]">
          This session is view-only — open it from your learning path to write responses.
        </p>
      )}
    </div>
  )
}
