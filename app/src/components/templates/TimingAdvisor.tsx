import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface TimeSlot {
  hour: number
  label: string
  score: 'peak' | 'good' | 'okay' | 'avoid'
  audience: string
}

const timeSlots: TimeSlot[] = [
  { hour: 6, label: '6am', score: 'okay', audience: 'Early risers, East Coast' },
  { hour: 7, label: '7am', score: 'good', audience: 'Morning commuters' },
  { hour: 8, label: '8am', score: 'peak', audience: 'Work start, high engagement' },
  { hour: 9, label: '9am', score: 'peak', audience: 'Peak morning attention' },
  { hour: 10, label: '10am', score: 'peak', audience: 'Morning sweet spot' },
  { hour: 11, label: '11am', score: 'good', audience: 'Pre-lunch browsing' },
  { hour: 12, label: '12pm', score: 'good', audience: 'Lunch break scrolling' },
  { hour: 13, label: '1pm', score: 'okay', audience: 'Post-lunch dip' },
  { hour: 14, label: '2pm', score: 'okay', audience: 'Afternoon slump' },
  { hour: 15, label: '3pm', score: 'okay', audience: 'Mid-afternoon' },
  { hour: 16, label: '4pm', score: 'good', audience: 'End of workday' },
  { hour: 17, label: '5pm', score: 'good', audience: 'Commute home' },
  { hour: 18, label: '6pm', score: 'okay', audience: 'Dinner time' },
  { hour: 19, label: '7pm', score: 'good', audience: 'Evening leisure' },
  { hour: 20, label: '8pm', score: 'good', audience: 'Prime evening' },
  { hour: 21, label: '9pm', score: 'okay', audience: 'Late evening' },
]

const scoreColors: Record<TimeSlot['score'], string> = {
  peak: 'bg-primary text-primary-foreground',
  good: 'bg-primary/60 text-primary-foreground',
  okay: 'bg-muted text-muted-foreground',
  avoid: 'bg-destructive/20 text-destructive',
}

const scoreBadgeVariants: Record<TimeSlot['score'], 'default' | 'secondary' | 'outline'> = {
  peak: 'default',
  good: 'secondary',
  okay: 'outline',
  avoid: 'outline',
}

function getCurrentTimeSlot(): TimeSlot | undefined {
  const hour = new Date().getHours()
  return timeSlots.find((slot) => slot.hour === hour)
}

export function TimingAdvisor() {
  const currentSlot = getCurrentTimeSlot()
  const currentHour = new Date().getHours()

  return (
    <Card className="raycast-shine">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Best Times to Post (PST)</CardTitle>
          {currentSlot && (
            <Badge variant={scoreBadgeVariants[currentSlot.score]}>
              Now: {currentSlot.score === 'peak' ? 'Peak' : currentSlot.score}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-0.5 h-8 rounded overflow-hidden">
            {timeSlots.map((slot) => (
              <div
                key={slot.hour}
                className={`flex-1 relative ${scoreColors[slot.score]} ${
                  slot.hour === currentHour ? 'ring-2 ring-ring ring-offset-1 ring-offset-background z-10' : ''
                }`}
                title={`${slot.label} - ${slot.score}: ${slot.audience}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded ${scoreColors.peak}`} />
              <span>Peak (8-10am)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded ${scoreColors.good}`} />
              <span>Good</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded ${scoreColors.okay}`} />
              <span>Okay</span>
            </div>
          </div>

          {currentSlot && (
            <div className="pt-2 border-t border-border">
              <p className="text-sm">
                <span className="font-medium">Right now ({currentSlot.label} PST):</span>{' '}
                <span className="text-muted-foreground">{currentSlot.audience}</span>
              </p>
              {currentSlot.score === 'peak' ? (
                <p className="text-xs text-primary mt-1">
                  This is peak engagement time. Post now for maximum visibility.
                </p>
              ) : currentSlot.score === 'good' ? (
                <p className="text-xs text-muted-foreground mt-1">
                  Good time to post. Solid engagement expected.
                </p>
              ) : (
                <p className="text-xs text-muted-foreground mt-1">
                  Consider scheduling for 8-10am PST for peak engagement.
                </p>
              )}
            </div>
          )}

          <div className="pt-2 border-t border-border space-y-1">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium">Pro tips:</span>
            </p>
            <ul className="text-xs text-muted-foreground list-disc list-inside space-y-0.5">
              <li>First 30 mins are critical for algorithm pickup</li>
              <li>Tuesday-Thursday typically outperform weekends</li>
              <li>Avoid posting during major news events</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
