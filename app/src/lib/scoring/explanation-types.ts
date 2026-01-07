export interface AlgorithmPrinciple {
  why: string
  how: string
}

export interface Example {
  description: string
  example: string
}

export interface ExampleSet {
  good: Example[]
  bad: Example[]
}

export interface ResearchLink {
  title: string
  url: string
  summary: string
}

export interface ScoringFactorExplanation {
  factorId: string
  factorName: string
  algorithmPrinciple: AlgorithmPrinciple
  examples: ExampleSet
  research: ResearchLink[]
}

export type FactorId = 'base' | 'media' | 'hook' | 'engagement' | 'timing' | 'account' | 'quality'

export type ExplanationsMap = Record<FactorId, ScoringFactorExplanation>
