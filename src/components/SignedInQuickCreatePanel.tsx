import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppAccess } from '../access/useAppAccess'
import { LEGAL_ROUTES } from '../training/trustCopy'
import type { SupabaseClient } from '@supabase/supabase-js'
import { PUBLIC_PLATFORM_OPTIONS, PUBLIC_TONE_OPTIONS } from '../constants/publicGenerateUi'
import { jifunzeCriticalLog } from '../lib/jifunzeTelemetry'
import {
  buildQuickCreateGenerationContext,
  buildRefinementContext,
  platformResultFitCue,
  type RefineKind,
} from '../lib/signedInQuickCreateContext'
import { generateSocialContent } from '../services/contentGeneration'
import { readPublicGenerateHandoff } from '../services/content/publicGenerate'
import type { PublicPlatform, PublicTone } from '../services/content/publicGenerate'

const EXAMPLE_PROMPTS = [
  'Launching a new skincare product',
  'How AI tutors can improve revision outcomes',
  'Announcing a new business opening',
  'Tips for creators growing on social media',
] as const

type Props = {
  supabase: SupabaseClient | null
  sectionId?: string
  /** When `token` changes, applies `text` to the topic field (e.g. engagement prompts). */
  promptInjection?: { token: number; text: string } | null
}

export function SignedInQuickCreatePanel({
  supabase,
  sectionId = 'signed-in-create',
  promptInjection,
}: Props) {
  const navigate = useNavigate()
  const { navVariant, canViewOperatorInsights } = useAppAccess()
  const isLearnerNav = navVariant === 'learner'
  const [topic, setTopic] = useState('')
  const [platform, setPlatform] = useState<PublicPlatform>('instagram')
  const [tone, setTone] = useState<PublicTone>('professional')
  const [caption, setCaption] = useState('')
  const [hashtags, setHashtags] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [generated, setGenerated] = useState(false)
  const [loadingHint, setLoadingHint] = useState('Writing your caption…')

  useEffect(() => {
    const handoff = readPublicGenerateHandoff()
    if (handoff?.topic) {
      setTopic(handoff.topic.slice(0, 180))
      setPlatform(handoff.platform)
      setTone(handoff.tone)
    }
  }, [])

  useEffect(() => {
    if (!promptInjection) return
    setTopic(promptInjection.text.slice(0, 180))
    setError(null)
  }, [promptInjection])

  const canGenerate = topic.trim().length >= 3 && !loading
  const canRefine = generated && caption.trim().length > 0 && !loading

  async function onGenerate() {
    const trimmedTopic = topic.trim()
    setError(null)
    setCopied(false)
    setGenerated(false)
    setLoadingHint('Writing your caption…')
    setLoading(true)
    jifunzeCriticalLog({
      action: 'signed_in_quick_create_started',
      status: 'started',
      detail: { platform, tone, topicLength: trimmedTopic.length, surface: 'signed_in_home' },
    })
    try {
      const ctx = buildQuickCreateGenerationContext(platform, tone)
      const out = await generateSocialContent(trimmedTopic, {
        supabase: supabase ?? undefined,
        context: ctx,
      })
      setCaption(out.caption)
      setHashtags(out.hashtags)
      setGenerated(true)
      jifunzeCriticalLog({
        action: 'signed_in_quick_create_succeeded',
        status: 'ok',
        detail: { platform, tone, surface: 'signed_in_home' },
      })
    } catch (e) {
      setCaption('')
      setHashtags('')
      const msg = e instanceof Error ? e.message : 'Something went wrong while generating.'
      setError(msg)
      jifunzeCriticalLog({
        action: 'signed_in_quick_create_failed',
        status: 'error',
        detail: { platform, tone, message: msg, surface: 'signed_in_home' },
      })
    } finally {
      setLoading(false)
    }
  }

  async function onRefine(kind: RefineKind) {
    const trimmedTopic = topic.trim()
    if (trimmedTopic.length < 3) return
    setError(null)
    setCopied(false)
    setLoadingHint(kind === 'thread' ? 'Turning into a thread…' : 'Refining…')
    setLoading(true)
    jifunzeCriticalLog({
      action: 'signed_in_quick_create_refine_started',
      status: 'started',
      detail: { platform, tone, kind, surface: 'signed_in_home' },
    })
    try {
      const ctx = buildRefinementContext(platform, tone, kind, { caption, hashtags })
      const out = await generateSocialContent(trimmedTopic, {
        supabase: supabase ?? undefined,
        context: ctx,
      })
      setCaption(out.caption)
      setHashtags(out.hashtags)
      setGenerated(true)
      jifunzeCriticalLog({
        action: 'signed_in_quick_create_refine_succeeded',
        status: 'ok',
        detail: { platform, tone, kind, surface: 'signed_in_home' },
      })
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong while refining.'
      setError(msg)
      jifunzeCriticalLog({
        action: 'signed_in_quick_create_refine_failed',
        status: 'error',
        detail: { platform, tone, kind, message: msg, surface: 'signed_in_home' },
      })
    } finally {
      setLoading(false)
    }
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(`${caption}\n\n${hashtags}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setError('Copy failed. Please copy manually.')
    }
  }

  async function onSaveToWorkspace() {
    try {
      await navigator.clipboard.writeText(`${caption}\n\n${hashtags}`)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
      navigate('/studio')
    } catch {
      setError('Could not copy. Please try again.')
    }
  }

  function generateAnother() {
    setGenerated(false)
    setCaption('')
    setHashtags('')
    setCopied(false)
    setError(null)
    setLoadingHint('Writing your caption…')
  }

  const postLabel = platform === 'instagram' ? 'Caption' : 'Post'

  return (
    <section
      id={sectionId}
      className="relative scroll-mt-28 rounded-[1.5rem] border border-white/[0.08] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.018))] p-5 shadow-[0_20px_60px_rgba(0,0,0,0.14)] ring-1 ring-white/[0.04] backdrop-blur-sm sm:p-6"
      aria-labelledby="signed-in-create-heading"
    >
      <div className="pointer-events-none absolute -inset-px rounded-[1.5rem] bg-gradient-to-b from-violet-400/12 via-transparent to-transparent opacity-90" aria-hidden />
      <div className="relative">
        <div className="mb-4 flex flex-col gap-1.5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 id="signed-in-create-heading" className="text-base font-semibold text-white">
              {isLearnerNav ? 'Draft a post from your learning context' : 'Create your first post'}
            </h2>
            <p className="text-sm text-zinc-400/85">
              {isLearnerNav
                ? 'Optional: turn a lesson insight or milestone into a short social draft—edit and verify before you post. This supports visibility for your proof, not random content spam.'
                : 'Add a short idea, choose platform and tone, then generate. You can edit the result before you post.'}
            </p>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-2">
          {EXAMPLE_PROMPTS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => {
                setTopic(p)
                setError(null)
              }}
              className="rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-1 text-left text-[11px] text-zinc-300 transition-colors duration-200 hover:border-violet-400/35 hover:text-violet-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/45"
            >
              {p}
            </button>
          ))}
        </div>

        <label className="mb-3 block space-y-1.5">
          <span className="text-xs text-zinc-400">What do you want to post about?</span>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="e.g. launching a new skincare product…"
            maxLength={180}
            className="w-full rounded-xl border border-white/[0.1] bg-[rgba(13,12,19,0.78)] px-3 py-2.5 text-[15px] text-zinc-100 outline-none transition-colors duration-200 focus:border-violet-400/45 focus-visible:ring-2 focus-visible:ring-violet-500/25"
          />
        </label>

        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          <label className="block space-y-1.5">
            <span className="text-xs text-zinc-400">Platform</span>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value as PublicPlatform)}
              className="w-full rounded-lg border border-white/[0.1] bg-[rgba(13,12,19,0.78)] px-3 py-2 text-sm text-zinc-100 outline-none transition-colors duration-200 focus:border-violet-400/45 focus-visible:ring-2 focus-visible:ring-violet-500/25"
            >
              {PUBLIC_PLATFORM_OPTIONS.map((opt) => (
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
              className="w-full rounded-lg border border-white/[0.1] bg-[rgba(13,12,19,0.78)] px-3 py-2 text-sm text-zinc-100 outline-none transition-colors duration-200 focus:border-violet-400/45 focus-visible:ring-2 focus-visible:ring-violet-500/25"
            >
              {PUBLIC_TONE_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mb-4 flex flex-wrap items-center gap-3">
          <button
            type="button"
            disabled={!canGenerate}
            onClick={() => void onGenerate()}
            className="rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition-colors duration-200 hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/60 disabled:cursor-not-allowed disabled:opacity-40"
          >
            {loading ? 'Generating…' : 'Generate'}
          </button>
        </div>

        {error ? (
          <p
            className="mb-4 rounded-xl border border-rose-400/20 bg-rose-950/20 px-3 py-2.5 text-sm text-rose-100"
            role="alert"
          >
            {error}
          </p>
        ) : null}

        <div className="rounded-xl border border-white/[0.06] bg-[rgba(255,255,255,0.025)] p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500/90">Result</p>
            {generated && !loading ? (
              <span className="rounded-full border border-white/[0.08] bg-white/[0.04] px-2.5 py-0.5 text-[10px] font-medium text-zinc-400/95">
                {platformResultFitCue(platform)}
              </span>
            ) : null}
          </div>
          {loading ? (
            <div className="mt-3 space-y-2">
              <div className="h-3 w-full max-w-md animate-pulse rounded bg-zinc-700/60" />
              <div className="h-3 max-w-lg animate-pulse rounded bg-zinc-700/50" style={{ width: '92%' }} />
              <p className="text-sm text-zinc-400/80">{loadingHint}</p>
            </div>
          ) : !generated ? (
            <div className="mt-3 rounded-lg border border-dashed border-white/[0.08] bg-[rgba(0,0,0,0.12)] px-3 py-3.5">
              <p className="text-sm leading-relaxed text-zinc-300/90">
                After you generate, your post and hashtags appear in separate blocks so they are easy to
                scan and copy. Then you can refine, save to workspace, generate another idea, or open
                advanced tools for trends and deeper options.
              </p>
            </div>
          ) : (
            <>
              <div className="mt-4 space-y-4">
                <div className="rounded-lg border border-white/[0.06] bg-[rgba(0,0,0,0.18)] p-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-zinc-500/90">
                    {postLabel}
                  </p>
                  <p className="mt-2 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-zinc-100">
                    {caption}
                  </p>
                </div>
                <div className="rounded-lg border border-white/[0.06] bg-[rgba(0,0,0,0.12)] p-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.06em] text-zinc-500/90">
                    Hashtags
                  </p>
                  <p className="mt-2 select-all font-mono text-sm leading-relaxed text-violet-200/90">
                    {hashtags}
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-white/[0.08] bg-[rgba(255,255,255,0.02)] p-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500/90">
                  Refine
                </p>
                <p className="mt-1 text-[11px] leading-relaxed text-zinc-500/85">
                  One-tap tweaks reuse the same generator with your draft as context.
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  <button
                    type="button"
                    disabled={!canRefine}
                    onClick={() => void onRefine('shorter')}
                    className="rounded-lg border border-white/[0.1] bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-semibold text-zinc-200 transition-colors hover:border-violet-400/35 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Shorter
                  </button>
                  <button
                    type="button"
                    disabled={!canRefine}
                    onClick={() => void onRefine('clearer')}
                    className="rounded-lg border border-white/[0.1] bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-semibold text-zinc-200 transition-colors hover:border-violet-400/35 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Clearer
                  </button>
                  <button
                    type="button"
                    disabled={!canRefine}
                    onClick={() => void onRefine('professional')}
                    className="rounded-lg border border-white/[0.1] bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-semibold text-zinc-200 transition-colors hover:border-violet-400/35 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    More professional
                  </button>
                  {platform === 'x' ? (
                    <button
                      type="button"
                      disabled={!canRefine}
                      onClick={() => void onRefine('thread')}
                      className="rounded-lg border border-white/[0.1] bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-semibold text-zinc-200 transition-colors hover:border-violet-400/35 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Turn into thread
                    </button>
                  ) : null}
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-violet-500/25 bg-violet-950/20 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-violet-200/90">
                  Next steps
                </p>
                <p className="mt-2 text-[12px] leading-relaxed text-zinc-400/95">
                  Copy to paste anywhere, save to workspace to keep building, or refine above. Advanced
                  tools add trends and deeper controls when you need them.
                </p>
                <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                  <button
                    type="button"
                    onClick={() => void onCopy()}
                    className="inline-flex items-center justify-center rounded-lg border border-zinc-600 bg-zinc-950 px-3 py-2 text-xs font-semibold text-zinc-100 transition-colors duration-200 hover:border-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/45"
                  >
                    {copied ? 'Copied' : 'Copy result'}
                  </button>
                  <button
                    type="button"
                    onClick={() => void onSaveToWorkspace()}
                    className="inline-flex items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-xs font-semibold text-zinc-100 transition-colors hover:border-violet-400/35 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/45"
                  >
                    Save to workspace
                  </button>
                  <button
                    type="button"
                    onClick={generateAnother}
                    className="inline-flex items-center justify-center rounded-lg border border-transparent text-xs font-semibold text-violet-300/95 transition-colors hover:text-violet-200"
                  >
                    Generate another
                  </button>
                </div>
                <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.06] pt-3 sm:flex-row sm:flex-wrap sm:items-center">
                  {navVariant === 'learner' ? (
                    <>
                      <Link
                        to="/my-learning"
                        className="inline-flex items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-violet-400/35 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/45"
                      >
                        My Learning
                      </Link>
                      <Link
                        to={LEGAL_ROUTES.learn}
                        className="inline-flex items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-violet-400/35 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/45"
                      >
                        Discover courses
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/ideas"
                        className="inline-flex items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-violet-400/35 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/45"
                      >
                        Browse ideas
                      </Link>
                      <Link
                        to="/studio"
                        className="inline-flex items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-violet-400/35 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/45"
                      >
                        Open Studio
                      </Link>
                      {canViewOperatorInsights ? (
                        <Link
                          to="/insights"
                          className="inline-flex items-center justify-center rounded-lg border border-white/[0.1] bg-white/[0.03] px-3 py-2 text-xs font-semibold text-zinc-200 transition-colors hover:border-violet-400/35 hover:bg-white/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/45"
                        >
                          Learning insights
                        </Link>
                      ) : null}
                    </>
                  )}
                </div>
                <p className="mt-3 text-[11px] leading-relaxed text-zinc-500/90">
                  Save to workspace copies your text and opens Studio so you can keep building. Copy
                  result only copies to your clipboard.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
