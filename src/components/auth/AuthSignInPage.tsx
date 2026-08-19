import { Link, useLocation } from 'react-router-dom'
import { AuthForm } from '../AuthForm'
import { JifunzeBrandLogo } from '../brand/JifunzeBrandLogo'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'
import { LEGAL_ROUTES } from '../../training/trustCopy'

/**
 * Warm, learner-focused sign-in surface — aligned with the `/learn` warm shell.
 * Functionality (AuthForm + supabase wiring + return URLs) is unchanged.
 */
export function AuthSignInPage() {
  const { search } = useLocation()

  return (
    <div className="jf-learn-warm min-h-screen w-full bg-[var(--jf-bg-page)] text-[color:var(--jf-text)]">
      <div className="relative mx-auto w-full max-w-xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16">
        <header className="flex flex-col items-center gap-7 pb-10 text-center">
          <JifunzeBrandLogo to="/" size="xxl" surface="light" />
          <div className="space-y-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-orange-700">Jifunze</p>
            <h1 className="text-balance text-[1.7rem] font-semibold tracking-tight text-stone-900 sm:text-[2rem] sm:leading-[1.15]">
              Sign in to continue learning
            </h1>
            <p className="text-pretty text-[14px] leading-relaxed text-stone-600 sm:text-[15px]">
              Save your progress, continue your courses, and pick up where you left off.
            </p>
          </div>
        </header>

        <div className="flex flex-col items-center gap-5">
          <AuthForm initialMode="signin" appearance="warm" />
          <p className="text-center text-[13px] text-stone-600">
            New here?{' '}
            <Link
              className="font-semibold text-orange-700 underline-offset-2 hover:text-orange-800 hover:underline"
              to={{ pathname: LEGAL_ROUTES.authSignUp, search }}
            >
              Create an account
            </Link>
          </p>
          <p className="text-center text-[12px] leading-relaxed text-stone-500">
            Practical, guided learning from beginner to professional.
          </p>
          <Link className="text-[12px] font-medium text-stone-500 hover:text-stone-700" to="/">
            ← Back to home
          </Link>
          <TrustLegalFooterLinks
            variant="compact"
            className="justify-center text-stone-500 [&_a]:text-stone-600 [&_a]:hover:text-orange-700"
          />
        </div>
      </div>
    </div>
  )
}
