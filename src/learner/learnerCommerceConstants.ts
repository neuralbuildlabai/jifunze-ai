/** When false, flagship courses remain openly navigable (dev / CI / preview). Set `VITE_FLAGSHIP_PURCHASE_GATE=true` for purchase gates. */
export const FLAGSHIP_PURCHASE_GATE_ENABLED = import.meta.env.VITE_FLAGSHIP_PURCHASE_GATE === 'true'

export const LEARNER_ENTITLEMENT_STORAGE_KEY = 'jifunze.learner.entitlement.v1'
export const LEARNER_FIRST_COURSE_DISCOUNT_STORAGE_KEY = 'jifunze.learner.firstCourseDiscount.v1'
export const LEARNER_PENDING_REDIRECT_STORAGE_KEY = 'jifunze.learner.pendingRedirect.v1'
export const DEVICE_SESSIONS_STORAGE_KEY = 'jifunze.learner.deviceSessions.v1'
export const DEVICE_ID_STORAGE_KEY = 'jifunze.learner.deviceId.v1'

/** Max simultaneous browser registrations (demo / client policy). */
export const MAX_ACTIVE_DEVICE_SESSIONS = 2
