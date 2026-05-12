import { Link } from 'react-router-dom'
import type { TeachingLibraryId } from '../../data/teaching/teachingTypes'
import { TEACHING_LABS } from '../../data/teaching/teachingLabsCatalog'
import { TeachingLabArticle } from '../teaching/TeachingLabArticle'
import { LEARNER_MONETIZATION_UI_DISABLED } from '../../learner/learnerCommerceConstants'
import { LEGAL_ROUTES } from '../../training/trustCopy'

const LIBRARY_ORDER: TeachingLibraryId[] = [
  'ai_foundations',
  'machine_learning',
  'chatbots',
  'networking',
  'cybersecurity',
  'cloud_devops',
  'monitoring',
  'content_publishing',
]

function libraryTitle(id: TeachingLibraryId): string {
  switch (id) {
    case 'ai_foundations':
      return 'AI Foundations for Everyday Work'
    case 'machine_learning':
      return 'Machine Learning Foundations and Practical ML'
    case 'chatbots':
      return 'Building Everyday Chatbots with AI'
    case 'networking':
      return 'Networking and Modern Infrastructure'
    case 'cybersecurity':
      return 'Cybersecurity Foundations to Practical Defense'
    case 'cloud_devops':
      return 'Cloud, DevOps, and Platform Operations'
    case 'monitoring':
      return 'Monitoring, Observability, and Incident Response'
    case 'content_publishing':
      return 'Content Creation and Knowledge Publishing'
    case 'course_prompt_engineering_models':
      return 'Prompt Engineering Across ChatGPT, Claude, and Gemini (standalone course)'
    case 'course_gemini_workspace':
      return 'Gemini for Productivity and Google Workspace (standalone course)'
    case 'course_claude_writing':
      return 'Claude for Writing, Research, and Deep Thinking (standalone course)'
    case 'course_agentic_ai_real_work':
      return 'Agentic AI and AI Agents for Real Work (standalone course)'
  }
}

export function WorkspaceTeachingLabsPage() {
  const labsByLibrary = LIBRARY_ORDER.map((id) => ({
    id,
    labs: TEACHING_LABS.filter((l) => l.libraryId === id),
  })).filter((g) => g.labs.length > 0)

  return (
    <div>
      <header className="border-b border-white/[0.06] pb-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">Teaching labs</p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-white sm:text-3xl">Guided, practice, and test labs</h1>
        <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-zinc-400">
          Each lab includes scenario context, step instructions, <span className="text-zinc-300">structured learner capture</span>{' '}
          (multiple intentional fields—not one empty box), rubric/evaluation criteria, reflection prompts, remediation guidance, and
          continuation steps. Labs anchor to public lesson readers where available. The Pro-only simulation lab under{' '}
          <span className="text-zinc-300">Lab</span> remains separate (advanced workspace iteration).
        </p>
        <p className="mt-3 max-w-3xl text-[13px] leading-relaxed text-zinc-500">
          Learner help (bottom-right) answers from the indexed KB first—paste a lab id such as{' '}
          <span className="font-mono text-zinc-400">lab-ai-f1-rewrite-vague-to-useful</span> for tiered hints without dumping final artifacts.
        </p>
        <div className="mt-4 flex flex-wrap gap-3 text-[12px] text-zinc-500">
          <Link className="font-semibold text-violet-300/90 hover:text-violet-200" to="/library">
            Library overview
          </Link>
          {LEARNER_MONETIZATION_UI_DISABLED ? null : (
            <>
              <span aria-hidden>·</span>
              <Link className="font-semibold text-violet-300/90 hover:text-violet-200" to="/pricing">
                Upgrade for deeper materials
              </Link>
            </>
          )}
          <span aria-hidden>·</span>
          <Link className="font-semibold text-zinc-500 hover:text-zinc-200" to={LEGAL_ROUTES.disclaimer}>
            Disclaimer
          </Link>
        </div>
      </header>

      <div className="mt-10 space-y-16">
        {labsByLibrary.map((group) => (
          <section key={group.id} className="space-y-8">
            <div className="border-b border-white/[0.06] pb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500">{group.labs.length} labs</p>
              <h2 className="mt-2 text-xl font-semibold text-white">{libraryTitle(group.id)}</h2>
              <p className="mt-2 max-w-3xl text-[13px] leading-relaxed text-zinc-500">
                Practice surfaces stay instructional—pair with your organization’s policies and access boundaries on linked lessons.
              </p>
            </div>
            <div className="space-y-10">
              {group.labs.map((lab) => (
                <TeachingLabArticle key={lab.id} lab={lab} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  )
}
