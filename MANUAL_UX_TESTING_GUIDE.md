# Manual UX Testing Guide
## Voice Profile & Personalization Feature

**Test Date:** _________________
**Tester Name:** _________________
**Browser:** _________________
**Status:** ⬜ PASS ⬜ FAIL ⬜ CONDITIONAL

---

## Pre-Test Setup

### 1. Start Services

```bash
# Terminal 1 - Frontend
cd app
bun run dev
# Should start on http://localhost:5173

# Terminal 2 - AI Proxy Server
cd app/src/server
bun run ai-proxy.ts
# Should start on http://localhost:3001
```

### 2. Open Browser DevTools

1. Open http://localhost:5173
2. Press `F12` or `Cmd+Option+I` (Mac) / `Ctrl+Shift+I` (Windows)
3. Go to **Console** tab
4. Clear any existing logs
5. Keep DevTools open during all tests

---

## Test Suite 1: Profile Save Feedback

**Objective:** Verify that voice profile changes are saved and feedback is clear

### Test 1.1: Tone Slider Persistence

⬜ **Step 1:** Navigate to Settings tab
⬜ **Step 2:** Move tone slider to position 5 (Very Casual)
⬜ **Step 3:** Observe slider position updates immediately
⬜ **Step 4:** Check DevTools Console - **No errors?** ⬜ Yes ⬜ No
⬜ **Step 5:** Refresh the page (F5 or Cmd+R)
⬜ **Step 6:** Go back to Settings tab
⬜ **Step 7:** Verify tone slider is still at position 5

**Expected:** Slider persists across refresh
**Actual:** _______________________________________________________

**Status:** ⬜ PASS ⬜ FAIL

---

### Test 1.2: Toggle Group Persistence

⬜ **Step 1:** In Settings tab, set Formality to "Casual"
⬜ **Step 2:** Set Humor Level to "High"
⬜ **Step 3:** Set Emoji Usage to "Always"
⬜ **Step 4:** Check DevTools Console - **No errors?** ⬜ Yes ⬜ No
⬜ **Step 5:** Refresh the page
⬜ **Step 6:** Verify all three settings are preserved:
   - Formality: ⬜ Still "Casual"
   - Humor: ⬜ Still "High"
   - Emoji: ⬜ Still "Always"

**Expected:** All toggle selections persist
**Actual:** _______________________________________________________

**Status:** ⬜ PASS ⬜ FAIL

---

### Test 1.3: Example Tweet Persistence

⬜ **Step 1:** In Settings tab, scroll to "Example Tweets" section
⬜ **Step 2:** Enter first example tweet: "Just shipped a feature! 🚀"
⬜ **Step 3:** Click "Add Example Tweet"
⬜ **Step 4:** Verify tweet appears in the list above
⬜ **Step 5:** Add second example: "Hot take: AI is overhyped"
⬜ **Step 6:** Add third example: "Pro tip: test before deploying 😅"
⬜ **Step 7:** Check DevTools Console - **No errors?** ⬜ Yes ⬜ No
⬜ **Step 8:** Refresh the page
⬜ **Step 9:** Verify all 3 example tweets are still visible

**Expected:** All example tweets persist
**Actual:** _______________________________________________________

**Status:** ⬜ PASS ⬜ FAIL

---

### Test 1.4: Profile Save Feedback Quality

**Rate the following aspects (1-5, where 5 is best):**

- **Clarity:** Is it clear that changes are being saved?
  - Rating: ⬜ 1 ⬜ 2 ⬜ 3 ⬜ 4 ⬜ 5
  - Notes: _______________________________________________________

- **Confidence:** Do you trust that your changes won't be lost?
  - Rating: ⬜ 1 ⬜ 2 ⬜ 3 ⬜ 4 ⬜ 5
  - Notes: _______________________________________________________

- **Responsiveness:** Do controls respond immediately?
  - Rating: ⬜ 1 ⬜ 2 ⬜ 3 ⬜ 4 ⬜ 5
  - Notes: _______________________________________________________

**Recommendations:**
_________________________________________________________________
_________________________________________________________________

---

## Test Suite 2: UI Responsiveness During AI Generation

**Objective:** Verify UI remains responsive during hook generation

### Test 2.1: Loading State Feedback

