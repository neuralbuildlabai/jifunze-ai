import { Link } from 'react-router-dom'
import {
  AI_FAMILY_STARTER_PUBLIC_PATH,
  PREMIUM_AI_TRACKS,
  SIGNED_IN_AI_CATEGORIES,
} from '../../data/learning/aiLibraryCatalog'
import { CHATBOT_FAMILY_STARTER_PUBLIC_PATH } from '../../data/learning/chatbotLibraryCatalog'
import { ML_FAMILY_STARTER_PUBLIC_PATH } from '../../data/learning/mlLibraryCatalog'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { EXTENDED_PUBLIC_LIBRARY_CONFIGS } from '../../data/learning/extendedPublicLibraryConfigs'
import { flattenLessonsForCurriculum } from '../../data/learning/extendedLibrariesCurricula'

/** Workspace hub — routes into the cohesive AI library experience without duplicating parallel catalogs. */
export function WorkspaceLibraryPage() {
  return (
    <div>
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Learning library</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Library overview</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-zinc-400">
          AI foundations, practical machine learning, everyday chatbots, plus networking/security/cloud/observability/publishing families—each
          with public starter categories, signed-in maps in the workspace, and deeper materials where plans unlock access (never outcome
          guarantees).
        </p>
      </header>

      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        <Link
          to="/library/ai"
          className="group block rounded-[1.35rem] border border-violet-400/18 bg-gradient-to-br from-violet-500/[0.12] via-[rgba(28,22,40,0.65)] to-[rgba(16,14,22,0.85)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.18)] ring-1 ring-white/[0.05] transition hover:border-violet-400/28 sm:p-8"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-200/70">Primary · AI</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">AI Learning Library (complete workspace view)</h2>
          <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-zinc-300/95">
            Eight signed-in categories ({SIGNED_IN_AI_CATEGORIES.length}), premium tracks ({PREMIUM_AI_TRACKS.length}), and clear
            links back to the free public starter—so browsing users and paying learners see one coherent family.
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-violet-200 group-hover:text-white">
            Open the full AI library →
          </span>
        </Link>

        <Link
          to="/library/ml"
          className="group block rounded-[1.35rem] border border-emerald-400/18 bg-gradient-to-br from-emerald-500/[0.1] via-[rgba(22,32,36,0.65)] to-[rgba(16,14,22,0.85)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.18)] ring-1 ring-white/[0.05] transition hover:border-emerald-400/28 sm:p-8"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-200/70">Core tech · Machine learning</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">ML Foundations (workspace map)</h2>
          <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-zinc-300/95">
            Five categories from foundations through applied paths—public module 1, signed-in depth, applied ML readers on eligible
            plans (materials access, not benchmark guarantees).
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-emerald-200 group-hover:text-white">
            Open the ML library →
          </span>
        </Link>

        <Link
          to="/library/chatbots"
          className="group block rounded-[1.35rem] border border-cyan-400/18 bg-gradient-to-br from-cyan-500/[0.1] via-[rgba(22,32,40,0.65)] to-[rgba(16,14,22,0.85)] p-6 shadow-[0_28px_90px_rgba(0,0,0,0.18)] ring-1 ring-white/[0.05] transition hover:border-cyan-400/28 sm:p-8"
        >
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-200/70">Library family · Chatbots</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">Everyday Chatbots (workspace map)</h2>
          <p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-zinc-300/95">
            Browse the public starter, then continue in the workspace with eight categories—design, build patterns, safety, and
            advanced systems—with premium-depth examples tied to plans (materials access, not guaranteed ROI).
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan-200 group-hover:text-white">
            Open the chatbot library →
          </span>
        </Link>

        <div className="lg:col-span-3 mt-4 rounded-[1.35rem] border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-zinc-500">Infrastructure & publishing libraries</p>
          <h2 className="mt-2 text-lg font-semibold text-white sm:text-xl">
            Networking, security, cloud/DevOps, observability, publishing
          </h2>
          <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-zinc-400">
            Live reader maps with structured depth—public starter layers, signed-in continuation, and premium-depth lessons where eligible
            plans apply (materials access varies).
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {Object.values(EXTENDED_PUBLIC_LIBRARY_CONFIGS).map((cfg) => {
              const lessons = flattenLessonsForCurriculum(cfg.curriculum)
              const publicLessons = lessons.filter((l) => l.access === 'public').length
              return (
                <div key={cfg.key} className="rounded-2xl border border-white/[0.06] bg-[rgba(18,16,26,0.45)] p-4">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">{cfg.title}</p>
                  <p className="mt-2 text-[13px] leading-snug text-zinc-400">{cfg.subtitle}</p>
                  <p className="mt-2 text-[11px] text-zinc-600">
                    {publicLessons} public starters · {lessons.length} lessons · workspace map →{' '}
                    <span className="font-mono text-[10px] text-zinc-500">{cfg.workspacePath}</span>
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <Link
                      to={cfg.workspacePath}
                      className="inline-flex text-[12px] font-semibold text-violet-300/95 hover:text-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
                    >
                      Open workspace map →
                    </Link>
                    <Link
                      to={cfg.publicBasePath}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-[12px] font-medium text-zinc-500 hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
                    >
                      Public browse →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="lg:col-span-3 mt-10 rounded-[1.35rem] border border-emerald-400/15 bg-emerald-500/[0.06] p-6">
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-emerald-200/70">Standalone courses</p>
          <h2 className="mt-2 text-xl font-semibold text-white sm:text-2xl">Deep curricula built as real products</h2>
          <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-zinc-400">
            Four complete courses—structured modules, substantive lesson spines, practice checkpoints, and embedded learner help. Intended to
            become purchasable standalone SKUs or subscription inclusions later; materials access varies by tier (never outcome guarantees).
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {[
              EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_prompt_engineering_models,
              EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_gemini_workspace,
              EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_claude_writing,
              EXTENDED_PUBLIC_LIBRARY_CONFIGS.course_agentic_ai_real_work,
            ].map((cfg) => {
              const lessons = flattenLessonsForCurriculum(cfg.curriculum)
              const publicLessons = lessons.filter((l) => l.access === 'public').length
              return (
                <div key={cfg.key} className="rounded-2xl border border-white/[0.06] bg-[rgba(18,16,26,0.55)] p-5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">{cfg.title}</p>
                  <p className="mt-2 text-[13px] leading-snug text-zinc-400">{cfg.subtitle}</p>
                  <p className="mt-3 text-[11px] text-zinc-600">
                    {cfg.curriculum.length} modules · {lessons.length} lessons · {publicLessons} public preview lessons
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      to={cfg.workspacePath}
                      className="inline-flex text-[12px] font-semibold text-emerald-200 hover:text-emerald-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/55"
                    >
                      Workspace map →
                    </Link>
                    {cfg.landingPath ? (
                      <Link
                        to={cfg.landingPath}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex text-[12px] font-medium text-zinc-500 hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/55"
                      >
                        Course overview →
                      </Link>
                    ) : null}
                    <Link
                      to={cfg.publicBasePath}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex text-[12px] font-medium text-zinc-500 hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/55"
                      data-testid={`standalone-course-public-${cfg.key}`}
                    >
                      Public curriculum →
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="mt-2 grid gap-4 lg:col-span-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-2xl border border-white/[0.06] bg-[rgba(18,16,26,0.45)] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Public starter · AI</p>
            <h3 className="mt-2 text-base font-semibold text-white">Always-on reader</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
              Share {AI_FAMILY_STARTER_PUBLIC_PATH} externally—full lessons stay readable without signup.
            </p>
            <Link
              to={AI_FAMILY_STARTER_PUBLIC_PATH}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-[12px] font-semibold text-violet-300/95 hover:text-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
            >
              Browse AI starter →
            </Link>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-[rgba(18,16,26,0.45)] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Public starter · ML</p>
            <h3 className="mt-2 text-base font-semibold text-white">Module 1 · free reader</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
              Share {ML_FAMILY_STARTER_PUBLIC_PATH}—first module stays readable without signup.
            </p>
            <Link
              to={ML_FAMILY_STARTER_PUBLIC_PATH}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-[12px] font-semibold text-emerald-300/95 hover:text-emerald-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400/55"
            >
              Browse ML starter →
            </Link>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-[rgba(18,16,26,0.45)] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Public starter · Chatbots</p>
            <h3 className="mt-2 text-base font-semibold text-white">Browse category 1 free</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
              Share {CHATBOT_FAMILY_STARTER_PUBLIC_PATH}—starter lessons stay readable without signup.
            </p>
            <Link
              to={CHATBOT_FAMILY_STARTER_PUBLIC_PATH}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex text-[12px] font-semibold text-cyan-300/95 hover:text-cyan-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-400/55"
            >
              Browse chatbot starter →
            </Link>
          </div>
          <div className="rounded-2xl border border-white/[0.06] bg-[rgba(18,16,26,0.45)] p-5">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Plans & bundles</p>
            <h3 className="mt-2 text-base font-semibold text-white">Deeper materials</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-zinc-400">
              Subscriptions or one-time bundles can unlock richer tracks—access varies; outcomes do not.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {LEARNER_MONETIZATION_UI_DISABLED ? (
                <p className="text-[12px] text-zinc-500">Public checkout is not active in this release.</p>
              ) : (
                <>
                  <Link
                    to="/pricing"
                    className="inline-flex text-[12px] font-semibold text-violet-300/95 hover:text-violet-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
                  >
                    View pricing →
                  </Link>
                  <Link
                    to="/settings/subscription"
                    className="inline-flex text-[12px] font-medium text-zinc-500 hover:text-zinc-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-400/55"
                  >
                    Manage subscription →
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 sm:p-6">
        <h2 className="text-sm font-semibold text-white">How access works (claim-safe)</h2>
        <ul className="mt-3 space-y-2 text-[13px] leading-relaxed text-zinc-400">
          <li>
            <span className="text-zinc-300">Free starter libraries: </span>
            browse AI, ML module 1, chatbot starters, and each extended library&apos;s first category publicly—no account required for those
            layers.
          </li>
          <li>
            <span className="text-zinc-300">Signed-in library maps: </span>
            navigate fuller categories inside the workspace (not accredited instruction).
          </li>
          <li>
            <span className="text-zinc-300">Teaching labs: </span>
            structured practice drills with rubrics live at{' '}
            <Link to="/learning/labs" className="font-semibold text-violet-300/90 hover:text-violet-200 hover:underline">
              /learning/labs
            </Link>{' '}
            (distinct from the Pro simulation Lab).
          </li>
          <li>
            <span className="text-zinc-300">Paid access: </span>
            unlocks additional tracks, templates, and limits; never guarantees mastery, certification, exam results, or employment.
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
