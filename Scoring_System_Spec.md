# Scoring System Specification

## Overview

This document defines the complete scoring algorithm for the Tweet Optimizer. The system evaluates tweets across multiple dimensions to produce a score from 0-100, predicting algorithmic performance on X.

---

## Scoring Philosophy

### Core Principles

1. **Additive Model:** Start at base score, add/subtract based on factors
2. **Weighted Importance:** Not all factors are equal
3. **Penalty-Heavy for Critical Issues:** Links without Premium should tank score
4. **Ceiling at 100:** No bonus points beyond maximum
5. **Floor at 0:** Negative scores round to 0

### Base Score

All tweets start with a **base score of 40 points**.

This represents a neutral, text-only tweet with no particular strengths or weaknesses.

---

## Factor Categories

### Category 1: Media Type

The most impactful single factor. X's algorithm heavily favors rich media.

| Media Type | Points | Rationale |
|------------|--------|-----------|
| Video (10+ sec) | +40 | Highest algorithmic boost |
| Video (< 10 sec) | +30 | Good but below watch threshold |
| Image | +20 | Solid performance boost |
| GIF | +15 | Less impact than static image |
| Poll | +20 | High engagement potential |
| Text only | +0 | Baseline |
| External link (Premium) | -20 | Reduced but viable |
| External link (Non-Premium) | -50 | Near-zero engagement expected |

**Implementation Notes:**
- Video length can be estimated or user-input
- Detect links via regex: `https?://[^\s]+`
- Premium status is user toggle
- Only one media modifier applies (take highest positive or most negative)

```javascript
function getMediaScore(mediaType, hasLink, isPremium) {
  const mediaScores = {
    'video-long': 40,
    'video-short': 30,
    'image': 20,
    'gif': 15,
    'poll': 20,
    'none': 0
  };
  
  let score = mediaScores[mediaType] || 0;
  
  // Link penalty (overrides if more negative)
  if (hasLink) {
    const linkPenalty = isPremium ? -20 : -50;
    score = Math.min(score, linkPenalty);
  }
  
  return score;
}
```

---

### Category 2: Hook Strength

First impression determines scroll-stop potential.

| Hook Element | Points | Detection Method |
|--------------|--------|------------------|
| Pattern interrupt | +15 | Keyword detection |
| Curiosity gap | +10 | Incomplete statement patterns |
| First line < 10 words | +10 | Word count |
| Contains number/stat | +10 | Digit detection |
| Asks question | +10 | Ends with ? (first line) |
| Contrarian indicator | +15 | Keywords: "Actually", "Unpopular", "Hot take" |
| Story opener | +10 | Keywords: "I just", "Yesterday", "Last week" |
| Generic opener | -5 | Keywords: "Just wanted", "Here's some", "Sharing" |
| First line > 20 words | -5 | Word count (too long) |

**Maximum hook bonus: +25 points** (cap to prevent gaming)

**Hook Detection Patterns:**

```javascript
const hookPatterns = {
  patternInterrupt: [
    /^stop\s/i,
    /^wait\s/i,
    /^hold\s+on/i,
    /^hear\s+me\s+out/i,
    /^unpopular\s+opinion/i,
    /^hot\s+take/i,
    /^controversial/i
  ],
  curiosityGap: [
    /^the\s+(?:real|actual|true)\s+reason/i,
    /^what\s+(?:nobody|no\s+one)\s+tells/i,
    /^the\s+secret\s+to/i,
    /^why\s+(?:most|everyone)/i
  ],
  contrarian: [
    /^actually,?\s/i,
    /^unpopular\s+opinion/i,
    /^hot\s+take/i,
    /^controversial/i,
    /^i\s+(?:disagree|don't\s+think)/i
  ],
  storyOpener: [
    /^i\s+just/i,
    /^yesterday/i,
    /^last\s+(?:week|month|year)/i,
    /^(?:2|3|4|5|6|7|8|9|10)\s+(?:years?|months?|weeks?)\s+ago/i,
    /^when\s+i\s+(?:was|started)/i
  ],
  genericOpener: [
    /^just\s+wanted\s+to/i,
    /^here(?:'s|\s+is)\s+(?:some|a)/i,
    /^sharing\s/i,
    /^thought\s+(?:i'd|i\s+would)/i,
    /^check\s+out/i
  ]
};

function analyzeHook(text) {
  const firstLine = text.split('\n')[0];
  const words = firstLine.split(/\s+/).filter(w => w.length > 0);
  let score = 0;
  
  // Length check
  if (words.length <= 10) score += 10;
  if (words.length > 20) score -= 5;
  
  // Question check
  if (firstLine.trim().endsWith('?')) score += 10;
  
  // Number check
  if (/\d/.test(firstLine)) score += 10;
  
  // Pattern detection
  for (const [type, patterns] of Object.entries(hookPatterns)) {
    for (const pattern of patterns) {
      if (pattern.test(firstLine)) {
        switch(type) {
          case 'patternInterrupt': score += 15; break;
          case 'curiosityGap': score += 10; break;
          case 'contrarian': score += 15; break;
          case 'storyOpener': score += 10; break;
          case 'genericOpener': score -= 5; break;
        }
        break; // Only count first match per category
      }
    }
  }
  
  return Math.min(score, 25); // Cap at +25
}
```

