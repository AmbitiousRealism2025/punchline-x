# Specification: AI Tweet Rewriter

## Overview

Add an AI-powered tweet rewriting feature that generates 3-5 improved versions of existing tweets while maintaining the core message and optimizing for engagement. This feature is positioned as an "improvement tool" rather than a "replacement tool" to differentiate from competitors whose AI fails to match user voice. The system will leverage the existing ZAI GLM 4.7 integration, TinyBase state management, and scoring engine to provide users with scored alternatives they can select or blend.

## Workflow Type

**Type**: `feature`

**Rationale**: This is a new feature addition to the existing tweet optimizer application. It introduces new AI generation capabilities, UI components, and state management patterns while integrating with existing infrastructure (Bun proxy server, TinyBase store, ZAI API).

## Task Scope

### Services Involved
- **Frontend (React 19 + Vite)** (primary) - User interface for displaying alternatives and selection
- **Bun Proxy Server** (primary) - API endpoint for secure ZAI API communication
- **TinyBase State Management** (primary) - Persisting tweet versions and user selections
- **ZAI GLM 4.7 API** (integration) - AI generation engine for tweet variations
- **Existing Scoring Engine** (integration) - Predicting engagement scores for alternatives

### This Task Will:
- [ ] Create AI generation endpoint in Bun proxy server (`/api/rewrite-tweet`)
- [ ] Implement TinyBase table structure for storing tweet alternatives
- [ ] Build UI components for displaying 3-5 tweet variations with scores
- [ ] Integrate with existing scoring engine to predict engagement for each version
- [ ] Add selection mechanism allowing users to choose or blend versions
- [ ] Preserve core message and user voice in all generated alternatives
- [ ] Display predicted engagement scores for each alternative

### Out of Scope:
- Training custom models for voice matching (use prompt engineering instead)
- Replacing the entire tweet composition interface
- Advanced blending UI (v1 will support simple copy-paste blending)
- Analytics/tracking of which alternatives perform better (future enhancement)
- Batch rewriting multiple tweets simultaneously

## Service Context

### Frontend (React 19 + Vite)

**Tech Stack:**
- Language: TypeScript
- Framework: React 19
- Build Tool: Vite 7
- State Management: TinyBase

**Entry Point:** `app/src/main.tsx`

**How to Run:**
```bash
cd app
npm run dev
```

**Port:** 5173

**Key Features:**
- React 19 hooks available: `use()`, `useActionState()`, `useOptimistic()`
- TinyBase Provider must wrap app root
- Auto-persistence via localStorage (key: `tweet-optimizer`)

### Bun Proxy Server

**Tech Stack:**
- Runtime: Bun
- Language: TypeScript (native support)

**Entry Point:** `app/src/server/ai-proxy.ts`

**How to Run:**
```bash
cd app
bun run server
```

**Port:** 3001

**Existing Endpoints:**
- `POST /api/generate-hooks` (existing)
- `POST /api/rewrite-tweet` (to be created)

**Configuration:**
- CORS configured for `http://localhost:5173`
- ZAI API key stored in `.env.local` (never exposed to frontend)
- Custom baseURL: `https://api.z.ai/api/coding/paas/v4/`

### ZAI GLM 4.7 Integration

**Tech Stack:**
- Model: `glm-4.7`
- SDK: OpenAI SDK with custom baseURL

**API Pattern:**
```typescript
const response = await client.chat.completions.create({
  model: 'glm-4.7',
  messages: [...],
  temperature: 0.7,
  max_tokens: 2000
});
```

**Response Structure:**
- `content`: Main response
- `reasoning_content`: Model's reasoning process

## Files to Modify

| File | Service | What to Change |
|------|---------|---------------|
| `app/src/server/ai-proxy.ts` | Bun Proxy | Add `/api/rewrite-tweet` endpoint for generating alternatives |
| `app/src/lib/store/index.ts` | Frontend | Add TinyBase table/schema for tweet alternatives |
| `app/src/components/TweetEditor.tsx` (TBD) | Frontend | Add "Rewrite with AI" button to trigger generation |
| `app/src/components/AlternativesList.tsx` (NEW) | Frontend | Create component to display 3-5 alternatives with scores |
| `app/src/hooks/useRewriteTweet.ts` (NEW) | Frontend | Custom hook for calling rewrite API and managing state |

