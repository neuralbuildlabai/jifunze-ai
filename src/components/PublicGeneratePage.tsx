import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  buildSignupHandoffQuery,
  getPublicGenerateUsageStatus,
  persistPublicGenerateHandoff,
  PublicGenerateError,
  requestPublicGeneration,
  type PublicPlatform,
  type PublicTone,
} from '../services/content/publicGenerate'
import { jifunzeCriticalLog } from '../lib/jifunzeTelemetry'
import { PublicSocialLinks } from './PublicSocialLinks'

const PLATFORM_OPTIONS: Array<{ id: PublicPlatform; label: string }> = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'x', label: 'X' },
  { id: 'linkedin', label: 'LinkedIn' },
  { id: 'facebook', label: 'Facebook' },
]

const TONE_OPTIONS: Array<{ id: PublicTone; label: string }> = [
  { id: 'professional', label: 'Professional' },
  { id: 'friendly', label: 'Friendly' },
  { id: 'bold', label: 'Bold' },
  { id: 'educational', label: 'Educational' },
]

export function PublicGeneratePage() {
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState<PublicPlatform>('instagram')
  const [tone, setTone] = useState<PublicTone>('professional')
  const [caption, setCaption] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [generated, setGenerated] = useState(false)
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
    setGenerated(false)
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
      setCaption(out.caption)
      setHashtags(out.hashtags)
      setGenerated(true)
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
      setCaption('')
      setHashtags('')
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
      await navigator.clipboard.writeText(`${caption}\n\n${hashtags}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setError('Copy failed. Please copy manually.')
    }
  }

  return (
    <div className="min-h-screen w-full bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/25 via-zinc-950 to-zinc-950 px-4 py-8 text-zinc-100 sm:py-10">
      <div className="mx-auto w-full max-w-4xl space-y-5">
        <header className="flex items-center justify-between">
          <Link to="/" className="text-sm font-semibold tracking-wide text-zinc-200">
            Jifunze.AI
          </Link>
          <div className="flex items-center gap-2">
            <Link
              to="/?auth=signin#auth"
              className="rounded-lg border border-zinc-700 px-3.5 py-2 text-xs font-semibold text-zinc-200 transition hover:border-zinc-600"
            >
              Sign in
            </Link>
            <Link
              to="/?auth=signup#auth"
              className="rounded-lg bg-violet-500/90 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-violet-500"
            >
              Sign up
            </Link>
          </div>
        </header>

        <section className="space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Create social content in seconds
          </h1>
          <p className="text-sm text-zinc-400">Try Jifunze free — no signup required</p>
        </section>

        <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
          <section className="space-y-4 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 p-5">
          <label className="block space-y-1.5">
            <span className="text-xs text-zinc-400">Topic</span>
            <input
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. How AI tutors can improve revision outcomes"
              maxLength={180}
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500/50"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block space-y-1.5">
              <span className="text-xs text-zinc-400">Platform</span>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as PublicPlatform)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500/50"
              >
                {PLATFORM_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block space-y-1.5">
              <span className="text-xs text-zinc-400">Tone</span>
              <select
                value={tone}
                onChange={(e) => setTone(e.target.value as PublicTone)}
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-zinc-100 outline-none focus:border-violet-500/50"
              >
                {TONE_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-[11px] text-zinc-500">Free daily tries left (this browser): {usage.remaining}</p>
            <button
              type="button"
              disabled={!canGenerate}
              onClick={() => void onGenerate()}
              className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? 'Generating…' : 'Generate'}
            </button>
          </div>

          {error ? (
            <p className="rounded-lg border border-rose-700/30 bg-rose-950/20 px-3 py-2 text-sm text-rose-300" role="alert">
              {error}
            </p>
          ) : null}
          </section>

          <section className="space-y-3 rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">Result</h2>
            {!generated ? (
              <p className="text-sm text-zinc-500">Your generated caption will appear here.</p>
            ) : (
              <>
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Caption</p>
                  <p className="text-sm leading-relaxed text-zinc-100">{caption}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-500">Hashtags</p>
                  <p className="font-mono text-sm text-violet-200">{hashtags}</p>
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => void onCopy()}
                    className="rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-1.5 text-xs text-zinc-200 transition hover:border-zinc-600"
                  >
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                  <p className="text-[11px] text-zinc-500">Ready for your next post.</p>
                </div>
              </>
            )}
          </section>
        </div>

        {!generated ? (
          <section className="rounded-2xl border border-zinc-800/75 bg-zinc-900/20 p-4 text-center">
            <p className="text-sm text-zinc-300">Want to save your drafts and unlock more generations?</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              <Link
                to="/?auth=signup#auth"
                className="rounded-lg bg-violet-500/85 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
              >
                Create free account
              </Link>
              <Link
                to="/?auth=signin#auth"
                className="rounded-lg border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-zinc-600"
              >
                Sign in
              </Link>
            </div>
          </section>
        ) : null}

        {generated ? (
          <section className="rounded-2xl border border-violet-700/25 bg-violet-950/15 p-5 text-center">
            <p className="text-sm text-zinc-300">Create a free account to save this and generate more</p>
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              <Link
                to={signupHref}
                onClick={() =>
                  jifunzeCriticalLog({
                    action: 'public_generate_signup_clicked',
                    status: 'started',
                    detail: { cta: 'create_free_account' },
                  })
                }
                className="rounded-lg bg-violet-500/85 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
              >
                Create free account
              </Link>
            </div>
          </section>
        ) : null}

        <footer className="border-t border-zinc-800/75 pt-4">
          <PublicSocialLinks />
        </footer>
      </div>
    </div>
  )
}
