/**
 * Lightweight assertions for signed-in default routes (no Vitest in repo).
 * Run: npm run test:role-routing
 */
import { resolveAccessTier } from '../src/access/appAccess'
import { isAdminTier } from '../src/lib/admin/adminAccess'
import {
  ADMIN_DEFAULT_SIGNED_IN_PATH,
  defaultPostAuthPathForTier,
  LEARNER_DEFAULT_SIGNED_IN_PATH,
  resolvePostAuthNavigatePath,
} from '../src/lib/signedInDefaultRoute'
import { humanizeEmailLocalPart } from '../src/lib/learnerProfileDisplay'

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(msg)
}

const superEmail = 'neuralbuildlab.ai@gmail.com'
const platEmail = 'neuralbuild.ai@gmail.com'

assert(isAdminTier(resolveAccessTier(superEmail)), 'super email tier')
assert(isAdminTier(resolveAccessTier(platEmail)), 'platform email tier')
assert(!isAdminTier(resolveAccessTier('learner@example.com')), 'learner tier')

assert(defaultPostAuthPathForTier('super_admin') === ADMIN_DEFAULT_SIGNED_IN_PATH, 'super default')
assert(defaultPostAuthPathForTier('platform_admin') === ADMIN_DEFAULT_SIGNED_IN_PATH, 'platform default')
assert(defaultPostAuthPathForTier('member') === LEARNER_DEFAULT_SIGNED_IN_PATH, 'member default')

assert(resolvePostAuthNavigatePath(superEmail, null) === ADMIN_DEFAULT_SIGNED_IN_PATH, 'super no return')
assert(resolvePostAuthNavigatePath('a@b.com', null) === LEARNER_DEFAULT_SIGNED_IN_PATH, 'learner no return')

assert(resolvePostAuthNavigatePath(superEmail, encodeURIComponent('/learn')) === '/learn', 'super explicit learn')
assert(resolvePostAuthNavigatePath(superEmail, encodeURIComponent('/dashboard')) === ADMIN_DEFAULT_SIGNED_IN_PATH, 'super dashboard override')

assert(
  resolvePostAuthNavigatePath('x@y.com', encodeURIComponent('/admin/dashboard')) === LEARNER_DEFAULT_SIGNED_IN_PATH,
  'learners cannot be sent to admin via returnUrl',
)

assert(humanizeEmailLocalPart('neuralbuildlab.ai@gmail.com') === 'Neuralbuildlab', 'email local humanize')

console.log('test:role-routing OK')
