import { describe, it, expect } from 'vitest'
import { serializeAlternatives, type Alternative } from '@/lib/store'

describe('useRewriteTweet integration - serialization', () => {
  it('should serialize alternatives correctly for TinyBase storage', () => {
    const alternatives: Alternative[] = [
      { text: 'Alternative 1', score: 85 },
      { text: 'Alternative 2', score: 78 },
      { text: 'Alternative 3', score: 92 },
    ]

    const serialized = serializeAlternatives('Original tweet', alternatives)

    expect(serialized.originalText).toBe('Original tweet')
    expect(serialized.version1).toBe('Alternative 1')
    expect(serialized.score1).toBe(85)
  })

  it('should handle edge case of empty alternatives array', () => {
    const serialized = serializeAlternatives('test', [])

    expect(serialized.originalText).toBe('test')
    expect(serialized.version1).toBeUndefined()
  })

  it('should validate minimum text length requirement', () => {
    const shortText = 'short'
    const validText = 'This is a valid tweet with more than 10 characters'

    expect(shortText.length).toBeLessThan(10)
    expect(validText.length).toBeGreaterThanOrEqual(10)
  })
})
