import { Link } from 'react-router-dom'
import { useAppAccess } from '../../access/useAppAccess'
import { LEGAL_ROUTES, TRUST_COPY } from '../../training/trustCopy'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { useWorkspaceGeneratorReady } from '../../workspace/WorkspaceGeneratorContext'
import { WorkspaceRouteReady, WorkspaceRouteShell } from './WorkspaceRouteReady'
import { LearnerAccountPage } from './LearnerAccountPage'

function WorkspaceSettingsPageInner() {
  const { brands, brandId, setBrandId, brand, socialAccounts } =
    useWorkspaceGeneratorReady()

  return (
    <WorkspaceRouteShell
        title="Settings"
        subtitle="Your workspace profile, connected accounts, and preferences. Internal diagnostics live under Platform for operators."
      >
        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-4 space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
            Workspace
          </h2>
          <label className="block space-y-1">
            <span className="text-xs text-zinc-500">Brand / workspace name</span>
            <select
              value={brandId}
              onChange={(e) => setBrandId(e.target.value)}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500/50"
            >
              {brands.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.name}
                </option>
              ))}
            </select>
          </label>
          <p className="text-xs leading-relaxed text-zinc-500">
            Focus &amp; domains:{' '}
            <span className="text-zinc-300">{brand.primaryDomain}</span>
            {brand.secondaryDomains?.length ? (
              <>
                {' '}
                · Also:{' '}
                <span className="text-zinc-300">{brand.secondaryDomains.join(', ')}</span>
              </>
            ) : null}
          </p>
          <p className="text-[11px] leading-relaxed text-zinc-600">
            Connected accounts:{' '}
            {socialAccounts.length ? (
              <span className="text-zinc-400">
                {socialAccounts.map((a) => `${a.platform} @${a.handle}`).join(' · ')}
              </span>
            ) : (
              <span className="text-zinc-500">None yet — connect surfaces on your brand profile.</span>
            )}
          </p>
        </section>

        <section className="rounded-2xl border border-zinc-800/80 bg-zinc-900/35 p-4 space-y-2">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Plan &amp; billing</h2>
          <TrustBoundaryStrip compact dataTestId="settings-billing-trust-boundary" />
          <p className="text-[11px] leading-relaxed text-zinc-600">{TRUST_COPY.affiliationCheckoutReminder}</p>
          <p className="text-[12px] leading-relaxed text-zinc-500">
            Compare{' '}
            <Link className="font-medium text-violet-300 hover:text-violet-200" to={LEGAL_ROUTES.pricing}>
              public pricing
            </Link>
            , then open{' '}
            <Link className="font-medium text-violet-300 hover:text-violet-200" to={LEGAL_ROUTES.workspaceSubscription}>
              Plans &amp; subscription
            </Link>{' '}
            for your workspace tier and billing readiness—paid access remains assistive tooling only (
            <Link className="text-violet-300 hover:text-violet-200" to={LEGAL_ROUTES.refunds}>
              refunds policy
            </Link>
            ).
          </p>
          <p className="text-[11px] leading-relaxed text-zinc-600">{TRUST_COPY.subscriptionProductBoundary}</p>
          <p className="text-[11px] leading-relaxed text-zinc-600">{TRUST_COPY.notAnAccreditedInstitution}</p>
          <p className="text-[11px] leading-relaxed text-zinc-600">{TRUST_COPY.selfServeAgeGuidance}</p>
        </section>

    </WorkspaceRouteShell>
  )
}

export function WorkspaceSettingsPage() {
  return (
    <WorkspaceRouteReady>
      <WorkspaceSettingsPageInner />
    </WorkspaceRouteReady>
  )
}

/** Operators see full workspace settings; learners get the lighter Account surface. */
export function WorkspaceSettingsOrAccountPage() {
  const { navVariant } = useAppAccess()
  if (navVariant === 'learner') {
    return <LearnerAccountPage />
  }
  return <WorkspaceSettingsPage />
}
