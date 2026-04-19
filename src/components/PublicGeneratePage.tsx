import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  PUBLIC_PLATFORM_OPTIONS,
  PUBLIC_SAMPLE_TOPICS,
  PUBLIC_TONE_OPTIONS,
} from '../constants/publicGenerateUi'
import {
  buildSignupHandoffQuery,
  getPublicGenerateUsageStatus,
  persistPublicGenerateHandoff,
  PublicGenerateError,
  requestPublicGeneration,
  type PublicPlatform,
  type PublicTone,
  type PublicGenerateResult,
} from '../services/content/publicGenerate'
import { jifunzeCriticalLog } from '../lib/jifunzeTelemetry'
import { LEGAL_ROUTES, TRUST_COPY } from '../training/trustCopy'
import { TrustLegalFooterLinks } from './TrustLegalFooterLinks'
import { JifunzeBrandLogo } from './brand/JifunzeBrandLogo'
import { PublicSocialLinks } from './PublicSocialLinks'

function GroundingPill({ result }: { result: PublicGenerateResult }) {
  if (result.grounding === 'grounded') {
    return (
      <span className="inline-flex items-center rounded-full border border-zinc-300/90 bg-zinc-100/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-700">
        Grounded in public reference topics
      </span>
    )
  }
  return (
    <span className="inline-flex items-center rounded-full border border-zinc-200/95 bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-600">
      General draft · limited public signals
    </span>
  )
}

