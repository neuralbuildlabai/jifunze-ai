# Module 11: AI for Research, Analysis, and Synthesis

## Continuity bridge from Module 10

Module 10 set the safety foundation for everything that comes after it. Before you used AI for serious thinking work, you learned to ask one question first: *what is the smallest amount of information the AI actually needs in order to help me with this task?* You learned to classify a piece of content into Safe, Caution, Restricted, or Never-enter, to choose between redaction and abstraction, and to recognise the cases where the right move is to pause and escalate rather than to refine the prompt.

Those habits are not optional in this module. Research, analysis, and synthesis tasks pull source material from many places — interview transcripts, customer feedback, internal reports, partner documents, articles, datasets, regulatory text, screenshots from meetings. Some of that material is public. Much of it is not. The fact that you are now using AI to *think* with rather than to *write* with does not change the privacy picture; if anything, research tasks tempt you to paste more, because you want the AI to "see everything." That is exactly the situation where the minimum-necessary discipline matters most.

So as you move into this module, carry forward three things from Module 10. First, classify every source before you paste it. A published article is not the same as a leaked draft, and a sanitised customer quote is not the same as a raw transcript with names attached. Second, abstract before you summarise — write your own short version of the source from the parts the AI actually needs, and feed the AI that version, not the raw material. Third, when a research task pulls in Tier 3 or Tier 4 content, do the analysis without exposing the raw content to the tool. The AI can compare themes you have already abstracted; it does not need the originals.

Module 11 adds a research-assist workflow on top of those safety habits. The habits are not background noise. They are step zero of every workflow in this module.

## What was wrong before

The original module named the right topics — research framing, summarisation, comparison, synthesis — but did not work them out. Worked examples were named in headings ("Comparing sources," "Theme clustering") but not written out, so a learner could not see the actual prompt, the actual output, what was correct, and what needed correcting. Practice activities were listed as instructions ("compare three sources," "label uncertainty") without supplying any source material, which meant a self-learner had to invent their own examples before they could practise — usually badly, and often without realising it. Checkpoint questions were stubs rather than fully developed items with strong-answer criteria. There was no portfolio artifact specific enough to be reviewable, and no clear handoff to Module 12.

## What was improved

This version adds a complete research-assist workflow with eight named steps, supplied source excerpts the learner can use without inventing their own, four fully written worked examples with prompts, outputs, and corrected reviews, four practice activities with the actual source content built in, eight checkpoint questions covering multiple-choice, scenario, short-answer, and application formats, an answer key with strong-answer criteria for the open items, a named portfolio artifact with a defined filename pattern, an explicit capstone connection, revision guidance keyed to specific failure modes, and a Cursor-mapping note so the module can be split into platform lesson blocks without rewriting the teaching. Privacy discipline from Module 10 is woven into every step rather than mentioned once.

## Estimated time

Roughly three to four hours of focused work end-to-end.

- **Core lesson** — 40 to 50 minutes.
- **Worked examples** — 30 to 40 minutes (read once, then re-read at least two with one of your own research tasks in mind).
- **Practice activities** — 70 to 90 minutes total (the four activities can be split across two sittings; activities 1 and 3 are the heaviest).
- **Knowledge-to-output task** — 45 to 60 minutes.
- **Checkpoint quiz and revision** — 15 to 20 minutes.
- **Total estimated time** — approximately 3h 20m to 4h 20m.

A learner who already does research-style work — analysts, journalists, consultants, programme officers, postgraduate students — may move faster through the conceptual sections but should spend the full time on activity 4 (uncertainty labelling), since that is the habit most working researchers have to retrain when they start using AI.

## Module purpose

Most early problems with AI use in research are not about the AI inventing facts, although that happens too. They are about the AI flattening complexity, smoothing over disagreements between sources, presenting an opinion as a finding, and making a fluent paragraph sound like a conclusion when the underlying evidence is thin. The reader of a fluent AI summary trusts the writing because it reads well; the writer trusts it because the AI sounded confident. Both are wrong in the same direction.

This module teaches the discipline that prevents that failure. You learn to scope a research question before you start, to summarise sources separately before you compare them, to keep an evidence trail that ties each claim back to where it came from, to mark what you know, what needs verification, what is an assumption, and what is still open, and to write a synthesis brief that distinguishes evidence from assertion. The result is research work that reads less impressively than an unguarded AI summary and is more trustworthy by exactly the same margin.

## Learner outcomes

By the end of this module, you should be able to:

- Frame a research question clearly, including its scope boundary and what is deliberately out of scope.
- Distinguish *exploratory synthesis* (a structured reading of what sources seem to say) from *evidence-backed conclusion* (a claim supported by traceable evidence).
- Use AI to summarise and compare sources without letting it invent supporting detail or fabricate references.
- Label every claim in a piece of analysis as known, needs verification, assumption, or open question.
- Produce an evidence-based synthesis brief that uses uncertainty language honestly and ties patterns back to source material.
- Apply Module 10's privacy discipline to research workflows, including when source material is sensitive.

## Core lesson

### Synthesis is not proof

The first thing to internalise about AI-assisted research is that synthesis is not the same as proof. A synthesis is a *structured reading* of what a set of sources appears to say together. It can be useful — it surfaces themes, contrasts, and gaps faster than reading sources serially — but it is only as strong as the sources it summarised, the prompt that asked for the summary, and the human review that checked it. The fluent paragraph that comes back from the AI is not evidence. It is a description of what the AI thinks it read.

Treat every AI-produced summary as a *first reading* you will then check against the actual source. If you cannot point to the sentence in the source that supports a claim in the synthesis, the claim is not yet supported. It may turn out to be true; until you can trace it, it is an assertion, not evidence.

### The research-assist workflow

The workflow has eight steps. Each step is small. The discipline is in not skipping any of them, especially when you are in a hurry.

**1. Define the question.** Write the question you are actually trying to answer in one sentence. If you cannot, you do not have a question yet — you have a topic. *"AI in education"* is a topic. *"What evidence is there that AI tutoring tools improve learning outcomes for secondary-school students in low-bandwidth contexts?"* is a question. Topics produce wandering summaries. Questions produce focused ones.

**2. Set the scope.** Name what is in scope and what is out of scope. Scope boundaries usually cover four dimensions: time (last five years? last decade?), geography (Kenya, East Africa, sub-Saharan Africa, global?), population (which learners, which workers, which patients?), and depth (a quick scan or a careful read?). Write the boundaries down before you collect sources. You will be tempted to widen them mid-way; do not, unless you have a reason and you note it.

