# Punchline X

AI-powered post optimization for X. Score before you post.

## Stack

| Layer | Technology |
|-------|------------|
| Runtime | Bun |
| Build | Vite 7 |
| Frontend | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui (New York) |
| State | TinyBase + localStorage |
| AI | ZAI GLM 4.7 |

## Quick Start

```bash
# Install dependencies
bun install

# Start dev server (port 5173)
bun run dev

# Start AI proxy (port 3001) - required for hook generation
bun src/server/ai-proxy.ts

# Production build
bun run build
```

## Environment

Create `.env.local` or set in shell profile:
```
ZAI_API_KEY=your-key-here
```

## Project Structure

```
src/
├── components/
│   ├── ui/           # shadcn components
│   ├── scorer/       # TweetInput, ScoreDisplay, etc.
│   ├── ai/           # HookGenerator
│   └── layout/       # Shell
├── lib/
│   ├── scoring/      # Scoring engine (calculator, hooks, media, etc.)
│   ├── store/        # TinyBase store + persistence
│   └── ai/           # Hook generation client
├── hooks/
│   └── useScore.ts   # Main scoring hook
└── server/
    └── ai-proxy.ts   # Bun AI proxy (ZAI GLM 4.7)
```

## Features

### Phase 1 (Complete)
- [x] Real-time scoring (< 100ms)
- [x] Score breakdown by category
- [x] Media/Premium/Link toggles
- [x] AI hook generation
- [x] Copy to clipboard (Cmd+Enter)
- [x] Dark Raycast theme

### Phase 2 (Planned)
- [ ] Template library
- [ ] Fill-in-the-blank editor
- [ ] Tweet logging
- [ ] Timing advisor

### Phase 3 (Planned)
- [ ] Analytics dashboard
- [ ] Cmd+K command palette
- [ ] Data export

## Scoring Algorithm

Base score starts at 40, modified by:

| Factor | Range |
|--------|-------|
| Media | +15 to +40 (video best) |
| Hook strength | -5 to +25 |
| Engagement signals | -15 to +25 |
| Timing | -10 to +20 |
| Account status | 0 to +30 (Premium + Verified) |
| Content quality | -10 to +15 |
| Link penalty | -20 to -50 (without Premium) |

Final score capped at 0-100.

## Design System

- **Background**: `#09090b` (zinc-950)
- **Surface**: `#0f0f11`
- **Accent**: `#06b6d4` (cyan-500)
- **Text**: `#fafafa` / `#a1a1aa`
- **Border**: `#27272a`
- **Radius**: 0.5rem
