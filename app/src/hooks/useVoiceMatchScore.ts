import { useMemo } from 'react'
import { useRow } from 'tinybase/ui-react'
import { calculateVoiceMatchScore } from '@/lib/ai/voiceMatch'
import { getVoiceProfile, getExampleTweets } from '@/lib/store'

export function useVoiceMatchScore(): number {
  const tweet = useRow('currentTweet', 'draft')

  return useMemo(() => {
    const text = (tweet?.text as string) ?? ''

    if (!text.trim()) {
      return 0
    }

    const voiceProfile = getVoiceProfile()
    const exampleTweets = getExampleTweets()
    const exampleTexts = exampleTweets.map((tweet) => tweet.text)

    const result = calculateVoiceMatchScore(
      text,
      exampleTexts,
      voiceProfile ?? undefined
    )

    return result.total
  }, [tweet])
}
