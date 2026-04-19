/**
 * Who may create team training assignments and read member progress (workspace-scoped).
 * Mirrors `public.user_is_workspace_training_manager` in Postgres (individual_user = solo workspace operator).
 */
export function isWorkspaceTrainingManagerRole(role: string | null | undefined): boolean {
  return role === 'team_admin' || role === 'individual_user'
}