---

### Category 3: Engagement Signals

Elements that predict interaction likelihood.

| Element | Points | Detection Method |
|---------|--------|------------------|
| Question anywhere | +10 | Contains ? |
| Call-to-action | +10 | Keywords: "Reply", "Comment", "Share" |
| "What do you think?" | +15 | Specific phrase |
| Debate invitation | +10 | Keywords: "Agree?", "Disagree?" |
| Bracket prompts | +5 | Pattern: [drop your X] |
| Emoji (1-3) | +5 | Count emojis |
| Emoji (4+) | -5 | Over-use penalty |
| All caps words (1-2) | +5 | Emphasis |
| All caps (3+) | -10 | Shouting penalty |
| Pure self-promotion | -15 | Pattern detection |

**Maximum engagement bonus: +25 points**

**Self-Promotion Detection:**

```javascript
const selfPromoPatterns = [
  /check\s+out\s+my/i,
  /buy\s+my/i,
  /get\s+my/i,
  /subscribe\s+to\s+my/i,
  /follow\s+me/i,
  /link\s+in\s+bio/i,
  /use\s+(?:my\s+)?code/i,
  /(?:50|25|20|10)%\s+off/i
];

function isSelfPromotion(text) {
  return selfPromoPatterns.some(p => p.test(text));
}
```

---

### Category 4: Timing

When the user plans to post (or current time).

| Timing | Points | Definition |
|--------|--------|------------|
| Peak hours (8-11am PST) | +15 | Primary peak |
| Secondary peak (12-2pm PST) | +10 | Post-lunch engagement |
| Weekday | +5 | Monday-Friday |
| Weekend | +0 | Saturday-Sunday |
| Off-peak (6pm-6am PST) | -10 | Low engagement hours |

**Implementation:**

```javascript
function getTimingScore(date, timezone = 'America/Los_Angeles') {
  const localDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
  const hour = localDate.getHours();
  const day = localDate.getDay();
  
  let score = 0;
  
  // Day of week
  if (day >= 1 && day <= 5) score += 5; // Weekday bonus
  
  // Time of day (PST-based)
  if (hour >= 8 && hour < 11) {
    score += 15; // Primary peak
  } else if (hour >= 12 && hour < 14) {
    score += 10; // Secondary peak
  } else if (hour >= 18 || hour < 6) {
    score -= 10; // Off-peak penalty
  }
  
  return score;
}
```

---

### Category 5: Account Status

User's X account configuration.

| Status | Points | Notes |
|--------|--------|-------|
| Premium subscriber | +20 | 4x algorithmic boost |
| Verified badge | +10 | Credibility signal |
| Neither | +0 | Baseline |

**Note:** Premium and Verified can stack.

---

### Category 6: Content Quality

Text-level quality signals.

| Signal | Points | Detection |
|--------|--------|-----------|
| Optimal length (100-200 chars) | +10 | Character count |
| Too short (< 50 chars) | -5 | May lack substance |
| Too long (> 250 chars) | -5 | Wall of text |
| Thread indicator (🧵 or "Thread:") | +5 | Signals value |
| List format (numbered or bulleted) | +5 | Scannable |
| Excessive hashtags (4+) | -10 | Spam signal |
| Moderate hashtags (1-3) | +5 | Discovery |

```javascript
function getContentQualityScore(text) {
  const charCount = text.length;
  const hashtagCount = (text.match(/#\w+/g) || []).length;
  
  let score = 0;
  
  // Length scoring
  if (charCount >= 100 && charCount <= 200) score += 10;
  else if (charCount < 50) score -= 5;
  else if (charCount > 250) score -= 5;
  
  // Thread indicator
  if (/🧵|thread:/i.test(text)) score += 5;
  
  // List format
  if (/^\s*[\d•\-]\s/m.test(text)) score += 5;
  
  // Hashtags
  if (hashtagCount >= 1 && hashtagCount <= 3) score += 5;
  else if (hashtagCount >= 4) score -= 10;
  
  return score;
}
```

---

## Score Calculation

### Final Formula

```javascript
function calculateTweetScore(tweet) {
  const {
    text,
    mediaType,
    hasLink,
    isPremium,
    isVerified,
    postTime
  } = tweet;
  
  // Start with base score
  let score = 40;
  
  // Add each category
  score += getMediaScore(mediaType, hasLink, isPremium);
  score += analyzeHook(text);
  score += getEngagementScore(text);
  score += getTimingScore(postTime);
  score += getAccountScore(isPremium, isVerified);
  score += getContentQualityScore(text);
  
  // Clamp to 0-100
  return Math.max(0, Math.min(100, score));
}
```

### Score Breakdown Response

