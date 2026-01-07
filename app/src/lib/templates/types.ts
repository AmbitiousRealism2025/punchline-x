export type TemplateCategory =
  | 'contrarian'
  | 'list'
  | 'story'
  | 'thread'
  | 'poll'
  | 'value'
  | 'question'
  | 'milestone'
  | 'teaching'
  | 'predictions'
  | 'case-study'
  | 'before-after'
  | 'lessons-learned'
  | 'tool-review'
  | 'comparison'
  | 'unpopular-opinion'

export type MediaType = 'image' | 'video' | 'poll' | 'none'

export interface Placeholder {
  key: string
  hint: string
}

export interface Template {
  id: string
  name: string
  category: TemplateCategory
  template: string
  placeholders: Placeholder[]
  expectedScore: [number, number]
  bestWith: MediaType[]
  example?: string
}

export interface FilledTemplate {
  templateId: string
  values: Record<string, string>
  generatedText: string
}
