# Punchline-X Project Structure & Tech Stack

> **Comprehensive documentation for developers and AI agents**

## Project Overview

**Punchline-X** is an AI-powered post optimization tool for X (Twitter). It scores posts against X's algorithm factors before publishing, providing real-time feedback, AI-generated hooks, and data-driven suggestions to maximize reach.

### Core Features
- Real-time scoring engine (7 factors, <100ms)
- 15 proven tweet templates with fill-in-the-blank editor
- AI hook generation (ZAI GLM 4.7 via proxy server)
- Analytics dashboard with history tracking
- Command palette (Cmd+K) and keyboard shortcuts
- Dark Raycast-style theme

---

## Tech Stack

### Runtime & Build

| Technology | Version | Purpose |
|------------|---------|---------|
| **Bun** | Runtime | JavaScript runtime & package manager |
| **Vite** | ^7.2.4 | Build tool & dev server |
| **TypeScript** | ~5.9.3 | Type safety |

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | ^19.2.0 | UI framework |
| **React DOM** | ^19.2.0 | React DOM renderer |

### Styling

| Technology | Version | Purpose |
|------------|---------|---------|
| **Tailwind CSS** | ^4.1.18 | Utility-first CSS framework |
| **@tailwindcss/vite** | ^4.1.18 | Vite plugin for Tailwind |
| **class-variance-authority** | ^0.7.1 | Component variant styling |
| **clsx** | ^2.1.1 | Conditional classnames |
| **tailwind-merge** | ^3.4.0 | Merge Tailwind classes |

### UI Components (Radix UI)

| Technology | Version | Purpose |
|------------|---------|---------|
| **@radix-ui/react-dialog** | ^1.1.15 | Modal dialogs |
| **@radix-ui/react-tabs** | ^1.1.13 | Tab navigation |
| **@radix-ui/react-tooltip** | ^1.2.8 | Tooltips |
| **@radix-ui/react-toggle** | ^1.1.10 | Toggle buttons |
| **@radix-ui/react-toggle-group** | ^1.1.11 | Toggle button groups |
| **@radix-ui/react-slot** | ^1.2.4 | Slot pattern for composition |
| **cmdk** | ^1.1.1 | Command palette (Cmd+K) |

### State Management

| Technology | Version | Purpose |
|------------|---------|---------|
| **TinyBase** | (used) | Reactive state store |
| **localStorage** | Native | State persistence |

### AI Integration

| Technology | Version | Purpose |
|------------|---------|---------|
| **OpenAI SDK** | ^6.15.0 | AI API client (ZAI GLM 4.7) |

### Development Tools

| Technology | Version | Purpose |
|------------|---------|---------|
| **ESLint** | ^9.39.1 | Linting |
| **@eslint/js** | ^9.39.1 | ESLint JS rules |
| **eslint-plugin-react-hooks** | ^7.0.1 | React hooks linting |
| **eslint-plugin-react-refresh** | ^0.4.24 | React Refresh linting |
| **typescript-eslint** | ^8.46.4 | TypeScript ESLint support |
| **globals** | ^16.5.0 | Global variables definitions |
| **@vitejs/plugin-react** | ^5.1.1 | Vite React plugin |
| **@types/node** | ^24.10.1 | Node.js type definitions |
| **@types/react** | ^19.2.5 | React type definitions |
| **@types/react-dom** | ^19.2.3 | React DOM type definitions |

---

## Package Configuration

```json
{
  "name": "punchline-x",
  "private": true,
  "type": "module",
  "version": "0.0.0"
}
```

### Key Details
- **ES Modules enabled**: `"type": "module"` in package.json
- **Package Manager**: Bun (bun.lock present)
- **Component Library**: shadcn/ui (New York style, dark theme)
- **Build**: `tsc -b && vite build`
- **Dev Server**: `bun run dev` (port 5173)
- **AI Proxy**: `bun src/server/ai-proxy.ts` (port 3001)

---

## Directory Structure

