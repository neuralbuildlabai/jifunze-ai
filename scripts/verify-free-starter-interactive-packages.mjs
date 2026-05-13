/**
 * Unified verifier for public free-starter embedded interactive course packages.
 * Run: node scripts/verify-free-starter-interactive-packages.mjs
 */
import { verifyFreeStarterInteractivePackage } from './lib/verify-free-starter-interactive.mjs'

const SLUGS = [
  'smart-workflows-with-ai',
  'ai-at-work-chatgpt',
  'business-analytics-decision-making',
  '5-day-mental-wellbeing-reset',
]

function main() {
  for (const slug of SLUGS) {
    verifyFreeStarterInteractivePackage(slug)
    console.log(`verify-free-starter: ${slug} ok`)
  }
  console.log('verify-free-starter-interactive-packages: ok')
}

main()
