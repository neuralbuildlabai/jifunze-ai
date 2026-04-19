import type { CurriculumCategory } from './aiEverydayWorkCurriculum'
import {
  GEMINI_WORKSPACE_PRODUCTIVITY_SPEC,
  LEARN_CHATGPT_EVERYDAY_SPEC,
  PROMPT_ENGINEERING_MODELS_SPEC,
} from './standaloneCoursesSpecs'
import { AGENTIC_AI_REAL_WORK_SPEC, CLAUDE_WRITING_RESEARCH_SPEC } from './standaloneCoursesSpecsWave2'
import { compileStandaloneCourse } from './standaloneCoursesCompiler'

export const LEARN_CHATGPT_EVERYDAY_CURRICULUM: CurriculumCategory[] = compileStandaloneCourse(LEARN_CHATGPT_EVERYDAY_SPEC)
export const PROMPT_ENGINEERING_MODELS_CURRICULUM: CurriculumCategory[] = compileStandaloneCourse(PROMPT_ENGINEERING_MODELS_SPEC)
export const GEMINI_WORKSPACE_PRODUCTIVITY_CURRICULUM: CurriculumCategory[] =
  compileStandaloneCourse(GEMINI_WORKSPACE_PRODUCTIVITY_SPEC)
export const CLAUDE_WRITING_RESEARCH_CURRICULUM: CurriculumCategory[] = compileStandaloneCourse(CLAUDE_WRITING_RESEARCH_SPEC)
export const AGENTIC_AI_REAL_WORK_CURRICULUM: CurriculumCategory[] = compileStandaloneCourse(AGENTIC_AI_REAL_WORK_SPEC)

export const STANDALONE_COURSE_CURRICULA: CurriculumCategory[][] = [
  LEARN_CHATGPT_EVERYDAY_CURRICULUM,
  PROMPT_ENGINEERING_MODELS_CURRICULUM,
  GEMINI_WORKSPACE_PRODUCTIVITY_CURRICULUM,
  CLAUDE_WRITING_RESEARCH_CURRICULUM,
  AGENTIC_AI_REAL_WORK_CURRICULUM,
]

/** Public reader map lives under `/learn` so course landing pages can occupy the canonical `/courses/...` route. */
export const LEARN_CHATGPT_EVERYDAY_LANDING_PATH = '/courses/learn-chatgpt-everyday-work'
export const LEARN_CHATGPT_EVERYDAY_PUBLIC_BASE_PATH = `${LEARN_CHATGPT_EVERYDAY_LANDING_PATH}/learn`

export const PROMPT_ENGINEERING_MODELS_LANDING_PATH = '/courses/prompt-engineering-models'
export const PROMPT_ENGINEERING_MODELS_PUBLIC_BASE_PATH = `${PROMPT_ENGINEERING_MODELS_LANDING_PATH}/learn`

export const GEMINI_WORKSPACE_PRODUCTIVITY_LANDING_PATH = '/courses/gemini-workspace-productivity'
export const GEMINI_WORKSPACE_PRODUCTIVITY_PUBLIC_BASE_PATH = `${GEMINI_WORKSPACE_PRODUCTIVITY_LANDING_PATH}/learn`

export const CLAUDE_WRITING_RESEARCH_LANDING_PATH = '/courses/claude-writing-research-deep-thinking'
export const CLAUDE_WRITING_RESEARCH_PUBLIC_BASE_PATH = `${CLAUDE_WRITING_RESEARCH_LANDING_PATH}/learn`

export const AGENTIC_AI_REAL_WORK_LANDING_PATH = '/courses/agentic-ai-real-work'
export const AGENTIC_AI_REAL_WORK_PUBLIC_BASE_PATH = `${AGENTIC_AI_REAL_WORK_LANDING_PATH}/learn`

export const STANDALONE_CATEGORY_LIBRARY_TITLE: Record<string, string> = (() => {
  const map: Record<string, string> = {}
  for (const tree of STANDALONE_COURSE_CURRICULA) {
    for (const cat of tree) {
      map[cat.id] =
        cat.id.startsWith('lcew-')
          ? LEARN_CHATGPT_EVERYDAY_SPEC.libraryTitle
          : cat.id.startsWith('pem-')
            ? PROMPT_ENGINEERING_MODELS_SPEC.libraryTitle
            : cat.id.startsWith('gpw-')
              ? GEMINI_WORKSPACE_PRODUCTIVITY_SPEC.libraryTitle
              : cat.id.startsWith('clw-')
                ? CLAUDE_WRITING_RESEARCH_SPEC.libraryTitle
                : cat.id.startsWith('aar-')
                  ? AGENTIC_AI_REAL_WORK_SPEC.libraryTitle
                  : 'Jifunze standalone course'
    }
  }
  return map
})()
