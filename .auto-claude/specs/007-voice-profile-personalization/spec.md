# Specification: Voice Profile & Personalization

## Overview

Enable users to define persistent voice profiles that automatically adapt all AI-generated content to match their personal writing style. This addresses a major competitor pain point where AI suggestions require heavy manual editing to match personal tone. Users configure voice preferences (formal/casual, humor level, emoji usage, topic preferences) and provide example tweets representing their authentic voice. The AI system uses this profile to generate suggestions that feel authentic and brand-consistent, with a voice match score indicating quality.

## Workflow Type

**Type**: feature

**Rationale**: This introduces new capability for voice-aware AI content generation. It requires new data models (voice profiles, example tweets), new UI components (settings interface), enhanced AI generation logic, and a voice matching system. This is not a refactor or bug fix but a significant feature addition that changes how users interact with AI suggestions.

## Task Scope

### Services Involved
- **Frontend (React/Vite)** (primary) - Voice profile UI, voice match score display, settings management
- **AI Proxy Server (Bun)** (integration) - Enhanced prompt generation with voice parameters, few-shot learning integration
- **TinyBase Store** (data layer) - Voice profile persistence, example tweet storage

### This Task Will:
- [ ] Create voice profile data schema in TinyBase (tone, formality, humor, emoji, topics)
- [ ] Build Settings tab UI for voice profile configuration
- [ ] Implement example tweet input mechanism (2-3 samples)
- [ ] Enhance AI proxy to inject voice parameters into system prompts
- [ ] Implement few-shot learning using example tweets
- [ ] Create voice match scoring algorithm (text similarity + style metrics)
- [ ] Display voice match score for AI-generated content
- [ ] Store match scores in tweetLog for analytics

### Out of Scope:
- Advanced NLP libraries (compromise/natural) - using AI-based approach instead
- Migration from ZAI API to OpenAI (can be done later if needed)
- Multi-persona support (one voice profile per user for MVP)
- Voice profile export/import functionality

## Service Context

### Frontend Application

**Tech Stack:**
- Language: TypeScript
- Framework: React 19.2.0 + Vite 7.2.4
- State Management: TinyBase 7.3.1 (auto-persists to localStorage)
- UI: Radix UI primitives + Tailwind CSS 4.1.18
- Key directories: `app/src/components`, `app/src/lib`

**Entry Point:** `app/src/main.tsx`

**How to Run:**
```bash
cd app
bun install
bun run dev
```

**Port:** 5173 (Vite dev server)

### AI Proxy Server

**Tech Stack:**
- Runtime: Bun
- AI SDK: OpenAI SDK v6.15.0 (currently using ZAI API base URL)
- Model: GLM-4.7 via ZAI API
- Key file: `app/src/server/ai-proxy.ts`

**Entry Point:** `app/src/server/ai-proxy.ts`

**How to Run:**
```bash
cd app/src/server
bun run ai-proxy.ts
```

**Port:** 3001

**Environment Variables:**
- `ZAI_API_KEY` - Current AI API key

## Files to Modify

| File | Service | What to Change |
|------|---------|---------------|
| `app/src/lib/store/index.ts` | Frontend | Add `voiceProfile` and `exampleTweets` tables, create voice profile CRUD functions |
| `app/src/server/ai-proxy.ts` | AI Proxy | Add voice profile injection to prompts, implement few-shot learning, add voice-aware generation endpoint |
| `app/src/App.tsx` | Frontend | Add "Settings" tab to existing Tabs component |
| `app/src/lib/ai/hooks.ts` | Frontend | Extend to support voice profile parameters, add voice match scoring |
| `app/src/components/scorer/TweetInput.tsx` | Frontend | Display voice match score alongside existing score |
| `app/package.json` | Frontend | Add `string-similarity-js` dependency |

## Files to Reference

These files show patterns to follow:

| File | Pattern to Copy |
|------|----------------|
| `app/src/lib/store/index.ts` | TinyBase table schema, row setting, auto-persistence pattern |
| `app/src/components/ai/HookGenerator.tsx` | AI feature component structure, loading states, error handling |
| `app/src/lib/ai/hooks.ts` | API call pattern to AI proxy server |
| `app/src/server/ai-proxy.ts` | OpenAI SDK usage, prompt engineering, CORS handling, endpoint creation |
| `app/src/components/scorer/MediaToggles.tsx` | Radix UI toggle pattern for settings |
| `app/src/App.tsx` | Tab structure and navigation |

## Patterns to Follow

### TinyBase Store Pattern

