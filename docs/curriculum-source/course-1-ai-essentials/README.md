# Course 1 — AI Essentials (canonical sources)

Authoritative narrative and assessment standards live under the repo’s `How to use Claude/` folder (improved module markdown, capstone prep, certificate readiness, progress milestones spec, etc.). That tree may be untracked on some clones; this file lists what the **platform** already reflects.

## Platform surfaces

| Concern | Primary code / data |
| --- | --- |
| Module spine (16 × `ae-mNN`) | `src/data/learning/aiEssentialsCourse1Modules.ts`, wired via `src/data/learning/flagshipCourseCurricula.ts` |
| Sessions | `src/data/learning/flagshipCourseSessions.ts` (generated from curriculum) |
| Lesson / practice blocks | `src/data/learning/flagshipSessionContentOverridesAiEssentialsLessons.ts`, `src/data/learning/aiEssentialsLessonOverridesM10M16.ts`, related override maps |
| Module quizzes | `src/data/learning/course1AiEssentialsQuizBank.ts` + `src/lib/flagshipModuleQuizPools.ts` |
| Mastery checkpoints | `src/lib/flagshipAssessmentBespokeModules.ts`, `src/lib/flagshipAssessmentCompletion.ts` |
| Ten-milestone learner % | `src/lib/aiEssentialsProgressMilestones.ts` (`getFlagshipCourseDisplayProgressPercent`) |
| Capstone rubric self-grade (local state; not in Supabase row yet) | `src/lib/flagshipCourseProgressDerived.ts`, UI `src/components/learn/AeCapstoneRubricSelfGradePanel.tsx` on Module 16 / capstone prep |
| Portfolio hints | `src/data/learning/portfolioOutputsCatalog.ts` (`po-ai-m01` … `po-ai-m16`) |
| Continuity checks | `npm run verify:course1-ai-essentials` |

## Filename canon (artifacts)

Learner-facing expected outputs use `ModuleNN_Descriptive_Name_[YourName].pdf or .docx` (see module `expectedOutputs` in `aiEssentialsCourse1Modules.ts` and matching `po-ai-mNN` rows).
