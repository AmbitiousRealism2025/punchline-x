# Punchline X

AI-powered post optimization for X. **Score before you post.**

[![GitHub](https://img.shields.io/github/license/AmbitiousRealism2025/punchline-x)](https://github.com/AmbitiousRealism2025/punchline-x)

---

## What is Punchline X?

A lightweight tool that scores your posts against X's algorithm factors before you hit publish. Get real-time feedback, AI-generated hooks, and data-driven suggestions to maximize your reach.

**Core features:**
- Real-time scoring engine (7 factors, <100ms)
- 15 proven tweet templates with fill-in-the-blank editor
- AI hook generation (ZAI GLM 4.7)
- Analytics dashboard with history tracking
- Command palette (⌘K) and keyboard shortcuts
- Dark Raycast-style theme

---

## Quick Start

```bash
# Clone the repo
git clone https://github.com/AmbitiousRealism2025/punchline-x.git
cd punchline-x/app

# Install dependencies
bun install

# Set up environment (ZAI API key)
echo "ZAI_API_KEY=your-key-here" > .env.local

# Start dev server (port 5173)
bun run dev

# Start AI proxy (port 3001) - separate terminal
bun src/server/ai-proxy.ts
```

Open http://localhost:5173

---

## Project Structure

```
punchline-x/
├── app/                        # The application
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── lib/                # Scoring engine, templates, store
│   │   ├── hooks/              # Custom React hooks
│   │   └── server/             # Bun AI proxy
│   ├── package.json
│   └── README.md               # App-specific docs
│
├── feature-enhancements.md     # AI feature roadmap (15 features)
├── naming-options.md           # Brand naming research
│
│   # Original planning docs (reference)
├── Scoring_System_Spec.md      # Scoring algorithm specification
├── Content_Templates.md        # Tweet template library
├── Tweet_Strategy_Guide.md     # X algorithm strategy guide
├── App_Master_Plan.md          # Product specification
├── Quick_Reference_Card.md     # Cheat sheet
└── AGENTS.md                   # AI agent configuration
```

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Bun |
| Build | Vite 7 |
| Frontend | React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| UI | shadcn/ui (New York, dark) |
| State | TinyBase + localStorage |
| AI | ZAI GLM 4.7 |

---

## Scoring Algorithm

Posts start at base 40, modified by:

| Factor | Range | Notes |
|--------|-------|-------|
| Media | +15 to +40 | Video best, images good |
| Hook strength | -5 to +25 | Pattern interrupts, questions, numbers |
| Engagement signals | -15 to +25 | CTAs, questions, debate invitations |
| Timing | -10 to +20 | Peak hours 8-11am PST |
| Account status | 0 to +30 | Premium + Verified bonuses |
| Content quality | -10 to +15 | Length, formatting, hashtags |
| Link penalty | -20 to -50 | Links hurt without Premium |

**Score thresholds:**
- 85+ = Excellent (post with confidence)
- 70-84 = Good (should perform well)
- 55-69 = Fair (consider improvements)
- 40-54 = Poor (rework needed)
- <40 = Critical (do not post)

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `⌘K` | Open command palette |
| `⌘1` | Go to Compose tab |
| `⌘2` | Go to Templates tab |
| `⌘3` | Go to Analytics tab |
| `⌘N` | New post (clear input) |
| `⌘Enter` | Copy to clipboard |

---

## Roadmap

See [`feature-enhancements.md`](./feature-enhancements.md) for the full AI feature roadmap, including:

- Deep Hook Analysis (psychological breakdown)
- Intelligent Rewriter (AI rewrites with explanations)
- Thread Architect (AI-planned thread structure)
- Viral Anatomy Explainer (learn from viral posts)
- A/B Variant Generator
- And 10 more...

---

## Development

```bash
cd app

# Dev server
bun run dev

# Type check
bun run tsc --noEmit

# Build
bun run build

# Add shadcn component
bun x shadcn@latest add [component]
```

---

## License

MIT

---

## Acknowledgments

Based on research into:
- Creator Buddy by Alex Finn
- X algorithm open-source code analysis
- 2025/2026 algorithm documentation
