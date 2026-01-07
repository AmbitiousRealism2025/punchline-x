import { useCell, useSetCellCallback } from 'tinybase/ui-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Toggle } from '@/components/ui/toggle'
import type { MediaType } from '@/lib/scoring'

const mediaOptions: { value: MediaType; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'image', label: 'Image' },
  { value: 'video', label: 'Video' },
  { value: 'gif', label: 'GIF' },
  { value: 'poll', label: 'Poll' },
]

export function MediaToggles() {
  const mediaType = (useCell('currentTweet', 'draft', 'mediaType') as MediaType) ?? 'none'
  const hasLink = (useCell('currentTweet', 'draft', 'hasLink') as boolean) ?? false
  const isPremium = (useCell('settings', 'user', 'isPremium') as boolean) ?? false

  const setMediaType = useSetCellCallback(
    'currentTweet',
    'draft',
    'mediaType',
    (value: MediaType) => value,
    []
  )

  const setHasLink = useSetCellCallback(
    'currentTweet',
    'draft',
    'hasLink',
    (value: boolean) => value,
    []
  )

  const setIsPremium = useSetCellCallback(
    'settings',
    'user',
    'isPremium',
    (value: boolean) => value,
    []
  )

  return (
    <Card className="raycast-shine">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Options</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <span className="text-sm text-muted-foreground">Media Type</span>
          <ToggleGroup
            type="single"
            value={mediaType}
            onValueChange={(value) => value && setMediaType(value as MediaType)}
            spacing={8}
            className="justify-start flex-wrap"
          >
            {mediaOptions.map((option) => (
              <ToggleGroupItem
                key={option.value}
                value={option.value}
                className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground min-w-[44px] min-h-[44px]"
              >
                {option.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="flex flex-wrap gap-3">
          <Toggle
            pressed={hasLink}
            onPressedChange={setHasLink}
            className="data-[state=on]:bg-destructive/20 data-[state=on]:text-destructive min-w-[44px] min-h-[44px]"
          >
            Has Link
          </Toggle>
          <Toggle
            pressed={isPremium}
            onPressedChange={setIsPremium}
            className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground min-w-[44px] min-h-[44px]"
          >
            Premium
          </Toggle>
        </div>
      </CardContent>
    </Card>
  )
}
