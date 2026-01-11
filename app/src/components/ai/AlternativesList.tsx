import { useCell, useSetCellCallback } from 'tinybase/ui-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
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
  isLoading?: boolean
  error?: string | null
  onRetry?: () => void
}

export function AlternativesList({
  alternatives,
  isLoading = false,
  error = null,
  onRetry
}: AlternativesListProps) {
  const currentText = (useCell('currentTweet', 'draft', 'text') as string) ?? ''

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

  if (!isLoading && !error && alternatives.length === 0) {
    return null
  }

  return (
    <Card className="raycast-shine">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">AI Rewrite Alternatives</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive mb-2">{error}</p>
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                onClick={onRetry}
                className="border-destructive/30 hover:bg-destructive/20"
              >
                Try Again
              </Button>
            )}
          </div>
        )}

        {isLoading && (
          <div className="p-6 text-center">
            <p className="text-sm text-muted-foreground">Generating alternatives...</p>
          </div>
        )}

        {!isLoading && alternatives.length > 0 && (
          <div className="space-y-2">
            {alternatives.map((alternative, idx) => {
              const isSelected = currentText === alternative.text
              return (
                <div
                  key={idx}
                  className={cn(
                    'group p-3 rounded-lg bg-card border transition-colors cursor-pointer',
                    isSelected
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary/50'
                  )}
                  onClick={() => handleSelectAlternative(alternative.text)}
                >
                  <div className="flex items-start gap-3">
                    <Badge className={cn('shrink-0', scoreColors(alternative.score))}>
                      {Math.round(alternative.score)}
                    </Badge>
                    <p className="text-sm text-foreground flex-1">{alternative.text}</p>
                  </div>
                  <p
                    className={cn(
                      'text-xs mt-2 transition-opacity',
                      isSelected
                        ? 'text-primary opacity-100'
                        : 'text-muted-foreground opacity-0 group-hover:opacity-100'
                    )}
                  >
                    {isSelected ? 'Currently selected' : 'Click to use this alternative'}
                  </p>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
