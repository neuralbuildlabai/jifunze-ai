/**
 * Production continuity for AI Productivity and Smart Workflows (hosted interactive lesson + capstone wiring).
 *
 * Run: `npm run verify:ai-productivity-smart-workflows`
 *   or `npx tsx scripts/verify-ai-productivity-smart-workflows-production.ts`
 */
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { getFlagshipCourseBySlug } from '../src/data/learning/flagshipCoursesCatalog'
import { getPaidFlagshipCertificateConfig, JIFUNZE_LEARNING_HUB_ISSUER } from '../src/lib/paidFlagshipCertificateConfig'

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const SLUG = 'ai-productivity-smart-workflows'
const EXPECT_TITLE = 'AI Productivity and Smart Workflows'

function testCatalogAndPaidConfig() {
  const course = getFlagshipCourseBySlug(SLUG)
  assert.ok(course, 'course slug exists in flagship catalog')
  assert.equal(course.title, EXPECT_TITLE)

  const cfg = getPaidFlagshipCertificateConfig(SLUG)
  assert.ok(cfg, 'paid certificate config exists')
  assert.equal(cfg.courseSlug, SLUG)
  assert.equal(cfg.provider, JIFUNZE_LEARNING_HUB_ISSUER)
  assert.equal(cfg.certificateValidityYears, 2)
  assert.equal(cfg.capstonePassScore, 75)
  assert.equal(cfg.capstoneSubmissionEnabled, true)
  assert.equal(cfg.capstoneRequired, true)
  assert.ok(
    cfg.hostedRiseIndexPath?.startsWith('/course-assets/interactive/'),
    'Hosted lesson launch URL is under /course-assets/interactive/',
  )
  assert.ok(cfg.hostedRiseIndexPath?.endsWith('/content/index.html'), 'Hosted lesson URL ends with content/index.html')
}

function testHostedRiseOnDisk() {
  const cfg = getPaidFlagshipCertificateConfig(SLUG)!
  const rel = cfg.hostedRiseIndexPath!.replace(/^\//, '')
  const indexPath = join(REPO_ROOT, 'public', rel)
  assert.ok(existsSync(indexPath), `Hosted lesson index exists: ${indexPath}`)

  const html = readFileSync(indexPath, 'utf8')
  assert.match(html, /<html[\s>]/i, 'Hosted lesson entry looks like HTML')
  assert.match(html, /id="app"/, 'Hosted lesson entry mounts #app')
  const lowered = html.toLowerCase()
  assert.ok(
    !lowered.includes('instructor:') && !lowered.includes('your instructor'),
    'Hosted lesson entry HTML should not advertise a named instructor line',
  )
}

function testUiWiring() {
  const detailPage = readFileSync(join(REPO_ROOT, 'src/components/learn/FlagshipCourseDetailPage.tsx'), 'utf8')
  assert.ok(
    detailPage.includes('PaidHostedRiseFlagshipSection'),
    'FlagshipCourseDetailPage imports hosted interactive-lesson section',
  )

  const riseSection = readFileSync(join(REPO_ROOT, 'src/components/learn/PaidHostedRiseFlagshipSection.tsx'), 'utf8')
  assert.ok(riseSection.includes('/learn/courses/${courseSlug}/capstone'), 'Hosted lesson section links capstone by slug')
  assert.ok(riseSection.includes('Submit Final Capstone'), 'Hosted lesson section capstone CTA label')
  assert.ok(
    riseSection.includes('Certificate unlocks after required checks are complete'),
    'Launch card certificate note',
  )
  assert.ok(riseSection.includes('Your certificate is awarded only after your capstone is reviewed and passed'), 'Capstone card certificate note')

  const banner = readFileSync(join(REPO_ROOT, 'src/components/learn/PaidFlagshipCertificateBanner.tsx'), 'utf8')
  assert.ok(banner.includes('Submit Final Capstone'), 'Certificate banner uses capstone CTA label')

  const app = readFileSync(join(REPO_ROOT, 'src/App.tsx'), 'utf8')
  assert.ok(app.includes('/learn/courses/:slug/capstone'), 'Capstone route is registered')
}

function main() {
  testCatalogAndPaidConfig()
  testHostedRiseOnDisk()
  testUiWiring()
  // Import resolution is enforced by `npm run build` / `tsc -b`.
  console.log('verify-ai-productivity-smart-workflows-production: ok')
}

main()
