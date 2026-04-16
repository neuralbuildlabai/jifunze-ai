/**
 * Structured logs for critical flows. Prefix: [JifunzeAI]
 */
export type JifunzeCriticalLog = {
  action: string
  userId?: string | null
  tenantId?: string | null
  brandProfileId?: string | null
  status: 'ok' | 'error' | 'started'
  error?: unknown
  detail?: unknown
  [key: string]: unknown
}

export function jifunzeCriticalLog(entry: JifunzeCriticalLog): void {
  const { action, userId, tenantId, brandProfileId, status, error, detail, ...rest } = entry
  const payload: Record<string, unknown> = {
    action,
    userId: userId ?? null,
    tenantId: tenantId ?? null,
    brandProfileId: brandProfileId ?? null,
    status,
  }
  if (error !== undefined) payload.error = error
  if (detail !== undefined) payload.detail = detail
  Object.assign(payload, rest)
  if (status === 'error') {
    console.error('[JifunzeAI]', payload)
  } else {
    console.log('[JifunzeAI]', payload)
  }
}
