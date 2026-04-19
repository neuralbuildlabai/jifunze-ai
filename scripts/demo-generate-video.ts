/**
 * Records a short browser demo of https://jifunze.ai/generate for social editing (TikTok, etc.).
 *
 * Prerequisite (once per machine / after `npm ci`):
 *   npx playwright install chromium
 *
 * Run (headless — good for CI / background capture):
 *   npm run demo:video
 *
 * Run headed (see the browser while recording):
 *   npm run demo:video:headed
 *
 * Artifacts (relative to repo root):
 *   Video:       e2e/demo-artifacts/videos/jifunze-generate-demo.webm
 *   Screenshots: e2e/demo-artifacts/screenshots/before-generate.png
 *                e2e/demo-artifacts/screenshots/after-result.png
 */
import { mkdirSync, copyFileSync, existsSync, unlinkSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { chromium, type Browser, type BrowserContext, type Page } from 'playwright'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const DEMO_URL = 'https://jifunze.ai/generate'
const TOPIC = 'How AI tutors can improve revision outcomes'

const VIDEOS_DIR = path.join(REPO_ROOT, 'e2e', 'demo-artifacts', 'videos')
const SCREENSHOTS_DIR = path.join(REPO_ROOT, 'e2e', 'demo-artifacts', 'screenshots')
const FINAL_VIDEO = path.join(VIDEOS_DIR, 'jifunze-generate-demo.webm')
const SHOT_BEFORE = path.join(SCREENSHOTS_DIR, 'before-generate.png')
const SHOT_AFTER = path.join(SCREENSHOTS_DIR, 'after-result.png')

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms))

function headed(): boolean {
  return process.argv.includes('--headed') || process.env.HEADED === '1'
}

/**
 * Selector strategy (robust for current /generate UI):
 *
 * 1) Topic — `input[maxlength="180"]`
 *    The public page uses a single topic field with maxLength 180. This is more stable than
 *    placeholder text (copy can change) and avoids relying on label/for wiring.
 *
 * 2) Platform / tone — `select` nth(0) and nth(1)
 *    Layout is fixed: first grid row is Platform, second is Tone. Using option labels matches
 *    visible text ("Instagram", "Professional") regardless of internal value strings.
 *
 * 3) Generate — `getByRole('button', { name: /^Generate$/ })`
 *    Explicit accessible name; avoids matching unrelated buttons.
 *
 * 4) Success — wait for the result card’s hashtag line (`.font-mono` with `#`) which only appears
 *    after a successful generation (empty state does not show monospace hashtags).
 */
async function runFlow(page: Page): Promise<void> {
  await page.goto(DEMO_URL, { waitUntil: 'domcontentloaded', timeout: 60_000 })
  await page.waitForLoadState('networkidle', { timeout: 45_000 }).catch(() => undefined)
  await delay(900)

  const topic = page.locator('input[maxlength="180"]').first()
  await topic.waitFor({ state: 'visible', timeout: 30_000 })
  await topic.click()
  await delay(350)
  await topic.fill('')
  await topic.pressSequentially(TOPIC, { delay: 58 })
  await delay(500)

  const platformSelect = page.locator('select').nth(0)
  const toneSelect = page.locator('select').nth(1)
  await platformSelect.waitFor({ state: 'visible', timeout: 15_000 })
  await platformSelect.selectOption({ label: 'Instagram' })
  await delay(450)
  await toneSelect.selectOption({ label: 'Professional' })
  await delay(550)

  await page.screenshot({ path: SHOT_BEFORE, fullPage: true })
  await delay(300)

  const generateBtn = page.getByRole('button', { name: /^Generate$/ })
  await generateBtn.click()

  await page.getByRole('button', { name: /Generating/ }).waitFor({ state: 'visible', timeout: 15_000 }).catch(() => {})
  const hashtagsLine = page.locator('section').filter({ hasText: 'Result' }).locator('.font-mono').filter({ hasText: /#/ })
  await hashtagsLine.waitFor({ state: 'visible', timeout: 120_000 })

  await page.screenshot({ path: SHOT_AFTER, fullPage: true })

  const pauseMs = 4500 + Math.floor(Math.random() * 2000)
  await delay(pauseMs)
}

async function attempt(context: BrowserContext): Promise<void> {
  const page = await context.newPage()
  const video = page.video()
  let succeeded = false
  try {
    await runFlow(page)
    succeeded = true
  } finally {
    await page.close().catch(() => undefined)
    if (succeeded && video) {
      const raw = await video.path().catch(() => null)
      if (raw && existsSync(raw)) {
        copyFileSync(raw, FINAL_VIDEO)
        if (path.resolve(raw) !== path.resolve(FINAL_VIDEO)) {
          try {
            unlinkSync(raw)
          } catch {
            /* keep duplicate if OS locks file briefly */
          }
        }
      }
    }
  }
}

async function main(): Promise<void> {
  mkdirSync(VIDEOS_DIR, { recursive: true })
  mkdirSync(SCREENSHOTS_DIR, { recursive: true })

  const useHeaded = headed()
  let browser: Browser | undefined

  const runOnce = async () => {
    browser = await chromium.launch({
      headless: !useHeaded,
      slowMo: useHeaded ? 90 : 75,
    })
    const context = await browser.newContext({
      viewport: { width: 1080, height: 1920 },
      recordVideo: {
        dir: VIDEOS_DIR,
        size: { width: 1080, height: 1920 },
      },
    })
    try {
      await attempt(context)
    } finally {
      await context.close()
      await browser.close()
      browser = undefined
    }
  }

  try {
    await runOnce()
  } catch (first) {
    console.error('[demo-generate-video] First attempt failed:', first)
    console.error('[demo-generate-video] Retrying once in 2s…')
    await delay(2000)
    await runOnce()
  }

  if (!existsSync(FINAL_VIDEO)) {
    throw new Error(
      [
        'Demo video was not written to the expected path.',
        'Common blockers:',
        '- Chromium not installed: run `npx playwright install chromium`',
        '- Network / site unreachable',
        '- UI changed (selectors no longer match)',
        '- Generation failed or timed out before hashtags appeared',
      ].join('\n'),
    )
  }

  console.log('[demo-generate-video] Done.')
  console.log('[demo-generate-video] Video:', FINAL_VIDEO)
  console.log('[demo-generate-video] Screenshot (before):', SHOT_BEFORE)
  console.log('[demo-generate-video] Screenshot (after):', SHOT_AFTER)
}

main().catch((e) => {
  console.error('[demo-generate-video] FAILED after retry:', e)
  process.exit(1)
})
