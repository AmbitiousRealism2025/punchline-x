# QA Fix Request

**Status**: REJECTED
**Date**: 2026-01-07T03:18:00Z
**QA Session**: 1

## Critical Issues to Fix

### 1. Thread Suggestions Using Wrong Function
**Problem**: `calculateThreadScore()` is calling a simple local `generateThreadSuggestions()` function instead of the comprehensive exported version from `suggestions.ts` that includes hook/CTA/climax analysis.

**Location**: `app/src/lib/scoring/calculator.ts:211`

**Required Fix**:
```typescript
// At top of file, add import:
import { generateThreadSuggestions } from './suggestions'

// At line 211, change from:
suggestions: generateThreadSuggestions(individualScores, breakdown),

// To:
suggestions: generateThreadSuggestions(
  tweets.filter((t) => t.text.trim().length > 0),
  individualScores,
  breakdown
),

// Delete the local generateThreadSuggestions function (lines 109-144)
```

**Verification**: After fix, build should pass and thread suggestions should include:
- "Strengthen your opening tweet with a compelling hook"
- "First tweet sets the tone - aim for 60+ score"
- "Consider building to a climax in the final third"
- "Add a call-to-action in your final tweet"

---

### 2. Copy-to-Clipboard Format (Requires Clarification)
**Problem**: Spec says "with numbering removed" but implementation adds "1. ", "2. " prefixes.

**Location**: `app/src/components/threads/ThreadBuilder.tsx:101`

**Decision Needed**: Which format is preferred?
- Current: Adds numbering (better for Twitter threads)
- Spec: Remove numbering

**If strict spec compliance required**:
```typescript
// Line 101, change from:
return `${index + 1}. ${text}`

// To:
return text
```

---

## After Fixes

Once fixes are complete:
1. Run `npm run build` to verify no TypeScript errors
2. Commit with message: "fix: use comprehensive thread suggestions (qa-requested)"
3. QA will automatically re-run validation

---

**QA Report**: See qa_report.md for full details
**QA Agent Session**: 1
