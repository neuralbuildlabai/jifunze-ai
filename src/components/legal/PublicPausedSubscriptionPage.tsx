import { Link } from 'react-router-dom'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'

/**
 * Anonymous-safe paused billing surface when learner monetization UI is disabled.
 * Mirrors the copy shown in workspace billing, without `WorkspaceRouteReady` (no signed-in shell required).
 */
export function PublicPausedSubscriptionPage() {
  return (
    <div className="jf-public-surface min-h-screen w-full bg-gradient-to-b from-[#1c2028] via-[#1a1e26] to-[#16191f] px-4 py-10 text-[color:var(--jf-text)] sm:px-6 sm:py-12">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-6">
          <JifunzeBrandLogo to="/" size="sm" variant="compact" surface="dark" />
          <Link className="text-[13px] font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to={LEGAL_ROUTES.learn}>
            Catalog
          </Link>
        </header>
        <div data-testid="public-subscription-paused" className="space-y-3">
          <h1 className="text-2xl font-semibold tracking-tight text-[color:var(--jf-text)]">Plans & billing</h1>
          <p className="text-[13px] font-medium text-[color:var(--jf-muted)]">Checkout is not enabled in this workspace phase.</p>
          <p className="text-sm leading-relaxed text-[color:var(--jf-muted)]">
            Plans are not available yet. Catalog and course routes stay open for internal review; paid tiers will return as a later layer.
          </p>
          <Link
            className="mt-2 inline-flex rounded-full border border-white/[0.12] px-5 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] hover:bg-white/[0.05]"
            to="/"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}
