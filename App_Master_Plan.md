# Tweet Optimizer App: Master Plan

## Product Vision

**Mission:** Help content creators craft algorithmically-optimized tweets that maximize reach and engagement—without requiring API access or expensive subscriptions.

**Tagline:** "Score before you post."

---

## Product Overview

### What It Is

A lightweight web application that provides:
1. Real-time tweet scoring against algorithm factors
2. Template library for high-performing formats
3. Hook suggestions and improvements
4. Performance tracking and analytics
5. Optimal timing recommendations

### What It Is NOT

- A scheduling tool (no posting functionality)
- A competitor analysis tool (no API required)
- A full Creator Buddy replacement (focused scope)
- An account management platform

### Target User

**Primary:** Aspiring content creators on X (1,000-10,000 followers)
- Building personal brand
- Want to grow but don't understand algorithm
- Not ready to pay $49/month for Creator Buddy
- Willing to do manual posting

**Secondary:** Small business owners and solopreneurs
- Use X for marketing
- Time-constrained
- Need quick optimization

---

## Feature Specification

### Core Features (MVP)

#### Feature 1: Tweet Scorer

**Purpose:** Real-time scoring as user types their tweet

**Functionality:**
- Text input field with character counter
- Toggle buttons for media type (none/image/video/poll)
- Toggle for Premium status
- Toggle for external link presence
- Real-time score calculation
- Color-coded feedback (red/yellow/green)
- Specific improvement suggestions

**Scoring Display:**
```
┌─────────────────────────────────────────┐
│  YOUR TWEET SCORE                       │
│                                         │
│         ████████████░░░░  72/100        │
│                                         │
│  ✅ Strong hook detected                │
│  ✅ Question increases engagement       │
│  ⚠️  No media attached (-20 points)    │
│  ⚠️  Consider peak posting time        │
│                                         │
│  [Improve Hook] [Add Template] [Copy]   │
└─────────────────────────────────────────┘
```

**Score Factors:**
| Factor | Points | Detection Method |
|--------|--------|------------------|
| Media type | -50 to +40 | User toggle |
| Hook strength | -5 to +15 | NLP analysis |
| Question present | +10 | Regex detection |
| Number/stat present | +10 | Regex detection |
| Length optimization | -10 to +10 | Character count |
| External link | -50 to -20 | URL detection |
| Premium status | +30 | User toggle |
| Call-to-action | +10 | Keyword detection |

#### Feature 2: Template Library

**Purpose:** Provide proven tweet formats users can customize

**Template Categories:**
1. Contrarian Takes
2. Numbered Lists
3. Story Hooks
4. Thread Starters
5. Engagement Polls
6. Value Drops
7. Question Posts
8. Quote Tweet Templates

**Template Structure:**
```json
{
  "id": "contrarian-001",
  "name": "The Unpopular Opinion",
  "category": "contrarian",
  "template": "Unpopular opinion: [controversial statement]\n\nHere's why:\n\n• [Point 1]\n• [Point 2]\n• [Point 3]\n\n[Question to invite debate]",
  "placeholders": [
    {"key": "[controversial statement]", "hint": "Something most people assume is true"},
    {"key": "[Point 1]", "hint": "Your strongest argument"},
    {"key": "[Point 2]", "hint": "Supporting evidence"},
    {"key": "[Point 3]", "hint": "Real-world example"},
    {"key": "[Question to invite debate]", "hint": "Agree or disagree?"}
  ],
  "expected_score": 75,
  "best_with": ["image", "poll"],
  "avoid_with": ["link"]
}
```

**UI:**
- Grid view of template cards
- Click to load into scorer
- Fill-in-the-blank interface
- Preview before copying

#### Feature 3: Hook Analyzer

**Purpose:** Evaluate and improve the first line of tweets

**Functionality:**
- Extracts first line from tweet input
- Scores hook strength (1-10)
- Identifies hook type
- Suggests improvements
- Offers alternative hooks

**Hook Types Detected:**
| Type | Pattern | Score Modifier |
|------|---------|----------------|
| Question | Ends with ? | +10 |
| Number | Contains digit | +10 |
| Contrarian | "Actually...", "Unpopular..." | +15 |
| Story | "I just...", "Yesterday..." | +10 |
| Command | Starts with verb | +5 |
| Generic | No pattern detected | -5 |

