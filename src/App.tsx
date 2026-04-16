import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { AuthForm } from './components/AuthForm'
import { ContentGenerator } from './components/ContentGenerator'
import { InternalUatDiagnostics } from './components/InternalUatDiagnostics'
import { PublicGeneratePage } from './components/PublicGeneratePage'
import { PublicSocialLinks } from './components/PublicSocialLinks'
import { SystemStatusBanner } from './components/SystemStatusBanner'
import { isSupabaseConfigured } from './config/supabaseEnv'
import { logEnvValidationFailure, validateStartupEnv } from './lib/envCheck'
import type { EnvCheckResult } from './lib/envCheck'

function AppChrome({ env }: { env: EnvCheckResult }) {
  const { user, session } = useAuth()
  if (!user) return null
  const accessToken = session?.access_token
  return (
    <div className="sticky top-0 z-50">
      <SystemStatusBanner env={env} accessToken={accessToken} />
      <InternalUatDiagnostics key={user?.id ?? 'guest'} />
    </div>
  )
}

function HomeEntryPage() {
  const { user } = useAuth()
  const location = useLocation()
  const [previewTopic, setPreviewTopic] = useState('')
  const [previewPlatform, setPreviewPlatform] = useState<'tiktok' | 'instagram' | 'x'>('tiktok')
  const [previewTone, setPreviewTone] = useState<'casual' | 'premium' | 'bold'>('casual')
  const [previewBusy, setPreviewBusy] = useState(false)
  const [showPreviewResult, setShowPreviewResult] = useState(true)
  const search = new URLSearchParams(location.search)
  const authMode = search.get('auth') === 'signup' || search.get('signup') === '1' ? 'signup' : search.get('auth') === 'signin' ? 'signin' : null
  if (user) {
    return (
      <div className="min-h-screen w-full bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/25 via-zinc-950 to-zinc-950 px-4 py-12 text-zinc-100">
        <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-2xl items-center justify-center">
          <ContentGenerator />
        </div>
      </div>
    )
  }

  const previewCaption = useMemo(() => {
    const topic = previewTopic.trim() || 'launching a new skincare product'
    const tonePrefix =
      previewTone === 'premium'
        ? 'Luxury drop alert'
        : previewTone === 'bold'
          ? 'Stop scrolling'
          : 'Quick update'
    const platformCue =
      previewPlatform === 'tiktok'
        ? 'Hook in 2 seconds, then show texture + routine in fast cuts.'
        : previewPlatform === 'instagram'
          ? 'Open with a punchy first line, then a clean before/after value angle.'
          : 'Lead with one sharp insight, then a short proof point and clear CTA.'
    return `${tonePrefix}: ${topic}. ${platformCue} Invite comments with a simple question and end with one clear action.`
  }, [previewPlatform, previewTone, previewTopic])

  const previewHashtags = useMemo(() => {
    if (previewPlatform === 'tiktok') return '#skincaretips #beautytok #productlaunch'
    if (previewPlatform === 'instagram') return '#skincare #beautycreator #newlaunch'
    return '#brandlaunch #socialstrategy #creatorgrowth'
  }, [previewPlatform])

  async function runPreviewGenerate() {
    setPreviewBusy(true)
    setShowPreviewResult(false)
    await new Promise((resolve) => window.setTimeout(resolve, 420))
    setShowPreviewResult(true)
    setPreviewBusy(false)
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-zinc-950 to-zinc-950 px-4 py-6 text-zinc-100 sm:py-7">
      <div className="pointer-events-none absolute left-1/2 top-24 h-64 w-[46rem] -translate-x-1/2 rounded-full bg-violet-600/10 blur-3xl" aria-hidden />
      <div className="mx-auto w-full max-w-5xl space-y-5">
        <header className="flex items-center justify-between">
          <p className="text-sm font-semibold tracking-wide text-zinc-200">Jifunze.AI</p>
          <div className="flex items-center gap-2">
            <Link
              to="/generate"
              className="rounded-lg bg-violet-500/90 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-violet-500"
            >
              Try Free
            </Link>
            {isSupabaseConfigured() ? (
              <Link
                to="/?auth=signin#auth"
                className="rounded-lg border border-zinc-700 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition hover:border-zinc-600"
              >
                Sign In
              </Link>
            ) : null}
          </div>
        </header>

        <section className="grid gap-5 rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-5 shadow-2xl shadow-black/20 backdrop-blur-sm lg:grid-cols-[1.02fr_0.98fr] lg:gap-7 lg:p-7">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="inline-flex rounded-full border border-violet-500/30 bg-violet-950/35 px-3 py-1 text-[11px] font-medium text-violet-200">
                AI-powered social creation
              </p>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.65rem]">
                Create smarter social content with Jifunze.AI
              </h1>
              <p className="max-w-xl text-sm leading-relaxed text-zinc-300">
                Generate polished captions in seconds. Try it instantly and upgrade when ready.
              </p>
            </div>

            <ul className="space-y-2 text-sm text-zinc-300">
              <li>Generate captions in seconds</li>
              <li>No signup required to try</li>
              <li>Upgrade to full automation</li>
            </ul>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/generate"
                className="rounded-xl border border-zinc-700 bg-zinc-900/35 px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-zinc-600"
              >
                Generate your first post
              </Link>
              {isSupabaseConfigured() ? (
                <Link
                  to="/?auth=signin#auth"
                  className="rounded-xl border border-zinc-700 px-4 py-2.5 text-xs font-semibold text-zinc-300 transition hover:border-zinc-600"
                >
                  Sign in
                </Link>
              ) : null}
              {isSupabaseConfigured() ? (
                <Link
                  to="/?auth=signup#auth"
                  className="text-xs font-semibold text-violet-300/90 transition hover:text-violet-200"
                >
                  Create free account
                </Link>
              ) : null}
            </div>
          </div>

          <div className="relative rounded-2xl border border-zinc-800/85 bg-zinc-950/70 p-4 shadow-xl shadow-black/30">
            <div className="pointer-events-none absolute inset-x-8 top-8 h-16 rounded-full bg-violet-500/10 blur-2xl" aria-hidden />
            <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Live preview</p>
            <div className="mt-3 space-y-3">
              <label className="block space-y-1.5">
                <span className="text-[11px] text-zinc-400">What do you want to post about?</span>
                <input
                  value={previewTopic}
                  onChange={(e) => setPreviewTopic(e.target.value)}
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-[15px] text-zinc-100 outline-none transition focus:border-violet-500/50"
                  placeholder="e.g. launching a new skincare product…"
                />
              </label>

              <div className="space-y-2">
                <p className="text-[11px] text-zinc-500">Platform</p>
                <div className="flex flex-wrap gap-2">
                  {(['tiktok', 'instagram', 'x'] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPreviewPlatform(p)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
                        previewPlatform === p
                          ? 'border border-violet-500/40 bg-violet-500/20 text-violet-100'
                          : 'border border-zinc-700 bg-zinc-900/40 text-zinc-300 hover:border-zinc-600'
                      }`}
                    >
                      {p === 'x' ? 'X' : p === 'tiktok' ? 'TikTok' : 'Instagram'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] text-zinc-500">Tone</p>
                <div className="flex flex-wrap gap-2">
                  {(['casual', 'premium', 'bold'] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setPreviewTone(t)}
                      className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition ${
                        previewTone === t
                          ? 'border border-violet-500/40 bg-violet-500/20 text-violet-100'
                          : 'border border-zinc-700 bg-zinc-900/40 text-zinc-300 hover:border-zinc-600'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={() => void runPreviewGenerate()}
                className="w-full rounded-lg bg-violet-500/95 px-3 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
              >
                Generate post
              </button>
            </div>

            <div className="mt-4 rounded-xl border border-violet-500/30 bg-violet-950/20 p-3 shadow-lg shadow-violet-950/25">
              <p className="text-xs font-medium text-violet-200/95">✨ AI-generated caption</p>
              {previewBusy ? (
                <div className="mt-2 space-y-2 animate-pulse">
                  <div className="h-3 w-11/12 rounded bg-zinc-700/70" />
                  <div className="h-3 w-10/12 rounded bg-zinc-700/70" />
                  <div className="h-3 w-9/12 rounded bg-zinc-700/70" />
                  <p className="text-[11px] text-zinc-500">Generating your caption…</p>
                </div>
              ) : showPreviewResult ? (
                <>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-100">{previewCaption}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {previewHashtags.split(' ').map((tag) => (
                      <span key={tag} className="rounded-full border border-zinc-700/80 bg-zinc-900/45 px-2 py-0.5 text-[11px] text-violet-200/80">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      type="button"
                      className="rounded-md border border-zinc-700 bg-zinc-950 px-2.5 py-1 text-[11px] text-zinc-300"
                    >
                      Copy
                    </button>
                    <p className="text-[11px] text-zinc-500">
                      Ready for {previewPlatform === 'x' ? 'X' : previewPlatform === 'tiktok' ? 'TikTok' : 'Instagram'} • Optimized for engagement
                    </p>
                  </div>
                </>
              ) : null}
            </div>
          </div>
        </section>

        {isSupabaseConfigured() && authMode ? (
          <section
            id="auth"
            className="rounded-2xl border border-zinc-800/85 bg-zinc-950/70 p-4 shadow-xl shadow-black/25"
          >
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-zinc-100">
                  {authMode === 'signup' ? 'Create your Jifunze.AI account' : 'Sign in to Jifunze.AI'}
                </p>
                <p className="text-xs text-zinc-500">
                  {authMode === 'signup'
                    ? 'Save your generated posts and unlock more automation.'
                    : 'Continue to your workspace and saved content.'}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <Link to="/?auth=signin#auth" className="text-zinc-400 hover:text-zinc-200">
                  Sign in
                </Link>
                <Link to="/?auth=signup#auth" className="text-violet-300/90 hover:text-violet-200">
                  Sign up
                </Link>
              </div>
            </div>
            <AuthForm initialMode={authMode} />
          </section>
        ) : null}

        <footer className="border-t border-zinc-800/75 pt-4">
          <PublicSocialLinks />
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
    <Routes>
      <Route path="/generate" element={<PublicGeneratePage />} />
      <Route
        path="/"
        element={
          <AuthProvider>
            <AppChrome env={env} />
            <HomeEntryPage />
          </AuthProvider>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
