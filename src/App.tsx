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
import { JifunzeAuthSectionBrandMark } from './components/brand/JifunzeAuthSectionBrandMark'
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
        className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.14em] text-zinc-400/80 transition-colors duration-200 hover:text-zinc-200 focus-visible:rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/35"
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
        <header className="flex flex-wrap items-center justify-between gap-4 pb-8 sm:pb-9">
          <div className="inline-flex items-center gap-3">
            <div className="hidden h-10 w-px bg-zinc-200 sm:block" aria-hidden />
            <JifunzeBrandLogo to="/" size="xxl" className="origin-left scale-[1.04] sm:scale-100" surface="light" />
          </div>
          <nav className="flex flex-wrap items-center justify-end gap-1 sm:gap-2">
            <Link
              to={LEGAL_ROUTES.learn}
              className="rounded-lg px-3 py-2 text-xs font-semibold text-zinc-600 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
              data-testid="home-nav-courses"
            >
              Explore courses
            </Link>
            <Link
              to={LEGAL_ROUTES.pricing}
              className="rounded-lg px-3 py-2 text-xs font-semibold text-zinc-600 transition-colors duration-200 hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
              data-testid="home-nav-plans"
            >
              View plans
            </Link>
            {isSupabaseConfigured() ? (
              <>
                <Link
                  to="/?auth=signin#auth"
                  className="rounded-lg px-3 py-2 text-xs font-medium text-zinc-500 transition-colors duration-200 hover:bg-zinc-50 hover:text-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                >
                  Sign in
                </Link>
                <Link
                  to="/?auth=signup#auth"
                  className="rounded-lg px-3 py-2 text-xs font-semibold text-zinc-800 transition-colors duration-200 hover:bg-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                >
                  Sign up
                </Link>
              </>
            ) : null}
          </nav>
        </header>

        <div className="relative overflow-hidden rounded-[2rem] border border-zinc-200/90 bg-[color:var(--jf-surface)] p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] sm:p-6 lg:px-9 lg:pb-10 lg:pt-8">
          <div className="relative z-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.02fr)] lg:items-start lg:gap-12 xl:gap-14">
            <div className="lg:max-w-xl xl:max-w-2xl lg:pr-2">
              <div className="space-y-5 sm:space-y-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                Guided learning · practical writing
              </p>
              <h1 className="text-[1.875rem] font-semibold tracking-tight text-zinc-900 sm:text-4xl sm:leading-[1.14] lg:text-[2.35rem] lg:leading-[1.06]">
                Learn with structure. Write with clarity.
              </h1>
              <p className="max-w-lg text-[15px] leading-relaxed text-zinc-600 sm:text-base">
                Jifunze helps you explore courses at your pace, practice with intention, and turn ideas into posts you can stand behind—not loud automation, just
                grounded drafts when they help.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <a
                  href="#try-jifunze"
                  data-testid="landing-hero-primary-cta"
                  className="inline-flex items-center justify-center rounded-xl bg-[var(--jf-brand)] px-6 py-3 text-[15px] font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-[var(--jf-brand-hover)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                >
                  Try preview
                </a>
                <Link
                  to={LEGAL_ROUTES.learn}
                  className="inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white px-6 py-3 text-[15px] font-semibold text-zinc-800 shadow-sm transition-colors duration-200 hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)]"
                  data-testid="landing-hero-explore"
                >
                  Explore courses
                </Link>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2 text-[12px] text-zinc-500">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-400" aria-hidden />
                  Browse libraries before you sign up
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-zinc-400" aria-hidden />
                  Caption preview runs in your browser trial
                </span>
              </div>
              <TrustBoundaryStrip
                variant="inline"
                compact
                strip="publicHero"
                presentation="utility"
                density="legalLink"
                className="max-w-xl border-t border-zinc-200/90 pt-4 text-zinc-600"
                dataTestId="landing-cta-trust-line"
              />
              </div>
            </div>

            <HomePublicGeneratePanel sectionId="try-jifunze" landingMinimalTrust />
          </div>

          {isSupabaseConfigured() && authMode ? (
            <>
              <div className="relative mt-10 sm:mt-12" aria-hidden>
                <div className="absolute inset-x-0 top-0 h-px bg-zinc-200/90" />
              </div>
              <section
                id="auth"
                className="relative z-10 mt-6 overflow-hidden rounded-2xl border border-zinc-200/95 bg-zinc-50/90 p-5 sm:p-6 sm:mt-7 lg:p-6"
              >
                <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Save your work
                </p>
                <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.92fr)] lg:items-start lg:gap-6 xl:gap-7">
                  <div className="flex min-w-0 max-w-lg flex-col gap-3 lg:max-w-none">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div className="min-w-0 space-y-1">
                        <p className="text-[13px] font-medium text-zinc-700">
                          {authMode === 'signup' ? 'Create your account' : 'Continue where you left off'}
                        </p>
                        <p className="text-[12px] leading-relaxed text-zinc-600">
                          {authMode === 'signup'
                            ? 'When you’re ready, save drafts and keep everything in one workspace.'
                            : 'Welcome back—open your workspace and pick up where you left off.'}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-3 text-[11px]">
                        <Link
                          to="/?auth=signin#auth"
                          className="text-zinc-600 transition-colors duration-200 hover:text-zinc-900"
                        >
                          Sign in
                        </Link>
                        <Link
                          to="/?auth=signup#auth"
                          className="font-medium text-zinc-700 transition-colors duration-200 hover:text-zinc-950"
                        >
                          Sign up
                        </Link>
                      </div>
                    </div>
                    <AuthForm initialMode={authMode} appearance="quiet" />
                  </div>
                  <div className="relative flex min-h-[min(14rem,34vh)] flex-col items-center justify-center gap-3 overflow-hidden rounded-xl border border-zinc-200/95 bg-white px-4 py-5 sm:min-h-[min(15rem,36vh)] sm:px-5 sm:py-6">
                    <div className="relative z-[1] flex w-full flex-1 flex-col items-center justify-center py-1">
                      <JifunzeAuthSectionBrandMark />
                    </div>
                    <p className="relative z-[1] max-w-[16rem] text-center text-[10px] leading-relaxed text-zinc-500">
                      Updates and support from the Jifunze.AI team.
                    </p>
                    <div className="relative z-[1] w-full border-t border-zinc-200/90 pt-2.5">
                      <LandingSupportLinks />
                    </div>
                  </div>
                </div>
              </section>
            </>
          ) : null}

          {isSupabaseConfigured() && !authMode ? (
            <section className="relative z-10 mt-10 border-t border-zinc-200/90 pt-8 text-center sm:mt-11 sm:pt-9">
              <p className="text-[12px] text-zinc-600">
                Want to keep going?{' '}
                <Link
                  to="/?auth=signin#auth"
                  className="font-medium text-zinc-800 transition-colors duration-200 hover:text-zinc-950"
                >
                  Sign in
                </Link>
                {' · '}
                <Link
                  to="/?auth=signup#auth"
                  className="font-medium text-zinc-800 transition-colors duration-200 hover:text-zinc-950"
                >
                  Sign up
                </Link>
                {' · '}
                <span className="text-zinc-500">Preview first—save when you&apos;re ready.</span>
              </p>
            </section>
          ) : null}
          </div>
        </div>

        <LandingMarketingSections />

        {!(isSupabaseConfigured() && authMode) ? (
          <footer className="mt-14 flex flex-col items-center gap-4 pt-2 sm:mt-16">
            <TrustLegalFooterLinks variant="compact" className="justify-center text-zinc-600" />
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