```javascript
function getScoreBreakdown(tweet) {
  return {
    total: calculateTweetScore(tweet),
    breakdown: {
      base: 40,
      media: getMediaScore(tweet.mediaType, tweet.hasLink, tweet.isPremium),
      hook: analyzeHook(tweet.text),
      engagement: getEngagementScore(tweet.text),
      timing: getTimingScore(tweet.postTime),
      account: getAccountScore(tweet.isPremium, tweet.isVerified),
      quality: getContentQualityScore(tweet.text)
    },
    suggestions: generateSuggestions(tweet),
    warnings: generateWarnings(tweet)
  };
}
```

---

## Score Interpretation

### Thresholds

| Score Range | Rating | Recommendation |
|------------|--------|----------------|
| 85-100 | Excellent | Post with high confidence |
| 70-84 | Good | Should perform well |
| 55-69 | Fair | Consider improvements |
| 40-54 | Poor | Significant rework needed |
| 0-39 | Critical | Do not post as-is |

### Color Coding

```javascript
function getScoreColor(score) {
  if (score >= 85) return '#22c55e'; // Green
  if (score >= 70) return '#84cc16'; // Lime
  if (score >= 55) return '#eab308'; // Yellow
  if (score >= 40) return '#f97316'; // Orange
  return '#ef4444'; // Red
}
```

---

## Improvement Suggestions

### Suggestion Engine

```javascript
function generateSuggestions(tweet) {
  const suggestions = [];
  
  // Media suggestions
  if (tweet.mediaType === 'none') {
    suggestions.push({
      type: 'media',
      priority: 'high',
      message: 'Add an image or video for +20-40 points',
      impact: '+20 to +40'
    });
  }
  
  // Link warning
  if (tweet.hasLink && !tweet.isPremium) {
    suggestions.push({
      type: 'critical',
      priority: 'critical',
      message: 'External links get near-zero reach without Premium',
      impact: '-50',
      recommendation: 'Remove link or use link-in-bio strategy'
    });
  }
  
  // Hook suggestions
  const hookScore = analyzeHook(tweet.text);
  if (hookScore < 10) {
    suggestions.push({
      type: 'hook',
      priority: 'high',
      message: 'Strengthen your hook with a number, question, or pattern interrupt',
      impact: '+10 to +25'
    });
  }
  
  // Engagement suggestions
  if (!tweet.text.includes('?')) {
    suggestions.push({
      type: 'engagement',
      priority: 'medium',
      message: 'Add a question to increase replies',
      impact: '+10'
    });
  }
  
  // Timing suggestions
  const timingScore = getTimingScore(tweet.postTime);
  if (timingScore < 0) {
    suggestions.push({
      type: 'timing',
      priority: 'medium',
      message: 'Consider posting during peak hours (8-11am PST)',
      impact: '+15'
    });
  }
  
  // Sort by priority
  const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  return suggestions.sort((a, b) => 
    priorityOrder[a.priority] - priorityOrder[b.priority]
  );
}
```

---

## Warnings

### Critical Warnings

```javascript
function generateWarnings(tweet) {
  const warnings = [];
  
  // Link without Premium
  if (tweet.hasLink && !tweet.isPremium) {
    warnings.push({
      severity: 'critical',
      message: '⚠️ CRITICAL: Links without Premium get near-zero reach',
      action: 'Remove link or upgrade to Premium'
    });
  }
  
  // All caps overuse
  const capsWords = (tweet.text.match(/\b[A-Z]{3,}\b/g) || []).length;
  if (capsWords >= 3) {
    warnings.push({
      severity: 'warning',
      message: 'Too many ALL CAPS words may trigger spam filters',
      action: 'Reduce to 1-2 emphasized words'
    });
  }
  
  // Hashtag spam
  const hashtagCount = (tweet.text.match(/#\w+/g) || []).length;
  if (hashtagCount >= 4) {
    warnings.push({
      severity: 'warning',
      message: 'Too many hashtags signals spam to the algorithm',
      action: 'Use 1-3 relevant hashtags maximum'
    });
  }
  
  return warnings;
}
```

---

## Testing & Validation

### Test Cases

```javascript
const testCases = [
  {
    name: 'Perfect tweet',
    input: {
      text: 'I grew 10K followers in 30 days. Here\'s the exact strategy:\n\n🧵',
      mediaType: 'image',
      hasLink: false,
      isPremium: true,
      postTime: new Date('2025-01-06T09:00:00-08:00')
    },
    expectedRange: [85, 100]
  },
  {
    name: 'Link without Premium',
    input: {
      text: 'Check out my new blog post: https://example.com',
      mediaType: 'none',
      hasLink: true,
      isPremium: false,
      postTime: new Date('2025-01-06T09:00:00-08:00')
    },
    expectedRange: [0, 25]
  },
  {
    name: 'Generic text-only',
    input: {
      text: 'Just wanted to share some thoughts on marketing.',
      mediaType: 'none',
      hasLink: false,
      isPremium: false,
      postTime: new Date('2025-01-06T22:00:00-08:00')
    },
    expectedRange: [20, 40]
  }
];
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Jan 2025 | Initial specification |

---

## Future Enhancements

1. **ML-based scoring:** Train on actual performance data
2. **Personalized weights:** Adjust based on user's historical data
3. **Trend integration:** Boost score for trending topics
4. **A/B testing:** Compare variations before posting
5. **Competitive analysis:** Score against successful accounts in niche
