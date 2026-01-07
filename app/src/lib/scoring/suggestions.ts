import type { ScoreInput, ScoreBreakdown, Suggestion } from './types'

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
