# Jifunze.ai Platform Architecture

## 1. Ownership and Purpose

Jifunze.ai is a learning, training, mastery, certification, and intellectual content platform owned and controlled by the project owner/company. The platform is designed to help learners progress from beginner to professional capability through structured courses, mastery learning, revision, practical outputs, capstones, and portfolio evidence.

This document is stored inside the source-code repository to preserve the product architecture, technical ownership record, and implementation intent alongside the application code.

## 2. Product Vision

Jifunze.ai is designed as a workspace-based learning platform for:

- Individual learners
- Teams
- Training programs
- Institutions
- Facilitators
- Schools
- Professionals
- Course creators
- Future institutional learning environments

The platform combines:

- Khan Academy-style mastery learning
- Course progression
- Practical exercises
- Quizzes
- Revision
- Remediation
- Capstone projects
- Learner portfolio artifacts
- Knowledge-to-content creation
- Employable pathways
- Future autonomous content/social learning support

Product promise:

```text
Deep learning plus smart intellectual content creation from one shared knowledge engine.
3. Core Platform Areas

The platform is organized around the following major areas:

Public landing page
Learning discovery hub
Course detail pages
Module detail pages
Session player
Practice and revision flows
Quiz and mastery checks
Capstone readiness
Learner progress tracking
Learner artifacts/portfolio
Certificates
Employable pathways
Admin/facilitator views
Course content data
Subscription/entitlement logic
Knowledge engine support
Future social content automation
4. High-Level Architecture
Learner Browser
    |
    v
Vite React Frontend
    |
    |-- Public landing page
    |-- Course discovery
    |-- Course detail pages
    |-- Module detail pages
    |-- Session player
    |-- Practice/revision pages
    |-- Quiz flows
    |-- Capstone/certificate flows
    |-- Learner dashboard
    |
    v
Supabase Client Layer
    |
    |-- Auth
    |-- Postgres database
    |-- Row Level Security
    |-- Learner progress tables
    |-- Course artifacts
    |-- Entitlements
    |
    v
Learning Engine Logic
    |
    |-- Mastery rules
    |-- Progress merging
    |-- Module completion
    |-- Quiz scoring
    |-- Capstone readiness
    |-- Certificate eligibility
    |-- Knowledge-to-content support
5. Frontend Architecture

The frontend is built using:

Vite
React
TypeScript
Tailwind CSS
shadcn-style UI components
Supabase client SDK
Playwright for end-to-end testing
Vitest where applicable

The frontend is responsible for:

Rendering public and learner-facing pages
Presenting courses and pathways
Managing learning sessions
Displaying modules, lessons, examples, quizzes, revision, and capstones
Showing learner progress
Supporting certificate flows
Respecting entitlement and subscription rules
Avoiding exposure of private backend credentials

The frontend should maintain a warm, premium, learner-friendly visual style.

6. Backend Architecture

The backend is primarily Supabase-based:

Supabase Postgres is the system of record.
Supabase Auth manages learner/admin identity.
Row Level Security protects learner data.
Database tables track progress, artifacts, entitlements, and course state.
Vercel hosts the frontend application.
Future Supabase Edge Functions may support privileged learning, certificate, AI, and content operations.

Backend responsibilities include:

User identity
Learner progress persistence
Local/remote progress merge support
Course completion tracking
Module completion tracking
Quiz result storage
Learner artifact storage
Capstone readiness tracking
Certificate eligibility
Admin/facilitator access control
Subscription and entitlement state
7. Course Architecture

Jifunze.ai should support a maximum of 30 flagship courses.

Mini-courses, 30-minute trainings, workshops, short trainings, and skill boosters should not count as full flagship courses. They should be nested under larger flagship programs, schools, or pathways.

Course structure:

School
  |
  v
Flagship Course
  |
  v
Modules
  |
  v
Sessions
  |
  |-- Lesson
  |-- Practice
  |-- Revision
  |-- Recap
  |-- Reflection
  |-- Capstone preparation
  |
  v
Module Quiz
  |
  v
Capstone / Portfolio Output
  |
  v
Certificate / Completion Evidence
8. Mastery Learning Model

Jifunze.ai should emulate the strongest parts of the Khan Academy model:

Clear progression
Skill-by-skill learning
Practice before advancement
Revision loops
Mastery checks
Weak-area remediation
Learner continuity
Practical confidence building

Mastery should not be based only on watching or opening lessons.

A module should generally require:

Required sessions completed
Practice attempted
Quiz passed
Minimum mastery score met
Capstone or artifact evidence where applicable

Example rule:

A module is complete only when the learner has completed required sessions and passed the module quiz at the defined mastery threshold.
9. Learner Progress Architecture

Learner progress should support:

Anonymous/local progress where appropriate
Authenticated remote Supabase progress
Merge between local and remote progress
Module status
Session status
Quiz score
Revision status
Capstone readiness
Certificate eligibility

Progress should be durable and learner-specific.

No learner should be able to access or modify another learner’s private progress.

10. Learner Portfolio and Artifacts

Jifunze.ai should support learner portfolio artifacts.

Artifacts may include:

Saved exercises
Reflection responses
Capstone drafts
Completed project evidence
Study notes
Revision sheets
Work samples
Career-ready outputs
Downloadable resources
Certificate evidence

The platform should treat learner artifacts as proof of practical learning, not just passive course completion.

11. Employable Pathways

Jifunze.ai should prioritize employable pathways rather than simply adding many courses.

Employable pathways should connect learning to:

Jobs
Income
Business survival
Practical digital opportunity
Career-ready outputs
Portfolio evidence
Workplace skills
Professional development

Core pathway idea:

Learn skills. Build proof. Become employable.

Pathways may combine multiple courses, workshops, practical outputs, and capstone themes.

12. Schools and Course Cap

The platform should have at most 30 flagship courses across core schools.

Important schools/areas include:

AI and digital productivity
Business and entrepreneurship
Project management
Health informatics and healthcare IT
Management and leadership
Teaching, training, and facilitation
Mathematics and mastery learning
Career and employability skills
Communication and professional practice

The user’s partner has a PhD in project management, health informatics, and management and may lead courses in:

Project management
Health informatics
Healthcare IT
Management
Leadership
Related professional practice areas

Instructor credibility and ownership should be reflected without expanding beyond the 30-course cap.

13. Knowledge Engine Architecture

Jifunze.ai should be powered by one shared knowledge engine.

The knowledge engine should support:

Learning content
Learner remediation
Revision generation
Study notes
Recap materials
Guides
Briefs
Practice support
Intellectual content creation
Future team/facilitator insights
Privacy-safe learning analytics

The platform should avoid becoming a generic chatbot. AI support should be tied to the learner’s course, progress, and paid entitlement scope.

14. AI and Content Boundaries

AI support should:

Help learners understand deeply
Explain weak areas
Generate revision support
Help create learning outputs
Support practical application
Respect paid/free boundaries
Avoid leaking full paid course content to unauthorized users
Provide minimal snippets for out-of-scope or unpaid content
Redirect users to subscribe or enroll where needed
15. Subscription and Entitlement Architecture

The platform may support:

Free courses
Paid individual courses
All-access subscriptions
Annual subscriptions
Discount challenges
Institution/team plans
Per-course entitlement
Course/module gating
Device/session restrictions if needed

Entitlement rules must be enforced beyond frontend-only checks.

Frontend UI may hide locked content, but backend/database rules must protect paid learner data and private progress.

16. Certificate Architecture

Certificates should be issued based on measurable completion and mastery rules, not just page visits.

Certificate eligibility may depend on:

Required modules completed
Quiz thresholds passed
Final assessment score
Capstone completed
Artifact submitted
Minimum course completion percentage

Example standalone certificate rule:

Issue certificate when learner reaches at least 75% required score/completion threshold, depending on course design.
17. Admin and Facilitator Architecture

Admin/facilitator functionality may include:

Course management
Learner progress visibility
Institution/team views
Facilitator insights
Certificate verification
Content review
Learning analytics
Privacy-safe support views

Admin accounts must be role-protected.

Known admin access rule:

Super admin: neuralbuildlab.ai@gmail.com
Platform admin: neuralbuild.ai@gmail.com
18. Deployment Architecture

The platform uses:

GitHub for source control
Vercel for frontend deployment
Supabase for backend/database/auth/storage
Environment variables for deployment-specific configuration

Important environment rule:

Vite VITE_* variables are exposed to the browser and must only contain public-safe values.

Private secrets must stay in secure backend/server-side environments.

19. Maintenance Mode

The public homepage may currently show a maintenance shell.

Public homepage changes may not be visible until maintenance mode is bypassed or disabled.

Maintenance mode should support:

Safe public coming-soon page
Internal/test bypass where needed
Playwright/E2E bypass handling
Warm branded design
No leakage of unfinished platform internals
20. Security Model

Security priorities:

Private GitHub repo
GitHub 2FA
Supabase RLS for learner/admin data
No service-role keys in frontend code
Strict environment variable hygiene
Limited collaborator access
Admin role checks
Paid content gating
Certificate integrity
Progress data isolation
Institution/team data privacy
21. Evidence of Ownership

Ownership evidence should include:

Git commit history
GitHub organization ownership
Vercel deployment history
Supabase project ownership
Domain ownership
Architecture documents
Course blueprints
Course content files
Screenshots
PDFs
Test reports
Contributor agreements where applicable
22. Non-Negotiable Build Rules
Do not exceed 30 flagship courses.
Do not count 30-minute mini-courses as full flagship courses.
Do not water down course depth.
Do not mark modules complete from viewing alone.
Do not issue certificates without real completion/mastery evidence.
Do not expose paid course content through unrestricted chatbot answers.
Do not expose private keys in frontend code.
Do not rely only on frontend route guards for admin security.
Do not allow learner progress or artifacts to leak across users.
Do not treat Jifunze.ai as only a social media automation tool; it is primarily a learning and intellectual content platform.
23. Current Course Direction

Current known course/content areas include:

Practical Mathematics
AI Essentials
Smart Workflows with AI
Prompt Engineering Fundamentals
AI Agents Series
Project Management
Health Informatics
Management and Leadership
Teaching, Training, and Facilitation
Employable Pathways courses

The AI Agents Series and Prompt Engineering Fundamentals should not be treated as ready for upload until voiceovers and actual MP4 video assets are created and reviewed.

24. Future Roadmap

Planned/future platform capabilities include:

Full 30-course flagship blueprint
Mastery-based learning engine
Rich practical mathematics school
Teaching/training school
Partner-led professional courses
Institution/team learning mode
Knowledge-to-content creation
Learner portfolios
Capstone evidence
AI remediation
AI-generated revision sheets and study notes
Autonomous social media content creation for platform growth
Employable pathways linked to practical opportunity
25. Summary

Jifunze.ai is a mastery-based learning and intellectual content platform built with Vite, React, TypeScript, Supabase, and Vercel. It is designed to help learners understand deeply, improve weak areas, build practical outputs, and progress toward employable skills.

This architecture document should remain version-controlled with the codebase and updated whenever major platform decisions change.
