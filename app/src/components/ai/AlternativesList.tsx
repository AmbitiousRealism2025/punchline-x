import { useSetCellCallback } from 'tinybase/ui-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Alternative } from '@/lib/store'
import { cn } from '@/lib/utils'

const scoreColors = (score: number): string => {
  if (score >= 80) return 'bg-green-500/20 text-green-400 border-green-500/30'
  if (score >= 60) return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  if (score >= 40) return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
  return 'bg-red-500/20 text-red-400 border-red-500/30'
}

interface AlternativesListProps {
  alternatives: Alternative[]
}

export function AlternativesList({ alternatives }: AlternativesListProps) {
  const setText = useSetCellCallback(
    'currentTweet',
    'draft',
    'text',
    (newText: string) => newText,
    []
  )

  const handleSelectAlternative = (text: string) => {
    setText(text)
  }

  if (alternatives.length === 0) {
    return null
  }

  return (
    <Card className="raycast-shine">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">AI Rewrite Alternatives</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {alternatives.map((alternative, idx) => (
            <div
              key={idx}
              className="group p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => handleSelectAlternative(alternative.text)}
            >
              <div className="flex items-start gap-3">
                <Badge className={cn('shrink-0', scoreColors(alternative.score))}>
                  {Math.round(alternative.score)}
                </Badge>
                <p className="text-sm text-foreground flex-1">{alternative.text}</p>
              </div>
              <p className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Click to use this alternative
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
