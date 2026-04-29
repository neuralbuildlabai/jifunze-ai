import { Link } from 'react-router-dom'
import type { AiAppliedLabTrack } from '../../data/teaching/teachingTypes'
import { aiLabsPublic, PUBLIC_AI_LABS_BASE_PATH } from '../../data/teaching/aiLabsCurriculum'
import { PUBLIC_AI_FOUNDATIONS_BASE_PATH } from '../../data/publicStarterLibraries/aiFoundations'
import { TeachingLabArticle } from '../teaching/TeachingLabArticle'
import { PublicStarterLibraryChrome } from './PublicStarterLibraryChrome'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES } from '../../training/trustCopy'
import { LearnerHelpAssistant } from '../teaching/LearnerHelpAssistant'

const FAMILY_SECTIONS: { track: AiAppliedLabTrack; title: string }[] = [
  { track: 'prompt_rewrite', title: 'Family 1 · Prompt rewrite labs' },
  { track: 'task_to_prompt', title: 'Family 2 · Task-to-prompt labs' },
  { track: 'output_review', title: 'Family 3 · Output review labs' },
  { track: 'approve_revise_reject', title: 'Family 4 · Approve / revise / reject labs' },
  { track: 'workflow', title: 'Family 5 · Workflow labs' },
  { track: 'learning_revision', title: 'Family 6 · Learning and revision labs' },
  { track: 'content_creation', title: 'Family 7 · Content creation labs' },
]

export function PublicAiTeachingLabsPage() {
  const publicLabs = aiLabsPublic()
  const labsByTrack = new Map<AiAppliedLabTrack, typeof publicLabs>()
  for (const lab of publicLabs) {
    const t = lab.appliedTrack
    if (!t) continue
    const cur = labsByTrack.get(t) ?? []
    cur.push(lab)
    labsByTrack.set(t, cur)
  }

  return (
    <PublicStarterLibraryChrome
      eyebrow="AI library · practical layer"
      browseHref={PUBLIC_AI_FOUNDATIONS_BASE_PATH}
      browseLabel="AI Foundations · Browse lessons"
      title="Public AI teaching labs"
      description="Starter guided and practice labs you can try without signing in—structured scenarios, rubrics, and learner capture fields (not empty boxes). Sign in for broader labs; eligible plans unlock deeper practice and test-style drills."
    >
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-5 sm:p-6">
        <p className="text-[13px] leading-relaxed text-zinc-300">
          These labs reinforce applied judgment: rewrite prompts, review outputs, and practice decision-making—paired with anchored lessons where
          available.
        </p>
        <p className="mt-4 rounded-xl border border-violet-400/14 bg-violet-500/[0.06] px-4 py-3 text-[13px] leading-relaxed text-zinc-300">
          <span className="font-semibold text-violet-200/90">Browse surface: </span>
          {publicLabs.length} public starter labs are listed below. Open the full catalog (including signed-in and deeper labs) from your workspace
          teaching labs route when you are ready for continuity—not a mastery guarantee.
        </p>
        <div className="mt-8">
          <LearnerHelpAssistant key="public-ai-labs-help" />
        </div>

        <div className="mt-5 flex flex-wrap gap-3 text-[12px] text-zinc-500">
          {LEARNER_MONETIZATION_UI_DISABLED ? (
            <span className="font-medium text-zinc-600">Paid lab tiers are not listed in this release.</span>
          ) : (
            <Link className="font-semibold text-violet-300/90 hover:text-violet-200" to="/pricing">
              Unlock deeper AI labs (eligible plans)
            </Link>
          )}
          <span aria-hidden>·</span>
          <Link className="font-semibold text-zinc-500 hover:text-zinc-200" to={LEGAL_ROUTES.disclaimer}>
            Disclaimer
          </Link>
          <span aria-hidden>·</span>
          <span className="text-zinc-600">Shareable route: {PUBLIC_AI_LABS_BASE_PATH}</span>
        </div>
      </div>

      <div className="mt-12 space-y-16">
        {FAMILY_SECTIONS.map(({ track, title }) => {
          const labs = labsByTrack.get(track)
          if (!labs?.length) return null
          return (
            <section key={track} id={`ai-lab-family-${track}`} className="scroll-mt-28 space-y-8">
              <div className="border-b border-white/[0.06] pb-4">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">{labs.length} public labs</p>
                <h2 className="mt-2 text-xl font-semibold text-white">{title}</h2>
              </div>
              <div className="space-y-10">
                {labs.map((lab) => (
                  <TeachingLabArticle key={lab.id} lab={lab} />
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </PublicStarterLibraryChrome>
  )
}
