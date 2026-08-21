import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { getFlagshipCourseBySlug } from '../../data/learning/flagshipCoursesCatalog'
import { getSupabaseBrowserClient } from '../../lib/supabaseClient'
import { MODULE_QUIZ_DRAW_COUNT } from '../../lib/flagshipModuleQuizPools'
import { getPaidFlagshipCertificateConfig, JIFUNZE_LEARNING_HUB_ISSUER } from '../../lib/paidFlagshipCertificateConfig'
import { insertCapstoneSubmission } from '../../services/learnerState/learnerCapstoneSubmissionsRemote'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'

const ACCEPT = {
  'application/pdf': '.pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': '.pptx',
  'application/zip': '.zip',
} as const

function safeFileBase(name: string): string {
  return name.replace(/[^\w.-]+/g, '_').slice(0, 180) || 'capstone-upload'
}

const CHECKLIST = [
  'Scenario description',
  'AI productivity system overview',
  'Selected artifacts',
  'Prompt library sample',
  'Workflow or process map',
  'Risk and privacy checklist',
  'Human-review notes',
  'Final reflection',
]

export function FlagshipCapstoneSubmissionPage() {
  const { slug: courseSlug } = useParams<{ slug: string }>()
  const { user } = useAuth()
  const [file, setFile] = useState<File | null>(null)
  const [reflection, setReflection] = useState('')
  const [declaration, setDeclaration] = useState(false)
  const [consent, setConsent] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState(false)

  const course = courseSlug ? getFlagshipCourseBySlug(courseSlug) : undefined
  const cfg = courseSlug ? getPaidFlagshipCertificateConfig(courseSlug) : undefined

  const canUse = Boolean(cfg?.capstoneSubmissionEnabled && course && courseSlug)

  const readyToSubmit = useMemo(() => {
    if (!file || !reflection.trim() || !declaration || !consent) return false
    const mime = file.type as keyof typeof ACCEPT
    return Boolean(ACCEPT[mime])
  }, [file, reflection, declaration, consent])

  if (!courseSlug || !course) {
    return <Navigate to={LEGAL_ROUTES.learn} replace />
  }

  if (!canUse) {
    return (
      <div className="jf-learn-warm min-h-screen bg-[var(--jf-bg-page)] px-5 py-16 text-[color:var(--jf-text)]">
        <p className="mx-auto max-w-lg text-center">Capstone submission is not enabled for this course.</p>
        <div className="mt-8 text-center">
          <Link className="text-orange-700 underline" to={`/learn/courses/${courseSlug}`}>
            Back to course
          </Link>
        </div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to={`/auth/sign-in?redirect=/learn/courses/${courseSlug}/capstone`} replace />
  }

  if (!isSupabaseConfigured()) {
    return (
      <div className="jf-learn-warm min-h-screen bg-[var(--jf-bg-page)] px-5 py-16 text-[color:var(--jf-text)]">
        <p className="mx-auto max-w-lg text-center">Sign-in and cloud features are required to submit your capstone.</p>
      </div>
    )
  }

  const onSubmit = async () => {
    if (!readyToSubmit || !file || !courseSlug || busy) return
    setBusy(true)
    setError(null)
    try {
      const supabase = getSupabaseBrowserClient()
      const ts = Date.now()
      const base = safeFileBase(file.name)
      const objectPath = `capstones/${courseSlug}/${user.id}/${ts}-${base}`

      const { error: upErr } = await supabase.storage.from('capstone_submissions').upload(objectPath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type || 'application/octet-stream',
      })
      if (upErr) throw upErr

      await insertCapstoneSubmission(supabase, {
        learner_id: user.id,
        learner_email: user.email ?? null,
        course_slug: courseSlug,
        course_title: course.title,
        submission_type: 'capstone',
        file_url: objectPath,
        file_name: file.name,
        file_type: file.type || null,
        file_size: file.size,
        reflection: reflection.trim(),
        declaration_confirmed: declaration,
        consent_confirmed: consent,
      })
      setDone(true)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Upload failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="jf-learn-warm min-h-screen bg-[var(--jf-bg-page)] text-[color:var(--jf-text)]" data-testid="flagship-capstone-submit-page">
      <header className="border-b border-[color:var(--jf-border)] px-5 py-4 sm:px-8">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3">
          <Link to={`/learn/courses/${courseSlug}`} className="text-sm font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]">
            ← Back to course
          </Link>
          <JifunzeBrandLogo to="/" size="sm" surface="light" />
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-10 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-orange-800">Final capstone</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">Submit Final Capstone</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
          Upload your portfolio for staff review. Your certificate is not issued automatically—it unlocks only after review and a passing score.
        </p>

        {cfg ? (
          <section className="mt-8 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] p-6" aria-labelledby="cap-completion-req">
            <h2 id="cap-completion-req" className="text-sm font-semibold text-[color:var(--jf-text)]">
              Completion requirements
            </h2>
            <ul className="mt-3 space-y-2 text-[14px] leading-snug text-[color:var(--jf-muted)]">
              <li>· Complete the course learning sections</li>
              <li>
                · Pass required checks: {cfg.moduleQuizMinCorrect} of {MODULE_QUIZ_DRAW_COUNT} correct
              </li>
              <li>· Submit the final capstone</li>
              <li>· Pass capstone review: {cfg.capstonePassScore}% or higher</li>
            </ul>
            <p className="mt-4 text-[12px] leading-relaxed text-[color:var(--jf-subtle)]">
              Certificates are issued by {JIFUNZE_LEARNING_HUB_ISSUER} and are valid for {cfg.certificateValidityYears} years from the issue date.
            </p>
          </section>
        ) : null}

        <section className="mt-8 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6">
          <h2 className="text-sm font-semibold text-[color:var(--jf-text)]">Include in your package</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-[14px] text-[color:var(--jf-muted)]">
            {CHECKLIST.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        </section>

        {done ? (
          <p className="mt-10 rounded-xl border border-emerald-200/80 bg-emerald-50/90 p-4 text-[14px] leading-relaxed text-emerald-950" role="status">
            Your capstone has been submitted for review. Your certificate is not issued automatically. {JIFUNZE_LEARNING_HUB_ISSUER} will review
            your submission against the capstone requirements. If your capstone meets the requirements, your certificate eligibility will be
            updated.
          </p>
        ) : (
          <form
            className="mt-10 space-y-8"
            onSubmit={(e) => {
              e.preventDefault()
              void onSubmit()
            }}
          >
            <div>
              <label className="block text-sm font-semibold text-[color:var(--jf-text)]">Capstone file</label>
              <p className="mt-1 text-[13px] text-[color:var(--jf-muted)]">PDF, DOCX, PPTX, or ZIP (max practical size for your network).</p>
              <input
                type="file"
                accept={Object.keys(ACCEPT).join(',')}
                className="mt-3 block w-full text-sm"
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              />
            </div>

            <div>
              <label htmlFor="cap-reflection" className="block text-sm font-semibold text-[color:var(--jf-text)]">
                Reflection
              </label>
              <textarea
                id="cap-reflection"
                required
                rows={6}
                value={reflection}
                onChange={(e) => setReflection(e.target.value)}
                className="mt-2 w-full rounded-xl border border-[color:var(--jf-border)] bg-white px-3 py-2 text-sm"
                placeholder="Summarize what you built, how you used AI as support, and what you verified before submission."
              />
            </div>

            <label className="flex cursor-pointer gap-3 text-[14px] text-[color:var(--jf-muted)]">
              <input type="checkbox" checked={declaration} onChange={(e) => setDeclaration(e.target.checked)} className="mt-1" />
              <span>
                I confirm this submission is my own work, AI was used only as support, and I reviewed the final output for accuracy, privacy, and
                responsible use.
              </span>
            </label>

            <label className="flex cursor-pointer gap-3 text-[14px] text-[color:var(--jf-muted)]">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" />
              <span>
                I understand that my capstone must be reviewed and passed before the certificate of completion is issued.
              </span>
            </label>

            {error ? <p className="text-sm text-rose-700">{error}</p> : null}

            <button
              type="submit"
              disabled={!readyToSubmit || busy}
              className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-orange-600 px-8 text-sm font-semibold text-white shadow-md disabled:cursor-not-allowed disabled:opacity-40"
            >
              {busy ? 'Submitting…' : 'Submit Final Capstone'}
            </button>
          </form>
        )}
      </main>
    </div>
  )
}
