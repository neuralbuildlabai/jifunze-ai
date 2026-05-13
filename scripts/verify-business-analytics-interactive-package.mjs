/**
 * Verifies the Business Analytics free-starter embedded package.
 * Run: node scripts/verify-business-analytics-interactive-package.mjs
 */
import { verifyFreeStarterInteractivePackage } from './lib/verify-free-starter-interactive.mjs'

function main() {
  verifyFreeStarterInteractivePackage('business-analytics-decision-making')
  console.log('verify-business-analytics-interactive-package: ok')
}

main()