**3. Collect sources.** Gather the actual sources you will use — articles, reports, interview transcripts, internal documents, datasets, websites. Note for each source its origin, its date, and what kind of evidence it offers (peer-reviewed study, opinion piece, news report, internal memo, anecdote). At this step, do not yet ask the AI for "the answer." You are building an inputs list, not a conclusion.

**4. Summarise each source separately.** Before any comparison, get a short summary of each source, on its own. The reason for separation is that comparison too early lets the AI smooth over differences between sources. A separate summary preserves what each source actually said, in its own voice. Save these summaries. They become your evidence trail.

**5. Compare and cluster themes.** Now you can ask for theme comparison across the summaries. Themes are the patterns that appear in more than one source. Clustering is the act of grouping related themes. The AI is useful here, but watch for two failure modes: it will sometimes invent a theme that is not in any source, and it will sometimes present a single source's claim as if it were a shared theme. Both failures look fluent.

**6. Mark uncertainty.** For every claim you keep, label it as one of four things. *Known* — you can point to evidence in your sources that supports it. *Needs verification* — it sounds right and probably is, but you have not yet confirmed it. *Assumption* — you are taking it as given without proof, and you are willing to say so. *Open question* — the sources do not agree, or the evidence is not yet there. The four labels are the difference between a research brief and an opinion piece.

**7. Draft synthesis.** Now write the synthesis. Lead with the question and the scope. Present the patterns you found, with each pattern tied back to the sources that support it. Surface the disagreements between sources rather than averaging them away. Keep the uncertainty labels in the brief itself; do not bury them in a footnote or strip them out for the executive summary. A reader can use a brief that admits its gaps. A reader cannot trust a brief that hides them.

**8. Review evidence trail.** Last step, and the one most often skipped. Walk back through the synthesis and check that every claim ties to a source summary, and every source summary ties to the original source. If a claim does not trace, either find a source for it, soften it to an assumption, or remove it. The review is what turns the brief into something a careful reader can rely on.

### Source-aware prompting

Tying the workflow to Modules 3, 4, and 5: the prompts you use for each step are not generic. A summarisation prompt is not the same as a comparison prompt is not the same as a synthesis prompt. Source-aware prompting means writing prompts that explicitly tell the AI what kind of source it is reading and what kind of output you need.

A research prompt usually contains five parts: the role (you are summarising sources for a research brief), the source identification (this is a peer-reviewed study from 2023, not a news article), the task (one paragraph summary, faithful to the source, no claims that are not in the text), the constraints (do not add citations from outside this source, do not infer findings the source does not state), and the output format (paragraph, bullets, table). The constraints matter most. They are what stop the AI from filling in plausible-sounding detail that is not actually in the source.

If you are comparing sources, the prompt names the sources and asks for *what is shared and what differs*. It does not ask for "the answer." It asks for a structured reading.

### Evidence trails

An evidence trail is the chain that connects a claim in your synthesis to a sentence in a source. The chain has three links: the synthesis claim, the source summary that supports it, and the source itself.

Keep the trail in a simple table or document. For each claim worth tracing, list the sentence as it appears in the synthesis, the summary you drew it from, and the source identifier (author, title, date, page or section). When you write the final brief, a reader who wants to check any claim should be able to follow the trail in under a minute. If they cannot, the claim is unsupported by your own materials, regardless of whether it happens to be true.

The evidence trail is also your protection against AI fabrication. If a fluent claim has no source summary behind it, it is a claim the AI generated from its general knowledge. That may be fine for context but is not evidence for your specific question.

### Uncertainty language

Uncertainty language is the small, deliberate vocabulary that tells the reader how confident you are. It is not hedging. Hedging hides what you think; uncertainty language reveals it. The honest writer uses both confidence and qualification, and chooses which based on the evidence.

Examples, from strongest to weakest:

- *The evidence shows…* — used only when you have multiple sources in agreement and a clear mechanism.
- *Sources broadly agree that…* — multiple sources, less clear mechanism, or some variation.
- *One source reports that…* — single-source claim, important but not yet corroborated.
- *It appears that…* / *the pattern suggests…* — exploratory, multiple sources hinting at the same direction without a strong claim.
- *It is unclear whether…* / *sources disagree on…* — open question, do not collapse it.
- *No source in this review addresses…* — gap, name it rather than skipping it.

Use these phrases in the synthesis itself, not only in a "limitations" section at the end. A reader who sees the language inside each claim can calibrate their trust as they read. A reader who has to flip to the limitations to discover the same thing has already finished forming an impression.

### Theme comparison and the flattening problem

When you ask an AI to compare three sources and produce themes, it has a tendency to smooth differences between sources into a single shared theme that none of the sources quite said. This is the flattening problem. It produces a synthesis that reads as if everyone agrees, even when the sources actually disagree on something important.

You catch flattening by going back to the source summaries. If the synthesis says *"sources agree that X"* and one of your three source summaries does not mention X, the AI has invented agreement. If the synthesis says *"sources broadly support Y"* and the strongest source actually argues against Y, the AI has flattened a disagreement into a generality. Either way, the fix is to rewrite the theme to reflect the actual disagreement: *"Two sources support Y; the third argues against it for reason Z."* The honest version is more useful than the smoothed one.

### Avoiding overconfident analysis

Fluent prose feels confident. AI prose is fluent by default. That combination produces analysis that sounds stronger than the evidence behind it. The mismatch between fluency and evidence is the single most common failure mode in AI-assisted research.

The defence is not to make the prose worse. It is to insist that confidence in language tracks confidence in evidence. If the underlying evidence is thin, the prose should say so plainly — *"this is suggested by one source and has not been independently confirmed"* — rather than leaving the reader with a paragraph that sounds settled. Strong analysis is not the analysis that sounds most certain. It is the analysis whose tone of certainty matches what the evidence actually supports.

### Privacy discipline in research workflows

Carrying Module 10 forward: when sources contain identifying or sensitive content, the workflow above runs on *abstractions you have written*, not on the raw sources. If you are summarising interview transcripts, you write a short, de-identified version of each interview yourself, and the AI works from those. If you are reviewing internal reports, you extract the structural claims (what is the pattern, what is the evidence type, what is the time range) without pasting the full document. If a source contains Tier 3 or Tier 4 content (clinical notes, performance records, contract terms with names attached, complaints, candidate evaluations), the AI does not see the source — full stop — even if you are tempted to "let it read everything for context." Step zero of every research workflow is the minimum-necessary check from Module 10.

