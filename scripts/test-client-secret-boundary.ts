/**
 * Client secret boundary test — runs in CI without a browser.
 *
 * Proves three things that the 2026-08-20 security review established as invariants:
 *   1. No client-side maintenance bypass token exists anywhere in shipped source.
 *   2. No source file reads `import.meta.env` with a dynamic key. Dynamic indexing defeats Vite's
 *      per-key `define` replacement and causes the *entire* env record — every `VITE_*` value — to
 *      be inlined into the public bundle. That is exactly how the bypass token leaked into `dist/`.
 *   3. If a build exists, the built bundle contains no bypass-token name, no `VERCEL_OIDC_TOKEN`,
 *      and no reference to the retired `generate-content` / `generate-public` Edge Functions.
 *
 * Run: `npx tsx scripts/test-client-secret-boundary.ts`
 * Never prints file contents — only paths, names and counts.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const failures: string[] = []
const notes: string[] = []

function walk(dir: string, exts: string[], out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    if (entry === 'node_modules' || entry === '.git' || entry.startsWith('.fuse_hidden')) continue
    const full = join(dir, entry)
    let st
    try {
      st = statSync(full)
    } catch {
      continue
    }
    if (st.isDirectory()) walk(full, exts, out)
    else if (exts.some((e) => entry.endsWith(e))) out.push(full)
  }
  return out
}

// ---------------------------------------------------------------- 1. no bypass token in source
const SOURCE_DIRS = ['src', 'e2e', 'orchestrator', 'render', 'scripts', 'supabase/functions']
const sourceFiles = SOURCE_DIRS.filter((d) => existsSync(join(ROOT, d))).flatMap((d) =>
  walk(join(ROOT, d), ['.ts', '.tsx', '.js', '.mjs', '.sql', '.toml']),
)

/**
 * A live reference is an actual read/assignment. Prose in a comment explaining that the bypass was
 * removed is allowed and desirable — that is the institutional memory that stops it coming back.
 */
const LIVE_BYPASS = /(?<!`)\bimport\.meta\.env\.VITE_MAINTENANCE_BYPASS_TOKEN\b|VITE_MAINTENANCE_BYPASS_TOKEN\s*[:=]\s*['"`]/
for (const f of sourceFiles) {
  const text = readFileSync(f, 'utf8')
  if (LIVE_BYPASS.test(text)) {
    failures.push(`live VITE_MAINTENANCE_BYPASS_TOKEN reference in ${relative(ROOT, f)}`)
  }
}

// also: no code may still compare a bypass query param
for (const f of sourceFiles) {
  const text = readFileSync(f, 'utf8')
  if (/getItem\(\s*['"`]jf_maintenance_preview_v1/.test(text) || /setItem\(\s*['"`]jf_maintenance_preview_v1/.test(text)) {
    failures.push(`maintenance bypass session key still read/written in ${relative(ROOT, f)}`)
  }
}

// ------------------------------------------------- 2. no dynamic import.meta.env indexing in src
const DYNAMIC_ENV = [
  /import\.meta\.env\s*\)?\s*\[/,
  /import\.meta\.env\s+as\s+Record<[^>]*>\s*\)?\s*\[/,
  /\(\s*env\s+as\s+Record<[^>]*>[^)]*\)\s*\?\.\[/,
  // `(import.meta as { env?: Record<string, unknown> }).env` — holding the whole record also
  // defeats per-key replacement, even though no bracket index appears.
  /import\.meta\s+as\s+\{\s*env\?:\s*Record</,
  /Object\.keys\(\s*import\.meta\.env/,
  /\{\s*\.\.\.import\.meta\.env/,
]

/**
 * Strip comments before matching. Comments explaining *why* dynamic indexing is banned are the
 * point of the rule surviving; only real code should trip the check.
 */
function stripComments(text: string): string {
  return text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:])\/\/.*$/gm, '$1')
}

for (const f of sourceFiles.filter((f) => f.includes(`${ROOT}/src/`))) {
  const text = stripComments(readFileSync(f, 'utf8'))
  for (const re of DYNAMIC_ENV) {
    if (re.test(text)) {
      failures.push(
        `dynamic import.meta.env indexing in ${relative(ROOT, f)} — inlines the whole env record into the public bundle`,
      )
      break
    }
  }
}

// -------------------------------------------------------------------- 3. built bundle assertions
const DIST = join(ROOT, 'dist')
const FORBIDDEN_IN_BUNDLE = [
  'VITE_MAINTENANCE_BYPASS_TOKEN',
  'MAINTENANCE_BYPASS_TOKEN',
  'VERCEL_OIDC_TOKEN',
  'jf_maintenance_bypass',
  'jf_maintenance_preview_v1',
  'generate-content',
  'generate-public',
]
if (existsSync(DIST)) {
  const bundleFiles = walk(DIST, ['.js', '.mjs', '.css', '.html', '.json', '.map'])
  for (const needle of FORBIDDEN_IN_BUNDLE) {
    const hits = bundleFiles.filter((f) => readFileSync(f, 'utf8').includes(needle))
    if (hits.length > 0) {
      failures.push(
        `bundle contains "${needle}" in ${hits.length} file(s): ${hits.map((h) => relative(ROOT, h)).join(', ')}`,
      )
    }
  }
  notes.push(`scanned ${bundleFiles.length} built file(s) in dist/`)
} else {
  notes.push('dist/ not present — bundle assertions skipped (run `npm run build` first)')
}

// --------------------------------------------------------------------------------------- report
for (const n of notes) console.log(`note: ${n}`)
if (failures.length > 0) {
  console.error(`\nFAIL — ${failures.length} client secret boundary violation(s):`)
  for (const f of failures) console.error(`  - ${f}`)
  process.exit(1)
}
console.log(`\nPASS — client secret boundary intact (${sourceFiles.length} source files checked).`)
