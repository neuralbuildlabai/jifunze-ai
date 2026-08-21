import { Link } from 'react-router-dom'
import { LEGAL_ROUTES } from '../shared/legalRoutes'
import { JifunzeBrandLogo } from './brand/JifunzeBrandLogo'
import { TrustLegalFooterLinks } from './TrustLegalFooterLinks'

export function NotFoundPage() {
  return (
    <div className="jf-public-surface flex min-h-screen w-full flex-col bg-[var(--jf-bg-page)] px-5 py-12 text-[color:var(--jf-text)] sm:px-8">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center text-center">
        <JifunzeBrandLogo to="/" size="lg" surface="dark" />
        <p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.16em] text-[color:var(--jf-muted)]">404</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[color:var(--jf-text)]">Page not found</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-[color:var(--jf-muted)]">
          That link may be outdated or mistyped. Try the pathways hub, the course catalog, or return home.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-6 py-2.5 text-sm font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] hover:bg-[var(--jf-brand-hover)]"
            to={LEGAL_ROUTES.paths}
          >
            Employable pathways
          </Link>
          <Link
            className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full border border-[color:var(--jf-border)] px-6 py-2.5 text-sm font-semibold text-[color:var(--jf-text)] hover:bg-white/[0.05]"
            to={LEGAL_ROUTES.learn}
          >
            Course catalog
          </Link>
          <Link className="inline-flex min-h-[2.75rem] items-center justify-center px-4 text-sm font-medium text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]" to="/">
            Home
          </Link>
        </div>
      </div>
      <footer className="mx-auto mt-12 w-full max-w-lg pb-6">
        <TrustLegalFooterLinks variant="compact" className="justify-center text-[color:var(--jf-subtle)]" />
      </footer>
    </div>
  )
}
