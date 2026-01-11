import { useState } from 'react'
import { useRow } from 'tinybase/ui-react'
import { calculateScore } from '@/lib/scoring'
import type { MediaType } from '@/lib/scoring'
import {
  saveAlternatives,
  serializeAlternatives,
  type Alternative,
} from '@/lib/store'

export interface RewriteResult {
  alternatives: Alternative[]
  alternativesId: string
}

export interface UseRewriteTweetResult {
  rewrite: () => Promise<RewriteResult>
  isLoading: boolean
  error: string | null
}

export function useRewriteTweet(): UseRewriteTweetResult {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const tweet = useRow('currentTweet', 'draft')
  const settings = useRow('settings', 'user')

  const rewrite = async (): Promise<RewriteResult> => {
    setIsLoading(true)
    setError(null)

    try {
      const text = (tweet?.text as string) ?? ''
      const mediaType = (tweet?.mediaType as MediaType) ?? 'none'
      const hasLink = (tweet?.hasLink as boolean) ?? false
      const isPremium = (settings?.isPremium as boolean) ?? false
      const isVerified = (settings?.isVerified as boolean) ?? false

      if (!text || text.length < 10) {
        throw new Error('Tweet must be at least 10 characters long')
      }

      const response = await fetch('http://localhost:3001/api/rewrite-tweet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, mediaType, hasLink }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to rewrite tweet')
      }

      const responseText = await response.text()

      const jsonMatch = responseText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error('Invalid response format')
      }

      const data = JSON.parse(jsonMatch[0])

      if (!data.alternatives || !Array.isArray(data.alternatives)) {
        throw new Error('Invalid response structure')
      }

      const alternatives: Alternative[] = data.alternatives.map(
        (altText: string) => {
          const score = calculateScore({
            text: altText,
            mediaType,
            hasLink,
            isPremium,
            isVerified,
            postTime: new Date(),
          })

          return {
            text: altText,
            score: score.total,
          }
        }
      )

      const serialized = serializeAlternatives(text, alternatives)
      const alternativesId = saveAlternatives(serialized)

      return { alternatives, alternativesId }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred'
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { rewrite, isLoading, error }
}