This is not optional, and it is not a footnote. A research brief that contains a re-identifiable case detail, even buried in a quote, is a privacy incident regardless of how good the analysis is.

## Fully written worked examples

### Worked example 1: Comparing three source excerpts on AI tutoring outcomes

**Scenario.** A learner, Aisha, is preparing a short briefing for her school's leadership team on whether to pilot an AI tutoring tool with their Form 2 students. She has gathered three short source excerpts.

**Source A — abstract from a 2024 peer-reviewed study (paraphrased).**
> *In a 12-week randomised study of 480 secondary-school students across three Nairobi schools, students using an AI tutoring tool for mathematics showed a 14% improvement on end-of-term assessments compared with a control group. The effect was strongest among students who began the term in the lower-performance quartile. The authors note that engagement with the tool dropped sharply after week 8 and recommend further work on sustained use.*

**Source B — extract from a 2023 opinion piece in an education magazine (paraphrased).**
> *AI tutors are at risk of widening, not narrowing, inequality. Wealthier schools deploy them with strong teacher oversight, while under-resourced schools rely on the tool to substitute for teaching capacity. Without trained adults reviewing student progress, AI tutors become electronic worksheets — useful in the short term, harmful when they replace pedagogical judgement.*

**Source C — internal note from a small-school pilot in Kisumu, dated 2024 (paraphrased).**
> *We piloted an AI tutor with 60 students for one term. Engagement was high in the first month; teachers reported that students who already had reading difficulty struggled to use the interface. End-of-term test results were mixed — slightly better in mathematics, no clear effect in English. We are not continuing the pilot due to data-cost concerns.*

**AI-assisted theme comparison — first attempt.**

> *Prompt: You are summarising three short sources for a research brief. Sources A, B, and C are pasted below. Identify themes that appear in more than one source. For each theme, name the sources that support it. Do not introduce themes that are not in any of the three sources. Quote a phrase from the source where the theme appears.*
>
> *Output (excerpt):*
>
> *Theme 1 — AI tutors can improve learning outcomes. All three sources support a positive effect on student performance, particularly in mathematics.*
>
> *Theme 2 — AI tutors require teacher oversight. Sources B and C both highlight that without adult supervision, AI tutoring loses its value.*
>
> *Theme 3 — Sustained engagement is a challenge. Source A and Source C report that student engagement drops over time.*

**What sounds correct.** The output is structured. It names sources. It looks like the kind of output a brief would draw from.

**What is wrong.** Theme 1 is flattening. Source A reports a 14% improvement; Source C reports *"slightly better in mathematics, no clear effect in English"*; Source B does not address learning outcomes at all and is in fact critical. *"All three sources support a positive effect"* is not what these sources say. Theme 2 is partially flattening as well. Source B explicitly says oversight matters; Source C reports that teachers observed difficulties but does not make a claim about oversight as the variable. Source A does not mention oversight. Theme 3 is closer to defensible, but Source C says engagement was high "in the first month," which is a different time scale from Source A's "after week 8."

**What was preserved.** The structure (themes, source attribution, quoted phrasing) is genuinely useful and the AI got the format right. The flagging of "engagement decline" as a shared concern is reasonable, with the time-scale caveat.

**What was flattened.** The disagreement between Source A and Source B has been smoothed into agreement. The mixed results in Source C have been simplified into "positive." A reader of the first attempt would walk away thinking the evidence on AI tutoring outcomes is more consistent than it actually is.

**Corrected learner review.**

> *Theme 1 — Mixed evidence on learning outcomes. Source A reports a measurable 14% improvement in mathematics in a Nairobi study. Source C reports a smaller, mixed effect (slightly better in mathematics, no clear effect in English). Source B does not measure outcomes; it argues that, without teacher oversight, AI tutors risk substituting for pedagogy. The three sources together do not show a settled positive effect on outcomes.*
>
> *Theme 2 — The role of teacher oversight. Source B argues directly that oversight is what separates beneficial use from electronic-worksheet use. Source C notes teacher observations of student struggle (interface, reading difficulty) but does not make a structural claim about oversight. Source A does not address oversight. Treat oversight as a claim from one source pending corroboration.*
>
> *Theme 3 — Engagement decline as a shared concern. Source A reports engagement dropping sharply after week 8. Source C reports engagement high in the first month and is silent on later weeks because the pilot was discontinued. There is partial overlap in time scale, not full agreement.*
>
> *Open questions. Cost — Source C cites data costs as the reason for stopping; Source A and Source B do not address cost. Equity — Source B raises an equity concern that the other two do not engage with directly.*

**What the learner should notice.** The corrected review is less impressive-sounding than the first attempt. That is the point. It tells the leadership team what the three sources actually support, what one source claims and others have not corroborated, and what the open questions are. A pilot decision can be made from the corrected review. A pilot decision made from the first attempt would be made on flattened evidence.

### Worked example 2: Turning interview notes into theme clusters

**Scenario.** A small NGO is reviewing how its frontline staff feel about a new case-management software they rolled out four months ago. The programme officer, Brian, has five short interview snippets — already de-identified by Brian himself before any AI was involved (Module 10 step zero).

**Interview snippets.**

> *Snippet 1 (field officer, Kakamega).* "The form-filling is faster than the old paper system, but I lose work when the connection drops. I have started keeping paper notes alongside it, just in case."
>
> *Snippet 2 (field officer, Mombasa).* "The reports are easier to pull. I used to spend half a Friday on numbers; now it takes 20 minutes. Training took longer than it should have, though — about two weeks before I was comfortable."
>
> *Snippet 3 (case worker, Nairobi).* "I do not trust the platform with case-sensitive notes. We had a sync issue in March and I could not see a client's record when I needed it. Since then, I write the notes locally and only upload the summary."
>
> *Snippet 4 (field officer, Kisumu).* "It is fine. The interface is busy. New colleagues take a while to find the buttons. Once you know it, it is fine."
>
> *Snippet 5 (programme assistant, Nairobi).* "I like it. The dashboards help in meetings. I would like a way to print a one-page summary for clients without sensitive detail."

**AI-generated cluster output (excerpt).**

