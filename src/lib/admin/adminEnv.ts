export type AdminHealthStatus = 'healthy' | 'warning' | 'critical' | 'unknown' | 'info'

export type AdminHealthCheck = {
  status: AdminHealthStatus
  label: string
  description: string
  evidence?: string
  remediation?: string
  lastCheckedAt?: string
}

export type AdminAppEnvironment = 'production' | 'preview' | 'development'

export function getAdminAppEnvironment(): AdminAppEnvironment {
  if (import.meta.env.DEV) return 'development'
  const v = (import.meta.env as { VERCEL_ENV?: string }).VERCEL_ENV
  if (v === 'preview') return 'preview'
  return 'production'
}

export function adminEnvironmentLabel(): string {
  switch (getAdminAppEnvironment()) {
    case 'development':
      return 'Development'
    case 'preview':
      return 'Preview'
    default:
      return 'Production'
  }
}

export function adminBuildLabel(): string {
  const sha = import.meta.env.VITE_BUILD_SHA as string | undefined
  if (sha && sha.trim()) return sha.trim().slice(0, 12)
  return 'Unavailable'
}
