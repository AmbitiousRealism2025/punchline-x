import type { Template } from './types'

export const templates: Template[] = [
  {
    id: 'c1-unpopular-opinion',
    name: 'Unpopular Opinion',
    category: 'contrarian',
    template: `Unpopular opinion: {statement}

Here's why:

• {point1}
• {point2}
• {point3}

{question}`,
    placeholders: [
      { key: 'statement', hint: 'A controversial statement most disagree with' },
      { key: 'point1', hint: 'First supporting argument' },
      { key: 'point2', hint: 'Second supporting argument' },
      { key: 'point3', hint: 'Third supporting argument' },
      { key: 'question', hint: 'Open question to invite debate' },
    ],
    expectedScore: [70, 85],
    bestWith: ['image'],
    example: `Unpopular opinion: Scheduling tools are killing your reach.

Here's why:

• The algorithm favors real-time engagement
• Scheduled posts miss trending conversations
• Your audience can tell when you're not "there"

Am I wrong? What's been your experience?`,
  },
  {
    id: 'c3-hot-take',
    name: 'Hot Take Minimalist',
    category: 'contrarian',
    template: `Hot take: {statement}`,
    placeholders: [
      { key: 'statement', hint: 'Bold statement in under 10 words' },
    ],
    expectedScore: [55, 70],
    bestWith: ['poll'],
  },
  {
    id: 'n1-x-things',
    name: 'The "X Things" List',
    category: 'list',
    template: `{number} {topic} that {benefit}:

1. {item1} - {why1}
2. {item2} - {why2}
3. {item3} - {why3}
4. {item4} - {why4}
5. {item5} - {why5}

Which would you add?`,
    placeholders: [
      { key: 'number', hint: 'Odd numbers work better (5, 7, 9)' },
      { key: 'topic', hint: 'Specific topic, not generic' },
      { key: 'benefit', hint: 'What reader gets from this' },
      { key: 'item1', hint: 'First item' },
      { key: 'why1', hint: 'Brief explanation' },
      { key: 'item2', hint: 'Second item' },
      { key: 'why2', hint: 'Brief explanation' },
      { key: 'item3', hint: 'Third item' },
      { key: 'why3', hint: 'Brief explanation' },
      { key: 'item4', hint: 'Fourth item' },
      { key: 'why4', hint: 'Brief explanation' },
      { key: 'item5', hint: 'Fifth item' },
      { key: 'why5', hint: 'Brief explanation' },
    ],
    expectedScore: [70, 85],
    bestWith: ['image'],
    example: `7 free tools that replaced my $500/month software stack:

1. Notion - project management
2. Canva - design
3. Loom - video recording
4. Calendly - scheduling
5. Mailchimp - email (free tier)

Which would you add?`,
  },
  {
    id: 'n3-did-you-know',
    name: 'Did You Know List',
    category: 'list',
    template: `{number} things most people don't know about {topic}:

1. {fact1}
2. {fact2}
3. {fact3}

Save this for later 🔖`,
    placeholders: [
      { key: 'number', hint: 'Number of facts (3-5 works well)' },
      { key: 'topic', hint: 'Your area of expertise' },
      { key: 'fact1', hint: 'Surprising fact 1' },
      { key: 'fact2', hint: 'Surprising fact 2' },
      { key: 'fact3', hint: 'Surprising fact 3' },
    ],
    expectedScore: [65, 80],
    bestWith: ['image'],
  },
  {
    id: 's1-transformation',
    name: 'Transformation Story',
    category: 'story',
    template: `{timeAgo} ago, I {startingState}.

Today, I {endingState}.

Here's what changed everything:

{insight}

{question}`,
    placeholders: [
      { key: 'timeAgo', hint: 'Time period (6 months, 2 years)' },
      { key: 'startingState', hint: 'Where you started' },
      { key: 'endingState', hint: 'Where you are now' },
      { key: 'insight', hint: 'Key insight in 2-3 sentences' },
      { key: 'question', hint: 'Call to action question' },
    ],
    expectedScore: [75, 90],
    bestWith: ['image'],
    example: `6 months ago, I had 200 followers and zero engagement.

Today, I crossed 15,000 and my posts regularly hit 100K impressions.

Here's what changed everything:

I stopped posting what I thought was "valuable" and started posting what actually got engagement. I tracked every post for 30 days and doubled down on what worked.

What's stopping you from tracking your content?`,
  },
  {
    id: 's3-i-was-wrong',
    name: 'I Was Wrong Admission',
    category: 'story',
    template: `I used to believe {oldBelief}.

Then {whatHappened}.

Now I know {newUnderstanding}.

What beliefs have you had to abandon?`,
    placeholders: [
      { key: 'oldBelief', hint: 'What you used to think' },
      { key: 'whatHappened', hint: 'What changed your mind' },
      { key: 'newUnderstanding', hint: 'What you believe now' },
    ],
    expectedScore: [65, 80],
    bestWith: ['none'],
  },
  {
    id: 't1-value-thread',
    name: 'Value Thread Opener',
    category: 'thread',
    template: `I spent {time} {activity} so you don't have to.

Here's everything I learned about {topic}:

🧵`,
    placeholders: [
      { key: 'time', hint: 'Time invested (100 hours, 6 months)' },
      { key: 'activity', hint: 'What you did' },
      { key: 'topic', hint: 'The subject of your thread' },
    ],
    expectedScore: [70, 85],
    bestWith: ['none'],
    example: `I spent 100 hours analyzing viral tweets so you don't have to.

Here's everything I learned about what makes content spread:

🧵`,
  },
  {
    id: 'p1-this-or-that',
    name: 'This or That Poll',
    category: 'poll',
    template: `{context}

Which do you prefer?`,
    placeholders: [
      { key: 'context', hint: 'Set up the choice context' },
    ],
    expectedScore: [75, 85],
    bestWith: ['poll'],
  },
  {
    id: 'v1-quick-tip',
    name: 'Quick Tip',
    category: 'value',
    template: `Quick tip: {tip}

{explanation}

Save for later 🔖`,
    placeholders: [
      { key: 'tip', hint: 'Actionable advice in one sentence' },
      { key: 'explanation', hint: '2-3 sentences explaining why this works' },
    ],
    expectedScore: [60, 75],
    bestWith: ['image'],
  },
  {
    id: 'v3-copy-this',
    name: 'Copy This Template',
    category: 'value',
    template: `Steal this {type}:

{content}

I use this every {frequency}. It works.`,
    placeholders: [
      { key: 'type', hint: 'template/script/framework' },
      { key: 'content', hint: 'The actual template to share' },
      { key: 'frequency', hint: 'How often you use it' },
    ],
    expectedScore: [75, 90],
    bestWith: ['image'],
  },
  {
    id: 'q2-whats-your',
    name: "What's Your Question",
    category: 'question',
    template: `What's your {category}?

I'll start: {yourAnswer}

Drop yours below 👇`,
    placeholders: [
      { key: 'category', hint: 'Specific category to ask about' },
      { key: 'yourAnswer', hint: 'Your own answer to start' },
    ],
    expectedScore: [70, 85],
    bestWith: ['image'],
  },
  {
    id: 'q3-challenge',
    name: 'Challenge Question',
    category: 'question',
    template: `Challenge: {challenge}

Reply with your answer.

Best one gets {reward}.`,
    placeholders: [
      { key: 'challenge', hint: 'Describe the challenge' },
      { key: 'reward', hint: 'What the winner gets' },
    ],
    expectedScore: [75, 90],
    bestWith: ['none'],
  },
  {
    id: 'm1-milestone',
    name: 'Milestone Celebration',
    category: 'milestone',
    template: `Just hit {milestone} 🎉

{timeAgo} ago, I {startingPoint}.

Thank you to everyone who {acknowledgment}.

Here's what I learned:

{lesson1}
{lesson2}
{lesson3}`,
    placeholders: [
      { key: 'milestone', hint: 'What you achieved' },
      { key: 'timeAgo', hint: 'When you started' },
      { key: 'startingPoint', hint: 'Where you began' },
      { key: 'acknowledgment', hint: 'Specific thank you' },
      { key: 'lesson1', hint: 'Key lesson 1' },
      { key: 'lesson2', hint: 'Key lesson 2' },
      { key: 'lesson3', hint: 'Key lesson 3' },
    ],
    expectedScore: [70, 85],
    bestWith: ['image'],
  },
  {
    id: 'tm1-how-to',
    name: 'How To Tutorial',
    category: 'teaching',
    template: `How to {outcome} in {number} steps:

Step 1: {step1}
Step 2: {step2}
Step 3: {step3}

That's it. No fluff. Just results.

Questions? 👇`,
    placeholders: [
      { key: 'outcome', hint: 'What they will achieve' },
      { key: 'number', hint: 'Number of steps (3-5)' },
      { key: 'step1', hint: 'First action' },
      { key: 'step2', hint: 'Second action' },
      { key: 'step3', hint: 'Third action' },
    ],
    expectedScore: [70, 85],
    bestWith: ['video', 'image'],
  },
  {
    id: 'tm2-mistake-prevention',
    name: 'Mistake Prevention',
    category: 'teaching',
    template: `Stop making this mistake with {topic}:

❌ {wrongWay}
✅ {rightWay}

I see this constantly. Don't be that person.`,
    placeholders: [
      { key: 'topic', hint: 'Subject area' },
      { key: 'wrongWay', hint: 'What people do wrong' },
      { key: 'rightWay', hint: 'What to do instead' },
    ],
    expectedScore: [65, 80],
    bestWith: ['image'],
  },
  {
    id: 'pr1-bold-prediction',
    name: 'Bold Prediction',
    category: 'predictions',
    template: `My prediction for {timeframe}:

{prediction}

Why I believe this:

• {reason1}
• {reason2}
• {reason3}

Screenshot this. Let's revisit in {timeframe}.`,
    placeholders: [
      { key: 'timeframe', hint: 'Time period (2025, next year, 6 months)' },
      { key: 'prediction', hint: 'Your bold prediction' },
      { key: 'reason1', hint: 'First supporting reason' },
      { key: 'reason2', hint: 'Second supporting reason' },
      { key: 'reason3', hint: 'Third supporting reason' },
    ],
    expectedScore: [70, 85],
    bestWith: ['image'],
    example: `My prediction for 2026:

AI won't replace content creators. It will replace those who don't use AI.

Why I believe this:

• Every platform is prioritizing AI-assisted creation
• Early adopters are already 10x-ing their output
• The gap between users and non-users is exponential

Screenshot this. Let's revisit in 2026.`,
  },
  {
    id: 'pr2-trend-forecast',
    name: 'Trend Forecast',
    category: 'predictions',
    template: `{number} trends I'm watching in {industry}:

1. {trend1}
2. {trend2}
3. {trend3}

If I'm right, {outcome}.

If I'm wrong, {alternative}.

What am I missing?`,
    placeholders: [
      { key: 'number', hint: 'Number of trends (3-5)' },
      { key: 'industry', hint: 'Industry or field' },
      { key: 'trend1', hint: 'First emerging trend' },
      { key: 'trend2', hint: 'Second emerging trend' },
      { key: 'trend3', hint: 'Third emerging trend' },
      { key: 'outcome', hint: 'What happens if you\'re right' },
      { key: 'alternative', hint: 'What happens if you\'re wrong' },
    ],
    expectedScore: [65, 80],
    bestWith: ['image'],
    example: `3 trends I'm watching in social media:

1. Short-form video fatigue setting in
2. Return to long-form, in-depth content
3. Private communities over public feeds

If I'm right, we'll see a massive shift back to blogs and newsletters.

If I'm wrong, TikTok will dominate for another decade.

What am I missing?`,
  },
  {
    id: 'pr3-mark-my-words',
    name: 'Mark My Words',
    category: 'predictions',
    template: `Mark my words:

{prediction}

Everyone thinks {commonBelief}.

But {contraryEvidence}.

Come back to this post in {timeframe}.`,
    placeholders: [
      { key: 'prediction', hint: 'Your confident prediction' },
      { key: 'commonBelief', hint: 'What most people currently believe' },
      { key: 'contraryEvidence', hint: 'Evidence supporting your prediction' },
      { key: 'timeframe', hint: 'When to check back (6 months, a year)' },
    ],
    expectedScore: [60, 75],
    bestWith: ['none'],
    example: `Mark my words:

Personal brands will matter more than company logos within 3 years.

Everyone thinks big corporations have the trust advantage.

But Gen Z trusts individual creators over brands 3:1, and that gap is widening.

Come back to this post in 2027.`,
  },
  {
    id: 'cs1-client-results',
    name: 'Client Results Showcase',
    category: 'case-study',
    template: `Client results: {clientType}

The challenge:
{problem}

What we did:
{solution}

The results:
• {result1}
• {result2}
• {result3}

Timeline: {timeline}

{callToAction}`,
    placeholders: [
      { key: 'clientType', hint: 'Type of client or industry' },
      { key: 'problem', hint: 'What problem they faced' },
      { key: 'solution', hint: 'What you implemented (2-3 sentences)' },
      { key: 'result1', hint: 'First quantifiable result' },
      { key: 'result2', hint: 'Second quantifiable result' },
      { key: 'result3', hint: 'Third quantifiable result' },
      { key: 'timeline', hint: 'How long it took' },
      { key: 'callToAction', hint: 'What you want readers to do' },
    ],
    expectedScore: [75, 90],
    bestWith: ['image'],
    example: `Client results: E-commerce brand

The challenge:
Email list of 50K but only 0.8% open rate and $2K/month in email revenue.

What we did:
Complete email strategy overhaul. Segmented by behavior, rewrote every automated sequence, A/B tested subject lines for 30 days.

The results:
• Open rate jumped to 42%
• Click rate from 0.3% to 8.1%
• Email revenue hit $47K/month

Timeline: 90 days

Want similar results? DM me "EMAIL" for a free audit.`,
  },
  {
    id: 'cs2-before-after-stats',
    name: 'Before/After Stats',
    category: 'case-study',
    template: `Case study: {project}

BEFORE:
{beforeStat1}
{beforeStat2}
{beforeStat3}

AFTER:
{afterStat1}
{afterStat2}
{afterStat3}

What changed: {keyChange}

{question}`,
    placeholders: [
      { key: 'project', hint: 'Project name or type' },
      { key: 'beforeStat1', hint: 'First "before" metric' },
      { key: 'beforeStat2', hint: 'Second "before" metric' },
      { key: 'beforeStat3', hint: 'Third "before" metric' },
      { key: 'afterStat1', hint: 'First "after" metric' },
      { key: 'afterStat2', hint: 'Second "after" metric' },
      { key: 'afterStat3', hint: 'Third "after" metric' },
      { key: 'keyChange', hint: 'What made the difference' },
      { key: 'question', hint: 'Engagement question' },
    ],
    expectedScore: [70, 85],
    bestWith: ['image'],
    example: `Case study: LinkedIn profile optimization

BEFORE:
→ 2-3 profile views/week
→ Zero inbound leads
→ 800 connections

AFTER:
→ 150+ profile views/week
→ 15-20 inbound DMs/month
→ 3,200 connections

What changed: Featured section showcasing results + headline optimization + posting 3x/week

What's holding you back from optimizing your profile?`,
  },
  {
    id: 'cs3-problem-solution-result',
    name: 'Problem-Solution-Result',
    category: 'case-study',
    template: `Real case study from {timeframe}:

❌ PROBLEM
{problem}

💡 SOLUTION
{solution}

✅ RESULT
{result}

Key lesson: {lesson}

{question}`,
    placeholders: [
      { key: 'timeframe', hint: 'When this happened (last month, Q4 2025)' },
      { key: 'problem', hint: 'The specific problem faced' },
      { key: 'solution', hint: 'How you solved it (2-3 sentences)' },
      { key: 'result', hint: 'Quantifiable outcome achieved' },
      { key: 'lesson', hint: 'Main takeaway for readers' },
      { key: 'question', hint: 'Call to action question' },
    ],
    expectedScore: [70, 85],
    bestWith: ['none'],
    example: `Real case study from December 2025:

❌ PROBLEM
SaaS company had 10K trial signups/month but only 2% converting to paid. Churn analysis showed users weren't reaching "aha moment."

💡 SOLUTION
Rebuilt onboarding flow: removed 8 unnecessary steps, added interactive product tour, sent targeted email on day 3 based on user behavior.

✅ RESULT
Trial-to-paid conversion jumped from 2% to 11.5% in 45 days. Added $127K MRR.

Key lesson: More features in onboarding = lower conversion. Simplify ruthlessly.

What's your biggest conversion bottleneck?`,
  },
  {
    id: 'ba1-simple-comparison',
    name: 'Simple Before/After',
    category: 'before-after',
    template: `BEFORE: {before}

AFTER: {after}

What changed: {change}

{question}`,
    placeholders: [
      { key: 'before', hint: 'Starting state or condition' },
      { key: 'after', hint: 'Current state or result' },
      { key: 'change', hint: 'What you did differently (1-2 sentences)' },
      { key: 'question', hint: 'Engagement question' },
    ],
    expectedScore: [70, 85],
    bestWith: ['image'],
    example: `BEFORE: Spending 3 hours writing one LinkedIn post

AFTER: Writing 5 high-quality posts in 90 minutes

What changed: I stopped trying to be "perfect" and started using templates. Now I fill in frameworks instead of staring at a blank screen.

What's your biggest content creation time-waster?`,
  },
  {
    id: 'ba2-transformation-timeline',
    name: 'Transformation Timeline',
    category: 'before-after',
    template: `My {topic} transformation:

{timeAgo} AGO:
• {beforePoint1}
• {beforePoint2}
• {beforePoint3}

TODAY:
• {afterPoint1}
• {afterPoint2}
• {afterPoint3}

The turning point: {turningPoint}

{callToAction}`,
    placeholders: [
      { key: 'topic', hint: 'Area of transformation' },
      { key: 'timeAgo', hint: 'How long ago (6 months, 1 year)' },
      { key: 'beforePoint1', hint: 'First "before" point' },
      { key: 'beforePoint2', hint: 'Second "before" point' },
      { key: 'beforePoint3', hint: 'Third "before" point' },
      { key: 'afterPoint1', hint: 'First "after" point' },
      { key: 'afterPoint2', hint: 'Second "after" point' },
      { key: 'afterPoint3', hint: 'Third "after" point' },
      { key: 'turningPoint', hint: 'What triggered the change (1-2 sentences)' },
      { key: 'callToAction', hint: 'What you want readers to do' },
    ],
    expectedScore: [75, 90],
    bestWith: ['image'],
    example: `My content strategy transformation:

12 MONTHS AGO:
• Posting randomly 2-3 times/week
• 500 followers, <50 impressions per post
• Zero leads from social media

TODAY:
• Strategic posting 5x/week with batched content
• 12K followers, 50K+ avg impressions per post
• 30+ qualified leads/month from content alone

The turning point: I started tracking every single post's performance and doubled down on what actually worked, not what I thought "should" work.

Want my content tracker template? Drop a 📊 below.`,
  },
  {
    id: 'll1-key-lessons',
    name: 'Key Lessons Format',
    category: 'lessons-learned',
    template: `{number} lessons from {experience}:

1. {lesson1}

2. {lesson2}

3. {lesson3}

The biggest surprise: {surprise}

What lessons are you learning right now?`,
    placeholders: [
      { key: 'number', hint: 'Number of lessons (3-5)' },
      { key: 'experience', hint: 'What experience you learned from' },
      { key: 'lesson1', hint: 'First key lesson (1-2 sentences)' },
      { key: 'lesson2', hint: 'Second key lesson (1-2 sentences)' },
      { key: 'lesson3', hint: 'Third key lesson (1-2 sentences)' },
      { key: 'surprise', hint: 'Most unexpected learning (1 sentence)' },
    ],
    expectedScore: [70, 85],
    bestWith: ['image'],
    example: `3 lessons from running my first webinar:

1. Technical perfection doesn't matter. I had audio issues for 5 minutes and still got rave reviews. People care about value, not polish.

2. Q&A is where the magic happens. The 20-minute Q&A session got more engagement than my entire 40-minute presentation.

3. Follow-up matters more than the event. 80% of my conversions came from the email sequence after, not during the webinar.

The biggest surprise: Smaller audience = better results. 30 engaged people beat 200 lurkers.

What lessons are you learning right now?`,
  },
  {
    id: 'll2-if-i-could-go-back',
    name: 'If I Could Go Back',
    category: 'lessons-learned',
    template: `If I could go back and tell myself one thing before {situation}:

"{advice}"

What I did instead:
{whatYouDid}

What happened:
{consequence}

What I do now:
{currentApproach}

Learn from my mistakes. {callToAction}`,
    placeholders: [
      { key: 'situation', hint: 'The situation/decision point' },
      { key: 'advice', hint: 'What you wish you knew (1 sentence)' },
      { key: 'whatYouDid', hint: 'What you actually did (1-2 sentences)' },
      { key: 'consequence', hint: 'What resulted from that choice' },
      { key: 'currentApproach', hint: 'How you handle it now' },
      { key: 'callToAction', hint: 'Actionable advice for readers' },
    ],
    expectedScore: [75, 90],
    bestWith: ['none'],
    example: `If I could go back and tell myself one thing before launching my first product:

"Sell it before you build it."

What I did instead:
Spent 4 months building the "perfect" product in isolation. No pre-sales, no validation, just assumptions.

What happened:
Launched to crickets. Got 3 sales in the first month. Realized I built features nobody wanted.

What I do now:
I sell the idea first. Get 10 paying customers before writing a single line of code. Let their feedback guide what I build.

Learn from my mistakes. Validate before you create.`,
  },
  {
    id: 'tr1-honest-review',
    name: 'Honest Tool Review',
    category: 'tool-review',
    template: `I've been using {toolName} for {duration}.

Here's my honest review:

✅ WHAT'S GREAT:
• {pro1}
• {pro2}
• {pro3}

❌ WHAT'S NOT:
• {con1}
• {con2}

VERDICT: {verdict}

Best for: {bestFor}

{question}`,
    placeholders: [
      { key: 'toolName', hint: 'Name of the tool' },
      { key: 'duration', hint: 'How long you\'ve used it (3 months, 1 year)' },
      { key: 'pro1', hint: 'First major benefit' },
      { key: 'pro2', hint: 'Second major benefit' },
      { key: 'pro3', hint: 'Third major benefit' },
      { key: 'con1', hint: 'First drawback' },
      { key: 'con2', hint: 'Second drawback' },
      { key: 'verdict', hint: 'Overall recommendation (1-2 sentences)' },
      { key: 'bestFor', hint: 'Who should use this tool' },
      { key: 'question', hint: 'Engagement question' },
    ],
    expectedScore: [70, 85],
    bestWith: ['image'],
    example: `I've been using Notion for 2 years.

Here's my honest review:

✅ WHAT'S GREAT:
• All-in-one workspace (notes, tasks, databases)
• Incredibly flexible and customizable
• Beautiful, intuitive interface

❌ WHAT'S NOT:
• Can be slow with large databases
• Steep learning curve for advanced features

VERDICT: Best productivity tool I've used, but overkill if you just need simple notes.

Best for: People who want one tool for everything and don't mind spending time setting it up.

What's your go-to productivity tool?`,
  },
  {
    id: 'tr2-tool-replacement',
    name: 'Tool Replacement Story',
    category: 'tool-review',
    template: `I replaced {oldTool} with {newTool}.

Why I switched:
{reason}

What I gained:
• {benefit1}
• {benefit2}
• {benefit3}

What I miss:
{tradeoff}

Worth it? {verdict}

{question}`,
    placeholders: [
      { key: 'oldTool', hint: 'Tool you stopped using' },
      { key: 'newTool', hint: 'Tool you switched to' },
      { key: 'reason', hint: 'Main reason for switching (1-2 sentences)' },
      { key: 'benefit1', hint: 'First improvement' },
      { key: 'benefit2', hint: 'Second improvement' },
      { key: 'benefit3', hint: 'Third improvement' },
      { key: 'tradeoff', hint: 'What you gave up or miss (1 sentence)' },
      { key: 'verdict', hint: 'Was it worth switching? (1 sentence)' },
      { key: 'question', hint: 'Engagement question' },
    ],
    expectedScore: [70, 85],
    bestWith: ['image'],
    example: `I replaced Calendly with Cal.com.

Why I switched:
Calendly's branding on the free tier felt unprofessional, and I wanted more control over my scheduling page design.

What I gained:
• Full white-label customization
• Open-source and self-hostable option
• Advanced workflow automation
• Better integration with my existing stack

What I miss:
Calendly's slightly cleaner mobile experience.

Worth it? 100%. Cal.com does everything Calendly does, but with more flexibility and no branding limitations.

What scheduling tool do you use?`,
  },
]

export const categoryLabels: Record<string, string> = {
  contrarian: 'Contrarian Takes',
  list: 'Numbered Lists',
  story: 'Story Hooks',
  thread: 'Thread Starters',
  poll: 'Polls',
  value: 'Value Drops',
  question: 'Questions',
  milestone: 'Milestones',
  teaching: 'Teaching',
  predictions: 'Predictions',
  'case-study': 'Case Studies',
  'before-after': 'Before/After',
  'lessons-learned': 'Lessons Learned',
  'tool-review': 'Tool Reviews',
  comparison: 'Comparisons',
  'unpopular-opinion': 'Unpopular Opinions',
}

export function getTemplatesByCategory(category: string): Template[] {
  return templates.filter((t) => t.category === category)
}

export function getTemplateById(id: string): Template | undefined {
  return templates.find((t) => t.id === id)
}

export function fillTemplate(template: Template, values: Record<string, string>): string {
  let result = template.template
  for (const placeholder of template.placeholders) {
    const value = values[placeholder.key] || `[${placeholder.hint}]`
    result = result.replace(new RegExp(`\\{${placeholder.key}\\}`, 'g'), value)
  }
  return result
}
