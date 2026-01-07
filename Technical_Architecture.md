# Technical Architecture

> **⚠️ LEGACY DOCUMENT — DO NOT USE**
>
> This document was the **original** architecture proposal using Next.js + Supabase.
> The actual implementation uses a different stack:
>
> | Original (This Doc) | Actual Implementation |
> |---------------------|----------------------|
> | Next.js 14 | Vite 7 + React 19 |
> | Supabase | TinyBase + localStorage |
> | Vercel | Local-only |
> | Server Components | Client SPA |
>
> **Source of Truth**: `.sisyphus/plans/tweet-optimizer.md`
>
> ---

## Overview

This document provides the complete technical specification for building the Tweet Optimizer app. It's designed for a solo developer using modern AI-assisted development tools (Cursor, Claude, etc.).

---

## Technology Stack

### Frontend
| Component | Technology | Rationale |
|-----------|------------|-----------|
| Framework | Next.js 14 | App router, server components, Vercel deploy |
| Styling | Tailwind CSS | Rapid development, utility-first |
| UI Components | shadcn/ui | Accessible, customizable, looks great |
| State Management | React hooks + Context | Simple, no external deps needed |
| Forms | React Hook Form + Zod | Type-safe validation |

### Backend
| Component | Technology | Rationale |
|-----------|------------|-----------|
| Database | Supabase (PostgreSQL) | Free tier, auth included, real-time |
| Auth | Supabase Auth | Email/password, OAuth ready |
| Storage | Supabase Storage | For user uploads (optional) |
| API | Next.js API Routes | Serverless, co-located with frontend |

### AI Integration (Phase 2)
| Component | Technology | Rationale |
|-----------|------------|-----------|
| AI Provider | Claude API | Best for text analysis/generation |
| Fallback | OpenAI API | Backup option |

### Deployment
| Component | Technology | Rationale |
|-----------|------------|-----------|
| Hosting | Vercel | Zero-config Next.js deployment |
| Domain | Vercel or custom | Easy SSL, edge network |
| Analytics | Vercel Analytics or Plausible | Privacy-friendly |

---

## Project Structure

```
tweet-optimizer/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── signup/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── (dashboard)/
│   │   ├── templates/
│   │   │   └── page.tsx
│   │   ├── analytics/
│   │   │   └── page.tsx
│   │   ├── settings/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   ├── score/
│   │   │   └── route.ts
│   │   ├── templates/
│   │   │   └── route.ts
│   │   └── tweets/
│   │       └── route.ts
│   ├── layout.tsx
│   ├── page.tsx (home - scorer)
│   └── globals.css
├── components/
│   ├── ui/ (shadcn components)
│   ├── scorer/
│   │   ├── TweetInput.tsx
│   │   ├── ScoreDisplay.tsx
│   │   ├── MediaToggle.tsx
│   │   ├── SuggestionList.tsx
│   │   └── index.ts
│   ├── templates/
│   │   ├── TemplateCard.tsx
│   │   ├── TemplateGrid.tsx
│   │   └── TemplateModal.tsx
│   └── shared/
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── LoadingSpinner.tsx
├── lib/
│   ├── scoring/
│   │   ├── calculator.ts
│   │   ├── hooks.ts
│   │   ├── media.ts
│   │   ├── engagement.ts
│   │   ├── quality.ts
│   │   └── index.ts
│   ├── templates/
│   │   ├── data.ts
│   │   └── types.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   └── utils/
│       ├── formatting.ts
│       └── validation.ts
├── hooks/
│   ├── useScore.ts
│   ├── useTemplates.ts
│   ├── useAuth.ts
│   └── useTweetHistory.ts
├── types/
│   ├── tweet.ts
│   ├── template.ts
│   └── user.ts
├── public/
│   └── ...
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql
├── .env.local
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## Database Schema

### Tables

```sql
-- Users (handled by Supabase Auth, extended with profile)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  is_premium BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  timezone TEXT DEFAULT 'America/Los_Angeles',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tweets (for tracking performance)
CREATE TABLE tweets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  media_type TEXT CHECK (media_type IN ('none', 'image', 'video', 'gif', 'poll')),
  has_link BOOLEAN DEFAULT FALSE,
  pre_score INTEGER,
  hook_type TEXT,
  content_type TEXT CHECK (content_type IN ('value', 'engagement', 'story', 'community')),
  template_id TEXT,
  posted_at TIMESTAMPTZ,
  impressions INTEGER,
  engagements INTEGER,
  engagement_rate DECIMAL(5,2),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Templates (for custom user templates)
