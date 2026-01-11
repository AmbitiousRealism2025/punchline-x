import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { useThreadScore } from '@/hooks/useThreadScore'
import type { Grade } from '@/lib/scoring'

const gradeColors: Record<Grade, string> = {
  excellent: 'text-emerald-400',
  good: 'text-lime-400',
  fair: 'text-yellow-400',
  poor: 'text-orange-400',
  critical: 'text-red-400',
}

const gradeLabels: Record<Grade, string> = {
  excellent: 'Excellent',
  good: 'Good',
  fair: 'Fair',
  poor: 'Needs Work',
  critical: 'Critical',
}

const gradeRingColors: Record<Grade, string> = {
  excellent: 'stroke-emerald-400',
  good: 'stroke-lime-400',
  fair: 'stroke-yellow-400',
  poor: 'stroke-orange-400',
  critical: 'stroke-red-400',
}

export function ThreadScoreDisplay() {
  const { total, grade, breakdown } = useThreadScore()
  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (total / 100) * circumference

  return (
    <Card className="raycast-shine">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Thread Score</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-secondary"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              strokeLinecap="round"
              className={cn(gradeRingColors[grade], 'transition-all duration-300')}
              style={{
                strokeDasharray: circumference,
                strokeDashoffset,
              }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={cn('text-4xl font-bold tabular-nums', gradeColors[grade])}>
              {total}
            </span>
          </div>
        </div>
        <span className={cn('text-sm font-medium', gradeColors[grade])}>
          {gradeLabels[grade]}
        </span>
        <div className="w-full pt-4 border-t border-border space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Avg Individual</span>
            <span className="text-foreground font-medium">{breakdown.averageIndividual.toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Flow Coherence</span>
            <span className="text-foreground font-medium">{breakdown.flowCoherence.toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Pacing</span>
            <span className="text-foreground font-medium">{breakdown.pacing.toFixed(0)}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Consistency</span>
            <span className="text-foreground font-medium">{breakdown.consistency.toFixed(0)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
