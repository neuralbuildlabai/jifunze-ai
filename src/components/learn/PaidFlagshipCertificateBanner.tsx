import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import type { User } from '@supabase/supabase-js'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { FlagshipCourseCurriculum } from '../../data/learning/flagshipCourseCurricula'
import type { FlagshipSession } from '../../data/learning/flagshipCourseSessions'
import { getLearnerCertificateEligibility } from '../../lib/getLearnerCertificateEligibility'
import { getPaidFlagshipCertificateConfig, type PaidFlagshipCertificateCourseConfig } from '../../lib/paidFlagshipCertificateConfig'
import type { FlagshipCourseProgressState } from '../../lib/flagshipCourseProgressDerived'

function InnerPaidFlagshipCertificateBanner(props: {
  cfg: PaidFlagshipCertificateCourseConfig
  courseSlug: string
  curriculum: FlagshipCourseCurriculum
  sessions: FlagshipSession[]
  progressState: FlagshipCourseProgressState
  user: User
  supabase: SupabaseClient
}) {
  const { cfg, courseSlug, curriculum, sessions, progressState, user, supabase } = props
  const [msg, setMsg] = useState<string | null>(null)
  const [eligibleDetail, setEligibleDetail] = useState<{
    issued: string | null
    until: string | null
  } | null>(null)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        const r = await getLearnerCertificateEligibility(supabase, courseSlug, user.id, curriculum, sessions, progressState)
        if (cancelled) return
        if (r.eligible) {
          setMsg(null)
          setEligibleDetail({ issued: r.certificateIssuedAt, until: r.certificateValidUntil })
        } else {
          setEligibleDetail(null)
          setMsg(
            r.blockers[0] ??
              'Certificate locked. Complete all required modules, pass required checks, submit the capstone, and pass the capstone review.',
          )
        }
      } catch {
        if (!cancelled) setMsg('Unable to load certificate status yet.')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [courseSlug, curriculum, sessions, progressState, user, supabase])

  return (
    <section
      className="mt-8 rounded-2xl border border-orange-100/80 bg-[#fffdfb] px-5 py-5 text-[color:var(--jf-text)] shadow-sm"
      data-testid="paid-flagship-certificate-banner"
    >
      <h2 className="text-sm font-semibold text-orange-950">Certificate of completion</h2>
      {eligibleDetail?.issued ? (
        <div className="mt-2 space-y-1 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
          <p>
            Issued by <span className="font-medium text-[color:var(--jf-text)]">{cfg.provider}</span>
            {eligibleDetail.issued ? (
              <>
                {' '}
                on {new Date(eligibleDetail.issued).toLocaleDateString()}
              </>
            ) : null}
            .
          </p>
          {eligibleDetail.until ? (
            <p>Valid until {new Date(eligibleDetail.until).toLocaleDateString()} (two years from issue).</p>
          ) : null}
        </div>
      ) : (
        <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
          {msg ??
            'Certificate locked. Complete all required modules, pass required checks, submit the capstone, and pass the capstone review.'}
        </p>
      )}
      {cfg.capstoneSubmissionEnabled ? (
        <div className="mt-4">
          <Link
            to={`/learn/courses/${courseSlug}/capstone`}
            className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full bg-orange-600 px-5 text-sm font-semibold text-white hover:bg-orange-500"
          >
            Submit Final Capstone
          </Link>
        </div>
      ) : null}
    </section>
  )
}

export function PaidFlagshipCertificateBanner(props: {
  courseSlug: string
  curriculum: FlagshipCourseCurriculum
  sessions: FlagshipSession[]
  progressState: FlagshipCourseProgressState
  user: User | null
  supabase: SupabaseClient | null
}) {
  const { courseSlug, curriculum, sessions, progressState, user, supabase } = props
  const cfg = getPaidFlagshipCertificateConfig(courseSlug)
  if (!cfg) return null

  if (!user || !supabase) {
    return (
      <section
        className="mt-8 rounded-2xl border border-orange-100/80 bg-[#fffdfb] px-5 py-5 text-[color:var(--jf-text)] shadow-sm"
        data-testid="paid-flagship-certificate-banner"
      >
        <h2 className="text-sm font-semibold text-orange-950">Certificate of completion</h2>
        <p className="mt-2 text-[14px] text-[color:var(--jf-muted)]">Sign in to track certificate eligibility and open the capstone submission.</p>
        {cfg.capstoneSubmissionEnabled ? (
          <div className="mt-4">
            <Link
              to={`/auth/sign-in?redirect=/learn/courses/${courseSlug}/capstone`}
              className="inline-flex min-h-[2.5rem] items-center justify-center rounded-full border border-orange-200 px-5 text-sm font-semibold text-orange-900 hover:bg-orange-50"
            >
              Sign in to continue
            </Link>
          </div>
        ) : null}
      </section>
    )
  }

  return (
    <InnerPaidFlagshipCertificateBanner
      cfg={cfg}
      courseSlug={courseSlug}
      curriculum={curriculum}
      sessions={sessions}
      progressState={progressState}
      user={user}
      supabase={supabase}
    />
  )
}
