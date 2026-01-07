export type MediaType = 'none' | 'image' | 'video' | 'gif' | 'poll'

export interface ScoreInput {
  text: string
  mediaType: MediaType
  hasLink: boolean
  isPremium: boolean
  isVerified?: boolean
  postTime?: Date
}

export interface ScoreBreakdown {
  base: number
  media: number
  hook: number
  engagement: number
  timing: number
  account: number
  quality: number
}

export interface Suggestion {
  type: 'media' | 'hook' | 'engagement' | 'timing' | 'critical'
  priority: 'critical' | 'high' | 'medium' | 'low'
  message: string
  impact: string
}

export type Grade = 'excellent' | 'good' | 'fair' | 'poor' | 'critical'

export interface ScoreResult {
  total: number
  breakdown: ScoreBreakdown
  suggestions: Suggestion[]
  warnings: string[]
  grade: Grade
}

export interface ThreadScoreBreakdown {
  averageIndividual: number
  flowCoherence: number
  pacing: number
  consistency: number
}

export interface ThreadScoreResult {
  total: number
  breakdown: ThreadScoreBreakdown
  individualScores: ScoreResult[]
  suggestions: Suggestion[]
  warnings: string[]
  grade: Grade
}
