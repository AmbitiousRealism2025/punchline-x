import { useState } from 'react'
import { useCell, useSetCellCallback } from 'tinybase/ui-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { generateHooks, type GeneratedHook } from '@/lib/ai/hooks'
import { getVoiceProfile, getExampleTweets } from '@/lib/store'
import { calculateVoiceMatchScore } from '@/lib/ai/voiceMatch'
import { cn } from '@/lib/utils'

interface HookWithScore extends GeneratedHook {
  voiceMatchScore?: number
}

const styleColors: Record<GeneratedHook['style'], string> = {
  contrarian: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  number: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  story: 'bg-green-500/20 text-green-400 border-green-500/30',
  question: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  interrupt: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export function HookGenerator() {
  const [topic, setTopic] = useState('')
  const [hooks, setHooks] = useState<HookWithScore[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const currentText = (useCell('currentTweet', 'draft', 'text') as string) ?? ''

  const setText = useSetCellCallback(
    'currentTweet',
    'draft',
    'text',
    (newText: string) => newText,
    []
  )

  const handleGenerate = async () => {
    if (!topic.trim()) return

    setLoading(true)
    setError(null)

    try {
      const voiceProfile = getVoiceProfile()
      const exampleTweets = getExampleTweets()
      const exampleTexts = exampleTweets.map((tweet) => tweet.text)

      const generatedHooks = await generateHooks(
        topic,
        voiceProfile ?? undefined,
        exampleTexts.length > 0 ? exampleTexts : undefined
      )

      const hooksWithScores: HookWithScore[] = generatedHooks.map((hook) => {
        const scoreResult = calculateVoiceMatchScore(
          hook.hook,
          exampleTexts,
          voiceProfile ?? undefined
        )
        return {
          ...hook,
          voiceMatchScore: scoreResult.total,
        }
      })

      setHooks(hooksWithScores)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate hooks')
    } finally {
      setLoading(false)
    }
  }

  const handleUseHook = (hook: string) => {
    const newText = currentText ? `${hook}\n\n${currentText}` : hook
    setText(newText)
  }

  return (
    <Card className="raycast-shine">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">AI Hook Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="Enter a topic..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            className="flex-1"
          />
          <Button onClick={handleGenerate} disabled={loading || !topic.trim()}>
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {hooks.length > 0 && (
          <div className="space-y-2">
            {hooks.map((hook, idx) => (
              <div
                key={idx}
                className="group p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() => handleUseHook(hook.hook)}
              >
                <div className="flex items-start gap-3">
                  <Badge className={cn('shrink-0', styleColors[hook.style])}>
                    {hook.style}
                  </Badge>
                  <p className="text-sm text-foreground flex-1">{hook.hook}</p>
                  {hook.voiceMatchScore !== undefined && (
                    <Badge
                      variant="outline"
                      className="shrink-0 bg-primary/10 text-primary border-primary/30"
                    >
                      {Math.round(hook.voiceMatchScore)}%
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to use this hook
                </p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
