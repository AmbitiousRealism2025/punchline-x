import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Template } from '@/lib/templates'
import { categoryLabels } from '@/lib/templates'
import { cn } from '@/lib/utils'

interface TemplateCardProps {
  template: Template
  onSelect: (template: Template) => void
}

const mediaBadgeColors: Record<string, string> = {
  image: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  video: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  poll: 'bg-green-500/20 text-green-400 border-green-500/30',
  none: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30',
}

export function TemplateCard({ template, onSelect }: TemplateCardProps) {
  const [minScore, maxScore] = template.expectedScore

  return (
    <Card
      className="raycast-shine hover:border-primary/50 active:border-primary active:scale-[0.98] transition-all cursor-pointer group touch-manipulation min-h-[120px]"
      onClick={() => onSelect(template)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(template)
        }
      }}
    >
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{template.name}</CardTitle>
          <Badge variant="secondary" className="shrink-0 text-xs">
            {categoryLabels[template.category]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-3 font-mono text-xs">
          {template.template.slice(0, 120)}...
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Score:</span>
            <span className="text-xs font-medium text-primary">
              {minScore}-{maxScore}
            </span>
          </div>
          <div className="flex gap-1">
            {template.bestWith.map((media) => (
              <Badge
                key={media}
                className={cn('text-xs', mediaBadgeColors[media])}
              >
                {media}
              </Badge>
            ))}
          </div>
        </div>

        <Button
          onClick={(e) => {
            e.stopPropagation()
            onSelect(template)
          }}
          className="w-full md:opacity-0 md:group-hover:opacity-100 transition-opacity"
          size="sm"
        >
          Use Template
        </Button>
      </CardContent>
    </Card>
  )
}
