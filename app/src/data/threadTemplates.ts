export type ThreadTemplateType =
  | 'storytelling'
  | 'list'
  | 'how-to'
  | 'hot-take'
  | 'personal-journey'

export interface ThreadTemplate {
  id: string
  name: string
  type: ThreadTemplateType
  hookFormula: string
  bodyStructure: string
  closingFormula: string
  whenToUse: string
  exampleThread: {
    hook: string
    body: string[]
    closing: string
  }
}

export const threadTemplates: ThreadTemplate[] = [
  // Storytelling Threads
  {
    id: 'story-1-hero-journey',
    name: 'The Hero\'s Journey',
    type: 'storytelling',
    hookFormula: 'Start with a dramatic moment or turning point: "[Time period] ago, I [dramatic situation]." Make it visceral and specific.',
    bodyStructure: `Tweet 2-3: Set the scene - what led to that moment
Tweet 4-6: The challenge/obstacle you faced (build tension)
Tweet 7-9: The turning point or realization
Tweet 10-12: How things unfolded from there`,
    closingFormula: 'End with the lesson learned and a question that invites readers to share their own journey. Add a call-to-action to follow for more stories.',
    whenToUse: 'When you have a personal transformation story with clear before/after states. Best for building authority and connecting emotionally with your audience.',
    exampleThread: {
      hook: '3 years ago, I was living in my car, coding at Starbucks with $127 in my bank account.',
      body: [
        'I had just quit my corporate job to build a startup. Everyone said I was crazy.',
        'The first 6 months were brutal. Sleeping in parking lots. Showering at the gym. Eating ramen twice a day.',
        'But every morning at 5am, I was at Starbucks writing code. I had one rule: ship something every single day.',
        'Month 7: Got my first paying customer. $29/month. I cried in the parking lot.',
        'Month 12: Hit $2K MRR. Enough to rent a room.',
        'Month 24: $50K MRR. Hired my first employee.',
        'Today: $2M+ ARR, 12 employees, and we just got acquired.',
      ],
      closing: 'The lesson? Your circumstances don\'t define your trajectory. Your daily habits do.\n\nWhat\'s one small thing you\'re doing every day to change your life?',
    },
  },
  {
    id: 'story-2-plot-twist',
    name: 'The Plot Twist',
    type: 'storytelling',
    hookFormula: 'Open with a surprising or counterintuitive statement: "Everyone thinks [common belief], but [surprising truth]."',
    bodyStructure: `Tweet 2-4: Share the conventional story/belief
Tweet 5-7: Introduce the twist - what really happened
Tweet 8-10: Explain the implications
Tweet 11-12: The deeper lesson`,
    closingFormula: 'Challenge readers to reconsider their assumptions. End with a question that makes them think.',
    whenToUse: 'When you have a story that defies expectations or reveals hidden truth. Great for challenging conventional wisdom and sparking debate.',
    exampleThread: {
      hook: 'Everyone thinks I sold my company for $40M because of the product.\n\nThe truth? The product almost didn\'t matter.',
      body: [
        'Here\'s what actually happened:',
        '2019: Built what I thought was the "perfect" product. Spent $500K on development.',
        'Result? 47 users after 6 months. We were dying.',
        'Then I did something desperate: I called all 47 users and asked them what they REALLY wanted.',
        'Turns out, they didn\'t care about our features. They wanted integration with a tool we didn\'t even know existed.',
        'We rebuilt everything in 3 weeks. Just one feature. Basic as hell.',
        ' 6 months later: 10K users.',
        '18 months later: Acquisition offer.',
      ],
      closing: 'The product didn\'t win. Listening did.\n\nWhen was the last time you actually talked to your users?',
    },
  },

  // List Threads
  {
    id: 'list-1-lessons-learned',
    name: 'X Lessons I Learned',
    type: 'list',
    hookFormula: 'Lead with the investment and payoff: "I spent [time/money] [doing something] so you don\'t have to. Here are the [number] most important lessons:"',
    bodyStructure: `Tweet 1: Hook with the stakes
Tweet 2-N: One lesson per tweet, numbered
- State the lesson as a bold claim
- Add 1-2 sentences explaining why it matters
- Use line breaks for readability`,
    closingFormula: 'Ask "Which one resonates most with you?" or "What would you add to this list?" Include a CTA to bookmark/share.',
    whenToUse: 'When you have tactical insights from experience. Perfect for positioning yourself as an authority and providing immediate value.',
    exampleThread: {
      hook: 'I spent $100K testing Facebook ads in 2023.\n\nHere are the 7 lessons that matter most:',
      body: [
        '1. Video outperforms static images 3:1\n\nBut only if you hook them in the first 2 seconds. Start with a pattern interrupt, not your logo.',
        '2. Your audience doesn\'t care about your product\n\nThey care about their problem. Lead with pain, not features.',
        '3. Test your copy more than your creative\n\nWe found changing 5 words in the headline improved CTR by 47%. Creative only changed it by 12%.',
        '4. Retargeting is where the money is\n\nCold traffic gets you awareness. Warm traffic gets you customers. Split your budget 30/70.',
        '5. Broad targeting beats narrow (now)\n\nFacebook\'s AI is good enough. Let it find your audience. We scaled from $1K to $30K/day doing this.',
        '6. Your landing page matters more than your ad\n\nA great ad with a bad landing page = wasted money. Fix the page before scaling.',
        '7. Most people quit too early\n\nIt took us 37 failed ads to find our first winner. Then we spent $2M on variations of that one ad.',
      ],
      closing: 'Which lesson do you wish you\'d learned earlier?\n\nBookmark this for later. And follow me for more ad breakdowns.',
    },
  },
  {
    id: 'list-2-mistakes-to-avoid',
    name: 'X Mistakes Costing You',
    type: 'list',
    hookFormula: 'Start with the cost: "These [number] mistakes are costing you [specific outcome]. I made them all. Here\'s what I learned:"',
    bodyStructure: `Tweet 1: Hook with urgency and stakes
Tweet 2-N: One mistake per tweet
Format: "Mistake #: [What they\'re doing wrong]
- Why it\'s costly
- What to do instead"`,
    closingFormula: 'Ask which mistake they\'re currently making or which one they\'ve overcome. Offer a resource or follow for more insights.',
    whenToUse: 'When you want to help people avoid common pitfalls. Great for building trust and showing you understand their struggles.',
    exampleThread: {
      hook: 'These 5 mistakes cost me $200K and 2 years.\n\nIf you\'re building a SaaS, don\'t make them:',
      body: [
        'Mistake 1: Building features nobody asked for\n\nI spent 8 months on "revolutionary" features. Zero users cared. Build for real pain points, not imagined ones.',
        'Mistake 2: Underpricing to "get customers"\n\nCharged $9/mo thinking it would help us grow. It just attracted customers who churned in 30 days. Raised to $99/mo. Better customers, lower churn.',
        'Mistake 3: Not talking to churned users\n\nI avoided churn calls because they hurt. Biggest mistake. Churned users tell you exactly what\'s broken.',
        'Mistake 4: Scaling before product-market fit\n\nSpent $50K on ads before we had PMF. Burned through cash acquiring users who left. Fix retention before growth.',
        'Mistake 5: Ignoring customer success until too late\n\nWe focused on acquiring new users and ignored existing ones. 40% churned. Now CS is our #1 priority.',
      ],
      closing: 'Which mistake are you making right now?\n\nBe honest. The sooner you fix it, the faster you grow.\n\nFollow for more SaaS lessons.',
    },
  },
  {
    id: 'list-3-tools-resources',
    name: 'Ultimate Resource List',
    type: 'list',
    hookFormula: 'Promise value and ease: "Here are the [number] [tools/resources] that [specific benefit]. Most are free:"',
    bodyStructure: `Tweet 1: Hook with the promise
Tweet 2-N: One resource per tweet
Format: "[Number]. [Resource name] - [What it does]
- Key benefit
- Price (if relevant)"`,
    closingFormula: 'Invite engagement: "Which one will you try first?" or "What would you add to this list?" Add save/bookmark CTA.',
    whenToUse: 'When you want to provide immediate, actionable value. Perfect for growing your audience and getting shares/bookmarks.',
    exampleThread: {
      hook: '10 AI tools I use daily that replaced my $500/month software stack.\n\nMost are free:',
      body: [
        '1. ChatGPT - Writing & brainstorming\nReplaced: Jasper ($99/mo)\nBest for: First drafts, outlines, research',
        '2. Midjourney - Image generation\nReplaced: Stock photo subscriptions ($49/mo)\nBest for: Social media visuals, blog headers',
        '3. Descript - Video editing\nReplaced: Adobe Premiere ($55/mo)\nBest for: Podcast editing, removing filler words',
        '4. Notion AI - Note-taking & docs\nReplaced: Roam Research ($15/mo)\nBest for: Meeting notes, summarizing articles',
        '5. Grammarly - Writing polish\nReplaced: Nothing, but worth it ($12/mo)\nBest for: Emails, social posts, blog editing',
        '6. Otter.ai - Transcription\nReplaced: Rev ($1.50/min)\nBest for: Meeting notes, interview transcripts',
        '7. Copy.ai - Marketing copy\nReplaced: Copywriter ($200/mo)\nBest for: Ad copy, product descriptions',
        '8. Remove.bg - Background removal\nReplaced: Photoshop ($55/mo)\nBest for: Product photos, headshots',
        '9. Speechify - Text to speech\nReplaced: Audible ($15/mo)\nBest for: Listening to articles, documents',
        '10. Perplexity - Research\nReplaced: Multiple research hours\nBest for: Quick fact-checking, deep research',
      ],
      closing: 'Which one are you trying first?\n\nSave this thread. Share it with someone who needs it.\n\nFollow me for more AI tools & tips.',
    },
  },

  // How-To Threads
  {
    id: 'how-to-1-step-by-step',
    name: 'Step-by-Step Tutorial',
    type: 'how-to',
    hookFormula: 'Promise a clear outcome: "How to [achieve specific result] in [timeframe/steps]. A complete guide:"',
    bodyStructure: `Tweet 1: Hook with the promise
Tweet 2: Why this matters/what they'll achieve
Tweet 3-N: Step-by-step instructions
- One step per tweet
- Be ultra-specific
- Include tips/warnings where relevant`,
    closingFormula: 'Recap the outcome, acknowledge it takes work, and invite questions. Offer to help in replies.',
    whenToUse: 'When you want to teach a specific skill or process. Best for building authority and getting saves/bookmarks.',
    exampleThread: {
      hook: 'How to write a viral Twitter thread in 30 minutes.\n\nA complete guide:',
      body: [
        'Why this works: Threads get 3x more engagement than single tweets. They build authority and attract followers.',
        'Step 1: Pick a topic you\'ve actually experienced\n\nDon\'t teach theory. Share what you\'ve done. Real experience beats research every time.',
        'Step 2: Write your hook first\n\nSpend 10 minutes here. Your hook determines if anyone reads past tweet 1. Use: "I spent [X] doing [Y]. Here\'s what I learned:"',
        'Step 3: List 5-10 key points\n\nBullet out the main insights. Don\'t write full tweets yet. Just capture the ideas.',
        'Step 4: Expand each point into a tweet\n\nOne insight per tweet. 1-3 sentences max. Use line breaks. Make it scannable.',
        'Step 5: Write your closing\n\nAsk a question that invites engagement. Add a CTA to follow. Thank readers for their time.',
        'Step 6: Read it out loud\n\nIf it sounds awkward, rewrite it. Threads should flow like a conversation.',
        'Step 7: Post at 9am or 2pm EST\n\nThese times get max engagement. Post, then engage with replies for 30 minutes.',
      ],
      closing: 'That\'s it. 30 minutes, start to finish.\n\nQuestions? Drop them below. I\'ll answer every one.\n\nFollow me for more Twitter growth tips.',
    },
  },
  {
    id: 'how-to-2-framework',
    name: 'Framework/System Share',
    type: 'how-to',
    hookFormula: 'Introduce your system: "Here\'s the exact [framework/system] I use to [achieve result]. Steal it:"',
    bodyStructure: `Tweet 1: Hook with the promise to share your system
Tweet 2: Brief context on why you created it
Tweet 3-N: Break down each component
- Name the component
- Explain what it does
- Give an example`,
    closingFormula: 'Encourage them to adapt it to their needs. Offer to answer questions or provide a resource.',
    whenToUse: 'When you have a repeatable process that gets results. Perfect for positioning as an expert and providing high value.',
    exampleThread: {
      hook: 'Here\'s the exact content framework I use to create 30 posts in 2 hours.\n\nSteal it:',
      body: [
        'I call it the "Experience Mining Framework." It turns your daily experiences into endless content.',
        'Component 1: The Experience Log\n\nEvery day, write down 3 things:\n- What went well\n- What went wrong\n- What surprised you',
        'Component 2: The Pattern Detector\n\nWeekly, review your log. Look for:\n- Recurring themes\n- Unexpected insights\n- Lessons learned',
        'Component 3: The Content Matrix\n\nMatch patterns to formats:\n- Lesson = "I used to think..."\n- Mistake = "Don\'t do this..."\n- Win = "Here\'s what worked..."\n- Surprise = "Did you know..."',
        'Component 4: The Batch Creator\n\nPick 1 pattern, write 10 variations:\n- Different hooks\n- Different angles\n- Different formats',
        'Example: "I used to think consistency meant posting daily."\n\nVariations:\n- "Consistency ≠ Daily posting"\n- "You don\'t need to post every day"\n- "3 posts/week > 7 mediocre posts"',
        'This framework gave me:\n- 6 months of content\n- Zero writer\'s block\n- Better engagement (because it\'s real)',
      ],
      closing: 'Adapt this to your niche. The experiences are yours, the content is unlimited.\n\nQuestions? Ask away.\n\nWant the template? Follow me and I\'ll share it next week.',
    },
  },

  // Hot Take Threads
  {
    id: 'hot-take-1-evidence-based',
    name: 'Controversial Opinion + Data',
    type: 'hot-take',
    hookFormula: 'Lead with the controversial take: "Unpopular opinion: [Controversial statement]. Here\'s the data that proves it:"',
    bodyStructure: `Tweet 1: The hot take
Tweet 2: Acknowledge why people disagree
Tweet 3-6: Present your evidence
- Use specific numbers/studies
- Share personal data/results
- Include examples
Tweet 7-8: Address counterarguments`,
    closingFormula: 'Invite healthy debate: "Change my mind" or "Am I wrong?" Keep it open-ended.',
    whenToUse: 'When you have data to back up an unpopular position. Great for sparking engagement and positioning as a thought leader.',
    exampleThread: {
      hook: 'Unpopular opinion: Posting daily is killing your reach.\n\nHere\'s the data that proves it:',
      body: [
        'I know, I know. Every guru says "post every day." That\'s the advice I followed for 18 months.',
        'The data from my last 500 posts:\n\nDaily posting (365 posts):\n- Avg engagement: 127\n- Avg impressions: 8.2K\n- Followers gained: 1,240',
        '3x weekly posting (156 posts):\n- Avg engagement: 394\n- Avg impressions: 24.7K\n- Followers gained: 2,180',
        'Quality beats frequency. When I posted less:\n- I spent more time on each post\n- I only shared my best insights\n- I engaged more with my audience',
        'The algorithm rewards engagement, not volume. A post with 400 engagements gets pushed harder than 7 posts with 50 each.',
        'Counterargument: "But you need consistency!"\n\nTrue. But consistent ≠ daily. Consistent = reliable schedule your audience can count on.',
      ],
      closing: 'Am I wrong? What\'s your experience?\n\nDrop your posting frequency and average engagement below. Let\'s compare notes.',
    },
  },
  {
    id: 'hot-take-2-challenge-conventional',
    name: 'Industry Myth Buster',
    type: 'hot-take',
    hookFormula: 'Call out the myth: "Everyone in [industry] believes [myth]. It\'s costing them [consequence]. Here\'s the truth:"',
    bodyStructure: `Tweet 1: Identify the myth
Tweet 2: Explain why it's widespread
Tweet 3-5: Dismantle it with evidence
Tweet 6-7: Share what actually works
Tweet 8: Call to action`,
    closingFormula: 'Challenge them to test it themselves. Invite them to share their results.',
    whenToUse: 'When you want to challenge industry dogma. Perfect for differentiation and attracting people tired of conventional advice.',
    exampleThread: {
      hook: 'Everyone in SaaS believes "free trials convert better."\n\nIt\'s costing them thousands in MRR.\n\nHere\'s the truth:',
      body: [
        'This myth exists because it works for B2C products. Spotify, Netflix, etc. made it gospel.',
        'But B2B SaaS? Different game.',
        'We tested this with 10K signups:\n\nFree trial (7 days):\n- 847 trials started\n- 73 converted (8.6%)\n- Avg LTV: $2,340',
        'Demo + paid pilot (same price):\n- 312 demos booked\n- 94 converted (30.1%)\n- Avg LTV: $8,920',
        'Why demos won:\n1. Qualified leads only (tire-kickers self-selected out)\n2. Human touchpoint built trust\n3. We could customize the pitch\n4. Faster decision (3 days vs 7+)',
        'Free trials attract browsers. Paid pilots attract buyers.',
        'The real insight: Match your sales motion to your price point.\n\n< $100/mo? Free trial works.\n> $500/mo? Demo-driven wins.',
      ],
      closing: 'Test this in your business. Track the LTV, not just conversion rate.\n\nWhat sales motion works for you? Drop it below.',
    },
  },

  // Personal Journey Threads
  {
    id: 'journey-1-transformation',
    name: 'Before/After Journey',
    type: 'personal-journey',
    hookFormula: 'Contrast the before and after: "[Time] ago: [Bad situation]. Today: [Good situation]. Here\'s exactly what changed:"',
    bodyStructure: `Tweet 1: The dramatic contrast
Tweet 2-4: Where you started (be specific)
Tweet 5-7: What you tried that didn't work
Tweet 8-10: The turning point
Tweet 11-13: The transformation
Tweet 14-15: Where you are now`,
    closingFormula: 'Share the key lesson and invite others to share their journey or ask questions.',
    whenToUse: 'When you have a compelling transformation story. Best for inspiration and building a personal brand.',
    exampleThread: {
      hook: 'January 2022: 400 Twitter followers, $0 revenue from content.\n\nJanuary 2024: 47K followers, $380K from my audience.\n\nHere\'s exactly what changed:',
      body: [
        'Where I started:\n\n- Posting random thoughts\n- No strategy\n- Chasing trends\n- 2-3 likes per post\n- Zero monetization plan',
        'What I tried (that failed):\n\n✗ Posting 5x/day (burnout)\n✗ Following "engagement pods" (fake growth)\n✗ Copying viral posts (felt inauthentic)\n✗ Selling before building trust (crickets)',
        'The turning point came in March 2022.\n\nI spent one week analyzing my top 20 posts from the previous 6 months.\n\nI found a pattern.',
        'My best posts had 3 things:\n\n1. Personal experience (not theory)\n2. Tactical advice (not motivation)\n3. Clear outcome (not vague wisdom)',
        'So I committed to only posting content that met all 3 criteria.\n\nI went from posting daily to posting 3x/week.\n\nMy engagement tripled in 60 days.',
        'April 2022: 1,200 followers\nJune 2022: 3,500 followers\nSeptember 2022: 12K followers\n\nEvery post was tested against those 3 criteria.',
        'The monetization:\n\nOnce I hit 5K followers, I launched a small product ($49).\n- Shared my process\n- Showed my results\n- Made it tactical\n\nFirst month: $3,400\nFirst year: $127K',
        'Today:\n\n- 47K followers\n- $380K annual revenue\n- 3-4 posts/week\n- 2 products, 1 community\n- Working 4 hours/day',
      ],
      closing: 'The lesson? Quality > Quantity. Always.\n\nWhat\'s one change you could make to your content strategy today?\n\nShare below. I\'ll reply to everyone.',
    },
  },
  {
    id: 'journey-2-failure-to-success',
    name: 'The Comeback Story',
    type: 'personal-journey',
    hookFormula: 'Start with the failure: "I failed at [thing] [number] times before [success]. Here\'s what failure taught me:"',
    bodyStructure: `Tweet 1: The hook about failure
Tweet 2-4: The failures (be specific)
Tweet 5-7: What you learned from each
Tweet 8-10: How you applied those lessons
Tweet 11-12: The breakthrough`,
    closingFormula: 'Normalize failure as part of growth. Ask what failures taught them the most.',
    whenToUse: 'When you want to build trust through vulnerability. Great for connecting with people facing setbacks.',
    exampleThread: {
      hook: 'I failed to build a profitable business 4 times before my first $100K year.\n\nHere\'s what each failure taught me:',
      body: [
        'Failure #1 (2018): Social media agency\n\nWhat happened: Got 3 clients, couldn\'t scale, burned out in 4 months.\n\nTime wasted: 6 months, $8K',
        'What it taught me:\n\nDon\'t sell time. You can\'t scale hours. I was trading dollars for hours and there\'s a ceiling on that.',
        'Failure #2 (2019): Affiliate marketing blog\n\nWhat happened: Spent 8 months writing 100 articles. Made $247 total.\n\nTime wasted: 8 months, countless hours',
        'What it taught me:\n\nSEO takes too long for a solo founder with no runway. I needed something faster. Lesson: Match your strategy to your resources.',
        'Failure #3 (2020): Print-on-demand store\n\nWhat happened: 50 designs, $2K in ads, 8 sales.\n\nMoney lost: $1,800',
        'What it taught me:\n\nCompeting on products alone is brutal. I needed an unfair advantage. Lesson: Build an audience first, then sell to them.',
        'Failure #4 (2021): SaaS product nobody wanted\n\nWhat happened: Built it for 4 months. Got 12 users. 11 churned.\n\nTime wasted: 4 months',
        'What it taught me:\n\nBuild for a real pain point, not a "nice to have." Talk to customers BEFORE building. Lesson: Validate first, build second.',
        'Success #5 (2022): Started sharing my failures on Twitter\n\nBuilt an audience. Launched a product teaching what I learned. $127K first year.',
        'The difference? I applied every lesson:\n\n✓ Product, not service\n✓ Audience first\n✓ Solved real pain\n✓ Validated before building',
      ],
      closing: 'Failure isn\'t the opposite of success. It\'s the tuition you pay for it.\n\nWhat failure taught you the most? Share below.',
    },
  },
  {
    id: 'journey-3-ongoing-journey',
    name: 'The Work-in-Progress',
    type: 'personal-journey',
    hookFormula: 'Share current progress: "I\'m [X months/days] into [goal]. Here\'s what I\'ve learned so far:"',
    bodyStructure: `Tweet 1: Where you are in the journey
Tweet 2: Why you started
Tweet 3-5: What's working
Tweet 6-8: What's not working
Tweet 9-10: Adjustments you're making
Tweet 11: What's next`,
    closingFormula: 'Invite others on similar journeys to connect. Ask for advice or share resources.',
    whenToUse: 'When you want to build in public and create accountability. Perfect for attracting others on similar paths.',
    exampleThread: {
      hook: 'I\'m 90 days into building a SaaS to $10K MRR.\n\nCurrent MRR: $3,847\n\nHere\'s what I\'ve learned so far:',
      body: [
        'Why I started:\n\nI was tired of trading time for money. I wanted to build something that could grow while I sleep.',
        'What\'s working:\n\n✓ Building in public (gained 5K followers)\n✓ Weekly launches (shipping fast, learning faster)\n✓ Customer interviews (doing 3-5/week)\n✓ Content marketing (80% of signups)',
        'My best decision:\n\nCharging from day 1. No free tier. Every user pays $49/mo.\n\nWhy? It filters for serious customers and funds development.',
        'What\'s NOT working:\n\n✗ Trying to do everything myself\n✗ Building features nobody asked for\n✗ Ignoring churn (lost 12 customers last month)',
        'My biggest mistake so far:\n\nIgnoring the 3 people who churned in week 1. I should\'ve called them immediately.\n\nNow I call every churned user within 24 hours.',
        'Adjustments I\'m making:\n\n1. Hired a VA for customer support ($800/mo)\n2. Shipping only features customers request\n3. Focus on retention before acquisition',
        'Current metrics:\n\n- 87 paying users\n- $3,847 MRR\n- 7.2% churn (need to get this to <5%)\n- 28% trial-to-paid conversion',
        'What\'s next:\n\n- Fix onboarding (too many users don\'t activate)\n- Build referral system\n- Get to $5K MRR before scaling ads',
      ],
      closing: 'Building in public keeps me accountable.\n\nAnyone else on a similar journey? Drop your progress below. Let\'s connect.',
    },
  },
]

export const threadTypeLabels: Record<ThreadTemplateType, string> = {
  storytelling: 'Storytelling',
  list: 'List/Lessons',
  'how-to': 'How-To',
  'hot-take': 'Hot Take',
  'personal-journey': 'Personal Journey',
}

export function getThreadTemplatesByType(type: ThreadTemplateType): ThreadTemplate[] {
  return threadTemplates.filter((t) => t.type === type)
}

export function getThreadTemplateById(id: string): ThreadTemplate | undefined {
  return threadTemplates.find((t) => t.id === id)
}
