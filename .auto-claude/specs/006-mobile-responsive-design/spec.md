# Specification: Mobile-Responsive Design

## Overview

Implement comprehensive mobile-responsive design across the entire Punchline X UI to enable creators to score tweets, use templates, and build threads seamlessly on mobile devices. This enhancement will expand the addressable market by supporting on-the-go tweet optimization workflows that creators need when away from their desktops.

## Workflow Type

**Type**: feature

**Rationale**: This is a new capability that adds mobile device support to the existing desktop-optimized application. It requires implementing new responsive layouts, touch interactions, and performance optimizations without changing core functionality.

## Task Scope

### Services Involved
- **punchline-x** (primary) - Single-service React application requiring full mobile UI optimization

### This Task Will:
- [ ] Implement mobile-first responsive layouts for all components (scorer, templates, thread builder, analytics)
- [ ] Optimize touch interactions with appropriate touch target sizes (minimum 44x44px)
- [ ] Configure responsive breakpoints and viewport handling for mobile, tablet, and desktop
- [ ] Add mobile-specific CSS utilities and active/pressed states for touch feedback
- [ ] Implement code splitting and performance optimizations for mobile networks
- [ ] Test and verify functionality on both portrait and landscape orientations
- [ ] Ensure cross-browser mobile compatibility (iOS Safari, Chrome Mobile, etc.)

### Out of Scope:
- Native mobile app development (this is mobile web only)
- Offline functionality or PWA features
- Mobile-specific features not already in desktop version
- Redesigning the visual design system (keeping existing styles, just making them responsive)

## Service Context

### punchline-x

**Tech Stack:**
- Language: TypeScript
- Framework: React 19.2.0
- Styling: Tailwind CSS v4.1.18 (with @theme inline syntax)
- UI Components: Radix UI v1.1.x-1.2.x (unstyled primitives)
- Build Tool: Vite 7.2.4
- State Management: TinyBase

**Entry Point:** `app/src/main.tsx`

**How to Run:**
```bash
cd app
npm run dev
```

**Port:** 5173 (Vite dev server default)

## Files to Modify

| File | Service | What to Change |
|------|---------|---------------|
| `app/src/index.css` | punchline-x | Add mobile breakpoints in @theme, create touch-target utilities, add mobile-specific active states |
| `app/src/App.tsx` | punchline-x | Refactor grid layouts to be mobile-first (stack on mobile, side-by-side on desktop) |
| `app/src/components/layout/Shell.tsx` | punchline-x | Make header responsive, adjust padding for mobile viewports |
| `app/src/components/scorer/TweetInput.tsx` | punchline-x | Increase button touch targets, optimize textarea for mobile keyboards |
| `app/src/components/scorer/MediaToggles.tsx` | punchline-x | Ensure toggle buttons meet 44x44px minimum touch target |
| `app/src/components/scorer/ScoreDisplay.tsx` | punchline-x | Ensure score display stacks properly on mobile viewports |
| `app/src/components/scorer/ScoreBreakdown.tsx` | punchline-x | Optimize breakdown layout for mobile, ensure readability on small screens |
| `app/src/components/scorer/SuggestionList.tsx` | punchline-x | Fix card layout for narrow viewports, ensure proper spacing |
| `app/src/components/analytics/AnalyticsDashboard.tsx` | punchline-x | Optimize charts and analytics visualizations for mobile viewports |
| `app/src/components/templates/TemplateGrid.tsx` | punchline-x | Change grid to single column on mobile, optimize category toggles for horizontal scroll |
| `app/src/components/templates/TemplateCard.tsx` | punchline-x | Increase touch targets, add pressed states |
| `app/src/components/ui/button.tsx` | punchline-x | Audit size variants to ensure minimum 44x44px touch targets |
| `app/src/components/ui/tabs.tsx` | punchline-x | Make tabs scrollable on mobile, increase touch target heights |
| `app/src/components/ui/toggle-group.tsx` | punchline-x | Add horizontal scroll support, ensure touch-friendly spacing |
| `app/vite.config.ts` | punchline-x | Configure code splitting for bundles >30kb to optimize mobile loading |
| `app/index.html` | punchline-x | Add proper viewport meta tag for mobile rendering |

## Files to Reference

These files show patterns to follow:

| File | Pattern to Copy |
|------|----------------|
| `app/src/index.css` | Tailwind v4 @theme inline syntax (NOT tailwind.config.js) |
| `app/src/components/ui/button.tsx` | Class Variance Authority (CVA) pattern for responsive size variants |
| `app/src/components/templates/TemplateGrid.tsx` | Current responsive grid pattern using `md:grid-cols-2 lg:grid-cols-3` |
| `app/src/App.tsx` | Tab navigation and grid layout structure |