From `app/src/lib/store/index.ts`:

```typescript
// Define table schema by setting initial row
store.setRow('settings', 'user', {
  isPremium: false,
  isVerified: false,
  timezone: 'America/Los_Angeles',
})

// Create typed interfaces for data
export interface TweetLogEntry {
  text: string
  score: number
  // ... other fields
}

// Create helper functions for CRUD
export function logTweet(entry: Omit<TweetLogEntry, 'copiedAt'>): string {
  const id = `tweet_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
  store.setRow('tweetLog', id, {
    ...entry,
    copiedAt: Date.now(),
  })
  return id
}

// Auto-persistence is already configured
const persister = createLocalPersister(store, 'tweet-optimizer')
persister.startAutoSave()
persister.startAutoLoad()
```

**Key Points:**
- TinyBase auto-saves to localStorage on every change
- Use `store.setRow(table, id, data)` pattern for all writes
- Create TypeScript interfaces matching table schemas
- Helper functions provide type-safe abstractions

### AI API Integration Pattern

From `app/src/lib/ai/hooks.ts` and `app/src/server/ai-proxy.ts`:

```typescript
// Server-side imports (app/src/server/ai-proxy.ts)
import OpenAI from 'openai'

// Client-side API call (app/src/lib/ai/hooks.ts)
export async function generateHooks(topic: string, voiceProfile?: VoiceProfile): Promise<GeneratedHook[]> {
  const response = await fetch('http://localhost:3001/api/generate-hooks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic, voiceProfile }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || 'Failed to generate hooks')
  }

  return await response.json()
}

// Server-side endpoint (CURRENT pattern for existing hooks)
// NOTE: Existing implementation embeds prompt in user message
if (req.method === 'POST' && url.pathname === '/api/generate-hooks') {
  const completion = await client.chat.completions.create({
    model: ZAI_MODEL,
    max_tokens: 2048,
    temperature: 0.7,
    messages: [{
      role: 'user',
      content: `${HOOK_PROMPT}\n\nTopic: "${topic}"`,
    }],
  })
}

