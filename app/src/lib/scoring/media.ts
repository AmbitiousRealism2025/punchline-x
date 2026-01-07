import type { MediaType } from './types'

const mediaScores: Record<MediaType, number> = {
  video: 40,
  image: 20,
  gif: 15,
  poll: 20,
  none: 0,
}

export function getMediaScore(
  mediaType: MediaType,
  hasLink: boolean,
  isPremium: boolean
): number {
  let score = mediaScores[mediaType]

  if (hasLink) {
    const linkPenalty = isPremium ? -20 : -50
    score = Math.min(score, linkPenalty)
  }

  return score
}