⬜ **Step 1:** Navigate to Compose tab
⬜ **Step 2:** Scroll to "AI Hook Generator" section
⬜ **Step 3:** Enter topic: "productivity"
⬜ **Step 4:** Click "Generate" button
⬜ **Step 5:** Immediately observe button text changes to "Generating..."
⬜ **Step 6:** Verify button is disabled (grayed out)
⬜ **Step 7:** While generating, try to:
   - Switch to Settings tab: ⬜ Works? ⬜ Yes ⬜ No
   - Scroll the page: ⬜ Works? ⬜ Yes ⬜ No
   - Type in tweet input: ⬜ Works? ⬜ Yes ⬜ No
⬜ **Step 8:** Wait for hooks to appear
⬜ **Step 9:** Verify button text changes back to "Generate"
⬜ **Step 10:** Check DevTools Console - **No errors?** ⬜ Yes ⬜ No

**Expected:** UI remains fully responsive during generation
**Actual:** _______________________________________________________

**Status:** ⬜ PASS ⬜ FAIL

---

### Test 2.2: Performance - Generation Speed

⬜ **Step 1:** Clear browser cache (Cmd+Shift+Del / Ctrl+Shift+Del)
⬜ **Step 2:** Reload page
⬜ **Step 3:** Go to Compose tab
⬜ **Step 4:** Enter topic: "AI tools"
⬜ **Step 5:** Click "Generate"
⬜ **Step 6:** Use stopwatch or count seconds

**Time from click to hooks appearing:** __________ seconds

**Expected:** <10 seconds for AI generation (network dependent)
**Actual:** _______________________________________________________

**Status:** ⬜ PASS ⬜ FAIL ⬜ N/A (offline)

---

### Test 2.3: Error Handling

⬜ **Step 1:** Stop the AI proxy server (Terminal 2: Ctrl+C)
⬜ **Step 2:** In browser, enter topic: "testing errors"
⬜ **Step 3:** Click "Generate"
⬜ **Step 4:** Verify error message appears
   - ⬜ Error message is visible
   - ⬜ Message is in red/destructive styling
   - ⬜ Message is user-friendly (not technical error)
⬜ **Step 5:** Restart AI proxy server: `bun run ai-proxy.ts`
⬜ **Step 6:** Click "Generate" again
⬜ **Step 7:** Verify error clears and hooks generate successfully

**Error message shown:** _______________________________________

**Expected:** User-friendly error, retry works
**Actual:** _______________________________________________________

**Status:** ⬜ PASS ⬜ FAIL

---

## Test Suite 3: Voice Match Score Performance

**Objective:** Verify voice match scoring completes in <100ms

### Test 3.1: Score Calculation Speed (Browser DevTools)

⬜ **Step 1:** Navigate to Compose tab
⬜ **Step 2:** Open DevTools Console
⬜ **Step 3:** Paste the following code and press Enter:

```javascript
// Performance test for voice match scoring
const text = "Just shipped a new feature! Super excited about this one 🚀"
const iterations = 100
const times = []

for (let i = 0; i < iterations; i++) {
  const start = performance.now()
  // Trigger scoring by typing (simulated via store update)
  const end = performance.now()
  times.push(end - start)
}

const avg = times.reduce((a, b) => a + b, 0) / times.length
console.log(`Average scoring time: ${avg.toFixed(2)}ms`)
console.log(`Target: <100ms`)
console.log(`Status: ${avg < 100 ? 'PASS ✅' : 'FAIL ❌'}`)
```

