import { useEffect, useMemo } from 'react'
import { Link, Navigate, Outlet, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { AccessTierProvider } from './access/AccessTierProvider'
import { LearningAccessProvider } from './learning/LearningAccessContext'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { AuthForm } from './components/AuthForm'
import { FullDisclaimerPage } from './components/legal/FullDisclaimerPage'
import { PrivacyPolicyPage } from './components/legal/PrivacyPolicyPage'
import { PublicPricingPage } from './components/legal/PublicPricingPage'
import { RefundPolicyPage } from './components/legal/RefundPolicyPage'
import { TermsOfServicePage } from './components/legal/TermsOfServicePage'
import { TrustBoundaryStrip } from './components/TrustBoundaryStrip'
import { TrustLegalFooterLinks } from './components/TrustLegalFooterLinks'
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage'
import { RequireDisclaimerAcknowledged } from './components/auth/RequireDisclaimerAcknowledged'
import { RequireEmailVerified } from './components/auth/RequireEmailVerified'
import { ResetPasswordPage } from './components/auth/ResetPasswordPage'
import { JifunzeBrandLogo } from './components/brand/JifunzeBrandLogo'
import { LearningInsightsPage } from './components/LearningInsightsPage'
import { WorkspaceIdeasPage } from './components/workspace/WorkspaceIdeasPage'
import { WorkspaceLabPage } from './components/workspace/WorkspaceLabPage'
import { WorkspaceSettingsPage } from './components/workspace/WorkspaceSettingsPage'
import { WorkspaceSubscriptionPage } from './components/workspace/WorkspaceSubscriptionPage'
import { WorkspaceAiLibraryPage } from './components/workspace/WorkspaceAiLibraryPage'
import { WorkspaceChatbotLibraryPage } from './components/workspace/WorkspaceChatbotLibraryPage'
import { WorkspaceMlLibraryPage } from './components/workspace/WorkspaceMlLibraryPage'
import { WorkspaceTeachingLabsPage } from './components/workspace/WorkspaceTeachingLabsPage'
import { WorkspaceLibraryPage } from './components/workspace/WorkspaceLibraryPage'
import { WorkspaceShell } from './components/workspace/WorkspaceShell'
import { WorkspaceStudioPage } from './components/workspace/WorkspaceStudioPage'
import { DashboardPage } from './components/DashboardPage'
import { TrainingLessonPage } from './components/training/TrainingLessonPage'
import { TrainingPlanCreatePage } from './components/training/TrainingPlanCreatePage'
import { TrainingPlanDetailPage } from './components/training/TrainingPlanDetailPage'
import { TeamAssignmentsPage } from './components/team/TeamAssignmentsPage'
import { TeamMembersPage } from './components/team/TeamMembersPage'
import { TrendInsightsPage } from './components/trends/TrendInsightsPage'
import { TrainingPlansPage } from './components/training/TrainingPlansPage'
import { TrainingQuizPage } from './components/training/TrainingQuizPage'
import { SignedInHomePage } from './components/SignedInHomePage'
import { HomePublicGeneratePanel } from './components/HomePublicGeneratePanel'
import { LandingMarketingSections } from './components/landing/LandingMarketingSections'
import { PublicAiFoundationsLessonPage } from './components/libraries/PublicAiFoundationsLessonPage'
import { PublicAiFoundationsLibraryPage } from './components/libraries/PublicAiFoundationsLibraryPage'
import { PublicAiTeachingLabsPage } from './components/libraries/PublicAiTeachingLabsPage'
import { PublicChatbotLessonPage } from './components/libraries/PublicChatbotLessonPage'
import { PublicChatbotLibraryPage } from './components/libraries/PublicChatbotLibraryPage'
import { PublicMlLessonPage } from './components/libraries/PublicMlLessonPage'
import { PublicMlLibraryPage } from './components/libraries/PublicMlLibraryPage'
import { PublicExtendedCatalogLessonPage } from './components/libraries/PublicExtendedCatalogLessonPage'
import { PublicExtendedCatalogLibraryPage } from './components/libraries/PublicExtendedCatalogLibraryPage'
import { WorkspaceExtendedLibraryPage } from './components/workspace/WorkspaceExtendedLibraryPage'
import { PublicStandaloneCourseLandingPage } from './components/courses/PublicStandaloneCourseLandingPage'
import { LearningCategoryPage } from './components/learn/LearningCategoryPage'
import { LearningDiscoveryHubPage } from './components/learn/LearningDiscoveryHubPage'
import { EXTENDED_PUBLIC_LIBRARY_CONFIGS } from './data/learning/extendedPublicLibraryConfigs'
import {
  AGENTIC_AI_REAL_WORK_LANDING_PATH,
  AGENTIC_AI_REAL_WORK_PUBLIC_BASE_PATH,
  CLAUDE_WRITING_RESEARCH_LANDING_PATH,
  CLAUDE_WRITING_RESEARCH_PUBLIC_BASE_PATH,
  GEMINI_WORKSPACE_PRODUCTIVITY_LANDING_PATH,
  GEMINI_WORKSPACE_PRODUCTIVITY_PUBLIC_BASE_PATH,
  LEARN_CHATGPT_EVERYDAY_LANDING_PATH,
  LEARN_CHATGPT_EVERYDAY_PUBLIC_BASE_PATH,
  PROMPT_ENGINEERING_MODELS_LANDING_PATH,
  PROMPT_ENGINEERING_MODELS_PUBLIC_BASE_PATH,
} from './data/learning/standaloneCoursesCatalog'
import { RequirePlatformSurface, RequireProLab } from './components/access/RequireAccess'
import { PlatformSurfacePage } from './components/PlatformSurfacePage'
import { PublicGeneratePage } from './components/PublicGeneratePage'
import { SystemStatusBanner } from './components/SystemStatusBanner'
import { isSupabaseConfigured } from './config/supabaseEnv'
import { logEnvValidationFailure, validateStartupEnv } from './lib/envCheck'
import type { EnvCheckResult } from './lib/envCheck'
import { PUBLIC_AI_FOUNDATIONS_BASE_PATH } from './data/publicStarterLibraries/aiFoundations'
import { LEGAL_ROUTES } from './training/trustCopy'

function RedirectLegacyLibrariesAiFoundationsToCanonical() {
  return <Navigate to={PUBLIC_AI_FOUNDATIONS_BASE_PATH} replace />
}

function RedirectLegacyLibrariesAiFoundationsLessonToCanonical() {
  const { lessonSlug } = useParams<{ lessonSlug: string }>()
  return <Navigate to={`${PUBLIC_AI_FOUNDATIONS_BASE_PATH}/${lessonSlug}`} replace />
}

const LANDING_SUPPORT_SOCIAL = [
  { label: 'TikTok', handle: '@jifunze_ai', href: 'https://www.tiktok.com/@jifunze_ai' },
  { label: 'Instagram', handle: '@jifunze.ai', href: 'https://www.instagram.com/jifunze.ai/' },
  { label: 'X', handle: '@Jifunze.AI', href: 'https://x.com/JifunzeAI' },
] as const

const LANDING_CONTACT_EMAIL = 'neuralbuildlab.ai@gmail.com'

function LandingSupportLinks() {
  return (
    <div className="flex w-full max-w-sm flex-col items-center gap-3 text-center">
      <nav
        className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-[10px] leading-snug tracking-[0.16em] text-zinc-400/85"
        aria-label="Jifunze.AI on social"
      >
        {LANDING_SUPPORT_SOCIAL.map((item, i) => (
          <span key={item.href} className="inline-flex items-center gap-x-2">
            {i > 0 ? (
              <span className="text-zinc-600/55" aria-hidden>
                ·
              </span>
            ) : null}
            <a
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-200 hover:text-zinc-200 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
            >
              <span className="sr-only">{item.label}: </span>
              {item.handle}
            </a>
          </span>
        ))}
      </nav>
      <a
        href={`mailto:${LANDING_CONTACT_EMAIL}`}
        className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.14em] text-zinc-400/80 transition-colors duration-200 hover:text-zinc-200 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
      >
        <span className="text-zinc-500/85" aria-hidden>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-3.5 w-3.5 shrink-0 opacity-90"
            aria-hidden
          >
            <path d="M3 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v1.09l-6.55 4.37a1 1 0 0 1-1.1 0L3 5.09V4Zm0 3.82V16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7.82l-5.72 3.81a2.5 2.5 0 0 1-2.56 0L3 7.82Z" />
          </svg>
        </span>
        <span className="break-all">{LANDING_CONTACT_EMAIL}</span>
      </a>
    </div>
  )
}

