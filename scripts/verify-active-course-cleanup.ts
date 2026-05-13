/**
 * Static checks for learner-facing course shell copy and embedded course wiring.
 * Run: npx tsx scripts/verify-active-course-cleanup.ts
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { FREE_STARTER_RISE_COURSES } from '../src/data/learning/freeStarterRiseCoursesCatalog'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const SHELL_SOURCES = [
  'src/components/learn/AiAtWorkChatgptFreeStarterPage.tsx',
  'src/components/learn/BusinessAnalyticsDecisionMakingFreeStarterPage.tsx',
  'src/components/learn/SmartWorkflowsWithAiFreeStarterPage.tsx',
  'src/components/learn/MentalWellbeingResetFreeStarterPage.tsx',
  'src/components/learn/StandaloneCourseDetailPage.tsx',
  'src/components/learn/standaloneMicroCourseDetail.tsx',
  'src/components/learn/FlagshipCourseDetailPage.tsx',
  'src/components/learn/AvailableLearnSurfaces.tsx',
  'src/data/learning/freeStarterRiseCoursesCatalog.ts',
  'src/data/learning/smartWorkflowsMicrolearningPageCopy.ts',
  'src/data/learning/aiAtWorkMicrolearningPageCopy.ts',
  'src/data/learning/businessAnalyticsMicrolearningPageCopy.ts',
  'src/data/learning/mentalWellbeingResetMicrolearningPageCopy.ts',
] as const

/** Must not appear in free starter shells or their copy modules (learner-facing product-architecture tone). */
const FORBIDDEN_INTERNAL_PRODUCT_COPY = [
  'not a full analytics',
  'native analytics',
  'deeper native',
  'helps learners translate',
  'when you need a paid',
  'use other jifunze',
  'orients judgment in one sitting',
  'separate rungs',
  'learning hub paths',
  'flagship program',
] as const

/** Substrings that must not appear in learner shell source (lowercase scan). */
const FORBIDDEN_SUBSTRINGS = [
  'articulate',
  'rise.com',
  'storyline',
  'scorm',
  'account-wide',
  'account wide',
  'sync is available',
] as const

function read(rel: string) {
  return readFileSync(join(ROOT, rel), 'utf8')
}

/** Substrings that must not appear in generated active-course inventory (lowercase scan). */
const FORBIDDEN_INVENTORY_SUBSTRINGS = [
  'rise export',
  'hosted rise',
  'authoring tool',
  'raw zip',
  'zip export',
  'scorm',
] as const

function readInventoryIfPresent() {
  const inv = join(ROOT, 'docs/ACTIVE_COURSE_INVENTORY.md')
  if (!existsSync(inv)) return
  const lower = readFileSync(inv, 'utf8').toLowerCase()
  for (const bad of FORBIDDEN_INVENTORY_SUBSTRINGS) {
    assert.ok(!lower.includes(bad), `docs/ACTIVE_COURSE_INVENTORY.md must not contain "${bad}"`)
  }
}

function main() {
  for (const rel of SHELL_SOURCES) {
    const lower = read(rel).toLowerCase()
    for (const bad of FORBIDDEN_SUBSTRINGS) {
      assert.ok(
        !lower.includes(bad),
        `${rel} must not contain learner-forbidden substring "${bad}"`,
      )
    }
    const isFreeStarterMicroSurface =
      rel.includes('FreeStarter') ||
      rel.includes('freeStarterRiseCoursesCatalog') ||
      rel.includes('MicrolearningPageCopy') ||
      rel.includes('aiAtWorkMicrolearningPageCopy') ||
      rel.includes('businessAnalyticsMicrolearningPageCopy') ||
      rel.includes('smartWorkflowsMicrolearningPageCopy') ||
      rel.includes('mentalWellbeingResetMicrolearningPageCopy')
    if (isFreeStarterMicroSurface) {
      for (const bad of FORBIDDEN_INTERNAL_PRODUCT_COPY) {
        assert.ok(!lower.includes(bad), `${rel} must not contain internal ladder/architecture phrase "${bad}"`)
      }
    }
  }

  for (const course of FREE_STARTER_RISE_COURSES) {
    const relPath = course.lessonPlayerSrc.replace(/^\//, '')
    const abs = join(ROOT, 'public', relPath)
    assert.ok(existsSync(abs), `missing embedded index for ${course.slug}: ${abs}`)
  }

  const paidHostedInteractive = join(ROOT, 'public/course-assets/interactive/ai-productivity-smart-workflows/content/index.html')
  assert.ok(existsSync(paidHostedInteractive), 'missing paid hosted interactive course index.html')

  readInventoryIfPresent()

  console.log('verify-active-course-cleanup: ok')
}

main()
