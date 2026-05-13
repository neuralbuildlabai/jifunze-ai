import { AdminSystemAccountsPanel } from './AdminSystemAccountsPanel'
import { useAdminAccess } from '../useAdminAccess'

export function AdminSettingsPage() {
  const { isSuperAdmin, isPlatformAdmin, tier } = useAdminAccess()

  return (
    <div className="mx-auto max-w-5xl space-y-8" data-testid="admin-settings-page">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Settings</h1>
        <p className="mt-1 text-sm text-zinc-600">
          Read-first operator view. Dangerous toggles stay in Supabase / infrastructure — not editable from this screen.
        </p>
      </div>
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Your access</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Effective tier: <span className="font-mono text-xs">{tier}</span>.{' '}
          {isSuperAdmin
            ? 'Super admin: destructive learner progress resets and certificate writes are available where implemented.'
            : 'Platform admin: day-to-day operations — super-only destructive controls stay disabled.'}
        </p>
      </section>
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Role management</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Global roles are enforced by <code className="rounded bg-zinc-100 px-1">public.my_effective_access_tier</code> with canonical
          operator emails and optional <code className="rounded bg-zinc-100 px-1">profiles.global_access_tier</code> (service-role updates in
          Supabase). There is no self-serve role editor in the product UI by design — granting{' '}
          <span className="font-mono text-xs">super_admin</span> or <span className="font-mono text-xs">platform_admin</span> must be deliberate,
          audited, and performed with server-side tools (SQL / Studio), never frontend-only.
        </p>
        {isPlatformAdmin && !isSuperAdmin ? (
          <p className="mt-3 text-sm text-amber-900">
            Platform admins cannot list every auth account from this UI. Use Supabase Studio for privileged identity review when needed.
          </p>
        ) : null}
      </section>
      <section className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
        <h2 className="text-sm font-semibold text-zinc-900">Admin users & system accounts</h2>
        <p className="mt-2 text-sm text-zinc-600">
          Canonical operator resolution and full account summaries are loaded from admin-only RPCs. Passwords, refresh tokens, and provider
          secrets are never returned.
        </p>
        {isSuperAdmin ? (
          <AdminSystemAccountsPanel />
        ) : (
          <AdminSystemAccountsPanel readOnlyMessage="Full system account listing and canonical operator diagnostics are restricted to super admins. If you need a learner lookup, use the Learners page." />
        )}
      </section>
    </div>
  )
}