export function PublicGeneratePage() {
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState<PublicPlatform>('instagram')
  const [tone, setTone] = useState<PublicTone>('professional')
  const [result, setResult] = useState<PublicGenerateResult | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [usageTick, setUsageTick] = useState(0)

  const usage = useMemo(() => {
    void usageTick
    return getPublicGenerateUsageStatus()
  }, [usageTick])

  const canGenerate = topic.trim().length >= 3 && !loading && usage.remaining > 0

  async function onGenerate() {
    const trimmedTopic = topic.trim()
    setError(null)
    setCopied(false)
    setResult(null)
    setLoading(true)
    jifunzeCriticalLog({
      action: 'public_generate_started',
      status: 'started',
      detail: { platform, tone, topicLength: trimmedTopic.length },
    })
    try {
      const out = await requestPublicGeneration({
        topic: trimmedTopic,
        platform,
        tone,
      })
      setResult(out)
      setUsageTick((n) => n + 1)
      persistPublicGenerateHandoff({
        topic: trimmedTopic,
        platform,
        tone,
        createdAt: new Date().toISOString(),
      })
      jifunzeCriticalLog({
        action: 'public_generate_succeeded',
        status: 'ok',
        detail: { platform, tone, source: out.source },
      })
    } catch (e) {
      setResult(null)
      if (e instanceof PublicGenerateError) {
        console.error('[Jifunze.AI public generate]', {
          code: e.code,
          reason: e.reason,
          status: e.status,
          message: e.message,
        })
      } else {
        console.error('[Jifunze.AI public generate]', e)
      }
      const msg = e instanceof Error ? e.message : 'Something went wrong while generating.'
      setError(msg)
      if (e instanceof PublicGenerateError && e.code === 'limited') {
        jifunzeCriticalLog({
          action: 'public_generate_limited',
          status: 'error',
          detail: { platform, tone, reason: e.code },
        })
      }
      setUsageTick((n) => n + 1)
    } finally {
      setLoading(false)
    }
  }
  const signupHref = useMemo(
    () =>
      buildSignupHandoffQuery({
        topic: topic.trim(),
        platform,
        tone,
        createdAt: new Date().toISOString(),
      }),
    [platform, tone, topic],
  )

  async function onCopy() {
    try {
      const caption = result?.caption ?? ''
      const hashtags = result?.hashtags ?? ''
      await navigator.clipboard.writeText(`${caption}\n\n${hashtags}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setError('Copy failed. Please copy manually.')
    }
  }

  return (
    <div className="jf-public-surface min-h-screen w-full bg-[var(--jf-bg-page)] px-4 py-8 text-[var(--jf-text)] sm:py-10">
      <div className="mx-auto w-full max-w-4xl space-y-6">
        <header className="flex items-center justify-between gap-3">
          <JifunzeBrandLogo to="/" size="sm" variant="compact" surface="light" />
          <div className="flex items-center gap-2">
            <Link
              to="/?auth=signin#auth"
              className="rounded-lg border border-zinc-200/95 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-700 transition hover:bg-zinc-50"
            >
              Sign in
            </Link>
            <Link
              to="/?auth=signup#auth"
              className="rounded-lg bg-zinc-900 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-zinc-800"
            >
              Sign up
            </Link>
          </div>
        </header>

        <section className="space-y-2 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
            Caption preview
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            Start from context you can verify
          </h1>
          <p className="mx-auto max-w-xl text-sm text-zinc-600">
            When public reference topics exist, we use them to shape a draft you still own: edit tone, check facts, and decide what ships.
          </p>
        </section>

        <p className="text-left text-[11px] leading-snug text-zinc-600" data-testid="public-generate-trust-boundary">
          {TRUST_COPY.publicGeneratorTrustLine}{' '}
          <Link
            to={LEGAL_ROUTES.disclaimer}
            className="font-medium text-zinc-800 underline-offset-2 hover:text-zinc-950 hover:underline"
          >
            Full disclaimer
          </Link>
        </p>

        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <section className="space-y-4 rounded-2xl border border-zinc-200/95 bg-white p-5 shadow-sm">
            <div className="space-y-2">
              <p className="text-[11px] font-medium text-zinc-500">Try a sample topic</p>
              <div className="flex flex-wrap gap-2">
                {PUBLIC_SAMPLE_TOPICS.map((p) => (
                  <button
                    key={p}
                    type="button"
                    onClick={() => {
                      setTopic(p)
                      setError(null)
                    }}
                    className="rounded-full border border-zinc-200/95 bg-zinc-50 px-3 py-1.5 text-left text-[11px] text-zinc-700 transition hover:border-zinc-300 hover:bg-white"
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <label className="block space-y-1.5">
              <span className="text-xs text-zinc-500">Topic</span>
              <input
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="What is the post about?"
                maxLength={180}
                className="w-full rounded-lg border border-zinc-200/95 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-300/40"
              />
            </label>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="block space-y-1.5">
                <span className="text-xs text-zinc-500">Platform</span>
                <select
                  value={platform}
                  onChange={(e) => setPlatform(e.target.value as PublicPlatform)}
                  className="w-full rounded-lg border border-zinc-200/95 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-300/40"
                >
                  {PUBLIC_PLATFORM_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="block space-y-1.5">
                <span className="text-xs text-zinc-500">Tone</span>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value as PublicTone)}
                  className="w-full rounded-lg border border-zinc-200/95 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-300/40"
                >
                  {PUBLIC_TONE_OPTIONS.map((opt) => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="flex items-center justify-between gap-3">
              <p className="text-[11px] text-zinc-600">Free previews left today (this browser): {usage.remaining}</p>
              <button
                type="button"
                disabled={!canGenerate}
                onClick={() => void onGenerate()}
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                {loading ? 'Working…' : 'Try preview'}
              </button>
            </div>

            {error ? (
              <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-900" role="alert">
                {error}
              </p>
            ) : null}
          </section>

          <section className="space-y-4 rounded-2xl border border-zinc-200/95 bg-zinc-50/80 p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-semibold text-zinc-900">Suggested post</h2>
              {result ? <GroundingPill result={result} /> : null}
            </div>
            {loading ? (
              <div className="space-y-2">
                <div className="h-3 w-full max-w-md animate-pulse rounded bg-zinc-200" />
                <div className="h-3 max-w-lg animate-pulse rounded bg-zinc-200/90" style={{ width: '92%' }} />
                <p className="text-sm text-zinc-600">Gathering reference signals and drafting…</p>
              </div>
            ) : result ? (
              <div className="space-y-5">
                <div className="space-y-2 rounded-xl border border-zinc-200/90 bg-white p-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">Reference summary</p>
                  <p className="text-sm leading-relaxed text-zinc-800">{result.signals_summary}</p>
                  {result.signal_items.length ? (
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] text-zinc-700">
                      {result.signal_items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-2 text-[13px] text-zinc-500">No extra bullet list—details are in the summary.</p>
                  )}
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">Suggested angle</p>
                  <p className="text-sm leading-relaxed text-zinc-800">{result.suggested_angle}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">Caption draft</p>
                  <p className="text-sm leading-relaxed text-zinc-900">{result.caption}</p>
                </div>

                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-zinc-500">Hashtags</p>
                  <p className="font-mono text-sm text-zinc-200/90">{result.hashtags}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={() => void onCopy()}
                    className="rounded-lg border border-zinc-200/95 bg-white px-3 py-1.5 text-xs text-zinc-800 transition hover:bg-zinc-50"
                  >
                    {copied ? 'Copied' : 'Copy caption + hashtags'}
                  </button>
                  <p className="text-[11px] text-zinc-500">Verify facts and tone before publishing.</p>
                </div>
              </div>
            ) : (
              <div className="space-y-2 rounded-xl border border-dashed border-zinc-300/95 bg-white/80 px-4 py-6 text-left">
                <p className="text-sm text-zinc-700">Output will show a short reference summary, a suggested angle, caption, and hashtags.</p>
                <p className="text-[13px] text-zinc-500">
                  Add a topic (three or more characters) or tap a sample above, then choose platform and tone.
                </p>
              </div>
            )}
          </section>
        </div>

        {!result && !loading ? (
          <section className="rounded-2xl border border-zinc-200/95 bg-white p-5 text-center shadow-sm">
            <p className="text-sm text-zinc-800">Want to save drafts and go further?</p>
            <p className="mt-2 text-[13px] text-zinc-500">Create a free account when you&apos;re ready—no pressure to sign up before you preview.</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/?auth=signup#auth"
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Sign up
              </Link>
              <Link
                to="/?auth=signin#auth"
                className="rounded-lg border border-zinc-200/95 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50"
              >
                Sign in
              </Link>
            </div>
          </section>
        ) : null}

        {result && !loading ? (
          <section className="rounded-2xl border border-zinc-200/95 bg-white p-5 text-center shadow-sm">
            <p className="text-sm text-zinc-800">Want to keep going?</p>
            <p className="mt-2 text-[13px] text-zinc-500">Save your draft and open the workspace when you&apos;re ready for more previews.</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <Link
                to={signupHref}
                onClick={() =>
                  jifunzeCriticalLog({
                    action: 'public_generate_signup_clicked',
                    status: 'started',
                    detail: { cta: 'continue_workspace' },
                  })
                }
                className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-zinc-800"
              >
                Save your work
              </Link>
              <Link to="/?auth=signin#auth" className="text-sm font-semibold text-zinc-600 hover:text-zinc-900">
                Sign in
              </Link>
            </div>
          </section>
        ) : null}

        <footer className="border-t border-zinc-200/90 pt-4">
          <TrustLegalFooterLinks variant="compact" className="mb-4 justify-center text-zinc-500" />
          <PublicSocialLinks />
        </footer>
      </div>
    </div>
  )
}