**Improvement Suggestions:**
```
Your hook: "Here's some advice about growing on Twitter"

Score: 3/10 (Weak)

Issues:
• Generic opener ("Here's")
• No curiosity gap
• No specific promise

Suggested improvements:
1. "I grew from 0 to 10K in 6 months. Here's what actually worked:"
2. "Stop doing this one thing if you want to grow on Twitter:"
3. "The advice no one tells you about growing on Twitter:"
```

#### Feature 4: Timing Advisor

**Purpose:** Recommend optimal posting times

**Functionality:**
- Display peak hours by day
- Current time indicator
- Countdown to next peak window
- Time zone adjustment

**Data Source:**
| Day | Peak Hours (PST) | Peak Hours (EST) |
|-----|------------------|------------------|
| Monday | 8-11am | 11am-2pm |
| Tuesday | 8-11am | 11am-2pm |
| Wednesday | 8-11am | 11am-2pm |
| Thursday | 8-11am | 11am-2pm |
| Friday | 8-10am | 11am-1pm |
| Saturday | 9-11am | 12-2pm |
| Sunday | 9-11am | 12-2pm |

**UI:**
- Timeline visualization
- "Post now" vs "Wait X hours" recommendation
- Score adjustment based on current time

### Phase 2 Features (Post-MVP)

#### Feature 5: Performance Tracker

**Purpose:** Manual logging of tweet performance for pattern analysis

**Functionality:**
- Log tweets with metadata (time, type, media, score)
- Input actual performance (impressions, engagements)
- Calculate engagement rate
- Track trends over time
- Identify best-performing patterns

**Data Model:**
```json
{
  "id": "tweet-001",
  "content": "Tweet text here...",
  "posted_at": "2025-01-06T09:00:00Z",
  "pre_score": 72,
  "content_type": "value",
  "media_type": "image",
  "hook_type": "number",
  "impressions_24h": 2400,
  "engagements": 96,
  "engagement_rate": 4.0,
  "notes": "Strong performance, question drove replies"
}
```

**Analytics Dashboard:**
- Average score vs actual performance correlation
- Best performing content types
- Optimal posting times (personalized)
- Hook type performance breakdown
- Weekly/monthly trends

#### Feature 6: AI Hook Generator

**Purpose:** Generate hook variations using AI

**Functionality:**
- Input topic/main point
- Generate 5 hook variations
- Each with different hook type
- Score each suggestion
- One-click to use

**Implementation:**
- Claude API integration (or local model)
- Prompt engineering for hook styles
- Score each generated hook

#### Feature 7: Thread Builder

**Purpose:** Optimize multi-tweet threads

**Functionality:**
- Thread outline builder
- Per-tweet scoring
- Thread flow analysis
- Visual break recommendations
- Call-to-action placement

---

## User Experience

### User Flow: New User

```
1. Land on homepage
   └→ See value prop: "Score your tweet before posting"
   
2. Try scorer without signup
   └→ Paste/type tweet
   └→ See instant score
   └→ Get improvement suggestions
   
3. Want templates? Sign up (free)
   └→ Email + password
   └→ Access template library
   
4. Track performance? Enable tracking
   └→ Log tweets manually
   └→ See analytics over time
```

### User Flow: Returning User

```
1. Open app
   └→ See recent tweets (if tracking enabled)
   
2. New tweet
   └→ Start typing or pick template
   └→ Real-time scoring
   └→ Adjust based on suggestions
   └→ Copy to clipboard
   
3. Post to X manually
   └→ Return later to log performance
```

### Key Screens

**Screen 1: Scorer (Home)**
- Large text input
- Score display
- Media/Premium toggles
- Suggestions panel
- Template quick-access

**Screen 2: Templates**
- Category filter
- Template grid
- Preview modal
- Use template button

**Screen 3: Analytics (logged in)**
- Performance chart
- Recent tweets list
- Pattern insights
- Best times chart

**Screen 4: Settings**
- Time zone
- Default Premium status
- Export data
- Account settings

