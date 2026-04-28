import { useEffect, useMemo } from 'react'
import { Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { AuthSignInPage } from './components/auth/AuthSignInPage'
import { AuthSignUpPage } from './components/auth/AuthSignUpPage'
import { MyLearningPage } from './components/learning/MyLearningPage'
import { LearnerCommerceProvider } from './learner/LearnerCommerceContext'
import { LearnerDeviceLimitModal } from './components/learn/LearnerDeviceLimitModal'
import { LearnerCheckoutPage } from './components/learn/LearnerCheckoutPage'
import { ReadinessChallengePage } from './components/learn/ReadinessChallengePage'
import { AccessTierProvider } from './access/AccessTierProvider'
import { LearningAccessProvider } from './learning/LearningAccessContext'
import { AuthProvider, useAuth } from './auth/AuthContext'
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
import { LearnerAccountPage } from './components/workspace/LearnerAccountPage'
import { WorkspaceSettingsOrAccountPage } from './components/workspace/WorkspaceSettingsPage'
import { WorkspaceSubscriptionPage } from './components/workspace/WorkspaceSubscriptionPage'
import { WorkspaceAiLibraryPage } from './components/workspace/WorkspaceAiLibraryPage'
import { WorkspaceChatbotLibraryPage } from './components/workspace/WorkspaceChatbotLibraryPage'
import { WorkspaceMlLibraryPage } from './components/workspace/WorkspaceMlLibraryPage'
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
import { LearnerReportsPage } from './components/reports/LearnerReportsPage'
import { TeamLearningReportsPage } from './components/reports/TeamLearningReportsPage'
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
import { LearningSchoolCatalogPage } from './components/learn/LearningSchoolCatalogPage'
import { FlagshipCourseDetailPage } from './components/learn/FlagshipCourseDetailPage'
import { FlagshipCourseSessionPage } from './components/learn/FlagshipCourseSessionPage'
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
import {
  RequireInstitutionOperatorSurface,
  RequirePlatformInsights,
  RequireSuperAdminSurface,
  RequireTrainingPlanAdminSurface,
} from './components/access/RequireAccess'
import { PlatformSurfacePage } from './components/PlatformSurfacePage'
import { PublicGeneratePage } from './components/PublicGeneratePage'
import { SystemStatusBanner } from './components/SystemStatusBanner'
import { isSupabaseConfigured } from './config/supabaseEnv'
import { logEnvValidationFailure, validateStartupEnv } from './lib/envCheck'
import type { EnvCheckResult } from './lib/envCheck'
import { PUBLIC_AI_FOUNDATIONS_BASE_PATH } from './data/publicStarterLibraries/aiFoundations'
import { LEGAL_ROUTES } from './training/trustCopy'
import { MaintenancePublicGate } from './components/maintenance/MaintenancePublicGate'
import { EmployablePathwaysPage } from './components/pathways/EmployablePathwaysPage'
import { PathwayDetailPage } from './components/pathways/PathwayDetailPage'
import { EmployablePathwaysHomeSection } from './components/pathways/EmployablePathwaysHomeSection'
import { NotFoundPage } from './components/NotFoundPage'

function RedirectLegacyLibrariesAiFoundationsToCanonical() {
  return <Navigate to={PUBLIC_AI_FOUNDATIONS_BASE_PATH} replace />
}

function RedirectLegacyLibrariesAiFoundationsLessonToCanonical() {
  const { lessonSlug } = useParams<{ lessonSlug: string }>()
  return <Navigate to={`${PUBLIC_AI_FOUNDATIONS_BASE_PATH}/${lessonSlug}`} replace />
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
  const legacyAuthRedirect = useMemo(() => {
    const search = new URLSearchParams(location.search)
    if (search.get('auth') === 'signup' || search.get('signup') === '1') return LEGAL_ROUTES.authSignUp
    if (search.get('auth') === 'signin') return LEGAL_ROUTES.authSignIn
    return null
  }, [location.search])

  if (user) {
    return <SignedInHomePage />
  }

  if (legacyAuthRedirect) {
    return <Navigate to={legacyAuthRedirect} replace />
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
              to={LEGAL_ROUTES.paths}
              className="rounded-full px-3 py-2 text-xs font-medium text-[color:var(--jf-muted)] transition-colors duration-200 hover:bg-white/[0.06] hover:text-[color:var(--jf-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
              data-testid="home-nav-pathways"
            >
              Pathways
            </Link>
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
                  to={LEGAL_ROUTES.authSignIn}
                  className="rounded-full px-3 py-2 text-xs font-medium text-[color:var(--jf-muted)] transition-colors duration-200 hover:bg-white/[0.06] hover:text-[color:var(--jf-text)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                >
                  Sign in
                </Link>
                <Link
                  to={LEGAL_ROUTES.authSignUp}
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
                Jifunze · employability pathways
              </p>
              <h1 className="text-[1.9rem] font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-[2.25rem] sm:leading-[1.15] lg:text-[2.5rem] lg:leading-[1.1]">
                Learn skills. Build proof. Become employable.
              </h1>
              <p className="text-[15px] leading-[1.65] text-[color:var(--jf-muted)] sm:text-[17px] sm:leading-relaxed">
                Jifunze is built around <strong className="font-semibold text-[color:var(--jf-text)]">employable pathways</strong>: flagship courses, practical
                projects, and portfolio-ready outputs—clearly separated from roadmap work. Proof you can show, not job or income guarantees.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-1 lg:justify-start">
                <Link
                  to={LEGAL_ROUTES.paths}
                  data-testid="landing-hero-primary-cta"
                  className="inline-flex min-h-[3rem] items-center justify-center rounded-full bg-[var(--jf-brand)] px-8 py-3 text-[15px] font-semibold text-zinc-950 shadow-[var(--jf-shadow-soft)] transition-colors duration-200 hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                >
                  Browse pathways
                </Link>
                <Link
                  to={LEGAL_ROUTES.learn}
                  data-testid="landing-hero-secondary-courses"
                  className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-white/[0.1] px-7 py-3 text-[15px] font-semibold text-[color:var(--jf-text)] transition-colors duration-200 hover:border-white/[0.14] hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                >
                  Explore courses
                </Link>
                <Link
                  to={LEGAL_ROUTES.pricing}
                  className="inline-flex min-h-[3rem] items-center justify-center rounded-full border border-white/[0.08] px-6 py-3 text-[14px] font-medium text-[color:var(--jf-muted)] transition-colors duration-200 hover:border-white/[0.12] hover:bg-white/[0.04] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                >
                  View plans
                </Link>
                <a
                  href="#try-jifunze"
                  data-testid="landing-hero-explore"
                  className="inline-flex min-h-[2.75rem] items-center justify-center rounded-full px-4 py-2.5 text-[13px] font-medium text-[color:var(--jf-subtle)] underline-offset-4 hover:text-[color:var(--jf-muted)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                >
                  Optional: try a quick draft preview ↓
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

        <EmployablePathwaysHomeSection />

        {/* Supporting: optional draft preview — narrowed so it does not compete with the learning story */}
        <section
          aria-labelledby="landing-preview-heading"
          className="relative z-10 mx-auto mt-12 max-w-6xl border-t border-[color:var(--jf-border)] pt-10 sm:mt-14 sm:pt-12"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[color:var(--jf-muted)]">Optional visitor tool</p>
            <h2 id="landing-preview-heading" className="mt-2 text-base font-semibold tracking-tight text-[color:var(--jf-text)] sm:text-lg">
              Quick draft preview (not the core product)
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
              A lightweight topic-to-caption helper for social drafts. Learning, pathways, and proof stay above this fold.
            </p>
          </div>
          <div className="mx-auto mt-8 max-w-xl">
            <HomePublicGeneratePanel sectionId="try-jifunze" landingMinimalTrust supportingPlacement />
          </div>
        </section>

        <LandingMarketingSections />

        {isSupabaseConfigured() ? (
          <div className="relative z-10 mx-auto mt-14 max-w-xl border-t border-[color:var(--jf-border)] pt-8 text-center sm:mt-16 sm:pt-10">
            <p className="text-[13px] leading-relaxed text-[color:var(--jf-muted)]">
              Returning learner?{' '}
              <Link
                to={LEGAL_ROUTES.authSignIn}
                className="font-medium text-[color:var(--jf-text)] underline-offset-2 hover:underline"
              >
                Sign in
              </Link>{' '}
              or{' '}
              <Link
                to={LEGAL_ROUTES.authSignUp}
                className="font-medium text-[color:var(--jf-text)] underline-offset-2 hover:underline"
              >
                create an account
              </Link>{' '}
              to save progress.
            </p>
          </div>
        ) : null}

        <footer className="mt-12 flex flex-col items-center gap-4 pt-2 sm:mt-14">
          <TrustLegalFooterLinks variant="compact" className="justify-center text-[color:var(--jf-subtle)]" />
        </footer>
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
    <LearnerCommerceProvider>
      <LearnerDeviceLimitModal />
      <Routes>
      <Route
        element={
          <AuthProvider>
            <LearningAccessProvider>
              <AccessTierProvider>
                <AppChrome env={env} />
                <MaintenancePublicGate />
              </AccessTierProvider>
            </LearningAccessProvider>
          </AuthProvider>
        }
      >
        <Route path="/generate" element={<PublicGeneratePage />} />
        <Route path="/disclaimer" element={<FullDisclaimerPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/refunds" element={<RefundPolicyPage />} />
        <Route path="/pricing" element={<PublicPricingPage />} />
        <Route path="/paths" element={<EmployablePathwaysPage />} />
        <Route path="/paths/:pathwaySlug" element={<PathwayDetailPage />} />
        <Route path="/learn" element={<LearningDiscoveryHubPage />} />
        <Route path="/learn/school/:schoolId" element={<LearningSchoolCatalogPage />} />
        <Route path="/learn/category/:slug" element={<LearningCategoryPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/sign-in" element={<AuthSignInPage />} />
        <Route path="/auth/sign-up" element={<AuthSignUpPage />} />
        <Route path="/" element={<HomeEntryPage />} />
        <Route path="/learn/courses/:slug/session/:sessionId" element={<FlagshipCourseSessionPage />} />
        <Route path="/learn/courses/:slug" element={<FlagshipCourseDetailPage />} />
        <Route path="/learn/checkout" element={<LearnerCheckoutPage />} />
        <Route path="/learn/readiness/:slug" element={<ReadinessChallengePage />} />
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
              <Route path="/reports" element={<LearnerReportsPage />} />
              <Route path="/my-learning" element={<MyLearningPage />} />
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
              <Route path="/learning/labs" element={<Navigate to="/learn" replace />} />
              <Route
                path="/team/members"
                element={
                  <RequireInstitutionOperatorSurface>
                    <TeamMembersPage />
                  </RequireInstitutionOperatorSurface>
                }
              />
              <Route path="/team/assignments" element={<TeamAssignmentsPage />} />
              <Route
                path="/team/learning-reports"
                element={
                  <RequireInstitutionOperatorSurface>
                    <TeamLearningReportsPage />
                  </RequireInstitutionOperatorSurface>
                }
              />
              <Route
                path="/training"
                element={
                  <RequireTrainingPlanAdminSurface>
                    <TrainingPlansPage />
                  </RequireTrainingPlanAdminSurface>
                }
              />
              <Route
                path="/training/new"
                element={
                  <RequireTrainingPlanAdminSurface>
                    <TrainingPlanCreatePage />
                  </RequireTrainingPlanAdminSurface>
                }
              />
              <Route path="/training/:planId" element={<TrainingPlanDetailPage />} />
              <Route path="/training/:planId/lessons/:lessonId" element={<TrainingLessonPage />} />
              <Route path="/training/:planId/quizzes/:quizId" element={<TrainingQuizPage />} />
              <Route
                path="/trends"
                element={
                  <RequireInstitutionOperatorSurface>
                    <TrendInsightsPage />
                  </RequireInstitutionOperatorSurface>
                }
              />
              <Route
                path="/ideas"
                element={
                  <RequireInstitutionOperatorSurface>
                    <WorkspaceIdeasPage />
                  </RequireInstitutionOperatorSurface>
                }
              />
              <Route
                path="/studio"
                element={
                  <RequireInstitutionOperatorSurface>
                    <WorkspaceStudioPage />
                  </RequireInstitutionOperatorSurface>
                }
              />
              <Route path="/lab" element={<Navigate to="/learn" replace />} />
              <Route
                path="/insights"
                element={
                  <RequirePlatformInsights>
                    <LearningInsightsPage />
                  </RequirePlatformInsights>
                }
              />
              <Route path="/account" element={<LearnerAccountPage />} />
              <Route path="/settings" element={<WorkspaceSettingsOrAccountPage />} />
              <Route path="/settings/subscription" element={<WorkspaceSubscriptionPage />} />
            </Route>
            <Route
              path="/platform"
              element={
                <RequireSuperAdminSurface>
                  <PlatformSurfacePage />
                </RequireSuperAdminSurface>
              }
            />
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </LearnerCommerceProvider>
  )
}
