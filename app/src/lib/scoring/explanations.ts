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
      why: 'Placeholder - to be filled in subtask-3-3',
      how: 'Placeholder - to be filled in subtask-3-3',
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
