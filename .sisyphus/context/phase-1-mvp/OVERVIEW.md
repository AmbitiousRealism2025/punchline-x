# Phase 1: MVP Overview ✅ COMPLETE

## Goal
Build a working tweet scorer with real-time calculation and AI hook generation.

## Duration
Days 1-5

## Status
**IMPLEMENTED** - January 2026

## Success Criteria
- [x] Real-time scoring works as user types (< 100ms latency)
- [x] Score breakdown shows points per category
- [x] Media/Premium/Link toggles affect score
- [x] AI generates 5 hook variations on demand
- [x] Copy to clipboard works (⌘+Enter)
- [x] Dark theme matches Raycast aesthetic

## Context Files
| File | Purpose |
|------|---------|
| `tinybase-react.md` | Store setup, hooks, reactivity |
| `anthropic-sdk.md` | Claude API, streaming, prompts |
| `tailwind-v4.md` | CSS-first config, Vite plugin |
| `shadcn-dark.md` | Dark theme, components |

## Key Decisions

### Database: TinyBase (not Convex)
- **Why**: Local-first, granular cell-level reactivity
- **Trade-off**: No cloud sync (acceptable for personal tool)
- **Persistence**: localStorage for MVP, can upgrade to SQLite later

### AI: Claude Opus (not Sonnet)
- **Why**: User requested, better creative output
- **Model**: `claude-sonnet-4-5-20250929` (or opus variant)
- **Integration**: Bun proxy server, never expose key to frontend

### UI: Raycast Dark
- **Colors**: Zinc backgrounds, Cyan accent (#06b6d4)
- **Components**: shadcn/ui with custom CSS variables
- **Effects**: Top-shine gradient on cards

## Day-by-Day Breakdown

### Day 1: Setup
- Initialize Bun + Vite + React project
- Configure Tailwind v4 with Vite plugin
- Set up shadcn/ui with dark theme
- Create Shell layout component

### Day 2: Data Layer
- Set up TinyBase store with persistence
- Implement scoring engine (calculator, hooks, media, etc.)
- Create React hooks for store access

### Day 3: UI Components
- TweetInput with character counter
- ScoreDisplay with colored ring
- ScoreBreakdown (expandable)
- MediaToggles (toggle group)
- SuggestionList

### Day 4: AI Integration
- Create Bun server for Claude API proxy
- Implement hook generation endpoint
- Build HookGenerator component
- Wire up streaming (if time permits)

### Day 5: Polish
- Connect all components
- Test scoring accuracy against spec
- Add copy-to-clipboard
- Smooth animations
- Bug fixes

## File Structure (End of Phase 1)

```
tweet-optimizer/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn
│   │   ├── scorer/
│   │   │   ├── TweetInput.tsx
│   │   │   ├── ScoreDisplay.tsx
│   │   │   ├── ScoreBreakdown.tsx
│   │   │   ├── MediaToggles.tsx
│   │   │   └── SuggestionList.tsx
│   │   ├── ai/
│   │   │   └── HookGenerator.tsx
│   │   └── layout/
│   │       └── Shell.tsx
│   ├── lib/
│   │   ├── scoring/
│   │   │   ├── calculator.ts
│   │   │   ├── hooks.ts
│   │   │   ├── media.ts
│   │   │   ├── engagement.ts
│   │   │   ├── quality.ts
│   │   │   └── suggestions.ts
│   │   ├── store/
│   │   │   └── index.ts
│   │   ├── ai/
│   │   │   └── hooks.ts
│   │   └── utils.ts
│   ├── hooks/
│   │   ├── useScore.ts
│   │   └── useStore.ts
│   ├── server/
│   │   └── ai-proxy.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .env.local
├── vite.config.ts
├── components.json
└── package.json
```

## References
- Original specs: `/Users/ambrealismwork/Downloads/tweet-optimizer-package/`
- Scoring algorithm: `Scoring_System_Spec.md`
- Templates: `Content_Templates.md`
