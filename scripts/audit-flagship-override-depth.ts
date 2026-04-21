/**
 * Flagship instructional depth audit — **resolved learner-visible blocks** after
 * `getFlagshipSessionContentBlocks` (override + generator merge).
 *
 * Usage:
 *   npx tsx scripts/audit-flagship-override-depth.ts
 *   npx tsx scripts/audit-flagship-override-depth.ts --raw-map-only
 *   npx tsx scripts/audit-flagship-override-depth.ts --premium-min-chars 1900
 *
 * Defaults:
 *   Baseline threshold = MIN_OVERRIDE_CHARS from flagshipSessionContentResolve.ts (technical gate).
 *   Premium threshold = 1900 chars (editorial refinement target), overridable via --premium-min-chars.
 *
 * Exit codes:
 *   Baseline failures → exit 1 (unless --skip-baseline-exit)
 *   Use --fail-on-premium to exit 1 when any session is below premium threshold.
 */
import { FLAGSHIP_COURSES } from '../src/data/learning/flagshipCoursesCatalog'
import { getFlagshipCurriculum } from '../src/data/learning/flagshipCourseCurricula'
import { buildSessionsForCurriculum } from '../src/data/learning/flagshipCourseSessions'
import {
  instructionalBodyCharTotal,
  MIN_OVERRIDE_CHARS,
  resolvedFlagshipSessionInstructionalChars,
} from '../src/data/learning/flagshipSessionContentResolve'
import { PREMIUM_DEPTH_TARGET_CHARS } from '../src/data/learning/flagshipDepthTargets'
import {
  FLAGSHIP_SESSION_CONTENT_OVERRIDES,
  flagshipSessionContentOverrideKey,
} from '../src/data/learning/flagshipSessionContentOverrides'
import type { FlagshipSessionContentBlock } from '../src/data/learning/flagshipSessionContentTypes'

const DEFAULT_PREMIUM_MIN_CHARS = PREMIUM_DEPTH_TARGET_CHARS

function parseArgs() {
  const argv = process.argv.slice(2)
  let premiumMinChars = DEFAULT_PREMIUM_MIN_CHARS
  let rawMapOnly = false
  let skipBaselineExit = false
  let failOnPremium = false

  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--raw-map-only') rawMapOnly = true
    else if (argv[i] === '--skip-baseline-exit') skipBaselineExit = true
    else if (argv[i] === '--fail-on-premium') failOnPremium = true
    else if (argv[i] === '--premium-min-chars' && argv[i + 1]) {
      premiumMinChars = Math.max(0, parseInt(argv[i + 1], 10) || DEFAULT_PREMIUM_MIN_CHARS)
      i++
    }
  }

  return { premiumMinChars, rawMapOnly, skipBaselineExit, failOnPremium }
}

function rawOverrideOnlyChars(courseSlug: string, sessionId: string): number {
  const key = flagshipSessionContentOverrideKey(courseSlug, sessionId)
  const o = FLAGSHIP_SESSION_CONTENT_OVERRIDES[key]
  if (!o?.length) return 0
  return instructionalBodyCharTotal(o as FlagshipSessionContentBlock[])
}

type AuditRow = {
  courseSlug: string
  schoolId: string
  sessionId: string
  sessionTitle: string
  moduleId: string
  sessionType: string
  resolvedChars: number
  rawOverrideChars: number
}

function auditResolved(premiumThreshold: number): {
  baselineThin: AuditRow[]
  premiumThin: AuditRow[]
  totalSessions: number
  resolvedSamples: number[]
} {
  const baselineThin: AuditRow[] = []
  const premiumThin: AuditRow[] = []
  const resolvedSamples: number[] = []
  let totalSessions = 0

  for (const course of FLAGSHIP_COURSES) {
    const curriculum = getFlagshipCurriculum(course.slug)
    if (!curriculum) continue
    const sessions = buildSessionsForCurriculum(curriculum)
    for (const session of sessions) {
      totalSessions += 1
      const resolvedChars = resolvedFlagshipSessionInstructionalChars(session, curriculum)
      resolvedSamples.push(resolvedChars)
      const rawOverrideChars = rawOverrideOnlyChars(session.courseSlug, session.id)

      if (resolvedChars < MIN_OVERRIDE_CHARS) {
        baselineThin.push({
          courseSlug: course.slug,
          schoolId: course.schoolId,
          sessionId: session.id,
          sessionTitle: session.title,
          moduleId: session.moduleId,
          sessionType: session.type,
          resolvedChars,
          rawOverrideChars,
        })
      }
      if (resolvedChars < premiumThreshold) {
        premiumThin.push({
          courseSlug: course.slug,
          schoolId: course.schoolId,
          sessionId: session.id,
          sessionTitle: session.title,
          moduleId: session.moduleId,
          sessionType: session.type,
          resolvedChars,
          rawOverrideChars,
        })
      }
    }
  }

  const sortRows = (a: AuditRow, b: AuditRow) =>
    a.resolvedChars - b.resolvedChars || a.courseSlug.localeCompare(b.courseSlug)
  baselineThin.sort(sortRows)
  premiumThin.sort(sortRows)

  return { baselineThin, premiumThin, totalSessions, resolvedSamples }
}