function AppChrome({ env }: { env: EnvCheckResult }) {
  const { user, session } = useAuth()
  if (!user) return null
  const accessToken = session?.access_token
  return (
    <div className="sticky top-0 z-50">
      <SystemStatusBanner env={env} accessToken={accessToken} audience="user" />
    </div>
  )
}

function HomeEntryPage() {
  const { user } = useAuth()
  const location = useLocation()
  const authMode = useMemo(() => {
    const search = new URLSearchParams(location.search)
    return search.get('auth') === 'signup' || search.get('signup') === '1'
      ? 'signup'
      : search.get('auth') === 'signin'
        ? 'signin'
        : null
  }, [location.search])

  if (user) {
    return <SignedInHomePage />
  }

  return (
    <div className="jf-public-surface min-h-screen w-full bg-[var(--jf-bg-page)] text-[var(--jf-text)]">
      <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-7 sm:px-8 sm:pb-20 sm:pt-9 lg:px-10">
        <header className="flex flex-wrap items-center justify-between gap-4 pb-10 sm:pb-12">
          <div className="inline-flex items-center gap-3">
            <JifunzeBrandLogo to="/" size="xxl" className="origin-left scale-[1.04] sm:scale-100" surface="dark" />
          </div>
          <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
            <Link
              to={LEGAL_ROUTES.learn}
              className="rounded-full px-3 py-2 text-xs font-medium text-[color:var(--jf-muted)] transition-colors duration-200 hover:bg-white/[0.06] hover:text-[color:var(--jf-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
              data-testid="home-nav-courses"
            >
              Explore courses
            </Link>
            <Link
              to={LEGAL_ROUTES.pricing}
              className="rounded-full px-3 py-2 text-xs font-medium text-[color:var(--jf-muted)] transition-colors duration-200 hover:bg-white/[0.06] hover:text-[color:var(--jf-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
              data-testid="home-nav-plans"
            >
              View plans
            </Link>
            {isSupabaseConfigured() ? (
              <>
                <Link
                  to="/?auth=signin#auth"
                  className="rounded-full px-3 py-2 text-xs font-medium text-[color:var(--jf-muted)] transition-colors duration-200 hover:bg-white/[0.06] hover:text-[color:var(--jf-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                >
                  Sign in
                </Link>
                <Link
                  to="/?auth=signup#auth"
                  className="rounded-full px-3 py-2 text-xs font-semibold text-[color:var(--jf-text)] transition-colors duration-200 hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                >
                  Sign up
                </Link>
              </>
            ) : null}
          </nav>
        </header>

        {/* Hero: learning-platform first — single column, no split-screen tool demo */}
        <div className="relative">
          <div
            className="pointer-events-none absolute inset-x-[-1rem] -top-6 bottom-[-1.5rem] rounded-[2rem] bg-gradient-to-b from-slate-600/[0.12] via-[color-mix(in_oklab,var(--jf-bg-page)_94%,transparent)] to-transparent sm:inset-x-[-1.25rem] sm:-top-8 sm:rounded-[2.25rem]"
            aria-hidden
          />
          <div className="relative z-10 mx-auto max-w-4xl pt-2 text-center lg:max-w-5xl lg:text-left">
            <div className="mx-auto max-w-3xl space-y-5 lg:mx-0 sm:space-y-6">
              <p className="text-[13px] font-semibold uppercase tracking-[0.12em] text-[color:var(--jf-muted)] sm:text-[14px]">
                Online learning for practical AI &amp; digital skills
              </p>
              <h1 className="text-[1.9rem] font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[2.25rem] sm:leading-[1.15] lg:text-[2.5rem] lg:leading-[1.1]">
                Learn practical AI skills and turn what you know into useful work.
              </h1>
              <p className="text-[15px] leading-[1.65] text-[color:var(--jf-muted)] sm:text-[17px] sm:leading-relaxed">
                Structured courses, hands-on practice, and clear progression—then optional drafting help when you need a starting post. You review everything
                before it ships.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1 lg:justify-start">
                <Link
                  to={LEGAL_ROUTES.learn}
                  data-testid="landing-hero-primary-cta"
                  className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-8 py-3 text-[15px] font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition-colors duration-200 hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                >
                  Explore courses
                </Link>
                <a
                  href="#try-jifunze"
                  data-testid="landing-hero-explore"
                  className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-white/[0.1] px-7 py-3 text-[15px] font-semibold text-[color:var(--jf-text)] transition-colors duration-200 hover:border-white/[0.14] hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                >
                  Try a quick preview
                </a>
              </div>
              <TrustBoundaryStrip
                variant="inline"
                compact
                strip="publicHero"
                presentation="utility"
                density="legalLink"
                className="mx-auto max-w-xl pt-2 text-[13px] leading-relaxed text-[color:var(--jf-subtle)] sm:pt-3 lg:mx-0"
                dataTestId="landing-cta-trust-line"
              />
            </div>
          </div>
        </div>

        {/* Supporting: optional draft preview — narrowed so it does not compete with the learning story */}
        <section
          aria-labelledby="landing-preview-heading"
          className="relative z-10 mx-auto mt-16 max-w-6xl border-t border-[color:var(--jf-border)] pt-14 sm:mt-[4.5rem] sm:pt-16"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">Also included for visitors</p>
            <h2 id="landing-preview-heading" className="mt-2 text-lg font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-xl">
              Quick preview: draft from a topic
            </h2>
            <p className="mt-2 text-[14px] leading-relaxed text-[color:var(--jf-muted)]">
              A small helper for social drafts—not a substitute for the courses above. Edit, verify, then post on your terms.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-xl">
            <HomePublicGeneratePanel sectionId="try-jifunze" landingMinimalTrust supportingPlacement />
          </div>
        </section>

        <LandingMarketingSections />

        {isSupabaseConfigured() && authMode ? (
          <section
            id="auth"
            className="relative z-10 mx-auto mt-16 max-w-md border-t border-[color:var(--jf-border)] pt-10 sm:mt-20 sm:pt-12"
          >
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-subtle)]">Account</p>
            <div className="mt-3 space-y-1 text-center">
              <p className="text-[15px] font-medium text-[color:var(--jf-text)]">
                {authMode === 'signup' ? 'Create your account' : 'Welcome back'}
              </p>
              <p className="text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
                {authMode === 'signup'
                  ? 'Save progress and drafts in your workspace.'
                  : 'Pick up where you left off.'}
              </p>
            </div>
            <div className="mt-4 flex justify-center gap-5 text-[12px] text-[color:var(--jf-muted)]">
              <Link to="/?auth=signin#auth" className="hover:text-[color:var(--jf-text)]">
                Sign in
              </Link>
              <Link to="/?auth=signup#auth" className="font-medium hover:text-[color:var(--jf-text)]">
                Sign up
              </Link>
            </div>
            <div className="mt-6 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)]/80 px-5 py-6 ring-1 ring-white/[0.03]">
              <AuthForm initialMode={authMode} appearance="quiet" />
            </div>
            <div className="mt-6 text-center">
              <LandingSupportLinks />
            </div>
          </section>
        ) : null}

        {isSupabaseConfigured() && !authMode ? (
          <div className="relative z-10 mx-auto mt-14 max-w-xl border-t border-[color:var(--jf-border)] pt-8 text-center sm:mt-16 sm:pt-10">
            <p className="text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
              Returning learner?{' '}
              <Link
                to="/?auth=signin#auth"
                className="font-medium text-[color:var(--jf-text)] underline-offset-2 hover:underline"
              >
                Sign in
              </Link>{' '}
              or{' '}
              <Link
                to="/?auth=signup#auth"
                className="font-medium text-[color:var(--jf-text)] underline-offset-2 hover:underline"
              >
                create an account
              </Link>{' '}
              to save progress.
            </p>
          </div>
        ) : null}

        {!(isSupabaseConfigured() && authMode) ? (
          <footer className="mt-12 flex flex-col items-center gap-4 pt-2 sm:mt-14">
            <TrustLegalFooterLinks variant="compact" className="justify-center text-[color:var(--jf-subtle)]" />
          </footer>
        ) : null}
      </div>
    </div>
  )
}

