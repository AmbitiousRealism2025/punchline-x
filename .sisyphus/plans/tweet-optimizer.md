# Tweet Optimizer — Master Execution Plan

## Overview
Build a personal tweet optimization tool with real-time scoring, AI hook generation, 
and a Raycast-inspired dark UI.

## Stack (Finalized)
| Layer | Technology | Version |
|-------|------------|---------|
| Runtime | Bun | latest |
| Build | Vite | 6.x |
| Frontend | React | 19.x |
| Styling | Tailwind CSS | v4 (Vite plugin) |
| UI | shadcn/ui + cmdk | latest |
| Database | TinyBase + localStorage | 7.x |
| AI | @anthropic-ai/sdk (Opus) | latest |

## Design System
- **Theme**: Dark only
- **Background**: `#09090b` (zinc-950)
- **Surface**: `#0f0f11` (elevated cards)
- **Accent**: `#06b6d4` (cyan-500)
- **Text Primary**: `#fafafa`
- **Text Muted**: `#a1a1aa` (zinc-400)
- **Border**: `#27272a` (zinc-800)

---

# Phase 1: MVP (Days 1-5) ✅ COMPLETE

## Goal
Working tweet scorer with real-time calculation + AI hook generation using Claude Opus.

> **Status**: Implemented January 2026. All features working.

## Context Files Required
Before implementation, these context files are available in `.sisyphus/context/phase-1-mvp/`:
- `tinybase-react.md` — Store setup, useCell, useRow, Provider
- `anthropic-sdk.md` — Streaming, error handling, Opus model
- `tailwind-v4.md` — Vite plugin, CSS variables, @theme
- `shadcn-dark.md` — Dark theme CSS, Raycast palette

## Day 1: Project Setup

### Commands
```bash
bun create vite@latest tweet-optimizer --template react-ts
cd tweet-optimizer
bun add tinybase @anthropic-ai/sdk
bun add -d tailwindcss @tailwindcss/vite
bun x shadcn@latest init
bun x shadcn@latest add button input textarea card badge toggle toggle-group tooltip dialog command
```

### Files to Create

#### `vite.config.ts`
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
```

#### `src/index.css` (Raycast Dark Theme)
```css
@import "tailwindcss";

@theme inline {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

@layer base {
  :root {
    --background: 240 10% 3.9%;
    --foreground: 0 0% 98%;
    --card: 240 10% 5.9%;
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 5.9%;
    --popover-foreground: 0 0% 98%;
    --primary: 188 91% 43%;
    --primary-foreground: 0 0% 3.9%;
    --secondary: 240 3.7% 15.9%;
    --secondary-foreground: 0 0% 98%;
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%;
    --accent: 188 91% 43%;
    --accent-foreground: 0 0% 3.9%;
    --destructive: 0 62.8% 50%;
    --destructive-foreground: 0 0% 98%;
    --border: 240 3.7% 15.9%;
    --input: 240 3.7% 15.9%;
    --ring: 188 91% 43%;
    --radius: 0.5rem;
  }

  * { @apply border-border; }
  body { @apply bg-background text-foreground antialiased; }
}

/* Raycast top-shine effect for cards */
.raycast-shine {
  position: relative;
}
.raycast-shine::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(6, 182, 212, 0.15) 20%,
    rgba(6, 182, 212, 0.15) 80%,
    transparent
  );
}
```

#### `.env.local`
```
ANTHROPIC_API_KEY=your-key-here
```

### File Structure (Day 1)
```
tweet-optimizer/
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn components (auto-generated)
│   │   └── layout/
│   │       └── Shell.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.local
├── vite.config.ts
├── components.json
└── package.json
```

---

## Day 2: TinyBase Store + Scoring Engine

### `src/lib/store/index.ts`
```typescript
import { createStore } from 'tinybase';
import { createLocalPersister } from 'tinybase/persisters/persister-browser';

export const store = createStore();

// Initialize default values
store.setRow('settings', 'user', {
  isPremium: false,
  isVerified: false,
  timezone: 'America/Los_Angeles',
});

store.setRow('currentTweet', 'draft', {
  text: '',
  mediaType: 'none',
  hasLink: false,
});

// Auto-save to localStorage
const persister = createLocalPersister(store, 'tweet-optimizer');
persister.startAutoSave();
persister.startAutoLoad();

export { persister };
```

### `src/lib/scoring/calculator.ts`
```typescript
import { analyzeHook } from './hooks';
import { getMediaScore } from './media';
import { getEngagementScore } from './engagement';
import { getContentQualityScore } from './quality';
import { generateSuggestions, generateWarnings } from './suggestions';

