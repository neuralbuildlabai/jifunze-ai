import { useEffect, useMemo } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthSignInPage } from './components/auth/AuthSignInPage'
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage'
import { ResetPasswordPage } from './components/auth/ResetPasswordPage'
import { AccessTierProvider } from './access/AccessTierProvider'
import { useAppAccess } from './access/useAppAccess'
import { resolveAccessTier } from './access/appAccess'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { PrivacyPolicyPage } from './components/legal/PrivacyPolicyPage'
import { TermsOfServicePage } from './components/legal/TermsOfServicePage'
import { LearnerContactPage } from './components/legal/LearnerContactPage'
import { logEnvValidationFailure, validateStartupEnv } from './lib/envCheck'
import { MaintenancePublicGate } from './components/maintenance/MaintenancePublicGate'
import { NotFoundPage } from './components/NotFoundPage'
import { RetiredRoutePage } from './components/RetiredRoutePage'
import { ProfileDisplayProvider } from './profile/ProfileDisplayProvider'
import { isAdminTier } from './lib/admin/adminAccess'
import { ADMIN_DEFAULT_SIGNED_IN_PATH } from './lib/signedInDefaultRoute'
import { isSupabaseConfigured } from './config/supabaseEnv'

// --- Public site: the Jifunze social-learning landing pages. ---
import { MediaSiteShell } from './components/media/MediaSiteShell'
import { MediaHomePage } from './components/media/MediaHomePage'
import { ContentHubPage } from './components/media/ContentHubPage'
import { ContentDetailPage } from './components/media/ContentDetailPage'
import { TopicPillarPage } from './components/media/TopicPillarPage'
import { SocialDirectoryPage } from './components/media/SocialDirectoryPage'
import { HowJifunzeWorksPage } from './components/media/HowJifunzeWorksPage'

// --- Private social operations console (admin-only). ---
import { RequireSocialOpsAccess } from './components/social-ops/RequireSocialOpsAccess'
import { SocialOpsShell } from './components/social-ops/SocialOpsShell'
import { SocialOpsOverviewPage } from './components/social-ops/SocialOpsOverviewPage'
import { SocialOpsAccountsPage } from './components/social-ops/SocialOpsAccountsPage'
import { SocialOpsPipelinePage } from './components/social-ops/SocialOpsPipelinePage'
import { SocialOpsSafetyPage } from './components/social-ops/SocialOpsSafetyPage'

/**
 * Route families (see docs/ROUTES.md):
 *  - Public: /, /content, /content/:slug, /topics/:pillarSlug, /social, /about,
 *    /privacy, /terms, /ai-disclosure, /contact, /admin/login (+ recovery pages).
 *  - Admin: /admin/* — authenticated + server-authorized administrators only.
 *  - Retired (branded body; HTTP status via vercel.json): /learn*, /library*, /libraries*,
 *    /courses*, /paths*, /pricing, /refunds, /settings/subscription, /auth/sign-up → 410;
 *    learner/instructor workspaces → 404; retired-SaaS marketing paths → 301 to /.
 */

function HomeEntryPage() {
  const location = useLocation()
  const { user } = useAuth()
  const { tier } = useAppAccess()
  const emailTier = useMemo(() => resolveAccessTier(user?.email), [user?.email])

  // Legacy ?auth=signup / ?signup=1 deep links point at registration, which no longer exists.
  const wantsLegacyAuth = useMemo(() => {
    const search = new URLSearchParams(location.search)
    return search.get('auth') === 'signin'
  }, [location.search])

  if (wantsLegacyAuth) {
    return <Navigate to="/admin/login" replace />
  }

  if (user && isSupabaseConfigured() && (isAdminTier(emailTier) || isAdminTier(tier))) {
    return <Navigate to={ADMIN_DEFAULT_SIGNED_IN_PATH} replace />
  }

  // Everyone else — signed out, or signed in without an admin tier — sees the public site.
  return <MediaHomePage />
}

const RETIRED_COURSE_PATHS = [
  '/learn',
  '/learn/*',
  '/library/*',
  '/libraries/*',
  '/courses/*',
  '/paths',
  '/paths/*',
] as const

const RETIRED_COMMERCE_PATHS = ['/pricing', '/refunds', '/settings/subscription'] as const

const REMOVED_LEARNER_PATHS = [
  '/dashboard',
  '/my-learning',
  '/reports',
  '/account',
  '/settings',
  '/learning/labs',
  '/lab',
] as const

const RETIRED_SAAS_REDIRECTS = [
  '/generate',
  '/generate/*',
  '/ideas',
  '/studio',
  '/trends',
  '/insights',
  '/platform',
  '/training',
  '/training/*',
  '/team/members',
  '/team/assignments',
] as const

export default function App() {
  const env = useMemo(() => validateStartupEnv(), [])
  useEffect(() => {
    if (!env.ok) logEnvValidationFailure(env)
  }, [env])

  return (
    <Routes>
      <Route
        element={
          <AuthProvider>
            <AccessTierProvider>
              <ProfileDisplayProvider>
                <MaintenancePublicGate />
              </ProfileDisplayProvider>
            </AccessTierProvider>
          </AuthProvider>
        }
      >
        {/* Public site */}
        <Route element={<MediaSiteShell />}>
          <Route path="/" element={<HomeEntryPage />} />
          <Route path="/content" element={<ContentHubPage />} />
          <Route path="/content/:slug" element={<ContentDetailPage />} />
          <Route path="/topics/:pillarSlug" element={<TopicPillarPage />} />
          <Route path="/social" element={<SocialDirectoryPage />} />
          <Route path="/about" element={<HowJifunzeWorksPage />} />
        </Route>

        {/* Legal */}
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsOfServicePage />} />
        <Route path="/contact" element={<LearnerContactPage />} />
        <Route path="/disclaimer" element={<Navigate to="/terms" replace />} />
        <Route path="/support" element={<Navigate to="/contact" replace />} />

        {/* Administrator authentication (invite-only; no public registration) */}
        <Route path="/admin/login" element={<AuthSignInPage />} />
        <Route path="/auth/sign-in" element={<Navigate to="/admin/login" replace />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/auth/sign-up" element={<RetiredRoutePage kind="registration" />} />

        {/* Social operations console (admin) */}
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
        <Route path="/admin" element={<Navigate to="/admin/social-ops" replace />} />

        {/* Retired course / commerce surfaces — HTTP 410 comes from vercel.json */}
        {RETIRED_COURSE_PATHS.map((path) => (
          <Route key={path} path={path} element={<RetiredRoutePage kind="courses" />} />
        ))}
        {RETIRED_COMMERCE_PATHS.map((path) => (
          <Route key={path} path={path} element={<RetiredRoutePage kind="commerce" />} />
        ))}

        {/* Removed learner workspace — plain 404 (learner accounts are not a public concept) */}
        {REMOVED_LEARNER_PATHS.map((path) => (
          <Route key={path} path={path} element={<NotFoundPage />} />
        ))}

        {/* Retired-SaaS marketing paths still linked from April 2026 posts — home */}
        {RETIRED_SAAS_REDIRECTS.map((path) => (
          <Route key={path} path={path} element={<Navigate to="/" replace />} />
        ))}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