export default function App() {
  const env = useMemo(() => validateStartupEnv(), [])
  useEffect(() => {
    if (!env.ok) logEnvValidationFailure(env)
  }, [env])

  return (
    <Routes>
      <Route path="/generate" element={<PublicGeneratePage />} />
      <Route path="/disclaimer" element={<FullDisclaimerPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/refunds" element={<RefundPolicyPage />} />
      <Route path="/pricing" element={<PublicPricingPage />} />
      <Route path="/learn" element={<LearningDiscoveryHubPage />} />
      <Route path="/learn/category/:slug" element={<LearningCategoryPage />} />
      <Route
        element={
          <AuthProvider>
            <LearningAccessProvider>
              <AccessTierProvider>
                <AppChrome env={env} />
                <Outlet />
              </AccessTierProvider>
            </LearningAccessProvider>
          </AuthProvider>
        }
      >
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/" element={<HomeEntryPage />} />
        <Route path="/library/ai-foundations" element={<PublicAiFoundationsLibraryPage />} />
        <Route path="/library/ai-foundations/:lessonSlug" element={<PublicAiFoundationsLessonPage />} />
        <Route path="/library/ai-labs" element={<PublicAiTeachingLabsPage />} />
        <Route path="/library/everyday-chatbots" element={<PublicChatbotLibraryPage />} />
        <Route path="/library/everyday-chatbots/:lessonSlug" element={<PublicChatbotLessonPage />} />
        <Route path="/library/machine-learning-foundations" element={<PublicMlLibraryPage />} />
        <Route path="/library/machine-learning-foundations/:lessonSlug" element={<PublicMlLessonPage />} />
        <Route
          path={EXTENDED_PUBLIC_LIBRARY_CONFIGS.networking.publicBasePath}
          element={<PublicExtendedCatalogLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.networking} />}
        />
        <Route
          path={`${EXTENDED_PUBLIC_LIBRARY_CONFIGS.networking.publicBasePath}/:lessonSlug`}
          element={<PublicExtendedCatalogLessonPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.networking} />}
        />
        <Route
          path={EXTENDED_PUBLIC_LIBRARY_CONFIGS.cybersecurity.publicBasePath}
          element={<PublicExtendedCatalogLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.cybersecurity} />}
        />
        <Route
          path={`${EXTENDED_PUBLIC_LIBRARY_CONFIGS.cybersecurity.publicBasePath}/:lessonSlug`}
          element={<PublicExtendedCatalogLessonPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.cybersecurity} />}
        />
        <Route
          path={EXTENDED_PUBLIC_LIBRARY_CONFIGS.cloud_devops.publicBasePath}
          element={<PublicExtendedCatalogLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.cloud_devops} />}
        />
        <Route
          path={`${EXTENDED_PUBLIC_LIBRARY_CONFIGS.cloud_devops.publicBasePath}/:lessonSlug`}
          element={<PublicExtendedCatalogLessonPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.cloud_devops} />}
        />
        <Route
          path={EXTENDED_PUBLIC_LIBRARY_CONFIGS.monitoring.publicBasePath}
          element={<PublicExtendedCatalogLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.monitoring} />}
        />
        <Route
          path={`${EXTENDED_PUBLIC_LIBRARY_CONFIGS.monitoring.publicBasePath}/:lessonSlug`}
          element={<PublicExtendedCatalogLessonPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.monitoring} />}
        />
        <Route
          path={EXTENDED_PUBLIC_LIBRARY_CONFIGS.content_publishing.publicBasePath}
          element={<PublicExtendedCatalogLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.content_publishing} />}
        />
        <Route
          path={`${EXTENDED_PUBLIC_LIBRARY_CONFIGS.content_publishing.publicBasePath}/:lessonSlug`}
          element={<PublicExtendedCatalogLessonPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.content_publishing} />}
        />

        <Route
          path={LEARN_CHATGPT_EVERYDAY_LANDING_PATH}
          element={<PublicStandaloneCourseLandingPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_chatgpt_everyday} />}
        />
        <Route
          path={LEARN_CHATGPT_EVERYDAY_PUBLIC_BASE_PATH}
          element={<PublicExtendedCatalogLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_chatgpt_everyday} />}
        />
        <Route
          path={`${LEARN_CHATGPT_EVERYDAY_PUBLIC_BASE_PATH}/:lessonSlug`}
          element={<PublicExtendedCatalogLessonPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_chatgpt_everyday} />}
        />

        <Route
          path={PROMPT_ENGINEERING_MODELS_LANDING_PATH}
          element={<PublicStandaloneCourseLandingPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_prompt_engineering_models} />}
        />
        <Route
          path={PROMPT_ENGINEERING_MODELS_PUBLIC_BASE_PATH}
          element={<PublicExtendedCatalogLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_prompt_engineering_models} />}
        />
        <Route
          path={`${PROMPT_ENGINEERING_MODELS_PUBLIC_BASE_PATH}/:lessonSlug`}
          element={<PublicExtendedCatalogLessonPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_prompt_engineering_models} />}
        />

        <Route
          path={GEMINI_WORKSPACE_PRODUCTIVITY_LANDING_PATH}
          element={<PublicStandaloneCourseLandingPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_gemini_workspace} />}
        />
        <Route
          path={GEMINI_WORKSPACE_PRODUCTIVITY_PUBLIC_BASE_PATH}
          element={<PublicExtendedCatalogLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_gemini_workspace} />}
        />
        <Route
          path={`${GEMINI_WORKSPACE_PRODUCTIVITY_PUBLIC_BASE_PATH}/:lessonSlug`}
          element={<PublicExtendedCatalogLessonPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_gemini_workspace} />}
        />

        <Route
          path={CLAUDE_WRITING_RESEARCH_LANDING_PATH}
          element={<PublicStandaloneCourseLandingPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_claude_writing} />}
        />
        <Route
          path={CLAUDE_WRITING_RESEARCH_PUBLIC_BASE_PATH}
          element={<PublicExtendedCatalogLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_claude_writing} />}
        />
        <Route
          path={`${CLAUDE_WRITING_RESEARCH_PUBLIC_BASE_PATH}/:lessonSlug`}
          element={<PublicExtendedCatalogLessonPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_claude_writing} />}
        />

        <Route
          path={AGENTIC_AI_REAL_WORK_LANDING_PATH}
          element={<PublicStandaloneCourseLandingPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_agentic_ai_real_work} />}
        />
        <Route
          path={AGENTIC_AI_REAL_WORK_PUBLIC_BASE_PATH}
          element={<PublicExtendedCatalogLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_agentic_ai_real_work} />}
        />
        <Route
          path={`${AGENTIC_AI_REAL_WORK_PUBLIC_BASE_PATH}/:lessonSlug`}
          element={<PublicExtendedCatalogLessonPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_agentic_ai_real_work} />}
        />

        <Route path="/libraries/ai-foundations" element={<RedirectLegacyLibrariesAiFoundationsToCanonical />} />
        <Route
          path="/libraries/ai-foundations/:lessonSlug"
          element={<RedirectLegacyLibrariesAiFoundationsLessonToCanonical />}
        />
        <Route element={<RequireEmailVerified />}>
          <Route element={<RequireDisclaimerAcknowledged />}>
            <Route element={<WorkspaceShell />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/library" element={<WorkspaceLibraryPage />} />
              <Route path="/library/ai" element={<WorkspaceAiLibraryPage />} />
              <Route path="/library/ml" element={<WorkspaceMlLibraryPage />} />
              <Route path="/library/chatbots" element={<WorkspaceChatbotLibraryPage />} />
              <Route
                path={EXTENDED_PUBLIC_LIBRARY_CONFIGS.networking.workspacePath}
                element={<WorkspaceExtendedLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.networking} />}
              />
              <Route
                path={EXTENDED_PUBLIC_LIBRARY_CONFIGS.cybersecurity.workspacePath}
                element={<WorkspaceExtendedLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.cybersecurity} />}
              />
              <Route
                path={EXTENDED_PUBLIC_LIBRARY_CONFIGS.cloud_devops.workspacePath}
                element={<WorkspaceExtendedLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.cloud_devops} />}
              />
              <Route
                path={EXTENDED_PUBLIC_LIBRARY_CONFIGS.monitoring.workspacePath}
                element={<WorkspaceExtendedLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.monitoring} />}
              />
              <Route
                path={EXTENDED_PUBLIC_LIBRARY_CONFIGS.content_publishing.workspacePath}
                element={<WorkspaceExtendedLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.content_publishing} />}
              />
              <Route
                path={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_chatgpt_everyday.workspacePath}
                element={<WorkspaceExtendedLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_chatgpt_everyday} />}
              />
              <Route
                path={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_prompt_engineering_models.workspacePath}
                element={<WorkspaceExtendedLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_prompt_engineering_models} />}
              />
              <Route
                path={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_gemini_workspace.workspacePath}
                element={<WorkspaceExtendedLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_gemini_workspace} />}
              />
              <Route
                path={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_claude_writing.workspacePath}
                element={<WorkspaceExtendedLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_claude_writing} />}
              />
              <Route
                path={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_agentic_ai_real_work.workspacePath}
                element={<WorkspaceExtendedLibraryPage config={EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_agentic_ai_real_work} />}
              />
              <Route path="/learning/labs" element={<WorkspaceTeachingLabsPage />} />
              <Route path="/team/members" element={<TeamMembersPage />} />
              <Route path="/team/assignments" element={<TeamAssignmentsPage />} />
              <Route path="/training" element={<TrainingPlansPage />} />
              <Route path="/training/new" element={<TrainingPlanCreatePage />} />
              <Route path="/training/:planId" element={<TrainingPlanDetailPage />} />
              <Route path="/training/:planId/lessons/:lessonId" element={<TrainingLessonPage />} />
              <Route path="/training/:planId/quizzes/:quizId" element={<TrainingQuizPage />} />
              <Route path="/trends" element={<TrendInsightsPage />} />
              <Route path="/ideas" element={<WorkspaceIdeasPage />} />
              <Route path="/studio" element={<WorkspaceStudioPage />} />
              <Route
                path="/lab"
                element={
                  <RequireProLab>
                    <WorkspaceLabPage />
                  </RequireProLab>
                }
              />
              <Route path="/settings" element={<WorkspaceSettingsPage />} />
              <Route path="/settings/subscription" element={<WorkspaceSubscriptionPage />} />
            </Route>
            <Route path="/insights" element={<LearningInsightsPage />} />
            <Route
              path="/platform"
              element={
                <RequirePlatformSurface>
                  <PlatformSurfacePage />
                </RequirePlatformSurface>
              }
            />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
