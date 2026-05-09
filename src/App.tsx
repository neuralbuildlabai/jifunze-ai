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
import { LearningAccessProvider } from './learning/LearningAccessContext'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { FullDisclaimerPage } from './components/legal/FullDisclaimerPage'
import { PrivacyPolicyPage } from './components/legal/PrivacyPolicyPage'
import { PublicPausedSubscriptionPage } from './components/legal/PublicPausedSubscriptionPage'
import { PublicPricingPage } from './components/legal/PublicPricingPage'
import { RefundPolicyPage } from './components/legal/RefundPolicyPage'
import { TermsOfServicePage } from './components/legal/TermsOfServicePage'
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage'
import { RequireDisclaimerAcknowledged } from './components/auth/RequireDisclaimerAcknowledged'
import { RequireEmailVerified } from './components/auth/RequireEmailVerified'
import { ResetPasswordPage } from './components/auth/ResetPasswordPage'
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
import { PublicHomePage } from './components/landing/PublicHomePage'
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
import { logEnvValidationFailure, validateStartupEnv } from './lib/envCheck'
import type { EnvCheckResult } from './lib/envCheck'
import { PUBLIC_AI_FOUNDATIONS_BASE_PATH } from './data/publicStarterLibraries/aiFoundations'
import { LEGAL_ROUTES } from './training/trustCopy'
import { MaintenancePublicGate } from './components/maintenance/MaintenancePublicGate'
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

  return <PublicHomePage />
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
        {LEARNER_MONETIZATION_UI_DISABLED ? (
          <Route path="/settings/subscription" element={<PublicPausedSubscriptionPage />} />
        ) : null}
        <Route path="/paths" element={<Navigate to={{ pathname: '/learn', hash: 'schools' }} replace />} />
        <Route path="/paths/:pathwaySlug" element={<Navigate to={{ pathname: '/learn', hash: 'schools' }} replace />} />
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
              {!LEARNER_MONETIZATION_UI_DISABLED ? (
                <Route path="/settings/subscription" element={<WorkspaceSubscriptionPage />} />
              ) : null}
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
