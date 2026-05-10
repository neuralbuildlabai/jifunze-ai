/**
 * Ensures hosted Rise entry HTML is present in dist/ after `npm run build`.
 * Run: `npm run verify:hosted-rise-dist`
 */
import assert from 'node:assert/strict'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const PATHS = [
  'dist/course-assets/rise/smart-workflows-with-ai/content/index.html',
  'dist/course-assets/rise/ai-at-work-chatgpt/content/index.html',
  'dist/course-assets/rise/ai-productivity-smart-workflows/content/index.html',
] as const

function main() {
  for (const rel of PATHS) {
    const abs = join(REPO_ROOT, rel)
    assert.ok(existsSync(abs), `missing after build: ${rel}`)
  }
  console.log('verify-hosted-rise-dist: ok')
}

main()
