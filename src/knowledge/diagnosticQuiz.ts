import type { SeedModuleQuiz, SeedQuizQuestion } from '../training/seedStructure'

/**
 * Plan-level diagnostic (not tied to a module). Questions align to concepts c1–c5 in the heuristic graph.
 * Correct option is always index 0 for deterministic scoring in placement.
 */
export function buildDiagnosticQuizSeed(input: { topic: string; objective: string }): SeedModuleQuiz {
  const topic = input.topic.trim() || 'this topic'
  const objective = input.objective.trim() || 'your objective'

  const questions: SeedQuizQuestion[] = [
    q(
      0,
      `For “${topic}”, what is the best first step before practicing skills?`,
      [
        `Name a real situation, stakeholder, and constraint tied to: ${objective}`,
        `Read broadly until you feel inspired`,
        `Copy a competitor’s workflow verbatim`,
        `Avoid defining success so you stay flexible`,
      ],
      `Grounding the work in a concrete situation prevents generic practice that does not transfer.`,
      'easy',
    ),
    q(
      1,
      `Which statement best describes a measurable practice signal for “${topic}”?`,
      [
        `An observable weekly outcome you can verify (artifact, metric, or decision)`,
        `Hours spent studying`,
        `How motivated you feel`,
        `Number of tabs open in your browser`,
      ],
      `Signals should be observable; effort and mood are weak proxies for competence.`,
      'easy',
    ),
    q(
      2,
      `When constraints are tight, what is the most reliable way to improve “${topic}” outputs?`,
      [
        `Iterate with explicit quality criteria and a small feedback loop`,
        `Wait until you have more time`,
        `Add more tools and templates`,
        `Avoid reviewing mistakes to stay confident`,
      ],
      `Tight loops with criteria beat waiting or tool-chasing.`,
      'medium',
    ),
    q(
      3,
      `Which failure mode is most common when learning “${topic}” alongside other priorities?`,
      [
        `Drifting objectives—practice that does not connect to decisions or artifacts`,
        `Being too specific about the stakeholder`,
        `Measuring outcomes too often`,
        `Writing down non-goals`,
      ],
      `Drift is the default failure mode under competing priorities.`,
      'medium',
    ),
    q(
      4,
      `For high-stakes rehearsal (e.g., timed checks, interviews, presentations—not a credential promise), what matters most near the deadline?`,
      [
        `Explain your approach under time pressure and self-check with criteria`,
        `Consume more content to reduce anxiety`,
        `Memorize buzzwords without application`,
        `Avoid practice tests because they feel stressful`,
      ],
      `Demonstrated explanation + self-check beats consumption for retrieval—external exams still require official syllabi and materials.`,
      'hard',
    ),
  ]

  return {
    title: `Diagnostic: ${topic}`,
    description: `Short placement check for “${topic}”. This does not grade you as a person—it helps calibrate where to start.`,
    sort_order: -1,
    questions,
  }
}

function q(
  sort_order: number,
  prompt: string,
  options: [string, string, string, string],
  explanation: string,
  difficulty: 'easy' | 'medium' | 'hard',
): SeedQuizQuestion {
  return {
    prompt,
    question_type: 'mcq',
    options_json: [...options],
    correct_answer: '0',
    sort_order,
    explanation,
    difficulty,
  }
}