// Server-side endpoint (RECOMMENDED pattern for voice-aware generation)
// Use separate system message for voice persona + few-shot examples
if (req.method === 'POST' && url.pathname === '/api/generate-voice-aware') {
  const systemMessage = buildVoiceSystemPrompt(voiceProfile)
  const exampleMessages = buildFewShotMessages(exampleTweets)

  const completion = await client.chat.completions.create({
    model: ZAI_MODEL,
    max_tokens: 2048,
    temperature: 0.8, // Higher for natural variation
    messages: [
      { role: 'system', content: systemMessage },
      ...exampleMessages, // Few-shot learning
      { role: 'user', content: `Generate hooks for: ${topic}` },
    ],
  })

  const content = completion.choices[0]?.message?.content
  return new Response(content, {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}
```

**Key Points:**
- Client calls `localhost:3001/api/*` endpoints
- Server uses OpenAI SDK with ZAI base URL
- **IMPORTANT**: Use `system` role messages for voice persona (better AI steering)
- Include few-shot examples as separate assistant/user message pairs
- Temperature 0.7-0.9 for natural variation (0.8 recommended for voice matching)
- Current hook generation uses single user message (legacy pattern)
- Voice-aware generation should use multi-message structure (best practice)

### React Component with TinyBase Hooks

From `app/src/components/ai/HookGenerator.tsx`:

```typescript
import { useCell, useSetCellCallback } from 'tinybase/ui-react'

export function Component() {
  const currentText = (useCell('currentTweet', 'draft', 'text') as string) ?? ''

  const setText = useSetCellCallback(
    'currentTweet',
    'draft',
    'text',
    (newText: string) => newText,
    []
  )

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Use loading/error states for async operations
  // Use TinyBase hooks for store integration
}
```

**Key Points:**
- Use `useCell` to read from TinyBase
- Use `useSetCellCallback` to write to TinyBase
- Follow loading/error state pattern for async operations

## Requirements

### Functional Requirements

1. **Voice Profile Configuration**
   - Description: Users can set multi-dimensional voice preferences
   - Acceptance: Settings UI allows configuration of tone (1-5 scale), formality (formal/neutral/casual), humor level (none/low/high), emoji usage (never/rarely/often/always), and topic preferences (tags/keywords)

2. **Example Tweet Learning**
   - Description: Users provide 2-3 sample tweets representing their authentic voice
   - Acceptance: Settings UI has textarea inputs for example tweets, stored in TinyBase, used in AI prompts for few-shot learning

3. **Voice-Adapted AI Suggestions**
   - Description: All AI-generated content matches the saved voice profile
   - Acceptance: AI proxy injects voice parameters into system prompts, uses example tweets for few-shot learning, generated content reflects configured style

4. **Voice Match Scoring**
   - Description: Display quantitative score showing how well AI content matches user's voice
   - Acceptance: Voice match score (0-100%) calculated using string similarity + style metrics, displayed in tweet composer UI, stored in tweetLog for analytics

5. **Profile Persistence**
   - Description: Voice profile saved across sessions
   - Acceptance: TinyBase auto-saves to localStorage, profile loads automatically on app start, users don't need to re-configure

### Edge Cases

1. **No Voice Profile Set** - AI generation uses default neutral style until profile is configured
2. **Partial Profile Data** - Missing fields use sensible defaults (e.g., neutral tone, moderate formality)
3. **Empty Example Tweets** - AI relies on explicit parameters only if no examples provided
4. **Voice Match Score Calculation** - Handle edge cases where generated text is very short or lacks stylistic markers

## Implementation Notes

### DO
- Follow the TinyBase store pattern in `app/src/lib/store/index.ts` for voice profile tables
- **Use separate `system` role messages for voice persona** (better than embedding in user message)
- Implement helper functions: `buildVoiceSystemPrompt(voiceProfile)` and `buildFewShotMessages(examples)`
- Use the component structure from `HookGenerator.tsx` for Settings components
- Install `string-similarity-js` (NOT `string-similarity` - deprecated)
- Store voice match scores in tweetLog table for future analytics
- Use Radix UI primitives (Toggle, ToggleGroup, Slider) for settings controls
- Temperature 0.8 recommended for voice-matched generation (0.7-0.9 range)
- Few-shot learning: include 2-3 example tweets as message pairs (user/assistant format)

### DON'T
- Don't install heavy NLP libraries (compromise, natural) - use AI-based approach
- Don't create separate database - use existing TinyBase store
- Don't modify core scoring algorithm - voice match is separate metric
- Don't skip TypeScript interfaces for new data structures
- Don't hardcode voice parameters - make them configurable
- Don't forget CORS headers in new AI proxy endpoints

## Development Environment

### Start Services

```bash
# Terminal 1 - Frontend (Vite dev server)
cd app
bun run dev

# Terminal 2 - AI Proxy Server
cd app/src/server
bun run ai-proxy.ts
```

### Service URLs
- Frontend: http://localhost:5173
- AI Proxy: http://localhost:3001

### Install Dependencies
```bash
cd app
bun add string-similarity-js
```

### Required Environment Variables
- `ZAI_API_KEY`: API key for ZAI GLM-4.7 model (already configured)

## Success Criteria

The task is complete when:

1. [ ] Voice profile UI in Settings tab allows configuration of all parameters
2. [ ] Users can input 2-3 example tweets and save them
3. [ ] AI-generated hooks/content adapt to voice profile settings
4. [ ] Voice match score displays in tweet composer (0-100%)
5. [ ] Voice profile persists across browser sessions (localStorage)
6. [ ] All existing functionality remains working (no regressions)
7. [ ] No console errors
8. [ ] Existing tests still pass
9. [ ] Voice match scores stored in tweetLog for analytics

## QA Acceptance Criteria

**CRITICAL**: These criteria must be verified by the QA Agent before sign-off.

### Unit Tests
| Test | File | What to Verify |
|------|------|----------------|
| Voice Profile CRUD | `app/src/lib/store/index.ts` | Create, read, update voice profile data |
| Voice Match Scoring | `app/src/lib/ai/voiceMatch.ts` | String similarity calculation, style metrics, composite score |
| Example Tweet Storage | `app/src/lib/store/index.ts` | Store/retrieve example tweets, validate input |

### Integration Tests
| Test | Services | What to Verify |
|------|----------|----------------|
| Voice-Aware Generation | Frontend ↔ AI Proxy | Voice parameters sent to proxy, few-shot examples included, response matches profile |
| Profile Persistence | Frontend ↔ localStorage | Settings saved automatically, loaded on refresh, no data loss |
| Score Storage | Frontend ↔ TinyBase | Voice match scores persisted to tweetLog with correct format |

### End-to-End Tests
| Flow | Steps | Expected Outcome |
|------|-------|------------------|
| Voice Profile Setup | 1. Navigate to Settings tab 2. Configure voice parameters 3. Add example tweets 4. Save | Profile saved to localStorage, visible on reload |
| Voice-Matched Generation | 1. Set casual tone + high emoji in profile 2. Generate hooks 3. Check output | Generated text matches casual tone, includes emojis |
| Match Score Display | 1. Generate AI content 2. Check score display | Voice match score visible, reasonable value (0-100%) |

### Browser Verification
| Page/Component | URL | Checks |
|----------------|-----|--------|
| Settings Tab | `http://localhost:5173` (Settings tab) | Voice profile form renders, controls work, saves successfully |
| Compose Tab | `http://localhost:5173` (Compose tab) | Voice match score displays, updates with new generations |
| Hook Generator | `http://localhost:5173` (Compose tab) | Generated hooks reflect voice profile, score shows match quality |

### Database Verification
| Check | Query/Command | Expected |
|-------|---------------|----------|
| Voice Profile Exists | Browser DevTools → Application → Local Storage → `tweet-optimizer` | JSON contains `voiceProfile` table with user settings |
| Example Tweets Stored | Browser DevTools → Application → Local Storage → `tweet-optimizer` | JSON contains `exampleTweets` table with 2-3 entries |
| Match Scores in Log | Browser DevTools → Application → Local Storage → `tweet-optimizer` | `tweetLog` entries include `voiceMatchScore` field |

### API Verification
| Endpoint | Request | Expected Response |
|----------|---------|-------------------|
| `/api/generate-hooks` | POST with topic + voiceProfile | Hooks match voice parameters, few-shot examples used |
| Voice parameters injection | Check AI proxy logs | System prompt includes tone/formality/emoji parameters |

### QA Sign-off Requirements
- [ ] All unit tests pass
- [ ] All integration tests pass
- [ ] All E2E tests pass
- [ ] Browser verification complete (Settings UI works)
- [ ] localStorage persistence verified (profile survives reload)
- [ ] Voice match scoring accurate (reasonable 0-100% values)
- [ ] AI generation reflects voice profile (manual verification)
- [ ] No regressions in existing functionality (tweet composer, templates, analytics)
- [ ] Code follows established patterns (TinyBase, React components, AI proxy)
- [ ] No security vulnerabilities introduced (no XSS, no exposed API keys)
- [ ] No console errors or warnings
- [ ] Performance acceptable (no lag in UI, generation time reasonable)

## Implementation Plan

### Phase 1: Data Layer (Voice Profile Storage)
1. Extend TinyBase schema with `voiceProfile` table
2. Add `exampleTweets` table for few-shot learning samples
3. Create TypeScript interfaces in `app/src/lib/store/index.ts`:
   ```typescript
   export interface VoiceProfile {
     tone: 1 | 2 | 3 | 4 | 5 // 1=very formal, 5=very casual
     formality: 'formal' | 'neutral' | 'casual'
     humorLevel: 'none' | 'low' | 'medium' | 'high'
     emojiUsage: 'never' | 'rarely' | 'often' | 'always'
     topicPreferences?: string[] // Optional topic tags
   }

   export interface ExampleTweet {
     id: string
     text: string
     addedAt: number
   }
   ```
4. Implement CRUD functions: `setVoiceProfile()`, `getVoiceProfile()`, `addExampleTweet()`, `getExampleTweets()`
5. Extend `TweetLogEntry` interface with `voiceMatchScore?: number` field (0-100)

### Phase 2: Settings UI
1. Create `app/src/components/settings/VoiceProfileForm.tsx`
2. Add Settings tab to `App.tsx` Tabs component
3. Implement voice controls: tone slider, formality toggle, emoji select, humor level
4. Add example tweet inputs (2-3 textareas)
5. Wire up TinyBase hooks for auto-save
6. Add save confirmation feedback

### Phase 3: AI Integration
1. Install `string-similarity-js` package
2. Create `app/src/lib/ai/voiceMatch.ts` for scoring algorithm
3. Enhance `app/src/server/ai-proxy.ts`:
   - Add `/api/generate-voice-aware` endpoint (or enhance existing `/api/generate-hooks`)
   - Implement helper function `buildVoiceSystemPrompt(voiceProfile)`:
     ```typescript
     function buildVoiceSystemPrompt(profile: VoiceProfile): string {
       const toneMap = { 1: 'very formal', 2: 'formal', 3: 'neutral', 4: 'casual', 5: 'very casual' }
       const tone = toneMap[profile.tone] || 'neutral'

       return `You are a viral tweet expert. Generate content matching this voice:
       - Tone: ${tone}
       - Formality: ${profile.formality}
       - Humor level: ${profile.humorLevel}
       - Emoji usage: ${profile.emojiUsage}
       - Topics: ${profile.topicPreferences?.join(', ') || 'general'}

       Match the style of the example tweets provided.`
     }
     ```
   - Implement helper function `buildFewShotMessages(examples)`:
     ```typescript
     function buildFewShotMessages(examples: string[]): Array<{role: 'user' | 'assistant', content: string}> {
       if (!examples?.length) return []

       return examples.flatMap((tweet, i) => [
         { role: 'user' as const, content: `Example of my writing style ${i + 1}:` },
         { role: 'assistant' as const, content: tweet }
       ])
     }
     ```
   - Use proper message structure: system message → few-shot examples → user request
4. Update `app/src/lib/ai/hooks.ts` to send voice profile with requests

### Phase 4: Voice Match Scoring
1. Implement scoring algorithm in `voiceMatch.ts`:
   - Text similarity using `string-similarity-js`
   - Style metrics: emoji count, sentence length, punctuation patterns
   - Composite score calculation (0-100%)
2. Display score in `TweetInput.tsx` component
3. Store scores in `tweetLog` when tweets are saved

### Phase 5: Testing & Polish
1. Test voice profile persistence across sessions
2. Verify AI generation adapts to different voice settings
3. Validate voice match scores are reasonable
4. Test edge cases (empty profile, partial data)
5. Ensure no regressions in existing features
6. Performance testing (scoring calculation speed)

## Technical Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (React)                     │
│                                                          │
│  ┌────────────────┐  ┌──────────────────────────────┐  │
│  │  Settings Tab  │  │      Compose Tab             │  │
│  │                │  │                               │  │
│  │  Voice Profile │  │  ┌────────────────────────┐  │  │
│  │  Form          │  │  │  AI Hook Generator     │  │  │
│  │                │  │  │  + Voice Match Score   │  │  │
│  │  - Tone        │  │  └────────────────────────┘  │  │
│  │  - Formality   │  │                               │  │
│  │  - Emoji       │  │  Voice Score: 87%             │  │
│  │  - Examples    │  │                               │  │
│  └────────────────┘  └──────────────────────────────┘  │
│           │                        │                    │
│           └────────────┬───────────┘                    │
│                        ▼                                │
│              ┌─────────────────┐                        │
│              │  TinyBase Store │                        │
│              │                 │                        │
│              │  - voiceProfile │                        │
│              │  - exampleTweets│                        │
│              │  - tweetLog     │                        │
│              └─────────────────┘                        │
│                        │                                │
│                        ▼                                │
│                  localStorage                           │
└─────────────────────────────────────────────────────────┘
                         │
                         │ HTTP POST /api/generate-hooks
                         │ { topic, voiceProfile }
                         ▼
┌─────────────────────────────────────────────────────────┐
│               AI Proxy Server (Bun :3001)               │
│                                                          │
│  ┌────────────────────────────────────────────────────┐ │
│  │  Voice-Aware Prompt Engineering                    │ │
│  │                                                     │ │
│  │  System: "You are a tweet expert. User's style:   │ │
│  │           Tone: casual, Formality: neutral,       │ │
│  │           Emoji: often"                           │ │
│  │                                                     │ │
│  │  Few-Shot Examples:                                │ │
│  │  - "Just shipped a feature! 🚀"                   │ │
│  │  - "Hot take: AI is overhyped"                    │ │
│  │                                                     │ │
│  │  User: "Generate hooks for ${topic}"              │ │
│  └────────────────────────────────────────────────────┘ │
│                         │                               │
│                         ▼                               │
│              ┌──────────────────────┐                   │
│              │  OpenAI SDK (ZAI)   │                   │
│              │  GLM-4.7            │                   │
│              │  temp: 0.8          │                   │
│              └──────────────────────┘                   │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
                    Generated Hooks
                    (Voice-Matched)
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│              Voice Match Scoring Engine                  │
│                                                          │
│  1. String Similarity (string-similarity-js)            │
│     - Compare to example tweets                         │
│                                                          │
│  2. Style Metrics                                       │
│     - Emoji frequency                                   │
│     - Sentence length patterns                          │
│     - Punctuation style                                 │
│                                                          │
│  3. Composite Score (0-100%)                            │
│     - Weighted average of metrics                       │
│                                                          │
│  → Display in UI + Store in tweetLog                    │
└─────────────────────────────────────────────────────────┘
```
