import { stringSimilarity } from 'string-similarity-js'
import type { VoiceProfile } from '../store'

export interface VoiceMatchResult {
  total: number
  breakdown: {
    similarity: number
    emojiMatch: number
    lengthMatch: number
    punctuationMatch: number
  }
}

function countEmojis(text: string): number {
  const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu
  return (text.match(emojiRegex) || []).length
}

function getEmojiFrequency(text: string): number {
  if (!text.length) return 0
  return countEmojis(text) / text.length
}

function getEmojiScore(
  generatedText: string,
  exampleTweets: string[],
  voiceProfile?: VoiceProfile
): number {
  const generatedFreq = getEmojiFrequency(generatedText)

  if (exampleTweets.length > 0) {
    const avgExampleFreq =
      exampleTweets.reduce((sum, tweet) => sum + getEmojiFrequency(tweet), 0) /
      exampleTweets.length

    const diff = Math.abs(generatedFreq - avgExampleFreq)
    return Math.max(0, 25 - diff * 1000)
  }

  if (voiceProfile) {
    const expectedEmojis = {
      never: 0,
      rarely: 0.01,
      often: 0.03,
      always: 0.05,
    }
    const expected = expectedEmojis[voiceProfile.emojiUsage]
    const diff = Math.abs(generatedFreq - expected)
    return Math.max(0, 25 - diff * 500)
  }

  return 15
}

function getAverageSentenceLength(text: string): number {
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0)
  if (sentences.length === 0) return 0

  const totalLength = sentences.reduce((sum, s) => sum + s.trim().length, 0)
  return totalLength / sentences.length
}

function getLengthScore(
  generatedText: string,
  exampleTweets: string[]
): number {
  if (exampleTweets.length === 0) return 15

  const generatedAvg = getAverageSentenceLength(generatedText)
  const exampleAvg =
    exampleTweets.reduce(
      (sum, tweet) => sum + getAverageSentenceLength(tweet),
      0
    ) / exampleTweets.length

  const diff = Math.abs(generatedAvg - exampleAvg)
  return Math.max(0, 25 - diff * 0.5)
}

function getPunctuationDensity(text: string): number {
  if (!text.length) return 0
  const punctuation = text.match(/[!?.,;:]/g) || []
  return punctuation.length / text.length
}

function getPunctuationScore(
  generatedText: string,
  exampleTweets: string[]
): number {
  if (exampleTweets.length === 0) return 15

  const generatedDensity = getPunctuationDensity(generatedText)
  const exampleDensity =
    exampleTweets.reduce(
      (sum, tweet) => sum + getPunctuationDensity(tweet),
      0
    ) / exampleTweets.length

  const diff = Math.abs(generatedDensity - exampleDensity)
  return Math.max(0, 25 - diff * 100)
}

function getSimilarityScore(
  generatedText: string,
  exampleTweets: string[]
): number {
  if (exampleTweets.length === 0 || !generatedText.trim()) return 0

  const similarities = exampleTweets.map((tweet) =>
    stringSimilarity(generatedText.toLowerCase(), tweet.toLowerCase())
  )

  const maxSimilarity = Math.max(...similarities)
  return maxSimilarity * 25
}

export function calculateVoiceMatchScore(
  generatedText: string,
  exampleTweets: string[] = [],
  voiceProfile?: VoiceProfile
): VoiceMatchResult {
  if (!generatedText || generatedText.trim().length === 0) {
    return {
      total: 0,
      breakdown: {
        similarity: 0,
        emojiMatch: 0,
        lengthMatch: 0,
        punctuationMatch: 0,
      },
    }
  }

  const breakdown = {
    similarity: getSimilarityScore(generatedText, exampleTweets),
    emojiMatch: getEmojiScore(generatedText, exampleTweets, voiceProfile),
    lengthMatch: getLengthScore(generatedText, exampleTweets),
    punctuationMatch: getPunctuationScore(generatedText, exampleTweets),
  }

  const total = Math.max(
    0,
    Math.min(100, Object.values(breakdown).reduce((a, b) => a + b, 0))
  )

  return {
    total,
    breakdown,
  }
}
