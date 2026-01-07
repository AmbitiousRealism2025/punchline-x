# Specification: Score Explanation Cards

## Overview

This feature adds educational explanation cards for each of the 7 scoring factors in Punchline X's algorithm analyzer. The goal is to transform the tool from a diagnostic system into a learning platform that teaches creators WHY certain content factors matter for algorithm performance. This addresses a critical market gap where competing tools (like Creator Buddy) provide generic suggestions without educational context, positioning Punchline X as the tool that improves creator skills over time.

## Workflow Type

**Type**: feature

**Rationale**: This is a net-new feature adding educational content infrastructure to the existing scoring system. It requires component design, content creation, and UI integration without modifying core scoring logic.

## Task Scope

### Services Involved
- **Frontend Application** (primary) - UI components, user interaction, content display
- **Scoring System** (integration) - Identifies the 7 factors and current score values

### This Task Will:
- [ ] Create explanation card component system (UI framework)
- [ ] Author educational content for 7 scoring factors (algorithm principles, examples, research)
- [ ] Integrate cards into existing scoring display/results UI
- [ ] Provide access mechanism (modals, tooltips, or expandable sections)
- [ ] Include good vs. bad examples for each factor
- [ ] Link to research/data sources for credibility

### Out of Scope:
- Modifying scoring algorithm logic or weights
- Changing how scores are calculated
- Adding new scoring factors (working with existing 7)
- Backend API changes (content will be frontend-static or in existing data structures)
- Automated content generation (educational content is human-authored)

## Service Context

### Frontend Application

**Tech Stack:**
- Language: JavaScript/TypeScript (assumed)
- Framework: React/Next.js (assumed based on modern practices)
- Key directories: To be discovered during implementation

**Entry Point:** To be discovered (likely `src/` or `app/`)

**How to Run:**
```bash
npm run dev
# or
yarn dev
```

**Port:** Assumed http://localhost:3000 (standard Next.js default)

## Files to Modify

**NOTE**: The following files need to be discovered during Phase 1 of implementation:

| File | Service | What to Change |
|------|---------|---------------|
| `[scoring-display-component]` | Frontend | Add trigger buttons/icons to access explanation cards |
| `[explanation-card-component]` | Frontend | **NEW FILE** - Create reusable card component |
| `[scoring-factors-data]` | Frontend | **NEW FILE** - Content for 7 factors (principles, examples, research links) |
| `[types/interfaces]` | Frontend | Add TypeScript interfaces for explanation card data structure |

## Files to Reference

These files need to be identified during implementation to ensure pattern consistency:

| File | Pattern to Copy |
|------|----------------|
| `[existing-modal-component]` | Modal/dialog implementation pattern |
| `[existing-card-component]` | Card design system and styling |
| `[scoring-logic]` | Identify the 7 scoring factors and their names/descriptions |
| `[UI-components]` | Tooltip, icon, or button patterns for triggering explanations |

## Patterns to Follow

### Discovery Phase Required

During implementation, identify and document:

1. **Component Architecture Pattern**
   - How are UI components structured? (functional components, hooks, etc.)
   - What's the styling approach? (CSS modules, Tailwind, styled-components)
   - How are modals/overlays implemented?

2. **Data Management Pattern**
   - Where is static content stored? (JSON files, constants, CMS)
   - How are types/interfaces organized?
   - Pattern for content with examples and external links

3. **Integration Pattern**
   - How are scoring results currently displayed?
   - Where do users see their factor scores?
   - What's the interaction pattern for additional info? (click, hover, expand)

**Example Structure** (to be adapted):

```typescript
// Expected data structure for explanation cards
interface ScoringFactorExplanation {
  factorId: string;
  factorName: string;
  algorithmPrinciple: {
    why: string;  // Why this factor matters
    how: string;  // How the algorithm evaluates it
  };
  examples: {
    good: {
      description: string;
      example: string;
    }[];
    bad: {
      description: string;
      example: string;
    }[];
  };
  research: {
    title: string;
    url: string;
    summary: string;
  }[];
}
```

## Requirements

### Functional Requirements

1. **Explanation Card System**
   - Description: A reusable component that displays educational content for scoring factors
   - Acceptance: Users can access detailed explanations for all 7 scoring factors from the results view

2. **Algorithm Principle Education**
   - Description: Each card explains WHY the factor matters to algorithm performance, not just what it measures
   - Acceptance: Content includes clear "why this matters" section with algorithm mechanics

