const transitionPatterns = [
  /^but\s/i,
  /^however\s/i,
  /^so\s/i,
  /^therefore\s/i,
  /^meanwhile\s/i,
  /^next\s/i,
  /^then\s/i,
  /^first\s/i,
  /^second\s/i,
  /^finally\s/i,
  /^in\s+conclusion\s/i,
  /^that\s+said\s/i,
  /^here's\s+the\s+thing\s/i,
]

const narrativeMarkers = [
  /^let\s+me\s+explain/i,
  /^here's\s+why/i,
  /^the\s+problem\s+is/i,
  /^the\s+solution\s+is/i,
  /^remember\s+when/i,
  /^going\s+back\s+to/i,
  /^as\s+I\s+mentioned/i,
]

const pacingIndicators = [
  /^quick\s/i,
  /^wait\s/i,
  /^hold\s+on\s/i,
  /^pause\s/i,
  /^breaking\s+it\s+down/i,
  /^tldr/i,
]

export function analyzeFlow(tweets: string[]): number {
  if (tweets.length < 2) return 0

  let score = 0

  const hasTransitions = tweets.slice(1).some(tweet =>
    transitionPatterns.some(pattern => pattern.test(tweet))
  )
  if (hasTransitions) score += 5

  const hasNarrativeMarkers = tweets.some(tweet =>
    narrativeMarkers.some(pattern => pattern.test(tweet))
  )
  if (hasNarrativeMarkers) score += 5

  const hasPacingIndicators = tweets.some(tweet =>
    pacingIndicators.some(pattern => pattern.test(tweet))
  )
  if (hasPacingIndicators) score += 3

  const lengths = tweets.map(t => t.length)
  const avgLength = lengths.reduce((sum, len) => sum + len, 0) / lengths.length
  const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avgLength, 2), 0) / lengths.length
  const stdDev = Math.sqrt(variance)

  if (avgLength > 0 && stdDev / avgLength > 0.3 && stdDev / avgLength < 0.7) {
    score += 5
  }

  const firstTweet = tweets[0]
  const lastTweet = tweets[tweets.length - 1]

  if (firstTweet.includes('?') || /^why\s/i.test(firstTweet) || /^what\s/i.test(firstTweet)) {
    score += 3
  }

  if (lastTweet.includes('?') || /reply\s/i.test(lastTweet) || /comment\s/i.test(lastTweet) || /share\s/i.test(lastTweet)) {
    score += 4
  }

  const allSameLength = lengths.every(len => Math.abs(len - avgLength) < 20)
  if (allSameLength && tweets.length > 3) score -= 5

  const allVeryShort = lengths.every(len => len < 80)
  if (allVeryShort && tweets.length > 3) score -= 5

  return Math.max(Math.min(score, 15), -10)
}
