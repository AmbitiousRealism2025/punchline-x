import type { ScoreInput, ScoreBreakdown, ScoreResult, Grade, ThreadScoreResult, ThreadScoreBreakdown, Suggestion } from './types'
import { analyzeHook } from './hooks'
import { getMediaScore } from './media'
import { getEngagementScore } from './engagement'
import { getContentQualityScore } from './quality'
import { generateSuggestions, generateWarnings } from './suggestions'

const BASE_SCORE = 40

function getTimingScore(postTime: Date): number {
  const hour = postTime.getHours()
  const day = postTime.getDay()
  let score = 0

  if (day >= 1 && day <= 5) score += 5
  if (hour >= 8 && hour < 11) score += 15
  else if (hour >= 12 && hour < 14) score += 10
  else if (hour >= 18 || hour < 6) score -= 10

  return score
}

function getAccountScore(isPremium?: boolean, isVerified?: boolean): number {
  return (isPremium ? 20 : 0) + (isVerified ? 10 : 0)
}

function getGrade(score: number): Grade {
  if (score >= 85) return 'excellent'
  if (score >= 70) return 'good'
  if (score >= 55) return 'fair'
  if (score >= 40) return 'poor'
  return 'critical'
}

export function calculateScore(input: ScoreInput): ScoreResult {
  const breakdown: ScoreBreakdown = {
    base: BASE_SCORE,
    media: getMediaScore(input.mediaType, input.hasLink, input.isPremium),
    hook: analyzeHook(input.text),
    engagement: getEngagementScore(input.text),
    timing: getTimingScore(input.postTime ?? new Date()),
    account: getAccountScore(input.isPremium, input.isVerified),
    quality: getContentQualityScore(input.text),
  }

  const total = Math.max(
    0,
    Math.min(100, Object.values(breakdown).reduce((a, b) => a + b, 0))
  )

  return {
    total,
    breakdown,
    suggestions: generateSuggestions(input, breakdown),
    warnings: generateWarnings(input),
    grade: getGrade(total),
  }
}

function getFlowCoherence(tweets: ScoreInput[], individualScores: ScoreResult[]): number {
  if (tweets.length < 2) return 0

  let coherenceScore = 0
  const lengths = tweets.map((t) => t.text.length)
  const scores = individualScores.map((s) => s.total)

  const lengthVariance = Math.abs(Math.max(...lengths) - Math.min(...lengths))
  if (lengthVariance < 150) coherenceScore += 5
  else if (lengthVariance > 250) coherenceScore -= 5

  const scoreVariance = Math.abs(Math.max(...scores) - Math.min(...scores))
  if (scoreVariance < 20) coherenceScore += 10
  else if (scoreVariance > 40) coherenceScore -= 10

  return coherenceScore
}

function getPacingScore(individualScores: ScoreResult[]): number {
  if (individualScores.length < 3) return 0

  const scores = individualScores.map((s) => s.total)
  const firstThird = scores.slice(0, Math.ceil(scores.length / 3))
  const lastThird = scores.slice(-Math.ceil(scores.length / 3))

  const avgFirst = firstThird.reduce((a, b) => a + b, 0) / firstThird.length
  const avgLast = lastThird.reduce((a, b) => a + b, 0) / lastThird.length

  if (avgLast > avgFirst) return 10
  if (avgLast < avgFirst - 15) return -5

  return 0
}

function getConsistencyScore(individualScores: ScoreResult[]): number {
  if (individualScores.length < 2) return 0

  const scores = individualScores.map((s) => s.total)
  const avg = scores.reduce((a, b) => a + b, 0) / scores.length
  const variance = scores.reduce((sum, score) => sum + Math.pow(score - avg, 2), 0) / scores.length
  const stdDev = Math.sqrt(variance)

  if (stdDev < 10) return 10
  if (stdDev < 20) return 5
  if (stdDev > 30) return -5

  return 0
}

function generateThreadSuggestions(
  individualScores: ScoreResult[],
  breakdown: ThreadScoreBreakdown
): Suggestion[] {
  const suggestions: Suggestion[] = []

  if (breakdown.flowCoherence < 0) {
    suggestions.push({
      type: 'engagement',
      priority: 'high',
      message: 'Thread flow could be improved',
      impact: 'Better coherence between tweets increases readability and engagement',
    })
  }

  if (breakdown.pacing < 0) {
    suggestions.push({
      type: 'engagement',
      priority: 'medium',
      message: 'Consider building momentum toward the end',
      impact: 'Stronger ending tweets keep readers engaged through the entire thread',
    })
  }

  const lowScoreTweets = individualScores.filter((s) => s.total < 50)
  if (lowScoreTweets.length > 0) {
    suggestions.push({
      type: 'critical',
      priority: 'critical',
      message: `${lowScoreTweets.length} tweet(s) have low individual scores`,
      impact: 'Weak tweets drag down overall thread performance',
    })
  }

  return suggestions
}

function generateThreadWarnings(tweets: ScoreInput[]): string[] {
  const warnings: string[] = []

  if (tweets.length < 2) {
    warnings.push('Thread must have at least 2 tweets')
  }

  if (tweets.length > 25) {
    warnings.push('Thread exceeds maximum of 25 tweets')
  }

  const emptyTweets = tweets.filter((t) => !t.text.trim()).length
  if (emptyTweets > 0) {
    warnings.push(`${emptyTweets} tweet(s) are empty`)
  }

  return warnings
}

export function calculateThreadScore(tweets: ScoreInput[]): ThreadScoreResult {
  const individualScores = tweets
    .filter((t) => t.text.trim().length > 0)
    .map((tweet) => calculateScore(tweet))

  if (individualScores.length === 0) {
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
      warnings: generateThreadWarnings(tweets),
      grade: 'critical',
    }
  }

  const avgIndividual =
    individualScores.reduce((sum, result) => sum + result.total, 0) / individualScores.length

  const breakdown: ThreadScoreBreakdown = {
    averageIndividual: avgIndividual,
    flowCoherence: getFlowCoherence(tweets.filter((t) => t.text.trim().length > 0), individualScores),
    pacing: getPacingScore(individualScores),
    consistency: getConsistencyScore(individualScores),
  }

  const total = Math.max(
    0,
    Math.min(
      100,
      breakdown.averageIndividual +
        breakdown.flowCoherence +
        breakdown.pacing +
        breakdown.consistency
    )
  )

  return {
    total,
    breakdown,
    individualScores,
    suggestions: generateThreadSuggestions(individualScores, breakdown),
    warnings: generateThreadWarnings(tweets),
    grade: getGrade(total),
  }
}
