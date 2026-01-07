import { Card, CardContent } from '@/components/ui/card'
import { useScore } from '@/hooks/useScore'
import { cn } from '@/lib/utils'
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

export function ScoreDisplay() {
  const { total, grade } = useScore()

  const circumference = 2 * Math.PI * 45
  const strokeDashoffset = circumference - (total / 100) * circumference

  return (
    <Card className="raycast-shine">
      <CardContent className="pt-6 flex flex-col items-center gap-4">
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
      </CardContent>
    </Card>
  )
}
