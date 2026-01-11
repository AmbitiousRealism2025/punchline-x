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

export function createThread(title: string): string {
  const id = `thread_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const now = Date.now()
  store.setRow('threads', id, {
    title,
    createdAt: now,
    updatedAt: now,
    tweetCount: 0,
  })
  return id
}

export function getThreads(): Thread[] {
  const rows = store.getTable('threads')
  return Object.entries(rows)
    .map(([id, row]) => ({
      id,
      title: row.title as string,
      createdAt: row.createdAt as number,
      updatedAt: row.updatedAt as number,
      tweetCount: row.tweetCount as number,
    }))
    .sort((a, b) => b.updatedAt - a.updatedAt)
}

export function getThread(threadId: string): Thread | null {
  const row = store.getRow('threads', threadId)
  if (!row) return null
  return {
    id: threadId,
    title: row.title as string,
    createdAt: row.createdAt as number,
    updatedAt: row.updatedAt as number,
    tweetCount: row.tweetCount as number,
  }
}

export function updateThread(threadId: string, title: string): void {
  const thread = getThread(threadId)
  if (!thread) return
  store.setRow('threads', threadId, {
    ...thread,
    title,
    updatedAt: Date.now(),
  })
}

export function deleteThread(threadId: string): void {
  store.delRow('threads', threadId)
  const tweets = getThreadTweets(threadId)
  tweets.forEach((tweet) => {
    store.delRow('threadTweets', tweet.id)
  })
}

export function addThreadTweet(
  threadId: string,
  text: string,
  mediaType: string = 'none',
  hasLink: boolean = false
): string {
  const id = `tweet_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  const thread = getThread(threadId)
  if (!thread) throw new Error('Thread not found')

  const position = thread.tweetCount
  store.setRow('threadTweets', id, {
    threadId,
    text,
    position,
    mediaType,
    hasLink,
  })

  store.setRow('threads', threadId, {
    ...thread,
    tweetCount: thread.tweetCount + 1,
    updatedAt: Date.now(),
  })

  return id
}

export function getThreadTweets(threadId: string): ThreadTweet[] {
  const rows = store.getTable('threadTweets')
  return Object.entries(rows)
    .filter(([, row]) => row.threadId === threadId)
    .map(([id, row]) => ({
      id,
      threadId: row.threadId as string,
      text: row.text as string,
      position: row.position as number,
      mediaType: row.mediaType as string,
      hasLink: row.hasLink as boolean,
    }))
    .sort((a, b) => a.position - b.position)
}

export function updateThreadTweet(
  tweetId: string,
  updates: Partial<Omit<ThreadTweet, 'id' | 'threadId'>>
): void {
  const rows = store.getTable('threadTweets')
  const tweet = rows[tweetId]
  if (!tweet) return

  store.setRow('threadTweets', tweetId, {
    ...tweet,
    ...updates,
  })

  const threadId = tweet.threadId as string
  const thread = getThread(threadId)
  if (thread) {
    store.setRow('threads', threadId, {
      ...thread,
      updatedAt: Date.now(),
    })
  }
}

export function deleteThreadTweet(tweetId: string): void {
  const rows = store.getTable('threadTweets')
  const tweet = rows[tweetId]
  if (!tweet) return

  const threadId = tweet.threadId as string
  const position = tweet.position as number

  store.delRow('threadTweets', tweetId)

  const threadTweets = getThreadTweets(threadId)
  threadTweets.forEach((t) => {
    if (t.position > position) {
      store.setRow('threadTweets', t.id, {
        ...t,
        position: t.position - 1,
      })
    }
  })

  const thread = getThread(threadId)
  if (thread) {
    store.setRow('threads', threadId, {
      ...thread,
      tweetCount: thread.tweetCount - 1,
      updatedAt: Date.now(),
    })
  }
}

export function reorderThreadTweets(threadId: string, tweetIds: string[]): void {
  tweetIds.forEach((tweetId, index) => {
    const rows = store.getTable('threadTweets')
    const tweet = rows[tweetId]
    if (tweet && tweet.threadId === threadId) {
      store.setRow('threadTweets', tweetId, {
        ...tweet,
        position: index,
      })
    }
  })

  const thread = getThread(threadId)
  if (thread) {
    store.setRow('threads', threadId, {
      ...thread,
      updatedAt: Date.now(),
    })
  }
}

const persister = createLocalPersister(store, 'tweet-optimizer')
persister.startAutoSave()
persister.startAutoLoad()

export { persister }
