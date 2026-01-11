# Voice Preservation Verification Tests

**Date:** 2026-01-07
**Subtask:** subtask-5-3
**Purpose:** Verify that AI-generated tweet alternatives preserve core message, maintain tone, and don't contradict original intent.

## Test Methodology

For each test tweet, we will:
1. Generate 3-5 alternatives using the `/api/rewrite-tweet` endpoint
2. Verify each alternative against three criteria:
   - ✅ **Preserves core message** - Same fundamental topic/point
   - ✅ **Maintains similar tone** - Professional/casual/humorous stays consistent
   - ✅ **Doesn't contradict original intent** - No opposite meanings or conflicting statements
3. Document any failures or concerns

## Test Cases

### Test 1: Professional/Technical Tweet
**Category:** Professional, Technical
**Original Tweet:**
```
Just deployed our new microservices architecture to production. Zero downtime migration thanks to blue-green deployment. The team executed flawlessly.
```

**Voice Markers to Preserve:**
- Professional tone
- Technical vocabulary (microservices, blue-green deployment)
- Team appreciation
- Achievement focus

**Expected Preservation:**
- ✅ Core message: Successful production deployment with no downtime
- ✅ Tone: Professional and technical
- ✅ Intent: Share technical achievement and credit team

**Test Results:** _To be filled during testing_

---

### Test 2: Casual/Personal Tweet
**Category:** Casual, Personal
**Original Tweet:**
```
lol just realized i've been writing code for 6 hours straight and forgot to eat lunch. anyone else do this or am i just a mess 😅
```

**Voice Markers to Preserve:**
- Lowercase style
- Casual language ("lol", "just realized")
- Self-deprecating humor
- Emoji usage
- Relatable/vulnerable tone

**Expected Preservation:**
- ✅ Core message: Lost track of time while coding, forgot to eat
- ✅ Tone: Casual, self-deprecating, humorous
- ✅ Intent: Share relatable programmer moment

**Test Results:** _To be filled during testing_

---

### Test 3: Humorous/Sarcastic Tweet
**Category:** Humorous, Sarcastic
**Original Tweet:**
```
"Just add AI to it" they said. "It'll be easy" they said. Me at 2am debugging hallucinations: 🤡
```

**Voice Markers to Preserve:**
- Sarcastic tone with quotes
- Meme format ("they said, they said")
- Tech humor (AI hallucinations)
- Clown emoji for comedic effect
- Self-aware frustration

**Expected Preservation:**
- ✅ Core message: AI integration is harder than expected
- ✅ Tone: Sarcastic, humorous, self-deprecating
- ✅ Intent: Make fun of AI hype vs reality

**Test Results:** _To be filled during testing_

---

### Test 4: Inspirational/Motivational Tweet
**Category:** Inspirational, Motivational
**Original Tweet:**
```
Your first draft will suck. Your second draft will be better. Your tenth draft might be good. Keep going. The only way out is through.
```

**Voice Markers to Preserve:**
- Direct, declarative sentences
- Progressive structure (first, second, tenth)
- Encouraging tone
- No fluff, straight to the point
- Motivational message

**Expected Preservation:**
- ✅ Core message: Iteration and persistence lead to improvement
- ✅ Tone: Inspirational, direct, encouraging
- ✅ Intent: Motivate people to keep working despite imperfection

**Test Results:** _To be filled during testing_

---

### Test 5: Question/Engagement Tweet
**Category:** Question, Community Engagement
**Original Tweet:**
```
What's your unpopular opinion about remote work? Mine: async communication is overrated and real-time collaboration > everything else
```

**Voice Markers to Preserve:**
- Question format
- Personal opinion sharing ("Mine:")
- Contrarian stance (unpopular opinion)
- Direct comparison with ">" symbol
- Conversational tone

**Expected Preservation:**
- ✅ Core message: Asking for unpopular remote work opinions, sharing own view on async vs real-time
- ✅ Tone: Conversational, opinionated, engaging
- ✅ Intent: Start discussion, share contrarian view

**Test Results:** _To be filled during testing_

---

### Test 6: Thread Starter/Long-form Tweet
**Category:** Thread Starter, Educational
**Original Tweet:**
```
I've spent 3 years building SaaS products. Here are 7 mistakes I made that cost me $50k and 18 months:

(Thread 🧵)
```

**Voice Markers to Preserve:**
- Specific numbers (3 years, 7 mistakes, $50k, 18 months)
- Personal experience framing ("I've spent")
- Promise of valuable lessons
- Thread indicator with emoji
- Clear value proposition

**Expected Preservation:**
- ✅ Core message: Sharing expensive SaaS lessons learned
- ✅ Tone: Educational, personal, valuable
- ✅ Intent: Hook readers into thread about mistakes/lessons

**Test Results:** _To be filled during testing_

---

### Test 7: News/Announcement Tweet
**Category:** News, Announcement
**Original Tweet:**
```
🚀 LAUNCH DAY: After 6 months of development, our team is shipping v2.0 today! New features include dark mode, AI-powered search, and 3x faster load times. Try it now at example.com
```

**Voice Markers to Preserve:**
- Excitement (rocket emoji, caps LAUNCH DAY)
- Specific timeline (6 months)
- Feature list with specifics (3x faster)
- Call to action with link
- Team credit

**Expected Preservation:**
- ✅ Core message: Launching v2.0 with specific new features
- ✅ Tone: Excited, professional, promotional
- ✅ Intent: Announce launch and drive traffic to product

**Test Results:** _To be filled during testing_

---

### Test 8: Hot Take/Controversial Opinion
**Category:** Controversial, Opinion
**Original Tweet:**
```
Hot take: TypeScript is overkill for 90% of projects. You're spending more time fighting the compiler than shipping features. JavaScript + good tests > TypeScript + no tests.
```