3. **Concrete Examples**
   - Description: Each card provides contrasting good and bad examples to illustrate the principle
   - Acceptance: Minimum 2 examples per factor (1 good, 1 bad) with explanations

4. **Research-Backed Content**
   - Description: Links to studies, data, or authoritative sources supporting the factor's importance
   - Acceptance: Each factor includes at least 1 credible external link or citation

5. **Non-Disruptive Integration**
   - Description: Cards enhance existing UI without blocking core workflow
   - Acceptance: Users can view scores and access cards optionally (not forced modals)

6. **7 Factor Coverage**
   - Description: All existing scoring factors have explanation cards
   - Acceptance: Complete coverage verified against scoring logic

### Edge Cases

1. **Missing Research Links** - If credible external sources don't exist for a factor, use internal data/methodology explanations
2. **Long Content** - Cards with extensive explanations should be scrollable or paginated to avoid overwhelming users
3. **Mobile Responsiveness** - Cards must work on mobile devices where scoring is viewed
4. **Loading State** - If content is fetched async, provide loading indicators
5. **Accessibility** - Card triggers (buttons/icons) must be keyboard-navigable and screen-reader friendly

## Implementation Notes

### Phase 1: Discovery (CRITICAL FIRST STEP)

Before building, identify:
- [ ] The 7 scoring factors (names, IDs, current display location)
- [ ] Existing component patterns for cards/modals/tooltips
- [ ] Where scoring results are rendered in the UI
- [ ] Styling system and design tokens
- [ ] Content management approach (static files vs. CMS vs. hardcoded)

### Phase 2: Component Design

**DO:**
- Create a reusable `ExplanationCard` component that works for all 7 factors
- Follow existing design system (colors, typography, spacing)
- Use semantic HTML and ARIA labels for accessibility
- Make the trigger mechanism discoverable but unobtrusive (info icon, "Learn more" link)
- Structure content with clear headings: "Why It Matters", "Good Examples", "Bad Examples", "Learn More"

**DON'T:**
- Create 7 separate hardcoded card components (use data-driven approach)
- Block the user's workflow with forced modals
- Use generic language like "This is important" - be specific about algorithm mechanics
- Skip research links - credibility is key to differentiation
- Ignore mobile/responsive design

### Phase 3: Content Creation

**Content Guidelines:**
- **Algorithm Principle**: Explain in plain language how the algorithm evaluates this factor and why it correlates with virality/engagement
- **Good Examples**: Show real or realistic examples that score well, with annotations explaining why
- **Bad Examples**: Show contrast examples that score poorly, with explanations of what's wrong
- **Research**: Link to TikTok Creator resources, social media studies, or behavioral psychology research

**Tone**: Educational but conversational, expert but accessible

### Phase 4: Integration

**DO:**
- Add subtle info icons or "?" buttons next to each factor score
- Use modals or slide-out panels for card display (depending on existing patterns)
- Ensure cards can be dismissed easily (X button, outside click, ESC key)
- Test on actual scoring results page with real data

**DON'T:**
- Hide the cards in hard-to-find settings pages
- Auto-open cards on every page load (user-initiated only)
- Break existing score display layout

## Development Environment

### Start Services

```bash
# Install dependencies (if needed)
npm install

# Start development server
npm run dev
```

### Service URLs
- Frontend Application: http://localhost:3000 (assumed - verify actual port)

### Required Environment Variables
- None expected for frontend-only feature (verify during discovery)

## Success Criteria

The task is complete when:

1. [ ] All 7 scoring factors have complete explanation cards (algorithm principle + examples + research)
2. [ ] Cards are accessible from the scoring results UI via clear triggers
3. [ ] Content is accurate, well-written, and differentiates Punchline X from competitors
4. [ ] UI integration is smooth, responsive, and accessible
5. [ ] No console errors in browser dev tools
6. [ ] Existing scoring functionality and tests still pass
7. [ ] Manual verification: Open scoring results → Click explanation trigger → Card displays → Content is readable and helpful

## QA Acceptance Criteria

**CRITICAL**: These criteria must be verified by the QA Agent before sign-off.

