import { buildAdminCourseInventoryRows, type AdminCourseInventoryRow } from './adminCourseInventory'
import { buildCourseHealthWarnings } from './adminCourseHealthRules'
import { getPaidFlagshipCertificateConfig, paidFlagshipCourseSlugs } from '../paidFlagshipCertificateConfig'
import type { AdminHealthCheck, AdminHealthStatus } from './adminEnv'

/** Static `/learn/free/...` paths from `App.tsx` — keep in sync when adding free starters. */
const REGISTERED_FREE_STARTER_PATHS = [
  '/learn/free/ai-at-work-chatgpt',
  '/learn/free/smart-workflows-with-ai',
  '/learn/free/business-analytics-decision-making',
  '/learn/free/5-day-mental-wellbeing-reset',
] as const

function expectedFlagshipRoute(slug: string): string {
  return `/learn/courses/${slug}`
}

function expectedStandaloneRoute(slug: string): string {
  return `/learn/${slug}`
}

function routeMatchesInventory(row: AdminCourseInventoryRow): { ok: boolean; detail: string } {
  if (row.kind === 'flagship') {
    const exp = expectedFlagshipRoute(row.slug)
    return row.route === exp ? { ok: true, detail: exp } : { ok: false, detail: `Expected ${exp}, got ${row.route}` }
  }
  if (row.kind === 'free_starter') {
    const ok = (REGISTERED_FREE_STARTER_PATHS as readonly string[]).includes(row.route)
    return ok ? { ok: true, detail: row.route } : { ok: false, detail: `Route ${row.route} not in App.tsx free-starter registry.` }
  }
  if (row.kind === 'standalone') {
    const exp = expectedStandaloneRoute(row.slug)
    return row.route === exp ? { ok: true, detail: exp } : { ok: false, detail: `Expected ${exp}, got ${row.route}` }
  }
  return { ok: true, detail: row.route }
}

/**
 * Compare catalog inventory, route hints, embedded asset paths, certificate rules, and copy warnings.
 */
export function buildCourseDeliveryReconciliationChecks(): AdminHealthCheck[] {
  const rows = buildAdminCourseInventoryRows()
  const ts = new Date().toISOString()
  const inventoryRoutes = new Set(rows.map((r) => r.route))
  const checks: AdminHealthCheck[] = []

  for (const row of rows) {
    const m = routeMatchesInventory(row)
    if (!m.ok) {
      checks.push({
        status: 'critical',
        label: `Route mismatch · ${row.slug}`,
        description: m.detail,
        remediation: 'Align `App.tsx` routes with `adminCourseInventory` sources (catalog metadata).',
        lastCheckedAt: ts,
      })
    }
    const paid = getPaidFlagshipCertificateConfig(row.slug)
    if (paid && !paid.hostedInteractiveIndexPath) {
      checks.push({
        status: 'warning',
        label: `Hosted bundle path · ${row.slug}`,
        description: 'Paid flagship certificate config exists but `hostedInteractiveIndexPath` is unset.',
        remediation: 'Add the public `course-assets` path or confirm this course is HTML-only.',
        lastCheckedAt: ts,
      })
    }
    const hw = buildCourseHealthWarnings(row)
    for (const w of hw) {
      if (w.includes('Route hint missing') || w.includes('Launch')) {
        checks.push({
          status: 'warning',
          label: `Course delivery · ${row.slug}`,
          description: w,
          remediation: 'Verify launch URLs and embedded asset paths for this slug.',
          lastCheckedAt: ts,
        })
      }
      if (w.includes('vendor/internal')) {
        checks.push({
          status: 'warning',
          label: `Learner-facing copy · ${row.slug}`,
          description: w,
          remediation: 'Remove vendor tooling names and internal-only phrasing from learner-visible UI.',
          lastCheckedAt: ts,
        })
      }
    }
  }

  for (const p of REGISTERED_FREE_STARTER_PATHS) {
    if (!inventoryRoutes.has(p)) {
      checks.push({
        status: 'warning',
        label: `Route without catalog row · ${p}`,
        description: 'App.tsx registers this free-starter path but no merged inventory row uses the same `publicRoute`.',
        remediation: 'Add the course to the free starter catalog or remove the dead route.',
        lastCheckedAt: ts,
      })
    }
  }

  const paidSlugs = paidFlagshipCourseSlugs()
  for (const slug of paidSlugs) {
    const row = rows.find((r) => r.slug === slug)
    if (!row) {
      checks.push({
        status: 'warning',
        label: `Certificate config orphan · ${slug}`,
        description: 'Paid flagship certificate config references a slug not present in admin course inventory.',
        remediation: 'Add flagship metadata for this slug or trim certificate config.',
        lastCheckedAt: ts,
      })
    }
  }

  checks.push({
    status: 'info',
    label: 'Progress tracking (self-paced)',
    description:
      'DB-backed self-paced progress uses `learner_self_paced_progress` for signed-in learners on supported slugs. Local-only demo persistence is not counted as database progress.',
    remediation: 'Use `/admin/progress` and integrity RPCs to reconcile remote rows vs catalog.',
    lastCheckedAt: ts,
  })

  return checks
}

export function mergeCourseDeliverySummaryStatus(checks: AdminHealthCheck[]): AdminHealthStatus {
  let worst: AdminHealthStatus = 'healthy'
  const rank: Record<AdminHealthStatus, number> = { healthy: 0, info: 1, unknown: 2, warning: 3, critical: 4 }
  for (const c of checks) {
    if (rank[c.status] > rank[worst]) worst = c.status
  }
  return worst
}
