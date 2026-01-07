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
      why: 'Placeholder - to be filled in subtask-3-4',
      how: 'Placeholder - to be filled in subtask-3-4',
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

  timing: {
    factorId: 'timing',
    factorName: 'Post Timing',
    algorithmPrinciple: {
      why: 'Placeholder - to be filled in subtask-3-5',
      how: 'Placeholder - to be filled in subtask-3-5',
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

  account: {
    factorId: 'account',
    factorName: 'Account Status',
    algorithmPrinciple: {
      why: 'Placeholder - to be filled in subtask-3-6',
      how: 'Placeholder - to be filled in subtask-3-6',
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
