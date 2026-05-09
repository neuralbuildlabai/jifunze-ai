/**
 * Static checks for the reusable Jifunze slide player and Business Process Automation manifest.
 *
 * Run: `npm run verify:course-slide-player`
 */

import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { businessProcessAutomationSlideManifest } from '../src/data/courses/businessProcessAutomationSlides'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const playerPath = join(root, 'src/components/learn/JifunzeSlidePlayer.tsx')
const slidesPath = join(root, 'src/data/courses/businessProcessAutomationSlides.ts')
const overviewPath = join(root, 'src/components/learn/standaloneMicroCourseDetail.tsx')
const moduleRouterPath = join(root, 'src/components/learn/StandaloneModuleDetailPage.tsx')
const bpaModulePath = join(root, 'src/components/learn/BpaStandaloneModulePage.tsx')
const lessonPath = join(root, 'src/components/learn/StandaloneLessonDetailPage.tsx')

function read(p: string): string {
  return readFileSync(p, 'utf8')
}

function main() {
  const player = read(playerPath)
  assert.ok(player.includes('function JifunzeSlidePlayer'), 'JifunzeSlidePlayer component exists')
  assert.ok(player.includes('aria-label="Previous slide"'), 'slide player supports Previous label')
  assert.ok(player.includes('aria-label="Next slide"'), 'slide player supports Next label')
  assert.ok(player.includes('data-testid="jifunze-slide-counter"'), 'slide counter hook exists')
  assert.ok(player.includes('Slide {current?.slideNumber') && player.includes('of {totalForLabel}'), 'slide counter text exists')
  assert.ok(player.includes('deckDownloadUrl'), 'deck download prop exists')
  assert.ok(player.includes('audioSrc'), 'slide player supports optional audioSrc')
  assert.ok(player.includes('narrationStatus'), 'slide player supports narrationStatus')
  assert.ok(player.includes('slideTranscripts'), 'slide player supports slideTranscripts')
  assert.ok(player.includes('Read transcript'), 'slide player exposes transcript affordance')
  assert.ok(
    player.includes('Slide image pending.') && player.includes('public/course-assets/[course-slug]/slides/'),
    'missing-slide fallback exists',
  )

  assert.ok(read(slidesPath).includes('export const businessProcessAutomationSlideManifest'), 'BPA slide manifest file exists')

  const m = businessProcessAutomationSlideManifest
  assert.equal(m.slides.length, 40, 'manifest has 40 slides')
  assert.equal(m.totalSlides, 40, 'totalSlides is 40')

  const overview = read(overviewPath)
  assert.ok(overview.includes('BpaNarratedCourseOverview'), 'micro course overview delegates BPA narrated layout')

  const bpaOverviewPath = join(root, 'src/components/learn/BpaNarratedCourseOverview.tsx')
  const bpaOverview = read(bpaOverviewPath)
  assert.ok(bpaOverview.includes('JifunzeSlidePlayer'), 'BPA narrated overview references slide player')
  assert.ok(bpaOverview.includes('businessProcessAutomationSlideManifest'), 'BPA narrated overview references slide manifest')

  const modRouter = read(moduleRouterPath)
  assert.ok(modRouter.includes('BpaStandaloneModulePage') && modRouter.includes('getBpaSlidesForModule'), 'module router wires BPA slides')
  const bpaMod = read(bpaModulePath)
  assert.ok(bpaMod.includes('JifunzeSlidePlayer'), 'BPA module layout includes slide player')

  const les = read(lessonPath)
  assert.ok(les.includes('JifunzeSlidePlayer') && les.includes('getBpaSlidesForLesson'), 'lesson integration references slide player/manifest')

  console.log('verify-course-slide-player: OK — all checks passed')
}

main()
