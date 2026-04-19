import { Link } from 'react-router-dom'
import {
  CHATBOT_FAMILY_STARTER_PUBLIC_PATH,
  CHATBOT_PREMIUM_TRACKS,
  SIGNED_IN_CHATBOT_CATEGORIES,
  resolveChatbotStarterLinkHref,
} from '../../data/learning/chatbotLibraryCatalog'
import { CHATBOT_LIBRARY_FAMILY, chatbotCurriculumStats } from '../../data/learning/chatbotEverydayCurriculum'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { CurriculumDepthSection } from '../libraries/CurriculumDepthSection'

export function WorkspaceChatbotLibraryPage() {
  const stats = chatbotCurriculumStats()

  return (
    <div>
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Chatbot learning library</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Everyday chatbots—starter → fuller workspace → deeper materials
        </h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-zinc-400">
          Practical chatbot literacy and design readers: browse a public starter layer, map the signed-in path across categories,
          and use pricing for deeper packs when eligible—access to materials and practice, not deployment guarantees or professional
          certification.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            to={CHATBOT_FAMILY_STARTER_PUBLIC_PATH}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center rounded-xl bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-cyan-950/25 transition hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/60"
          >
            Open free chatbot starter
          </Link>
          <Link
            to="/pricing"
            className="inline-flex items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-zinc-200 transition hover:border-cyan-400/25 hover:bg-white/[0.06] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/55"
          >
            Unlock deeper chatbot learning
          </Link>
          <Link
            to="/settings/subscription"
            className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/55"
          >
            Manage subscription or billing
          </Link>
        </div>
      </header>

      <CurriculumDepthSection libraryId="chatbots" className="mt-10" />

      <section className="mt-10 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-5 sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[0.05] pb-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Public · always on</p>
            <h2 className="mt-2 text-lg font-semibold text-white">{CHATBOT_LIBRARY_FAMILY.title}</h2>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-zinc-400">
              {stats.publicLessons} public starter lessons in category 1 ({stats.categories} categories / {stats.modules} modules /{' '}
              {stats.lessons} lessons total). Share {CHATBOT_FAMILY_STARTER_PUBLIC_PATH} as a credible pre-read.
            </p>
          </div>
          <Link
            to={CHATBOT_FAMILY_STARTER_PUBLIC_PATH}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 text-sm font-semibold text-cyan-300/95 hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/55"
          >
            Browse chatbot starter →
          </Link>
        </div>
        <ul className="mt-5 grid gap-3 text-[13px] text-zinc-500 sm:grid-cols-2">
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/55" aria-hidden />
            Full category map visible in the public index—access badges show what requires sign-in or eligible plans
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/55" aria-hidden />
            Readers emphasize trust, scope, and review—never hype or guaranteed business outcomes
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/55" aria-hidden />
            Route: {CHATBOT_FAMILY_STARTER_PUBLIC_PATH}
          </li>
          <li className="flex gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/55" aria-hidden />
            Device-local completion marks optional on public lessons
          </li>
        </ul>
      </section>

      <section className="mt-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Signed-in · fuller chatbot library</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Eight focus categories</h2>
            <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-zinc-400">
              Same skeleton as the public browse experience—workspace view is for navigation, assignments, and continuation; depth
              still depends on shipped features and plan limits.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {SIGNED_IN_CHATBOT_CATEGORIES.map((cat) => (
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
                      to={resolveChatbotStarterLinkHref(l.lessonSlug)}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-zinc-200 transition hover:border-cyan-400/28 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/55"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="mt-4 border-t border-white/[0.05] pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">Deeper materials with eligible access</p>
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
                    className="inline-flex items-center justify-center rounded-lg bg-white/[0.06] px-3 py-1.5 text-[11px] font-semibold text-zinc-100 ring-1 ring-white/[0.08] transition hover:bg-white/[0.09] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/55"
                  >
                    Explore premium chatbot tracks
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
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Paid · deeper chatbot tracks</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Examples of deeper access</h2>
            <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-zinc-400">
              Bundles or subscriptions can expand templates, labs, and evaluation depth—still instructional support, not a promise of
              chatbot ROI, rankings, or job placement.
            </p>
          </div>
          <Link
            to="/pricing"
            className="text-sm font-semibold text-cyan-300/95 hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/55"
          >
            Check pricing →
          </Link>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          {CHATBOT_PREMIUM_TRACKS.map((track) => (
            <article
              key={track.id}
              className="rounded-2xl border border-cyan-400/12 bg-gradient-to-br from-cyan-500/[0.07] to-[rgba(18,16,26,0.55)] p-5"
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
                className="mt-4 inline-flex text-[12px] font-semibold text-cyan-200/95 hover:text-cyan-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/55"
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
            <span className="text-zinc-300">Free starter layer: </span>
            full category 1 readers without an account—browse and continuity marks are device-local.
          </li>
          <li>
            <span className="text-zinc-300">Signed-in layer: </span>
            unlocks signed-in lessons in the reader; workspace features depend on product ship state and policies.
          </li>
          <li>
            <span className="text-zinc-300">Paid layer: </span>
            may unlock premium lessons and richer packs—never a guarantee of outcomes, rankings, or certification.
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
