/**
 * Verifies every production embedded course package under public/course-assets/interactive/
 * (skips _backup*). Checks index.html relative href/src resolve on disk, then runs
 * Jifunze branding checks on the free-starter embedded packages when present.
 *
 * Run: node scripts/verify-embedded-course-packages.mjs
 */
import { spawnSync } from 'node:child_process'
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const INTERACTIVE = join(ROOT, 'public/course-assets/interactive')

function assertIndexAssets(contentDir) {
  const htmlPath = join(contentDir, 'index.html')
  if (!existsSync(htmlPath)) return
  const html = readFileSync(htmlPath, 'utf8')
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1])
  const srcs = [...html.matchAll(/src="([^"]+)"/g)].map((m) => m[1])
  for (const rel of [...hrefs, ...srcs]) {
    if (rel.startsWith('http')) continue
    const abs = join(contentDir, rel)
    if (!existsSync(abs)) throw new Error(`missing asset in ${contentDir}: ${rel}`)
  }
}

function main() {
  if (!existsSync(INTERACTIVE)) throw new Error(`missing ${INTERACTIVE}`)
  const names = readdirSync(INTERACTIVE).filter((n) => {
    if (n.startsWith('_') || n.startsWith('.')) return false
    const p = join(INTERACTIVE, n)
    return statSync(p).isDirectory()
  })
  if (names.length === 0) throw new Error('no interactive packages found')
  for (const name of names) {
    const contentDir = join(INTERACTIVE, name, 'content')
    if (!existsSync(contentDir)) {
      console.warn(`verify-embedded: skip ${name} (no content/)`)
      continue
    }
    assertIndexAssets(contentDir)
  }
  console.log('verify-embedded-course-packages: ok', { packages: names })

  const r = spawnSync(process.execPath, [join(ROOT, 'scripts', 'verify-free-starter-interactive-packages.mjs')], {
    stdio: 'inherit',
  })
  if (r.status !== 0) throw new Error(`verify-free-starter-interactive-packages failed with exit ${r.status}`)
}

main()
