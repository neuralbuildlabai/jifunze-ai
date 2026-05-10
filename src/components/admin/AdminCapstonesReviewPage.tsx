import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { getSupabaseBrowserClient } from '../../lib/supabaseClient'
import {
  adminUpdateCapstoneSubmission,
  fetchAllCapstoneSubmissionsForAdmin,
  type LearnerCapstoneSubmissionRow,
} from '../../services/learning/learnerCapstoneSubmissionsRemote'

const STATUSES = ['submitted', 'under_review', 'revision_requested', 'passed', 'failed'] as const

export function AdminCapstonesReviewPage() {
  const { user } = useAuth()
  const [rows, setRows] = useState<LearnerCapstoneSubmissionRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [editing, setEditing] = useState<Record<string, Partial<{ status: string; score: string; reviewer_notes: string }>>>({})

  const load = useCallback(async () => {
    if (!isSupabaseConfigured()) return
    setLoading(true)
    setError(null)
    try {
      const supabase = getSupabaseBrowserClient()
      const data = await fetchAllCapstoneSubmissionsForAdmin(supabase)
      setRows(data)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to load')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load()
  }, [load])

  const applyReview = async (row: LearnerCapstoneSubmissionRow) => {
    if (!user) return
    const patch = editing[row.id]
    if (!patch?.status) return
    const scoreNum = patch.score !== undefined && patch.score !== '' ? Number(patch.score) : null
    if (patch.status === 'passed' && (scoreNum == null || Number.isNaN(scoreNum) || scoreNum < 75)) {
      setError('Passed requires numeric score ≥ 75.')
      return
    }
    setError(null)
    try {
      const supabase = getSupabaseBrowserClient()
      await adminUpdateCapstoneSubmission(supabase, row.id, {
        status: patch.status,
        score: scoreNum,
        reviewer_notes: patch.reviewer_notes ?? null,
        reviewed_by: user.id,
      })
      setEditing((m) => {
        const n = { ...m }
        delete n[row.id]
        return n
      })
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Update failed')
    }
  }

  const signedUrl = async (path: string | null) => {
    if (!path || !isSupabaseConfigured()) return
    const supabase = getSupabaseBrowserClient()
    const { data, error: e } = await supabase.storage.from('capstone_submissions').createSignedUrl(path, 3600)
    if (e || !data?.signedUrl) {
      setError(e?.message ?? 'Signed URL failed')
      return
    }
    window.open(data.signedUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 text-zinc-100">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Platform</p>
          <h1 className="mt-1 text-2xl font-semibold text-white">Capstone submissions</h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Review learner packages, record scores, and move statuses. Passing a capstone sets certificate eligibility and a two-year validity
            window (see database trigger).
          </p>
        </div>
        <Link to="/dashboard" className="text-sm font-medium text-violet-300 hover:text-violet-200">
          ← Dashboard
        </Link>
      </div>

      {error ? <p className="mt-6 text-sm text-rose-300">{error}</p> : null}

      {loading ? (
        <p className="mt-10 text-sm text-zinc-400">Loading…</p>
      ) : (
        <div className="mt-10 overflow-x-auto rounded-xl border border-white/[0.08]">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-zinc-950/80 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">
              <tr>
                <th className="px-3 py-2">Learner</th>
                <th className="px-3 py-2">Course</th>
                <th className="px-3 py-2">Submitted</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Score</th>
                <th className="px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const ed = editing[r.id] ?? {}
                return (
                  <tr key={r.id} className="border-t border-white/[0.06] align-top text-zinc-200">
                    <td className="px-3 py-3">
                      <div className="font-medium">{r.learner_id}</div>
                      <div className="text-xs text-zinc-500">{r.learner_email ?? '—'}</div>
                    </td>
                    <td className="px-3 py-3">
                      <div>{r.course_title ?? r.course_slug}</div>
                      <div className="text-xs text-zinc-500">{r.course_slug}</div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap text-xs text-zinc-400">{new Date(r.created_at).toLocaleString()}</td>
                    <td className="px-3 py-3">
                      <select
                        className="w-full rounded border border-white/[0.12] bg-zinc-900 px-2 py-1 text-xs"
                        value={ed.status ?? r.status}
                        onChange={(e) =>
                          setEditing((m) => ({ ...m, [r.id]: { ...ed, status: e.target.value } }))
                        }
                      >
                        {STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="number"
                        min={0}
                        max={100}
                        step={1}
                        className="w-20 rounded border border-white/[0.12] bg-zinc-900 px-2 py-1 text-xs"
                        placeholder="—"
                        value={ed.score !== undefined ? ed.score : r.score != null ? String(r.score) : ''}
                        onChange={(e) =>
                          setEditing((m) => ({ ...m, [r.id]: { ...ed, score: e.target.value } }))
                        }
                      />
                    </td>
                    <td className="px-3 py-3 space-y-2">
                      <button
                        type="button"
                        className="block text-xs font-semibold text-violet-300 hover:text-violet-200"
                        onClick={() => void signedUrl(r.file_url)}
                      >
                        Download file
                      </button>
                      <textarea
                        rows={2}
                        className="w-full rounded border border-white/[0.12] bg-zinc-900 px-2 py-1 text-xs"
                        placeholder="Reviewer notes"
                        value={ed.reviewer_notes ?? r.reviewer_notes ?? ''}
                        onChange={(e) =>
                          setEditing((m) => ({ ...m, [r.id]: { ...ed, reviewer_notes: e.target.value } }))
                        }
                      />
                      <p className="text-[10px] text-zinc-500">
                        Decl: {r.declaration_confirmed ? 'yes' : 'no'} · Consent: {r.consent_confirmed ? 'yes' : 'no'}
                      </p>
                      <button
                        type="button"
                        className="rounded-full bg-violet-600 px-3 py-1 text-xs font-semibold text-white hover:bg-violet-500"
                        onClick={() => void applyReview(r)}
                      >
                        Save review
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {rows.length === 0 ? <p className="px-3 py-6 text-center text-sm text-zinc-500">No submissions yet.</p> : null}
        </div>
      )}
    </div>
  )
}
