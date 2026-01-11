import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { ScoringFactorExplanation } from '@/lib/scoring/explanation-types'
import { ExternalLinkIcon } from 'lucide-react'

interface ExplanationCardProps {
  explanation: ScoringFactorExplanation
}

export function ExplanationCard({ explanation }: ExplanationCardProps) {
  return (
    <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>{explanation.factorName}</DialogTitle>
        <DialogDescription>
          Learn how this factor impacts your algorithm score
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-6">
        {/* Algorithm Principle Section */}
        <Card>
          <CardHeader className="border-b">
            <CardTitle className="text-base">Why It Matters</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <h4 className="text-muted-foreground mb-2 text-sm font-medium">
                  Impact on Algorithm
                </h4>
                <p className="text-sm leading-relaxed">
                  {explanation.algorithmPrinciple.why}
                </p>
              </div>
              <div>
                <h4 className="text-muted-foreground mb-2 text-sm font-medium">
                  How It's Evaluated
                </h4>
                <p className="text-sm leading-relaxed">
                  {explanation.algorithmPrinciple.how}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Examples Section */}
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Good Examples */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-emerald-400 text-base">
                Good Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {explanation.examples.good.map((example, index) => (
                  <div key={index}>
                    <p className="text-muted-foreground mb-2 text-xs">
                      {example.description}
                    </p>
                    <div className="bg-muted/50 rounded-md border p-3">
                      <p className="text-sm italic">{example.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Bad Examples */}
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-red-400 text-base">
                Bad Examples
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {explanation.examples.bad.map((example, index) => (
                  <div key={index}>
                    <p className="text-muted-foreground mb-2 text-xs">
                      {example.description}
                    </p>
                    <div className="bg-muted/50 rounded-md border p-3">
                      <p className="text-sm italic">{example.example}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Research Links Section */}
        {explanation.research.length > 0 && (
          <Card>
            <CardHeader className="border-b">
              <CardTitle className="text-base">Research & Resources</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {explanation.research.map((link, index) => (
                  <div key={index} className="space-y-2">
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline inline-flex items-center gap-2 text-sm font-medium"
                    >
                      {link.title}
                      <ExternalLinkIcon className="size-4" />
                    </a>
                    <p className="text-muted-foreground text-sm">
                      {link.summary}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DialogContent>
  )
}
