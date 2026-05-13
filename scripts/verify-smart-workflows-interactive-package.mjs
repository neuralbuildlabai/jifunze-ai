/**
 * Verifies the Smart Workflows embedded package under public/course-assets/interactive/…
 * Run: node scripts/verify-smart-workflows-interactive-package.mjs
 */
import { verifyFreeStarterInteractivePackage } from './lib/verify-free-starter-interactive.mjs'

function main() {
  verifyFreeStarterInteractivePackage('smart-workflows-with-ai')
  console.log('verify-smart-workflows-interactive-package: ok')
}

main()
