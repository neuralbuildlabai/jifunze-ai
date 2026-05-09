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
  PopularCategoriesSection,
  SchoolsSection,
  WhyLearnSection,
} from './discoveryHubSections'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'
import { StandaloneCoursesSection } from './StandaloneCoursesSection'

/**
 * `/learn` — public course marketplace. The bright, premium layout is composed
 * from shared sections in `discoveryHubSections.tsx` so the homepage `/` can
 * present an identical visual direction.
 */
export function LearningDiscoveryHubPage() {
  const { user } = useAuth()
  const supabase = isSupabaseConfigured()
  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased [color-scheme:light]">
      <DiscoveryTopNav
        links={[
          { label: 'Workshops', href: '#new-free-courses', testId: 'learn-nav-free-course' },
          { label: 'Courses', href: '#featured-courses' },
          { label: 'Schools', href: '#schools' },
          { label: 'About', href: '#about-public' },
          { label: 'Contact', href: '#contact-public' },
        ]}
        rightSlot={
          user ? (
            <div className="jf-learn-warm rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)] px-2 py-1.5 shadow-sm">
              <SignedInPublicLearningActions className="!justify-end" />
            </div>
          ) : supabase ? (
            <DiscoveryAuthCtas />
          ) : null
        }
      />
      <main data-testid="learning-discovery-hub">
        <DiscoveryHero headingId="learn-hero-heading" />
        <StandaloneCoursesSection sectionTestId="discovery-section-standalone-catalog" />
        <FeaturedCoursesSection sectionTestId="discovery-section-flagship-catalog" />
        <SchoolsSection />
        <PopularCategoriesSection />
        <AboutStrip />
        <WhyLearnSection />
        <DiscoveryCTABanner showStartFree={Boolean(supabase && !user)} />
      </main>
      <DiscoveryFooter
        showSignupCard={supabase}
        quickLinks={[
          { label: 'Workshops & standalone courses', href: '#new-free-courses' },
          { label: 'All Courses', href: '#featured-courses' },
          { label: 'Schools', href: '#schools' },
          { label: 'About', href: '#about-public' },
          { label: 'Contact', href: '#contact-public' },
        ]}
      />
    </div>
  )
}
