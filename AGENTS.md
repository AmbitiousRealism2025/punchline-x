# Tweet Optimizer — Agent Configuration

## Project Overview
Personal tweet optimization tool with real-time scoring and AI hook generation.

**Stack**: Bun + Vite + React 19 + TinyBase + Tailwind v4 + shadcn/ui + ZAI GLM 4.7

---

## Agent Roles

### 🏗️ Build Agent (Primary)
**Purpose**: Execute development tasks and maintain the codebase.

**Instructions**:
1. Reference AGENTS.md for project context
2. Check ENHANCEMENTS.md for future improvements
3. Mark tasks complete as you go
4. Run `bun run tsc --noEmit` after changes

**Tools**: All standard tools + file operations

---

### 🔍 Explore Agent
**Purpose**: Find patterns, search codebase.

**When to use**:
- Finding existing implementations
- Locating file structures
- AST-based code search

---

### 📚 Librarian Agent
**Purpose**: Research external libraries, fetch docs.

**When to use**:
- Looking up TinyBase API
- Finding OpenAI SDK patterns (used for ZAI)
- Checking Tailwind v4 syntax
- shadcn/ui component usage

---

### 🎨 Frontend UI/UX Agent
**Purpose**: Visual design, styling, animations.

**When to use**:
- Implementing Raycast-style components
- Color palette adjustments
- Animation polish
- Responsive layouts

**Design System**:
- Dark mode ONLY
- Background: `#09090b`
- Accent: `#06b6d4` (Cyan)
- Font: Inter / system
- Radius: 0.5rem

---

### 🧠 Oracle Agent
**Purpose**: Architecture decisions, complex debugging.

**When to use**:
- Stuck on implementation
- Need architecture guidance
- Complex state management
- Performance optimization

---

## Context Structure

```
tweet-optimizer/
├── src/
│   ├── components/         # React components
│   ├── lib/                # Utilities, scoring, templates
│   ├── hooks/              # Custom React hooks
│   └── server/             # Bun AI proxy server
├── ENHANCEMENTS.md         # Future improvements
└── package.json
```

## Key Files Reference

| Need | File |
|------|------|
| Scoring algorithm | `Scoring_System_Spec.md` (original) |
| Tweet templates | `Content_Templates.md` (original) |
| TinyBase hooks | `src/hooks/useScore.ts` |
| ZAI API | `src/server/ai-proxy.ts` (OpenAI SDK with ZAI endpoint) |
| Theme colors | `src/index.css` (Tailwind v4 theme)

---

## Commands

```bash
# Development
bun run dev              # Start Vite dev server (port 5173)
bun run src/server/ai-proxy.ts  # Start AI proxy (port 3001)

# Build
bun run build

# Add shadcn component
bun x shadcn@latest add [component]
```

---

## Constraints

### DO
- Use TinyBase for state (not useState/useReducer)
- Use shadcn/ui components (not custom from scratch)
- Proxy AI API through Bun server (ZAI GLM 4.7)
- Follow Raycast dark aesthetic
- Keep scoring algorithm faithful to spec

### DON'T
- Expose ZAI_API_KEY to frontend
- Add light mode toggle
- Use purple accent (user specified cyan)
- Over-engineer MVP (keep it simple)
- Skip lsp_diagnostics after file changes

---

## Phase Checklist

### Phase 1: MVP ✅ COMPLETE
- [x] Project setup (Bun + Vite + React)
- [x] Tailwind v4 + shadcn dark theme
- [x] TinyBase store + persistence
- [x] Scoring engine (all modules)
- [x] Core UI components
- [x] ZAI GLM 4.7 AI proxy server
- [x] Hook generator
- [x] Copy to clipboard (⌘+Enter)

### Phase 2: Templates ✅ COMPLETE
- [x] Template data structure
- [x] Template library (15 templates)
- [x] Fill-in-the-blank editor
- [x] Tweet logging (tweetLog table)
- [x] Timing advisor (peak hours visualization)
- [x] Tab navigation (Compose | Templates)

### Phase 3: Analytics ✅ COMPLETE
- [x] Analytics dashboard (tweet history + stats)
- [x] Command palette (⌘K)
- [x] Keyboard shortcuts (⌘1/2/3 tabs, ⌘N new, ⌘↵ copy)
- [x] Data export (JSON/CSV)

---

## Debugging Tips

### TinyBase not updating UI
- Check `Provider` wraps app
- Verify table/row/cell IDs match
- Use `useCell` not `useState`

### Tailwind classes not working
- Ensure `@import "tailwindcss"` is first line
- Restart dev server after CSS changes
- Check Vite plugin is registered

### ZAI API errors
- Verify ZAI_API_KEY environment variable is set
- Check Bun server is running on 3001
- Look for CORS issues in console
- ZAI endpoint: https://api.z.ai/api/coding/paas/v4/

### Scoring seems wrong
- Compare against `Scoring_System_Spec.md`
- Log breakdown to see individual factors
- Check caps/floors (0-100, category caps)