export interface ScoreInput {
  text: string;
  mediaType: 'none' | 'image' | 'video' | 'gif' | 'poll';
  hasLink: boolean;
  isPremium: boolean;
  isVerified?: boolean;
  postTime?: Date;
}

export interface ScoreBreakdown {
  base: number;
  media: number;
  hook: number;
  engagement: number;
  timing: number;
  account: number;
  quality: number;
}

export interface Suggestion {
  type: 'media' | 'hook' | 'engagement' | 'timing' | 'critical';
  priority: 'critical' | 'high' | 'medium' | 'low';
  message: string;
  impact: string;
}

export interface ScoreResult {
  total: number;
  breakdown: ScoreBreakdown;
  suggestions: Suggestion[];
  warnings: string[];
  grade: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
}

const BASE_SCORE = 40;

export function calculateScore(input: ScoreInput): ScoreResult {
  const breakdown: ScoreBreakdown = {
    base: BASE_SCORE,
    media: getMediaScore(input.mediaType, input.hasLink, input.isPremium),
    hook: analyzeHook(input.text),
    engagement: getEngagementScore(input.text),
    timing: getTimingScore(input.postTime ?? new Date()),
    account: getAccountScore(input.isPremium, input.isVerified),
    quality: getContentQualityScore(input.text),
  };

  const total = Math.max(0, Math.min(100, 
    Object.values(breakdown).reduce((a, b) => a + b, 0)
  ));

  return {
    total,
    breakdown,
    suggestions: generateSuggestions(input, breakdown),
    warnings: generateWarnings(input),
    grade: getGrade(total),
  };
}

function getTimingScore(postTime: Date): number {
  const hour = postTime.getHours();
  const day = postTime.getDay();
  let score = 0;
  
  if (day >= 1 && day <= 5) score += 5; // Weekday
  if (hour >= 8 && hour < 11) score += 15; // Peak
  else if (hour >= 12 && hour < 14) score += 10; // Secondary
  else if (hour >= 18 || hour < 6) score -= 10; // Off-peak
  
  return score;
}

function getAccountScore(isPremium?: boolean, isVerified?: boolean): number {
  return (isPremium ? 20 : 0) + (isVerified ? 10 : 0);
}

