# Specification: Thread Builder

## Overview

The Thread Builder feature enables users to compose multi-tweet threads (2-25 tweets) with individual scoring for each tweet and aggregate thread-level analysis. This combines Typefully's thread creation excellence with Punchline X's unique scoring capabilities, providing creators with both granular optimization (per-tweet) and holistic quality assessment (overall thread flow, pacing, and structure).

## Workflow Type

**Type**: feature

**Rationale**: This is a new feature addition that extends the existing single-tweet composition interface. It introduces new UI components (thread editor, drag-and-drop interface), new state management patterns (multi-tweet arrays), and new scoring logic (thread-level aggregate scoring). This is a substantial feature that builds upon existing infrastructure while adding significant new functionality.

## Task Scope

### Services Involved
- **Frontend React App** (primary) - Single-page Vite application where all thread building functionality will be implemented

### This Task Will:
- [ ] Create a thread composition interface supporting 2-25 tweets per thread
- [ ] Implement drag-and-drop reordering using @dnd-kit library
- [ ] Extend existing scoring system to handle individual tweet scoring within threads
- [ ] Develop thread-level aggregate scoring with flow analysis
- [ ] Build AI-powered thread structure and pacing suggestions
- [ ] Add thread preview/visualization component
- [ ] Integrate thread state management into existing TinyBase store

### Out of Scope:
- Thread publishing to Twitter/X API (copy-to-clipboard only, like single tweets)
- Thread scheduling or queue management
- Collaboration features (multi-user thread editing)
- Thread analytics/performance tracking after posting
- Migration of existing single tweets to thread format

## Service Context

### Frontend React App

**Tech Stack:**
- Language: TypeScript
- Framework: React 19.2.0
- Build Tool: Vite 7.2.4
- UI Library: Radix UI + Tailwind CSS 4.1.18
- State Management: TinyBase
- AI Integration: OpenAI SDK 6.15.0

**Key directories:**
- `app/src/components/` - React components
- `app/src/lib/scoring/` - Existing scoring logic
- `app/src/lib/store/` - TinyBase state management
- `app/src/hooks/` - Custom React hooks

**Entry Point:** `app/src/main.tsx`

**How to Run:**
```bash
cd app
npm run dev
```

**Port:** 5173 (Vite default)

## Files to Modify

| File | Service | What to Change |
|------|---------|---------------|
| `app/src/App.tsx` | Frontend | Add new "Threads" tab to the main Tabs component |
| `app/src/lib/store/index.ts` | Frontend | Add thread state management (thread array, active thread ID) |
| `app/package.json` | Frontend | Add @dnd-kit dependencies (core, sortable, utilities) |

## Files to Reference

These files show patterns to follow:

| File | Pattern to Copy |
|------|----------------|
| `app/src/components/scorer/TweetInput.tsx` | Single-tweet input component pattern with TinyBase hooks |
| `app/src/lib/scoring/calculator.ts` | Score calculation logic to extend for thread-level scoring |
| `app/src/lib/store/index.ts` | TinyBase store patterns and data persistence |
| `app/src/components/templates/TemplateEditor.tsx` | Complex editor component with state management |
| `app/src/App.tsx` | Tab-based navigation pattern and component organization |

## Patterns to Follow

### TinyBase Store Pattern

From `app/src/lib/store/index.ts`:

```typescript
store.setRow('currentTweet', 'draft', {
  text: '',
  mediaType: 'none',
  hasLink: false,
})

// Usage in components
const text = useCell('currentTweet', 'draft', 'text') as string
const setText = useSetCellCallback('currentTweet', 'draft', 'text',
  (newText: string) => newText, [])
```

**Key Points:**
- Use `setRow()` to initialize state tables
- Use `useCell()` hook to read state
- Use `useSetCellCallback()` hook to update state
- TinyBase automatically persists to localStorage

### Component State Pattern

From `app/src/components/scorer/TweetInput.tsx`:

```typescript
export function TweetInput() {
  const text = (useCell('currentTweet', 'draft', 'text') as string) ?? ''
  const setText = useSetCellCallback('currentTweet', 'draft', 'text',
    (newText: string) => newText, [])

  return (
    <Card>
      <Textarea value={text} onChange={(e) => setText(e.target.value)} />
    </Card>
  )
}
```

**Key Points:**
- Keep component state in TinyBase, not local useState
- Provide default values with nullish coalescing
- Use Radix UI Card components for consistent styling

### Scoring System Pattern

From `app/src/lib/scoring/index.ts`:

```typescript
export { calculateScore } from './calculator'
export { getEngagementScore } from './engagement'
export { getContentQualityScore } from './quality'
export { generateSuggestions } from './suggestions'
```

**Key Points:**
- Scoring is modular with separate files for different score types
- `calculateScore()` is the main entry point
- Use existing scoring functions, extend with thread-specific logic

### Drag-and-Drop Pattern (dnd-kit)

**Required Imports:**

```typescript
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
```

**Sensor Setup (for accessibility):**

