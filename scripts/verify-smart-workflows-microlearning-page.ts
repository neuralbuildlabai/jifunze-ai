/**
 * Static checks for Smart Workflows microlearning detail page copy and wiring.
 * Run: npx tsx scripts/verify-smart-workflows-microlearning-page.ts
 */
import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

import {
  SMART_WORKFLOWS_MICROLEARNING_LESSON_FLOW,
  SMART_WORKFLOWS_MICROLEARNING_OUTCOMES,
} from '../src/data/learning/smartWorkflowsMicrolearningPageCopy'

const REPO_ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

function main() {
  const embedded = spawnSync(
    'node',
    [join(REPO_ROOT, 'scripts/verify-smart-workflows-interactive-package.mjs')],
    { cwd: REPO_ROOT, stdio: 'inherit' },
  )
  assert.equal(embedded.status, 0, 'verify-smart-workflows-interactive-package must pass')

  assert.equal(SMART_WORKFLOWS_MICROLEARNING_LESSON_FLOW.length, 9)
  assert.equal(SMART_WORKFLOWS_MICROLEARNING_OUTCOMES.length, 6)

  const pagePath = join(REPO_ROOT, 'src/components/learn/SmartWorkflowsWithAiFreeStarterPage.tsx')
  const pageSrc = readFileSync(pagePath, 'utf8')
  const lower = pageSrc.toLowerCase()

  assert.ok(!/\bRise\b/.test(pageSrc), 'page component must not contain product name Rise as a word')
  assert.ok(!lower.includes('articulate'), 'page component must not contain Articulate')
  assert.ok(!lower.includes('account-wide'), 'no account-wide sync copy in page source')
  assert.ok(!lower.includes('sync is available'), 'no sync availability copy in page source')
  assert.ok(!lower.includes('marked complete'), 'no marked-complete banner in page source')
  assert.ok(!lower.includes('mark complete'), 'no mark-complete control in page source')
  assert.ok(!lower.includes('learnercompletionnote'), 'must not render catalog completion note')

  assert.ok(pageSrc.includes('Start workshop'), 'primary CTA label')
  assert.ok(pageSrc.includes('Open in new window'), 'secondary open link label')

  console.log('verify-smart-workflows-microlearning-page: ok')
}

main()