**Note:** Exact file paths for tweet editor and scoring engine need to be discovered during implementation phase.

## Files to Reference

These files show patterns to follow:

| File | Pattern to Copy |
|------|----------------|
| `app/src/server/ai-proxy.ts` | ZAI API integration pattern, OpenAI client setup with custom baseURL |
| `app/src/lib/store/index.ts` | TinyBase store initialization, table/row/cell structure |
| `.env.local` | Environment variable pattern for `ZAI_API_KEY` |

**Additional patterns to discover:**
- Existing scoring engine implementation (location TBD)
- Current tweet composition/editor component structure
- TinyBase hook usage patterns (`useCell`, `useSetCellCallback`, `useRow`)

## Patterns to Follow

### ZAI API Integration (Bun Proxy)

From `app/src/server/ai-proxy.ts`:

```typescript
import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.ZAI_API_KEY,
  baseURL: 'https://api.z.ai/api/coding/paas/v4/'
});

// API call pattern
const response = await client.chat.completions.create({
  model: 'glm-4.7',
  messages: [
    { role: 'system', content: 'System prompt here' },
    { role: 'user', content: 'User input here' }
  ],
  temperature: 0.7,
  max_tokens: 2000
});

const generatedText = response.choices[0].message.content;
```

**Key Points:**
- Custom baseURL must be set at client initialization (cannot change dynamically)
- Use `ZAI_API_KEY` from environment variables
- Response includes both `content` and `reasoning_content`
- Model name is `glm-4.7`, not an OpenAI model

### TinyBase State Management

From `app/src/lib/store/index.ts`:

```typescript
import { createStore } from 'tinybase';

// Store initialization with localStorage persistence
const store = createStore().setJson(
  localStorage.getItem('tweet-optimizer') || '{}'
);

// Data structure: table -> row -> cells
store.setRow('alternatives', 'tweet-123', {
  version1: 'Alternative tweet text...',
  score1: 85,
  version2: 'Another alternative...',
  score2: 78
});

// Reading data
const tweetData = store.useRow('alternatives', 'tweet-123');

// Cell values must be primitives - serialize objects if needed
```

**Key Points:**
- Data organized as tables → rows → cells (not key-value pairs)
- Auto-persistence to localStorage with key `tweet-optimizer`
- Provider must wrap app root for hooks to work
- Cell values must be primitives (string, number, boolean)
- Use hooks: `useCell`, `useSetCellCallback`, `useRow`, `useTable`

### Prompt Engineering for Voice Preservation

Pattern to implement:

```typescript
const systemPrompt = `You are a tweet improvement assistant. Generate 3-5 alternative versions of the user's tweet that:
1. PRESERVE the core message and intent exactly
2. MAINTAIN the user's writing style and voice
3. Optimize for engagement (hooks, clarity, formatting)
4. Keep the same tone (professional/casual/humorous)

DO NOT:
- Change the fundamental message
- Add information not in the original
- Completely rewrite in a different voice

Return ONLY a JSON array of alternative tweet texts.`;
```

**Key Points:**
- Emphasize preservation over creativity
- Explicitly instruct to maintain voice
- Request structured output (JSON array)
- Use temperature ~0.7 for controlled variation

## Requirements

### Functional Requirements

1. **Generate Tweet Alternatives**
   - Description: When user clicks "Rewrite with AI", system generates 3-5 alternative versions of the current tweet
   - Acceptance: API call to `/api/rewrite-tweet` returns 3-5 distinct variations in JSON format

2. **Display Predicted Scores**
   - Description: Each alternative displays a predicted engagement score using the existing scoring engine
   - Acceptance: Each alternative shows a numeric score (0-100 or similar scale) before user selects it

3. **Enable Version Selection**
   - Description: Users can click on an alternative to replace their current tweet
   - Acceptance: Clicking an alternative updates the main tweet editor with that text

4. **Support Idea Blending**
   - Description: Users can view multiple alternatives simultaneously to copy/blend ideas manually
   - Acceptance: All alternatives remain visible after selection, allowing users to reference multiple versions

5. **Preserve Core Message**
   - Description: All generated alternatives maintain the original tweet's core message and intent
   - Acceptance: Manual review confirms alternatives don't contradict or change fundamental meaning

### Edge Cases

