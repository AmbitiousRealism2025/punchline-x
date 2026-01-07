import { createStore } from 'tinybase'
import { createLocalPersister } from 'tinybase/persisters/persister-browser'

export const store = createStore()

store.setRow('settings', 'user', {
  isPremium: false,
  isVerified: false,
  timezone: 'America/Los_Angeles',
})

store.setRow('currentTweet', 'draft', {
  text: '',
  mediaType: 'none',
  hasLink: false,
})

store.setRow('voiceProfile', 'user', {
  tone: 3,
  formality: 'neutral',
  humorLevel: 'medium',
  emojiUsage: 'rarely',
})

export interface TweetLogEntry {
  text: string
  score: number
  mediaType: string
  hasLink: boolean
  templateId?: string
  copiedAt: number
  voiceMatchScore?: number
}

export interface VoiceProfile {
  tone: 1 | 2 | 3 | 4 | 5
  formality: 'formal' | 'neutral' | 'casual'
  humorLevel: 'none' | 'low' | 'medium' | 'high'
  emojiUsage: 'never' | 'rarely' | 'often' | 'always'
  topicPreferences?: string[]
}

export interface ExampleTweet {
  id: string
  text: string
  addedAt: number
}

export function logTweet(entry: Omit<TweetLogEntry, 'copiedAt'>): string {
  const id = `tweet_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  store.setRow('tweetLog', id, {
    ...entry,
    copiedAt: Date.now(),
  })
  return id
}

export function getTweetHistory(): Array<TweetLogEntry & { id: string }> {
  const rows = store.getTable('tweetLog')
  return Object.entries(rows)
    .map(([id, row]) => ({
      id,
      text: row.text as string,
      score: row.score as number,
      mediaType: row.mediaType as string,
      hasLink: row.hasLink as boolean,
      templateId: row.templateId as string | undefined,
      copiedAt: row.copiedAt as number,
      voiceMatchScore: row.voiceMatchScore as number | undefined,
    }))
    .sort((a, b) => b.copiedAt - a.copiedAt)
}

export function setVoiceProfile(profile: VoiceProfile): void {
  store.setRow('voiceProfile', 'user', {
    tone: profile.tone,
    formality: profile.formality,
    humorLevel: profile.humorLevel,
    emojiUsage: profile.emojiUsage,
    topicPreferences: profile.topicPreferences ? JSON.stringify(profile.topicPreferences) : '',
  })
}

export function getVoiceProfile(): VoiceProfile | null {
  const row = store.getRow('voiceProfile', 'user')
  if (!row || Object.keys(row).length === 0) {
    return null
  }

  let topicPreferences: string[] | undefined
  if (row.topicPreferences && typeof row.topicPreferences === 'string') {
    try {
      const parsed = JSON.parse(row.topicPreferences)
      topicPreferences = Array.isArray(parsed) ? parsed : undefined
    } catch {
      topicPreferences = undefined
    }
  }

  return {
    tone: row.tone as VoiceProfile['tone'],
    formality: row.formality as VoiceProfile['formality'],
    humorLevel: row.humorLevel as VoiceProfile['humorLevel'],
    emojiUsage: row.emojiUsage as VoiceProfile['emojiUsage'],
    topicPreferences,
  }
}

export function addExampleTweet(text: string): string {
  const id = `example_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  store.setRow('exampleTweets', id, {
    text,
    addedAt: Date.now(),
  })
  return id
}

export function getExampleTweets(): ExampleTweet[] {
  const rows = store.getTable('exampleTweets')
  return Object.entries(rows)
    .map(([id, row]) => ({
      id,
      text: row.text as string,
      addedAt: row.addedAt as number,
    }))
    .sort((a, b) => a.addedAt - b.addedAt)
}

export function deleteExampleTweet(id: string): void {
  store.delRow('exampleTweets', id)
}

const persister = createLocalPersister(store, 'tweet-optimizer')
persister.startAutoSave()
persister.startAutoLoad()

export { persister }