### Unit Tests
| Test | File | What to Verify |
|------|------|----------------|
| ExplanationCard component renders | `[component-test-file].test.tsx` | Props render correctly, accessibility attributes present |
| ExplanationCard handles all 7 factors | `[component-test-file].test.tsx` | Data-driven rendering works for each factor ID |
| Content data structure validation | `[data-test-file].test.ts` | All 7 factors have required fields (principle, examples, research) |

### Integration Tests
| Test | Services | What to Verify |
|------|----------|----------------|
| Trigger opens card modal | Frontend | Click/tap on info icon displays correct card |
| Card displays factor-specific content | Frontend ↔ Scoring | Correct explanation shown based on factor ID |
| Accessibility navigation | Frontend | Keyboard and screen reader can access cards |

### End-to-End Tests
| Flow | Steps | Expected Outcome |
|------|-------|------------------|
| Score Analysis → Learn More | 1. User receives content score 2. Clicks "Learn more" on hook factor 3. Reads explanation 4. Closes card | Card opens with hook-specific content, closes cleanly |
| Mobile card access | 1. View scores on mobile viewport 2. Tap info icon | Card is readable and scrollable on small screen |

### Browser Verification (Frontend)
| Page/Component | URL | Checks |
|----------------|-----|--------|
| Scoring Results Page | `http://localhost:3000/[scoring-path]` | Info icons visible next to all 7 factors |
| Explanation Card Modal | (Triggered from above) | Card displays with all sections: Why, Good Examples, Bad Examples, Research Links |
| Content Quality | (Manual read-through) | Content is educational, specific, and accurately explains algorithm mechanics |
| Responsive Design | Mobile + Desktop viewports | Cards are usable on all screen sizes |

### Content Verification
| Check | Method | Expected |
|-------|--------|----------|
| 7 factors covered | Count explanation cards | Exactly 7 complete cards exist |
| Research links valid | Click each link | All links open to credible sources (no 404s) |
| Examples present | Review each card | Each factor has ≥1 good and ≥1 bad example |
| Educational value | User testing (if available) | Content teaches "why", not just "what" |

### QA Sign-off Requirements
- [ ] All 7 explanation cards render without errors
- [ ] Content accuracy verified (algorithm principles are correct)
- [ ] Examples are clear, realistic, and illustrative
- [ ] Research links are valid and credible
- [ ] UI integration is seamless and accessible
- [ ] No regressions in existing scoring display
- [ ] Mobile and desktop both work
- [ ] Code follows established component patterns
- [ ] No security vulnerabilities (XSS in content, unsafe links)
- [ ] Content differentiates from generic competitor tools (educational focus confirmed)

## Implementation Strategy

### Recommended Order

1. **Discovery Phase** (1-2 hours)
   - Explore codebase to find scoring logic and UI
   - Identify the 7 factors
   - Document existing patterns

2. **Component Scaffolding** (2-3 hours)
   - Create ExplanationCard component
   - Set up data structure for content
   - Add trigger mechanism to existing UI

3. **Content Creation** (4-6 hours)
   - Research each of the 7 factors
   - Write algorithm principles
   - Create good/bad examples
   - Find credible research links

4. **Integration & Polish** (2-3 hours)
   - Wire up cards to scoring display
   - Test responsiveness
   - Accessibility audit
   - Edge case handling

5. **QA & Refinement** (1-2 hours)
   - Run tests
   - User testing (if available)
   - Content review
   - Bug fixes

**Total Estimated Time**: 10-16 hours

### Dependencies

- **Blocker**: Must identify the 7 scoring factors before content creation
- **Prerequisite**: Existing scoring display UI must be functional
- **Assumption**: Content will be static (not dynamic/CMS-driven) for v1

## Notes for Implementation Agent

1. **Start with Discovery**: The 7 factors are not specified in requirements - they must be found in the codebase
2. **Content is King**: This feature's value is in educational quality, not just UI polish
3. **Differentiation Focus**: Keep competitor's generic approach in mind - be specific and insightful
4. **Iterate on Content**: First pass can be drafts, but final content should be reviewed for accuracy
5. **Ask for Help**: If algorithm mechanics are unclear from code, flag for clarification

## Notes for QA Agent

1. **Content Accuracy**: Verify algorithm explanations match actual scoring logic
2. **Educational Value**: Test whether a user would actually LEARN from these cards
3. **Differentiation**: Compare content tone/depth to generic competitor tools
4. **Research Validity**: Check that links go to credible sources (not random blogs)
5. **User Flow**: Ensure cards enhance, not disrupt, the core scoring experience
