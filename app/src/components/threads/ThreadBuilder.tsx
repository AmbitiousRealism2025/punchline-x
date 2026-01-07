import { useState, useCallback, useEffect, useMemo } from 'react'
import { useCell } from 'tinybase/ui-react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ThreadTweet } from './ThreadTweet'
import {
  createThread,
  getThreadTweets,
  addThreadTweet,
  deleteThreadTweet,
  reorderThreadTweets,
  store,
} from '@/lib/store'

const MIN_TWEETS = 2
const MAX_TWEETS = 25

export function ThreadBuilder() {
  const [copied, setCopied] = useState(false)
  const activeThreadId = (useCell('activeThread', 'current', 'threadId') as string) ?? ''

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    if (!activeThreadId) {
      const threadId = createThread('New Thread')
      store.setRow('activeThread', 'current', { threadId })
      addThreadTweet(threadId, '', 'none', false)
      addThreadTweet(threadId, '', 'none', false)
    }
  }, [activeThreadId])

  const tweets = useMemo(() => {
    if (!activeThreadId) return []
    return getThreadTweets(activeThreadId)
  }, [activeThreadId])

  const handleAddTweet = useCallback(() => {
    if (!activeThreadId || tweets.length >= MAX_TWEETS) return
    addThreadTweet(activeThreadId, '', 'none', false)
  }, [activeThreadId, tweets.length])

  const handleDeleteTweet = useCallback(
    (tweetId: string) => {
      if (!activeThreadId || tweets.length <= MIN_TWEETS) return
      deleteThreadTweet(tweetId)
    },
    [activeThreadId, tweets.length]
  )

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event
      if (!over || !activeThreadId || active.id === over.id) return

      const oldIndex = tweets.findIndex((t) => t.id === active.id)
      const newIndex = tweets.findIndex((t) => t.id === over.id)

      if (oldIndex === -1 || newIndex === -1) return

      const reorderedTweets = [...tweets]
      const [movedTweet] = reorderedTweets.splice(oldIndex, 1)
      reorderedTweets.splice(newIndex, 0, movedTweet)

      const tweetIds = reorderedTweets.map((t) => t.id)
      reorderThreadTweets(activeThreadId, tweetIds)
    },
    [activeThreadId, tweets]
  )

  const handleCopy = useCallback(async () => {
    if (!activeThreadId || tweets.length < MIN_TWEETS) return

    const hasOverLimit = tweets.some((t) => t.text.length > 280)
    if (hasOverLimit) return

    const threadText = tweets
      .map((t, index) => {
        const text = t.text.trim()
        if (!text) return ''
        return `${index + 1}. ${text}`
      })
      .filter((text) => text.length > 0)
      .join('\n\n')

    if (!threadText) return

    await navigator.clipboard.writeText(threadText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [activeThreadId, tweets])

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

  const canCopy = useMemo(() => {
    if (tweets.length < MIN_TWEETS) return false
    const hasOverLimit = tweets.some((t) => t.text.length > 280)
    if (hasOverLimit) return false
    const hasContent = tweets.some((t) => t.text.trim().length > 0)
    return hasContent
  }, [tweets])

  const canAddTweet = tweets.length < MAX_TWEETS
  const canDeleteTweet = tweets.length > MIN_TWEETS

  return (
    <Card className="raycast-shine">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Thread Builder</CardTitle>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopy}
              disabled={!canCopy}
              className="min-w-[80px]"
            >
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={tweets.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {tweets.map((tweet, index) => (
                <ThreadTweet
                  key={tweet.id}
                  tweetId={tweet.id}
                  position={index + 1}
                  totalCount={tweets.length}
                  onDelete={() => handleDeleteTweet(tweet.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

        <div className="flex items-center justify-between pt-2 border-t border-border">
          <Button
            variant="outline"
            size="sm"
            onClick={handleAddTweet}
            disabled={!canAddTweet}
            className="gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Tweet
            {tweets.length >= MAX_TWEETS && (
              <span className="text-xs text-muted-foreground">(Max {MAX_TWEETS})</span>
            )}
          </Button>
          <div className="flex items-center gap-4">
            {!canDeleteTweet && (
              <span className="text-xs text-muted-foreground">Minimum {MIN_TWEETS} tweets</span>
            )}
            <span className="text-xs text-muted-foreground">⌘+Enter to copy</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
