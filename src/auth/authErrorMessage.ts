/**
 * Surfaces useful text for Supabase Auth / PostgREST failures where the browser often only shows
 * `Failed to fetch` (TLS, DNS, CORS, mixed content, offline, wrong project URL, etc.).
 */
export function authFailureMessage(err: unknown): string {
  const parts: string[] = []

  if (typeof err === 'object' && err !== null && 'message' in err) {
    const m = (err as { message: unknown }).message
    if (typeof m === 'string' && m.trim().length > 0) parts.push(m.trim())
  } else if (err instanceof Error && err.message.trim().length > 0) {
    parts.push(err.message.trim())
  }

  if (err instanceof Error) {
    if (err.name && err.name !== 'Error') parts.unshift(`[${err.name}]`)
    if (err.cause != null) parts.push(`Cause: ${String(err.cause)}`)
    if (typeof (err as Error & { status?: number }).status === 'number') {
      parts.push(`HTTP ${(err as Error & { status: number }).status}`)
    }
  }

  const msg = parts.join(' · ')
  if (!msg) return 'Authentication failed.'

  if (/failed to fetch/i.test(msg)) {
    return `${msg} · Check VITE_SUPABASE_URL (https, correct host), browser network tab, CORS / mixed content, VPN, and that the Supabase project is not paused.`
  }

  return msg
}
