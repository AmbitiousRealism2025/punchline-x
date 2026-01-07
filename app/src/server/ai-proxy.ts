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

const corsHeaders = {
  'Access-Control-Allow-Origin': 'http://localhost:5173',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
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
        const { topic, voiceProfile, exampleTweets } = await req.json()

        if (!topic || typeof topic !== 'string') {
          return new Response(
            JSON.stringify({ error: 'Topic is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        console.log(`Generating hooks for: "${topic}" using ${ZAI_MODEL}`)

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
        
        if (content) {
          console.log('Generated hooks successfully')
          const jsonMatch = content.match(/\[[\s\S]*\]/)
          if (jsonMatch) {
            return new Response(jsonMatch[0], {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            })
          }
          return new Response(content, {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          })
        }

        console.error('No content in response:', JSON.stringify(completion.choices[0]))
        return new Response(
          JSON.stringify({ error: 'No text response from model' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      } catch (error) {
        console.error('AI Error:', error)
        const message = error instanceof Error ? error.message : 'AI generation failed'
        return new Response(
          JSON.stringify({ error: message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    return new Response('Not found', { status: 404, headers: corsHeaders })
  },
})

console.log('AI proxy server running on http://localhost:3001')
