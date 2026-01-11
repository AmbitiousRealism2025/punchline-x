import { useEffect, useState, useCallback } from 'react'
import { useCell, useSetCellCallback } from 'tinybase/ui-react'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { logTweet } from '@/lib/store'
import { useScore } from '@/hooks/useScore'

const MAX_CHARS = 280

interface TweetInputProps {
  onRewrite?: () => Promise<void>
  isRewriting?: boolean
  rewriteError?: string | null
}

export function TweetInput({
  onRewrite,
  isRewriting = false,
  rewriteError = null
}: TweetInputProps = {}) {
  const [copied, setCopied] = useState(false)
  const text = (useCell('currentTweet', 'draft', 'text') as string) ?? ''
  const mediaType = (useCell('currentTweet', 'draft', 'mediaType') as string) ?? 'none'
  const hasLink = (useCell('currentTweet', 'draft', 'hasLink') as boolean) ?? false
  const { total: score } = useScore()

  const setText = useSetCellCallback(
    'currentTweet',
    'draft',
    'text',
    (newText: string) => newText,
    []
  )

  const charCount = text.length
  const isOverLimit = charCount > MAX_CHARS
  const isNearLimit = charCount > MAX_CHARS * 0.9

  const handleCopy = useCallback(async () => {
    if (!text.trim()) return
    await navigator.clipboard.writeText(text)
    logTweet({ text, score, mediaType, hasLink })
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [text, score, mediaType, hasLink])

  const handleClear = useCallback(() => {
    setText('')
  }, [setText])

  const handleRewrite = useCallback(async () => {
    if (!text.trim() || text.length < 10) return
    if (onRewrite) {
      await onRewrite()
    }
  }, [text, onRewrite])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault()
        handleCopy()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleCopy])

  return (
    <Card className="raycast-shine">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <CardTitle className="text-base">Compose Tweet</CardTitle>
          <div className="flex gap-2 sm:gap-2">
            <Button
              variant="default"
              size="sm"
              onClick={handleRewrite}
              disabled={isRewriting || !text.trim() || text.length < 10}
              className="min-w-[120px]"
            >
              {isRewriting ? 'Rewriting...' : 'Rewrite with AI'}
            </Button>
            {text.trim() && (
              <Button
                variant="ghost"
                size="default"
                onClick={handleClear}
                className="min-h-[44px] flex-1 sm:flex-none sm:min-w-[88px]"
              >
                Clear
              </Button>
            )}
            <Button
              variant="secondary"
              size="default"
              onClick={handleCopy}
              disabled={!text.trim()}
              className="min-h-[44px] flex-1 sm:flex-none sm:min-w-[88px]"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pb-4">
        <Textarea
          placeholder="What's happening?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="min-h-[120px] resize-none bg-background border-border focus-visible:ring-primary/50 touch-manipulation"
        />

        {rewriteError && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{rewriteError}</p>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 flex-wrap">
          <span className="text-xs text-muted-foreground whitespace-nowrap">⌘+Enter to copy</span>
          <span
            className={cn(
              'text-sm tabular-nums',
              isOverLimit && 'text-destructive font-medium',
              isNearLimit && !isOverLimit && 'text-yellow-500',
              !isNearLimit && 'text-muted-foreground'
            )}
          >
            {charCount}/{MAX_CHARS}
          </span>
        </div>
      </CardContent>
    </Card>
  )
}
