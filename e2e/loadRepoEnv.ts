import { readFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

/** Merge KEY=VAL lines into `process.env`. When `override` is false, existing keys win. */
export function mergeEnvFile(relPath: string, override = false): void {
  const p = resolve(process.cwd(), relPath)
  if (!existsSync(p)) return
  const raw = readFileSync(p, 'utf8')
  for (const line of raw.split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#')) continue
    const eq = t.indexOf('=')
    if (eq <= 0) continue
    const k = t.slice(0, eq).trim()
    let v = t.slice(eq + 1).trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1)
    }
    if (override || !process.env[k]) process.env[k] = v
  }
}