## Patterns to Follow

### Tailwind v4 @theme Inline Syntax

From `app/src/index.css`:

```css
@import "tailwindcss";

@theme inline {
  /* Custom properties defined here */
  --color-primary: hsl(188 91% 43%);
  --radius-md: 0.5rem;
}
```

**Key Points:**
- Tailwind v4 uses CSS-based configuration, NOT `tailwind.config.js`
- All custom theme values go in `@theme inline {}` block
- Breakpoints MUST use `rem` units, not `px` (causes ordering issues in v4)
- Mobile-first approach: base styles = mobile, then override with `md:`, `lg:` prefixes

### Responsive Grid Pattern

From `app/src/App.tsx`:

```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
  {/* Content */}
</div>
```

**Key Points:**
- Start with `grid-cols-1` (mobile default)
- Use `lg:grid-cols-2` for desktop breakpoint
- Tailwind default breakpoints (for reference): `sm:640px`, `md:768px`, `lg:1024px`, `xl:1280px`, `2xl:1536px`
- Note: These defaults are already in rem units internally; only custom breakpoints need explicit rem definition

### CVA Size Variants for Touch Targets

From `app/src/components/ui/button.tsx`:

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md...",
  {
    variants: {
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md gap-1.5 px-3",
        lg: "h-10 rounded-md px-6",
        icon: "size-9",
      },
    },
  }
)
```

**Key Points:**
- Default button height is `h-9` (36px) - needs to be increased to `h-11` (44px) for mobile
- Use `size` prop variants to create mobile-optimized versions
- Icon buttons use `size-9` which is exactly 36px - should be `size-11` (44px) on mobile

### Active/Pressed States for Touch

```tsx
<button className="active:scale-95 transition-transform">
  {/* Button content */}
