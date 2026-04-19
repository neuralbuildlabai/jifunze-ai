#!/usr/bin/env node
/**
 * Prints the Supabase project ref from VITE_SUPABASE_URL (from process.env or `.env`).
 * Does not print secrets.
 */
import fs from 'node:fs'
import path from 'node:path'

function readEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return {}
  const out = {}
  for (const line of fs.readFileSync(filePath, 'utf8').split('\n')) {
    const m = /^([A-Z0-9_]+)=(.*)$/.exec(line.trim())
    if (!m) continue
    let v = m[2].trim()
    if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
      v = v.slice(1, -1)
    }
    out[m[1]] = v
  }
  return out
}

const root = process.cwd()
const fromFile = readEnvFile(path.join(root, '.env'))
const url = (process.env.VITE_SUPABASE_URL || fromFile.VITE_SUPABASE_URL || '').trim()

if (!url) {
  console.error('No VITE_SUPABASE_URL in environment or .env — cannot infer project ref.')
  process.exit(1)
}

let ref = null
try {
  const u = new URL(url)
  const m = /^([a-z0-9]+)\.supabase\.co$/i.exec(u.hostname)
  ref = m ? m[1] : null
} catch {
  ref = null
}

console.log('VITE_SUPABASE_URL host:', (() => {
  try {
    return new URL(url).hostname
  } catch {
    return '(invalid URL)'
  }
})())
console.log('Inferred Supabase project ref:', ref ?? '(could not parse — check URL)')
console.log('')
console.log('If training tables are missing, apply migrations from supabase/migrations/ to this project.')
console.log('See docs/TRAINING_SCHEMA_DEPLOYMENT.md')
