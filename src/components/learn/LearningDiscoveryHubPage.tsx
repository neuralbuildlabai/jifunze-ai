import { useAuth } from '../../auth/AuthContext'
import { isSupabaseConfigured } from '../../config/supabaseEnv'
import { AboutStrip, DiscoveryAuthCtas, DiscoveryFooter, DiscoveryTopNav } from './discoveryHubSections'
import {
  AvailableLearnHero,
  AvailableLearningAreasSection,
  AvailableNowSection,
} from './AvailableLearnSurfaces'
import { SignedInPublicLearningActions } from './SignedInPublicLearningActions'

/**
 * `/learn` — honest catalog of courses and workshops that are published and reachable today.
 */
export function LearningDiscoveryHubPage() {
  const { user } = useAuth()
  const supabase = isSupabaseConfigured()
  return (
    <div className="min-h-screen bg-white text-zinc-900 antialiased [color-scheme:light]">
      <DiscoveryTopNav
        links={[
          { label: 'Available now', href: '#available-now', testId: 'learn-nav-available-now' },
          { label: 'Learning areas', href: '#learning-areas', testId: 'learn-nav-learning-areas' },
          { label: 'About', href: '#about-public', testId: 'learn-nav-about' },
          { label: 'Contact', href: '#contact-public', testId: 'learn-nav-contact' },
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
        <AvailableLearnHero headingId="learn-hero-heading" isLearnPage />
        <AvailableNowSection />
        <AvailableLearningAreasSection />
        <AboutStrip />
      </main>
      <DiscoveryFooter
        showSignupCard={supabase}
        quickLinks={[
          { label: 'Available courses', href: '#available-now' },
          { label: 'Learning areas', href: '#learning-areas' },
          { label: 'About', href: '#about-public' },
          { label: 'Contact', href: '#contact-public' },
        ]}
      />
    </div>
  )
}
