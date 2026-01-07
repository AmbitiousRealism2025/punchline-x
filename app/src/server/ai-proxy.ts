import OpenAI from 'openai'

const ZAI_BASE_URL = 'https://api.z.ai/api/coding/paas/v4/'
const ZAI_MODEL = 'glm-4.7'

function getApiKey(): string {
  const key = process.env.ZAI_API_KEY
  if (!key) {
    throw new Error('ZAI_API_KEY environment variable not set')
  }
  return key
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

Bun.serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url)

    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders })
    }

    if (req.method === 'POST' && url.pathname === '/api/generate-hooks') {
      try {
        const { topic } = await req.json()

        if (!topic || typeof topic !== 'string') {
          return new Response(
            JSON.stringify({ error: 'Topic is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        console.log(`Generating hooks for: "${topic}" using ${ZAI_MODEL}`)

        const completion = await client.chat.completions.create({
          model: ZAI_MODEL,
          max_tokens: 2048,
          temperature: 0.7,
          messages: [{
            role: 'user',
            content: `${HOOK_PROMPT}\n\nTopic: "${topic}"`,
          }],
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

    if (req.method === 'POST' && url.pathname === '/api/rewrite-tweet') {
      try {
        const { text, mediaType, hasLink } = await req.json()

        if (!text || typeof text !== 'string') {
          return new Response(
            JSON.stringify({ error: 'Tweet text is required' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
        }

        if (text.trim().length === 0) {
          return new Response(
            JSON.stringify({ error: 'Tweet text cannot be empty' }),
            { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
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

        if (content) {
          const jsonMatch = content.match(/\[[\s\S]*\]/)
          if (jsonMatch) {
            const alternatives = JSON.parse(jsonMatch[0])
            return new Response(
              JSON.stringify({ alternatives }),
              { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            )
          }
          return new Response(
            JSON.stringify({ error: 'Invalid response format from model' }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
          )
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
