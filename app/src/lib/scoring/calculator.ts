import type { ScoreInput, ScoreBreakdown, ScoreResult, Grade } from './types'
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
