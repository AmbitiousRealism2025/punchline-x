import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useScore } from '@/hooks/useScore'
import { cn } from '@/lib/utils'

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
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Score Breakdown</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setExpanded(!expanded)}
            className="text-muted-foreground hover:text-foreground"
          >
            {expanded ? 'Collapse' : 'Expand'}
          </Button>
        </div>
      </CardHeader>
      {expanded && (
        <CardContent className="pt-0">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{categoryLabels.base}</span>
              <span className="font-medium tabular-nums">+{breakdown.base}</span>
            </div>
            {entries.map(([key, value]) => (
              <div key={key} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{categoryLabels[key]}</span>
                <span
                  className={cn(
                    'font-medium tabular-nums',
                    value > 0 && 'text-emerald-400',
                    value < 0 && 'text-red-400',
                    value === 0 && 'text-muted-foreground'
                  )}
                >
                  {value > 0 ? `+${value}` : value}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  )
}
