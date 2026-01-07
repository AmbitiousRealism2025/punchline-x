import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { ThreadTemplate } from '@/data/threadTemplates'
import { threadTypeLabels } from '@/data/threadTemplates'
import { cn } from '@/lib/utils'

interface ThreadTemplateCardProps {
  template: ThreadTemplate
  className?: string
}

const typeBadgeColors: Record<string, string> = {
  storytelling: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  list: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  'how-to': 'bg-green-500/20 text-green-400 border-green-500/30',
  'hot-take': 'bg-red-500/20 text-red-400 border-red-500/30',
  'personal-journey': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
}

export function ThreadTemplateCard({ template, className }: ThreadTemplateCardProps) {
  return (
    <Card className={cn('raycast-shine hover:border-primary/50 transition-colors', className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-base">{template.name}</CardTitle>
          <Badge className={cn('shrink-0 text-xs', typeBadgeColors[template.type])}>
            {threadTypeLabels[template.type]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Hook Formula */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wide">
            Hook Formula
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {template.hookFormula}
          </p>
        </div>

        {/* Body Structure */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wide">
            Body Structure
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line font-mono text-xs">
            {template.bodyStructure}
          </p>
        </div>

        {/* Closing Formula */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wide">
            Closing Formula
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {template.closingFormula}
          </p>
        </div>

        {/* When to Use */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wide">
            When to Use
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {template.whenToUse}
          </p>
        </div>

        {/* Example Thread */}
        <div className="space-y-1.5">
          <h4 className="text-xs font-semibold text-primary uppercase tracking-wide">
            Example Thread
          </h4>
          <div className="space-y-2 rounded-lg bg-muted/50 p-3 border border-border/50">
            {/* Hook */}
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Hook:</span>
              <p className="text-sm leading-relaxed">{template.exampleThread.hook}</p>
            </div>

            {/* Body */}
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Body:</span>
              <div className="space-y-1.5">
                {template.exampleThread.body.map((tweet, index) => (
                  <p key={index} className="text-sm leading-relaxed pl-2 border-l-2 border-primary/30">
                    {tweet}
                  </p>
                ))}
              </div>
            </div>

            {/* Closing */}
            <div className="space-y-1">
              <span className="text-xs font-medium text-muted-foreground">Closing:</span>
              <p className="text-sm leading-relaxed whitespace-pre-line">
                {template.exampleThread.closing}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
