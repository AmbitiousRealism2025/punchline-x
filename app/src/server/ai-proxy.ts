import OpenAI from 'openai'

const ZAI_BASE_URL = 'https://api.z.ai/api/coding/paas/v4/'
const ZAI_MODEL = 'glm-4.7'

interface VoiceProfile {
  tone: 1 | 2 | 3 | 4 | 5
  formality: 'formal' | 'neutral' | 'casual'
  humorLevel: 'none' | 'low' | 'medium' | 'high'
  emojiUsage: 'never' | 'rarely' | 'often' | 'always'
  topicPreferences?: string[]
}

function getApiKey(): string {
  const key = process.env.ZAI_API_KEY
  if (!key) {
    throw new Error('ZAI_API_KEY environment variable not set')
  }
  return key
}

function buildVoiceSystemPrompt(profile: VoiceProfile): string {
  const toneMap = {
    1: 'very formal',
    2: 'formal',
    3: 'neutral',
    4: 'casual',
    5: 'very casual'
  }
  const tone = toneMap[profile.tone] || 'neutral'

  return `You are a viral tweet expert. Generate content matching this voice:
- Tone: ${tone}
- Formality: ${profile.formality}
- Humor level: ${profile.humorLevel}
- Emoji usage: ${profile.emojiUsage}
- Topics: ${profile.topicPreferences?.join(', ') || 'general'}

Match the style of the example tweets provided.`
}

function buildFewShotMessages(examples: string[]): Array<{role: 'user' | 'assistant', content: string}> {
  if (!examples?.length) return []

  return examples.flatMap((tweet, i) => [
    { role: 'user' as const, content: `Example of my writing style ${i + 1}:` },
    { role: 'assistant' as const, content: tweet }
  ])
}

const client = new OpenAI({
  apiKey: getApiKey(),
  baseURL: ZAI_BASE_URL,
})

console.log('Using ZAI GLM 4.7 at', ZAI_BASE_URL)

const HOOK_PROMPT = `You are a viral tweet expert. Generate 5 compelling tweet hooks for the given topic.

Use these proven styles (one each):
1. Contrarian - Challenge conventional wisdom ("Unpopular opinion:", "Actually...", "Hot take:")
2. Number-based - Specific numbers build credibility ("7 things...", "I spent 100 hours...", "3 mistakes...")
3. Story opener - Personal narratives hook readers ("6 months ago, I...", "I just realized...", "True story:")
4. Question - Engage curiosity ("What if...", "Why do...", "Have you ever...")
5. Pattern interrupt - Stop the scroll ("Stop doing X", "Wait...", "This changed everything:")

Make each hook:
- Under 50 characters when possible (leaves room for content)
- Emotionally triggering (curiosity, surprise, or controversy)
- Specific, not generic

Return ONLY a JSON array:
[{"hook": "...", "style": "contrarian|number|story|question|interrupt"}]

Do not include any other text, markdown, or explanation.`

const REWRITE_PROMPT = `You are a tweet improvement assistant. Generate 3-5 alternative versions of the user's tweet.

CRITICAL - Voice Preservation Rules:
1. PRESERVE the core message and intent exactly - no topic drift
2. MAINTAIN the user's unique voice markers:
   - Vocabulary level (simple/sophisticated/technical)
   - Sentence structure (short/long, simple/complex)
   - Punctuation style (minimal/expressive/formal)
   - Emoji usage (none/sparse/frequent)
   - Capitalization patterns (standard/ALL CAPS/lowercase)
   - Slang, abbreviations, or industry jargon

3. OPTIMIZE for engagement while keeping their voice:
   - Add line breaks for readability (if original is dense)
   - Front-load the hook (strongest point first)
   - Use power words that match their tone
   - Add strategic emphasis (bold claims, specific numbers)
   - Improve rhythm and flow

4. KEEP the exact same tone:
   - Professional → stay professional
   - Casual → stay casual
   - Humorous → stay humorous
   - Serious → stay serious

DO NOT:
- Change the fundamental message or topic
- Add facts, stats, or information not in the original
- Completely rewrite in a different voice or style
- Make it sound like a different person wrote it
- Add corporate/marketing speak to casual tweets
- Remove personality to make it more "professional"

Return ONLY a JSON array of alternative tweet texts:
["alternative 1", "alternative 2", "alternative 3"]

Do not include any other text, markdown, or explanation.`

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:5173',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

const MAX_TOPIC_LENGTH = 500
const MAX_TWEET_LENGTH = 2000