CREATE TABLE custom_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  template TEXT NOT NULL,
  placeholders JSONB,
  expected_score INTEGER,
  best_with TEXT[],
  is_public BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE tweets ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_templates ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can view own tweets" ON tweets
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tweets" ON tweets
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tweets" ON tweets
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own tweets" ON tweets
  FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view own templates" ON custom_templates
  FOR SELECT USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can manage own templates" ON custom_templates
  FOR ALL USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX idx_tweets_user_id ON tweets(user_id);
CREATE INDEX idx_tweets_posted_at ON tweets(posted_at);
CREATE INDEX idx_custom_templates_user_id ON custom_templates(user_id);
CREATE INDEX idx_custom_templates_category ON custom_templates(category);
```

---

## Core Components

### Tweet Scorer Component

```tsx
// components/scorer/TweetInput.tsx
'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { calculateScore } from '@/lib/scoring';
import { ScoreDisplay } from './ScoreDisplay';
import { MediaToggle } from './MediaToggle';
import { SuggestionList } from './SuggestionList';

interface TweetInputProps {
  onScoreChange?: (score: number) => void;
}

export function TweetInput({ onScoreChange }: TweetInputProps) {
  const [text, setText] = useState('');
  const [mediaType, setMediaType] = useState<MediaType>('none');
  const [hasLink, setHasLink] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [score, setScore] = useState<ScoreResult | null>(null);

  // Auto-detect links
  useEffect(() => {
    const linkPattern = /https?:\/\/[^\s]+/;
    setHasLink(linkPattern.test(text));
  }, [text]);

  // Calculate score on any change
  useEffect(() => {
    if (text.length > 0) {
      const result = calculateScore({
        text,
        mediaType,
        hasLink,
        isPremium,
        postTime: new Date()
      });
      setScore(result);
      onScoreChange?.(result.total);
    } else {
      setScore(null);
    }
  }, [text, mediaType, hasLink, isPremium, onScoreChange]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write your tweet..."
          className="min-h-[150px] text-lg"
          maxLength={280}
        />
        <div className="absolute bottom-2 right-2 text-sm text-muted-foreground">
          {text.length}/280
        </div>
      </div>

      <MediaToggle
        selected={mediaType}
        onSelect={setMediaType}
        hasLink={hasLink}
        isPremium={isPremium}
        onPremiumChange={setIsPremium}
      />

      {score && (
        <>
          <ScoreDisplay score={score} />
          <SuggestionList suggestions={score.suggestions} />
        </>
      )}
    </div>
  );
}
```

### Score Display Component

```tsx
// components/scorer/ScoreDisplay.tsx
import { cn } from '@/lib/utils';

interface ScoreDisplayProps {
  score: ScoreResult;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  const getScoreColor = (value: number) => {
    if (value >= 85) return 'text-green-500';
    if (value >= 70) return 'text-lime-500';
    if (value >= 55) return 'text-yellow-500';
    if (value >= 40) return 'text-orange-500';
    return 'text-red-500';
  };

  const getScoreLabel = (value: number) => {
    if (value >= 85) return 'Excellent';
    if (value >= 70) return 'Good';
    if (value >= 55) return 'Fair';
    if (value >= 40) return 'Poor';
    return 'Critical';
  };

