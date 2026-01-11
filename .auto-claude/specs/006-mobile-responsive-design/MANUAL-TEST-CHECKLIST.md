# Quick Manual Test Checklist - Mobile Scoring Flow

**URL:** http://localhost:5187
**Viewport:** 375px (iPhone SE) in Chrome DevTools

## Pre-Test Setup
1. Open Chrome browser
2. Press F12 to open DevTools
3. Press Ctrl+Shift+M to toggle device toolbar
4. Select "iPhone SE" or set custom 375px width
5. Navigate to http://localhost:5187

## Test Steps (5 minutes)

### ✅ Step 1: Initial Load (30 seconds)
- [ ] No horizontal scroll bar
- [ ] Header visible: "P" logo + "Punchline X" title
- [ ] "Compose" tab is active
- [ ] Content stacks vertically

### ✅ Step 2: Tweet Input (1 minute)
- [ ] Click textarea - keyboard should appear
- [ ] Type: "This is a test tweet to verify mobile responsiveness!"
- [ ] Character count updates (should show 58/280)
- [ ] Clear button appears and is tappable
- [ ] Copy button is enabled and tappable
- [ ] Buttons are easy to tap (not too small)

### ✅ Step 3: Media Toggles (1 minute)
- [ ] Tap "Image" button - highlights/selects
- [ ] Tap "Video" button - Image deselects, Video selects
- [ ] Buttons have 8px spacing (no accidental taps)
- [ ] Tap "Has Link" toggle - highlights
- [ ] Tap "Premium" toggle - highlights
- [ ] All toggles respond immediately

### ✅ Step 4: Score Display (1 minute)
- [ ] Score circle is visible and prominent
- [ ] Score number is readable (large enough)
- [ ] Grade label visible ("Excellent", "Good", etc.)
- [ ] Edit tweet text - score updates immediately
- [ ] Progress ring animates smoothly
- [ ] No layout jumping

### ✅ Step 5: Suggestions (1 minute)
- [ ] Scroll to "Suggestions" card
- [ ] Suggestions are readable
- [ ] Priority badges visible on top
- [ ] Text wraps properly (no overflow)
- [ ] Cards fit screen width
- [ ] Spacing looks good

### ✅ Step 6: Landscape Test (30 seconds)
- [ ] Click rotate icon in DevTools toolbar
- [ ] Layout adapts to landscape
- [ ] All content still visible
- [ ] No horizontal scroll
- [ ] Rotate back to portrait
- [ ] Layout returns to portrait mode

## Quick Checks
- [ ] No console errors (check DevTools Console tab)
- [ ] No horizontal scrolling at any point
- [ ] All buttons easy to tap (not too small)
- [ ] Text is readable (not too small)
- [ ] Layouts stack/wrap appropriately

## Test Other Viewports (Optional)
- [ ] 320px (iPhone SE portrait) - minimum size
- [ ] 414px (iPhone Plus) - larger mobile
- [ ] 768px (iPad portrait) - tablet breakpoint
- [ ] 1024px (Desktop) - should show 2 columns

## Browser Testing (If Available)
- [ ] iOS Safari (real iPhone)
- [ ] Chrome Mobile (Android device)
- [ ] Firefox Mobile

## Pass Criteria
- ✅ All checkboxes checked
- ✅ No console errors
- ✅ No horizontal scroll on any viewport
- ✅ All touch targets are easy to tap
- ✅ Score updates in real-time

---

**Time Required:** ~5 minutes for basic flow, 15 minutes for comprehensive test

**Status:**
- [ ] NOT TESTED
- [ ] TESTED - PASSED
- [ ] TESTED - FAILED (document issues)

**Tested By:** ________________
**Date:** ________________
**Issues Found:** ________________
