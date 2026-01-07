import type { VoiceProfile } from '../store'

export interface GeneratedHook {
  hook: string
  style: 'contrarian' | 'number' | 'story' | 'question' | 'interrupt'
}

export async function generateHooks(
  topic: string,
  voiceProfile?: VoiceProfile,
  exampleTweets?: string[]
): Promise<GeneratedHook[]> {
  const response = await fetch('http://localhost:3001/api/generate-hooks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic, voiceProfile, exampleTweets }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to generate hooks')
  }

  const text = await response.text()

  const jsonMatch = text.match(/\[[\s\S]*\]/)
  if (!jsonMatch) {
    throw new Error('Invalid response format')
  }

  return JSON.parse(jsonMatch[0])
}
