/**
 * Lightweight assertions for signed-in default routes (no Vitest in repo).
 * Run: npm run test:role-routing
 *
 * Post-pivot (Amendment 003): admins land in the admin console; every other account stays on
 * the public site. Learner workspaces no longer exist.
 */
import { resolveAccessTier } from '../src/access/appAccess'
import { isAdminTier } from '../src/lib/admin/adminAccess'
import {
  ADMIN_DEFAULT_SIGNED_IN_PATH,
  defaultPostAuthPathForTier,
  LEARNER_DEFAULT_SIGNED_IN_PATH,
  resolvePostAuthNavigatePath,
} from '../src/lib/signedInDefaultRoute'

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg)
}

const superEmail = 'neuralbuildlab.ai@gmail.com'
const platEmail = 'neuralbuild.ai@gmail.com'

assert(isAdminTier(resolveAccessTier(superEmail)), 'super email tier')
assert(isAdminTier(resolveAccessTier(platEmail)), 'platform email tier')
assert(!isAdminTier(resolveAccessTier('visitor@example.com')), 'non-admin tier')

assert(ADMIN_DEFAULT_SIGNED_IN_PATH === '/admin', 'admin default is the admin console')
assert(LEARNER_DEFAULT_SIGNED_IN_PATH === '/', 'non-admin default is the public site')

assert(defaultPostAuthPathForTier('super_admin') === ADMIN_DEFAULT_SIGNED_IN_PATH, 'super default')
assert(defaultPostAuthPathForTier('platform_admin') === ADMIN_DEFAULT_SIGNED_IN_PATH, 'platform default')
assert(defaultPostAuthPathForTier('member') === '/', 'member default is public site')

assert(resolvePostAuthNavigatePath(superEmail, null) === ADMIN_DEFAULT_SIGNED_IN_PATH, 'super no return')
assert(resolvePostAuthNavigatePath('a@b.com', null) === '/', 'non-admin no return')

assert(
  resolvePostAuthNavigatePath(superEmail, encodeURIComponent('/admin/social-ops')) === '/admin/social-ops',
  'admin explicit admin path honoured',
)
assert(
  resolvePostAuthNavigatePath(superEmail, encodeURIComponent('/dashboard')) === ADMIN_DEFAULT_SIGNED_IN_PATH,
  'retired learner path never honoured',
)
assert(
  resolvePostAuthNavigatePath('x@y.com', encodeURIComponent('/admin')) === '/',
  'non-admins cannot be sent to admin via returnUrl',
)
assert(
  resolvePostAuthNavigatePath(superEmail, encodeURIComponent('https://evil.example/admin')) === ADMIN_DEFAULT_SIGNED_IN_PATH,
  'absolute returnUrl rejected',
)

console.log('role default routes OK')
