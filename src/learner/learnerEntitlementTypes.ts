export type LearnerEntitlement =
  | { mode: 'none' }
  | { mode: 'single'; courseSlug: string }
  | { mode: 'all_access' }

export type FirstCourseDiscountState = {
  /** One-time 5% off first single-course checkout after passing readiness challenge */
  eligible: boolean
  consumed: boolean
  /** Course slug the challenge was taken for */
  courseSlug?: string
}

export type PendingLearnerRedirect =
  | { kind: 'course'; courseSlug: string }
  | { kind: 'catalog' }
  | null