```
punchline-x/
├── app/                            # Main application directory
│   ├── src/
│   │   ├── components/             # React components
│   │   │   ├── ui/                 # shadcn/ui primitives (10 components)
│   │   │   │   ├── badge.tsx
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── command.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── textarea.tsx
│   │   │   │   ├── toggle.tsx
│   │   │   │   ├── toggle-group.tsx
│   │   │   │   └── tooltip.tsx
│   │   │   │
│   │   │   ├── scorer/             # Tweet scoring components
│   │   │   │   ├── index.ts        # Barrel export
│   │   │   │   ├── TweetInput.tsx  # Main text input
│   │   │   │   ├── ScoreDisplay.tsx # Score visualization
│   │   │   │   ├── ScoreBreakdown.tsx # Detailed score factors
│   │   │   │   ├── MediaToggles.tsx # Media type selector
│   │   │   │   └── SuggestionList.tsx # Improvement suggestions
│   │   │   │
│   │   │   ├── templates/          # Template system components
│   │   │   │   ├── index.ts        # Barrel export
│   │   │   │   ├── TemplateGrid.tsx # Template gallery
│   │   │   │   ├── TemplateCard.tsx # Individual template card
│   │   │   │   ├── ThreadTemplateCard.tsx # Thread template variant
│   │   │   │   ├── TemplateEditor.tsx # Fill-in-the-blank editor
│   │   │   │   └── TimingAdvisor.tsx # Optimal posting times
│   │   │   │
│   │   │   ├── analytics/          # Analytics dashboard
│   │   │   │   ├── index.ts        # Barrel export
│   │   │   │   ├── AnalyticsDashboard.tsx # Main dashboard
│   │   │   │   ├── TweetHistory.tsx # Historical tweet log
│   │   │   │   └── DataExport.tsx  # Export functionality
│   │   │   │
│   │   │   ├── ai/                 # AI features
│   │   │   │   └── HookGenerator.tsx # AI hook generation UI
│   │   │   │
│   │   │   ├── layout/             # Layout components
│   │   │   │   └── Shell.tsx       # Main app shell
│   │   │   │
│   │   │   └── CommandPalette.tsx  # Cmd+K command palette
│   │   │
│   │   ├── lib/                    # Utilities & business logic
│   │   │   ├── utils.ts            # General utilities (cn function)
│   │   │   │
│   │   │   ├── scoring/            # Scoring engine
│   │   │   │   ├── index.ts        # Barrel export
│   │   │   │   ├── types.ts        # Type definitions
│   │   │   │   ├── calculator.ts   # Main score calculation
│   │   │   │   ├── hooks.ts        # Hook pattern analysis
│   │   │   │   ├── media.ts        # Media scoring (+15 to +40)
│   │   │   │   ├── engagement.ts   # Engagement signal scoring
│   │   │   │   ├── quality.ts      # Content quality scoring
│   │   │   │   └── suggestions.ts  # Suggestion generation
│   │   │   │
│   │   │   ├── templates/          # Template data & types
│   │   │   │   ├── index.ts        # Barrel export
│   │   │   │   ├── types.ts        # Template type definitions
│   │   │   │   └── data.ts         # Template data
│   │   │   │
│   │   │   ├── ai/                 # AI integration
│   │   │   │   └── hooks.ts        # Hook generation client
│   │   │   │
│   │   │   └── store/              # State management
│   │   │       └── index.ts        # TinyBase store + localStorage persistence
│   │   │
│   │   ├── hooks/                  # Custom React hooks
│   │   │   └── useScore.ts         # Main scoring hook
│   │   │
│   │   ├── data/                   # Static data files
│   │   │   └── threadTemplates.ts  # Thread template definitions
│   │   │
│   │   ├── server/                 # Backend server
│   │   │   └── ai-proxy.ts         # Bun AI proxy server (ZAI GLM 4.7)
│   │   │
│   │   ├── App.tsx                 # Root component
│   │   ├── main.tsx                # Entry point
│   │   └── index.css               # Global styles (Tailwind)
│   │
│   ├── bun.lock                    # Bun lockfile
│   ├── package.json                # Dependencies
│   ├── components.json             # shadcn/ui configuration
│   ├── vite.config.ts              # Vite configuration
│   ├── tsconfig.json               # TypeScript config (extends)
│   ├── tsconfig.app.json           # App TypeScript config
│   ├── tsconfig.node.json          # Node TypeScript config
│   ├── eslint.config.js            # ESLint configuration
│   ├── index.html                  # HTML entry point
│   ├── README.md                   # App-specific documentation
│   └── ENHANCEMENTS.md             # Feature enhancements
│
├── .auto-claude/                   # AI agent configuration
│   └── specs/                      # Task specifications
│
├── AGENTS.md                       # AI agent instructions
├── README.md                       # Project documentation
├── App_Master_Plan.md              # Product specification
├── Scoring_System_Spec.md          # Scoring algorithm docs
├── Content_Templates.md            # Tweet template library
├── Tweet_Strategy_Guide.md         # X algorithm strategy
├── Technical_Architecture.md       # Technical architecture docs
├── Quick_Reference_Card.md         # Cheat sheet
├── feature-enhancements.md         # AI feature roadmap (15 features)
├── naming-options.md               # Brand naming research
└── Tracking_Template.csv           # Tracking template
```

