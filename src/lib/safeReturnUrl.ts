/**
 * Same-origin path-only return URLs after auth (prevents open redirects).
 */
export function safeReturnUrl(raw: string | null | undefined): string | null {
  if (!raw) return null
  try {
    const decoded = decodeURIComponent(raw.trim())
    if (!decoded.startsWith('/')) return null
    if (decoded.startsWith('//')) return null
    if (decoded.includes('://')) return null
    return decoded
  } catch {
    return null
  }
}
