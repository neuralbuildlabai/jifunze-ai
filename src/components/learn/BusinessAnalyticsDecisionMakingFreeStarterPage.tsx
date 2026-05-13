import { useCallback, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { BUSINESS_ANALYTICS_DECISION_MAKING_FREE_STARTER } from '../../data/learning/freeStarterRiseCoursesCatalog'
import {
  BUSINESS_ANALYTICS_MICROLEARNING_HERO_DESCRIPTION,
  BUSINESS_ANALYTICS_MICROLEARNING_LESSON_FLOW,
  BUSINESS_ANALYTICS_MICROLEARNING_METADATA_ROW,
  BUSINESS_ANALYTICS_MICROLEARNING_OUTCOMES,
} from '../../data/learning/businessAnalyticsMicrolearningPageCopy'
import {
  getLearnerResumeTarget,
  LEARNER_PROGRESS_HUB_EVENT,
  markFreeStarterCourseComplete,
  migrateLocalInteractiveStartersToSupabase,
  saveLearnerCourseActivity,
} from '../../lib/learnerProgressHub'
import { isRisePilotCourseLearnerComplete, markRisePilotCourseSessionStarted } from '../../lib/risePilotCourseProgress'
import { PRACTICAL_MATH_PROGRESS_EVENT } from '../../lib/practicalMathProgressStorage'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { FreeStarterMicrocourseTemplate, type FreeStarterFlowStep } from './FreeStarterMicrocourseTemplate'

const course = BUSINESS_ANALYTICS_DECISION_MAKING_FREE_STARTER

const flowSteps: readonly FreeStarterFlowStep[] = BUSINESS_ANALYTICS_MICROLEARNING_LESSON_FLOW.map((label, i) => ({
  id: `flow-${i + 1}`,
  label,
}))

export function BusinessAnalyticsDecisionMakingFreeStarterPage() {
  const { user, supabase } = useAuth()
  const location = useLocation()
  const [resume, setResume] = useState({ href: `${course.publicRoute}#course-player`, cta: 'Start course' })
  const [complete, setComplete] = useState(() => isRisePilotCourseLearnerComplete(course.progressInternalKey))

  useEffect(() => {
    markRisePilotCourseSessionStarted(course.progressInternalKey, course.progressSessionStartedMarker)
  }, [])

  const refreshResume = useCallback(async () => {
    const t = await getLearnerResumeTarget(supabase ?? null, user?.id, course.slug)
    setResume({ href: t.href, cta: t.cta })
  }, [user?.id, supabase])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      if (!user?.id || !supabase || !isSupabaseConfigured()) {
        const t = await getLearnerResumeTarget(null, undefined, course.slug)
        if (!cancelled) setResume({ href: t.href, cta: t.cta })
        return
      }
      await migrateLocalInteractiveStartersToSupabase(supabase, user.id)
      await saveLearnerCourseActivity(supabase, user.id, course.slug, { markOpened: true })
      const t = await getLearnerResumeTarget(supabase, user.id, course.slug)
      if (!cancelled) setResume({ href: t.href, cta: t.cta })
    })()
    return () => {
      cancelled = true
    }
  }, [user, supabase])

  useEffect(() => {
    const sync = () => {
      setComplete(isRisePilotCourseLearnerComplete(course.progressInternalKey))
      void refreshResume()
    }
    window.addEventListener(PRACTICAL_MATH_PROGRESS_EVENT, sync)
    window.addEventListener(LEARNER_PROGRESS_HUB_EVENT, sync as EventListener)
    return () => {
      window.removeEventListener(PRACTICAL_MATH_PROGRESS_EVENT, sync)
      window.removeEventListener(LEARNER_PROGRESS_HUB_EVENT, sync as EventListener)
    }
  }, [refreshResume])

  useEffect(() => {
    const hash = location.hash.replace(/^#/, '')
    if (!hash) return
    window.requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }, [location.hash])

  const onFlowStepOpen = useCallback(
    (stepId: string) => {
      if (!user?.id || !supabase || !isSupabaseConfigured()) return
      void saveLearnerCourseActivity(supabase, user.id, course.slug, { daySlug: stepId, markOpened: true })
    },
    [user, supabase],
  )

  const onMarkComplete = useCallback(async () => {
    await markFreeStarterCourseComplete(supabase ?? null, user?.id, course.slug)
    setComplete(true)
    await refreshResume()
  }, [user?.id, supabase, refreshResume])

  return (
    <FreeStarterMicrocourseTemplate
      pageTestId="free-starter-business-analytics-decision-making-page"
      course={course}
      heroDescription={BUSINESS_ANALYTICS_MICROLEARNING_HERO_DESCRIPTION}
      metadataRow={BUSINESS_ANALYTICS_MICROLEARNING_METADATA_ROW}
      practiceBullets={BUSINESS_ANALYTICS_MICROLEARNING_OUTCOMES}
      flowHeading="Course outline"
      flowSteps={flowSteps}
      onFlowStepOpen={onFlowStepOpen}
      resume={resume}
      embedHeading="Begin the course"
      iframeTitle="Business Analytics for Decision-Making — interactive course"
      newWindowTestId="free-starter-business-analytics-open-tab"
      complete={complete}
      onMarkComplete={onMarkComplete}
      primaryCtaTestId="free-starter-business-analytics-start"
    />
  )
}
