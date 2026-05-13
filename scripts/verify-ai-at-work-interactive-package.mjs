/**
 * Verifies the AI at Work embedded package (runtime + index assets + host overrides).
 * Run: node scripts/verify-ai-at-work-interactive-package.mjs
 */
import { verifyFreeStarterInteractivePackage } from './lib/verify-free-starter-interactive.mjs'

function main() {
  verifyFreeStarterInteractivePackage('ai-at-work-chatgpt')
  console.log('verify-ai-at-work-interactive-package: ok')
}

main()