---

## Architecture Overview

### Component Organization

#### 1. UI Components (`/components/ui/`)
Reusable shadcn/ui primitives following the New York style variant. All components use:
- Radix UI primitives for accessibility
- class-variance-authority for variants
- Tailwind CSS for styling
- `cn()` utility for class merging

#### 2. Scorer Module (`/components/scorer/`)
The core tweet scoring interface:
- **TweetInput**: Main textarea with character count
- **ScoreDisplay**: Visual score indicator (0-100)
- **ScoreBreakdown**: Category-by-category breakdown
- **MediaToggles**: Media type selection (none/image/video/carousel)
- **SuggestionList**: Actionable improvement suggestions

#### 3. Templates Module (`/components/templates/`)
Tweet template system:
- **TemplateGrid**: Gallery of 15 proven templates
- **TemplateCard**: Individual template preview
- **TemplateEditor**: Fill-in-the-blank editor
- **TimingAdvisor**: Optimal posting time suggestions

#### 4. Analytics Module (`/components/analytics/`)
Performance tracking:
- **AnalyticsDashboard**: Score trends and statistics
- **TweetHistory**: Historical log of scored tweets
- **DataExport**: Export data as CSV/JSON

#### 5. AI Module (`/components/ai/`)
AI-powered features:
- **HookGenerator**: Generate viral hooks using ZAI GLM 4.7

#### 6. Layout (`/components/layout/`)
App structure:
- **Shell**: Main layout wrapper with header

### Scoring Engine (`/lib/scoring/`)

The scoring engine calculates a 0-100 score based on 7 factors:

| Factor | Range | Module |
|--------|-------|--------|
| Media | +15 to +40 | `media.ts` |
| Hook strength | -5 to +25 | `hooks.ts` |
| Engagement signals | -15 to +25 | `engagement.ts` |
| Timing | -10 to +20 | `calculator.ts` |
| Account status | 0 to +30 | `calculator.ts` |
| Content quality | -10 to +15 | `quality.ts` |
| Link penalty | -20 to -50 | `calculator.ts` |

**Base score**: 40 points

### State Management (`/lib/store/`)

Uses TinyBase with localStorage persistence:
- **settings**: User preferences (Premium, Verified, timezone)
- **currentTweet**: Current draft (text, mediaType, hasLink)
- **tweetLog**: Historical tweet data

### AI Proxy Server (`/server/ai-proxy.ts`)

Bun-based proxy server for AI integration:
- Runs on port 3001
- Proxies requests to ZAI GLM 4.7
- Requires `ZAI_API_KEY` environment variable

---

## Import Aliases

Configured in `vite.config.ts`:

```typescript
{
  '@': './src'
}
```

Usage examples:
- `@/components/ui/button`
- `@/lib/utils`
- `@/hooks/useScore`

---

## Design System

| Property | Value |
|----------|-------|
| Background | `#09090b` (zinc-950) |
| Surface | `#0f0f11` |
| Accent | `#06b6d4` (cyan-500) |
| Text Primary | `#fafafa` |
| Text Secondary | `#a1a1aa` |
| Border | `#27272a` |
| Border Radius | 0.5rem |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+K` | Open command palette |
| `Cmd+1` | Go to Compose tab |
| `Cmd+2` | Go to Templates tab |
| `Cmd+3` | Go to Analytics tab |
| `Cmd+N` | New post (clear input) |
| `Cmd+Enter` | Copy to clipboard |

---

## Development Commands

```bash
# Navigate to app directory
cd app

# Install dependencies
bun install

# Start dev server (port 5173)
bun run dev

# Start AI proxy (port 3001) - separate terminal
bun src/server/ai-proxy.ts

# Type check
bun run tsc --noEmit

# Lint
bun run lint

# Production build
bun run build

# Preview production build
bun run preview

# Add shadcn component
bun x shadcn@latest add [component]
```

---

## Environment Variables

Create `.env.local` in the `app/` directory:

```bash
ZAI_API_KEY=your-key-here
```

---

## Score Thresholds

| Score | Rating | Action |
|-------|--------|--------|
| 85+ | Excellent | Post with confidence |
| 70-84 | Good | Should perform well |
| 55-69 | Fair | Consider improvements |
| 40-54 | Poor | Rework needed |
| <40 | Critical | Do not post |
