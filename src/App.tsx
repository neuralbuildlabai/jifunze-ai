import { useEffect, useMemo } from 'react'
import { Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom'
import { AuthSignInPage } from './components/auth/AuthSignInPage'
import { AuthSignUpPage } from './components/auth/AuthSignUpPage'
import { MyLearningPage } from './components/learning/MyLearningPage'
import { LearnerCommerceProvider } from './learner/LearnerCommerceContext'
import { LEARNER_MONETIZATION_UI_DISABLED } from './learner/learnerCommerceConstants'
import { LearnerDeviceLimitModal } from './components/learn/LearnerDeviceLimitModal'
import { LearnerCheckoutPage } from './components/learn/LearnerCheckoutPage'
import { ReadinessChallengePage } from './components/learn/ReadinessChallengePage'
import { AccessTierProvider } from './access/AccessTierProvider'
import { useAppAccess } from './access/useAppAccess'
import { resolveAccessTier } from './access/appAccess'
import { LearningAccessProvider } from './learning/LearningAccessContext'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { FullDisclaimerPage } from './components/legal/FullDisclaimerPage'
import { PrivacyPolicyPage } from './components/legal/PrivacyPolicyPage'
import { PublicPausedSubscriptionPage } from './components/legal/PublicPausedSubscriptionPage'
import { PublicPricingPage } from './components/legal/PublicPricingPage'
import { RefundPolicyPage } from './components/legal/RefundPolicyPage'
import { TermsOfServicePage } from './components/legal/TermsOfServicePage'
import { LearnerSupportPage } from './components/legal/LearnerSupportPage'
import { LearnerContactPage } from './components/legal/LearnerContactPage'
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage'
import { RequireDisclaimerAcknowledged } from './components/auth/RequireDisclaimerAcknowledged'
import { RequireEmailVerified } from './components/auth/RequireEmailVerified'
import { ResetPasswordPage } from './components/auth/ResetPasswordPage'
import { LearnerAccountPage } from './components/workspace/LearnerAccountPage'
import { WorkspaceSubscriptionPage } from './components/workspace/WorkspaceSubscriptionPage'
import { DashboardPage } from './components/DashboardPage'
import { LearnerReportsPage } from './components/reports/LearnerReportsPage'
import { LearnerAppShell } from './components/learner-shell/LearnerAppShell'
import { PublicAiFoundationsLessonPage } from './components/libraries/PublicAiFoundationsLessonPage'
import { PublicAiFoundationsLibraryPage } from './components/libraries/PublicAiFoundationsLibraryPage'
import { PublicAiTeachingLabsPage } from './components/libraries/PublicAiTeachingLabsPage'
import { PublicChatbotLessonPage } from './components/libraries/PublicChatbotLessonPage'
import { PublicChatbotLibraryPage } from './components/libraries/PublicChatbotLibraryPage'
import { PublicMlLessonPage } from './components/libraries/PublicMlLessonPage'
import { PublicMlLibraryPage } from './components/libraries/PublicMlLibraryPage'
import { PublicExtendedCatalogLessonPage } from './components/libraries/PublicExtendedCatalogLessonPage'
import { PublicExtendedCatalogLibraryPage } from './components/libraries/PublicExtendedCatalogLibraryPage'
import { PublicStandaloneCourseLandingPage } from './components/courses/PublicStandaloneCourseLandingPage'
import { LearningCategoryPage } from './components/learn/LearningCategoryPage'
import { AiAtWorkChatgptFreeStarterPage } from './components/learn/AiAtWorkChatgptFreeStarterPage'
import { SmartWorkflowsWithAiFreeStarterPage } from './components/learn/SmartWorkflowsWithAiFreeStarterPage'
import { BusinessAnalyticsDecisionMakingFreeStarterPage } from './components/learn/BusinessAnalyticsDecisionMakingFreeStarterPage'
import { MentalWellbeingResetFreeStarterPage } from './components/learn/MentalWellbeingResetFreeStarterPage'
import { LearningDiscoveryHubPage } from './components/learn/LearningDiscoveryHubPage'
import { AdminCapstonesReviewPage } from './components/admin/AdminCapstonesReviewPage'
import { FlagshipCapstoneSubmissionPage } from './components/learn/FlagshipCapstoneSubmissionPage'
import { FlagshipCourseDetailPage } from './components/learn/FlagshipCourseDetailPage'
import { FlagshipCourseSessionPage } from './components/learn/FlagshipCourseSessionPage'
import { StandaloneCertificatePage } from './components/learn/StandaloneCertificatePage'
import { StandaloneCourseDetailPage } from './components/learn/StandaloneCourseDetailPage'
import { StandaloneLessonDetailPage } from './components/learn/StandaloneLessonDetailPage'
import { StandaloneModuleDetailPage } from './components/learn/StandaloneModuleDetailPage'
import { StandaloneQuizPage } from './components/learn/StandaloneQuizPage'
import { EXTENDED_PUBLIC_LIBRARY_CONFIGS } from './data/learning/extendedPublicLibraryConfigs'
import {
  AGENTIC_AI_REAL_WORK_LANDING_PATH,
  AGENTIC_AI_REAL_WORK_PUBLIC_BASE_PATH,
  CLAUDE_WRITING_RESEARCH_LANDING_PATH,
  CLAUDE_WRITING_RESEARCH_PUBLIC_BASE_PATH,
  GEMINI_WORKSPACE_PRODUCTIVITY_LANDING_PATH,
  GEMINI_WORKSPACE_PRODUCTIVITY_PUBLIC_BASE_PATH,
  PROMPT_ENGINEERING_MODELS_LANDING_PATH,
  PROMPT_ENGINEERING_MODELS_PUBLIC_BASE_PATH,
} from './data/learning/standaloneCoursesCatalog'
import { RequireAdminAccess } from './components/access/RequireAccess'
import { logEnvValidationFailure, validateStartupEnv } from './lib/envCheck'
import { PUBLIC_AI_FOUNDATIONS_BASE_PATH } from './data/publicStarterLibraries/aiFoundations'
import { LEGAL_ROUTES } from './training/trustCopy'
import { MaintenancePublicGate } from './components/maintenance/MaintenancePublicGate'
import { NotFoundPage } from './components/NotFoundPage'
import { AdminShell } from './components/admin/platform/AdminShell'
import { AdminDashboardPage } from './components/admin/platform/AdminDashboardPage'
import { AdminLearnersPage } from './components/admin/platform/AdminLearnersPage'
import { AdminLearnerDetailPage } from './components/admin/platform/AdminLearnerDetailPage'
import { AdminCoursesPage, AdminCourseDetailPage } from './components/admin/platform/AdminCoursesPages'
import { AdminEnrollmentsPage } from './components/admin/platform/AdminEnrollmentsPage'
import { AdminProgressPage } from './components/admin/platform/AdminProgressPage'
import { AdminCertificatesPage } from './components/admin/platform/AdminCertificatesPage'
import { AdminReportsPage } from './components/admin/platform/AdminReportsPage'
import { AdminSupportPage } from './components/admin/platform/AdminSupportPage'
import { AdminSettingsPage } from './components/admin/platform/AdminSettingsPage'
import { AdminHealthPage } from './components/admin/platform/AdminHealthPage'
import { ProfileDisplayProvider } from './profile/ProfileDisplayProvider'
import { isAdminTier } from './lib/admin/adminAccess'
import { ADMIN_DEFAULT_SIGNED_IN_PATH, LEARNER_DEFAULT_SIGNED_IN_PATH } from './lib/signedInDefaultRoute'
import { isSupabaseConfigured } from './config/supabaseEnv'

// --- Public career-skills site (new). Separate tree from the frozen learning platform. ---
import { MediaSiteShell } from './components/media/MediaSiteShell'
import { MediaHomePage } from './components/media/MediaHomePage'
import { ContentHubPage } from './components/media/ContentHubPage'
import { ContentDetailPage } from './components/media/ContentDetailPage'
import { TopicPillarPage } from './components/media/TopicPillarPage'
import { SocialDirectoryPage } from './components/media/SocialDirectoryPage'
import { HowJifunzeWorksPage } from './components/media/HowJifunzeWorksPage'

// --- Private social operations console. Isolated from the frozen /admin shell. ---
import { RequireSocialOpsAccess } from './components/social-ops/RequireSocialOpsAccess'
import { SocialOpsShell } from './components/social-ops/SocialOpsShell'
import { SocialOpsOverviewPage } from './components/social-ops/SocialOpsOverviewPage'
import { SocialOpsAccountsPage } from './components/social-ops/SocialOpsAccountsPage'
import { SocialOpsPipelinePage } from './components/social-ops/SocialOpsPipelinePage'
import { SocialOpsSafetyPage } from './components/social-ops/SocialOpsSafetyPage'

function RedirectLegacyLibrariesAiFoundationsToCanonical() {
  return <Navigate to={PUBLIC_AI_FOUNDATIONS_BASE_PATH} replace />
}

function RedirectLegacyLibrariesAiFoundationsLessonToCanonical() {
  const { lessonSlug } = useParams<{ lessonSlug: string }>()
  return <Navigate to={`${PUBLIC_AI_FOUNDATIONS_BASE_PATH}/${lessonSlug}`} replace />
}

function HomeEntryPage() {
  const location = useLocation()
  const { user } = useAuth()
  const { tier, tierLoading } = useAppAccess()
  const legacyAuthRedirect = useMemo(() => {
    const search = new URLSearchParams(location.search)
    if (search.get('auth') === 'signup' || search.get('signup') === '1') return LEGAL_ROUTES.authSignUp
    if (search.get('auth') === 'signin') return LEGAL_ROUTES.authSignIn
    return null
  }, [location.search])

  const emailTier = useMemo(() => resolveAccessTier(user?.email), [user?.email])

  if (legacyAuthRedirect) {
    return <Navigate to={legacyAuthRedirect} replace />
  }

  if (user && isSupabaseConfigured()) {
    if (isAdminTier(emailTier)) {
      return <Navigate to={ADMIN_DEFAULT_SIGNED_IN_PATH} replace />
    }
    if (tierLoading) {
      return (
        <div className="flex min-h-[40vh] w-full items-center justify-center bg-[var(--jf-bg-page)] px-4 text-sm text-stone-600">
          Preparing your account…
        </div>
      )
    }
    if (isAdminTier(tier)) {
      return <Navigate to={ADMIN_DEFAULT_SIGNED_IN_PATH} replace />
    }
    return <Navigate to={LEARNER_DEFAULT_SIGNED_IN_PATH} replace />
  }

  // Signed-out visitors land on the public career-skills site. Signed-in routing above is
  // unchanged, and /learn keeps working exactly as it did — it is simply no longer the front door.
  return <MediaHomePage />
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
                <ProfileDisplayProvider>
                  <MaintenancePublicGate />
                </ProfileDisplayProvider>
              </AccessTierProvider>
            </LearningAccessProvider>
          </AuthProvider>
        }
      >
        {/* ---------------------------------------------------------------
            Public career-skills site. New tree; nothing here imports from
            /learn, /admin, billing or training, all frozen at
            learning-platform-frozen-2026-08-18.
        ---------------------------------------------------------------- */}
        <Route element={<MediaSiteShell />}>
          <Route path="/" element={<HomeEntryPage />} />
          <Route path="/content" element={<ContentHubPage />} />
          <Route path="/content/:slug" element={<ContentDetailPage />} />
          <Route path="/topics/:pillarSlug" element={<TopicPillarPage />} />
          <Route path="/social" element={<SocialDirectoryPage />} />
          <Route path="/about" element={<HowJifunzeWorksPage />} />
        </Route>

        {/* ---------------------------------------------------------------
            Private social operations console.
            Mounted OUTSIDE the frozen AdminShell and outside
            RequireEmailVerified / RequireDisclaimerAcknowledged, with its own
            authorization boundary. Deleting this block restores the frozen
            admin behaviour exactly.
        ---------------------------------------------------------------- */}
        <Route
          element={
            <RequireSocialOpsAccess>
              <SocialOpsShell />
            </RequireSocialOpsAccess>
          }
        >
          <Route path="/admin/social-ops" element={<SocialOpsOverviewPage />} />
          <Route path="/admin/social-ops/accounts" element={<SocialOpsAccountsPage />} />
          <Route path="/admin/social-ops/pipeline" element={<SocialOpsPipelinePage />} />
          <Route path="/admin/social-ops/safety" element={<SocialOpsSafetyPage />} />
        </Route>

        {/* ---------------------------------------------------------------
            Retired product routes.
            These were the removed multi-tenant social-content SaaS and the old
            workspace surfaces. They were deleted in May 2026 and have been
            answering 404 ever since — including `/generate`, which is still
            linked from Jifunze.ai's own April 2026 launch posts on TikTok,
            LinkedIn and X. A visitor arriving from one of those posts should
            land on what Jifunze.ai actually is now, not on a dead end and not
            on the frozen course catalog.
        ---------------------------------------------------------------- */}
        {[
          '/generate',
          '/ideas',
          '/studio',
          '/trends',
          '/insights',
          '/platform',
          '/training',
          '/team/members',
          '/team/assignments',
        ].map((path) => (
          <Route key={path} path={path} element={<Navigate to="/" replace />} />
        ))}
        <Route path="/generate/*" element={<Navigate to="/" replace />} />
        <Route path="/training/*" element={<Navigate to="/" replace />} />

        <Route path="/disclaimer" element={<FullDisclaimerPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/support" element={<LearnerSupportPage />} />
        <Route path="/contact" element={<LearnerContactPage />} />
        <Route path="/refunds" element={<RefundPolicyPage />} />
        <Route path="/pricing" element={<PublicPricingPage />} />
        {LEARNER_MONETIZATION_UI_DISABLED ? (
          <Route path="/settings/subscription" element={<PublicPausedSubscriptionPage />} />
        ) : null}
        <Route path="/paths" element={<Navigate to={{ pathname: '/learn', hash: 'available-now' }} replace />} />
        <Route path="/paths/:pathwaySlug" element={<Navigate to={{ pathname: '/learn', hash: 'available-now' }} replace />} />
        <Route path="/learn" element={<LearningDiscoveryHubPage />} />
        <Route path="/learn/free/ai-at-work-chatgpt" element={<AiAtWorkChatgptFreeStarterPage />} />
        <Route path="/learn/free/smart-workflows-with-ai" element={<SmartWorkflowsWithAiFreeStarterPage />} />
        <Route path="/learn/free/business-analytics-decision-making" element={<BusinessAnalyticsDecisionMakingFreeStarterPage />} />
        <Route path="/learn/free/5-day-mental-wellbeing-reset" element={<MentalWellbeingResetFreeStarterPage />} />
        {/* Canonical Business Analytics free workshop; legacy /learn/business-analytics-* → here */}
        <Route
          path="/learn/business-analytics-native-modules"
          element={<Navigate to="/learn/free/business-analytics-decision-making" replace />}
        />
        <Route
          path="/learn/business-analytics-decision-making"
          element={<Navigate to="/learn/free/business-analytics-decision-making" replace />}
        />
        {/* Deprecated: Business Process Automation for Work — consolidated into Business Analytics free starter (see docs/JIFUNZE_COURSE_PRODUCT_LADDER.md). */}
        <Route
          path="/learn/courses/business-process-automation-for-work"
          element={<Navigate to="/learn/free/business-analytics-decision-making" replace />}
        />
        <Route
          path="/learn/business-process-automation-for-work/*"
          element={<Navigate to="/learn/free/business-analytics-decision-making" replace />}
        />
        <Route
          path="/learn/business-process-automation-for-work"
          element={<Navigate to="/learn/free/business-analytics-decision-making" replace />}
        />
        {/* Schools surface is not published yet; redirect any deep link to the catalog. */}
        <Route path="/learn/school/:schoolId" element={<Navigate to="/learn" replace />} />
        <Route path="/learn/category/:slug" element={<LearningCategoryPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/sign-in" element={<AuthSignInPage />} />
        <Route path="/auth/sign-up" element={<AuthSignUpPage />} />
        <Route path="/learn/courses/:slug/capstone" element={<FlagshipCapstoneSubmissionPage />} />
        <Route path="/learn/courses/:slug/session/:sessionId" element={<FlagshipCourseSessionPage />} />
        <Route path="/learn/courses/:slug" element={<FlagshipCourseDetailPage />} />
        <Route path="/learn/checkout" element={<LearnerCheckoutPage />} />
        <Route path="/learn/readiness/:slug" element={<ReadinessChallengePage />} />
        <Route path="/learn/:standaloneCourseSlug/certificate" element={<StandaloneCertificatePage />} />
        <Route
          path="/learn/:standaloneCourseSlug/modules/:moduleSlug/lessons/:lessonSlug"
          element={<StandaloneLessonDetailPage />}
        />
        <Route
          path="/learn/:standaloneCourseSlug/modules/:moduleSlug/quiz"
          element={<StandaloneQuizPage />}
        />
        <Route
          path="/learn/:standaloneCourseSlug/modules/:moduleSlug"
          element={<StandaloneModuleDetailPage />}
        />
        <Route path="/learn/:standaloneCourseSlug" element={<StandaloneCourseDetailPage />} />
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
          path="/courses/learn-chatgpt-everyday-work"
          element={<Navigate to="/learn/free/ai-at-work-chatgpt" replace />}
        />
        <Route
          path="/courses/learn-chatgpt-everyday-work/learn"
          element={<Navigate to="/learn/free/ai-at-work-chatgpt" replace />}
        />
        <Route
          path="/courses/learn-chatgpt-everyday-work/learn/:lessonSlug"
          element={<Navigate to="/learn/free/ai-at-work-chatgpt" replace />}
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
            <Route element={<LearnerAppShell />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/reports" element={<LearnerReportsPage />} />
              <Route path="/my-learning" element={<MyLearningPage />} />
              <Route path="/learning/labs" element={<Navigate to="/learn" replace />} />
              <Route path="/lab" element={<Navigate to="/learn" replace />} />
              <Route path="/account" element={<LearnerAccountPage />} />
              <Route path="/settings" element={<Navigate to="/account" replace />} />
              {!LEARNER_MONETIZATION_UI_DISABLED ? (
                <Route path="/settings/subscription" element={<WorkspaceSubscriptionPage />} />
              ) : null}
            </Route>
            <Route
              element={
                <RequireAdminAccess>
                  <AdminShell />
                </RequireAdminAccess>
              }
            >
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
              <Route path="/admin/learners" element={<AdminLearnersPage />} />
              <Route path="/admin/learners/:userId" element={<AdminLearnerDetailPage />} />
              <Route path="/admin/courses" element={<AdminCoursesPage />} />
              <Route path="/admin/courses/:courseSlug" element={<AdminCourseDetailPage />} />
              <Route path="/admin/enrollments" element={<AdminEnrollmentsPage />} />
              <Route path="/admin/progress" element={<AdminProgressPage />} />
              <Route path="/admin/certificates" element={<AdminCertificatesPage />} />
              <Route path="/admin/reports" element={<AdminReportsPage />} />
              <Route path="/admin/support" element={<AdminSupportPage />} />
              <Route path="/admin/settings" element={<AdminSettingsPage />} />
              <Route path="/admin/health" element={<AdminHealthPage />} />
              <Route path="/admin/capstones" element={<AdminCapstonesReviewPage />} />
            </Route>
          </Route>
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </LearnerCommerceProvider>
  )
}
