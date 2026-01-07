import { useState, useEffect } from 'react'
import { useSetCellCallback } from 'tinybase/ui-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import type { Template } from '@/lib/templates'
import { fillTemplate, categoryLabels } from '@/lib/templates'

interface TemplateEditorProps {
  template: Template
  onClose: () => void
}

export function TemplateEditor({ template, onClose }: TemplateEditorProps) {
  const [values, setValues] = useState<Record<string, string>>({})
  const [preview, setPreview] = useState('')

  const setText = useSetCellCallback(
    'currentTweet',
    'draft',
    'text',
    (newText: string) => newText,
    []
  )

  useEffect(() => {
    setPreview(fillTemplate(template, values))
  }, [template, values])

  const handleValueChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))
  }

  const handleApply = () => {
    setText(preview)
    onClose()
  }

  const isComplete = template.placeholders.every(
    (p) => values[p.key] && values[p.key].trim().length > 0
  )

  return (
    <Card className="raycast-shine">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base">{template.name}</CardTitle>
            <Badge variant="secondary">{categoryLabels[template.category]}</Badge>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Fill in the blanks</h4>
            {template.placeholders.map((placeholder) => (
              <div key={placeholder.key} className="space-y-1">
                <label className="text-xs text-muted-foreground">
                  {placeholder.hint}
                </label>
                <Input
                  placeholder={placeholder.hint}
                  value={values[placeholder.key] || ''}
                  onChange={(e) => handleValueChange(placeholder.key, e.target.value)}
                  className="bg-background"
                />
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium">Preview</h4>
            <Textarea
              value={preview}
              readOnly
              className="min-h-[200px] bg-card font-mono text-sm resize-none"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {preview.length}/280 characters
              </span>
              <span className="text-xs text-primary">
                Expected: {template.expectedScore[0]}-{template.expectedScore[1]} points
              </span>
            </div>
          </div>
        </div>

        {template.example && (
          <div className="pt-3 border-t border-border">
            <h4 className="text-sm font-medium mb-2">Example</h4>
            <p className="text-xs text-muted-foreground font-mono whitespace-pre-wrap bg-card p-3 rounded-md">
              {template.example}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleApply} disabled={!isComplete}>
            Apply to Composer
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
