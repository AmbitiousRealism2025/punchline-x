import type {
  ScoreInput,
  ScoreBreakdown,
  Suggestion,
  ScoreResult,
  ThreadScoreBreakdown,
} from './types'

export function generateSuggestions(
  input: ScoreInput,
  breakdown: ScoreBreakdown
): Suggestion[] {
  const suggestions: Suggestion[] = []

  if (input.mediaType === 'none') {
    suggestions.push({
      type: 'media',
      priority: 'high',
      message: 'Add an image or video for +20-40 points',
      impact: '+20 to +40',
    })
  }

  if (input.hasLink && !input.isPremium) {
    suggestions.push({
      type: 'critical',
      priority: 'critical',
      message: 'External links get near-zero reach without Premium',
      impact: '-50',
    })
  }

  if (breakdown.hook < 10) {
    suggestions.push({
      type: 'hook',
      priority: 'high',
      message:
        'Strengthen your hook with a number, question, or pattern interrupt',
      impact: '+10 to +25',
    })
  }

  if (!input.text.includes('?')) {
    suggestions.push({
      type: 'engagement',
      priority: 'medium',
      message: 'Add a question to increase replies',
      impact: '+10',
    })
  }

  if (breakdown.timing < 0) {
    suggestions.push({
      type: 'timing',
      priority: 'medium',
      message: 'Consider posting during peak hours (8-11am PST)',
      impact: '+15',
    })
  }

  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
  return suggestions.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  )
}

export function generateThreadSuggestions(
  tweets: ScoreInput[],
  individualScores: ScoreResult[],
  breakdown: ThreadScoreBreakdown
): Suggestion[] {
  const suggestions: Suggestion[] = []

  if (tweets.length < 2) {
    return suggestions
  }

  // Hook placement analysis - first tweet
  const firstTweet = individualScores[0]
  if (firstTweet && firstTweet.breakdown.hook < 15) {
    suggestions.push({
      type: 'hook',
      priority: 'high',
      message: 'Strengthen your opening tweet with a compelling hook',
      impact: '+15 to +25',
    })
  }

  if (firstTweet && firstTweet.total < 60) {
    suggestions.push({
      type: 'hook',
      priority: 'high',
      message: 'First tweet sets the tone - aim for 60+ score to hook readers',
      impact: '+20',
    })
  }

  // Buildup pacing analysis - middle tweets
  if (tweets.length >= 4) {
    const middleScores = individualScores.slice(1, -1)
    const avgMiddle =
      middleScores.reduce((sum, s) => sum + s.total, 0) / middleScores.length
    const lowMiddleTweets = middleScores.filter((s) => s.total < 50)

    if (lowMiddleTweets.length > 0) {
      suggestions.push({
        type: 'engagement',
        priority: 'medium',
        message: `${lowMiddleTweets.length} middle tweet(s) are weak - maintain momentum`,
        impact: '+10 to +20',
      })
    }

    if (avgMiddle < 55) {
      suggestions.push({
        type: 'engagement',
        priority: 'medium',
        message: 'Build momentum in middle tweets with questions or insights',
        impact: '+10',
      })
    }
  }

  // Climax positioning - check for peak
  const scores = individualScores.map((s) => s.total)
  const maxScore = Math.max(...scores)
  const maxIndex = scores.indexOf(maxScore)
  const isClimaxAtEnd = maxIndex >= scores.length - 2

  if (!isClimaxAtEnd && maxIndex < scores.length * 0.5) {
    suggestions.push({
      type: 'engagement',
      priority: 'medium',
      message: 'Consider building to a climax in the final third of your thread',
      impact: '+10 to +15',
    })
  }

  // CTA placement - last tweet
  const lastTweet = tweets[tweets.length - 1]
  const lastScore = individualScores[individualScores.length - 1]
  const hasCTA =
    lastTweet &&
    (lastTweet.text.includes('?') ||
      /\b(reply|comment|share|retweet|follow|join|subscribe|learn|check|visit|read|download)\b/i.test(
        lastTweet.text
      ))

  if (!hasCTA) {
    suggestions.push({
      type: 'engagement',
      priority: 'high',
      message: 'Add a call-to-action in your final tweet (question, invite, etc.)',
      impact: '+15 to +20',
    })
  }

  if (lastScore && lastScore.total < 55) {
    suggestions.push({
      type: 'engagement',
      priority: 'high',
      message: 'Strengthen your closing tweet - it drives final engagement',
      impact: '+15',
    })
  }

  // Flow coherence
  if (breakdown.flowCoherence < 0) {
    suggestions.push({
      type: 'engagement',
      priority: 'medium',
      message: 'Improve thread flow with consistent length and style',
      impact: '+5 to +10',
    })
  }

  // Pacing issues
  if (breakdown.pacing < 0) {
    suggestions.push({
      type: 'engagement',
      priority: 'medium',
      message: 'Build momentum toward the end rather than front-loading quality',
      impact: '+10',
    })
  }

  // Consistency issues
  if (breakdown.consistency < 0) {
    suggestions.push({
      type: 'engagement',
      priority: 'low',
      message: 'Balance tweet quality - avoid big gaps between strong and weak tweets',
      impact: '+5',
    })
  }

  // Overall quality check
  const lowScoreTweets = individualScores.filter((s) => s.total < 50)
  if (lowScoreTweets.length > 0) {
    suggestions.push({
      type: 'critical',
      priority: 'critical',
      message: `${lowScoreTweets.length} tweet(s) have critical scores - revise before posting`,
      impact: 'Thread performance limited by weakest tweets',
    })
  }

  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 }
  return suggestions.sort(
    (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
  )
}

export function generateWarnings(input: ScoreInput): string[] {
  const warnings: string[] = []

  if (input.hasLink && !input.isPremium) {
    warnings.push('⚠️ CRITICAL: Links without Premium get near-zero reach')
  }

  const capsWords = (input.text.match(/\b[A-Z]{3,}\b/g) || []).length
  if (capsWords >= 3) {
    warnings.push('Too many ALL CAPS words may trigger spam filters')
  }

  const hashtagCount = (input.text.match(/#\w+/g) || []).length
  if (hashtagCount >= 4) {
    warnings.push('Too many hashtags signals spam to the algorithm')
  }

  return warnings
}
