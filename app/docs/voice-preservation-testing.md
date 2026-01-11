# Voice Preservation Testing Guide

## Overview

Voice preservation is the #1 competitive differentiator for Punchline X's AI Tweet Rewriter. This document outlines the testing procedure to ensure generated alternatives maintain the user's unique voice while optimizing for engagement.

## Testing Procedure

### Prerequisites

1. Valid ZAI API key configured in `.env.local`
2. Bun proxy server running on port 3001
3. React dev server running on port 5173
4. Test dataset of 10+ diverse tweets prepared

### Test Dataset Requirements

The test dataset must include at least **10 diverse tweets** covering these categories:

1. **Professional/Corporate** (2 tweets)
   - Example: "Excited to announce our Q4 results. Revenue up 15% YoY."
   - Example: "Join us for our webinar on AI transformation next Tuesday."

2. **Casual/Personal** (2 tweets)
   - Example: "lol just realized I've been wearing my shirt inside out all day 😅"
   - Example: "coffee first, adulting later ☕️"

3. **Technical/Developer** (2 tweets)
   - Example: "TIL: Array.prototype.at() is way cleaner than arr[arr.length - 1]"
   - Example: "Debugging distributed systems at 2am. Send help (and coffee)."

4. **Motivational/Inspirational** (2 tweets)
   - Example: "Your future self is watching you right now. Make them proud."
   - Example: "Small progress is still progress. Keep going 💪"

5. **Controversial/Opinion** (2 tweets)
   - Example: "Unpopular opinion: tabs > spaces and it's not even close"
   - Example: "Hot take: most meetings could have been an email"

### Step-by-Step Testing Process

For each test tweet:

#### 1. Input the Tweet

1. Open http://localhost:5173
2. Clear the tweet input field
3. Paste the test tweet
4. Record the original tweet text

#### 2. Generate Alternatives

1. Click "Rewrite with AI" button
2. Wait for 3-5 alternatives to appear (should take < 10 seconds)
3. Record the number of alternatives generated
4. Screenshot the alternatives for review

#### 3. Evaluate Each Alternative

For each alternative, score these criteria (1-5 scale, 5 = perfect):

**A. Core Message Preservation** (Critical)
- Does it convey the same fundamental message?
- Are all key points maintained?
- Is there any topic drift or new information added?

**B. Voice Markers** (Critical)
- Vocabulary level matches (simple/sophisticated/technical)?
- Sentence structure similar (short/long, simple/complex)?
- Punctuation style preserved (minimal/expressive/formal)?
- Emoji usage consistent (none/sparse/frequent)?
- Capitalization patterns maintained?
- Slang/jargon/abbreviations preserved?

**C. Tone Consistency** (Critical)
- Professional tweets stay professional?
- Casual tweets stay casual?
- Humorous tweets stay humorous?
- Serious tweets stay serious?

**D. Engagement Optimization** (Important)
- Is the hook stronger/front-loaded?
- Better line breaks for readability?
- More impactful word choices (while maintaining voice)?
- Improved rhythm and flow?

#### 4. Record Results

For each alternative, calculate a **Voice Preservation Score**:

- **PASS**: Core message + voice + tone all score 4-5 (≥80%)
- **ACCEPTABLE**: Minor deviations, scores 3-4 (60-79%)
- **FAIL**: Significant voice change, scores 1-2 (<60%)

## Pass/Fail Criteria

### Individual Tweet Criteria

For a single tweet test to PASS:
- At least **3 out of 5** alternatives must score **PASS** or **ACCEPTABLE**
- At least **1 alternative** must score **PASS**
- No more than **2 alternatives** can **FAIL**

### Overall Test Suite Criteria

For the entire test suite to PASS:
- **≥90% of tweets** (9/10 or better) must pass individual criteria
- **No category** should have all tweets fail
- Average Voice Preservation Score across all alternatives ≥75%

## Expected Pass Rate

**Target: ≥90% of test tweets pass individual criteria**

Based on prompt engineering and ZAI GLM 4.7 capabilities:
- **Professional tweets**: 95% expected pass rate
- **Casual tweets**: 90% expected pass rate (hardest to preserve informal style)
- **Technical tweets**: 95% expected pass rate
- **Motivational tweets**: 92% expected pass rate
- **Controversial tweets**: 88% expected pass rate (AI may soften strong opinions)

## Failure Analysis

If a tweet fails the test:

### 1. Identify the Issue
- Which voice markers were lost?
- What changed in tone?
- Was core message altered?

### 2. Categorize the Failure
- **Prompt Engineering Issue**: AI doesn't understand voice preservation rules
- **Model Limitation**: ZAI GLM 4.7 cannot handle this style
- **Edge Case**: Unusual tweet structure (e.g., poetry, lyrics)

### 3. Document and Escalate
- Record the failing tweet in `docs/voice-preservation-failures.md`
- Include original, alternatives, and failure analysis
- Flag for prompt engineering improvement or known limitation documentation

## Test Execution Schedule

**Initial Testing**: Before QA sign-off
- Complete full 10+ tweet test suite
- Document all results
- Address any failures with prompt improvements

**Regression Testing**: After prompt changes
- Re-run failed cases
- Run 5 representative tweets (1 per category)
- Ensure improvements don't break previously passing cases

**Ongoing Monitoring**: Post-launch
- User-reported voice preservation issues
- Quarterly re-testing with new edge cases
- Update test dataset as new tweet styles emerge

## Automation Potential

While this is currently a manual testing process, future automation could include:

1. **Automated scoring** using GPT-4 to evaluate voice preservation
2. **Similarity metrics** comparing vocabulary, sentence structure, emoji usage
3. **Regression test suite** running on CI/CD pipeline
4. **A/B testing** real user reactions to alternatives

## Sample Test Results Template

```markdown
## Test Date: YYYY-MM-DD
## Tester: [Name]

### Tweet 1: Professional
**Original**: "Excited to announce our Q4 results. Revenue up 15% YoY."
**Alternatives Generated**: 4

| Alt # | Message | Voice | Tone | Engagement | Score | Result |
|-------|---------|-------|------|------------|-------|--------|
| 1     | 5       | 4     | 5    | 4          | 90%   | PASS   |
| 2     | 5       | 5     | 5    | 5          | 100%  | PASS   |
| 3     | 4       | 3     | 4    | 4          | 75%   | ACCEPTABLE |
| 4     | 3       | 2     | 3    | 4          | 60%   | ACCEPTABLE |

**Tweet Result**: PASS (2 PASS, 2 ACCEPTABLE, 0 FAIL)

[Repeat for all 10+ tweets]

### Overall Results
- Tweets Passed: 9/10 (90%)
- Average Voice Preservation Score: 82%
- **Test Suite: PASS** ✅
```

## Known Limitations

1. **Poetic/Creative Writing**: May struggle with maintaining poetic structure or creative punctuation
2. **Heavy Emoji Users**: May add/remove emojis inconsistently
3. **Mixed Languages**: Currently only optimized for English tweets
4. **Sarcasm**: May sometimes take sarcastic tweets literally and remove the sarcasm
5. **Brand Voice**: Cannot adapt to brand-specific guidelines without fine-tuning

## Contact

For questions about voice preservation testing:
- Review the implementation in `src/server/ai-proxy.ts` (REWRITE_PROMPT)
- Check existing test results in project documentation
- File issues with failing test cases for prompt engineering improvements
