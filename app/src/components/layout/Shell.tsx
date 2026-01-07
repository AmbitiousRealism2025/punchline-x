import type { ReactNode } from 'react'

interface ShellProps {
  children: ReactNode
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-lg font-bold">P</span>
          </div>
          <h1 className="text-lg font-semibold text-foreground">
            Punchline X
          </h1>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-6 py-8">
        {children}
      </main>
    </div>
  )
}
