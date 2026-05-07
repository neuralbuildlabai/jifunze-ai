import { useMemo } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import {
  findStandaloneCourseBySlug,
  practicalMathematicsCourse,
  practicalMathCertificateEligible,
  practicalMathWeightedScorePercent,
  PRACTICAL_MATH_INTERNAL_KEY,
} from '../../data/courses'
import { usePracticalMathProgress } from '../../hooks/usePracticalMathProgress'
import { ensurePracticalMathCertificateMeta } from '../../lib/practicalMathCertificateStorage'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'

const LOCKED_COPY =
  'Complete all modules, pass with 75% or higher, and submit the capstone to unlock your certificate.' as const

export function StandaloneCertificatePage() {
  const { standaloneCourseSlug } = useParams<{ standaloneCourseSlug: string }>()
  const { user } = useAuth()
  const { progress } = usePracticalMathProgress()

  const entry = useMemo(
    () => (standaloneCourseSlug ? findStandaloneCourseBySlug(standaloneCourseSlug) : undefined),
    [standaloneCourseSlug],
  )

  if (!standaloneCourseSlug || !entry) {
    return <Navigate to="/learn" replace />
  }

  const isPracticalMath = entry.internalKey === PRACTICAL_MATH_INTERNAL_KEY
  if (!isPracticalMath) {
    return (
      <div className="jf-learn-warm min-h-screen bg-[var(--jf-bg-page)] px-4 py-12 text-[color:var(--jf-text)]">
        <div className="mx-auto max-w-lg rounded-2xl border border-stone-200 bg-white p-8 text-center shadow-sm">
          <p className="text-[15px] text-stone-700">A printable certificate is not yet available for this course.</p>
          <Link to={`/learn/${entry.slug}`} className="mt-6 inline-block text-sm font-semibold text-orange-700 hover:underline">
            Back to course
          </Link>
        </div>
      </div>
    )
  }

  const eligible = practicalMathCertificateEligible(practicalMathematicsCourse, progress)
  const scorePct = practicalMathWeightedScorePercent(practicalMathematicsCourse, progress)

  const learnerName =
    (user?.user_metadata?.full_name as string | undefined)?.trim() ||
    user?.email?.split('@')[0]?.trim() ||
    'Learner'

  const coursePath = `/learn/${entry.slug}`

  if (!eligible) {
    return (
      <div
        className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6"
        data-testid="standalone-certificate-locked"
      >
        <div className="mx-auto max-w-xl space-y-8">
          <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-6">
            <JifunzeBrandLogo to="/" size="sm" variant="compact" />
            <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
              <Link className="text-xs font-medium text-[color:var(--jf-brand)] hover:text-[color:var(--jf-brand-hover)]" to="/learn">
                Catalog
              </Link>
              <Link className="text-xs font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to={coursePath}>
                Course overview
              </Link>
              <SignedInPublicLearningActions />
            </div>
          </header>
          <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
            <h1 className="text-2xl font-semibold text-zinc-900">Certificate of Completion</h1>
            <p className="mt-4 text-[15px] leading-relaxed text-stone-700">{LOCKED_COPY}</p>
            <p className="mt-4 text-[13px] text-stone-500">
              You need all 16 modules complete (lessons studied and module quizzes passed at 75% or higher), an overall quiz
              score of 75% or higher, and the Module 16 capstone marked complete on the capstone module page.
            </p>
            <Link to={coursePath} className="mt-8 inline-flex text-sm font-semibold text-orange-700 hover:underline">
              ← Back to course
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const certMeta = ensurePracticalMathCertificateMeta()
  const completionDate = new Date(certMeta.earnedAtIso).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const displayScore = scorePct !== null ? `${scorePct.toFixed(1)}%` : '—'
  const certificateId = certMeta.certificateId

  return (
    <div className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-10 text-[color:var(--jf-text)] sm:px-6 print:bg-white print:py-6">
      <div className="screen-only mx-auto mb-8 flex max-w-3xl flex-wrap items-center justify-between gap-4 border-b border-[color:var(--jf-border)] pb-6">
        <JifunzeBrandLogo to="/" size="sm" variant="compact" />
        <div className="flex flex-wrap items-center gap-3">
          <Link className="text-xs font-medium text-orange-700 hover:underline" to={coursePath}>
            Course overview
          </Link>
          <SignedInPublicLearningActions />
        </div>
      </div>

      <div className="screen-only mx-auto mb-6 max-w-3xl flex flex-wrap gap-3 print:hidden">
        <button
          type="button"
          className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-gradient-to-r from-orange-600 to-red-600 px-6 text-sm font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105"
          data-testid="standalone-certificate-print"
          onClick={() => window.print()}
        >
          Print certificate
        </button>
        <Link to={coursePath} className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-stone-300 bg-white px-5 text-sm font-semibold text-zinc-800">
          Back to course
        </Link>
      </div>

      <div
        className="certificate-print-root mx-auto max-w-3xl rounded-2xl border-2 border-orange-200/80 bg-white p-10 shadow-lg print:border-0 print:shadow-none print:max-w-none"
        data-testid="standalone-certificate-printable"
      >
        <div className="flex flex-col items-center border-b border-orange-100 pb-6 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-orange-700">Jifunze.ai</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-900 print:text-4xl">Certificate of Completion</h1>
          <p className="mt-2 text-[15px] text-stone-600">This certifies that</p>
          <p className="mt-3 text-2xl font-semibold text-zinc-900 print:text-3xl">{learnerName}</p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-stone-700">
            has successfully completed{' '}
            <span className="font-semibold text-zinc-900">Practical Mathematics for Life, Work, and Business</span>
          </p>
        </div>
        <dl className="mt-8 grid gap-4 text-[14px] sm:grid-cols-2">
          <div className="rounded-xl border border-stone-100 bg-stone-50/80 p-4">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Completion date</dt>
            <dd className="mt-1 font-medium text-zinc-900">{completionDate}</dd>
          </div>
          <div className="rounded-xl border border-stone-100 bg-stone-50/80 p-4">
            <dt className="text-[11px] font-semibold uppercase tracking-wide text-stone-500">Final score / pass status</dt>
            <dd className="mt-1 font-medium text-zinc-900">
              {displayScore} · <span className="text-emerald-700">Passed (75% or higher)</span>
            </dd>
          </div>
        </dl>
        {certificateId ? (
          <p className="mt-8 text-center text-[12px] text-stone-500">
            Certificate ID: <span className="font-mono text-stone-700">{certificateId}</span>
          </p>
        ) : null}
        <p className="mt-6 text-center text-[12px] leading-relaxed text-stone-500">
          Issued by Jifunze.ai · Educational completion · Not a professional license or credential.
        </p>
      </div>

      <style>{`
        @media print {
          .screen-only { display: none !important; }
          .certificate-print-root { page-break-inside: avoid; }
        }
      `}</style>
    </div>
  )
}
