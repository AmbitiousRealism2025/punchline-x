import { useMemo } from 'react'
import { useRow, useTable } from 'tinybase/ui-react'
import { calculateThreadScore, type ScoreInput, type ThreadScoreResult, type MediaType } from '@/lib/scoring'

export function useThreadScore(): ThreadScoreResult {
  const activeThread = useRow('activeThread', 'current')
  const threadTweetsTable = useTable('threadTweets')
  const settings = useRow('settings', 'user')

  return useMemo(() => {
    const threadId = activeThread?.threadId as string | null
    const isPremium = (settings?.isPremium as boolean) ?? false
    const isVerified = (settings?.isVerified as boolean) ?? false

    if (!threadId || !threadTweetsTable) {
      return {
        total: 0,
        breakdown: {
          averageIndividual: 0,
          flowCoherence: 0,
          pacing: 0,
          consistency: 0,
        },
        individualScores: [],
        suggestions: [],
        warnings: ['No active thread'],
        grade: 'critical',
      }
    }

    const threadTweets = Object.entries(threadTweetsTable)
      .filter(([, row]) => row.threadId === threadId)
      .map(([, row]) => ({
        position: row.position as number,
        text: (row.text as string) ?? '',
        mediaType: (row.mediaType as MediaType) ?? 'none',
        hasLink: (row.hasLink as boolean) ?? false,
      }))
      .sort((a, b) => a.position - b.position)

    const tweets: ScoreInput[] = threadTweets.map((tweet) => ({
      text: tweet.text,
      mediaType: tweet.mediaType,
      hasLink: tweet.hasLink,
      isPremium,
      isVerified,
      postTime: new Date(),
    }))

    return calculateThreadScore(tweets)
  }, [activeThread, threadTweetsTable, settings])
}