> *Cluster 1 — Speed and efficiency. Most staff report the new system is faster than the old one (Snippets 1, 2, 5). Field officers and programme assistants both note time savings.*
>
> *Cluster 2 — Connectivity and trust. Field officers in remote areas report connectivity-related concerns that affect trust in the platform (Snippets 1, 3, 4).*
>
> *Cluster 3 — Training and onboarding. Snippets 2 and 4 report that training is slow but improves with use, indicating a learning-curve issue across the organisation.*
>
> *Cluster 4 — Need for offline support. Field officers consistently request offline functionality. This points to a clear product requirement.*

**One overreaching cluster.** Cluster 4 is the overreach. Snippet 1 mentions losing work when the connection drops and keeping paper notes; Snippet 3 mentions a sync issue and writing notes locally. Neither of these explicitly *requests offline functionality*. The AI has translated two operational workarounds into a "consistent request" and concluded with a "clear product requirement." That is a flattening — and worse, it is an inferred recommendation that none of the staff actually made.

Cluster 2 also conflates two different things. Snippet 1 is about connectivity. Snippet 3 is about a sync failure and case-sensitive notes — that is closer to a data-integrity concern than a connectivity one. Snippet 4 says "it is fine" about the interface and is unrelated to connectivity at all; the AI grouped it because it came from a field officer.

**How the learner catches and corrects it.**

Brian goes back to the snippets and asks one question per cluster: *which exact phrase in the snippet supports the cluster claim?* For Cluster 4, he cannot find a phrase from any snippet that says "we want offline functionality" — only phrases that show staff working around connectivity issues. For Cluster 2, he finds that the connectivity claim is from Snippet 1 only and the trust claim is from Snippet 3 only.

**Corrected clusters.**

> *Cluster 1 — Time savings. Two staff (Snippets 2, 5) report measurable time savings on reporting and meeting prep. Snippet 1 reports speed improvements with caveats. The pattern is consistent enough to call.*
>
> *Cluster 2 — Connectivity and data integrity (separate, not merged). Snippet 1: connectivity drops cause work loss; staff member is keeping paper backups. Snippet 3: a sync incident in March caused a missed record; staff member now writes locally and uploads summaries. These are related but distinct concerns and should be raised separately with the technology team.*
>
> *Cluster 3 — Training and onboarding. Snippet 2: training took ~2 weeks. Snippet 4: new colleagues find the interface busy. The pattern points to onboarding effort rather than a fully consistent training problem.*
>
> *Open question. Snippet 5 raises a feature need (printable client summaries without sensitive detail) that none of the other snippets confirm. Worth flagging, not yet a pattern.*
>
> *What was wrong in the first version. Cluster 4 ("offline support") was inferred, not stated. Removed. Cluster 2 was conflating connectivity with data integrity; split into two related findings.*

**What the learner should notice.** The first AI clustering reads more like a management report — "clear product requirement," "consistent request" — than the staff actually said. The corrected version reads more like field reality. The corrected version is what a sensible technology team can act on.

### Worked example 3: Weak synthesis that sounds stronger than the evidence

**Scenario.** Wanjiku is drafting a one-paragraph synthesis for her organisation's quarterly report on whether their financial-literacy programme is improving savings behaviour among women microentrepreneurs in Nairobi. She has three sources: an internal end-of-cohort survey, a follow-up call summary three months later, and one published study on a similar programme in Tanzania.

**Overconfident AI synthesis paragraph.**

> *The financial-literacy programme is delivering measurable results. Participants are saving more, planning more carefully, and investing in business growth. The combination of structured training and peer accountability is the key driver of this success. Evidence from a comparable programme in Tanzania confirms that this model is effective at scale, and our cohort data shows that women microentrepreneurs in Nairobi are following the same trajectory. The next step is to expand the model to additional counties.*

**What is unsupported.**

- *"Delivering measurable results"* — the survey shows self-reported behaviour change. That is a signal, not a measurement.
- *"Saving more, planning more carefully, and investing in business growth"* — only "saving more" is in the survey. "Planning more carefully" comes from the follow-up call summary. "Investing in business growth" is not in any of the three sources; the AI has inferred it from "saving."
- *"The combination of structured training and peer accountability is the key driver"* — none of the three sources isolates training versus peer accountability. The AI has invented a causal claim.
- *"Evidence from a comparable programme in Tanzania confirms that this model is effective at scale"* — the Tanzanian study is on a similar but not identical programme, and "effective at scale" is not what a single study confirms.
- *"Following the same trajectory"* — there is no longitudinal comparison in the sources.
- *"The next step is to expand the model to additional counties"* — that is a recommendation, not a finding.

**Rewritten synthesis with careful uncertainty language.**

> *The end-of-cohort survey reports that 68% of participants describe their savings behaviour as improved since starting the programme; the three-month follow-up call summary indicates that around half of those who responded say they are still saving regularly, although the response rate on the follow-up was 41% and may not be representative. A 2023 study of a comparable programme in Tanzania reports a positive effect on savings behaviour among women microentrepreneurs over a 12-month window; the relevance of that study to the Nairobi context is plausible but not confirmed. None of the three sources isolates the contribution of structured training versus peer accountability, and none of them measures investment in business growth — only savings behaviour. Open questions for the next quarter: how representative are the follow-up responders, and is the savings effect sustained at six and twelve months. A decision to expand to additional counties should not be made on this evidence alone.*

**What the learner should notice.** The rewrite is longer and reads less like a closing executive summary. It is also far more useful. It tells the reader what the programme can fairly claim, what is still in question, and what would need to be true before scaling. A reader can act on the rewrite. A reader can only feel reassured by the original.

### Worked example 4: Better analytical brief with uncertainty language

**Scenario.** Joseph runs a three-person consultancy that supports small businesses in Kenya. A client, a chain of four bakeries, has asked: *should we open a fifth branch in Westlands within the next 12 months?* Joseph wants to use AI to help him structure an evidence-based brief drawing on three sources he gathered: foot-traffic estimates a friend at a property firm shared (informal), the client's own monthly sales data for the four current branches, and a 2024 industry report on Nairobi quick-service food trends.

**The brief, fully populated.**