1. **Empty or Very Short Input** - If tweet is empty or <10 characters, disable rewrite button or show error
2. **API Failures** - If ZAI API is down or returns error, display user-friendly error message and retain original tweet
3. **Slow API Response** - Show loading indicator while waiting for alternatives (potentially 3-10 seconds)
4. **Duplicate Alternatives** - If AI generates similar/identical versions, filter duplicates to ensure 3-5 distinct options
5. **Score Calculation Errors** - If scoring engine fails, still display alternatives but show "Score unavailable" instead of number
6. **Rate Limiting** - Handle ZAI API rate limits gracefully with exponential backoff or user notification

## Implementation Notes

### DO
- Follow the ZAI API pattern in `app/src/server/ai-proxy.ts` for consistent error handling and response parsing
- Reuse TinyBase store setup pattern from `app/src/lib/store/index.ts` for state management
- Store alternatives in TinyBase with unique row IDs (e.g., timestamp or UUID) to enable persistence
- Use React 19's `useOptimistic` for instant UI feedback when selecting an alternative
- Implement prompt engineering to emphasize voice preservation (critical differentiator)
- Call existing scoring engine for each alternative immediately after generation
- Add loading states using TinyBase cells (e.g., `isGenerating: true/false`)
- Serialize the alternatives array into individual cells (version1, version2, score1, score2) since TinyBase requires primitives

### DON'T
- Expose `ZAI_API_KEY` in frontend code - always proxy through Bun server
- Create a new AI client on every request - reuse the initialized OpenAI client
- Store complex objects directly in TinyBase cells - flatten into primitives
- Generate more than 5 alternatives (unnecessary and expensive)
- Allow rewrite button to be clicked multiple times rapidly (implement debouncing)
- Assume ZAI API will always return exactly N alternatives - validate response length
- Skip error handling on the API endpoint - ZAI API can fail or timeout

## Development Environment

### Start Services

```bash
# Terminal 1: Start Bun proxy server
cd app
bun run server

# Terminal 2: Start React dev server
cd app
npm run dev
```

### Service URLs
- Frontend: http://localhost:5173
- Bun Proxy: http://localhost:3001
- ZAI API (proxied): https://api.z.ai/api/coding/paas/v4/

### Required Environment Variables
Create or verify `app/.env.local`:
```env
ZAI_API_KEY=your-zai-api-key-here
```

**Note:** Never commit `.env.local` to version control. Use `.env.example` for documentation.

### CORS Configuration
Already configured in `app/src/server/ai-proxy.ts`:
- Allowed origin: `http://localhost:5173`
- Methods: POST, OPTIONS
- Headers: Content-Type

## Success Criteria

The task is complete when:

1. [ ] User can click "Rewrite with AI" button from tweet editor
2. [ ] System generates 3-5 alternative tweet versions via ZAI GLM 4.7 API
3. [ ] Each alternative displays a predicted engagement score
4. [ ] User can click an alternative to replace their current tweet
5. [ ] Alternatives remain visible after selection (enabling idea blending)
6. [ ] Generated alternatives preserve the core message and user voice
7. [ ] No console errors during generation, display, or selection
8. [ ] Existing tests still pass (if applicable)
9. [ ] Loading states display during API calls
10. [ ] Error states handle API failures gracefully

## QA Acceptance Criteria

**CRITICAL**: These criteria must be verified by the QA Agent before sign-off.

### Unit Tests
| Test | File | What to Verify |
|------|------|----------------|
| `generateAlternatives()` | `app/src/server/ai-proxy.test.ts` | Returns 3-5 alternatives when given valid tweet input |
| `generateAlternatives()` error handling | `app/src/server/ai-proxy.test.ts` | Returns error response when ZAI API fails |
| `useRewriteTweet()` hook | `app/src/hooks/useRewriteTweet.test.ts` | Correctly calls API and updates TinyBase state |
| TinyBase alternatives schema | `app/src/lib/store/index.test.ts` | Can store/retrieve 5 alternatives with scores |
| Duplicate filtering | `app/src/utils/filterDuplicates.test.ts` | Removes similar alternatives (>90% similarity) |

### Integration Tests
| Test | Services | What to Verify |
|------|----------|----------------|
| Frontend → Bun Proxy → ZAI API | Frontend ↔ Bun ↔ ZAI | End-to-end flow from button click to alternatives displayed |
| Scoring Engine Integration | Frontend ↔ Scoring Engine | Each alternative receives valid score (0-100) |
| TinyBase Persistence | Frontend ↔ localStorage | Alternatives persist across page refreshes |

