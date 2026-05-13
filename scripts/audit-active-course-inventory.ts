/**
 * Active course inventory for Jifunze.ai — run:
 *   npx tsx scripts/audit-active-course-inventory.ts
 * Writes: docs/ACTIVE_COURSE_INVENTORY.md
 */
import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { EXTENDED_PUBLIC_LIBRARY_CONFIGS, type ExtendedPublicLibraryKey } from '../src/data/learning/extendedPublicLibraryConfigs'
import { FREE_STARTER_RISE_COURSES } from '../src/data/learning/freeStarterRiseCoursesCatalog'
import { FLAGSHIP_COURSES } from '../src/data/learning/flagshipCoursesCatalog'
import { isFlagshipSlugInLearnerPublicCatalog } from '../src/data/learning/flagshipLearnerCatalogPolicy'
import { AVAILABLE_PUBLIC_STANDALONE_COURSES } from '../src/data/learning/availablePublicLearnCatalog'
import { getPaidFlagshipCertificateConfig } from '../src/lib/paidFlagshipCertificateConfig'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const OUT = join(ROOT, 'docs/ACTIVE_COURSE_INVENTORY.md')

type Status = 'A' | 'B' | 'C' | 'D' | 'E'

type Row = {
  title: string
  slug: string
  route: string
  courseType: string
  access: string
  dataFiles: string
  pageOrSurface: string
  embeddedPath: string
  status: Status
  cleanupNotes: string
}

const rows: Row[] = []

function add(r: Row) {
  rows.push(r)
}

/** Free starters from catalog */
for (const e of FREE_STARTER_RISE_COURSES) {
  add({
    title: e.title,
    slug: e.slug,
    route: e.publicRoute,
    courseType: 'free_starter · embedded course',
    access: 'free',
    dataFiles: 'src/data/learning/freeStarterRiseCoursesCatalog.ts',
    pageOrSurface: `src/components/learn/*FreeStarterPage.tsx (slug ${e.slug})`,
    embeddedPath: e.lessonPlayerSrc,
    status: 'A',
    cleanupNotes:
      'Align shell with premium microlearning pattern (single access label, no sync clutter, optional embedded course strings via re-export).',
  })
}

/** Public /learn full-course cards */
for (const listing of AVAILABLE_PUBLIC_STANDALONE_COURSES) {
  add({
    title: listing.title,
    slug: listing.slug,
    route: listing.route,
    courseType: 'standalone full course · narrated / in-app modules',
    access: 'free (catalog card: Free Full Course)',
    dataFiles: 'src/data/courses/practicalMathematicsCourse.ts, standaloneCoursesCatalog.ts',
    pageOrSurface: 'StandaloneCourseDetailPage / StandaloneMicroCourseDetailView / module & lesson routes',
    embeddedPath: '— (no separate hosted embedded player for these public listings)',
    status: 'A',
    cleanupNotes: 'Flagship-style depth checklist on detail page — ensure access wording not duplicated in hero + checklist.',
  })
}

/** All flagship metadata routes (deep links; not on main /learn allowlist today) */
for (const c of FLAGSHIP_COURSES) {
  const paid = getPaidFlagshipCertificateConfig(c.slug)
  const embed = paid?.hostedRiseIndexPath ?? '—'
  const inPublicFlagshipGrid = isFlagshipSlugInLearnerPublicCatalog(c.slug)
  const status: Status = inPublicFlagshipGrid ? 'A' : 'B'
  let cleanup = 'Deep-link only until allowlisted on /learn; keep copy premium and consistent with checkout.'
  let type = 'flagship · native session + detail pages'
  if (c.slug === 'ai-productivity-smart-workflows') {
    type = 'flagship (paid tier) · reuses workflows curriculum + hosted interactive course'
    cleanup =
      'Paid rung on workflows ladder: guided interactive + native capstone/certificate review. Native sibling: ai-powered-workflows-and-productivity. See docs/JIFUNZE_COURSE_PRODUCT_LADDER.md.'
  }
  if (c.slug === 'ai-powered-workflows-and-productivity') {
    cleanup =
      'Native deep workflows flagship (not the hosted certificate bundle). Distinct from free starter + paid SKU; see docs/JIFUNZE_COURSE_PRODUCT_LADDER.md. Hidden from public flagship grid until policy + product sign-off.'
  }
  add({
    title: c.title,
    slug: c.slug,
    route: `/learn/courses/${c.slug}`,
    courseType: type,
    access: paid ? 'paid / gated (Learning Hub rules)' : 'paid / subscription framing in UI (checkout)',
    dataFiles: 'src/data/learning/flagshipCoursesCatalog.ts, flagshipCourseCurricula*.ts, flagshipSessionContent*.ts',
    pageOrSurface: 'FlagshipCourseDetailPage, FlagshipCourseSessionPage, capstone route',
    embeddedPath: embed,
    status,
    cleanupNotes: cleanup,
  })
}

/** Extended public libraries + standalone course SKUs */
const EXTENDED_KEYS = Object.keys(EXTENDED_PUBLIC_LIBRARY_CONFIGS) as ExtendedPublicLibraryKey[]
for (const key of EXTENDED_KEYS) {
  const cfg = EXTENDED_PUBLIC_LIBRARY_CONFIGS[key]
  const isCourseSku = key.startsWith('course_')
  add({
    title: cfg.title,
    slug: key,
    route: cfg.landingPath ?? cfg.publicBasePath,
    courseType: isCourseSku ? 'standalone courseware · extended reader + landing' : 'extended public library · reader',
    access: 'free public readers (monetization hooks vary)',
    dataFiles: 'src/data/learning/extendedPublicLibraryConfigs.ts, standaloneCoursesCatalog.ts (course SKUs)',
    pageOrSurface: 'PublicExtendedCatalogLibraryPage / PublicStandaloneCourseLandingPage / lesson reader',
    embeddedPath: '—',
    status: 'A',
    cleanupNotes: isCourseSku
      ? 'Discovery category cards link here; keep landing + reader chrome aligned with warm premium standard.'
      : 'Library browse; not a single “course page” but part of learning discovery ecosystem.',
  })
}

