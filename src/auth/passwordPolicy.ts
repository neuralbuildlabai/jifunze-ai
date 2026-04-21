/**
 * Client-side minimum — Supabase may enforce stricter rules server-side.
 * Longer, mixed passwords are encouraged in copy, not as a hard minimum.
 */

export const PASSWORD_MIN_LENGTH = 6

export function passwordPolicyHint(): string {
  return `At least ${PASSWORD_MIN_LENGTH} characters. For a stronger account, use 12+ characters with mixed letters and numbers.`
}

export function passwordMeetsPolicy(password: string): boolean {
  return password.length >= PASSWORD_MIN_LENGTH
}

export function passwordPolicyErrorMessage(password: string): string | null {
  if (passwordMeetsPolicy(password)) return null
  return `Use at least ${PASSWORD_MIN_LENGTH} characters.`
}
