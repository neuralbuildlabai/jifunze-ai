import { useAppAccess } from '../../access/useAppAccess'
import { LearnerAppShell } from '../learner-shell/LearnerAppShell'
import { WorkspaceShell } from '../workspace/WorkspaceShell'

/**
 * Picks learner (catalog / My Learning) chrome vs operator workspace chrome for the same route paths.
 */
export function SignedInSurfacesOutlet() {
  const { navVariant } = useAppAccess()
  if (navVariant === 'learner') {
    return <LearnerAppShell />
  }
  return <WorkspaceShell />
}
