import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useThreadScore } from '@/hooks/useThreadScore'
import { cn } from '@/lib/utils'
import type { Suggestion } from '@/lib/scoring'

const priorityColors: Record<Suggestion['priority'], string> = {
  critical: 'bg-red-500/20 text-red-400 border-red-500/30',
  high: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

export function ThreadSuggestions() {
  const { suggestions, warnings } = useThreadScore()

  if (suggestions.length === 0 && warnings.length === 0) {
    return (
      <Card className="raycast-shine">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Suggestions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Looking good! No suggestions at this time.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="raycast-shine">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Suggestions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {warnings.map((warning, idx) => (
          <div
            key={`warning-${idx}`}
            className="p-3 rounded-lg bg-red-500/10 border border-red-500/20"
          >
            <p className="text-sm text-red-400">{warning}</p>
          </div>
        ))}
        {suggestions.map((suggestion, idx) => (
          <div
            key={`suggestion-${idx}`}
            className="flex items-start gap-3 p-3 rounded-lg bg-card border border-border"
          >
            <Badge className={cn('shrink-0', priorityColors[suggestion.priority])}>
              {suggestion.priority}
            </Badge>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">{suggestion.message}</p>
              <p className="text-xs text-primary mt-1">Impact: {suggestion.impact}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
