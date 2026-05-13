/**
 * Static checks for paid / deep course shells (flagship, hosted paid, standalone).
 * Run: npx tsx scripts/verify-paid-course-shells.ts
 */
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const SOURCES = [
  'src/components/learn/FlagshipCourseDetailPage.tsx',
  'src/components/learn/premiumCourseShell/FlagshipDetailAccessPill.tsx',
  'src/components/learn/PaidHostedRiseFlagshipSection.tsx',
  'src/components/learn/PaidFlagshipCertificateBanner.tsx',
  'src/components/learn/AiEssentialsCourseOverview.tsx',
  'src/components/learn/flagshipSession/FlagshipSessionPlayerSurfaces.tsx',
  'src/components/learn/StandaloneCourseDetailPage.tsx',
  'src/components/learn/StandaloneCertificatePage.tsx',
  'src/components/libraries/PublicExtendedCatalogLibraryPage.tsx',
  'src/components/libraries/PublicStarterLibraryChrome.tsx',
] as const

const FORBIDDEN = [
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

function main() {
  for (const rel of SOURCES) {
    const lower = read(rel).toLowerCase()
    for (const bad of FORBIDDEN) {
      assert.ok(!lower.includes(bad), `${rel} must not contain "${bad}"`)
    }
  }

  const detail = read('src/components/learn/FlagshipCourseDetailPage.tsx')
  assert.ok(detail.includes('FlagshipDetailAccessPill'), 'flagship detail wires access pill component')
  assert.ok(detail.includes('Course promise'), 'course promise section present')
  assert.ok(detail.includes('{course.intro}'), 'intro appears in promise section')
  const heroBlock = detail.split('TrustBoundaryStrip')[0] ?? ''
  assert.ok(
    !heroBlock.includes('{course.intro}'),
    'course.intro must not appear in hero block before trust strip (avoid subtitle + intro repetition in hero)',
  )

  const hosted = read('src/components/learn/PaidHostedRiseFlagshipSection.tsx')
  assert.ok(hosted.includes('data-testid="paid-hosted-flagship-access"'), 'paid hosted access line test id')
  assert.ok(hosted.includes('data-testid="paid-rise-open-new-tab"'), 'paid hosted secondary open link')

  console.log('verify-paid-course-shells: ok')
}

main()
