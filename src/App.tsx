import { ContentGenerator } from './components/ContentGenerator'

export default function App() {
  return (
    <div className="min-h-screen w-full bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800/25 via-zinc-950 to-zinc-950 px-4 py-12 text-zinc-100">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-2xl items-center justify-center">
        <ContentGenerator />
      </div>
    </div>
  )
}
