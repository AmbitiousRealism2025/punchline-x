# End-to-End Voice Profile Verification Checklist

## Prerequisites
1. Start frontend dev server: `cd app && npm run dev` (port 5173)
2. Start AI proxy server: `cd app/src/server && bun run ai-proxy.ts` (port 3001)
3. Open browser to http://localhost:5173
4. Open DevTools Console to check for errors

## Test Steps

### 1. Settings Tab - Voice Profile Configuration ✓
**Steps:**
1. Navigate to Settings tab
2. Configure voice profile:
   - Set Tone slider to 5 (Very Casual)
   - Set Formality to "Casual"
   - Set Humor Level to "High"
   - Set Emoji Usage to "Often"
   - Enter topic preferences: "productivity, ai, tech"

**Expected:**
- All controls respond to input
- TinyBase auto-saves (no manual save button needed)
- Changes persist immediately

### 2. Example Tweets Input ✓
**Steps:**
1. In Settings tab, scroll to "Example Tweets" section
2. Add first example tweet:
   ```
   Just shipped a new feature! 🚀 Can't wait to see what you build with it 💪
   ```
3. Click "Add Example Tweet"
4. Add second example tweet:
   ```
   Hot take: AI won't replace you, but someone using AI will 🤖
   ```
5. Click "Add Example Tweet"

**Expected:**
- Each tweet appears in a card above the input
- Input clears after adding
- "Remove" button appears on hover
- Button shows "Maximum 3 examples" after adding 3 tweets

### 3. Navigate to Compose Tab ✓
**Steps:**
1. Click on "Compose" tab
2. Verify UI loads without errors

**Expected:**
- No console errors
- All components render correctly

### 4. Generate Hooks with Voice Profile ✓
**Steps:**
1. In Hook Generator section, enter topic: "productivity"
2. Click "Generate" button
3. Wait for AI response (may take 5-10 seconds)

**Expected:**
- Loading state shows "Generating..."
- 5 hooks are generated
- Each hook has:
  - Style badge (contrarian/number/story/question/interrupt)
  - Voice match score badge (e.g., "78%")
- Hooks should match casual style with emojis (based on profile)

**Voice Matching Indicators:**
- Should see emojis in generated hooks (🚀, 💪, 🤖, etc.)
- Casual language ("Just...", "Hot take:", etc.)
- High humor/energy tone
- Voice match scores should be 60-100% if profile is working

### 5. Voice Match Score Display ✓
**Steps:**
1. Click on a generated hook to insert into composer
2. Check TweetInput footer (bottom of text area)

**Expected:**
- "Voice Match: X%" appears between keyboard shortcut and character count
- Score updates reactively as you type
- Score should be reasonable (0-100%)

### 6. Copy Tweet and Verify Storage ✓
**Steps:**
1. Keep a generated hook in the text area
2. Click "Copy" button (or press ⌘+Enter)
3. Open DevTools → Application → Local Storage → `tweet-optimizer`
4. Find the `tweetLog` table
5. Look at the most recent entry

**Expected:**
- Entry contains:
  - `text`: The tweet content
  - `score`: Regular virality score
  - `voiceMatchScore`: Voice match score (0-100)
  - `copiedAt`: Timestamp
  - `mediaType`, `hasLink`: Media settings

### 7. Profile Persistence ✓
**Steps:**
1. Note current voice profile settings
2. Refresh browser (F5 or ⌘+R)
3. Navigate to Settings tab
4. Check all voice profile fields

**Expected:**
- All settings persist:
  - Tone slider at position 5
  - Formality = "Casual"
  - Humor = "High"
  - Emoji = "Often"
  - Topics = "productivity, ai, tech"
- All example tweets still present

### 8. Generate New Hooks - Consistency ✓
**Steps:**
1. Navigate back to Compose tab
2. Enter different topic: "marketing"
3. Generate hooks
4. Compare style to previous generation

**Expected:**
- New hooks still match voice profile (casual, emojis, humor)
- Voice match scores consistent (60-100%)
- Style remains authentic to configured profile

### 9. Edge Cases ✓

#### 9a. Empty Text - Voice Score
**Steps:**
1. Clear all text from tweet input
2. Check voice match score display

**Expected:**
- Score shows "Voice Match: 0%"
- No errors in console

#### 9b. No Example Tweets
**Steps:**
1. Go to Settings → Remove all example tweets
2. Generate hooks on Compose tab
3. Check if generation still works

**Expected:**
- Hooks generate successfully
- Voice profile parameters still applied (tone, formality, emoji)
- Voice match scoring falls back to profile-based metrics

#### 9c. Default Profile
**Steps:**
1. Open DevTools → Application → Local Storage
2. Delete `tweet-optimizer` key
3. Refresh page
4. Generate hooks

**Expected:**
- Default voice profile initialized (neutral settings)
- AI generation uses default style
- No errors

### 10. No Regressions ✓
**Steps:**
1. Test existing features still work:
   - Templates tab (view templates)
   - Analytics tab (view history)
   - Regular tweet scoring (ScoreDisplay shows points)
   - Media toggles work
   - Character count accurate

**Expected:**
- All existing functionality works as before
- No console errors
- No visual glitches

## Success Criteria

- [ ] Voice profile UI fully functional
- [ ] Example tweets can be added/removed (max 3)
- [ ] AI-generated hooks adapt to voice parameters
- [ ] Voice match scores display (60-100% for matching content)
- [ ] Scores stored in localStorage tweetLog
- [ ] Profile persists across browser refresh
- [ ] Consistent voice matching across multiple generations
- [ ] Edge cases handled gracefully
- [ ] No regressions in existing features
- [ ] No console errors

## Performance Checks

- [ ] Voice match scoring completes in <100ms (check with DevTools Performance)
- [ ] UI remains responsive during AI generation
- [ ] No lag when typing in text area
- [ ] Settings auto-save without delay

## Console Error Check

Open DevTools Console and verify:
- [ ] No red errors during normal flow
- [ ] No TypeScript compilation errors
- [ ] No React warnings
- [ ] No failed network requests (except expected AI timeout if API down)

## localStorage Verification

DevTools → Application → Local Storage → `tweet-optimizer`:
```json
{
  "voiceProfile": {
    "user": {
      "tone": 5,
      "formality": "casual",
      "humorLevel": "high",
      "emojiUsage": "often",
      "topicPreferences": ["productivity", "ai", "tech"]
    }
  },
  "exampleTweets": {
    "tweet_123": {
      "id": "tweet_123",
      "text": "Just shipped a new feature! 🚀...",
      "addedAt": 1234567890
    }
  },
  "tweetLog": {
    "tweet_456": {
      "text": "...",
      "score": 78,
      "voiceMatchScore": 85,
      "copiedAt": 1234567890
    }
  }
}
```

## Notes

- Voice match score calculation uses:
  - String similarity (25 points) - compared to example tweets
  - Emoji frequency (25 points) - matches example/profile emoji usage
  - Sentence length (25 points) - matches example writing patterns
  - Punctuation density (25 points) - matches punctuation style
- Total score: 0-100%
- If no examples provided, falls back to profile-based defaults
