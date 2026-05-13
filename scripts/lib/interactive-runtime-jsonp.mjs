/**
 * Read/write __jsonp("runtime-data.js","<base64(json)>") embedded runtime bundles.
 * Used by verify and patch scripts — does not touch lib/**.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const WRAPPER_RE = /^__jsonp\("runtime-data\.js","([^"]*)"\)\s*;?\s*$/m

/**
 * @param {string} contentDir absolute path to …/content
 * @returns {{ raw: string, path: string }}
 */
export function decodeRuntimeDataJson(contentDir) {
  const path = join(contentDir, 'runtime-data.js')
  const s = readFileSync(path, 'utf8').trimEnd()
  const m = s.match(WRAPPER_RE)
  if (!m) throw new Error(`runtime-data.js: missing __jsonp wrapper in ${path}`)
  const raw = Buffer.from(m[1], 'base64').toString('utf8')
  return { raw, path }
}

/**
 * @param {string} contentDir
 * @param {string} raw decoded JSON text (not an object)
 */
export function encodeRuntimeDataJson(contentDir, raw) {
  const path = join(contentDir, 'runtime-data.js')
  JSON.parse(raw)
  const b64 = Buffer.from(raw, 'utf8').toString('base64')
  writeFileSync(path, `__jsonp("runtime-data.js","${b64}");`, 'utf8')
}