  return (
    <div className="rounded-lg border p-6 bg-card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Tweet Score</h3>
        <span className={cn('text-3xl font-bold', getScoreColor(score.total))}>
          {score.total}/100
        </span>
      </div>

      <div className="w-full bg-secondary rounded-full h-3 mb-4">
        <div
          className={cn('h-3 rounded-full transition-all', {
            'bg-green-500': score.total >= 85,
            'bg-lime-500': score.total >= 70 && score.total < 85,
            'bg-yellow-500': score.total >= 55 && score.total < 70,
            'bg-orange-500': score.total >= 40 && score.total < 55,
            'bg-red-500': score.total < 40,
          })}
          style={{ width: `${score.total}%` }}
        />
      </div>

      <p className="text-sm text-muted-foreground">
        {getScoreLabel(score.total)} - {
          score.total >= 70
            ? 'Ready to post!'
            : 'Consider improvements below'
        }
      </p>

      {/* Score Breakdown */}
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        {Object.entries(score.breakdown).map(([key, value]) => (
          <div key={key} className="flex justify-between">
            <span className="text-muted-foreground capitalize">{key}:</span>
            <span className={cn({
              'text-green-500': value > 0,
              'text-red-500': value < 0,
              'text-muted-foreground': value === 0,
            })}>
              {value > 0 ? '+' : ''}{value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

---

## Scoring Engine Implementation

```typescript
// lib/scoring/calculator.ts
import { analyzeHook } from './hooks';
import { getMediaScore } from './media';
import { getEngagementScore } from './engagement';
import { getContentQualityScore } from './quality';
import { generateSuggestions, generateWarnings } from './suggestions';

export interface TweetInput {
  text: string;
  mediaType: 'none' | 'image' | 'video' | 'gif' | 'poll';
  hasLink: boolean;
  isPremium: boolean;
  isVerified?: boolean;
  postTime: Date;
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

export interface ScoreResult {
  total: number;
  breakdown: ScoreBreakdown;
  suggestions: Suggestion[];
  warnings: Warning[];
}

const BASE_SCORE = 40;

export function calculateScore(input: TweetInput): ScoreResult {
  const breakdown: ScoreBreakdown = {
    base: BASE_SCORE,
    media: getMediaScore(input.mediaType, input.hasLink, input.isPremium),
    hook: analyzeHook(input.text),
    engagement: getEngagementScore(input.text),
    timing: getTimingScore(input.postTime),
    account: getAccountScore(input.isPremium, input.isVerified),
    quality: getContentQualityScore(input.text),
  };

  const total = Math.max(0, Math.min(100, Object.values(breakdown).reduce((a, b) => a + b, 0)));

  return {
    total,
    breakdown,
    suggestions: generateSuggestions(input, breakdown),
    warnings: generateWarnings(input),
  };
}

function getTimingScore(postTime: Date): number {
  const hour = postTime.getHours();
  const day = postTime.getDay();
  
  let score = 0;
  
  // Weekday bonus
  if (day >= 1 && day <= 5) score += 5;
  
  // Time of day (assuming local time matches target audience)
  if (hour >= 8 && hour < 11) {
    score += 15; // Primary peak
  } else if (hour >= 12 && hour < 14) {
    score += 10; // Secondary peak
  } else if (hour >= 18 || hour < 6) {
    score -= 10; // Off-peak
  }
  
  return score;
}

function getAccountScore(isPremium?: boolean, isVerified?: boolean): number {
  let score = 0;
  if (isPremium) score += 20;
  if (isVerified) score += 10;
  return score;
}
```

---

## API Routes

### Score API

```typescript
// app/api/score/route.ts
import { NextResponse } from 'next/server';
import { calculateScore } from '@/lib/scoring';
import { z } from 'zod';

const scoreRequestSchema = z.object({
  text: z.string().min(1).max(280),
  mediaType: z.enum(['none', 'image', 'video', 'gif', 'poll']),
  hasLink: z.boolean(),
  isPremium: z.boolean(),
  isVerified: z.boolean().optional(),
  postTime: z.string().datetime().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = scoreRequestSchema.parse(body);

    const result = calculateScore({
      ...data,
      postTime: data.postTime ? new Date(data.postTime) : new Date(),
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request', details: error.errors },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

---

## Environment Variables

```bash
# .env.local

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# AI (Phase 2)
ANTHROPIC_API_KEY=your-claude-api-key
OPENAI_API_KEY=your-openai-api-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

---

## Build Commands

```bash
# Initial setup
npx create-next-app@latest tweet-optimizer --typescript --tailwind --eslint --app
cd tweet-optimizer

# Install dependencies
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs
npm install zod react-hook-form @hookform/resolvers
npm install lucide-react
npx shadcn-ui@latest init

# Add shadcn components
npx shadcn-ui@latest add button input textarea card badge
npx shadcn-ui@latest add toggle toggle-group tooltip
npx shadcn-ui@latest add dialog sheet tabs

# Development
npm run dev

# Build
npm run build

# Deploy (Vercel)
vercel
```

---

## Development Phases

### Phase 1: MVP (Days 1-7)

**Day 1-2: Project Setup**
- [ ] Initialize Next.js project
- [ ] Configure Tailwind and shadcn
- [ ] Set up Supabase project
- [ ] Create database schema

**Day 3-4: Core Scorer**
- [ ] Implement scoring engine
- [ ] Build TweetInput component
- [ ] Build ScoreDisplay component
- [ ] Add real-time calculation

**Day 5-6: Templates**
- [ ] Create template data structure
- [ ] Build TemplateGrid component
- [ ] Build TemplateModal with fill-in
- [ ] Connect templates to scorer

**Day 7: Polish & Deploy**
- [ ] Mobile responsiveness
- [ ] Loading states
- [ ] Error handling
- [ ] Deploy to Vercel

### Phase 2: User Accounts (Days 8-14)

**Day 8-9: Authentication**
- [ ] Set up Supabase Auth
- [ ] Create login/signup pages
- [ ] Add auth middleware
- [ ] Profile settings page

**Day 10-12: Tweet Tracking**
- [ ] Build tweet logging form
- [ ] Create tweets list view
- [ ] Calculate stored analytics
- [ ] Export functionality

**Day 13-14: Analytics Dashboard**
- [ ] Score vs performance correlation
- [ ] Best times chart
- [ ] Content type breakdown
- [ ] Weekly/monthly trends

### Phase 3: AI Features (Days 15-21)

**Day 15-17: Hook Generator**
- [ ] Claude API integration
- [ ] Prompt engineering
- [ ] UI for suggestions
- [ ] Rate limiting

**Day 18-21: Enhancements**
- [ ] Thread builder
- [ ] Advanced analytics
- [ ] Custom templates
- [ ] Community features

---

## Performance Targets

| Metric | Target |
|--------|--------|
| Initial page load | < 2s |
| Score calculation | < 100ms |
| Template load | < 500ms |
| Lighthouse Performance | > 90 |
| Lighthouse Accessibility | > 95 |

---

## Testing Strategy

```typescript
// __tests__/scoring/calculator.test.ts
import { calculateScore } from '@/lib/scoring';

describe('calculateScore', () => {
  it('returns base score for empty text', () => {
    const result = calculateScore({
      text: 'Simple text',
      mediaType: 'none',
      hasLink: false,
      isPremium: false,
      postTime: new Date(),
    });
    expect(result.total).toBeGreaterThanOrEqual(35);
    expect(result.total).toBeLessThanOrEqual(50);
  });

  it('penalizes links without premium', () => {
    const result = calculateScore({
      text: 'Check this out https://example.com',
      mediaType: 'none',
      hasLink: true,
      isPremium: false,
      postTime: new Date(),
    });
    expect(result.total).toBeLessThan(30);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it('rewards video content', () => {
    const result = calculateScore({
      text: 'Watch this amazing video',
      mediaType: 'video',
      hasLink: false,
      isPremium: false,
      postTime: new Date(),
    });
    expect(result.breakdown.media).toBeGreaterThanOrEqual(30);
  });
});
```

---

## Security Checklist

- [ ] Environment variables not exposed to client
- [ ] Supabase RLS policies enforced
- [ ] Input validation on all endpoints
- [ ] Rate limiting on API routes
- [ ] HTTPS enforced in production
- [ ] No sensitive data in localStorage
- [ ] Auth tokens properly managed
