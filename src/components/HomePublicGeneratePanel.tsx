import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  PUBLIC_PLATFORM_OPTIONS,
  PUBLIC_SAMPLE_TOPICS,
  PUBLIC_TONE_OPTIONS,
} from '../constants/publicGenerateUi'
import { jifunzeCriticalLog } from '../lib/jifunzeTelemetry'
import { LEGAL_ROUTES, TRUST_COPY } from '../training/trustCopy'
import { TrustBoundaryStrip } from './TrustBoundaryStrip'
import {
  buildSignupHandoffQuery,
  getPublicGenerateUsageStatus,
  persistPublicGenerateHandoff,
  PublicGenerateError,
  requestPublicGeneration,
  type PublicGenerateResult,
  type PublicPlatform,
  type PublicTone,
} from '../services/content/publicGenerate'

type Props = {
  /** Anchor id for in-page “Try” links */
  sectionId?: string
  /**
   * Landing page: avoid repeating the full trust strip—use a short posting reminder + disclaimer link only.
   */
  landingMinimalTrust?: boolean
  /** Softer chrome when the panel sits below the hero as a supporting tool (not a split-screen hero peer). */
  supportingPlacement?: boolean
}

export function HomePublicGeneratePanel({
  sectionId = 'try-jifunze',
  landingMinimalTrust = false,
  supportingPlacement = false,
}: Props) {
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState<PublicPlatform>('instagram')
  const [tone, setTone] = useState<PublicTone>('professional')
  const [preview, setPreview] = useState<PublicGenerateResult | null>(null)
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
    setPreview(null)
    setLoading(true)
    jifunzeCriticalLog({
      action: 'public_generate_started',
      status: 'started',
      detail: { platform, tone, topicLength: trimmedTopic.length, surface: 'homepage' },
    })
    try {
      const out = await requestPublicGeneration({
        topic: trimmedTopic,
        platform,
        tone,
      })
      setPreview(out)
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
        detail: { platform, tone, source: out.source, surface: 'homepage' },
      })
    } catch (e) {
      setPreview(null)
      if (e instanceof PublicGenerateError) {
        console.error('[Jifunze.AI public generate]', {
          code: e.code,
          reason: e.reason,
          status: e.status,
          message: e.message,
          surface: 'homepage',
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
          detail: { platform, tone, reason: e.code, surface: 'homepage' },
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
      const caption = preview?.caption ?? ''
      const hashtags = preview?.hashtags ?? ''
      await navigator.clipboard.writeText(`${caption}\n\n${hashtags}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setError('Copy failed. Please copy manually.')
    }
  }

  const shellClass = landingMinimalTrust
    ? supportingPlacement
      ? 'relative scroll-mt-28 rounded-2xl border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-5 shadow-[var(--jf-shadow-soft)] ring-1 ring-white/[0.035] sm:p-6'
      : 'relative scroll-mt-28 rounded-[2rem] border border-[color:var(--jf-border)] bg-[color:var(--jf-surface)] p-6 shadow-[var(--jf-shadow-soft)] ring-1 ring-white/[0.035] sm:rounded-[2.25rem] sm:p-7'
    : 'relative scroll-mt-24 rounded-[1.5rem] border border-[var(--jf-border)] bg-[color:var(--jf-surface)] p-5 shadow-[0_16px_48px_rgba(0,0,0,0.28)] transition-shadow duration-300 sm:p-6'

  const accentClass = landingMinimalTrust
    ? ''
    : 'pointer-events-none absolute -inset-px rounded-[1.5rem] bg-gradient-to-b from-white/[0.05] via-transparent to-transparent opacity-90'

  return (
    <section
      id={sectionId}
      className={shellClass}
      aria-labelledby="home-generate-heading"
    >
      {accentClass ? <div className={accentClass} aria-hidden /> : null}
      <div className="relative">
        <div className="mb-4 flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            {landingMinimalTrust ? (
              <p className="text-[12px] font-semibold uppercase tracking-[0.08em] text-[color:var(--jf-muted)]">Try preview</p>
            ) : null}
            <h2
              id="home-generate-heading"
              className={`font-semibold tracking-tight ${landingMinimalTrust ? (supportingPlacement ? 'text-base text-[color:var(--jf-text)] sm:text-lg' : 'text-lg text-[color:var(--jf-text)] sm:text-[1.35rem]') : 'text-base text-white'}`}
            >
              Draft a post from a topic
            </h2>
            <p className={`${landingMinimalTrust ? 'text-[14px] leading-relaxed text-[color:var(--jf-muted)]' : 'text-sm text-zinc-400/80'}`}>
              You get a starting draft to edit. Check facts and tone before you post—this is a helper, not autopilot.
            </p>
          </div>
          <p className={`shrink-0 ${landingMinimalTrust ? 'text-[12px] text-[color:var(--jf-muted)]' : 'text-[11px] text-zinc-400/75'}`}>
            Free previews left today:{' '}
            <span className="font-semibold tabular-nums text-[color:var(--jf-text)]">{usage.remaining}</span>
          </p>
        </div>

        {landingMinimalTrust ? (
          <p
            className="mb-4 text-[12px] leading-relaxed text-[color:var(--jf-muted)]"
            data-testid="home-generate-trust-boundary"
          >
            {TRUST_COPY.publicGeneratorTrustLine}{' '}
            <Link
              to={LEGAL_ROUTES.disclaimer}
              className="font-medium text-[color:var(--jf-text)] underline-offset-2 hover:underline"
            >
              Full disclaimer
            </Link>
          </p>
        ) : (
          <div className="mb-3">
            <TrustBoundaryStrip compact dataTestId="home-generate-trust-boundary" />
          </div>
        )}

        <div className={`mb-2.5 flex flex-wrap gap-2 ${landingMinimalTrust ? 'gap-2' : ''}`}>
          {PUBLIC_SAMPLE_TOPICS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setTopic(p)
                setError(null)
              }}
              className={`rounded-full px-3 py-1.5 text-left text-[12px] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)] ${landingMinimalTrust ? 'border border-[color:var(--jf-border)] bg-[color:var(--jf-surface-elevated)] text-[color:var(--jf-text)] hover:border-white/[0.12] hover:bg-[color:var(--jf-surface)]' : 'border border-white/[0.08] bg-white/[0.04] text-zinc-300 hover:border-white/[0.12] hover:bg-white/[0.07] hover:text-zinc-50'}`}
            >
              {p}
            </button>
          ))}
        </div>

        <label className={`mb-2.5 block space-y-1.5 ${landingMinimalTrust ? 'space-y-1' : ''}`}>
          <span className={`text-xs ${landingMinimalTrust ? 'text-[color:var(--jf-muted)]' : 'text-zinc-400'}`}>
            What&apos;s your post about?
          </span>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="What you’re posting about—plain words are fine"
            maxLength={180}
            className={`w-full rounded-2xl px-3 text-[15px] outline-none transition-colors duration-200 ${landingMinimalTrust ? 'border border-[color:var(--jf-border)] bg-[color:var(--jf-surface-elevated)] py-3 text-[color:var(--jf-text)] shadow-inner shadow-[rgba(18,20,26,0.2)] placeholder:text-[color:var(--jf-subtle)] focus-visible:border-white/[0.14] focus-visible:ring-2 focus-visible:ring-[color:var(--jf-focus-ring)]' : 'rounded-xl border border-white/[0.1] bg-[rgba(13,12,19,0.78)] py-2.5 text-zinc-100 focus:border-white/20 focus-visible:ring-2 focus-visible:ring-white/15'}`}
          />
        </label>

        <div className={`mb-3 grid sm:grid-cols-2 ${landingMinimalTrust ? 'gap-2.5' : 'gap-3'}`}>
          <label className="block space-y-1.5">
            <span className={`text-xs ${landingMinimalTrust ? 'text-[color:var(--jf-muted)]' : 'text-zinc-400'}`}>Platform</span>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as PublicPlatform)}
              className={`w-full rounded-xl px-3 py-2 text-sm outline-none transition-colors duration-200 ${landingMinimalTrust ? 'border border-[color:var(--jf-border)] bg-[color:var(--jf-surface-elevated)] text-[color:var(--jf-text)] focus-visible:border-white/[0.14] focus-visible:ring-2 focus-visible:ring-[color:var(--jf-focus-ring)]' : 'rounded-lg border border-white/[0.1] bg-[rgba(13,12,19,0.78)] text-zinc-100 focus:border-white/20 focus-visible:ring-2 focus-visible:ring-white/15'}`}
            >
              {PUBLIC_PLATFORM_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block space-y-1.5">
            <span className={`text-xs ${landingMinimalTrust ? 'text-[color:var(--jf-muted)]' : 'text-zinc-400'}`}>Tone</span>
            <select
              value={tone}
              onChange={(e) => setTone(e.target.value as PublicTone)}
              className={`w-full rounded-xl px-3 py-2 text-sm outline-none transition-colors duration-200 ${landingMinimalTrust ? 'border border-[color:var(--jf-border)] bg-[color:var(--jf-surface-elevated)] text-[color:var(--jf-text)] focus-visible:border-white/[0.14] focus-visible:ring-2 focus-visible:ring-[color:var(--jf-focus-ring)]' : 'rounded-lg border border-white/[0.1] bg-[rgba(13,12,19,0.78)] text-zinc-100 focus:border-white/20 focus-visible:ring-2 focus-visible:ring-white/15'}`}
            >
              {PUBLIC_TONE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className={`mb-3 flex flex-wrap items-center ${landingMinimalTrust ? 'gap-2.5' : 'gap-3'}`}>
          <button
            type="button"
            disabled={!canGenerate}
            onClick={() => void onGenerate()}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)] disabled:cursor-not-allowed disabled:opacity-40 ${landingMinimalTrust ? 'bg-[var(--jf-brand)] text-zinc-950 shadow-[var(--jf-shadow-soft)] hover:bg-[var(--jf-brand-hover)]' : 'bg-[var(--jf-brand)] text-white hover:bg-[var(--jf-brand-hover)] shadow-lg shadow-black/35'}`}
          >
            {loading ? 'Working…' : 'Try preview'}
          </button>
          <Link
            to="/generate"
            className={`text-sm font-medium underline-offset-4 transition-colors duration-200 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)] ${landingMinimalTrust ? 'text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]' : 'text-zinc-400/75 hover:text-zinc-200'}`}
          >
            {landingMinimalTrust ? 'Open full preview page' : 'Open full-screen trial'}
          </Link>
        </div>

        {error ? (
          <p
            className="mb-4 rounded-2xl border border-rose-500/25 bg-rose-950/35 px-3 py-2.5 text-sm text-rose-100 ring-1 ring-rose-400/15"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div
          className={`rounded-2xl ${landingMinimalTrust ? 'min-h-[11.75rem] border border-[color:var(--jf-border)] bg-[color:var(--jf-surface-elevated)]/90 p-5 shadow-inner shadow-[rgba(18,20,26,0.18)] sm:min-h-[12.25rem]' : 'border border-white/[0.06] bg-[rgba(255,255,255,0.025)] p-4'}`}
        >
          <p
            className={`font-medium ${landingMinimalTrust ? 'text-[12px] font-semibold uppercase tracking-[0.06em] text-[color:var(--jf-muted)]' : 'text-[11px] uppercase tracking-[0.08em] text-zinc-500/90'}`}
          >
            {landingMinimalTrust ? 'Preview output' : 'Suggested post'}
          </p>
          {loading ? (
            <div className="mt-3 space-y-2">
              <div className={`h-3 w-full max-w-md animate-pulse rounded ${landingMinimalTrust ? 'bg-[color:var(--jf-subtle)]/35' : 'bg-zinc-700/60'}`} />
              <div className={`h-3 max-w-lg animate-pulse rounded ${landingMinimalTrust ? 'bg-[color:var(--jf-subtle)]/28' : 'bg-zinc-700/50'}`} style={{ width: '92%' }} />
              <p className={`${landingMinimalTrust ? 'text-sm text-[color:var(--jf-muted)]' : 'text-sm text-zinc-400/80'}`}>
                Drafting…
              </p>
            </div>
          ) : !preview ? (
            <div className={`mt-3 px-1 py-4 ${landingMinimalTrust ? '' : 'rounded-xl border border-dashed border-white/[0.08] bg-[rgba(0,0,0,0.12)] px-3 py-3.5'}`}>
              <p className={`leading-relaxed ${landingMinimalTrust ? 'text-[15px] text-[color:var(--jf-muted)]' : 'text-sm text-zinc-300/90'}`}>
                {landingMinimalTrust
                  ? 'Caption and hashtags appear here after you run the preview. Nothing goes live unless you copy or post it yourself.'
                  : 'Build a draft to see signals, an angle, your caption, and hashtags here.'}
              </p>
              <p className={`mt-2 leading-relaxed ${landingMinimalTrust ? 'text-[13px] text-[color:var(--jf-subtle)]' : 'text-[11px] text-zinc-500/90'}`}>
                {landingMinimalTrust
                  ? 'Use a sample line below or type what you’re actually posting about.'
                  : 'Tip: choose platform and tone first, or tap an example topic above.'}
              </p>
            </div>
          ) : (
            <>
              <div className={`mt-3 rounded-xl p-3 ${landingMinimalTrust ? 'border border-[color:var(--jf-border)] bg-[color:var(--jf-bg-page)]' : 'border border-white/[0.06] bg-black/15'}`}>
                <p className={`text-[11px] font-medium uppercase tracking-wide ${landingMinimalTrust ? 'text-[color:var(--jf-muted)]' : 'text-zinc-500'}`}>Summary</p>
                <p className={`mt-1 text-[13px] leading-snug ${landingMinimalTrust ? 'text-[color:var(--jf-text)]' : 'text-zinc-300'}`}>{preview.signals_summary}</p>
              </div>
              <p className={`mt-3 text-[11px] font-medium uppercase tracking-wide ${landingMinimalTrust ? 'text-[color:var(--jf-muted)]' : 'text-zinc-500'}`}>Suggested angle</p>
              <p className={`mt-1 text-[13px] leading-snug ${landingMinimalTrust ? 'text-[color:var(--jf-muted)]' : 'text-zinc-200'}`}>{preview.suggested_angle}</p>
              <p className={`mt-3 text-[11px] font-medium uppercase tracking-wide ${landingMinimalTrust ? 'text-[color:var(--jf-muted)]' : 'text-zinc-500'}`}>Caption draft</p>
              <p className={`mt-1 text-[15px] leading-relaxed ${landingMinimalTrust ? 'text-[color:var(--jf-text)]' : 'text-zinc-100'}`}>{preview.caption}</p>
              <p className={`mt-3 text-[11px] font-medium uppercase tracking-wide ${landingMinimalTrust ? 'text-[color:var(--jf-muted)]' : 'text-zinc-500'}`}>Hashtags</p>
              <p className={`mt-1 font-mono text-sm ${landingMinimalTrust ? 'text-[color:var(--jf-muted)]' : 'text-teal-100/90'}`}>{preview.hashtags}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => void onCopy()}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--jf-focus-ring)] ${landingMinimalTrust ? 'bg-[var(--jf-brand)] text-zinc-950 hover:bg-[var(--jf-brand-hover)]' : 'border border-zinc-600 bg-zinc-950 text-zinc-200 hover:border-zinc-500'}`}
                >
                  {copied ? 'Copied' : 'Copy all'}
                </button>
                <Link
                  to={signupHref}
                  onClick={() =>
                    jifunzeCriticalLog({
                      action: 'public_generate_signup_clicked',
                      status: 'started',
                      detail: { cta: 'save_workspace', surface: 'homepage' },
                    })
                  }
                  className={`text-xs font-semibold ${landingMinimalTrust ? 'text-[color:var(--jf-muted)] hover:text-[color:var(--jf-text)]' : 'text-zinc-300 hover:text-white'}`}
                >
                  Save your work →
                </Link>
              </div>
            </>
          )}
        </div>
        {!landingMinimalTrust ? (
          <p className="relative mt-4 border-t border-white/[0.06] pt-3 text-[11px] leading-relaxed text-zinc-600">
            {TRUST_COPY.publicDraftAssistive}
          </p>
        ) : null}
      </div>
    </section>
  )
}
