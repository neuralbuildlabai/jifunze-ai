const STORAGE_KEY = 'jifunze.teachingLabDrafts.v1'

export type TeachingLabDraftMap = Record<string, Record<string, string>>

export function readTeachingLabDrafts(): TeachingLabDraftMap {
  if (typeof window === 'undefined') return {}
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    const parsed = JSON.parse(raw ?? '{}') as TeachingLabDraftMap
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function writeTeachingLabDraft(labId: string, fieldId: string, value: string): void {
  if (typeof window === 'undefined') return
  try {
    const prev = readTeachingLabDrafts()
    const nextLab = { ...(prev[labId] ?? {}), [fieldId]: value }
    const next = { ...prev, [labId]: nextLab }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    window.dispatchEvent(new Event('jifunze-teaching-lab-drafts-updated'))
  } catch {
    // quota / privacy mode
  }
}

export function clearTeachingLabDraft(labId: string): void {
  if (typeof window === 'undefined') return
  try {
    const prev = readTeachingLabDrafts()
    const next = { ...prev }
    delete next[labId]
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    window.dispatchEvent(new Event('jifunze-teaching-lab-drafts-updated'))
  } catch {
    // ignore
  }
}
