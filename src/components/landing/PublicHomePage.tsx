import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import {
  AboutStrip,
  DiscoveryAuthCtas,
  DiscoveryFooter,
  DiscoveryTopNav,
  ORANGE_GRADIENT,
} from '../learn/discoveryHubSections'
import { AvailableLearnHero, HomepageAvailablePreviewSection } from '../learn/AvailableLearnSurfaces'
import { SignedInPublicLearningActions } from '../learn/SignedInPublicLearningActions'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'
import { LEGAL_ROUTES } from '../../training/trustCopy'

/**
 * `/` — public landing page aligned with the honest `/learn` catalog (available items only in preview).
 */
export function PublicHomePage() {
  const { user } = useAuth()
  const supabase = isSupabaseConfigured()
  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased [color-scheme:light]">
      <DiscoveryTopNav
        links={[
          { label: 'Courses', href: '/learn#available-now', testId: 'home-nav-courses' },
          { label: 'About', href: '#about-public', testId: 'home-nav-about' },
          { label: 'Contact', href: '#contact-public', testId: 'home-nav-contact' },
        ]}
        rightSlot={
          user ? (
            <div className="jf-public-surface rounded-2xl">
              <SignedInPublicLearningActions className="!justify-end" />
            </div>
          ) : supabase ? (
            <DiscoveryAuthCtas />
          ) : (
            <Link
              to={`${LEGAL_ROUTES.learn}#available-now`}
              className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-5 py-2 text-[13px] font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
            >
              Browse courses
            </Link>
          )
        }
      />

      <main data-testid="public-home-marketplace">
        <AvailableLearnHero
          headingId="public-home-hero-heading"
          isLearnPage={false}
          primaryCtaTestId="landing-hero-primary-cta"
        />
        <div className="mx-auto max-w-3xl px-4 pb-4 pt-2 text-center sm:px-6">
          <TrustBoundaryStrip
            variant="inline"
            compact
            strip="publicHero"
            presentation="utility"
            density="legalLink"
            className="text-[12px] leading-relaxed text-zinc-500"
            dataTestId="landing-cta-trust-line"
          />
        </div>
        <HomepageAvailablePreviewSection />
        <AboutStrip />
      </main>

      <DiscoveryFooter
        showSignupCard={supabase}
        quickLinks={[
          { label: 'Available courses', href: '/learn#available-now' },
          { label: 'About', href: '#about-public' },
          { label: 'Contact', href: '#contact-public' },
        ]}
      />
      <div className="bg-zinc-950 pb-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <TrustLegalFooterLinks variant="compact" className="justify-center" />
        </div>
      </div>
    </div>
  )
}
