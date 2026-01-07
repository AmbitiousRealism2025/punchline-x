export function getContentQualityScore(text: string): number {
  const charCount = text.length
  const hashtagCount = (text.match(/#\w+/g) || []).length

  let score = 0

  if (charCount >= 100 && charCount <= 200) score += 10
  else if (charCount < 50 && charCount > 0) score -= 5
  else if (charCount > 250) score -= 5

  if (/🧵|thread:/i.test(text)) score += 5

  if (/^\s*[\d•\-]\s/m.test(text)) score += 5

  if (hashtagCount >= 1 && hashtagCount <= 3) score += 5
  else if (hashtagCount >= 4) score -= 10

  return score
}
