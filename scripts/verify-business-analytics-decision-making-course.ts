/**
 * Continuity checks for Business Analytics for Decision-Making (standalone).
 *
 * Run: `npm run verify:business-analytics`
 */

import assert from 'node:assert/strict'
import { existsSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { formatHoursFromMinutes } from '../src/components/learn/standaloneCoursePresentation'
import {
  BUSINESS_ANALYTICS_DECISION_MAKING_INTERNAL_KEY,
  BUSINESS_ANALYTICS_DECISION_MAKING_SLUG,
  BUSINESS_ANALYTICS_MODULE_SLUGS,
  STANDALONE_LEARNER_CATALOG,
  businessAnalyticsDecisionMakingCourse,
  businessAnalyticsDecisionMakingNarrationManifest,
  businessAnalyticsDecisionMakingSlideManifest,
} from '../src/data/courses'

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

function testCourseIdentity() {
  assert.equal(businessAnalyticsDecisionMakingCourse.slug, BUSINESS_ANALYTICS_DECISION_MAKING_SLUG)
  assert.equal(businessAnalyticsDecisionMakingCourse.internalKey, BUSINESS_ANALYTICS_DECISION_MAKING_INTERNAL_KEY)
  assert.equal(businessAnalyticsDecisionMakingCourse.isolation.type, 'standalone')
  assert.equal(businessAnalyticsDecisionMakingCourse.modules.length, 6)
  assert.equal(businessAnalyticsDecisionMakingCourse.certificateIdPrefix, 'BA')
  assert.equal(businessAnalyticsDecisionMakingCourse.capstoneModuleSlug, 'turning-analytics-into-action')
}

function testModuleDurationsAndQuiz() {
  let sum = 0
  for (const m of businessAnalyticsDecisionMakingCourse.modules) {
    assert.ok(m.durationMinutes > 0, `${m.slug}: durationMinutes > 0`)
    sum += m.durationMinutes
  }
  assert.equal(sum, 61, 'module durations sum to 61 minutes')

  const cap = businessAnalyticsDecisionMakingCourse.modules.find((m) => m.slug === 'turning-analytics-into-action')
  assert.ok(cap, 'capstone module exists')
  assert.equal(cap!.moduleQuiz.length, 12, 'Module 6 quiz has 12 questions')
}

function testNoPlaceholders() {
  const content = JSON.stringify(businessAnalyticsDecisionMakingCourse)
  const forbidden = ['TODO', 'placeholder', 'lorem ipsum', 'PLACEHOLDER', 'TBD']
  for (const term of forbidden) {
    assert.ok(!content.toLowerCase().includes(term.toLowerCase()), `forbidden placeholder term: ${term}`)
  }
}

function testDeckOnPublicAssets() {
  const deckPath = join(
    REPO_ROOT,
    'public/course-assets/business-analytics-decision-making/deck/business_analytics_decision_making_serious_deck.pptx',
  )
  assert.ok(existsSync(deckPath), 'deck exists under public/course-assets/.../deck/')
}

function testSlideManifestConsistency() {
  const sm = businessAnalyticsDecisionMakingSlideManifest
  assert.equal(sm.courseSlug, BUSINESS_ANALYTICS_DECISION_MAKING_SLUG)
  assert.ok(sm.assetStatus === 'planned' || sm.assetStatus === 'ready', 'assetStatus is planned or ready')
  assert.ok(sm.deckDownloadUrl.startsWith('/course-assets/'), 'deck URL is public path')

  if (sm.assetStatus === 'planned') {
    assert.equal(sm.slides.length, 0, 'planned assets: slides array must be empty (no fake images)')
  }

  if (sm.assetStatus === 'ready') {
    assert.ok(sm.slides.length > 0, 'ready assets: slides populated')
    const slideDir = join(REPO_ROOT, 'public/course-assets/business-analytics-decision-making/slides')
    assert.ok(existsSync(slideDir), 'slide dir exists')
    for (const s of sm.slides) {
      const fsPath = join(REPO_ROOT, 'public', s.imageSrc.replace(/^\//, ''))
      assert.ok(existsSync(fsPath), `slide image exists: ${s.imageSrc}`)
    }
  }

  for (const slug of BUSINESS_ANALYTICS_MODULE_SLUGS) {
    const r = sm.moduleSlideRanges[slug]
    assert.ok(r, `moduleSlideRanges[${slug}]`)
    assert.ok(r!.start >= 1 && r!.end <= sm.totalSlides && r!.start <= r!.end, `range ok for ${slug}`)
  }
}

function testNarrationManifest() {
  const n = businessAnalyticsDecisionMakingNarrationManifest
  assert.equal(n.courseSlug, BUSINESS_ANALYTICS_DECISION_MAKING_SLUG)
  assert.ok(['planned', 'ready', 'missing'].includes(n.status))
  for (const slug of BUSINESS_ANALYTICS_MODULE_SLUGS) {
    const u = n.moduleAudio?.[slug]
    assert.ok(u?.startsWith('/course-assets/'), `moduleAudio URL for ${slug}`)
  }

  if (n.status === 'ready') {
    for (const slug of BUSINESS_ANALYTICS_MODULE_SLUGS) {
      const u = n.moduleAudio![slug]!
      const fsPath = join(REPO_ROOT, 'public', u.slice(1))
      assert.ok(existsSync(fsPath), `ready: audio file exists ${fsPath}`)
      const st = statSync(fsPath)
      assert.ok(st.size > 0, `ready: audio non-empty ${fsPath}`)
    }
  }
}

function testVoiceoverDocsAndPublicReadmes() {
  const scriptPath = join(REPO_ROOT, 'training/business-analytics-decision-making/voiceover-script.md')
  const guidePath = join(REPO_ROOT, 'training/business-analytics-decision-making/voiceover-production-guide.md')
  assert.ok(existsSync(scriptPath), 'voiceover-script.md exists')
  assert.ok(existsSync(guidePath), 'voiceover-production-guide.md exists')

  assert.ok(existsSync(join(REPO_ROOT, 'public/course-assets/business-analytics-decision-making/audio/README.md')))
  assert.ok(existsSync(join(REPO_ROOT, 'public/course-assets/business-analytics-decision-making/transcripts/README.md')))
  assert.ok(existsSync(join(REPO_ROOT, 'public/course-assets/business-analytics-decision-making/slides/README.md')))
}

function testCatalog() {
  const entry = STANDALONE_LEARNER_CATALOG.find((c) => c.slug === BUSINESS_ANALYTICS_DECISION_MAKING_SLUG)
  assert.ok(entry)
  assert.equal(entry!.internalKey, BUSINESS_ANALYTICS_DECISION_MAKING_INTERNAL_KEY)
}

function testUiWiring() {
  const micro = readFileSync(join(REPO_ROOT, 'src/components/learn/standaloneMicroCourseDetail.tsx'), 'utf8')
  assert.ok(micro.includes('BusinessAnalyticsNarratedCourseOverview'), 'micro overview delegates BA narrated layout')

  const mod = readFileSync(join(REPO_ROOT, 'src/components/learn/StandaloneModuleDetailPage.tsx'), 'utf8')
  assert.ok(mod.includes('BusinessAnalyticsStandaloneModulePage'), 'module router uses BA standalone layout')
  assert.ok(mod.includes('getBaSlidesForModule'), 'module router imports BA slide helper')

  const lesson = readFileSync(join(REPO_ROOT, 'src/components/learn/StandaloneLessonDetailPage.tsx'), 'utf8')
  assert.ok(lesson.includes('BUSINESS_ANALYTICS_DECISION_MAKING_SLUG'), 'lesson page knows BA slug')
  assert.ok(lesson.includes('standalone-ba-slide-player-lesson') || lesson.includes('standalone-ba-lesson-slide-planned'), 'BA lesson slide wiring')
}

function testDurationFormatting() {
  assert.equal(formatHoursFromMinutes(0), '', 'no 0 hours label for zero minutes')
  assert.equal(formatHoursFromMinutes(10), '10 min', 'sub-hour label')
}

function main() {
  testCourseIdentity()
  testModuleDurationsAndQuiz()
  testNoPlaceholders()
  testDeckOnPublicAssets()
  testSlideManifestConsistency()
  testNarrationManifest()
  testVoiceoverDocsAndPublicReadmes()
  testCatalog()
  testUiWiring()
  testDurationFormatting()
  console.log('verify-business-analytics-decision-making-course: OK — all checks passed')
}

main()
