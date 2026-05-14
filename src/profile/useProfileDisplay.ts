import { useContext } from 'react'
import { ProfileDisplayContext } from './profileDisplayContext'

export function useProfileDisplay() {
  const ctx = useContext(ProfileDisplayContext)
  if (!ctx) {
    throw new Error('useProfileDisplay must be used within ProfileDisplayProvider')
  }
  return ctx
}
