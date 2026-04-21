import { Link } from 'react-router-dom'
import { AuthForm } from '../AuthForm'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'
import { LEGAL_ROUTES } from '../../training/trustCopy'

export function AuthSignUpPage() {
  return (
    <div className="jf-public-surface min-h-screen w-full bg-[var(--jf-bg-page)] text-[var(--jf-text)]">
      <div className="relative mx-auto max-w-md px-5 pb-16 pt-10 sm:px-8">
        <header className="flex flex-col items-center gap-6 pb-10 text-center">
          <JifunzeBrandLogo to="/" size="xl" surface="dark" />
          <p className="text-[13px] leading-relaxed text-[color:var(--jf-muted)]">Create an account to follow courses, lessons, and checkpoints.</p>
        </header>
        <div className="flex flex-col items-center gap-6">
          <AuthForm initialMode="signup" appearance="default" />
          <p className="text-center text-[13px] text-[color:var(--jf-muted)]">
            Already have an account?{' '}
            <Link className="font-semibold text-violet-300 hover:text-violet-200" to={LEGAL_ROUTES.authSignIn}>
              Sign in
            </Link>
          </p>
          <Link className="text-[12px] text-zinc-500 hover:text-zinc-300" to="/">
            ← Back to home
          </Link>
          <TrustLegalFooterLinks variant="compact" className="justify-center text-[color:var(--jf-subtle)]" />
        </div>
      </div>
    </div>
  )
}