/** Duplicate / redirect documentation */
add({
  title: 'Redirect: business-analytics-decision-making (legacy path)',
  slug: '—',
  route: '/learn/business-analytics-decision-making → /learn/free/business-analytics-decision-making',
  courseType: 'redirect',
  access: '—',
  dataFiles: 'src/App.tsx',
  pageOrSurface: 'Navigate',
  embeddedPath: '—',
  status: 'C',
  cleanupNotes: 'Keep redirect; canonical free starter route only in catalog.',
})
add({
  title: 'Redirect: business-analytics-native-modules',
  slug: '—',
  route: '/learn/business-analytics-native-modules → /learn/free/business-analytics-decision-making',
  courseType: 'redirect',
  access: '—',
  dataFiles: 'src/App.tsx',
  pageOrSurface: 'Navigate',
  embeddedPath: '—',
  status: 'C',
  cleanupNotes: 'Legacy lab naming; keep redirect to current free starter.',
})
add({
  title: 'Redirect: Business Process Automation (deprecated slug → Business Analytics)',
  slug: '—',
  route: '/learn/business-process-automation-for-work → /learn/free/business-analytics-decision-making',
  courseType: 'redirect',
  access: '—',
  dataFiles: 'src/App.tsx',
  pageOrSurface: 'Navigate',
  embeddedPath: '—',
  status: 'C',
  cleanupNotes:
    'BPA consolidated into Business Analytics public lane; do not market separately. Course assets may remain under public/course-assets/business-process-automation-for-work/ for archival ops.',
})
add({
  title: 'Redirect: flagship /learn/courses/ BPA slug',
  slug: '—',
  route: '/learn/courses/business-process-automation-for-work → /learn/free/business-analytics-decision-making',
  courseType: 'redirect',
  access: '—',
  dataFiles: 'src/App.tsx',
  pageOrSurface: 'Navigate',
  embeddedPath: '—',
  status: 'C',
  cleanupNotes: 'Same consolidation as legacy standalone BPA path.',
})
add({
  title: 'Redirect: legacy ChatGPT marketing path',
  slug: '—',
  route: '/courses/learn-chatgpt-everyday-work/* → /learn/free/ai-at-work-chatgpt',
  courseType: 'redirect',
  access: '—',
  dataFiles: 'src/App.tsx',
  pageOrSurface: 'Navigate',
  embeddedPath: '—',
  status: 'C',
  cleanupNotes: 'Preserve old links.',
})

/** Ops / backup packages (not routes) */
add({
  title: 'Backup interactive course trees (not served as routes)',
  slug: '_backup_20260511_1931',
  route: '—',
  courseType: 'static backup tree',
  access: '—',
  dataFiles: 'public/course-assets/interactive/_backup_*',
  pageOrSurface: '—',
  embeddedPath: 'under public/ (exclude from automated embedded verify)',
  status: 'E',
  cleanupNotes: 'Archive only; do not link from catalog. Safe to delete after retention policy (document before delete).',
})

const legend = `
## Status legend

| Code | Meaning |
|------|--------|
| **A** | Active and intended for learners (catalog, direct route, or public library/courseware). |
| **B** | Active but not on the primary \`/learn\` flagship grid (deep link, paid-only surface, or session-only embed). |
| **C** | Duplicate / legacy / redirect — keep for compatibility; canonical route documented. |
| **D** | Broken or missing-asset **candidate** — requires manual check (script verifies common paths only). |
| **E** | Draft, backup, or non-production asset — do not promote in catalog. |

## Embedded course packages under \`public/course-assets/interactive/\`

| Folder | Role |
|--------|------|
| \`smart-workflows-with-ai\` | Free starter (A) |
| \`ai-at-work-chatgpt\` | Free starter (A) |
| \`business-analytics-decision-making\` | Free starter (A) |
| \`5-day-mental-wellbeing-reset\` | Free starter (A) |
| \`ai-productivity-smart-workflows\` | Paid flagship hosted player (B) |
| \`_backup_*\` | Archive (E) — exclude from production checks |

_Generated by \`scripts/audit-active-course-inventory.ts\`. Re-run after catalog or route changes._
`

function esc(s: string) {
  return s.replace(/\|/g, '\\|').replace(/\n/g, ' ')
}

function main() {
  mkdirSync(dirname(OUT), { recursive: true })
  const header = `# Jifunze.ai — active course inventory (generated)\n\n`
  const tableHeader = `| Course title | Slug / key | Route | Type | Access | Main data | Page / surface | Embedded path | Status | Cleanup / notes |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n`
  const body = rows
    .map(
      (r) =>
        `| ${esc(r.title)} | ${esc(r.slug)} | ${esc(r.route)} | ${esc(r.courseType)} | ${esc(r.access)} | ${esc(r.dataFiles)} | ${esc(r.pageOrSurface)} | ${esc(r.embeddedPath)} | **${r.status}** | ${esc(r.cleanupNotes)} |`,
    )
    .join('\n')

  writeFileSync(OUT, header + tableHeader + body + '\n\n' + legend, 'utf8')
  console.log('audit-active-course-inventory: wrote', OUT, 'rows:', rows.length)
}

main()