function pct(sorted: number[], p: number): number {
  if (sorted.length === 0) return 0
  const idx = Math.min(sorted.length - 1, Math.max(0, Math.floor((p / 100) * (sorted.length - 1))))
  return sorted[idx]
}

function auditRawMapOnly(): void {
  const thin: { key: string; chars: number }[] = []
  for (const [key, blocks] of Object.entries(FLAGSHIP_SESSION_CONTENT_OVERRIDES)) {
    if (!blocks?.length) {
      thin.push({ key, chars: 0 })
      continue
    }
    const total = instructionalBodyCharTotal(blocks as FlagshipSessionContentBlock[])
    if (total < MIN_OVERRIDE_CHARS) thin.push({ key, chars: total })
  }
  thin.sort((a, b) => a.chars - b.chars)
  console.log('\n--- Legacy: raw override map only (pre-merge) ---')
  console.log(`MIN_OVERRIDE_CHARS=${MIN_OVERRIDE_CHARS}`)
  console.log(`Total override keys: ${Object.keys(FLAGSHIP_SESSION_CONTENT_OVERRIDES).length}`)
  console.log(`Below threshold (raw map): ${thin.length}`)
  for (const row of thin) {
    console.log(`${row.chars}\t${row.key}`)
  }
}

function printSection(title: string, thin: AuditRow[], threshold: number, label: string) {
  console.log(`\n=== ${title} ===`)
  console.log(`${label}: ${threshold}`)
  console.log(`Sessions below threshold: ${thin.length}`)
  console.log(
    'resolvedChars\trawOverrideChars\tcourseSlug\tsessionType\tmoduleId\tsessionId\ttitle',
  )
  for (const r of thin) {
    console.log(
      `${r.resolvedChars}\t${r.rawOverrideChars}\t${r.courseSlug}\t${r.sessionType}\t${r.moduleId}\t${r.sessionId}\t${r.sessionTitle.replace(/\t/g, ' ')}`,
    )
  }
  const byCourse = new Map<string, number>()
  for (const r of thin) {
    byCourse.set(r.courseSlug, (byCourse.get(r.courseSlug) ?? 0) + 1)
  }
  if (byCourse.size) {
    console.log('\n--- Counts by course ---')
    ;[...byCourse.entries()]
      .sort((a, b) => b[1] - a[1])
      .forEach(([slug, n]) => console.log(`${n}\t${slug}`))
  }
}

function main() {
  const { premiumMinChars, rawMapOnly, skipBaselineExit, failOnPremium } = parseArgs()

  if (rawMapOnly) {
    auditRawMapOnly()
    process.exit(0)
    return
  }

  const { baselineThin, premiumThin, totalSessions, resolvedSamples } = auditResolved(premiumMinChars)
  const sorted = [...resolvedSamples].sort((a, b) => a - b)

  console.log('=== Flagship resolved instructional depth audit ===')
  console.log(`Sessions enumerated: ${totalSessions} · Catalog courses: ${FLAGSHIP_COURSES.length}`)
  console.log('')
  console.log(`BASELINE (technical QA): MIN_OVERRIDE_CHARS=${MIN_OVERRIDE_CHARS}`)
  console.log(`  Baseline pass: ${baselineThin.length === 0 ? 'YES' : 'NO'} (${baselineThin.length} sessions below)`)
  console.log('')
  console.log(`PREMIUM (editorial refinement): premiumMinChars=${premiumMinChars}`)
  console.log(`  Premium pass: ${premiumThin.length === 0 ? 'YES' : 'NO'} (${premiumThin.length} sessions below)`)

  if (sorted.length) {
    console.log('')
    console.log(
      `Resolved depth distribution (chars): min=${sorted[0]} · p10=${pct(sorted, 10)} · median=${pct(sorted, 50)} · p90=${pct(sorted, 90)} · max=${sorted[sorted.length - 1]}`,
    )
  }

  printSection(
    'Baseline failures (resolved < MIN_OVERRIDE_CHARS)',
    baselineThin,
    MIN_OVERRIDE_CHARS,
    'Threshold',
  )
  printSection(
    `Premium refinement backlog (resolved < ${premiumMinChars})`,
    premiumThin,
    premiumMinChars,
    'Threshold',
  )

  let exitCode = 0
  if (baselineThin.length > 0 && !skipBaselineExit) exitCode = 1
  if (failOnPremium && premiumThin.length > 0) exitCode = 1

  process.exit(exitCode)
}

main()
