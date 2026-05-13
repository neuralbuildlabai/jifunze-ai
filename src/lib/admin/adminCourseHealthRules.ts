import type { AdminCourseInventoryRow } from './adminCourseInventory'

const FORBIDDEN_LEARNER_SUBSTRINGS = [
  /\brise\b/i,
  /\barticulate\b/i,
  /\bscorm\b/i,
  /\.zip\b/i,
  /\bpackage\s+filename\b/i,
  /\bdev[-\s]?only\b/i,
  /\btest[-\s]?only\b/i,
  /\binternal\s+pilot\b/i,
]

export function forbiddenLearnerFacingPatternsInText(text: string): string[] {
  const hits: string[] = []
  for (const re of FORBIDDEN_LEARNER_SUBSTRINGS) {
    if (re.test(text)) hits.push(re.source)
  }
  return hits
}

export function buildCourseHealthWarnings(row: AdminCourseInventoryRow, ctx?: { progressRowCount?: number }): string[] {
  const w: string[] = []
  if (!row.route || row.route.length < 2) w.push('Route hint missing or invalid.')
  if (row.kind === 'flagship' && !row.onPublicLearnerCatalog) {
    w.push('Flagship slug not on public /learn allowlist (may be intentional pre-release).')
  }
  if (ctx?.progressRowCount === 0) {
    w.push('No Supabase progress rows for this slug yet (learners may be local-only or not started).')
  }
  const scan = `${row.title} ${row.slug}`
  const bad = forbiddenLearnerFacingPatternsInText(scan)
  if (bad.length) w.push(`Review learner-facing copy for vendor/internal patterns (${bad.length} signal(s)).`)
  return w
}
