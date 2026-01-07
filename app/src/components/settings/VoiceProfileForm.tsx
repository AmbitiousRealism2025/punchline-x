import { useState } from 'react'
import { useCell, useSetCellCallback } from 'tinybase/ui-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import type { VoiceProfile } from '@/lib/store'
import { addExampleTweet, getExampleTweets, deleteExampleTweet } from '@/lib/store'

const toneLabels: Record<VoiceProfile['tone'], string> = {
  1: 'Very Formal',
  2: 'Formal',
  3: 'Neutral',
  4: 'Casual',
  5: 'Very Casual',
}

const formalityOptions: { value: VoiceProfile['formality']; label: string }[] = [
  { value: 'formal', label: 'Formal' },
  { value: 'neutral', label: 'Neutral' },
  { value: 'casual', label: 'Casual' },
]

const humorOptions: { value: VoiceProfile['humorLevel']; label: string }[] = [
  { value: 'none', label: 'None' },
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
]

const emojiOptions: { value: VoiceProfile['emojiUsage']; label: string }[] = [
  { value: 'never', label: 'Never' },
  { value: 'rarely', label: 'Rarely' },
  { value: 'often', label: 'Often' },
  { value: 'always', label: 'Always' },
]

export function VoiceProfileForm() {
  const tone = (useCell('voiceProfile', 'user', 'tone') as VoiceProfile['tone']) ?? 3
  const formality = (useCell('voiceProfile', 'user', 'formality') as VoiceProfile['formality']) ?? 'neutral'
  const humorLevel = (useCell('voiceProfile', 'user', 'humorLevel') as VoiceProfile['humorLevel']) ?? 'medium'
  const emojiUsage = (useCell('voiceProfile', 'user', 'emojiUsage') as VoiceProfile['emojiUsage']) ?? 'rarely'
  const topicPreferences = (useCell('voiceProfile', 'user', 'topicPreferences') as string[] | undefined) ?? []

  const [newExampleTweet, setNewExampleTweet] = useState('')
  const [exampleTweets, setExampleTweets] = useState(getExampleTweets())
  const [topicsInput, setTopicsInput] = useState(topicPreferences.join(', '))

  const setTone = useSetCellCallback(
    'voiceProfile',
    'user',
    'tone',
    (value: VoiceProfile['tone']) => value,
    []
  )

  const setFormality = useSetCellCallback(
    'voiceProfile',
    'user',
    'formality',
    (value: VoiceProfile['formality']) => value,
    []
  )

  const setHumorLevel = useSetCellCallback(
    'voiceProfile',
    'user',
    'humorLevel',
    (value: VoiceProfile['humorLevel']) => value,
    []
  )

  const setEmojiUsage = useSetCellCallback(
    'voiceProfile',
    'user',
    'emojiUsage',
    (value: VoiceProfile['emojiUsage']) => value,
    []
  )

  const setTopicPreferences = useSetCellCallback(
    'voiceProfile',
    'user',
    'topicPreferences',
    (value: string[]) => value,
    []
  )

  const handleToneChange = (value: number[]) => {
    setTone(value[0] as VoiceProfile['tone'])
  }

  const handleTopicsBlur = () => {
    const topics = topicsInput
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0)
    setTopicPreferences(topics)
  }

  const handleAddExampleTweet = () => {
    if (!newExampleTweet.trim()) return

    addExampleTweet(newExampleTweet.trim())
    setExampleTweets(getExampleTweets())
    setNewExampleTweet('')
  }

  const handleDeleteExampleTweet = (id: string) => {
    deleteExampleTweet(id)
    setExampleTweets(getExampleTweets())
  }

  return (
    <div className="space-y-4">
      <Card className="raycast-shine">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Voice Profile</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Tone Slider */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Tone</span>
              <span className="text-sm font-medium">{toneLabels[tone]}</span>
            </div>
            <Slider
              min={1}
              max={5}
              step={1}
              value={[tone]}
              onValueChange={handleToneChange}
              className="w-full"
            />
          </div>

          {/* Formality Toggle */}
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Formality</span>
            <ToggleGroup
              type="single"
              value={formality}
              onValueChange={(value) => value && setFormality(value as VoiceProfile['formality'])}
              className="justify-start flex-wrap"
            >
              {formalityOptions.map((option) => (
                <ToggleGroupItem
                  key={option.value}
                  value={option.value}
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Humor Level Toggle */}
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Humor Level</span>
            <ToggleGroup
              type="single"
              value={humorLevel}
              onValueChange={(value) => value && setHumorLevel(value as VoiceProfile['humorLevel'])}
              className="justify-start flex-wrap"
            >
              {humorOptions.map((option) => (
                <ToggleGroupItem
                  key={option.value}
                  value={option.value}
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Emoji Usage Toggle */}
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Emoji Usage</span>
            <ToggleGroup
              type="single"
              value={emojiUsage}
              onValueChange={(value) => value && setEmojiUsage(value as VoiceProfile['emojiUsage'])}
              className="justify-start flex-wrap"
            >
              {emojiOptions.map((option) => (
                <ToggleGroupItem
                  key={option.value}
                  value={option.value}
                  className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
                >
                  {option.label}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Topic Preferences */}
          <div className="space-y-2">
            <span className="text-sm text-muted-foreground">Topic Preferences</span>
            <Input
              placeholder="ai, productivity, tech (comma-separated)"
              value={topicsInput}
              onChange={(e) => setTopicsInput(e.target.value)}
              onBlur={handleTopicsBlur}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="raycast-shine">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Example Tweets</CardTitle>
          <p className="text-xs text-muted-foreground mt-1">
            Add 2-3 examples of your authentic voice to help AI match your style
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Existing Example Tweets */}
          {exampleTweets.length > 0 && (
            <div className="space-y-2">
              {exampleTweets.map((tweet) => (
                <div
                  key={tweet.id}
                  className="p-3 rounded-lg bg-card border border-border group relative"
                >
                  <p className="text-sm text-foreground pr-8">{tweet.text}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteExampleTweet(tweet.id)}
                    className="absolute top-2 right-2 h-6 px-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Add New Example Tweet */}
          <div className="space-y-2">
            <Textarea
              placeholder="Write an example tweet that represents your voice..."
              value={newExampleTweet}
              onChange={(e) => setNewExampleTweet(e.target.value)}
              className="min-h-24"
            />
            <Button
              onClick={handleAddExampleTweet}
              disabled={!newExampleTweet.trim() || exampleTweets.length >= 3}
              className="w-full"
            >
              {exampleTweets.length >= 3 ? 'Maximum 3 examples' : 'Add Example Tweet'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
