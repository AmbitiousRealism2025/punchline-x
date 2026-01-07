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

export interface TweetLogEntry {
  text: string
  score: number
  mediaType: string
  hasLink: boolean
  templateId?: string
  copiedAt: number
}

export interface AlternativesEntry {
  originalText: string
  version1?: string
  score1?: number
  version2?: string
  score2?: number
  version3?: string
  score3?: number
  version4?: string
  score4?: number
  version5?: string
  score5?: number
  createdAt: number
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

export function saveAlternatives(entry: Omit<AlternativesEntry, 'createdAt'>): string {
  const id = `alt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  store.setRow('alternatives', id, {
    ...entry,
    createdAt: Date.now(),
  })
  return id
}

export function getAlternatives(): Array<AlternativesEntry & { id: string }> {
  const rows = store.getTable('alternatives')
  return Object.entries(rows)
    .map(([id, row]) => ({
      id,
      originalText: row.originalText as string,
      version1: row.version1 as string | undefined,
      score1: row.score1 as number | undefined,
      version2: row.version2 as string | undefined,
      score2: row.score2 as number | undefined,
      version3: row.version3 as string | undefined,
      score3: row.score3 as number | undefined,
      version4: row.version4 as string | undefined,
      score4: row.score4 as number | undefined,
      version5: row.version5 as string | undefined,
      score5: row.score5 as number | undefined,
      createdAt: row.createdAt as number,
    }))
    .sort((a, b) => b.createdAt - a.createdAt)
}

export interface Alternative {
  text: string
  score: number
}

export function serializeAlternatives(
  originalText: string,
  alternatives: Alternative[]
): Omit<AlternativesEntry, 'createdAt'> {
  const entry: Omit<AlternativesEntry, 'createdAt'> = { originalText }

  alternatives.slice(0, 5).forEach((alt, index) => {
    const num = (index + 1) as 1 | 2 | 3 | 4 | 5
    entry[`version${num}`] = alt.text
    entry[`score${num}`] = alt.score
  })

  return entry
}

export function deserializeAlternatives(entry: AlternativesEntry): Alternative[] {
  const alternatives: Alternative[] = []

  for (let i = 1; i <= 5; i++) {
    const text = entry[`version${i}` as keyof AlternativesEntry]
    const score = entry[`score${i}` as keyof AlternativesEntry]

    if (text && typeof text === 'string' && score && typeof score === 'number') {
      alternatives.push({ text, score })
    }
  }

  return alternatives
}

const persister = createLocalPersister(store, 'tweet-optimizer')
persister.startAutoSave()
persister.startAutoLoad()

export { persister }
