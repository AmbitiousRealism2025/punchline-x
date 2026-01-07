const hookPatterns = {
  patternInterrupt: [
    /^stop\s/i,
    /^wait\s/i,
    /^hold\s+on/i,
    /^hear\s+me\s+out/i,
    /^unpopular\s+opinion/i,
    /^hot\s+take/i,
    /^controversial/i,
  ],
  curiosityGap: [
    /^the\s+(?:real|actual|true)\s+reason/i,
    /^what\s+(?:nobody|no\s+one)\s+tells/i,
    /^the\s+secret\s+to/i,
    /^why\s+(?:most|everyone)/i,
  ],
  contrarian: [
    /^actually,?\s/i,
    /^unpopular\s+opinion/i,
    /^hot\s+take/i,
    /^controversial/i,
    /^i\s+(?:disagree|don't\s+think)/i,
  ],
  storyOpener: [
    /^i\s+just/i,
    /^yesterday/i,
    /^last\s+(?:week|month|year)/i,
    /^(?:2|3|4|5|6|7|8|9|10)\s+(?:years?|months?|weeks?)\s+ago/i,
    /^when\s+i\s+(?:was|started)/i,
  ],
  genericOpener: [
    /^just\s+wanted\s+to/i,
    /^here(?:'s|\s+is)\s+(?:some|a)/i,
    /^sharing\s/i,
    /^thought\s+(?:i'd|i\s+would)/i,
    /^check\s+out/i,
  ],
}

export function analyzeHook(text: string): number {
  if (!text.trim()) return 0

  const firstLine = text.split('\n')[0]
  const words = firstLine.split(/\s+/).filter((w) => w.length > 0)
  let score = 0

  if (words.length <= 10) score += 10
  if (words.length > 20) score -= 5

  if (firstLine.trim().endsWith('?')) score += 10

  if (/\d/.test(firstLine)) score += 10

  for (const [type, patterns] of Object.entries(hookPatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(firstLine)) {
        switch (type) {
          case 'patternInterrupt':
            score += 15
            break
          case 'curiosityGap':
            score += 10
            break
          case 'contrarian':
            score += 15
            break
          case 'storyOpener':
            score += 10
            break
          case 'genericOpener':
            score -= 5
            break
        }
        break
      }
    }
  }

  return Math.min(score, 25)
}

export function getHookType(text: string): string {
  const firstLine = text.split('\n')[0]

  for (const [type, patterns] of Object.entries(hookPatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(firstLine)) return type
    }
  }

  if (firstLine.trim().endsWith('?')) return 'question'
  if (/\d/.test(firstLine)) return 'number'

  return 'generic'
}