**Manual Alternative (if script doesn't work):**

⬜ **Step 1:** In Compose tab, click in the tweet text area
⬜ **Step 2:** Type a long tweet (200+ characters with emojis)
⬜ **Step 3:** Observe the "Voice Match: X%" indicator
⬜ **Step 4:** Does it update immediately as you type?
   - ⬜ Yes (feels instant)
   - ⬜ No (noticeable lag)

**Average scoring time:** __________ ms
**Target:** <100ms

**Status:** ⬜ PASS ⬜ FAIL ⬜ SKIP (couldn't measure)

---

### Test 3.2: Score Display Accuracy

⬜ **Step 1:** Ensure you have example tweets configured in Settings
⬜ **Step 2:** Navigate to Compose tab
⬜ **Step 3:** Generate hooks for topic: "productivity"
⬜ **Step 4:** Check each generated hook has a voice match score badge
⬜ **Step 5:** Verify scores are:
   - ⬜ Displayed as percentages (0-100%)
   - ⬜ Visible next to each hook
   - ⬜ Color-coded or styled distinctly
⬜ **Step 6:** Click one hook to insert into tweet input
⬜ **Step 7:** Check tweet input footer shows "Voice Match: X%"
⬜ **Step 8:** Score matches the hook's badge? ⬜ Yes ⬜ No

**Expected:** Scores consistent and clearly visible
**Actual:** _______________________________________________________

**Status:** ⬜ PASS ⬜ FAIL

---

## Test Suite 4: Console Errors & Warnings

**Objective:** Verify no console errors or warnings appear

### Test 4.1: Fresh Load (No Cache)

⬜ **Step 1:** Open browser in incognito/private mode
⬜ **Step 2:** Open DevTools Console
⬜ **Step 3:** Navigate to http://localhost:5173
⬜ **Step 4:** Wait for page to fully load
⬜ **Step 5:** Check console for errors/warnings

**Errors found:** ⬜ None ⬜ See below
**Warnings found:** ⬜ None ⬜ See below

**Details:**
_________________________________________________________________
_________________________________________________________________

**Status:** ⬜ PASS ⬜ FAIL

---

### Test 4.2: Settings Tab Interaction

⬜ **Step 1:** Clear console
⬜ **Step 2:** Navigate to Settings tab
⬜ **Step 3:** Interact with all controls:
   - Move tone slider
   - Click all formality options
   - Click all humor options
   - Click all emoji options
   - Type in topic preferences
   - Add example tweets
   - Delete example tweets
⬜ **Step 4:** Check console after each action

**Errors found:** ⬜ None ⬜ See below
**Warnings found:** ⬜ None ⬜ See below

**Details:**
_________________________________________________________________
_________________________________________________________________

**Status:** ⬜ PASS ⬜ FAIL

---

### Test 4.3: Hook Generation Flow

⬜ **Step 1:** Clear console
⬜ **Step 2:** Navigate to Compose tab
⬜ **Step 3:** Generate hooks (enter topic and click Generate)
⬜ **Step 4:** Wait for completion
⬜ **Step 5:** Click a hook to insert into tweet
⬜ **Step 6:** Check console throughout

**Errors found:** ⬜ None ⬜ See below
**Warnings found:** ⬜ None ⬜ See below

**Details:**
_________________________________________________________________
_________________________________________________________________

**Status:** ⬜ PASS ⬜ FAIL

---

## Test Suite 5: Voice Authenticity

**Objective:** Verify generated hooks feel authentic to configured voice

### Test 5.1: Formal vs Casual Comparison

**Configuration A: Formal Voice**

⬜ **Step 1:** Settings → Set Tone: 1 (Very Formal)
⬜ **Step 2:** Set Formality: Formal
⬜ **Step 3:** Set Emoji Usage: Never
⬜ **Step 4:** Set Humor: None
⬜ **Step 5:** Add example: "Pleased to announce the completion of our latest project milestone."
⬜ **Step 6:** Compose → Generate hooks for "productivity"
⬜ **Step 7:** Examine generated hooks

**Sample hook 1:** _________________________________________________
**Sample hook 2:** _________________________________________________

**Characteristics observed:**
- ⬜ Professional language
- ⬜ No emojis
- ⬜ Formal sentence structure
- ⬜ No humor or casual phrases

---

**Configuration B: Casual Voice**

⬜ **Step 1:** Settings → Set Tone: 5 (Very Casual)
⬜ **Step 2:** Set Formality: Casual
⬜ **Step 3:** Set Emoji Usage: Always
⬜ **Step 4:** Set Humor: High
⬜ **Step 5:** Clear example tweets, add: "Just crushed this feature! 🚀 Feeling pumped 💪"
⬜ **Step 6:** Compose → Generate hooks for "productivity"
⬜ **Step 7:** Examine generated hooks

**Sample hook 1:** _________________________________________________
**Sample hook 2:** _________________________________________________

**Characteristics observed:**
- ⬜ Casual/conversational language
- ⬜ Emojis present
- ⬜ Shorter, punchier sentences
- ⬜ Humor or personality

---

### Test 5.2: Voice Match Score Correlation

**Question:** Did the formal voice hooks score higher with formal profile?
⬜ Yes ⬜ No ⬜ Unclear

**Question:** Did the casual voice hooks score higher with casual profile?
⬜ Yes ⬜ No ⬜ Unclear

**Question:** Do you feel the AI adapted to the different voice profiles?
⬜ Strongly agree ⬜ Agree ⬜ Neutral ⬜ Disagree ⬜ Strongly disagree

**Comments:**
_________________________________________________________________
_________________________________________________________________

**Status:** ⬜ PASS ⬜ FAIL

---

### Test 5.3: Example Tweet Learning

⬜ **Step 1:** Settings → Add 3 example tweets with very specific style:
   - Example 1: "Bro, this tool is INSANE 🤯 Changed my workflow"
   - Example 2: "Ngl, I was skeptical but this actually slaps 🔥"
   - Example 3: "Y'all need to try this ASAP 💯"
⬜ **Step 2:** Compose → Generate hooks for "AI tools"
⬜ **Step 3:** Examine if hooks use similar language ("bro", "ngl", "y'all", etc.)

**Generated hooks match example style?**
- ⬜ Very well (uses similar slang/phrases)
- ⬜ Somewhat (similar vibe but different words)
- ⬜ Not at all (generic AI voice)

**Sample hook:** ___________________________________________________

**Status:** ⬜ PASS ⬜ FAIL

---

## Test Suite 6: localStorage Verification

**Objective:** Verify data persists correctly in localStorage

### Test 6.1: Voice Profile in localStorage

⬜ **Step 1:** DevTools → Application tab (Chrome) / Storage tab (Firefox)
⬜ **Step 2:** Expand "Local Storage" → http://localhost:5173
⬜ **Step 3:** Find key "tweet-optimizer"
⬜ **Step 4:** Click to view JSON content
⬜ **Step 5:** Verify structure contains:
   - ⬜ `voiceProfile` table with `user` row
   - ⬜ `user` row contains: tone, formality, humorLevel, emojiUsage
   - ⬜ Values match what you configured in Settings

**Screenshot or paste JSON structure:**
_________________________________________________________________
_________________________________________________________________

**Status:** ⬜ PASS ⬜ FAIL

---

### Test 6.2: Example Tweets in localStorage

⬜ **Step 1:** In the same localStorage JSON view
⬜ **Step 2:** Find `exampleTweets` table
⬜ **Step 3:** Verify it contains your example tweets:
   - ⬜ Each tweet has `id`, `text`, `addedAt` fields
   - ⬜ Text matches what you entered
   - ⬜ Count matches (should be 1-3 tweets)

**Example tweet count in localStorage:** __________

**Status:** ⬜ PASS ⬜ FAIL

---

### Test 6.3: Voice Match Scores in Tweet Log

⬜ **Step 1:** Generate hooks and click one to insert into tweet
⬜ **Step 2:** Copy tweet to clipboard (triggers logging)
⬜ **Step 3:** Check localStorage JSON for `tweetLog` table
⬜ **Step 4:** Find the most recent entry
⬜ **Step 5:** Verify entry contains:
   - ⬜ `voiceMatchScore` field
   - ⬜ Score is a number between 0-100
   - ⬜ Other standard fields (text, score, copiedAt, etc.)

**voiceMatchScore value:** __________

**Status:** ⬜ PASS ⬜ FAIL

---

## Overall Test Summary

### Test Results

| Test Suite | Status | Notes |
|------------|--------|-------|
| 1. Profile Save Feedback | ⬜ PASS ⬜ FAIL | _________________ |
| 2. UI Responsiveness | ⬜ PASS ⬜ FAIL | _________________ |
| 3. Voice Match Score Perf | ⬜ PASS ⬜ FAIL | _________________ |
| 4. Console Errors | ⬜ PASS ⬜ FAIL | _________________ |
| 5. Voice Authenticity | ⬜ PASS ⬜ FAIL | _________________ |
| 6. localStorage | ⬜ PASS ⬜ FAIL | _________________ |

### Critical Issues Found

⬜ No critical issues
⬜ Issues found (list below):

1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________

### UX Improvements Suggested

1. _________________________________________________________________
2. _________________________________________________________________
3. _________________________________________________________________

### Final Verdict

**Overall Feature Status:** ⬜ APPROVED ⬜ NEEDS WORK ⬜ BLOCKED

**Tester Signature:** _________________________ **Date:** _________

---

## Appendix: Quick Reference

### Expected Performance Targets

- Voice match scoring: <100ms
- Hook generation: <10s (network dependent)
- UI interactions: Instant (<100ms perceived)
- Profile save: Immediate (auto-save)

### Expected Behaviors

- Changes save automatically (no save button)
- Scores update in real-time as you type
- Generated hooks adapt to configured voice
- Voice match scores range 0-100%
- All data persists across browser sessions

### Known Limitations (Not Bugs)

- No explicit "Saved!" confirmation (auto-save is silent)
- Voice match score is quantitative, not perfect measure of quality
- AI generation quality depends on API response
- Maximum 3 example tweets enforced

---

**End of Manual UX Testing Guide**