function createErrorResponse(message: string, status: number = 400) {
  return new Response(
    JSON.stringify({ error: message }),
    { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  )
}

function validateArrayResponse(data: unknown, minLength: number = 1): data is unknown[] {
  return Array.isArray(data) && data.length >= minLength
}

Bun.serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url)

    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    if (req.method === 'POST' && url.pathname === '/api/generate-hooks') {
      try {
        let body
        try {
          body = await req.json()
        } catch (parseError) {
          return createErrorResponse('Invalid JSON in request body')
        }

        const { topic, voiceProfile, exampleTweets } = body

        if (!topic || typeof topic !== 'string') {
          return createErrorResponse('Topic is required and must be a string')
        }

        if (topic.trim().length === 0) {
          return createErrorResponse('Topic cannot be empty')
        }

        if (topic.length > MAX_TOPIC_LENGTH) {
          return createErrorResponse(`Topic must be ${MAX_TOPIC_LENGTH} characters or less`)
        }

        const messages: Array<{role: 'system' | 'user' | 'assistant', content: string}> = []

        if (voiceProfile) {
          messages.push({
            role: 'system',
            content: buildVoiceSystemPrompt(voiceProfile)
          })
        }

        if (exampleTweets && Array.isArray(exampleTweets) && exampleTweets.length > 0) {
          messages.push(...buildFewShotMessages(exampleTweets))
        }

        messages.push({
          role: 'user',
          content: `${HOOK_PROMPT}\n\nTopic: "${topic}"`
        })

        const completion = await client.chat.completions.create({
          model: ZAI_MODEL,
          max_tokens: 2048,
          temperature: 0.7,
          messages,
        })

        const message = completion.choices[0]?.message
        const content = message?.content || (message as any)?.reasoning_content

        if (!content) {
          return createErrorResponse('No response from AI model', 500)
        }

        const jsonMatch = content.match(/\[[\s\S]*\]/)
        if (!jsonMatch) {
          return createErrorResponse('AI response format invalid', 500)
        }

        try {
          const parsed = JSON.parse(jsonMatch[0])
          if (!validateArrayResponse(parsed, 1)) {
            return createErrorResponse('AI response must be a non-empty array', 500)
          }

          for (const hook of parsed) {
            if (!hook || typeof hook !== 'object' || !hook.hook || !hook.style) {
              return createErrorResponse('Invalid hook structure in AI response', 500)
            }
          }

          return new Response(jsonMatch[0], {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        } catch (parseError) {
          return createErrorResponse('Failed to parse AI response', 500)
        }
      } catch (error) {
        console.error('AI Error:', error)
        const message = error instanceof Error ? error.message : 'AI generation failed'
        return createErrorResponse(message, 500)
      }
    }

    if (req.method === 'POST' && url.pathname === '/api/rewrite-tweet') {
      try {
        let body
        try {
          body = await req.json()
        } catch (parseError) {
          return createErrorResponse('Invalid JSON in request body')
        }

        const { text, mediaType, hasLink } = body

        if (!text || typeof text !== 'string') {
          return createErrorResponse('Tweet text is required and must be a string')
        }

        if (text.trim().length === 0) {
          return createErrorResponse('Tweet text cannot be empty')
        }

        if (text.length > MAX_TWEET_LENGTH) {
          return createErrorResponse(`Tweet text must be ${MAX_TWEET_LENGTH} characters or less`)
        }

        const completion = await client.chat.completions.create({
          model: ZAI_MODEL,
          max_tokens: 2000,
          temperature: 0.7,
          messages: [{
            role: 'user',
            content: `${REWRITE_PROMPT}\n\nOriginal tweet: "${text}"`,
          }],
        })

        const message = completion.choices[0]?.message
        const content = message?.content || (message as any)?.reasoning_content

        if (!content) {
          return createErrorResponse('No response from AI model', 500)
        }

        const jsonMatch = content.match(/\[[\s\S]*\]/)
        if (!jsonMatch) {
          return createErrorResponse('AI response format invalid', 500)
        }

        try {
          const alternatives = JSON.parse(jsonMatch[0])
          if (!validateArrayResponse(alternatives, 1)) {
            return createErrorResponse('AI response must be a non-empty array', 500)
          }

          for (const alt of alternatives) {
            if (typeof alt !== 'string') {
              return createErrorResponse('Invalid alternative format in AI response', 500)
            }
          }

          return new Response(
            JSON.stringify({ alternatives }),
            { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        } catch (parseError) {
          return createErrorResponse('Failed to parse AI response', 500)
        }
      } catch (error) {
        console.error('AI Error:', error)
        const message = error instanceof Error ? error.message : 'AI generation failed'
        return createErrorResponse(message, 500)
      }
    }

    return new Response('Not found', { status: 404, headers: corsHeaders })
  },
})

console.log('AI proxy server running on http://localhost:3001')
