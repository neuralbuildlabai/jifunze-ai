const CERT_KEY = 'jifunze.practical_math.certificate_meta.v1' as const

export type PracticalMathCertificateMeta = {
  certificateId: string
  earnedAtIso: string
}

function randomId(): string {
  const slice = typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID().slice(0, 8) : `${Date.now().toString(36)}`
  return `PM-${slice}`
}

export function readPracticalMathCertificateMeta(): PracticalMathCertificateMeta | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(CERT_KEY)
    if (!raw) return null
    const o = JSON.parse(raw) as Partial<PracticalMathCertificateMeta>
    if (o?.certificateId && o?.earnedAtIso) return { certificateId: o.certificateId, earnedAtIso: o.earnedAtIso }
  } catch {
    /* ignore */
  }
  return null
}

/** Persists a stable certificate id the first time the learner qualifies (used on the printable certificate). */
export function ensurePracticalMathCertificateMeta(): PracticalMathCertificateMeta {
  const existing = readPracticalMathCertificateMeta()
  if (existing) return existing
  const next: PracticalMathCertificateMeta = {
    certificateId: randomId(),
    earnedAtIso: new Date().toISOString(),
  }
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CERT_KEY, JSON.stringify(next))
  }
  return next
}