---

## Technical Requirements

### Performance

- Score calculation: < 100ms
- Page load: < 2 seconds
- Template load: < 500ms
- Works offline (core scorer)

### Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (responsive)

### Data Storage

- LocalStorage for anonymous users (tweets, preferences)
- Database for logged-in users (tracking history)
- Export functionality (CSV, JSON)

### Accessibility

- Keyboard navigation
- Screen reader support
- High contrast mode
- Mobile-responsive

---

## Business Model

### Pricing Tiers

**Free Tier:**
- Tweet scorer (unlimited)
- 5 templates
- Basic timing info
- No tracking

**Pro Tier ($9/month):**
- All templates (50+)
- Performance tracking
- Analytics dashboard
- AI hook generator (limited)
- Export data

**Lifetime ($79 one-time):**
- All Pro features
- Future updates included
- Priority support

### Revenue Projections

| Month | Free Users | Pro Users | MRR |
|-------|-----------|-----------|-----|
| 1 | 500 | 25 | $225 |
| 3 | 2,000 | 100 | $900 |
| 6 | 5,000 | 300 | $2,700 |
| 12 | 10,000 | 800 | $7,200 |

### Growth Strategy

1. **Product-led growth:** Free tier drives awareness
2. **Content marketing:** Use the tool to optimize your own content about the tool
3. **Creator partnerships:** Get small creators to use and share
4. **Template marketplace:** Community-contributed templates

---

## Success Metrics

### Product Metrics

| Metric | Target (Month 1) | Target (Month 6) |
|--------|------------------|------------------|
| Daily Active Users | 100 | 1,000 |
| Tweets Scored/Day | 500 | 5,000 |
| Free → Pro Conversion | 3% | 5% |
| User Retention (7-day) | 20% | 40% |

### Business Metrics

| Metric | Target (Month 1) | Target (Month 6) |
|--------|------------------|------------------|
| MRR | $200 | $2,500 |
| Paying Customers | 25 | 300 |
| Churn Rate | <10% | <5% |

---

## Risks and Mitigations

### Risk 1: X Algorithm Changes

**Risk:** Algorithm updates invalidate scoring model
**Mitigation:** 
- Monitor X developer updates
- Build flexible scoring system
- Regular model updates
- User feedback loop

### Risk 2: Competition

**Risk:** Creator Buddy or similar tools undercut
**Mitigation:**
- Focus on free tier value
- Faster iteration
- Niche positioning (aspiring creators)
- Community building

### Risk 3: Low Conversion

**Risk:** Users stay on free tier
**Mitigation:**
- Clear value differentiation
- Trial periods for Pro features
- Social proof from successful users
- Continuous free tier improvement

---

## Roadmap

### Phase 1: MVP (Weeks 1-2)
- [ ] Tweet scorer with real-time calculation
- [ ] Basic template library (10 templates)
- [ ] Timing recommendations
- [ ] Mobile-responsive design

### Phase 2: Core Features (Weeks 3-4)
- [ ] User accounts
- [ ] Full template library (30+ templates)
- [ ] Performance tracking
- [ ] Basic analytics

### Phase 3: Enhancement (Weeks 5-8)
- [ ] AI hook generator
- [ ] Thread builder
- [ ] Advanced analytics
- [ ] Community templates

### Phase 4: Scale (Months 3-6)
- [ ] API for integrations
- [ ] Browser extension
- [ ] Team features
- [ ] White-label option

---

## Appendix: Competitive Analysis

### Creator Buddy ($49/month)
**Strengths:** Full ecosystem, AI-powered, established brand
**Weaknesses:** Expensive, requires X API, complex
**Our Advantage:** Free tier, no API needed, focused scope

### Typefully ($15/month)
**Strengths:** Great UI, scheduling, analytics
**Weaknesses:** No optimization scoring, thread-focused
**Our Advantage:** Pre-publish optimization, template library

### Hypefury ($29/month)
**Strengths:** Automation, scheduling, engagement tools
**Weaknesses:** Complex, no scoring, expensive
**Our Advantage:** Simplicity, free tier, scoring focus

### Our Positioning

"The free, no-API tweet optimizer that helps you score before you post."
