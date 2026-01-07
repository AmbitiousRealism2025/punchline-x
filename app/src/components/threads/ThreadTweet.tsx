import { useMemo } from 'react'
import { useRow } from 'tinybase/ui-react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical, Trash2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { updateThreadTweet } from '@/lib/store'
import { calculateScore, type MediaType } from '@/lib/scoring'
import type { Grade } from '@/lib/scoring'

const MAX_CHARS = 280

const gradeColors: Record<Grade, string> = {
  excellent: 'text-emerald-400',
  good: 'text-lime-400',
  fair: 'text-yellow-400',
  poor: 'text-orange-400',
  critical: 'text-red-400',
}

interface ThreadTweetProps {
  tweetId: string
  position: number
  totalCount: number
  onDelete: () => void
}

export function ThreadTweet({ tweetId, position, totalCount, onDelete }: ThreadTweetProps) {
  const tweet = useRow('threadTweets', tweetId)
  const settings = useRow('settings', 'user')

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: tweetId })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  const text = (tweet?.text as string) ?? ''
  const mediaType = (tweet?.mediaType as MediaType) ?? 'none'
  const hasLink = (tweet?.hasLink as boolean) ?? false

  const score = useMemo(() => {
    const isPremium = (settings?.isPremium as boolean) ?? false
    const isVerified = (settings?.isVerified as boolean) ?? false

    return calculateScore({
      text,
      mediaType,
      hasLink,
      isPremium,
      isVerified,
      postTime: new Date(),
    })
  }, [text, mediaType, hasLink, settings])

  const charCount = text.length
  const isOverLimit = charCount > MAX_CHARS
  const isNearLimit = charCount > MAX_CHARS * 0.9

  const handleTextChange = (newText: string) => {
    updateThreadTweet(tweetId, { text: newText })
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'raycast-shine',
        isDragging && 'opacity-50 ring-2 ring-primary'
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="cursor-grab active:cursor-grabbing text-muted-foreground hover:text-foreground transition-colors"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium text-muted-foreground">
            {position}/{totalCount}
          </span>
          <div className="flex-1" />
          {text.trim() && (
            <div className="flex items-center gap-2">
              <span
                className={cn(
                  'text-sm font-medium tabular-nums',
                  gradeColors[score.grade]
                )}
              >
                {score.total}
              </span>
            </div>
          )}
          <Button variant="ghost" size="sm" onClick={onDelete}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <Textarea
          placeholder={`Tweet ${position}...`}
          value={text}
          onChange={(e) => handleTextChange(e.target.value)}
          className="min-h-[80px] resize-none bg-background border-border focus-visible:ring-primary/50"
        />
        <div className="flex items-center justify-end">
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
