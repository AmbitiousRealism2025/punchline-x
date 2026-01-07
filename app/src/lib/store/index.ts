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

store.setRow('activeThread', 'current', {
  threadId: null,
  isEditing: false,
})

export interface TweetLogEntry {
  text: string
  score: number
  mediaType: string
  hasLink: boolean
  templateId?: string
  copiedAt: number
}

export interface Thread {
  id: string
  title: string
  createdAt: number
  updatedAt: number
  tweetCount: number
}

export interface ThreadTweet {
  id: string
  threadId: string
  text: string
  position: number
  mediaType: string
  hasLink: boolean
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
    }))
    .sort((a, b) => b.copiedAt - a.copiedAt)
}

const persister = createLocalPersister(store, 'tweet-optimizer')
persister.startAutoSave()
persister.startAutoLoad()

export { persister }
