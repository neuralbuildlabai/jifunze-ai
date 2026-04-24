import { useCallback, useEffect, useMemo, useState } from 'react'
import type { FlagshipSessionContentBlock } from '../../../data/learning/flagshipSessionContentTypes'
import { validateFlagshipLearnerResponse } from '../../../lib/flagshipResponseValidation'
import type { LearnerArtifactValidationStatus, LearnerCourseArtifactRow } from '../../../lib/learnerCourseArtifactTypes'
import { loadLocalArtifactsForSession, type LocalLearnerArtifact, saveLocalArtifact } from '../../../lib/learnerCourseArtifactsLocal'
import { blockSuggestsPortfolioEvidence, inferArtifactType } from '../../../lib/flagshipSessionResponseBlocks'
import {
  fetchLearnerArtifactsForSession,
  upsertLearnerCourseArtifact,
} from '../../../services/learning/learnerCourseArtifactsRemote'
import type { FlagshipSessionResponseContext } from './flagshipSessionResponseTypes'

export type { FlagshipSessionResponseContext } from './flagshipSessionResponseTypes'

const STATUS_LABEL: Record<LearnerArtifactValidationStatus, string> = {
  draft: 'Draft',
  needs_more_work: 'Needs more work',
  almost_ready: 'Almost ready',
  accepted: 'Accepted',
  strong_portfolio_evidence: 'Strong portfolio evidence',
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
    tenant_id: null,
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
}) {
  const { block, ctx } = props
  const {
    courseSlug,
    moduleId,
    sessionId,
    userId,
    supabase,
    usesWorkspacePersistence,
    tenantId,
    canEdit,
    moduleFullyComplete,
  } = ctx

  const portfolioHint = blockSuggestsPortfolioEvidence(block)
  const artifactType = inferArtifactType(block)
  const blockLabel = [block.eyebrow, block.title].filter(Boolean).join(' · ').slice(0, 240)

  const [draft, setDraft] = useState('')
  const [remoteRow, setRemoteRow] = useState<LearnerCourseArtifactRow | null>(null)
  const [saving, setSaving] = useState(false)
  const [checking, setChecking] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [localOnly, setLocalOnly] = useState(false)

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
          tenant_id: tenantId,
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
    tenantId,
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

      const feedbackLines = [
        result.summary,
        ...result.strengths.map((s) => `What went well: ${s}`),
        ...result.improvements.map((s) => `Improve: ${s}`),
      ].filter(Boolean)
      const feedback = feedbackLines.join('\n\n')

      if (useRemote && supabase) {
        const { row: next, error: err } = await upsertLearnerCourseArtifact(supabase, {
          user_id: userId,
          tenant_id: tenantId,
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
    tenantId,
    courseSlug,
    moduleId,
    sessionId,
    blockLabel,
    artifactType,
    persistLocal,
  ])

  const statusBadge = useMemo(() => {
    if (!remoteRow) return null
    const label = STATUS_LABEL[remoteRow.validation_status] ?? remoteRow.validation_status
    return (
      <span className="inline-flex rounded-full border border-[color:var(--jf-border)] px-2.5 py-0.5 text-[11px] font-medium text-[color:var(--jf-muted)]">
        {label}
      </span>
    )
  }, [remoteRow])

  const row = remoteRow
  const lastSaved = formatTs(row?.updated_at)

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

  if (!userId) {
    return (
      <div className="mt-6 rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)]/80 px-4 py-3 text-[13px] text-[color:var(--jf-muted)]">
        Sign in to save written practice for this block. Your reading progress still saves where the course allows.
      </div>
    )
  }

  return (
    <div className="mt-6 rounded-xl border border-white/[0.08] bg-[color:var(--jf-bg-page)]/90 px-4 py-4 sm:px-5" data-testid={`flagship-learner-response-${block.id}`}>
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-subtle)]">Your response</p>
        <div className="flex flex-wrap items-center gap-2">
          {statusBadge}
          {row?.accepted_as_module_evidence ? (
            <span className="rounded-full border border-emerald-900/35 bg-emerald-950/[0.2] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-emerald-100/90">
              Module evidence
            </span>
          ) : null}
          {row?.capstone_candidate ? (
            <span className="rounded-full border border-sky-900/35 bg-sky-950/[0.18] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-sky-100/90">
              Portfolio-ready
            </span>
          ) : null}
          {portfolioHint && !row?.capstone_candidate ? (
            <span className="text-[10px] text-[color:var(--jf-subtle)]">Can support capstone evidence</span>
          ) : null}
        </div>
      </div>

      {localOnly ? (
        <p className="mt-2 text-[12px] leading-relaxed text-amber-200/85">
          Saved on this device only until workspace sync is available — copy anything important elsewhere if you switch browsers.
        </p>
      ) : null}

      {showAcceptedReadOnly ? (
        <p className="mt-2 text-[12px] font-medium text-emerald-200/90">Module evidence saved.</p>
      ) : null}

      {error ? <p className="mt-2 text-[12px] text-red-300/95">{error}</p> : null}

      {showAcceptedReadOnly ? (
        <div className="mt-4 space-y-2">
          <p className="text-[13px] leading-relaxed text-[color:var(--jf-muted)]">{STATUS_LABEL[row!.validation_status]}</p>
          <pre className="whitespace-pre-wrap rounded-lg border border-emerald-900/25 bg-emerald-950/[0.08] p-4 font-sans text-[14px] leading-relaxed text-[color:var(--jf-text)]">
            {(row!.final_evidence_text || row!.response_text).trim()}
          </pre>
          {row?.validation_feedback ? (
            <p className="text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">{row.validation_feedback}</p>
          ) : null}
        </div>
      ) : showArchivedDraft ? (
        <details className="mt-4">
          <summary className="cursor-pointer text-[13px] font-medium text-[color:var(--jf-muted)]">Earlier draft (archived)</summary>
          <pre className="mt-3 whitespace-pre-wrap rounded-lg border border-[color:var(--jf-border)] p-3 font-sans text-[13px] text-[color:var(--jf-subtle)]">
            {row!.response_text}
          </pre>
        </details>
      ) : showEditor ? (
        <>
          <p className="mt-2 text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">
            Saved responses help build your portfolio and capstone evidence. This does not replace the module quiz or session completion
            controls.
          </p>
          <label className="sr-only" htmlFor={`jf-response-${block.id}`}>
            Your response
          </label>
          <textarea
            id={`jf-response-${block.id}`}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            disabled={saving || checking}
            rows={8}
            className="mt-3 w-full resize-y rounded-xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] px-3 py-3 text-[15px] leading-relaxed text-[color:var(--jf-text)] placeholder:text-[color:var(--jf-subtle)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)] disabled:opacity-50 sm:text-[15px]"
            placeholder="Write in your own words. Specifics beat generic statements."
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={saving || checking}
              onClick={() => void onSaveDraft()}
              className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-4 text-[13px] font-semibold text-[color:var(--jf-text)] hover:bg-white/[0.04] disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save draft'}
            </button>
            <button
              type="button"
              disabled={saving || checking || draft.trim().length === 0}
              onClick={() => void onSaveAndCheck()}
              className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-4 text-[13px] font-semibold text-zinc-950 hover:bg-[var(--jf-brand-hover)] disabled:opacity-50"
            >
              {checking ? 'Checking…' : 'Save & Check'}
            </button>
          </div>
          {lastSaved ? (
            <p className="mt-2 text-[11px] text-[color:var(--jf-subtle)]">Last saved {lastSaved}</p>
          ) : null}
          {row && row.validation_status !== 'draft' && row.validation_feedback ? (
            <div className="mt-4 rounded-lg border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/80 px-3 py-3 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-subtle)]">Feedback</p>
              <p className="mt-2 whitespace-pre-wrap">{row.validation_feedback}</p>
              {row.validation_status === 'needs_more_work' || row.validation_status === 'almost_ready' ? (
                <p className="mt-2 text-[12px] text-[color:var(--jf-subtle)]">Revise above, then use Save & Check again.</p>
              ) : null}
            </div>
          ) : null}
        </>
      ) : (
        <p className="mt-3 text-[13px] text-[color:var(--jf-muted)]">This session is view-only — open it from your learning path to write responses.</p>
      )}
    </div>
  )
}
