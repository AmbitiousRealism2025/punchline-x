# Quick Manual Test Guide: Template Browsing & Editing

**Dev Server:** http://localhost:5188
**Test Duration:** ~5 minutes
**Viewport:** 375px (iPhone SE)

## Quick Setup
```bash
# 1. Open Chrome
# 2. Press F12 (DevTools)
# 3. Press Ctrl+Shift+M (Toggle Device Toolbar)
# 4. Select "iPhone SE" or set width to 375px
# 5. Navigate to http://localhost:5188
```

## 5-Minute Test Flow

### ✅ Test 1: Navigate to Templates (30 seconds)
1. Click "Templates" tab
   - Tab should be easy to tap (44px height)
   - Content should switch smoothly
2. Verify single-column layout
   - Template cards stack vertically
   - No horizontal scroll on grid

**Pass Criteria:** Templates tab accessible, single column visible

---

### ✅ Test 2: Scroll Category Filters (1 minute)
1. Find category toggle group below header
2. Try to scroll horizontally (drag left/right)
   - Should scroll smoothly
   - All categories accessible: All, Contrarian, List, Story, Thread, Poll, Value, Question, Teaching
3. Tap "Story" category
   - Should highlight immediately
   - Template grid filters to Story templates only
4. Tap "All" to reset
   - All templates visible again

**Pass Criteria:** Horizontal scroll works, filtering works, no layout breaks

---

### ✅ Test 3: Tap Template Card (1 minute)
1. Scroll to any template card
2. Tap on the card (anywhere on card)
   - Should see slight scale animation
   - Border should flash primary color
   - Template editor should open
3. Note card features:
   - Card height adequate for tapping (not too small)
   - "Use Template" button visible on mobile
   - Badge shows category type
   - Preview text visible

**Pass Criteria:** Card tap opens editor, visual feedback works, button visible

---

### ✅ Test 4: Use Template Editor (2 minutes)
1. **Verify Layout:**
   - Single column on mobile
   - "Fill in the blanks" section on top
   - Preview section below
   - No horizontal scroll

2. **Test Input Fields:**
   - Tap first input field
   - Type some text (e.g., "test content")
   - Verify preview updates in real-time
   - Fill remaining fields

3. **Check Button States:**
   - Initially, "Apply to Composer" should be disabled
   - After filling all fields, button should enable
   - Tap "Apply to Composer"
   - Should return to Compose tab with filled text

4. **Test Cancel:**
   - Go back to Templates, select another template
   - Tap "Cancel" button in header
   - Should return to template grid

**Pass Criteria:** Single column layout, inputs work, preview updates, validation works, buttons functional

---

### ✅ Test 5: Landscape Orientation (30 seconds)
1. Click "Rotate" icon in DevTools toolbar
2. Verify template grid adapts
   - May show 2 columns if viewport wide enough
   - Category filters still scroll
3. Open template editor
   - On wider landscape, editor may show 2 columns (side-by-side)
   - All content still accessible
4. Rotate back to portrait
   - Everything returns to mobile layout

**Pass Criteria:** Layout adapts smoothly, no breaks, no cutoff content

---

## Common Issues to Watch For

❌ **Horizontal Scroll:** If you see horizontal scroll bar, that's a bug
❌ **Tiny Touch Targets:** If buttons are hard to tap, that's a problem
❌ **No Visual Feedback:** Cards should respond visibly when tapped
❌ **Editor Broken Layout:** Inputs and preview should never overlap
❌ **Keyboard Covering Input:** On iOS, keyboard shouldn't hide active input
❌ **Category Filters Not Scrolling:** Must scroll horizontally

## Screenshot Checklist

If testing on real device, take these screenshots:
1. Templates tab with single-column grid
2. Category filters scrolled to show different categories
3. Template card showing "Use Template" button
4. Template editor open with single-column layout
5. Template editor with some fields filled (showing preview)

## Browser-Specific Tests

### iOS Safari
- [ ] Template cards respond to tap immediately
- [ ] Category scroll smooth
- [ ] Keyboard doesn't hide inputs in editor
- [ ] Apply button works

### Chrome Mobile
- [ ] All features work
- [ ] No console errors
- [ ] Touch feedback visible

## Quick Pass/Fail

**PASS if:**
- ✅ All 5 tests complete without issues
- ✅ No horizontal scroll anywhere
- ✅ All buttons easy to tap
- ✅ Template editor works end-to-end
- ✅ Landscape mode works

**FAIL if:**
- ❌ Horizontal scroll appears
- ❌ Buttons too small to tap
- ❌ Category filters don't scroll
- ❌ Template editor layout broken
- ❌ Apply/Cancel buttons don't work
- ❌ Preview doesn't update

---

**Time Estimate:** 5 minutes
**Required:** Chrome DevTools or real device
**Next Test:** subtask-6-3 (Lighthouse performance audit)
