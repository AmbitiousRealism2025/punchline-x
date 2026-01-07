import { useMemo } from 'react'
import { useRow } from 'tinybase/ui-react'
import { calculateScore, type ScoreResult, type MediaType } from '@/lib/scoring'

export function useScore(): ScoreResult {
  const tweet = useRow('currentTweet', 'draft')
  const settings = useRow('settings', 'user')

  return useMemo(() => {
    const text = (tweet?.text as string) ?? ''
    const mediaType = (tweet?.mediaType as MediaType) ?? 'none'
    const hasLink = (tweet?.hasLink as boolean) ?? false
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
  }, [tweet, settings])
}