```typescript
const sensors = useSensors(
  useSensor(PointerSensor),
  useSensor(KeyboardSensor, {
    coordinateGetter: sortableKeyboardCoordinates
  })
)
```

**Key Functions:**
- `DndContext` - Main wrapper component for drag and drop
- `SortableContext` - Wrapper for sortable items with strategy
- `useSortable()` - Hook returning { attributes, listeners, setNodeRef, transform, transition }
- `arrayMove(items, oldIndex, newIndex)` - Utility to reorder arrays
- `CSS.Transform.toString(transform)` - Apply transforms correctly

**Critical Pattern:**
```typescript
// In component rendering sortable items
<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
  <SortableContext items={items} strategy={verticalListSortingStrategy}>
    {items.map((item) => <SortableItem key={item.id} id={item.id} />)}
  </SortableContext>
</DndContext>

// In SortableItem component
function SortableItem({ id }) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }

  return <div ref={setNodeRef} style={style} {...attributes} {...listeners}>...</div>
}
```

## Requirements

### Functional Requirements

1. **Thread Composition Interface**
   - Description: Users can create threads with 2-25 tweets, each with its own text editor
   - Acceptance:
     - Minimum 2 tweets enforced (can't save/score with fewer)
     - Maximum 25 tweets enforced (add button disabled at limit)
     - Each tweet has independent 280-character limit
     - Visual numbering (1/n, 2/n, etc.) for each tweet

2. **Individual Tweet Scoring**
   - Description: Each tweet in the thread receives its own individual score using existing scoring logic
   - Acceptance:
     - Each tweet displays its individual score (0-100)
     - Score updates in real-time as tweet text changes
     - Breakdown visible for each tweet (engagement, quality, hook type)
     - Media toggles and link detection work per-tweet

3. **Thread-Level Aggregate Scoring**
   - Description: Overall thread receives aggregate score based on individual tweets plus flow analysis
   - Acceptance:
     - Thread score visible (0-100) distinct from individual scores
     - Thread score factors in: average individual scores, flow coherence, pacing variation
     - Visual indicator of thread health (score color-coding)

4. **Drag-and-Drop Reordering**
   - Description: Users can reorder tweets within thread via drag-and-drop interaction
   - Acceptance:
     - Mouse-based drag-and-drop works smoothly
     - Keyboard navigation for accessibility (arrow keys + spacebar)
     - Visual feedback during drag (placeholder, active item styling)
     - Tweet numbering updates after reorder

5. **Thread Structure Suggestions**
   - Description: AI-powered suggestions for improving thread structure and pacing
   - Acceptance:
     - Suggestions appear in sidebar/panel (similar to SuggestionList component)
     - Suggestions include: hook placement, buildup pacing, climax positioning, call-to-action placement
     - Suggestions are actionable (not just informational)

### Edge Cases

1. **Empty Thread Handling** - Disable scoring and copy actions when thread has < 2 tweets
2. **Partial Thread Scores** - Handle scoring when some tweets are empty (exclude from aggregate)
3. **Drag Conflicts with Text Selection** - Ensure text selection in textarea doesn't trigger drag
4. **Character Limit Overflow** - Prevent copying thread if any tweet exceeds 280 characters
5. **State Persistence** - Auto-save thread to localStorage, restore on page reload
6. **Rapid Reordering** - Debounce score recalculation during active drag operations

## Implementation Notes

### DO
- Follow the TinyBase pattern in `lib/store/index.ts` for thread state management
- Reuse `TweetInput` component patterns for each thread tweet editor
- Use Radix UI Card components for consistent styling with existing UI
- Implement drag-and-drop using @dnd-kit (research phase confirmed compatibility)
- Extend `calculateScore()` function with thread-aware scoring logic
- Use existing `generateSuggestions()` as base for thread suggestions
- Follow tab pattern in `App.tsx` to add "Threads" tab

### DON'T
- Create new state management solution - use existing TinyBase store
- Build custom drag-and-drop - use @dnd-kit library
- Rewrite scoring from scratch - extend existing `lib/scoring/` modules
- Create standalone thread page - integrate as tab in main App.tsx
- Use HTML5 drag-and-drop API (dnd-kit is better for React)
- **CRITICAL**: Pass items to SortableContext in different order than DOM render - items array order MUST match visual order or drag-drop will break
- Forget to use `CSS.Transform.toString(transform)` - transforms won't apply correctly without this
- Skip keyboard sensor setup - accessibility will be broken without `sortableKeyboardCoordinates`

## Development Environment

### Start Services

```bash
cd app
npm install
npm run dev
```

### Service URLs
- Frontend: http://localhost:5173

### Required Environment Variables
- `ZAI_API_KEY`: API key for AI-powered suggestions via Z.AI proxy (optional for basic functionality)
  - Note: The app uses Z.AI proxy (not direct OpenAI/Anthropic) at port 3001
  - Base URL: https://api.z.ai/api/coding/paas/v4/
  - Model: glm-4.7

### Install New Dependencies

```bash
cd app
npm install @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities
```

## Success Criteria

The task is complete when:

1. [ ] Users can create threads with 2-25 tweets via new "Threads" tab
2. [ ] Each tweet displays individual score (0-100) in real-time
3. [ ] Overall thread score (0-100) displays with flow analysis
4. [ ] Drag-and-drop reordering works with mouse and keyboard
5. [ ] Thread structure suggestions appear and update based on thread content
6. [ ] Thread state persists to localStorage and restores on reload
7. [ ] Copy-to-clipboard exports entire thread text (with numbering removed)
8. [ ] No console errors during thread creation, editing, or reordering
9. [ ] Existing single-tweet scorer functionality remains unaffected
10. [ ] All existing tests still pass

## QA Acceptance Criteria

**CRITICAL**: These criteria must be verified by the QA Agent before sign-off.

### Unit Tests
| Test | File | What to Verify |
|------|------|----------------|
| Thread State Management | `app/src/lib/store/thread.test.ts` | Creating, updating, deleting threads; minimum/maximum tweet validation |
| Thread Scoring Logic | `app/src/lib/scoring/thread.test.ts` | Individual tweet scores, aggregate thread score, flow analysis calculations |
| Drag-and-Drop Reordering | `app/src/components/thread/ThreadBuilder.test.tsx` | Tweet order changes correctly, numbering updates, score recalculates |

### Integration Tests
| Test | Services | What to Verify |
|------|----------|----------------|
| Thread Creation Flow | Frontend | User can add tweets, type content, see scores update, save thread |
| Thread Editing Flow | Frontend | User can edit existing thread, reorder tweets, delete tweets |
| Thread Copy Flow | Frontend | User can copy thread to clipboard, format is correct, analytics logged |

### End-to-End Tests
| Flow | Steps | Expected Outcome |
|------|-------|------------------|
| Create First Thread | 1. Navigate to Threads tab 2. Add 3 tweets 3. Type content in each 4. Reorder via drag 5. Copy to clipboard | Thread created, scores display, reorder works, clipboard contains numbered thread text |
| Thread Persistence | 1. Create thread with 5 tweets 2. Reload page 3. Navigate to Threads tab | Thread restored with all content and order preserved |
| Thread Suggestions | 1. Create thread with weak structure 2. Review suggestions panel 3. Apply suggestion | Suggestions appear, are relevant, and update thread appropriately |

### Browser Verification (Frontend)
| Page/Component | URL | Checks |
|----------------|-----|--------|
| Threads Tab | `http://localhost:5173` → Threads tab | Tab appears, thread builder loads, no layout issues |
| Thread Builder Interface | Threads tab | All tweets render, drag handles visible, scores display, suggestions panel present |
| Drag-and-Drop Interaction | Threads tab | Smooth dragging, visual feedback, correct reordering, no jank |
| Score Displays | Threads tab | Individual tweet scores (0-100), thread score (0-100), breakdowns visible |
| Copy Functionality | Threads tab | Copy button enabled when thread valid, clipboard contains correct formatted text |

### Database Verification (TinyBase LocalStorage)
| Check | Query/Command | Expected |
|-------|---------------|----------|
| Thread State Exists | `localStorage.getItem('tweet-optimizer')` in DevTools | Contains `threads` table with thread data |
| Thread Persistence | Create thread → reload → check localStorage | Thread data persisted and restored correctly |
| Multi-Thread Support | Create 3 threads → check localStorage | All threads stored independently with unique IDs |

### Performance Verification
| Check | Method | Expected |
|-------|--------|----------|
| Score Calculation Speed | Type in tweet → measure time to score update | < 100ms per tweet scoring |
| Drag Responsiveness | Drag tweet up/down → visual lag check | No noticeable lag, 60fps smooth |
| Thread Load Time | Open Threads tab with 10 saved threads | < 500ms to render all threads |

### Accessibility Verification
| Check | Method | Expected |
|-------|--------|----------|
| Keyboard Navigation | Tab through thread builder, use arrow keys + spacebar for reorder | All interactive elements focusable, drag works with keyboard |
| Screen Reader | Use VoiceOver/NVDA to navigate thread builder | Tweets announced correctly, reorder operation clear |
| Focus Management | Drag tweet → verify focus | Focus maintained correctly during and after drag |

### QA Sign-off Requirements
- [ ] All unit tests pass (thread state, scoring, drag-drop)
- [ ] All integration tests pass (create, edit, copy flows)
- [ ] All E2E tests pass (full user workflows)
- [ ] Browser verification complete (UI renders correctly, interactions work)
- [ ] LocalStorage verification complete (state persists and restores)
- [ ] Performance benchmarks met (< 100ms scoring, 60fps drag)
- [ ] Accessibility checks pass (keyboard nav, screen reader)
- [ ] No regressions in existing single-tweet scorer functionality
- [ ] Code follows established TinyBase and Radix UI patterns
- [ ] No security vulnerabilities introduced (no XSS in thread text handling)
