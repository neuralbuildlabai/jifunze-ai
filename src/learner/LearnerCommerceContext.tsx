/* eslint-disable react-refresh/only-export-components -- context module exports companion hooks */
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { FLAGSHIP_PURCHASE_GATE_ENABLED, LEARNER_MONETIZATION_UI_DISABLED } from '@/learner/learnerCommerceConstants'
import type { FirstCourseDiscountState, LearnerEntitlement, PendingLearnerRedirect } from '@/learner/learnerEntitlementTypes'
import {
  readOrCreateDeviceId,
  readPendingRedirect,
  readStoredDiscount,
  readStoredEntitlement,
  writePendingRedirect,
  writeStoredDiscount,
  writeStoredEntitlement,
} from '@/learner/learnerEntitlementStorage'
import { removeOtherDeviceSessions, registerActiveDevice } from '@/learner/deviceSessionPolicy'

type LearnerCommerceContextValue = {
  purchaseGateEnabled: boolean
  entitlement: LearnerEntitlement
  discount: FirstCourseDiscountState
  setEntitlement: (next: LearnerEntitlement) => void
  grantSingleCourse: (courseSlug: string) => void
  grantAllAccess: () => void
  clearEntitlementForDev: () => void
  recordReadinessPass: (courseSlug: string) => void
  consumeFirstCourseDiscount: () => void
  hasCourseAccess: (courseSlug: string) => boolean
  /** After checkout */
  queuePostPaymentRedirect: (next: PendingLearnerRedirect) => void
  deviceLimitExceeded: boolean
  dismissDeviceLimitUi: () => void
  resolveDeviceLimitKeepThisDevice: () => void
}

const LearnerCommerceContext = createContext<LearnerCommerceContextValue | null>(null)

function PendingRedirectRunner() {
  const navigate = useNavigate()
  useEffect(() => {
    const pending = readPendingRedirect()
    if (!pending) return
    writePendingRedirect(null)
    if (pending.kind === 'course') {
      navigate(`/learn/courses/${pending.courseSlug}`, { replace: true })
    } else if (pending.kind === 'catalog') {
      navigate('/learn', { replace: true })
    }
  }, [navigate])
  return null
}

export function LearnerCommerceProvider({ children }: { children: ReactNode }) {
  const [entitlement, setEntitlementState] = useState<LearnerEntitlement>(() =>
    typeof window === 'undefined' ? { mode: 'none' } : readStoredEntitlement(),
  )
  const [discount, setDiscountState] = useState<FirstCourseDiscountState>(() =>
    typeof window === 'undefined'
      ? { eligible: false, consumed: false }
      : readStoredDiscount(),
  )
  const [deviceLimitExceeded, setDeviceLimitExceeded] = useState(() =>
    typeof window === 'undefined' ? false : !registerActiveDevice().ok,
  )

  const setEntitlement = useCallback((next: LearnerEntitlement) => {
    setEntitlementState(next)
    writeStoredEntitlement(next)
  }, [])

  const grantSingleCourse = useCallback((courseSlug: string) => {
    const next: LearnerEntitlement = { mode: 'single', courseSlug }
    setEntitlement(next)
  }, [setEntitlement])

  const grantAllAccess = useCallback(() => {
    setEntitlement({ mode: 'all_access' })
  }, [setEntitlement])

  const clearEntitlementForDev = useCallback(() => {
    setEntitlement({ mode: 'none' })
  }, [setEntitlement])

  const recordReadinessPass = useCallback(
    (courseSlug: string) => {
      const cur = readStoredDiscount()
      if (cur.consumed) return
      const next: FirstCourseDiscountState = { eligible: true, consumed: false, courseSlug }
      setDiscountState(next)
      writeStoredDiscount(next)
    },
    [],
  )

  const consumeFirstCourseDiscount = useCallback(() => {
    const cur = readStoredDiscount()
    if (!cur.eligible || cur.consumed) return
    const next: FirstCourseDiscountState = { ...cur, consumed: true, eligible: false }
    setDiscountState(next)
    writeStoredDiscount(next)
  }, [])

  const hasCourseAccess = useCallback(
    (courseSlug: string) => {
      if (LEARNER_MONETIZATION_UI_DISABLED || !FLAGSHIP_PURCHASE_GATE_ENABLED) return true
      if (entitlement.mode === 'all_access') return true
      if (entitlement.mode === 'single' && entitlement.courseSlug === courseSlug) return true
      return false
    },
    [entitlement],
  )

  const queuePostPaymentRedirect = useCallback((next: PendingLearnerRedirect) => {
    writePendingRedirect(next)
  }, [])

  const dismissDeviceLimitUi = useCallback(() => {
    setDeviceLimitExceeded(false)
  }, [])

  const resolveDeviceLimitKeepThisDevice = useCallback(() => {
    const id = readOrCreateDeviceId()
    removeOtherDeviceSessions(id)
    const r = registerActiveDevice()
    setDeviceLimitExceeded(!r.ok)
  }, [])

  const value = useMemo<LearnerCommerceContextValue>(
    () => ({
      purchaseGateEnabled: LEARNER_MONETIZATION_UI_DISABLED ? false : FLAGSHIP_PURCHASE_GATE_ENABLED,
      entitlement,
      discount,
      setEntitlement,
      grantSingleCourse,
      grantAllAccess,
      clearEntitlementForDev,
      recordReadinessPass,
      consumeFirstCourseDiscount,
      hasCourseAccess,
      queuePostPaymentRedirect,
      deviceLimitExceeded,
      dismissDeviceLimitUi,
      resolveDeviceLimitKeepThisDevice,
    }),
    [
      entitlement,
      discount,
      setEntitlement,
      grantSingleCourse,
      grantAllAccess,
      clearEntitlementForDev,
      recordReadinessPass,
      consumeFirstCourseDiscount,
      hasCourseAccess,
      queuePostPaymentRedirect,
      deviceLimitExceeded,
      dismissDeviceLimitUi,
      resolveDeviceLimitKeepThisDevice,
    ],
  )

  return (
    <LearnerCommerceContext.Provider value={value}>
      <PendingRedirectRunner />
      {children}
    </LearnerCommerceContext.Provider>
  )
}

export function useLearnerCommerce(): LearnerCommerceContextValue {
  const ctx = useContext(LearnerCommerceContext)
  if (!ctx) throw new Error('useLearnerCommerce requires LearnerCommerceProvider')
  return ctx
}

/** Optional hook for surfaces outside commerce (never throws). */
export function useLearnerCommerceOptional(): LearnerCommerceContextValue | null {
  return useContext(LearnerCommerceContext)
}
