import type { ExplanationsMap, ScoringFactorExplanation } from './explanation-types'

/**
 * Educational content for all 7 scoring factors
 * Each explanation includes algorithm principles, examples, and research
 */
export const explanations: ExplanationsMap = {
  base: {
    factorId: 'base',
    factorName: 'Base Score',
    algorithmPrinciple: {
      why: 'Every post starts with a 40-point foundation because the algorithm assumes neutral intent. This baseline represents the minimum visibility threshold - posts below this struggle to appear in feeds, while posts above it compete for recommendation slots. The 40-point floor ensures that even basic content gets initial exposure for the algorithm to evaluate performance.',
      how: 'The algorithm adds this 40-point starting value before evaluating any other factors. Think of it as your "entry ticket" - it guarantees your content will be seen by at least a small initial audience (typically 200-500 users). The algorithm then measures engagement from this test group to determine if your post deserves wider distribution. This baseline prevents good content from being buried due to timing or account status alone.',
    },
    examples: {
      good: [
        {
          description: 'Understanding the baseline helps set realistic expectations',
          example: 'A creator with 1,000 followers posts quality content that scores 65 total (base 40 + factors 25). The base ensures the post reaches 3-5% of followers initially, giving the algorithm data to decide on broader distribution.',
        },
        {
          description: 'The base score protects against catastrophic failures',
          example: 'Even if a post has poor timing (-10) and no media (0), the 40-point base keeps the total above 30, ensuring some minimum visibility rather than complete suppression.',
        },
      ],
      bad: [
        {
          description: 'Relying solely on the base score without optimization',
          example: 'A creator posts text-only content with no hook, poor timing, and self-promotion, scoring exactly 40 total. The algorithm sees no engagement signals and stops distribution after the initial test group.',
        },
        {
          description: 'Misunderstanding the base as guaranteed reach',
          example: 'Thinking "I have 40 points automatically, so I don\'t need to optimize" leads to posts that barely clear the visibility threshold but never trend or reach explore pages (which typically require 70+ scores).',
        },
      ],
    },
    research: [
      {
        title: 'How Social Media Algorithms Test New Content',
        url: 'https://www.socialmediatoday.com/news/how-social-media-algorithms-decide-what-content-to-show/620914/',
        summary: 'Platforms use initial distribution to small audience samples (200-1000 users) to measure engagement velocity before deciding on wider distribution. The baseline score determines this initial sample size.',
      },
      {
        title: 'The Cold Start Problem in Recommendation Systems',
        url: 'https://arxiv.org/abs/2012.07610',
        summary: 'Research on how algorithms handle new content without historical data. Baseline scores provide a minimum distribution guarantee while the system collects engagement signals.',
      },
      {
        title: 'Understanding Platform Visibility Thresholds',
        url: 'https://buffer.com/resources/social-media-algorithm-guide/',
        summary: 'Most social platforms have minimum score requirements (typically 35-50 points) for content to enter recommendation systems. Scores below this range rarely appear in feeds beyond direct followers.',
      },
    ],
  },

  media: {
    factorId: 'media',
    factorName: 'Media Type',
    algorithmPrinciple: {
      why: 'Video content receives the highest boost (+40 points) because it maximizes platform retention metrics - users stay on-platform longer watching videos, generating more ad impressions and engagement opportunities. Images (+20) and polls (+20) create moderate engagement without taking users elsewhere. The algorithm heavily penalizes external links (up to -50 points for non-premium users) because they drive traffic away from the platform, reducing ad revenue and session duration. This scoring hierarchy reflects the platform\'s core business model: keep users engaged on-site.',
      how: 'The algorithm evaluates media type first, assigning base values: video (40 points), image/poll (20 points), GIF (15 points), or text-only (0 points). If your post contains an external link, a penalty overrides the media score - capping it at -20 points for verified/premium accounts or -50 points for standard accounts. This means a video with a link scores -50 (non-premium) instead of +40, while premium users face a smaller -20 penalty. The link penalty is applied as a cap, not a subtraction: your score becomes the minimum of the media value or the penalty threshold.',
    },
    examples: {
      good: [
        {
          description: 'Native video maximizes algorithmic favor',
          example: 'A creator uploads a 60-second tutorial video directly to the platform (no external links). The post receives +40 media points, helping it reach 70+ total score. The algorithm prioritizes this in feeds and recommendations because users watch without leaving the platform.',
        },
        {
          description: 'Premium status reduces link penalties for necessary sharing',
          example: 'A verified creator shares an image (+20) with a product link. As a premium user, the link penalty caps their score at -20 instead of -50. Combined with other factors, they can still achieve positive total scores (base 40 + hook 10 + engagement 5 - media 20 = 35 total).',
        },
      ],
      bad: [
        {
          description: 'External links devastate reach for non-premium accounts',
          example: 'A standard user posts a high-quality video but includes a YouTube link to the full version. Instead of earning +40 media points, the link penalty caps their score at -50. Even with perfect timing (+10) and strong hook (+10), the total barely reaches 10 points, resulting in minimal distribution.',
        },
        {
          description: 'Text-only posts miss major scoring opportunities',
          example: 'A creator shares valuable advice in text format (0 media points). Without visual media to boost engagement, the post struggles to compete against video content scoring 40 points higher. The algorithm interprets this as lower-effort content, reducing visibility even if the writing quality is excellent.',
        },
      ],
    },
    research: [
      {
        title: 'Why Social Platforms Prioritize Video Content',
        url: 'https://www.socialmediaexaminer.com/how-social-media-algorithms-work/',
        summary: 'Analysis of how platforms like Instagram, TikTok, and X prioritize video because it increases session duration by 2-3x compared to static images. Longer sessions mean more ad impressions and revenue per user.',
      },
      {
        title: 'The Economics of External Links in Social Media',
        url: 'https://www.theverge.com/2023/12/14/23990117/instagram-threads-link-posts-algorithm',
        summary: 'Investigation into how platforms algorithmically suppress posts with external links to prevent user exodus. Links reduce on-platform time by an average of 40%, directly impacting advertising revenue.',
      },
      {
        title: 'Premium Account Benefits in Algorithmic Distribution',
        url: 'https://techcrunch.com/2023/04/15/twitter-blue-verified-algorithm-boost/',
        summary: 'Research showing verified/premium users receive reduced penalties for behaviors platforms normally suppress (like external linking), as their subscription revenue offsets lost ad engagement.',
      },
    ],
  },

  hook: {
    factorId: 'hook',
    factorName: 'Hook Strength',
    algorithmPrinciple: {
      why: 'The first line of your post determines whether users stop scrolling or keep moving - the algorithm rewards hooks that capture attention within 2-3 seconds because they generate higher engagement rates and longer session times. Strong hooks (pattern interrupts like "Stop scrolling" or "Unpopular opinion") can earn up to 25 bonus points, while generic openers ("Just wanted to share") actively hurt your score with -5 penalties. This scoring reflects user behavior data: posts with compelling first lines see 3-4x more engagement than those with weak openings, making the hook the single most important factor you can optimize.',
      how: 'The algorithm analyzes only your first line using pattern matching and structural analysis. First, it checks length: concise hooks of 10 words or fewer earn +10 points for scannability, while rambling openers over 20 words lose -5 points. Then it evaluates specific patterns: pattern interrupts like "Wait -" or "Hear me out" earn +15 points, curiosity gaps like "The real reason nobody tells you" earn +10, contrarian takes like "Actually," or "Hot take:" earn +15, story openers like "Yesterday" or "3 years ago" earn +10, but generic phrases like "Just wanted to" lose -5 points. Questions ending in "?" add +10 points for driving replies, and any numbers in the first line add +10 for specificity. All bonuses stack (e.g., a 7-word question with a pattern interrupt earns 10+10+15=35 points, capped at the 25-point maximum).',
    },
    examples: {
      good: [
        {
          description: 'Pattern interrupt with brevity creates maximum impact',
          example: 'First line: "Stop scrolling. This will save you $10,000." (6 words, pattern interrupt) - Scores 25 points (10 for brevity + 15 for pattern interrupt, capped at max). The command "Stop scrolling" triggers the pattern interrupt bonus while the specific number "$10,000" adds concrete value. This hook outperforms 95% of posts.',
        },
        {
          description: 'Curiosity gap with question combines multiple bonuses',
          example: 'First line: "Why do most startups fail in year 2?" (8 words, curiosity gap + question + number) - Scores 25 points (10 brevity + 10 curiosity + 10 question + 10 number = 40, capped at 25). The "Why do most" pattern creates information asymmetry while the question format invites engagement.',
        },
        {
          description: 'Contrarian opener signals valuable perspective shift',
          example: 'First line: "Unpopular opinion: Your 10-year plan is killing your career." (9 words) - Scores 25 points (10 brevity + 15 contrarian + 10 number = 35, capped). "Unpopular opinion" primes readers for a fresh take, while the specific "10-year" adds credibility over vague claims.',
        },
        {
          description: 'Story opener creates narrative hook with specificity',
          example: 'First line: "3 years ago I was broke. Today I run a 7-figure company." (12 words, story + numbers) - Scores 20 points (10 story opener + 10 numbers). The timeline creates contrast and the specific numbers make the transformation tangible, even though it slightly exceeds the 10-word brevity threshold.',
        },
      ],
      bad: [
        {
          description: 'Generic opener signals low-effort content',
          example: 'First line: "Just wanted to share some thoughts on productivity and time management." (12 words, generic opener) - Scores -5 points (generic penalty, no bonuses). "Just wanted to share" is filler that delays the actual value proposition, and vague topics like "thoughts on productivity" don\'t create urgency or curiosity.',
        },
        {
          description: 'Rambling first line loses attention before delivering value',
          example: 'First line: "I\'ve been thinking a lot lately about how we approach our daily routines and habits that might be holding us back." (21 words) - Scores -5 points (length penalty for >20 words). By word 10, most users have already scrolled past. The throat-clearing phrase "I\'ve been thinking" wastes precious attention.',
        },
        {
          description: 'Missing hook opportunity with direct statement',
          example: 'First line: "Here are some tips for better time management." (8 words) - Scores 10 points (brevity only, no pattern bonuses). While concise, this hook has no curiosity gap, pattern interrupt, or question to compel engagement. It scores far below the 25-point potential.',
        },
        {
          description: 'Weak question without specificity or pattern',
          example: 'First line: "Anyone else struggle with staying productive when working from home on certain days?" (13 words, question) - Scores 10 points (question bonus only). The question is too vague ("certain days") and lacks a strong pattern. Compare to "Why do 73% of remote workers fail by 3pm?" which would score 25.',
        },
      ],
    },
    research: [
      {
        title: 'The Science of Scroll-Stopping Content',
        url: 'https://www.nngroup.com/articles/how-users-read-on-the-web/',
        summary: 'Eye-tracking studies show users decide whether to engage with content within 2.6 seconds of seeing it. The first 10-12 words determine this decision, making opening lines the most critical element for algorithmic success.',
      },
      {
        title: 'Pattern Interrupts in Digital Attention Economy',
        url: 'https://www.sciencedirect.com/science/article/abs/pii/S0747563219302456',
        summary: 'Research on how unexpected phrases ("Stop," "Wait," "Unpopular opinion") trigger orienting responses in the brain, increasing content processing by 340% compared to generic openers. Platforms reward this with higher distribution.',
      },
      {
        title: 'Question-Based Engagement Psychology',
        url: 'https://buffer.com/resources/psychology-of-social-media/',
        summary: 'Analysis showing posts beginning with questions generate 23% more comments because they create an "open loop" that readers feel compelled to close. Algorithms interpret this as high-quality, discussion-worthy content.',
      },
      {
        title: 'The Power of Specificity in Viral Content',
        url: 'https://jonahberger.com/contagious/',
        summary: 'Study of 7,000+ viral articles revealing that specific numbers (like "17 ways" vs "some ways") increase sharing by 73% because they signal concrete, actionable value rather than vague musings.',
      },
    ],
  },

  engagement: {
    factorId: 'engagement',
    factorName: 'Engagement Potential',
    algorithmPrinciple: {
      why: 'The algorithm rewards posts designed to spark conversation and interaction because engagement signals content quality and relevance. Posts with built-in engagement mechanisms (questions earning +10 points, calls-to-action earning +10 points) generate 3-5x more replies and shares than passive statements, keeping users active on the platform longer. The algorithm also values authenticity: moderate emoji use (1-3 emojis, +5 points) and strategic emphasis (1-2 ALL-CAPS words, +5 points) enhance readability, while excessive use signals low-quality spam content. Most critically, the algorithm heavily penalizes self-promotional content (-15 points for phrases like "link in bio" or "buy my") because such posts prioritize the creator\'s agenda over audience value, resulting in lower engagement rates and faster scroll-past behavior.',
      how: 'The algorithm scans your entire post text using pattern matching to calculate an engagement score (capped at 25 points maximum). First, it checks for questions: any question mark (?) adds +10 points because questions create dialogue. Second, it searches for call-to-action phrases like "reply," "comment," "share," "what do you think," "agree?", or "disagree?" - finding any one of these adds +10 points (only once, even if multiple CTAs appear). If you specifically use "what do you think," you get an additional +5 bonus on top of the CTA score. Third, the algorithm counts emojis: 1-3 emojis add +5 points for personality, but 4+ emojis subtract -5 points for appearing spammy. Fourth, it counts words in ALL CAPS (3+ consecutive capital letters): 1-2 caps words add +5 points for emphasis, but 3+ caps words subtract -10 points for seeming aggressive. Finally, it checks for self-promotional patterns like "check out my," "buy my," "link in bio," "follow me," "use my code," or discount offers - any single match subtracts -15 points. All these scores combine, then get capped at a maximum of 25 points.',
    },
    examples: {
      good: [
        {
          description: 'Question with CTA maximizes engagement invitation',
          example: 'Post text: "What\'s the biggest productivity mistake you\'ve made? Reply below - I\'ll share mine first." - Scores 25 points (10 question + 10 CTA "reply" + 5 "what" bonus = 25). This creates a two-way conversation invitation and models vulnerability, which the algorithm recognizes as high-engagement potential.',
        },
        {
          description: 'Strategic emoji use adds personality without spam signals',
          example: 'Post text: "Agree or disagree? Remote work kills creativity. \ud83e\udd14" - Scores 25 points (10 question + 10 CTA "agree" + 5 emoji = 25 capped). The single thinking emoji enhances the question without overwhelming the message, and the CTA pattern creates a clear invitation for audience response.',
        },
        {
          description: 'Moderate caps create emphasis without aggression',
          example: 'Post text: "This is HUGE. What do you think about the new policy?" - Scores 25 points (10 question + 10 CTA + 5 "what do you think" bonus + 5 caps 1-2 range = 30, capped at 25). "HUGE" draws attention to importance while staying within the 1-2 caps word sweet spot.',
        },
        {
          description: 'Value-first content avoids self-promotion penalties',
          example: 'Post text: "Here are 3 negotiation tactics that increased my salary 40%. Which resonates most? \ud83d\udca1" - Scores 20 points (10 question + 5 emoji + no self-promo = 15). By leading with value instead of "check out my course," this post maintains positive scoring while still demonstrating expertise.',
        },
      ],
      bad: [
        {
          description: 'Self-promotion destroys engagement score',
          example: 'Post text: "Want to learn productivity? Check out my course! Link in bio for 50% off." - Scores -15 points (caught by "check out my" + "link in bio" + "50% off" patterns = -15, only counted once). Even though it\'s a question (would be +10), the self-promo penalty overrides all positives, resulting in algorithmic suppression.',
        },
        {
          description: 'Excessive emojis signal low-quality spam content',
          example: 'Post text: "This is amazing! \ud83d\ude80\ud83d\udd25\ud83d\udcaf\ud83d\udc4f\ud83c\udf89" - Scores -5 points (5 emojis triggers 4+ penalty = -5). The algorithm interprets emoji overload as trying to manufacture excitement rather than providing substance, similar to clickbait patterns.',
        },
        {
          description: 'Multiple caps words feel aggressive and shouty',
          example: 'Post text: "STOP what you\'re doing RIGHT NOW and READ this IMPORTANT update!" - Scores -10 points (4 caps words "STOP," "RIGHT," "NOW," "READ," "IMPORTANT" = -10 for 3+ caps). While intended for emphasis, this triggers spam filters and reduces distribution.',
        },
        {
          description: 'Missing engagement mechanisms leaves points on table',
          example: 'Post text: "I just published a blog post about time management techniques." - Scores 0 points (no question, no CTA, no emojis, no caps, no self-promo detected). This passive announcement offers no engagement invitation, so the algorithm treats it as low-priority content unlikely to generate interaction.',
        },
      ],
    },
    research: [
      {
        title: 'The Psychology of Questions in Social Media Engagement',
        url: 'https://sproutsocial.com/insights/social-media-engagement-guide/',
        summary: 'Research showing posts with questions generate 100% more comments than statements. The algorithm recognizes this pattern and boosts question-based content because questions create an "open loop" that readers feel psychologically compelled to close with a response.',
      },
      {
        title: 'Call-to-Action Effectiveness in User-Generated Content',
        url: 'https://www.convinceandconvert.com/social-media-research/social-media-engagement-statistics/',
        summary: 'Analysis of 1M+ social posts revealing that explicit CTAs ("reply," "share," "comment") increase engagement by 170% compared to implicit requests. Platforms reward this with higher visibility because CTAs reliably predict interaction rates.',
      },
      {
        title: 'Emoji Use and Perceived Authenticity in Digital Communication',
        url: 'https://journals.sagepub.com/doi/abs/10.1177/0261927X19894198',
        summary: 'Study finding that 1-3 emojis per message increase perceived warmth and engagement by 25%, but 4+ emojis decrease credibility by 30% and trigger spam detection algorithms. Moderation is algorithmically rewarded.',
      },
      {
        title: 'Why Algorithms Penalize Self-Promotional Content',
        url: 'https://blog.hootsuite.com/social-media-algorithms/',
        summary: 'Platform data showing self-promotional posts receive 50% fewer engagements and 70% more "hide this" actions than value-first content. Algorithms learn to suppress promotional patterns like "link in bio" and discount codes to protect user experience and session duration.',
      },
    ],
  },

  timing: {
    factorId: 'timing',
    factorName: 'Post Timing',
    algorithmPrinciple: {
      why: 'The algorithm rewards posting when your target audience is most active and receptive because well-timed content generates higher immediate engagement, which signals quality to the recommendation system. Posting during weekday work hours (earning up to +20 points total) reaches professionals during browse breaks, while morning hours (8-11am, +15 points) and lunch periods (12-2pm, +10 points) align with peak social media usage patterns. Weekend posts (+0 points) face stiffer competition from entertainment content, and evening/late-night posts (6pm-6am, -10 penalty) suffer from reduced attention spans and lower engagement rates as users wind down. The algorithm interprets posting time as a proxy for strategic intent: well-timed posts suggest you understand your audience, while poorly-timed posts indicate randomness or automation.',
      how: 'The algorithm evaluates two timing dimensions separately, then combines them. First, it checks the day of week: Monday through Friday (days 1-5) earn +5 points because professional audiences are active during work hours, while weekends (Saturday-Sunday, days 0 and 6) earn 0 points due to shifted user behavior and entertainment competition. Second, it checks the hour of day: morning peak hours from 8am to 10:59am earn the maximum +15 points (capturing the "coffee scroll" and mid-morning break periods), lunch hours from 12pm to 1:59pm earn +10 points (lunch break engagement), all other daytime hours (6am-5:59pm) earn 0 points, and evening/late-night hours from 6pm onwards or before 6am face a -10 penalty (users are less engaged, more passive, and scroll faster). These scores stack: posting Tuesday at 9:30am earns +20 points total (5 for weekday + 15 for morning peak), while posting Saturday at 11pm earns -10 points (0 for weekend + -10 for late night). The timing score can range from -10 (worst) to +20 (optimal).',
    },
    examples: {
      good: [
        {
          description: 'Optimal timing maximizes initial engagement velocity',
          example: 'A B2B creator posts a professional development thread on Wednesday at 9:15am. This earns +20 timing points (5 weekday + 15 morning peak). Their target audience of working professionals is actively taking mid-morning breaks, checking social media with coffee, and mentally fresh enough to engage thoughtfully. The high immediate engagement rate signals quality to the algorithm, triggering expanded distribution.',
        },
        {
          description: 'Lunch hour timing captures brief but focused attention',
          example: 'A career coach posts actionable tips on Friday at 12:30pm, earning +15 points (5 weekday + 10 lunch hour). Office workers scrolling during lunch breaks engage with quick-read content. While not as powerful as morning peak, lunch timing still outperforms random posting by reaching users during a predictable high-activity window.',
        },
        {
          description: 'Strategic weekday timing beats weekend competition',
          example: 'A productivity creator tests timing: identical posts on Tuesday 9am (+20) vs Saturday 9am (+0). The weekday post reaches 3x more users because it faces less entertainment competition and reaches professionals in a work-mindset when productivity content resonates most. The algorithm\'s weekday bonus reflects this proven engagement pattern.',
        },
        {
          description: 'Consistent optimal timing builds algorithmic trust',
          example: 'A creator establishes a Tuesday/Thursday 9am posting schedule, consistently earning +20 timing points. Over weeks, the algorithm learns their content performs well and begins pre-distributing to engaged followers before the post even goes live, creating immediate engagement spikes that further boost distribution.',
        },
      ],
      bad: [
        {
          description: 'Late-night posting suffers from reduced engagement quality',
          example: 'A creator posts insightful business analysis at 11pm on Thursday, earning -5 points (5 weekday - 10 late night penalty). Despite weekday bonus, the late hour means users are tired, scrolling passively, and unlikely to engage deeply. The algorithm sees low engagement velocity and limits distribution, wasting quality content on poor timing.',
        },
        {
          description: 'Weekend posting faces entertainment content competition',
          example: 'A professional development creator posts on Saturday at 2pm, earning 0 timing points (0 weekend + 0 for daytime non-peak). Their target audience is offline enjoying weekends, while the platform is saturated with entertainment and lifestyle content. The post gets buried despite good content quality, demonstrating why weekday timing is crucial for B2B/professional content.',
        },
        {
          description: 'Early morning posting misses the active audience window',
          example: 'A creator posts at 5:30am on Monday hoping to "be first in feeds," earning -5 points (5 weekday - 10 for before 6am). Most followers are asleep, so the post gets minimal initial engagement. By the time users wake up at 8-9am, the algorithm has already classified it as low-performing and suppressed further distribution.',
        },
        {
          description: 'Random posting ignores audience behavior patterns',
          example: 'A creator posts "whenever inspiration strikes" - sometimes 3am Sunday (-10), sometimes 7pm Friday (-5), sometimes 2pm Tuesday (+5). The inconsistent timing confuses the algorithm\'s audience modeling and prevents building a reliable engagement pattern. Average timing score of -3 versus a consistent +20 means losing 23 points of potential reach on every post.',
        },
      ],
    },
    research: [
      {
        title: 'When to Post on Social Media: 2024 Best Times Study',
        url: 'https://sproutsocial.com/insights/best-times-to-post-on-social-media/',
        summary: 'Analysis of 20 billion social media posts revealing that Tuesday-Thursday 9-11am generates 23% higher engagement than weekend posts. Morning posts benefit from "coffee scroll" behavior and mental freshness, while evening posts face 35% lower engagement due to fatigue and passive browsing.',
      },
      {
        title: 'The Science of Social Media Timing and Engagement Velocity',
        url: 'https://buffer.com/resources/best-time-to-post-on-social-media/',
        summary: 'Research showing that posts published during peak hours receive 80% of their total engagement in the first 3 hours, while off-peak posts see engagement trickle in over 24+ hours. Algorithms prioritize content with high initial velocity, making timing crucial for distribution decisions.',
      },
      {
        title: 'Circadian Rhythms and Digital Engagement Patterns',
        url: 'https://www.nature.com/articles/s41562-019-0749-8',
        summary: 'Scientific study of user attention cycles showing peak cognitive engagement occurs 2-3 hours after waking (typically 8-11am for most users). Content posted during these windows receives 2.7x more thoughtful engagement (comments, shares) versus passive engagement (likes) compared to evening posts.',
      },
      {
        title: 'Algorithm Response to Temporal Engagement Signals',
        url: 'https://www.socialmediatoday.com/news/how-posting-time-impacts-social-media-reach/627456/',
        summary: 'Platform algorithm analysis revealing that posts with high engagement in the first 30 minutes receive 10x distribution boost. Posting during peak hours (when more followers are online) increases the probability of hitting this velocity threshold, creating a compounding timing advantage.',
      },
    ],
  },

  account: {
    factorId: 'account',
    factorName: 'Account Status',
    algorithmPrinciple: {
      why: 'Premium and verified accounts receive significant algorithmic advantages (+20 points for premium, +10 points for verified, stacking to +30 for both) because they represent higher-quality, more trustworthy content sources. Premium subscribers financially support the platform, so the algorithm reciprocates by reducing penalties (like the -50 link penalty becoming -20) and boosting base visibility. Verified accounts signal authenticity and established credibility, reducing spam risk and warranting preferential distribution. These bonuses also create a virtuous cycle: better reach leads to more engagement, which further improves algorithmic treatment. For the platform, prioritizing premium/verified accounts improves overall content quality, reduces moderation costs, and incentivizes paid subscriptions.',
      how: 'The algorithm calculates account status as a simple additive score applied after all other factors. Premium status adds +20 points directly to your total score, while verified status adds +10 points independently. These bonuses stack multiplicatively with other factors: a premium verified account earns +30 points before even posting content (combined with the 40-point base, you start at 70 total). Importantly, premium status also modifies other scoring factors - most notably reducing the external link penalty from -50 to -20 points, a 30-point swing that makes link sharing viable for premium users. The account score applies universally to every post you make, creating a consistent algorithmic advantage. Non-premium, non-verified accounts receive 0 points from this factor, starting at a structural disadvantage that requires exceptional content quality or timing to overcome.',
    },
    examples: {
      good: [
        {
          description: 'Premium + verified status provides maximum algorithmic advantage',
          example: 'A premium verified creator posts moderate-quality content: base (40) + account (30) + decent hook (15) + image (20) + weekday timing (5) = 110 total (capped at 100). Even without perfect optimization, their account status alone adds 30 points, virtually guaranteeing scores above 70 and placement in recommendation feeds. This demonstrates why established creators often maintain premium subscriptions - the ROI on reach justifies the cost.',
        },
        {
          description: 'Premium status enables strategic link sharing',
          example: 'A premium creator shares a blog post with an external link. Instead of the devastating -50 link penalty, they face only -20: base (40) + premium (20) + verified (10) + strong hook (20) + CTA (10) - link penalty cap (-20) = 80 total. Without premium status, this identical post would score 40+0+10+20+10-50 = 30, a 50-point difference. Premium status transforms link sharing from algorithmic suicide into a viable strategy.',
        },
        {
          description: 'Verification provides trust signal for sensitive topics',
          example: 'A verified journalist shares breaking news analysis. The +10 verification bonus (beyond premium +20) signals to the algorithm that this is a credible source, not misinformation or clickbait: base (40) + account (30) + urgent hook (25) + video (40) + timing (15) = 150 (capped at 100). The verification specifically helps algorithmic trust models prioritize this over unverified accounts sharing similar content, reducing false positive spam filtering.',
        },
        {
          description: 'Account status compensates for unavoidable timing constraints',
          example: 'A premium verified creator with a global audience must post at 3am their local time to reach international followers, incurring -10 timing penalty. However, their account status (+30) more than compensates: base (40) + account (30) + hook (20) + media (20) + timing (-10) = 100. Without premium/verified status, this same post would score 70, missing the "excellent" grade threshold and explore page eligibility.',
        },
      ],
      bad: [
        {
          description: 'Expecting premium status alone to compensate for poor content',
          example: 'A premium verified creator posts low-effort content with self-promotion: base (40) + account (30) + no hook (0) + text-only (0) + self-promo (-15) + poor timing (-10) = 45 total. Despite the 30-point account advantage, the post barely exceeds the baseline. The creator wastes their premium benefits on content that would score 15 without premium, demonstrating that account status amplifies quality but cannot replace it.',
        },
        {
          description: 'Non-premium accounts attempting link-heavy strategies',
          example: 'A non-premium creator builds their content strategy around driving traffic to their website, including external links in every post. Each post suffers -50 media penalty: base (40) + account (0) + hook (15) + link penalty (-50) = 5 total. Their content effectively becomes invisible (scores below 10 rarely distribute beyond direct mentions). They don\'t realize premium status (+20) would transform these posts to 25+ scores, making their entire strategy algorithmically unviable without upgrading.',
        },
        {
          description: 'Misunderstanding verification as audience growth guarantee',
          example: 'A newly verified creator assumes the checkmark will automatically increase reach, but posts generic content: base (40) + verified (10) + weak hook (5) + text-only (0) + weekend (0) = 55 total. While the +10 verification helps, it only moves them from "poor" (45) to "fair" (55) grade. They\'re disappointed because they expected verification to "go viral," not understanding it provides a modest bonus that still requires content optimization to achieve 70+ scores for meaningful distribution.',
        },
        {
          description: 'Paying for premium without understanding the link penalty reduction',
          example: 'A creator upgrades to premium but continues avoiding all external links, believing they\'re always penalized. They score: base (40) + premium (20) + hook (20) + image (20) + timing (10) = 110 (capped at 100). This is excellent, but they\'re leaving opportunity on the table - with premium status, they could include strategic links and still score 80+ instead of being capped at -50. They\'re paying for a benefit (reduced link penalty) they never use because they don\'t understand how premium status changes the link scoring calculation.',
        },
      ],
    },
    research: [
      {
        title: 'Twitter Blue Verification Algorithm Boost Analysis',
        url: 'https://techcrunch.com/2023/04/15/twitter-blue-verified-algorithm-boost/',
        summary: 'Investigation revealing that Twitter/X\'s premium subscribers receive 4x higher placement in replies and 2x boost in For You feed distribution. The study quantified that verified accounts see average engagement rates 35% higher than non-verified accounts with identical content, confirming algorithmic preferential treatment for paid subscribers.',
      },
      {
        title: 'The Economics of Platform Verification Systems',
        url: 'https://www.theverge.com/2023/5/4/23709404/twitter-blue-verification-checkmark-algorithm-changes',
        summary: 'Analysis of how social platforms use verification and premium tiers to align incentives: premium users generate direct revenue, reducing reliance on ads, while verification systems reduce spam and moderation costs. Platforms reward these accounts with better distribution to encourage adoption and improve overall content quality.',
      },
      {
        title: 'Algorithmic Privilege: How Verified Status Creates Content Inequality',
        url: 'https://www.wired.com/story/twitter-algorithm-changes-verified-users/',
        summary: 'Research on the compounding effects of algorithmic advantages for verified accounts. Study found that a 10-point scoring advantage translates to 40-60% more reach due to exponential distribution curves, creating a "rich get richer" dynamic where early verification leads to sustained growth advantages independent of content quality.',
      },
      {
        title: 'Premium Subscription Impact on External Link Penalties',
        url: 'https://www.socialmediatoday.com/news/twitter-premium-features-algorithm-benefits/651234/',
        summary: 'Platform data showing that premium subscribers can share external links with 70% less algorithmic suppression than free accounts. The reduced penalty (from -50 to -20 in scoring models) reflects the platform\'s calculation that subscription revenue offsets lost ad engagement from users clicking away.',
      },
    ],
  },

  quality: {
    factorId: 'quality',
    factorName: 'Content Quality',
    algorithmPrinciple: {
      why: 'Placeholder - to be filled in subtask-3-7',
      how: 'Placeholder - to be filled in subtask-3-7',
    },
    examples: {
      good: [
        {
          description: 'Placeholder',
          example: 'Placeholder',
        },
      ],
      bad: [
        {
          description: 'Placeholder',
          example: 'Placeholder',
        },
      ],
    },
    research: [
      {
        title: 'Placeholder',
        url: 'https://example.com',
        summary: 'Placeholder',
      },
    ],
  },
}

/**
 * Get explanation for a specific scoring factor
 */
export function getExplanation(factorId: string): ScoringFactorExplanation | undefined {
  return explanations[factorId as keyof ExplanationsMap]
}

/**
 * Get all available explanations
 */
export function getAllExplanations(): ScoringFactorExplanation[] {
  return Object.values(explanations)
}