function getGrade(score: number): ScoreResult['grade'] {
  if (score >= 85) return 'excellent';
  if (score >= 70) return 'good';
  if (score >= 55) return 'fair';
  if (score >= 40) return 'poor';
  return 'critical';
}
```

### `src/lib/scoring/hooks.ts`
```typescript
const hookPatterns = {
  patternInterrupt: [
    /^stop\s/i,
    /^wait\s/i,
    /^hold\s+on/i,
    /^hear\s+me\s+out/i,
    /^unpopular\s+opinion/i,
    /^hot\s+take/i,
    /^controversial/i,
  ],
  curiosityGap: [
    /^the\s+(?:real|actual|true)\s+reason/i,
    /^what\s+(?:nobody|no\s+one)\s+tells/i,
    /^the\s+secret\s+to/i,
    /^why\s+(?:most|everyone)/i,
  ],
  contrarian: [
    /^actually,?\s/i,
    /^unpopular\s+opinion/i,
    /^hot\s+take/i,
    /^controversial/i,
    /^i\s+(?:disagree|don't\s+think)/i,
  ],
  storyOpener: [
    /^i\s+just/i,
    /^yesterday/i,
    /^last\s+(?:week|month|year)/i,
    /^(?:2|3|4|5|6|7|8|9|10)\s+(?:years?|months?|weeks?)\s+ago/i,
    /^when\s+i\s+(?:was|started)/i,
  ],
  genericOpener: [
    /^just\s+wanted\s+to/i,
    /^here(?:'s|\s+is)\s+(?:some|a)/i,
    /^sharing\s/i,
    /^thought\s+(?:i'd|i\s+would)/i,
    /^check\s+out/i,
  ],
};

export function analyzeHook(text: string): number {
  if (!text.trim()) return 0;
  
  const firstLine = text.split('\n')[0];
  const words = firstLine.split(/\s+/).filter(w => w.length > 0);
  let score = 0;
  
  // Length check
  if (words.length <= 10) score += 10;
  if (words.length > 20) score -= 5;
  
  // Question check
  if (firstLine.trim().endsWith('?')) score += 10;
  
  // Number check
  if (/\d/.test(firstLine)) score += 10;
  
  // Pattern detection
  for (const [type, patterns] of Object.entries(hookPatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(firstLine)) {
        switch(type) {
          case 'patternInterrupt': score += 15; break;
          case 'curiosityGap': score += 10; break;
          case 'contrarian': score += 15; break;
          case 'storyOpener': score += 10; break;
          case 'genericOpener': score -= 5; break;
        }
        break;
      }
    }
  }
  
  return Math.min(score, 25); // Cap at +25
}

export function getHookType(text: string): string {
  const firstLine = text.split('\n')[0];
  
  for (const [type, patterns] of Object.entries(hookPatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(firstLine)) return type;
    }
  }
  
  if (firstLine.trim().endsWith('?')) return 'question';
  if (/\d/.test(firstLine)) return 'number';
  
  return 'generic';
}
```

### `src/lib/scoring/media.ts`
```typescript
export function getMediaScore(
  mediaType: string,
  hasLink: boolean,
  isPremium: boolean
): number {
  const mediaScores: Record<string, number> = {
    'video': 40,
    'image': 20,
    'gif': 15,
    'poll': 20,
    'none': 0,
  };
  
  let score = mediaScores[mediaType] ?? 0;
  
  // Link penalty (overrides if more negative)
  if (hasLink) {
    const linkPenalty = isPremium ? -20 : -50;
    score = Math.min(score, linkPenalty);
  }
  
  return score;
}
```

### `src/lib/scoring/engagement.ts`
```typescript
const selfPromoPatterns = [
  /check\s+out\s+my/i,
  /buy\s+my/i,
  /get\s+my/i,
  /subscribe\s+to\s+my/i,
  /follow\s+me/i,
  /link\s+in\s+bio/i,
  /use\s+(?:my\s+)?code/i,
  /(?:50|25|20|10)%\s+off/i,
];

const ctaPatterns = [
  /reply\s/i,
  /comment\s/i,
  /share\s/i,
  /what\s+do\s+you\s+think/i,
  /agree\s*\?/i,
  /disagree\s*\?/i,
  /\[drop\s+your/i,
];

export function getEngagementScore(text: string): number {
  let score = 0;
  
  // Question anywhere
  if (text.includes('?')) score += 10;
  
  // CTA detection
  for (const pattern of ctaPatterns) {
    if (pattern.test(text)) {
      score += 10;
      break;
    }
  }
  
  // "What do you think?" specifically
  if (/what\s+do\s+you\s+think/i.test(text)) score += 5;
  
  // Emoji count
  const emojiCount = (text.match(/[\u{1F300}-\u{1F9FF}]/gu) || []).length;
  if (emojiCount >= 1 && emojiCount <= 3) score += 5;
  if (emojiCount >= 4) score -= 5;
  
  // All caps check
  const capsWords = (text.match(/\b[A-Z]{3,}\b/g) || []).length;
  if (capsWords >= 1 && capsWords <= 2) score += 5;
  if (capsWords >= 3) score -= 10;
  
  // Self-promotion penalty
  for (const pattern of selfPromoPatterns) {
    if (pattern.test(text)) {
      score -= 15;
      break;
    }
  }
  
  return Math.min(score, 25); // Cap at +25
}
```

### `src/lib/scoring/quality.ts`
```typescript
export function getContentQualityScore(text: string): number {
  const charCount = text.length;
  const hashtagCount = (text.match(/#\w+/g) || []).length;
  
  let score = 0;
  
  // Length scoring
  if (charCount >= 100 && charCount <= 200) score += 10;
  else if (charCount < 50 && charCount > 0) score -= 5;
  else if (charCount > 250) score -= 5;
  
  // Thread indicator
  if (/🧵|thread:/i.test(text)) score += 5;
  
  // List format
  if (/^\s*[\d•\-]\s/m.test(text)) score += 5;
  
  // Hashtags
  if (hashtagCount >= 1 && hashtagCount <= 3) score += 5;
  else if (hashtagCount >= 4) score -= 10;
  
  return score;
}
```

### `src/lib/scoring/suggestions.ts`
```typescript
import type { ScoreInput, ScoreBreakdown, Suggestion } from './calculator';

export function generateSuggestions(
  input: ScoreInput, 
  breakdown: ScoreBreakdown
): Suggestion[] {
  const suggestions: Suggestion[] = [];
  
  // Media suggestions
  if (input.mediaType === 'none') {
    suggestions.push({
      type: 'media',
      priority: 'high',
      message: 'Add an image or video for +20-40 points',
      impact: '+20 to +40',
    });
  }
  
  // Link warning
  if (input.hasLink && !input.isPremium) {
    suggestions.push({
      type: 'critical',
      priority: 'critical',
      message: 'External links get near-zero reach without Premium',
      impact: '-50',
    });
  }
  
  // Hook suggestions
  if (breakdown.hook < 10) {
    suggestions.push({
      type: 'hook',
      priority: 'high',
      message: 'Strengthen your hook with a number, question, or pattern interrupt',
      impact: '+10 to +25',
    });
  }
  
  // Engagement suggestions
  if (!input.text.includes('?')) {
    suggestions.push({
      type: 'engagement',
      priority: 'medium',
      message: 'Add a question to increase replies',
      impact: '+10',
    });
  }
  
  // Timing suggestions
  if (breakdown.timing < 0) {
    suggestions.push({
      type: 'timing',
      priority: 'medium',
      message: 'Consider posting during peak hours (8-11am PST)',
      impact: '+15',
    });
  }
  
  // Sort by priority
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  return suggestions.sort((a, b) => 
    priorityOrder[a.priority] - priorityOrder[b.priority]
  );
}

export function generateWarnings(input: ScoreInput): string[] {
  const warnings: string[] = [];
  
  if (input.hasLink && !input.isPremium) {
    warnings.push('⚠️ CRITICAL: Links without Premium get near-zero reach');
  }
  
  const capsWords = (input.text.match(/\b[A-Z]{3,}\b/g) || []).length;
  if (capsWords >= 3) {
    warnings.push('Too many ALL CAPS words may trigger spam filters');
  }
  
  const hashtagCount = (input.text.match(/#\w+/g) || []).length;
  if (hashtagCount >= 4) {
    warnings.push('Too many hashtags signals spam to the algorithm');
  }
  
  return warnings;
}
```

---

## Day 3: Core UI Components

### Component List
| Component | Purpose |
|-----------|---------|
| `Shell.tsx` | App container with header |
| `TweetInput.tsx` | Text input with char counter |
| `ScoreDisplay.tsx` | Score ring + grade label |
| `ScoreBreakdown.tsx` | Expandable breakdown |
| `MediaToggles.tsx` | Media/Premium/Link toggles |
| `SuggestionList.tsx` | Improvement suggestions |

### `src/components/layout/Shell.tsx`
```tsx
import { ReactNode } from 'react';

interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
            <span className="text-primary text-lg">✍️</span>
          </div>
          <h1 className="text-lg font-semibold text-foreground">
            Tweet Optimizer
          </h1>
        </div>
      </header>
      <main className="container mx-auto max-w-4xl px-6 py-8">
        {children}
      </main>
    </div>
  );
}
```

### File Structure (Day 3)
```
src/
├── components/
│   ├── ui/                    # shadcn components
│   ├── scorer/
│   │   ├── TweetInput.tsx
│   │   ├── ScoreDisplay.tsx
│   │   ├── ScoreBreakdown.tsx
│   │   ├── MediaToggles.tsx
│   │   ├── SuggestionList.tsx
│   │   └── index.ts
│   └── layout/
│       └── Shell.tsx
├── lib/
│   ├── scoring/
│   │   ├── calculator.ts
│   │   ├── hooks.ts
│   │   ├── media.ts
│   │   ├── engagement.ts
│   │   ├── quality.ts
│   │   ├── suggestions.ts
│   │   └── index.ts
│   ├── store/
│   │   └── index.ts
│   └── utils.ts
├── hooks/
│   ├── useScore.ts
│   └── useStore.ts
├── App.tsx
├── main.tsx
└── index.css
```

---

## Day 4: Claude Integration

### `src/server/ai-proxy.ts` (Bun server)
```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

const HOOK_PROMPT = `Generate 5 viral tweet hooks for the given topic.

Use these styles (one each):
1. Contrarian ("Unpopular opinion:", "Actually...")
2. Number-based ("7 things...", "I spent 100 hours...")
3. Story opener ("6 months ago, I...")
4. Question ("What if...", "Why do...")
5. Pattern interrupt ("Stop doing X", "Wait...")

Return ONLY a JSON array: [{"hook": "...", "style": "contrarian|number|story|question|interrupt"}]`;

Bun.serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);
    
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }
    
    if (req.method === 'POST' && url.pathname === '/api/generate-hooks') {
      try {
        const { topic } = await req.json();
        
        const message = await client.messages.create({
          model: 'claude-sonnet-4-5-20250929',
          max_tokens: 1024,
          messages: [{
            role: 'user',
            content: `${HOOK_PROMPT}\n\nTopic: "${topic}"`,
          }],
        });
        
        const content = message.content[0];
        if (content.type === 'text') {
          return new Response(content.text, {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }
        
        return new Response('No text response', { status: 500, headers: corsHeaders });
      } catch (error) {
        console.error('AI Error:', error);
        return new Response(JSON.stringify({ error: 'AI generation failed' }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
    }
    
    return new Response('Not found', { status: 404, headers: corsHeaders });
  },
});

console.log('AI proxy server running on http://localhost:3001');
```

### `src/lib/ai/hooks.ts`
```typescript
interface GeneratedHook {
  hook: string;
  style: string;
}

export async function generateHooks(topic: string): Promise<GeneratedHook[]> {
  const response = await fetch('http://localhost:3001/api/generate-hooks', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ topic }),
  });
  
  if (!response.ok) {
    throw new Error('Failed to generate hooks');
  }
  
  const text = await response.text();
  
  // Parse JSON from response (Claude may include markdown)
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    throw new Error('Invalid response format');
  }
  
  return JSON.parse(jsonMatch[0]);
}
```

---

## Day 5: Polish + Integration

### Tasks
- [ ] Wire TweetInput to TinyBase store
- [ ] Connect ScoreDisplay to real-time calculation
- [ ] Add HookGenerator component
- [ ] Implement copy-to-clipboard
- [ ] Add loading states
- [ ] Test scoring accuracy
- [ ] Smooth animations (150ms transitions)

### `src/App.tsx` (Final)
```tsx
import { Provider } from 'tinybase/ui-react';
import { store } from '@/lib/store';
import { Shell } from '@/components/layout/Shell';
import { TweetInput } from '@/components/scorer/TweetInput';
import { ScoreDisplay } from '@/components/scorer/ScoreDisplay';
import { ScoreBreakdown } from '@/components/scorer/ScoreBreakdown';
import { MediaToggles } from '@/components/scorer/MediaToggles';
import { SuggestionList } from '@/components/scorer/SuggestionList';
import { HookGenerator } from '@/components/ai/HookGenerator';

