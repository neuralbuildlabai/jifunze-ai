/**
 * Module-bound quiz pools — questions are generated from the module’s own session metadata only.
 */

import type { FlagshipCurriculumModule } from '../data/learning/flagshipCourseCurricula'
import type { FlagshipSession } from '../data/learning/flagshipCourseSessions'

export type ModuleQuizQuestion = {
  id: string
  prompt: string
  choices: readonly string[]
  correctIndex: number
}

export const MODULE_QUIZ_DRAW_COUNT = 8
export const MODULE_QUIZ_MIN_CORRECT = 6
export const MODULE_QUIZ_LOCK_MS = 10 * 60 * 1000

function shuffle<T>(xs: T[], seedStr: string): T[] {
  let h = 0
  for (let i = 0; i < seedStr.length; i++) h = (h * 31 + seedStr.charCodeAt(i)) >>> 0
  const out = [...xs]
  for (let i = out.length - 1; i > 0; i--) {
    h = (h * 1664525 + 1013904223) >>> 0
    const j = h % (i + 1)
    ;[out[i], out[j]] = [out[j]!, out[i]!]
  }
  return out
}

function clip(s: string, max: number): string {
  const t = s.trim()
  if (t.length <= max) return t
  return `${t.slice(0, max - 1)}…`
}

/**
 * Build a sufficiently large pool so retakes can vary (minimum 14 questions when enough sessions exist).
 */
export function buildModuleQuizPool(module: FlagshipCurriculumModule, sessions: FlagshipSession[]): ModuleQuizQuestion[] {
  const modSessions = sessions
    .filter((s) => s.moduleId === module.id && s.type === 'lesson')
    .sort((a, b) => a.orderInModule - b.orderInModule)
  const fallback = sessions.filter((s) => s.moduleId === module.id).sort((a, b) => a.orderInModule - b.orderInModule)

  const src = modSessions.length >= 2 ? modSessions : fallback
  const titles = src.map((s) => s.title)
  const summaries = src.map((s) => clip(s.summary, 220))

  const pool: ModuleQuizQuestion[] = []
  let q = 0

  for (let i = 0; i < src.length; i++) {
    const s = src[i]!
    const wrongTitles = titles.filter((_, j) => j !== i).slice(0, 8)
    const opts = shuffle([s.title, ...wrongTitles.slice(0, 3)], `${module.id}-t-${i}`)
    const correctIndex = opts.indexOf(s.title)
    if (correctIndex >= 0) {
      pool.push({
        id: `${module.id}-q${q++}`,
        prompt: 'Which session title belongs in this module’s learning sequence?',
        choices: opts,
        correctIndex,
      })
    }

    const obj = s.objectives[0] ?? s.summary.slice(0, 120)
    const distractors = summaries
      .filter((_, j) => j !== i)
      .slice(0, 6)
      .map((x) => clip(x, 90))
    const opt2 = shuffle([clip(obj, 90), ...distractors.slice(0, 3)], `${module.id}-o-${i}`)
    const ci2 = opt2.indexOf(clip(obj, 90))
    if (ci2 >= 0 && opt2.length >= 4) {
      pool.push({
        id: `${module.id}-q${q++}`,
        prompt: `For “${clip(s.title, 70)}”, which objective or summary best matches what this session emphasizes?`,
        choices: opt2,
        correctIndex: ci2,
      })
    }
  }

  // Concept checks grounded in module headline
  const goal = clip(module.learningGoals[0] ?? module.summary.slice(0, 80), 100)
  const headChoices = shuffle(
    [goal, 'Generic social growth hacks', 'Hardware repair fundamentals', 'Certified exam proctoring'],
    `${module.id}-head`,
  )
  pool.push({
    id: `${module.id}-q${q++}`,
    prompt: `The module “${clip(module.title, 80)}” primarily builds competence in which area?`,
    choices: headChoices,
    correctIndex: headChoices.indexOf(goal),
  })

  // Pad pool from summaries if small
  let pad = 0
  while (pool.length < 14 && pad < summaries.length * 2) {
    const si = pad % Math.max(summaries.length, 1)
    const sj = (pad + 1) % Math.max(summaries.length, 1)
    const a = summaries[si] ?? module.title
    const b = summaries[sj] ?? module.title
    if (a !== b) {
      const choices = shuffle([a, b, 'Neither applies to this module', 'Both are outside this module'], `${module.id}-pad-${pad}`)
      pool.push({
        id: `${module.id}-q${q++}`,
        prompt: 'Which excerpt better reflects ideas taught in this module?',
        choices,
        correctIndex: choices.indexOf(a),
      })
    }
    pad++
  }

  return pool.filter((p) => p.correctIndex >= 0 && p.choices.length >= 4)
}

export function drawQuizQuestions(pool: ModuleQuizQuestion[], seed: string): ModuleQuizQuestion[] {
  if (pool.length === 0) return []
  const shuffled = shuffle(pool, seed)
  const n = Math.min(MODULE_QUIZ_DRAW_COUNT, shuffled.length)
  const picked = shuffled.slice(0, n)
  return picked.map((q) => {
    const perm = shuffle([...q.choices], `${seed}-${q.id}`)
    const correctText = q.choices[q.correctIndex]
    const correctIndex = perm.indexOf(correctText)
    return {
      ...q,
      choices: perm,
      correctIndex,
    }
  })
}
