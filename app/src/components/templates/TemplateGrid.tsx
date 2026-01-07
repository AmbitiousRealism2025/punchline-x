import { useState } from 'react'
import { templates, categoryLabels, type Template, type TemplateCategory } from '@/lib/templates'
import { TemplateCard } from './TemplateCard'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

interface TemplateGridProps {
  onSelectTemplate: (template: Template) => void
}

const categories: (TemplateCategory | 'all')[] = [
  'all',
  'contrarian',
  'list',
  'story',
  'thread',
  'poll',
  'value',
  'question',
  'teaching',
]

export function TemplateGrid({ onSelectTemplate }: TemplateGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const filteredTemplates =
    selectedCategory === 'all'
      ? templates
      : templates.filter((t) => t.category === selectedCategory)

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto pb-2">
        <ToggleGroup
          type="single"
          value={selectedCategory}
          onValueChange={(value) => value && setSelectedCategory(value)}
          className="justify-start"
        >
          {categories.map((cat) => (
            <ToggleGroupItem
              key={cat}
              value={cat}
              className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground whitespace-nowrap"
            >
              {cat === 'all' ? 'All' : categoryLabels[cat]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            onSelect={onSelectTemplate}
          />
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <p className="text-center text-muted-foreground py-8">
          No templates in this category yet.
        </p>
      )}
    </div>
  )
}
