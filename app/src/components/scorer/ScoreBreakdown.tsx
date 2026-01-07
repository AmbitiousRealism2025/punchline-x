import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogTrigger } from '@/components/ui/dialog'
import { useScore } from '@/hooks/useScore'
import { cn } from '@/lib/utils'
import { InfoIcon } from 'lucide-react'
import { ExplanationCard } from './ExplanationCard'
import { getExplanation } from '@/lib/scoring/explanations'
import type { FactorId } from '@/lib/scoring/explanation-types'

const categoryLabels: Record<string, string> = {
  base: 'Base Score',
  media: 'Media',
  hook: 'Hook Strength',
  engagement: 'Engagement',
  timing: 'Timing',
  account: 'Account Status',
  quality: 'Content Quality',
}

export function ScoreBreakdown() {
  const [expanded, setExpanded] = useState(false)
  const { breakdown } = useScore()

  const entries = Object.entries(breakdown).filter(([key]) => key !== 'base')

  return (
    <Card className="raycast-shine">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <CardTitle className="text-sm sm:text-base">Score Breakdown</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-muted-foreground hover:text-foreground shrink-0"
          >
            {expanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="pt-0">
          <div className="space-y-2">
            <Dialog>
              <div className="flex items-center justify-between gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground truncate">{categoryLabels.base}</span>
                  <DialogTrigger asChild>
                    <button
                      className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm shrink-0"
                      aria-label={`Learn more about ${categoryLabels.base}`}
                    >
                      <InfoIcon className="size-4" />
                    </button>
                  </DialogTrigger>
                </div>
                <span className="font-medium tabular-nums shrink-0">+{breakdown.base}</span>
              </div>
              <ExplanationCard explanation={getExplanation('base')!} />
            </Dialog>
            {entries.map(([key, value]) => {
              const explanation = getExplanation(key as FactorId)
              if (!explanation) return null

              return (
                <Dialog key={key}>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground truncate">{categoryLabels[key]}</span>
                      <DialogTrigger asChild>
                        <button
                          className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 rounded-sm shrink-0"
                          aria-label={`Learn more about ${categoryLabels[key]}`}
                        >
                          <InfoIcon className="size-4" />
                        </button>
                      </DialogTrigger>
                    </div>
                    <span
                      className={cn(
                        'font-medium tabular-nums shrink-0',
                        value > 0 && 'text-emerald-400',
                        value < 0 && 'text-red-400',
                        value === 0 && 'text-muted-foreground'
                      )}
                    >
                      {value > 0 ? `+${value}` : value}
                    </span>
                  </div>
                  <ExplanationCard explanation={explanation} />
                </Dialog>
              )
            })}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