> ***Question.*** Should the client open a fifth bakery in Westlands within the next 12 months?
>
> ***Scope.*** Time horizon: 12 months. Geography: Westlands, Nairobi. Population: walk-in retail customers and small office orders. Out of scope: wholesale/B2B orders, online delivery beyond Westlands, capital structure for the new branch.
>
> ***Evidence summary.***
>
> - *Source 1 — informal foot-traffic estimate from a property firm contact (March 2026).* Estimates 4,000–6,000 daytime pedestrians on the target stretch on weekdays. Source is informal; no methodology shared.
> - *Source 2 — client's own monthly sales data for four current branches (Jan 2025 – Mar 2026).* Two branches (CBD, Kilimani) profitable and growing. One branch (Lavington) profitable but flat. One branch (Ngara) below break-even for the past four months.
> - *Source 3 — 2024 industry report on Nairobi quick-service food trends (published).* Reports growth in QSR demand in Westlands, Kilimani, Lavington, with rising rental costs as the main margin pressure. Survey-based, not transactional.
>
> ***Patterns.***
>
> - *Pattern A — Westlands is in a growth zone for QSR, supported by Sources 1 and 3.* Confidence: moderate. Source 1 is informal; Source 3 is a survey at industry level rather than at the client's price point.
> - *Pattern B — The client's profitable branches are in similar urban-core areas (CBD, Kilimani, Lavington).* Confidence: reasonable, drawn from Source 2 directly. Westlands fits this pattern.
> - *Pattern C — One existing branch (Ngara) is underperforming.* Confidence: high, from Source 2. The cause is not yet known; it could be siting, product mix, competition, or operational.
>
> ***Disagreements.*** None outright between sources, but Source 3's emphasis on rising rental costs sits uneasily with Source 1's bullish foot-traffic estimate. A high-traffic location with rapidly rising rent can produce a busy but unprofitable branch.
>
> ***Open questions.***
>
> - Why is the Ngara branch underperforming? *Until that is answered, opening a fifth branch is opening a fifth chance to repeat the same problem.*
> - What is the realistic rent for the target Westlands location, and at what monthly sales volume does it break even? *Source 1 does not say, Source 3 says rent is rising but not by how much.*
> - What is the operational capacity of the existing team to support a fifth branch? *Not addressed in any source.*
>
> ***Confidence level.*** Moderate-to-low for a "yes" recommendation in the next 12 months. The Westlands fit is plausible. The internal readiness is not yet established. A diagnostic on the Ngara branch should come before a decision to expand.
>
> ***Recommended next step (not a finding).*** Spend the next four to six weeks on (1) a Ngara performance diagnostic, (2) a confirmed rent quote for the Westlands site, and (3) a rough operational-capacity check. Re-examine the question with that data.

**What the learner should notice.** The brief is short. Every claim is tied to a source. Every pattern has a confidence level. The disagreement is named. The open questions are listed in the brief itself, not buried. The recommendation is labelled as a next step rather than a finding. A client reading this brief understands what is known, what is uncertain, and what needs to happen before the decision should be made. That is the standard for an evidence-based synthesis brief in this module.

## Supplied practice activity materials

### Practice activity 1 — Source-to-theme map (25-30 minutes)

Below are four short source excerpts. They are about whether smartphone penetration has changed cash-flow management practices among small traders in Kenya. Produce a theme map: list the themes you see, indicate which sources support each theme (by letter), and note any source that disagrees or is silent. The map must be traceable — for each theme, name the phrase or claim from the source that justifies including the source in the cluster.

**Source A — paraphrased excerpt from a 2025 fintech research note.**
> *In a survey of 1,200 small traders in five Kenyan towns, 78% said mobile money is now their primary daily transaction channel, up from 62% in 2021. Among traders using mobile money daily, 41% report using a separate till float and personal account, 34% report mixing the two, and the remainder do not separate.*

**Source B — quote from a 2024 interview with a Nairobi market vendor (paraphrased and de-identified).**
> *"I send everything to my main number. I do not have time to track which money is the shop and which money is mine. At the end of the week I see what is left."*

**Source C — paraphrased excerpt from a 2023 NGO field report on small-business financial literacy.**
> *Vendors who attended the training and adopted a separate till number reported clearer cash-flow visibility within three months. Adoption among trained vendors was 53%; vendors who did not attend training rarely adopted separately voluntarily.*

**Source D — paraphrased editorial in a business weekly, 2024.**
> *The mobile-money revolution has put the entire economy on a phone. Cash-flow discipline is no longer a question of bookkeeping — it is a question of how a trader uses their till, their wallet, and their savings number.*

Produce the theme map as a short table or list. Do not invent a theme that does not appear in the sources. Mark anything that is in only one source as a single-source observation, not a shared theme.

### Practice activity 2 — Question framing rewrite (20 minutes)

Each of the five vague research questions below is too broad to answer well. Rewrite each into a scope-limited, answerable form. For each rewrite, name the time, geography, population, and depth boundary you applied.

1. *Is AI good for small businesses?*
2. *What do customers think about our service?*
3. *How is the economy doing?*
4. *Should we hire more staff?*
5. *Are remote teams effective?*

A good rewrite for question 1, for example, might read: *"Among Nairobi-based small retail businesses with one to ten employees, what specific tasks have owners reported using AI tools for in the past 12 months, and where have they reported the largest time savings?"* Notice the scope: time (12 months), geography (Nairobi), population (small retail, 1–10 employees), depth (specific tasks and reported time savings, not "good or bad").

### Practice activity 3 — Compare-and-contrast brief (30-35 minutes)

You have three short source excerpts on a single question: *do four-day work weeks work for small Kenyan service businesses?* Produce a compare-and-contrast brief. The brief should have four parts: shared themes, disagreements, single-source observations, and uncertainty notes.

**Source A — paraphrased trial summary from a Nairobi marketing agency, 2024.**
> *We trialled a four-day work week for six months, with no salary reduction. Revenue held steady. Staff reported lower fatigue. Client response time slipped on Mondays for the first two months, then recovered. We are continuing.*

**Source B — paraphrased internal memo from a Mombasa accounting firm, 2025.**
> *We attempted a four-day pattern during low season. It worked while client volume was low. When tax filing season started, we abandoned it; deadlines could not be met. We may try again with a rolling-day model.*

**Source C — paraphrased commentary from a 2024 industry article.**
> *The four-day week is a luxury of the well-staffed. For a small business with three or four employees, removing one day in five removes 20% of capacity. The maths works only if productivity rises by enough to compensate, and most small firms cannot run that experiment safely.*

