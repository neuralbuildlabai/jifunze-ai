/**
 * Two-hour social metrics sync — CLI entry point.
 *
 *   npm run social:sync:dry-run     # decides everything, writes nothing
 *   npm run social:sync             # writes snapshots (server-side credentials required)
 *
 * Flags:
 *   --dry-run            never write, whatever the environment says
 *   --platform=<id>      restrict to one platform (repeatable)
 *
 * Exit code is 0 when at least one platform refreshed OR the run was a dry run. A run where every
 * platform is merely `skipped` (missing credentials — the expected state today) is also 0: that is
 * the current, known reality and must not fail CI every two hours.
 * Exit code 1 means at least one platform FAILED for an unexpected reason.
 */
import type { PlatformId } from '../src/social/platformMatrix.ts'
import { PLATFORM_MATRIX } from '../src/social/platformMatrix.ts'
import { NullSyncStore, runSocialSync, type SyncStore } from '../orchestrator/social/sync.ts'
import { SupabaseSyncStore } from '../orchestrator/social/store.ts'

const argv = process.argv.slice(2)
const dryRun = argv.includes('--dry-run') || process.env.DRY_RUN === 'true'
const requested = argv
  .filter((a) => a.startsWith('--platform='))
  .map((a) => a.split('=')[1] as PlatformId)

const known = new Set(PLATFORM_MATRIX.map((p) => p.id))
for (const p of requested) {
  if (!known.has(p)) {
    console.error(`Unknown platform: ${p}`)
    process.exit(2)
  }
}

const persistent = dryRun ? null : SupabaseSyncStore.fromEnv()
if (!dryRun && !persistent) {
  console.error(
    'SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for a writing run. ' +
      'Re-run with --dry-run to decide everything without writing.',
  )
  process.exit(2)
}

const store: SyncStore = persistent ?? new NullSyncStore()

const result = await runSocialSync({
  env: process.env,
  store,
  dryRun,
  platforms: requested.length ? requested : undefined,
})

const failed = result.platforms.filter((p) => p.status === 'failed')
const skipped = result.platforms.filter((p) => p.status === 'skipped')
const ok = result.platforms.filter((p) => p.status === 'ok')

console.log('')
console.log(`run ${result.runId}${result.dryRun ? ' (dry run — nothing written)' : ''}`)
console.log(`  refreshed : ${ok.map((p) => p.platform).join(', ') || 'none'}`)
console.log(`  skipped   : ${skipped.map((p) => p.platform).join(', ') || 'none'}`)
console.log(`  failed    : ${failed.map((p) => p.platform).join(', ') || 'none'}`)
for (const s of skipped) console.log(`    - ${s.platform}: ${s.reason}`)
for (const f of failed) console.log(`    ! ${f.platform}: ${f.reason}`)
for (const a of result.alerts) console.log(`  alert [${a.severity}] ${a.code}: ${a.message}`)
console.log('')

process.exit(failed.length ? 1 : 0)
