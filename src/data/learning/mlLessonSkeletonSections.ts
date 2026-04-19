import type { CurriculumLesson } from './aiEverydayWorkCurriculum'
import type { PublicStarterLessonSection } from '../publicStarterLibraries/aiFoundations'

export function skeletonSectionsForMlLesson(lesson: CurriculumLesson): PublicStarterLessonSection[] {
  return [
    {
      heading: 'Core ideas',
      paragraphs: [
        lesson.summary,
        `${lesson.outcomes[0]} This reader supports ML literacy—not a substitute for coursework, exams, employer certification, or licensed practice where those apply.`,
      ],
    },
    {
      heading: 'Practice (pick one)',
      paragraphs: [
        `Apply this lesson to one realistic scenario you could observe safely: ${lesson.outcomes[1]} Note where human oversight must stay in the loop.`,
        `Stretch: ${lesson.outcomes[2]}`,
      ],
    },
    {
      heading: 'Trust and review',
      paragraphs: [
        'Treat metrics, demos, and model outputs as conditional—verify against domain constraints, fairness obligations, and deployment risks before relying on them.',
      ],
    },
  ]
}
