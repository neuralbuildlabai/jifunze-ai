/* eslint-disable react-refresh/only-export-components -- provider + hook module */
import { createContext, useContext, type ReactNode } from 'react'
import { useWorkspaceGeneratorModel, type WorkspaceViewState } from './useWorkspaceGeneratorModel'

type WorkspaceGeneratorValue = ReturnType<typeof useWorkspaceGeneratorModel>

const WorkspaceGeneratorContext = createContext<WorkspaceGeneratorValue | null>(null)

export function WorkspaceGeneratorProvider({ children }: { children: ReactNode }) {
  const value = useWorkspaceGeneratorModel()
  return (
    <WorkspaceGeneratorContext.Provider value={value}>{children}</WorkspaceGeneratorContext.Provider>
  )
}

export function useWorkspaceGenerator(): WorkspaceGeneratorValue {
  const ctx = useContext(WorkspaceGeneratorContext)
  if (!ctx) {
    throw new Error('useWorkspaceGenerator must be used within WorkspaceGeneratorProvider')
  }
  return ctx
}

export function useWorkspaceGeneratorReady(): WorkspaceGeneratorValue & { viewState: { kind: 'ready' } } {
  const ctx = useWorkspaceGenerator()
  if (ctx.viewState.kind !== 'ready') {
    throw new Error('Workspace generator is not ready')
  }
  return ctx as WorkspaceGeneratorValue & { viewState: { kind: 'ready' } }
}

export type { WorkspaceViewState }
