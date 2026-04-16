import { useEffect, useMemo } from 'react'
import { AuthProvider, useAuth } from './auth/AuthContext'
import { ContentGenerator } from './components/ContentGenerator'
import { InternalUatDiagnostics } from './components/InternalUatDiagnostics'
import { SystemStatusBanner } from './components/SystemStatusBanner'
import { logEnvValidationFailure, validateStartupEnv } from './lib/envCheck'
import type { EnvCheckResult } from './lib/envCheck'

function AppChrome({ env }: { env: EnvCheckResult }) {
  const { user } = useAuth()
  return (
    <div className="sticky top-0 z-50">
      <SystemStatusBanner env={env} />
      <InternalUatDiagnostics key={user?.id ?? 'guest'} />
    </div>
  )
}

export default function App() {
  const env = useMemo(() => validateStartupEnv(), [])
  useEffect(() => {
    if (!env.ok) logEnvValidationFailure(env)
  }, [env])

  return (
    <AuthProvider>
      <AppChrome env={env} />
      <div className="min-h-screen w-full bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/25 via-zinc-950 to-zinc-950 px-4 py-12 text-zinc-100">
        <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-2xl items-center justify-center">
          <ContentGenerator />
        </div>
      </div>
    </AuthProvider>
  )
}