**Voice Markers to Preserve:**
- "Hot take" prefix
- Strong opinion
- Specific percentage (90%)
- Comparative argument (X > Y)
- Contrarian stance on popular tool
- Technical context

**Expected Preservation:**
- ✅ Core message: TypeScript is often unnecessary overhead
- ✅ Tone: Contrarian, confident, argumentative
- ✅ Intent: Challenge popular opinion, start debate

**Test Results:** _To be filled during testing_

---

### Test 9: Story/Narrative Tweet
**Category:** Storytelling, Personal
**Original Tweet:**
```
True story: I once spent 3 days debugging a production issue. Turned out to be a single missing comma in a config file. I laughed, I cried, then I wrote a parser to prevent this from ever happening again.
```

**Voice Markers to Preserve:**
- "True story" opener
- Narrative structure (setup → reveal → resolution)
- Emotional journey ("laughed, cried")
- Specific details (3 days, single comma)
- Self-aware humor
- Learning/growth ending

**Expected Preservation:**
- ✅ Core message: Small bug caused big problem, led to preventive solution
- ✅ Tone: Self-deprecating, storytelling, humorous
- ✅ Intent: Share relatable debugging story with lesson

**Test Results:** _To be filled during testing_

---

### Test 10: Minimalist/Philosophical Tweet
**Category:** Minimalist, Philosophical
**Original Tweet:**
```
Code is poetry.
Bugs are typos.
Refactoring is editing.

Writing software is writing.
```

**Voice Markers to Preserve:**
- Parallel structure
- Short, declarative sentences
- Metaphorical language
- Minimalist style
- Philosophical tone
- No unnecessary words

**Expected Preservation:**
- ✅ Core message: Software development is like writing
- ✅ Tone: Philosophical, minimalist, poetic
- ✅ Intent: Share perspective through metaphor

**Test Results:** _To be filled during testing_

---

### Test 11: Frustrated/Venting Tweet
**Category:** Frustrated, Relatable
**Original Tweet:**
```
Why does every "simple" feature request turn into a 2-week refactor of the entire codebase??? Just trying to add a button here people 😤
```

**Voice Markers to Preserve:**
- Frustrated tone
- Question format (rhetorical)
- Scare quotes around "simple"
- Specific timeline (2-week)
- Exasperated emoji
- Casual language ("here people")

**Expected Preservation:**
- ✅ Core message: Simple features often require complex changes
- ✅ Tone: Frustrated, relatable, slightly humorous
- ✅ Intent: Vent about common developer frustration

**Test Results:** _To be filled during testing_

---

### Test 12: Educational/Tutorial Hook
**Category:** Educational, Tutorial
**Original Tweet:**
```
Most developers struggle with async/await. Here's a mental model that made it click for me in 5 minutes (no complex diagrams needed):
```

**Voice Markers to Preserve:**
- Empathy opener ("Most developers struggle")
- Personal experience ("made it click for me")
- Specific timeframe (5 minutes)
- Promise of simplicity ("no complex diagrams")
- Clear value proposition
- Hook format (incomplete, promises continuation)

**Expected Preservation:**
- ✅ Core message: Offering simple explanation of async/await
- ✅ Tone: Helpful, empathetic, accessible
- ✅ Intent: Hook readers into educational content

**Test Results:** _To be filled during testing_

---

## Testing Procedure

### Prerequisites
1. Ensure Bun proxy server is running: `cd app && npm run server`
2. Ensure React dev server is running: `cd app && npm run dev`
3. Verify ZAI_API_KEY is set in `app/.env.local`

### For Each Test Case

1. **Input Original Tweet**
   - Open http://localhost:5173
   - Enter the original tweet text
   - Click "Rewrite with AI" button

2. **Generate Alternatives**
   - Wait for 3-5 alternatives to appear
   - Note generation time and any errors

3. **Evaluate Each Alternative**
   - Read each alternative carefully
   - Check against three criteria:
     - [ ] Preserves core message
     - [ ] Maintains similar tone
     - [ ] Doesn't contradict original intent
   - Note any voice markers that were lost or changed
   - Document the alternative text and scores

4. **Record Results**
   - Fill in the "Test Results" section
   - Mark PASS/FAIL for each criterion
   - Note specific issues if any
   - Include all alternative texts for reference

### Success Criteria

- **PASS:** At least 90% of alternatives (9+ out of 10 per test case) preserve all three criteria
- **FAIL:** More than 10% of alternatives fail on any criterion OR any single alternative completely contradicts the original

### Known Acceptable Variations

These changes are acceptable as improvements, not failures:
- Adding line breaks for readability
- Reordering sentences for better flow
- Adding emphasis (bold, capitalization) matching original style
- Removing filler words while keeping voice
- Improving grammar without changing vocabulary level

### Unacceptable Changes (Mark as FAIL)

- Changing casual to professional or vice versa
- Adding corporate speak to casual tweets
- Removing personality/humor
- Adding facts not in original
- Changing the fundamental topic
- Making sarcastic tweets sincere
- Making serious tweets humorous

## Results Summary

_To be filled after testing_

**Total Tests:** 12
**Total Alternatives Tested:** _TBD (36-60 based on 3-5 per test)_
**Passes:** _TBD_
**Failures:** _TBD_
**Pass Rate:** _TBD%_

### Critical Failures

_Document any critical voice preservation failures here_

### Minor Issues

_Document minor concerns that didn't warrant failure_

### Recommendations

_Based on test results, document any recommended improvements to the REWRITE_PROMPT_

---

## Sign-off

**Tested By:** _Name_
**Date:** _Date_
**Status:** ⬜ PASS / ⬜ FAIL
**Notes:** _Additional comments_
