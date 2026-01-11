import { describe, it, expect } from 'vitest'
import {
  serializeAlternatives,
  deserializeAlternatives,
  type Alternative,
  type AlternativesEntry,
} from './index'

describe('serializeAlternatives', () => {
  it('should serialize alternatives array to flat structure', () => {
    const originalText = 'Original tweet text'
    const alternatives: Alternative[] = [
      { text: 'Alternative 1', score: 85 },
      { text: 'Alternative 2', score: 78 },
      { text: 'Alternative 3', score: 92 },
    ]

    const result = serializeAlternatives(originalText, alternatives)

    expect(result.originalText).toBe(originalText)
    expect(result.version1).toBe('Alternative 1')
    expect(result.score1).toBe(85)
    expect(result.version2).toBe('Alternative 2')
    expect(result.score2).toBe(78)
    expect(result.version3).toBe('Alternative 3')
    expect(result.score3).toBe(92)
  })

  it('should handle maximum 5 alternatives', () => {
    const alternatives: Alternative[] = [
      { text: 'Alt 1', score: 1 },
      { text: 'Alt 2', score: 2 },
      { text: 'Alt 3', score: 3 },
      { text: 'Alt 4', score: 4 },
      { text: 'Alt 5', score: 5 },
      { text: 'Alt 6', score: 6 }, // Should be ignored
    ]

    const result = serializeAlternatives('test', alternatives)

    expect(result.version5).toBe('Alt 5')
    expect(result.score5).toBe(5)
    // @ts-expect-error - version6 should not exist
    expect(result.version6).toBeUndefined()
  })

  it('should handle fewer than 5 alternatives', () => {
    const alternatives: Alternative[] = [
      { text: 'Only one', score: 90 },
    ]

    const result = serializeAlternatives('test', alternatives)

    expect(result.version1).toBe('Only one')
    expect(result.score1).toBe(90)
    expect(result.version2).toBeUndefined()
    expect(result.score2).toBeUndefined()
  })
})

describe('deserializeAlternatives', () => {
  it('should deserialize flat structure back to alternatives array', () => {
    const entry: AlternativesEntry = {
      originalText: 'Original',
      version1: 'Alt 1',
      score1: 85,
      version2: 'Alt 2',
      score2: 78,
      createdAt: Date.now(),
    }

    const result = deserializeAlternatives(entry)

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({ text: 'Alt 1', score: 85 })
    expect(result[1]).toEqual({ text: 'Alt 2', score: 78 })
  })

  it('should handle all 5 alternatives', () => {
    const entry: AlternativesEntry = {
      originalText: 'Original',
      version1: 'Alt 1',
      score1: 1,
      version2: 'Alt 2',
      score2: 2,
      version3: 'Alt 3',
      score3: 3,
      version4: 'Alt 4',
      score4: 4,
      version5: 'Alt 5',
      score5: 5,
      createdAt: Date.now(),
    }

    const result = deserializeAlternatives(entry)

    expect(result).toHaveLength(5)
    expect(result[4]).toEqual({ text: 'Alt 5', score: 5 })
  })

  it('should skip missing alternatives', () => {
    const entry: AlternativesEntry = {
      originalText: 'Original',
      version1: 'Alt 1',
      score1: 85,
      // version2 and score2 missing
      version3: 'Alt 3',
      score3: 92,
      createdAt: Date.now(),
    }

    const result = deserializeAlternatives(entry)

    expect(result).toHaveLength(2)
    expect(result[0]).toEqual({ text: 'Alt 1', score: 85 })
    expect(result[1]).toEqual({ text: 'Alt 3', score: 92 })
  })

  it('should handle empty entry', () => {
    const entry: AlternativesEntry = {
      originalText: 'Original',
      createdAt: Date.now(),
    }

    const result = deserializeAlternatives(entry)

    expect(result).toHaveLength(0)
  })
})

describe('serialization round-trip', () => {
  it('should maintain data integrity through serialize and deserialize', () => {
    const original: Alternative[] = [
      { text: 'First alternative', score: 88 },
      { text: 'Second alternative', score: 75 },
      { text: 'Third alternative', score: 91 },
    ]

    const serialized = serializeAlternatives('Original tweet', original)
    const deserialized = deserializeAlternatives({
      ...serialized,
      createdAt: Date.now(),
    })

    expect(deserialized).toEqual(original)
  })
})