</button>
```

**Key Points:**
- Hover states don't work on mobile - add `active:` states for touch feedback
- Use `active:scale-95` or `active:opacity-80` for pressed indication
- Consider `touch-action: manipulation` to eliminate 300ms touch delay

## Requirements

### Functional Requirements

1. **Mobile-First Responsive Layouts**
   - Description: All components stack vertically on mobile (320px-768px), then expand to multi-column layouts on tablet/desktop
   - Acceptance: Open app on iPhone/Android - all content is readable and usable without horizontal scrolling

2. **Touch-Friendly Touch Targets**
   - Description: All interactive elements (buttons, toggles, tabs) meet minimum 44x44px touch target size
   - Acceptance: Buttons can be easily touched without precision aiming or accidental adjacent touches

3. **Portrait and Landscape Support**
   - Description: UI adapts gracefully when device orientation changes
   - Acceptance: Rotate device 90° - layout reflows without breaking, no content cutoff

4. **Mobile Network Performance**
   - Description: Code splitting and lazy loading to minimize initial bundle size for slower mobile connections
   - Acceptance: App loads and becomes interactive within 3 seconds on 3G connection

5. **Cross-Browser Mobile Compatibility**
   - Description: Full functionality on iOS Safari, Chrome Mobile, Firefox Mobile
   - Acceptance: Test all features on iOS Safari and Chrome Android - no broken layouts or missing interactions

### Edge Cases

1. **Small Phones (320px width)** - Test on iPhone SE size to ensure minimum viewport support
2. **Large Phones/Tablets (768px-1024px)** - Ensure appropriate layout transitions at breakpoints
3. **Landscape Mode on Phones** - Verify header doesn't take up excessive vertical space
4. **Touch + Mouse Hybrid Devices** - Both hover and active states should work (e.g., Surface devices)
5. **Slow Networks** - Loading states and skeleton screens for delayed content
6. **Horizontal Scroll Overflow** - Category filters and tabs should scroll horizontally without breaking layout

## Implementation Notes

### DO
- Follow the mobile-first pattern: base styles for mobile, then `md:` and `lg:` overrides
- Use `rem`-based breakpoints in Tailwind v4 (not `px`)
- Add custom breakpoint to `@theme inline` in `app/src/index.css` if needed
- Use React 19's `useOptimistic()` hook for instant feedback on slow mobile networks
- Test on actual mobile devices, especially iOS Safari (has unique rendering quirks)
- Reuse existing Radix UI components - they already have mobile accessibility built in
- For Radix Tooltips on mobile: consider using `onClick` trigger instead of hover for better touch UX
- Add `active:` states alongside all `hover:` states for touch feedback
- Handle touch event defaults explicitly - touch events don't auto-prevent default, may need manual handling for scrolling interactions
- Use `overflow-x-auto` for horizontal scrolling categories/tabs
- Configure viewport meta tag: `<meta name="viewport" content="width=device-width, initial-scale=1">`

### DON'T
- Don't create a `tailwind.config.js` file - Tailwind v4 uses CSS-based config only
- Don't use pixel-based breakpoints - causes ordering issues in Tailwind v4
- Don't rely solely on hover states - they don't work on touch devices
- Don't install new packages - all dependencies already present
- Don't split bundles smaller than 30kb - excessive network requests hurt mobile performance
- Don't hardcode viewport units like `100vh` alone - use modern CSS viewport units with fallbacks:
  ```css
  height: 100vh;  /* Fallback for older browsers */
  height: 100dvh; /* Dynamic viewport height - adjusts with mobile browser toolbars */
  ```
  Use `dvh` for full-height sections, `svh` when content must be visible with address bar expanded, `lvh` for maximum height
- Don't ignore focus states - keyboard navigation still matters on mobile (accessibility)

## Development Environment

### Start Services

```bash
cd app
npm run dev
```

### Service URLs
- Punchline X: http://localhost:5173

### Required Environment Variables
None - app runs without environment configuration

## Success Criteria

The task is complete when:

1. [ ] All UI components render correctly on mobile viewports (320px - 768px width)
2. [ ] All interactive elements meet 44x44px minimum touch target requirement
3. [ ] Portrait and landscape orientations both work without layout issues
4. [ ] Code splitting configured for bundles >30kb
5. [ ] Mobile performance tested: initial load <3s on simulated 3G
6. [ ] Cross-browser testing passed: iOS Safari, Chrome Mobile, Firefox Mobile
7. [ ] No console errors on mobile devices
8. [ ] Existing desktop functionality still works (no regressions)
9. [ ] Active/pressed states implemented for all touch interactions
10. [ ] Viewport meta tag configured in index.html

## QA Acceptance Criteria

**CRITICAL**: These criteria must be verified by the QA Agent before sign-off.

### Unit Tests
| Test | File | What to Verify |
|------|------|----------------|
| Button touch target sizes | `app/src/components/ui/button.test.tsx` (create) | Verify all button variants meet 44x44px minimum |
| Responsive breakpoints | `app/src/App.test.tsx` (create) | Verify grid layouts change at correct breakpoints |
| Viewport meta tag | `app/index.html.test.ts` (create) | Verify viewport meta is present and correct |

### Integration Tests
| Test | Services | What to Verify |
|------|----------|----------------|
| Mobile scoring flow | punchline-x | Enter tweet on mobile → score displays → suggestions render |
| Template selection mobile | punchline-x | Browse templates → select → editor opens and works on mobile |
| Tab navigation mobile | punchline-x | Switch between Compose/Templates/Analytics tabs on small viewport |

### End-to-End Tests
| Flow | Steps | Expected Outcome |
|------|-------|------------------|
| Mobile tweet scoring | 1. Open app on mobile viewport (375px) 2. Type tweet text 3. Toggle media options 4. View score | All elements fit viewport, no horizontal scroll, score updates live |
| Template browsing mobile | 1. Navigate to Templates tab 2. Scroll category filters 3. Tap template card 4. Edit template | Categories scroll horizontally, template grid is single column, editor is touch-friendly |
| Orientation change | 1. Load app in portrait 2. Rotate to landscape 3. Rotate back to portrait | Layout reflows smoothly, no content cutoff, no broken layouts |

### Browser Verification (Mobile)
| Device/Browser | URL | Checks |
|----------------|-----|--------|
| iOS Safari (iPhone) | `http://localhost:5173` | All tabs work, buttons respond to touch, no layout issues, score calculation works |
| Chrome Mobile (Android) | `http://localhost:5173` | Template selection works, touch targets easy to tap, keyboard doesn't break layout |
| Firefox Mobile | `http://localhost:5173` | Analytics charts render, navigation smooth, no JavaScript errors |
| Responsive DevTools (320px) | `http://localhost:5173` | Minimum viewport size supported, all content readable |
| Responsive DevTools (768px) | `http://localhost:5173` | Tablet breakpoint transitions work, grid layouts expand appropriately |

