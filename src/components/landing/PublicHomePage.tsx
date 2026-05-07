import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import {
  AboutStrip,
  DiscoveryAuthCtas,
  DiscoveryCTABanner,
  DiscoveryFooter,
  DiscoveryHero,
  DiscoveryTopNav,
  FeaturedCoursesSection,
  ORANGE_GRADIENT,
  PopularCategoriesSection,
  SchoolsSection,
  WhyLearnSection,
} from '../learn/discoveryHubSections'
import { SignedInPublicLearningActions } from '../learn/SignedInPublicLearningActions'
import { TrustBoundaryStrip } from '../TrustBoundaryStrip'
import { TrustLegalFooterLinks } from '../TrustLegalFooterLinks'
import { LEGAL_ROUTES } from '../../training/trustCopy'

/**
 * `/` — the bright, premium, public landing page. Visually consistent with
 * `/learn`, but the hero CTA jumps to the catalog rather than to an in-page
 * featured anchor, and a small trust strip is rendered below the CTAs to
 * preserve the disclaimer link surface that legal/QA flows rely on.
 */
export function PublicHomePage() {
  const { user } = useAuth()
  const supabase = isSupabaseConfigured()
  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased [color-scheme:light]">
      <DiscoveryTopNav
        links={[
          { label: 'Courses', href: '/learn', testId: 'home-nav-courses' },
          { label: 'Schools', href: '/learn#schools', testId: 'home-nav-pathways' },
          { label: 'About', href: '#about-public' },
          { label: 'Contact', href: '#contact-public' },
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
              to={LEGAL_ROUTES.learn}
              className={`inline-flex min-h-[2.5rem] items-center justify-center rounded-full px-5 py-2 text-[13px] font-semibold text-white shadow-md shadow-orange-500/25 transition hover:brightness-105 ${ORANGE_GRADIENT}`}
            >
              Browse courses
            </Link>
          )
        }
      />

      <main data-testid="public-home-marketplace">
        <DiscoveryHero
          headingId="public-home-hero-heading"
          primaryCtaTestId="landing-hero-primary-cta"
          primaryCtaTo={LEGAL_ROUTES.learn}
          secondaryCtaLabel={supabase && !user ? 'Start Free' : 'Browse schools'}
          secondaryCtaTo={supabase && !user ? LEGAL_ROUTES.authSignUp : '/learn#schools'}
          belowCtaSlot={
            <TrustBoundaryStrip
              variant="inline"
              compact
              strip="publicHero"
              presentation="utility"
              density="legalLink"
              className="text-[12px] leading-relaxed text-zinc-500"
              dataTestId="landing-cta-trust-line"
            />
          }
        />
        <FeaturedCoursesSection sectionTestId="public-home-featured-catalog" cardTestIdPrefix="home-featured" />
        <SchoolsSection cardTestIdPrefix="home-school-card" />
        <PopularCategoriesSection />
        <AboutStrip />
        <WhyLearnSection />
        <DiscoveryCTABanner showStartFree={Boolean(supabase && !user)} primaryHref={LEGAL_ROUTES.learn} />
      </main>

      <DiscoveryFooter
        showSignupCard={supabase}
        quickLinks={[
          { label: 'All Courses', href: '/learn' },
          { label: 'Schools', href: '/learn#schools' },
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