Your brief should not exceed half a page. Resist the temptation to produce a single conclusion. The honest output here is a structured comparison, not a verdict.

### Practice activity 4 — Uncertainty labelling exercise (20-25 minutes)

Below is an AI-generated analysis paragraph. Label every claim in the paragraph as one of *known*, *needs verification*, *assumption*, or *open question*. Mark each label inline next to the claim. After labelling, rewrite the paragraph using the labels as a guide, replacing overconfident phrasing with appropriate uncertainty language where needed.

**Paragraph to label.**

> *The new e-commerce platform is performing strongly. Sales have increased significantly since launch, and customer satisfaction is high. The mobile-first design is the main reason for this success, and competitors will likely adopt similar designs in the next 12 months. Most customers are now from outside the original target region, which suggests the platform is ready for international expansion. The pricing model is well-calibrated and should not be changed. Investment in marketing should double next quarter to capture the momentum.*

You will probably find that the paragraph contains no *known* claims at all, depending on what evidence is in front of you. That, on its own, is the lesson of this exercise.

## Pause and check

Before moving on, ask yourself:

- Can I name the eight steps of the research-assist workflow without looking back, and explain why step 4 (summarise each source separately) comes before step 5 (compare and cluster)?
- Looking at the last AI summary I produced or read, can I tie each major claim to a source — and if not, which claims are floating?
- Can I write a sentence that uses uncertainty language honestly: not hedging, not overstating, but matching the language to what the evidence actually supports?

If any answer is no, return to the relevant section. The first question is the workflow itself; the second is the evidence-trail discipline; the third is the writing habit that turns a fluent paragraph into a trustworthy one.

## Knowledge-to-output task

Produce three artifacts that together form a single deliverable.

**Artifact 1 — Research Scope Brief.** A one-page document that names the question you are investigating, the four scope boundaries (time, geography, population, depth), what is deliberately out of scope, and the source list you will work from. Use a real question from your work, study, business, or community. The question can be small. *"Should our team move our weekly status meeting from Mondays to Wednesdays?"* is a fine question; *"What is the future of work?"* is not. Choose a question whose sources you can actually access in two or three hours.

**Artifact 2 — Source Comparison Grid.** A table covering at least three sources for the question above. The columns must include: source identifier (name or short title, type, date), summary (two to four sentences in your own words, written from the source), key claims relevant to the question, evidence type (study, internal data, interview, anecdote, opinion), and confidence note (a single sentence on how much weight this source carries on its own). Do not paste the raw source into the AI if it contains Tier 3 or Tier 4 content; write the summary yourself first (Module 10).

**Artifact 3 — Evidence-Based Synthesis Brief.** A brief of roughly 400–600 words structured as: question, scope, evidence summary, patterns, disagreements, open questions, confidence level, recommended next step. Each pattern must trace to at least one source from your grid. Use uncertainty language inside the brief, not only in a closing limitations note. End with a short *human review notes* paragraph describing what you accepted from any AI assistance, what you changed, and what you flagged as still uncertain.

A self-check before submitting: pick any sentence in the synthesis brief at random. Can you point to the row in the source comparison grid that supports it, and from that row to the source itself? If the chain breaks anywhere, fix the brief — do not ship it as it stands.

## Checkpoint quiz

Eight questions. Pass threshold: 80% (seven correct or, for short-answer and application items, demonstrating the strong-answer criteria below).

**1. (Multiple choice — research-assist workflow.)** In the research-assist workflow taught in this module, which step comes immediately *before* "compare and cluster themes"?
a) Define the question
b) Set the scope
c) Summarise each source separately
d) Draft synthesis

**2. (Multiple choice — synthesis versus proof.)** Which of the following statements is most accurate?
a) An AI-generated synthesis is proof of a conclusion if the synthesis cites sources.
b) An AI-generated synthesis is a structured first reading; the human still owes an evidence trail and a review.
c) An AI-generated synthesis becomes proof if it is reviewed once for grammar and tone.
d) An AI-generated synthesis is proof when the AI states its confidence level.

**3. (Scenario — uncertainty labelling.)** A draft brief contains the sentence: *"The new pricing model has clearly improved customer retention."* The only evidence in the source list is one month of internal data showing a 6% rise in repeat purchases compared with the previous month. Which uncertainty label fits the claim, and how should the sentence be rewritten?

**4. (Scenario — source-aware prompting.)** You are about to ask an AI to compare three short articles on whether mobile-banking adoption has changed savings behaviour. One article is a peer-reviewed study, one is a news report, and one is an opinion column. Write the prompt you would send. Your prompt must (a) name the source types, (b) specify what kind of output you want, and (c) include at least one constraint that prevents the AI from inventing detail not in the sources.

**5. (Multiple choice — detecting overclaiming.)** Which of the following is the strongest signal that an AI-generated paragraph is overclaiming relative to its evidence?
a) The paragraph uses bullet points rather than prose.
b) The paragraph contains a fluent generalisation that none of the sources individually supports.
c) The paragraph is longer than the sources combined.
d) The paragraph cites the sources by date.

**6. (Short answer — evidence trail.)** In your own words, describe what an evidence trail is and the three links it should connect.

**7. (Scenario — privacy when using source material.)** You are preparing a research brief for your team on staff wellbeing. You have ten interview transcripts from colleagues, all of whom were promised confidentiality. You want to use AI to help cluster themes. Describe the safe workflow you would use, in three or four sentences. Reference the relevant tier from Module 10.

**8. (Application — producing a small synthesis brief.)** Take the three sources from Practice Activity 3 (the four-day work-week sources). In no more than 200 words, write a short synthesis covering: shared themes, the disagreement, the open questions, and a confidence level. Use uncertainty language. Do not produce a verdict.

## Answer key with explanations

**1.** *Correct: c) Summarise each source separately.* The reason this order matters is that comparing sources before summarising them lets the AI flatten the differences between the sources. A separate summary preserves what each source actually said in its own voice; only after that is comparison meaningful.

**2.** *Correct: b).* A synthesis is a structured reading — useful, but not the same as a proven claim. Sources cited in a synthesis still need to be checked individually, and the human owns the evidence trail. Options a, c, and d each treat a property of the AI's output (citation, tone, confidence statement) as if it were equivalent to verification, which it is not.

