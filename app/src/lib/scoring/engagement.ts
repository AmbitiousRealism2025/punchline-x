const selfPromoPatterns = [
  /check\s+out\s+my/i,
  /buy\s+my/i,
  /get\s+my/i,
  /subscribe\s+to\s+my/i,
  /follow\s+me/i,
  /link\s+in\s+bio/i,
  /use\s+(?:my\s+)?code/i,
  /(?:50|25|20|10)%\s+off/i,
]

const ctaPatterns = [
  /reply\s/i,
  /comment\s/i,
  /share\s/i,
  /what\s+do\s+you\s+think/i,
  /agree\s*\?/i,
  /disagree\s*\?/i,
  /\[drop\s+your/i,
]

export function getEngagementScore(text: string): number {
  let score = 0

  if (text.includes('?')) score += 10

  for (const pattern of ctaPatterns) {
    if (pattern.test(text)) {
      score += 10
      break
    }
  }

  if (/what\s+do\s+you\s+think/i.test(text)) score += 5

  const emojiCount = (text.match(/[\u{1F300}-\u{1F9FF}]/gu) || []).length
  if (emojiCount >= 1 && emojiCount <= 3) score += 5
  if (emojiCount >= 4) score -= 5

  const capsWords = (text.match(/\b[A-Z]{3,}\b/g) || []).length
  if (capsWords >= 1 && capsWords <= 2) score += 5
  if (capsWords >= 3) score -= 10

  for (const pattern of selfPromoPatterns) {
    if (pattern.test(text)) {
      score -= 15
      break
    }
  }

  return Math.min(score, 25)
}
