#!/usr/bin/env python3
"""
Align Course 1 / AI Essentials manuscript wording with the shipped Jifunze rule:
module quiz = 8 questions, pass = at least 6 correct (say '6 of 8', not '80%').

Skips Course1_Progress_Milestones_Spec.md (milestone table uses 80% as *course progress*, not quiz).
"""
from __future__ import annotations

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "How to use Claude"
SKIP = frozenset(
    {
        "Course1_Progress_Milestones_Spec.md",  # table uses 80% as *course milestone* percent
        "Course1_Assessment_Standards.md",  # edited by hand (partial-credit + platform note)
    },
)


def transform(text: str) -> str:
    # Module 14/15/11: align to platform 6 of 8 (was 7 of 8 in some manuscripts).
    text = re.sub(
        r"Pass threshold: 80% \(at least 7 of 8 substantively correct[^)]*\)",
        "Pass threshold: at least 6 of 8 questions correct (substantively correct per strong-answer criteria where rubric-graded)",
        text,
    )
    text = re.sub(
        r"The checkpoint quiz reaches at least 80%, with the application",
        "The checkpoint quiz reaches at least 6 of 8, with the application",
        text,
    )
    text = re.sub(
        r"Pass threshold is 80% \(7 of 8 substantively correct\)",
        "Pass threshold is at least 6 of 8 substantively correct",
        text,
    )
    text = re.sub(
        r"Pass threshold: 80% \(seven correct[^)]*\)",
        "Pass threshold: at least 6 of 8 questions correct (or, for short-answer and application items, meeting the strong-answer criteria below)",
        text,
    )
    text = re.sub(r"You scored at least 80% on the checkpoint quiz", "You scored at least 6 of 8 on the checkpoint quiz", text)
    text = re.sub(
        r"Pass threshold: 80%, with auto-graded",
        "Pass threshold: at least 6 of 8 correct, with auto-graded",
        text,
    )
    text = re.sub(r"Pass threshold: 80%\.", "Pass threshold: at least 6 of 8 questions correct.", text)

    # Common six-of-eight phrasing
    pairs = [
        ("all sixteen module checkpoints passed at 80% or higher", "all sixteen module quizzes passed with at least 6 of 8 correct each"),
        ("All sixteen module checkpoints passed at 80% or higher.", "All sixteen module quizzes passed with at least 6 of 8 correct each."),
        ("all module checkpoints passed at 80%,", "all module quizzes passed with at least 6 of 8 correct each,"),
        ("passed at 80% or higher (six or more correct)", "passed with at least 6 of 8 correct"),
        ("completed at 80% or higher (six or more correct)", "completed with at least 6 of 8 correct"),
        ("completed at 80% or higher.", "completed with at least 6 of 8 correct."),
        ("Checkpoint completed at 80% or higher.", "Checkpoint completed with at least 6 of 8 correct."),
        ("The 8-question checkpoint completed at 80% or higher.", "The 8-question checkpoint completed with at least 6 of 8 correct."),
        ("Eight questions. Pass threshold: 80% (six out of eight).", "Eight questions. Pass threshold: at least 6 of 8 questions correct."),
        ("Pass threshold: 80% (six out of eight).", "Pass threshold: at least 6 of 8 questions correct."),
        ("Pass threshold: 80% (six correct out of eight).", "Pass threshold: at least 6 of 8 questions correct."),
        ("The pass threshold is 80% (six correct out of eight).", "The pass threshold is at least 6 of 8 questions correct."),
        ("Pass threshold is 80% — six correct out of eight.", "Pass threshold is at least 6 of 8 questions correct."),
        ("Pass threshold: 80% — six correct out of eight.", "Pass threshold: at least 6 of 8 questions correct."),
        ("Pass threshold 80% (6.0/8.0).", "Pass threshold: at least 6 of 8 correct (6.0/8.0 when partial credit is summed)."),
        ("met the 80% threshold", "met the pass bar (at least 6 of 8)"),
        ("The 8-question checkpoint quiz, completed at 80% or higher (six or more correct).", "The 8-question checkpoint quiz, completed with at least 6 of 8 correct."),
        ("If you scored under 80% on the checkpoint", "If you scored below 6 of 8 on the checkpoint",),
        ("If you scored under 80% on the checkpoint,", "If you scored below 6 of 8 on the checkpoint,"),
        ("scored below 80% on a module checkpoint", "scored below 6 of 8 on a module checkpoint"),
        ("Any checkpoint below 80% on first attempt", "Any checkpoint below 6 of 8 on first attempt"),
        ("The pass threshold of 80% means the learner must mark themselves as correct on at least six of eight", "The pass rule means the learner must mark themselves as correct on at least six of eight",),
        ("Pass threshold: 80%", "Pass threshold: at least 6 of 8 correct"),
        ("Pass threshold is 80%", "Pass threshold is at least 6 of 8 correct"),
        ("The checkpoint pass threshold is 80%.", "The checkpoint pass threshold is at least 6 of 8 questions correct."),
        ("at the 80% checkpoint threshold", "with every module quiz passed (at least 6 of 8 correct)"),
        ("sixteen module checkpoints at 80% or higher", "sixteen module quizzes at at least 6 of 8 correct each"),
        ("Pass threshold: 80%.", "Pass threshold: at least 6 of 8 questions correct."),
        ("formats. Pass threshold 80%.", "formats. Pass threshold: at least 6 of 8 correct."),
        ("- Pass threshold: 80%.", "- Pass threshold: at least 6 of 8 correct."),
        ("I scored at least 80 percent on the checkpoint quiz", "I scored at least 6 of 8 on the checkpoint quiz"),
        ("Pass threshold is 80 percent.", "Pass threshold is at least 6 of 8 correct."),
        ("The pass threshold is 80 percent.", "The pass threshold is at least 6 of 8 correct."),
        ("80% threshold all visible", "6-of-8 pass rule all visible"),
        ("Pass threshold is 80%.", "Pass threshold is at least 6 of 8 correct."),
        ("Pass threshold is 80% \"", "Pass threshold is at least 6 of 8 correct \""),  # unlikely
    ]
    for a, b in pairs:
        text = text.replace(a, b)

    # Certificate / capstone long bullets (remaining fragments)
    text = text.replace(
        "(1) all sixteen module checkpoints passed at 80% or higher;",
        "(1) all sixteen module quizzes passed with at least 6 of 8 correct each;",
    )

    return text


def main() -> None:
    changed: list[Path] = []
    for path in sorted(ROOT.glob("*.md")):
        if path.name in SKIP:
            continue
        raw = path.read_text(encoding="utf-8")
        new = transform(raw)
        if new != raw:
            path.write_text(new, encoding="utf-8")
            changed.append(path)
    for p in changed:
        print(p.relative_to(ROOT.parent))


if __name__ == "__main__":
    main()
