import { Outlet } from 'react-router-dom'
import { useAppAccess } from '../../access/useAppAccess'
import { WorkspaceGeneratorProvider } from '../../workspace/WorkspaceGeneratorContext'
import { LearnerHelpAssistant } from '../teaching/LearnerHelpAssistant'
import { WorkspaceNav } from './WorkspaceNav'

export function WorkspaceShell() {
  const { navVariant } = useAppAccess()
  const workspaceBlurb =
    navVariant === 'learner'
      ? 'Structured courses, pathways, progress, and reports—your account tools stay under Settings.'
      : 'Continue courses, manage your workspace, and open account tools from here.'

  return (
    <WorkspaceGeneratorProvider>
      <div className="min-h-screen w-full bg-[radial-gradient(ellipse_120%_80%_at_50%_-15%,rgba(255,255,255,0.06),transparent_55%),linear-gradient(180deg,_#0c0c0f_0%,_#09090b_52%,_#070709_100%)] text-zinc-100">
        <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-8 sm:pb-20 sm:pt-10">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-6">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-zinc-500">
                Jifunze.AI workspace
              </p>
              <p className="mt-1 text-sm text-zinc-400">{workspaceBlurb}</p>
            </div>
            <WorkspaceNav className="justify-end" />
          </div>
          <Outlet />
        </div>
        <LearnerHelpAssistant />
      </div>
    </WorkspaceGeneratorProvider>
  )
}