export default function App() {
  return (
    <Provider store={store}>
      <Shell>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left: Input */}
          <div className="space-y-6">
            <TweetInput />
            <MediaToggles />
            <HookGenerator />
          </div>
          
          {/* Right: Score */}
          <div className="space-y-6">
            <ScoreDisplay />
            <ScoreBreakdown />
            <SuggestionList />
          </div>
        </div>
      </Shell>
    </Provider>
  );
}
```

---

# Phase 2: Templates & Tracking (Days 6-9)

## Goal
Template library + tweet logging + timing advisor.

## Context Files Required
- `tinybase-persistence.md` — Optional SQLite upgrade
- `cmdk-patterns.md` — Command palette
- `template-schema.md` — Template data structure

## Features
- [ ] Template library (10+ templates from specs)
- [ ] Fill-in-the-blank template editor
- [ ] Tweet logging to TinyBase
- [ ] Performance tracking (impressions/engagements)
- [ ] Timing advisor with peak hours
- [ ] AI tweet rewriter

## Template Data Structure
```typescript
interface Template {
  id: string;
  name: string;
  category: 'contrarian' | 'list' | 'story' | 'thread' | 'poll' | 'value' | 'question';
  template: string;
  placeholders: { key: string; hint: string }[];
  expectedScore: number;
  bestWith: ('image' | 'video' | 'poll')[];
}
```

---

# Phase 3: Analytics & Polish (Days 10-12)

## Goal
Data-driven insights + keyboard-first UX.

## Context Files Required
- `keyboard-shortcuts.md` — Hotkey patterns
- `chart-libraries.md` — Lightweight charts
- `export-patterns.md` — CSV/JSON

## Features
- [ ] Analytics dashboard
- [ ] Score vs performance correlation chart
- [ ] ⌘K command palette
- [ ] Keyboard shortcuts throughout
- [ ] Data export (CSV/JSON)
- [ ] Quick reference overlay

## Keyboard Shortcuts
| Shortcut | Action |
|----------|--------|
| `⌘ + Enter` | Copy tweet |
| `⌘ + K` | Command palette |
| `⌘ + G` | Generate hooks |
| `⌘ + T` | Templates |
| `Esc` | Clear/close |

---

# Success Criteria

## Phase 1 Complete When: ✅ DONE
- [x] Real-time scoring works as user types
- [x] Score updates within 100ms
- [x] AI generates 5 hook variations
- [x] Copy to clipboard works (⌘+Enter)
- [x] Dark theme matches Raycast aesthetic

## Phase 2 Complete When:
- [ ] 10+ templates available
- [ ] Templates populate scorer
- [ ] Tweet history persists across sessions
- [ ] Timing advisor shows peak hours

## Phase 3 Complete When:
- [ ] Analytics show score/performance correlation
- [ ] ⌘K opens command palette
- [ ] Data exports to CSV/JSON
- [ ] All keyboard shortcuts work