### Performance Verification
| Check | Tool/Command | Expected |
|-------|--------------|----------|
| Bundle size analysis | `npm run build && du -h app/dist/assets/*.js` | No single JS bundle exceeds 100kb (gzipped) |
| Lighthouse mobile score | Chrome DevTools Lighthouse (Mobile) | Performance score >85, Accessibility >95 |
| 3G load time | Chrome DevTools Network throttling (Fast 3G) | Time to Interactive <3 seconds |
| Bundle splitting | `ls -lh app/dist/assets/` | Vendor chunks separated from app chunks |

### Visual Regression Checks
| Component | Viewport | Check |
|-----------|----------|-------|
| TweetInput | 375px mobile | Textarea height appropriate, buttons full width or stacked |
| TemplateGrid | 375px mobile | Single column grid, cards full width, category toggles scroll |
| Shell header | 375px mobile | Logo and title fit, no text truncation |
| Tabs navigation | 375px mobile | Tabs stack or scroll, active state visible |
| ScoreDisplay | 375px mobile | Score is prominent, breakdown readable |

### QA Sign-off Requirements
- [ ] All mobile viewports (320px-768px) tested and working
- [ ] Touch targets verified with actual finger taps on real device
- [ ] Both portrait and landscape orientations tested
- [ ] iOS Safari and Chrome Mobile tested on physical devices (or BrowserStack)
- [ ] Performance benchmarks met (Lighthouse >85, load time <3s on 3G)
- [ ] No horizontal scrolling on any screen below 768px
- [ ] All hover states have corresponding active states
- [ ] Code splitting verified in production build
- [ ] No regressions in desktop functionality (tested at 1920px viewport)
- [ ] Accessibility maintained (keyboard nav, screen reader support)
- [ ] No console errors or warnings on mobile browsers

## Implementation Strategy

### Phase 1: Foundation (Mobile Infrastructure)
1. Add viewport meta tag to `app/index.html`
2. Configure mobile breakpoints in `app/src/index.css` @theme
3. Create touch-target utilities and active-state helpers
4. Update `app/vite.config.ts` for code splitting

### Phase 2: Core Layout (Shell & Navigation)
1. Make `Shell.tsx` header responsive (mobile padding, logo sizing)
2. Update `App.tsx` tab navigation for mobile (scrollable tabs)
3. Convert main grid layouts to mobile-first stacking

### Phase 3: Scorer Components
1. Optimize `TweetInput.tsx` for mobile keyboards and touch
2. Update `MediaToggles.tsx` for touch targets
3. Ensure `ScoreDisplay.tsx` and `ScoreBreakdown.tsx` stack on mobile
4. Fix `SuggestionList.tsx` card layout for narrow viewports

### Phase 4: Templates & Analytics
1. Convert `TemplateGrid.tsx` to single-column mobile layout
2. Make category toggles horizontally scrollable
3. Update `TemplateCard.tsx` touch targets and pressed states
4. Optimize analytics charts for mobile viewports

### Phase 5: UI Primitives
1. Audit all `app/src/components/ui/*` components for touch targets
2. Add mobile size variants to `button.tsx`, `toggle.tsx`, etc.
3. Implement active states for all interactive elements

### Phase 6: Testing & Optimization
1. Test on physical iOS and Android devices
2. Run Lighthouse mobile audits
3. Verify performance on throttled connections
4. Fix any layout issues or regressions discovered

## Risk Assessment

### High Risk
- **iOS Safari viewport bugs**: iOS Safari has unique rendering issues with viewport units and keyboard interactions
  - Mitigation: Test early on real iOS device, use dvh units instead of vh
- **Touch target sizing inconsistency**: Easy to miss small buttons that don't meet 44x44px requirement
  - Mitigation: Create automated test to measure computed button sizes

### Medium Risk
- **Performance regression on desktop**: Adding mobile styles could bloat CSS bundle
  - Mitigation: Monitor bundle size before/after, keep mobile styles minimal
- **Breaking existing desktop layouts**: Refactoring to mobile-first could introduce bugs
  - Mitigation: Test desktop viewport (1920px) after each change

### Low Risk
- **Code splitting too aggressive**: Over-splitting creates network overhead
  - Mitigation: Only split bundles >30kb as researched
- **Cross-browser differences**: Different mobile browsers may render differently
  - Mitigation: Test on iOS Safari, Chrome Mobile, Firefox Mobile

## Rollback Plan

If mobile implementation causes critical issues:

1. **Revert CSS changes**: `git checkout HEAD -- app/src/index.css`
2. **Revert layout components**: Restore `App.tsx`, `Shell.tsx` from previous commit
3. **Disable code splitting**: Remove manualChunks config from `vite.config.ts`
4. **Re-test desktop**: Verify all desktop functionality restored

The modular approach (separate phases) allows partial rollback of specific components without losing all mobile work.