**3.** *Label: needs verification (some learners may also accept "single-source observation," which is fine if explained).* The claim "clearly improved customer retention" is too strong for one month of internal data showing a 6% lift. Strong-answer criteria for the rewrite: the rewrite reduces the strength of the claim, names the data scope (one month, internal), and either asks the open question (sustained over time?) or names what would be needed to upgrade the label. Example rewrite: *"Internal data for the first month after launch shows a 6% rise in repeat purchases compared with the previous month. This is an early signal; sustained effect over three to six months has not yet been measured."*

**4.** *Strong-answer criteria.* The prompt should (a) explicitly identify the three source types, e.g. *"Source A is a peer-reviewed 2023 study; Source B is a 2024 news report; Source C is a 2024 opinion column;"* (b) specify the output, e.g. *"a comparison table or short paragraphs covering shared themes, points of disagreement, and single-source observations;"* and (c) include at least one constraint such as *"do not introduce findings that are not in any of the three sources, do not add citations from outside, do not infer claims from general knowledge."* Bonus: asks for source-of-claim attribution inside the output.

**5.** *Correct: b).* Length, format, and citation are not by themselves signals of overclaiming. A fluent generalisation that no individual source supports — *"all sources agree that…"* when only one does — is the classic flattening signature.

**6.** *Strong-answer criteria.* The answer names the three links: a claim in the synthesis, the source summary that supports the claim, and the source itself. The answer also notes that the trail should be reviewable — a careful reader should be able to walk from claim to source in under a minute. Bonus: notes that the trail is also the protection against AI fabrication, since a claim with no source summary behind it is a claim the AI generated from general knowledge.

**7.** *Strong-answer criteria.* The answer recognises the transcripts as Tier 3 content (confidential, identifying through context, content potentially sensitive). It states explicitly that the raw transcripts do not go into the AI tool. It describes a safe workflow in which the learner produces de-identified, abstracted summaries of each interview themselves, and the AI works only from those abstractions. It includes a re-identification check at the end (*could a colleague who knows the team identify any contributor from the wording?*). Bonus: notes that even with abstraction, the brief itself should not include direct quotes that re-identify a contributor.

**8.** *Strong-answer criteria.* The synthesis (a) does not produce a verdict; (b) names at least one shared theme — typically that the four-day pattern can hold under low or moderate workload; (c) names the disagreement — Source C's structural argument that small firms cannot afford the capacity loss versus Sources A and B's mixed positive experience; (d) names at least two open questions — sustainability beyond a six-month trial, behaviour during high-load periods (e.g. tax season), and applicability to the smallest firms; (e) states an explicit, low-to-moderate confidence level; and (f) uses uncertainty language inside the brief rather than only at the end. A 200-word brief that closes with *"the four-day week works"* or *"the four-day week does not work"* fails this question regardless of how well the rest reads.

## Portfolio artifact

**Artifact:** *Research Scope Brief + Source Comparison Grid + Evidence-Based Synthesis Brief* (the three artifacts from the knowledge-to-output task, combined into one deliverable).

**Required filename:** `Module11_Research_Synthesis_Brief_[YourName].pdf` or `Module11_Research_Synthesis_Brief_[YourName].docx` (substitute your real name in the bracketed field; do not include the brackets in the actual filename).

**Required contents.**

- Research question (one sentence).
- Scope boundary (time, geography, population, depth, plus "out of scope").
- Source list (at least three sources with type and date).
- Source comparison grid (table with the columns described in the knowledge-to-output task).
- Theme map (short, drawn from the grid; explicitly notes single-source observations and any disagreements).
- Uncertainty labels visible in the synthesis itself, not buried.
- Synthesis brief (400–600 words, structured as: question, scope, evidence summary, patterns, disagreements, open questions, confidence level, recommended next step).
- Human review notes (one short paragraph: what AI assistance was used, what you changed, what you flagged as still uncertain).
- Disclosure note if AI was used (use the Course1_Disclosure_Note format; one sentence is enough if the use was light).

**Acceptance criterion you can self-check against.** Pick three sentences from the synthesis brief. For each, you should be able to point to (1) the row in the source comparison grid it draws from and (2) the original source the row was built from. If any of the three breaks the chain, the brief is not ready.

**Pathway connection.** This artifact is direct, usable evidence for the *AI Productivity Professional* and *Small Business and Entrepreneurship* pathways, where research and synthesis on a defined question — done responsibly, with uncertainty labelled honestly — is recognisable work product. It also strengthens the *Digital Work Starter* portfolio, where employers want to see that a junior team member can read, compare, and summarise sources without overclaiming.

## Capstone-save reminder

Save this artifact in `Jifunze_AI_Essentials_Portfolio/Module_11/` using the filename pattern above. The synthesis brief and source comparison grid will be referenced again in three places.

In Module 12, the workflow you used to produce the brief — define question, set scope, summarise, compare, mark uncertainty, draft, review trail — becomes a candidate workflow to document and possibly automate. The same eight steps that you ran by hand here will be examined as a process worth standardising.

In Module 13, the synthesis brief will be reused as input to a decision-support exercise. A research brief that ends in *"recommended next step"* is exactly the input that a decision memo turns into a defensible choice. If your synthesis brief here is honest about confidence, the Module 13 decision memo will be honest about risk.

In Module 15, the prompts you used in steps 4, 5, and 7 of the workflow (separate-source summary, theme comparison, draft synthesis) are strong candidates for inclusion in your prompt pack. Save them with their inputs and outputs so you can lift them directly into the Module 15 artifact rather than rewriting them.

In Module 16 (Capstone), the full Research Scope Brief + Source Comparison Grid + Evidence-Based Synthesis Brief is one of the named portfolio components for the end-to-end AI-supported workflow demonstration. Save the file now under the correct name; do not leave it for capstone week.

## Module completion evidence

You have completed Module 11 meaningfully when:

- You can describe the eight-step research-assist workflow without looking back at this module, and you can explain in your own words why summarising each source separately must come before comparing them.
- You have produced the three-part portfolio artifact and saved it under the required filename.
- Every claim in your synthesis brief traces to a row in your source comparison grid, and every row traces to a real source.
- Your synthesis brief uses uncertainty language inside the brief, not only in a closing limitations note, and includes at least one explicitly named open question.
- You scored at least 80% on the checkpoint quiz, and your scenario and application answers meet the strong-answer criteria above.
- The disclosure note describes any AI assistance you used, and the human review notes describe what you accepted, changed, and flagged as still uncertain.
- No source containing Tier 3 or Tier 4 content (Module 10) was pasted into an AI tool in raw form.

