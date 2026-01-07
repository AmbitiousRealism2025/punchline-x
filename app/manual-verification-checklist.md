# Manual Verification Checklist - Subtask 5-1
## Accessibility and Responsiveness Testing

**Dev Server:** http://localhost:5173

---

## Quick Verification Steps

### ✅ Keyboard Navigation (2 minutes)

1. **Open the application** at http://localhost:5173
2. **Navigate to scoring page** (analyze some content to see results)
3. **Expand Score Breakdown** section
4. **Press Tab** repeatedly:
   - [ ] Focus moves to "Expand/Collapse" button
   - [ ] Focus moves to first info icon (Base Score)
   - [ ] Focus ring is clearly visible
   - [ ] All 7 info icons can be reached via Tab
5. **Press Enter** on any info icon:
   - [ ] Dialog opens
   - [ ] Focus moves inside dialog
6. **Press Tab** inside dialog:
   - [ ] Focus cycles through links and close button
   - [ ] Cannot tab outside dialog
7. **Press ESC**:
   - [ ] Dialog closes
   - [ ] Focus returns to the info icon that opened it
8. **Click X button**:
   - [ ] Dialog closes
   - [ ] Focus returns properly

**Expected Result:** All keyboard interactions work smoothly ✅

---

### ✅ Mobile Responsiveness (3 minutes)

1. **Open DevTools** (F12 or Cmd+Opt+I)
2. **Enable Responsive Design Mode** (Cmd+Opt+M or Ctrl+Shift+M)
3. **Test iPhone SE (375x667)**:
   - [ ] Expand score breakdown
   - [ ] Click info icon
   - [ ] Dialog appears centered
   - [ ] Content is readable (no tiny text)
   - [ ] Good/Bad examples in single column
   - [ ] Can scroll dialog if content is long
   - [ ] Dialog doesn't overflow screen
4. **Test iPad Air (820x1180)**:
   - [ ] Dialog is larger but still centered
   - [ ] Good/Bad examples in two columns (side by side)
5. **Test Desktop (1920x1080)**:
   - [ ] Dialog max-width respected (doesn't stretch too wide)
   - [ ] Two-column layout for examples

**Expected Result:** Layout adapts perfectly to all viewports ✅

---

### ✅ Screen Reader Simulation (2 minutes)

**Without actual screen reader:**
1. **Inspect info icon button**:
   - Right-click → Inspect
   - Look for `aria-label` attribute
   - [ ] Should read: "Learn more about [Factor Name]"

2. **Inspect dialog when open**:
   - [ ] DialogTitle visible and descriptive
   - [ ] DialogDescription provides context

3. **Inspect close button**:
   - [ ] Has `<span className="sr-only">Close</span>`

**With screen reader (optional):**
- macOS: Enable VoiceOver (Cmd+F5)
- Windows: Enable NVDA or JAWS
- Navigate with screen reader and verify announcements

**Expected Result:** All elements have proper accessible names ✅

---

### ✅ Content Readability (1 minute)

1. **Open any explanation card**
2. **Check typography**:
   - [ ] Dialog title is large and bold
   - [ ] Section headings are clear
   - [ ] Body text is comfortable to read (not too small)
   - [ ] Line spacing is adequate
3. **Check color contrast**:
   - [ ] Text on background is easy to read
   - [ ] Green "Good Examples" header is visible
   - [ ] Red "Bad Examples" header is visible
   - [ ] Links are distinguishable

**Expected Result:** All content is easy to read ✅

---

### ✅ All 7 Factors Have Cards (1 minute)

1. **Expand Score Breakdown**
2. **Click each info icon and verify content loads**:
   - [ ] Base Score
   - [ ] Media
   - [ ] Hook Strength
   - [ ] Engagement
   - [ ] Timing
   - [ ] Account Status
   - [ ] Content Quality

**Expected Result:** All 7 dialogs open with complete content ✅

---

### ✅ No Console Errors (30 seconds)

1. **Open Browser Console** (F12 → Console tab)
2. **Interact with explanation cards**
3. **Check for errors**:
   - [ ] No red error messages
   - [ ] No warnings about accessibility
   - [ ] No React warnings

**Expected Result:** Console is clean ✅

---

## Full Testing Completion

**Total Time:** ~10 minutes

If all checkboxes above are checked, the accessibility and responsiveness testing is **COMPLETE** ✅

---

## Common Issues to Look For (None Expected)

- ❌ Info icons not focusable → Should have focus ring
- ❌ ESC doesn't close dialog → Radix handles this automatically
- ❌ Dialog too wide on mobile → max-w-[calc(100%-2rem)] prevents this
- ❌ Content overflow → max-h-[85vh] overflow-y-auto handles this
- ❌ Missing ARIA labels → All buttons have aria-label
- ❌ Focus trapped in dialog after close → Radix restores focus

**Status:** All potential issues have been addressed in the implementation ✅

---

## Sign-off

After completing this checklist:

- [ ] All keyboard navigation tests passed
- [ ] All mobile responsiveness tests passed
- [ ] Screen reader attributes verified
- [ ] Content readability confirmed
- [ ] All 7 factors have cards
- [ ] No console errors

**Tester Name:** _________________
**Date:** _________________
**Status:** ✅ APPROVED / ❌ NEEDS WORK
