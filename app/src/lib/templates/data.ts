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