## Revision guidance

If you struggled with this module, the failure mode is usually one of six. Each one has a specific section to revisit.

*Your question is too broad.* Return to the *Define the question* and *Set the scope* parts of the core lesson, and redo Practice Activity 2 (question framing rewrite). A topic produces a wandering brief; a question produces a focused one.

*You summarised but did not compare.* You probably skipped step 4 or step 5 in the workflow. Re-read *The research-assist workflow*, with attention to why separate summaries come before comparison. Then redo Practice Activity 1 with a stricter discipline: do the summaries individually before you look across them.

*You made claims without evidence.* Return to the *Evidence trails* section of the core lesson and redo the evidence-trail review (step 8) on your own brief. For each claim, point to the source summary and source. The claims that do not trace either find a source or get softened to assumption.

*You ignored uncertainty.* Re-read *Uncertainty language* in the core lesson and redo Practice Activity 4 (uncertainty labelling). Then go back to your own synthesis brief and label each sentence as known, needs verification, assumption, or open question. Where the label is anything other than known, the language should reflect that — inside the brief, not in a footnote.

*Your brief sounds fluent but unsupported.* This is the hardest failure to see in your own work, because fluency feels like quality. Return to Worked example 3 (*Weak synthesis that sounds stronger than the evidence*) and read both versions side by side. Then read your own brief paragraph by paragraph and ask: where does each sentence's confidence come from? If the answer is "the sentence sounds confident," not "this source supports it," soften the language.

*You exposed sensitive source material unnecessarily.* This is the most serious failure mode and the one with consequences beyond the module. Return to Module 10's minimum-necessary test and the four-tier classification, then re-read the *Privacy discipline in research workflows* part of the core lesson here. The fix is structural: the AI works from your abstractions, not from raw sources. Rebuild the workflow so step zero is *"classify and abstract before any AI involvement,"* not *"paste and tidy up afterwards."*

## Transition to the next module

Module 11 helped you turn sources into careful synthesis. You learned to scope a question, summarise sources separately, compare them without flattening their differences, mark uncertainty honestly, and write a brief that ties claims back to evidence. You learned to do all of this without exposing sensitive source material to the tools you used.

Module 12 takes the next step. Once you have done the same kind of research-and-synthesis task two or three times, you start to notice it has a shape — the same eight steps, the same kinds of inputs, the same kinds of decisions about what to summarise and what to omit. Module 12 turns repeated tasks like this one into workflows, automation plans, and agent-aware processes that remain reviewable and safe. It teaches you when standardising a workflow is the right move, what an AI-assisted workflow should and should not include, and how to keep human review in the loop when the tools start to act on their own.

## Notes for Cursor mapping

**Suggested module id:** `ae-m11`

**Suggested session/block breakdown.** Map the module into eight platform lesson blocks rather than trying to render the whole document as a single unit:

1. *Overview block* — Continuity bridge from Module 10 + What was wrong before + What was improved + Estimated time + Module purpose + Learner outcomes.
2. *Concept block* — Core lesson, in two sub-blocks if the platform supports nested blocks. Sub-block A: synthesis vs proof + the eight-step workflow (steps 1–4). Sub-block B: source-aware prompting + evidence trails + uncertainty language + theme comparison and flattening + avoiding overconfident analysis + privacy discipline.
3. *Guided example block* — The four worked examples. Worked examples 1 and 2 demonstrate comparison and clustering; 3 and 4 demonstrate weak vs strong synthesis. Each example renders cleanly as its own collapsible card.
4. *Practice block* — The four practice activities, each as its own task card with the supplied source material embedded. Activities 1 and 4 are short-answer/labelling; activities 2 and 3 are open-response brief writing.
5. *Reflection block* — The Pause and check questions. Render as three separate reflection prompts the learner can answer in-line.
6. *Checkpoint block* — The eight checkpoint questions, mapped per the quiz mapping notes below.
7. *Artifact upload block* — The Research Scope Brief + Source Comparison Grid + Evidence-Based Synthesis Brief. Single combined upload (.pdf or .docx) using the required filename pattern.
8. *Remediation block* — The Revision guidance section, with each failure mode rendered as a clickable card that links back to the relevant section of the concept and guided-example blocks.

**Likely content block types.** Text/markdown for the concept, examples, and reflection blocks. Card-style components for worked examples and practice activities, with embedded source excerpts as quoted-text components. Tabular component for the Source Comparison Grid template (offered to the learner in the artifact upload block as an optional starting structure). Interactive labelling component for Practice Activity 4 and Checkpoint Question 3, if available; otherwise free-text input with a rubric-checked answer.

**Quiz mapping notes.** Questions 1, 2, and 5 are multiple-choice with a single correct answer (auto-checkable). Questions 3 and 7 are scenario short-answer items; render as free-text with the strong-answer criteria from the answer key as the rubric. Question 4 is an applied prompt-construction item; render as free-text with a three-part rubric (source-type identification, output specification, anti-fabrication constraint). Question 6 is a short-answer definitional item; render as free-text with rubric. Question 8 is the application item that produces a 200-word synthesis; render as free-text with the six-criterion rubric. Pass threshold: 80%, with auto-graded items contributing to the score and rubric-graded items either self-assessed against the answer key or facilitator-assessed depending on the deployment mode.

**Portfolio artifact mapping notes.** Single combined artifact, three internal sections. Filename pattern: `Module11_Research_Synthesis_Brief_[YourName].pdf` or `.docx`. Acceptable formats: .pdf, .docx, .md. The acceptance criterion (three random sentences traceable through the grid to source) is suitable for self-check; for facilitator review, it converts directly into a three-item checklist. Connect the artifact record forward to Module 12 (workflow standardisation), Module 13 (decision memo input), Module 15 (prompt pack), and Module 16 (capstone).

**Special UI needs.** None beyond what the platform already supports. The worked examples benefit from side-by-side rendering of *first attempt* and *corrected review* (Worked examples 1 and 2) and *overconfident paragraph* and *rewritten paragraph* (Worked example 3). Where side-by-side is not available, sequential rendering with clear sub-headings is sufficient. The supplied source excerpts in Practice Activities 1 and 3 should render in a quoted-text format distinct from the activity instructions.

**Single-file mapping.** This module should be mapped as one improved file: `Jifunze_Course1_Module_11_Improved.md`.
