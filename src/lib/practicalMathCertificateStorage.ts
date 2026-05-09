import { PRACTICAL_MATH_INTERNAL_KEY } from '../data/courses/practicalMathematicsCourseConstants'

const CERT_ROOT_KEY = 'jifunze.standalone.certificate_meta.v1' as const

/** @deprecated Use CERT_ROOT_KEY — kept for one-off migrations if needed */
const LEGACY_PRACTICAL_MATH_CERT_KEY = 'jifunze.practical_math.certificate_meta.v1' as const

export type PracticalMathCertificateMeta = {
  certificateId: string
  earnedAtIso: string
}

type CertificateRootV1 = {
  v: 1
  byCourse: Record<string, PracticalMathCertificateMeta>
}

function randomId(prefix: string): string {
  const slice =
    typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID().slice(0, 8) : `${Date.now().toString(36)}`
  return `${prefix}-${slice}`
}

function readRoot(): CertificateRootV1 | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CERT_ROOT_KEY)
    if (!raw) return null
    const o = JSON.parse(raw) as Partial<CertificateRootV1>
    if (o?.v === 1 && o.byCourse && typeof o.byCourse === 'object') return o as CertificateRootV1
  } catch {
    /* ignore */
  }
  return null
}

function writeRoot(root: CertificateRootV1): void {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(CERT_ROOT_KEY, JSON.stringify(root))
}

function migrateLegacyPracticalMathIfNeeded(courseInternalKey: string): void {
  if (typeof window === 'undefined' || courseInternalKey !== PRACTICAL_MATH_INTERNAL_KEY) return
  try {
    const raw = window.localStorage.getItem(LEGACY_PRACTICAL_MATH_CERT_KEY)
    if (!raw) return
    const o = JSON.parse(raw) as Partial<PracticalMathCertificateMeta>
    if (!o?.certificateId || !o?.earnedAtIso) return
    const root = readRoot() ?? { v: 1, byCourse: {} }
    if (root.byCourse[courseInternalKey]) return
    root.byCourse[courseInternalKey] = { certificateId: o.certificateId, earnedAtIso: o.earnedAtIso }
    writeRoot(root)
  } catch {
    /* ignore */
  }
}

export function readStandaloneCertificateMeta(
  courseInternalKey: string,
): PracticalMathCertificateMeta | null {
  if (typeof window === 'undefined') return null
  migrateLegacyPracticalMathIfNeeded(courseInternalKey)
  const root = readRoot()
  const hit = root?.byCourse[courseInternalKey]
  if (hit?.certificateId && hit?.earnedAtIso) return hit
  return null
}

export function ensureStandaloneCertificateMeta(
  courseInternalKey: string,
  idPrefix: string,
): PracticalMathCertificateMeta {
  const existing = readStandaloneCertificateMeta(courseInternalKey)
  if (existing) return existing
  const next: PracticalMathCertificateMeta = {
    certificateId: randomId(idPrefix),
    earnedAtIso: new Date().toISOString(),
  }
  if (typeof window !== 'undefined') {
    const root = readRoot() ?? { v: 1, byCourse: {} }
    root.byCourse[courseInternalKey] = next
    writeRoot(root)
  }
  return next
}

/** @deprecated Use readStandaloneCertificateMeta */
export function readPracticalMathCertificateMeta(): PracticalMathCertificateMeta | null {
  return readStandaloneCertificateMeta(PRACTICAL_MATH_INTERNAL_KEY)
}

/** @deprecated Use ensureStandaloneCertificateMeta */
export function ensurePracticalMathCertificateMeta(): PracticalMathCertificateMeta {
  return ensureStandaloneCertificateMeta(PRACTICAL_MATH_INTERNAL_KEY, 'PM')
}