### End-to-End Tests
| Flow | Steps | Expected Outcome |
|------|-------|------------------|
| Generate Alternatives | 1. Enter tweet 2. Click "Rewrite with AI" 3. Wait for response | 3-5 alternatives appear with scores |
| Select Alternative | 1. Generate alternatives 2. Click on one | Selected text replaces main tweet editor content |
| Blend Ideas | 1. Generate alternatives 2. Select one 3. View others | All alternatives remain visible for reference |
| Error Handling | 1. Disconnect network 2. Click "Rewrite with AI" | User-friendly error message displays |
| Loading State | 1. Click "Rewrite with AI" 2. Observe UI during API call | Loading indicator shows, button disabled |

### Browser Verification (if frontend)
| Page/Component | URL | Checks |
|----------------|-----|--------|
| Tweet Editor | `http://localhost:5173` | "Rewrite with AI" button visible and clickable |
| Alternatives List | `http://localhost:5173` | 3-5 cards display with tweet text and score |
| Selected Alternative | `http://localhost:5173` | Main editor updates when alternative clicked |

### API Verification
| Endpoint | Method | Expected Response |
|----------|--------|-------------------|
| `/api/rewrite-tweet` | POST | `{ alternatives: [{ text: string, score: number }] }` |
| `/api/rewrite-tweet` (invalid input) | POST | `{ error: string }` with 400 status code |

### Database Verification (if applicable)
| Check | Query/Command | Expected |
|-------|---------------|----------|
| TinyBase localStorage | `localStorage.getItem('tweet-optimizer')` | Contains `alternatives` table with generated versions |
| Data structure | Inspect store JSON | Each row has `version1-5` and `score1-5` cells (primitives) |

### QA Sign-off Requirements
- [ ] All unit tests pass (`npm test`)
- [ ] All integration tests pass
- [ ] All E2E tests pass (manual verification if no E2E framework)
- [ ] Browser verification complete: alternatives display correctly with scores
- [ ] TinyBase persistence verified: alternatives persist across page reload
- [ ] No regressions in existing tweet editor functionality
- [ ] Code follows existing patterns (ZAI API, TinyBase, React hooks)
- [ ] No security vulnerabilities: `ZAI_API_KEY` never exposed in frontend
- [ ] Error states tested: network failure, API timeout, invalid response
- [ ] Loading states tested: button disabled, spinner visible during API calls
- [ ] Voice preservation verified: Generated alternatives match original tone (manual review of 5+ examples)
- [ ] Score accuracy verified: Predicted scores align with scoring engine output (±5% variance acceptable)

## Implementation Sequence

**Phase 1: Backend (Bun Proxy)**
1. Add `/api/rewrite-tweet` endpoint to `app/src/server/ai-proxy.ts`
2. Implement prompt engineering for voice preservation
3. Handle ZAI API responses and error cases
4. Test endpoint with curl/Postman

**Phase 2: State Management (TinyBase)**
1. Add `alternatives` table schema to TinyBase store
2. Create helper functions to serialize/deserialize alternatives
3. Test localStorage persistence

**Phase 3: Frontend (React Components)**
1. Create `AlternativesList.tsx` component
2. Create `useRewriteTweet.ts` custom hook
3. Integrate with existing tweet editor (add "Rewrite with AI" button)
4. Wire up scoring engine for each alternative
5. Implement selection mechanism

**Phase 4: Polish & QA**
1. Add loading states
2. Add error handling UI
3. Test all edge cases
4. Manual QA verification
5. Update documentation

## Technical Debt & Future Enhancements

**Known Limitations (v1):**
- Blending is manual (copy-paste) rather than assisted
- No analytics on which alternatives users prefer
- No A/B testing of alternative performance
- Single tweet rewriting only (no batch)

**Future Enhancements:**
- Smart blending: AI-assisted combining of multiple alternatives
- Performance tracking: Log which alternatives get selected and their actual engagement
- User voice training: Learn from user's past tweets to improve voice matching
- Batch rewriting: Generate alternatives for multiple draft tweets
- Custom instructions: Allow users to specify tone/style preferences per rewrite
