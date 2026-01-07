import { useTable } from 'tinybase/ui-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

function getScoreColor(score: number): string {
  if (score >= 80) return 'text-green-500'
  if (score >= 60) return 'text-primary'
  if (score >= 40) return 'text-yellow-500'
  return 'text-destructive'
}

function getScoreLabel(score: number): string {
  if (score >= 80) return 'Excellent'
  if (score >= 60) return 'Good'
  if (score >= 40) return 'Fair'
  return 'Needs Work'
}

function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

export function TweetHistory() {
  const tweetLog = useTable('tweetLog')
  
  const tweets = Object.entries(tweetLog)
    .map(([id, row]) => ({
      id,
      text: row.text as string,
      score: row.score as number,
      mediaType: row.mediaType as string,
      hasLink: row.hasLink as boolean,
      copiedAt: row.copiedAt as number,
    }))
    .sort((a, b) => b.copiedAt - a.copiedAt)

  if (tweets.length === 0) {
    return (
      <Card className="raycast-shine">
        <CardHeader>
          <CardTitle className="text-base">Tweet History</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground text-center py-8">
            No tweets copied yet. Your history will appear here.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="raycast-shine">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Tweet History</CardTitle>
          <Badge variant="secondary">{tweets.length} tweets</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {tweets.map((tweet) => (
            <div
              key={tweet.id}
              className="p-3 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm line-clamp-2 flex-1">{tweet.text}</p>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className={cn('text-lg font-bold tabular-nums', getScoreColor(tweet.score))}>
                    {tweet.score}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {getScoreLabel(tweet.score)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                <span>{formatDate(tweet.copiedAt)}</span>
                {tweet.mediaType !== 'none' && (
                  <>
                    <span>•</span>
                    <span className="capitalize">{tweet.mediaType}</span>
                  </>
                )}
                {tweet.hasLink && (
                  <>
                    <span>•</span>
                    <span>Has link</span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
