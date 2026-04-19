import { Link } from 'react-router-dom'
import { curriculumStats } from '../../data/learning/aiEverydayWorkCurriculum'
import { AI_FOUNDATIONS_LIBRARY } from '../../data/publicStarterLibraries/aiFoundations'
import {
  AI_FAMILY_STARTER_PUBLIC_PATH,
  PREMIUM_AI_TRACKS,
  SIGNED_IN_AI_CATEGORIES,
  resolveStarterLinkHref,
} from '../../data/learning/aiLibraryCatalog'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { CurriculumDepthSection } from '../libraries/CurriculumDepthSection'

export function WorkspaceAiLibraryPage() {
  const stats = curriculumStats()
  return (
    <div>
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">AI learning library</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          One AI library—three layers of depth
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-zinc-400">
          This is Jifunze&apos;s complete AI library family: a public starter you can share with anyone, a fuller workspace view
          that organizes depth by category, and premium tracks that add materials and practice—not certificates, mastery
          guarantees, or professional qualification.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to={AI_FAMILY_STARTER_PUBLIC_PATH}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-950/25 transition hover:bg-violet-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/60"
          >
            Open free public starter
          </Link>
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-violet-400/25 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            Unlock deeper AI learning
          </Link>
          <Link
            to="/settings/subscription"
            className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            Manage subscription or billing
          </Link>
          <Link
            to="/library/ai-labs"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-violet-400/25 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            Public AI labs (browse starters)
          </Link>
          <Link
            to="/learning/labs"
            className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-violet-400/25 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            Applied teaching labs (prompting, review, workflows…)
          </Link>
        </div>
      </header>

      <CurriculumDepthSection libraryId="ai_foundations" className="mt-10" />

      <section className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.05] pb-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Public · always on</p>
            <h2 className="mt-2 text-lg font-semibold text-white">{AI_FOUNDATIONS_LIBRARY.title}</h2>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-zinc-400">
              {stats.publicLessons} public starter lessons span the free browsing layer ({stats.categories} categories / {stats.modules}{' '}
              modules / {stats.lessons} lessons in the skeleton). Share it externally with confidence—or use it as pre-read before
              workspace practice.
            </p>
          </div>
          <Link
            to={AI_FAMILY_STARTER_PUBLIC_PATH}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-sm font-semibold text-violet-300/95 hover:text-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            Browse starter →
          </Link>
        </div>
        <ul className="mt-5 grid gap-3 text-[13px] text-zinc-500 sm:grid-cols-2">
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/55" aria-hidden />
            Module titles + lesson titles visible publicly
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/55" aria-hidden />
            Full lesson readers with outcomes & exercises in-page
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/55" aria-hidden />
            Shareable route: {AI_FAMILY_STARTER_PUBLIC_PATH}
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-400/55" aria-hidden />
            Assistive framing—still review before professional reliance
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Signed-in · fuller AI library</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Eight focus categories</h2>
            <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-zinc-400">
              Each category ties back to the free starter lessons you can assign as pre-reads, then continues into workspace depth
              as features ship. Eligibility depends on plan limits—never on promised outcomes.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {SIGNED_IN_AI_CATEGORIES.map((cat) => (
            <article
              key={cat.id}
              className="rounded-2xl border border-white/[0.06] bg-[rgba(18,16,26,0.55)] p-5 ring-1 ring-white/[0.03]"
            >
              <h3 className="text-[16px] font-semibold text-white">{cat.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">{cat.summary}</p>

              <div className="mt-4 space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Starter overlaps (public)</p>
                <div className="flex flex-wrap gap-2">
                  {cat.starterLinks.map((l) => (
                    <Link
                      key={`${cat.id}-${l.label}`}
                      to={resolveStarterLinkHref(l.lessonSlug)}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-200 transition hover:border-violet-400/28 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-4 border-t border-white/[0.05] pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                  Deeper materials with eligible access
                </p>
                <ul className="mt-2 space-y-1.5 text-[12px] text-zinc-500">
                  {cat.deeperWithAccess.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-zinc-600/80" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Link
                    to="/pricing"
                    className="inline-flex items-center justify-center rounded-lg bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-zinc-100 ring-1 ring-white/[0.08] transition hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
                  >
                    Access the full AI library
                  </Link>
                  <Link
                    to="/pricing"
                    className="inline-flex items-center justify-center rounded-lg px-3 py-1.5 text-[11px] font-medium text-zinc-500 transition hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
                  >
                    Continue beyond the starter path
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-14 border-t border-white/[0.06] pt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Paid · deeper tracks</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Premium AI tracks & bundles</h2>
            <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-zinc-400">
              Access expands the library—prompt labs, workflow kits, supervised agent playbooks, team templates, and review packs.
              Payment unlocks materials and features; it does not guarantee mastery, exam success, hiring outcomes, or professional
              qualification.
            </p>
          </div>
          <Link
            to="/pricing"
            className="text-sm font-semibold text-violet-300/95 hover:text-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
          >
            Explore premium AI tracks →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {PREMIUM_AI_TRACKS.map((track) => (
            <article
              key={track.id}
              className="rounded-2xl border border-violet-400/12 bg-gradient-to-br from-violet-500/[0.07] to-[rgba(18,16,26,0.55)] p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-[15px] font-semibold text-white">{track.title}</h3>
                <span className="rounded-full border border-white/[0.08] bg-black/25 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-400">
                  {track.monetization === 'bundle_or_subscription' ? 'Bundle or subscription' : 'Subscription'}
                </span>
              </div>
              <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">{track.summary}</p>
              <Link
                to="/pricing"
                className="mt-4 inline-flex text-[12px] font-semibold text-violet-200/95 hover:text-violet-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
              >
                Check availability on pricing →
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
        <h2 className="text-sm font-semibold text-white">Access rules (claim-safe)</h2>
        <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-zinc-400">
          <li>
            <span className="text-zinc-300">Free public layer: </span>
            anyone can read the starter lessons—no account required.
          </li>
          <li>
            <span className="text-zinc-300">Signed-in layer: </span>
            organizes the AI library for workspace use; deeper practice depends on shipped features and plan limits.
          </li>
          <li>
            <span className="text-zinc-300">Paid layer: </span>
            unlocks additional tracks, templates, and limits—still assistive learning support, not accredited instruction or
            outcome guarantees.
          </li>
        </ul>
        <p className="mt-4 text-[11px] text-zinc-600">
          <Link to={LEGAL_ROUTES.disclaimer} className="font-medium text-violet-300/85 underline-offset-2 hover:underline">
            Full disclaimer
          </Link>
        </p>
      </section>
    </div>
  )
}
