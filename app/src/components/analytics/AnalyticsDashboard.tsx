import { useMemo } from 'react'
import { useTable } from 'tinybase/ui-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
}

function StatCard({ title, value, subtitle }: StatCardProps) {
  return (
    <Card className="raycast-shine">
      <CardContent className="pt-6">
        <div className="text-center">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-3xl font-bold text-primary mt-1">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  )
}

export function AnalyticsDashboard() {
  const tweetLog = useTable('tweetLog')

  const stats = useMemo(() => {
    const tweets = Object.values(tweetLog).map((row) => ({
      score: row.score as number,
      copiedAt: row.copiedAt as number,
      text: row.text as string,
    }))

    if (tweets.length === 0) {
      return {
        totalTweets: 0,
        avgScore: 0,
        bestScore: 0,
        excellentCount: 0,
        thisWeek: 0,
      }
    }

    const scores = tweets.map((t) => t.score)
    const avgScore = Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    const bestScore = Math.max(...scores)
    const excellentCount = scores.filter((s) => s >= 80).length

    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000
    const thisWeek = tweets.filter((t) => t.copiedAt > weekAgo).length

    return {
      totalTweets: tweets.length,
      avgScore,
      bestScore,
      excellentCount,
      thisWeek,
    }
  }, [tweetLog])

  const scoreDistribution = useMemo(() => {
    const tweets = Object.values(tweetLog).map((row) => row.score as number)
    const excellent = tweets.filter((s) => s >= 80).length
    const good = tweets.filter((s) => s >= 60 && s < 80).length
    const fair = tweets.filter((s) => s >= 40 && s < 60).length
    const needsWork = tweets.filter((s) => s < 40).length

    return { excellent, good, fair, needsWork }
  }, [tweetLog])

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard title="Total Tweets" value={stats.totalTweets} subtitle="All time" />
        <StatCard title="Avg Score" value={stats.avgScore} subtitle="Higher is better" />
        <StatCard title="Best Score" value={stats.bestScore} subtitle="Personal best" />
        <StatCard title="This Week" value={stats.thisWeek} subtitle="Tweets copied" />
      </div>

      <Card className="raycast-shine">
        <CardHeader className="pb-3">
          <CardTitle className="text-base">Score Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          {stats.totalTweets === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No data yet. Start composing tweets to see your stats.
            </p>
          ) : (
            <div className="space-y-3">
              <ScoreBar
                label="Excellent (80+)"
                count={scoreDistribution.excellent}
                total={stats.totalTweets}
                color="bg-green-500"
              />
              <ScoreBar
                label="Good (60-79)"
                count={scoreDistribution.good}
                total={stats.totalTweets}
                color="bg-primary"
              />
              <ScoreBar
                label="Fair (40-59)"
                count={scoreDistribution.fair}
                total={stats.totalTweets}
                color="bg-yellow-500"
              />
              <ScoreBar
                label="Needs Work (<40)"
                count={scoreDistribution.needsWork}
                total={stats.totalTweets}
                color="bg-destructive"
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

interface ScoreBarProps {
  label: string
  count: number
  total: number
  color: string
}

function ScoreBar({ label, count, total, color }: ScoreBarProps) {
  const percentage = total > 0 ? (count / total) * 100 : 0

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="text-muted-foreground">
          {count} ({Math.round(percentage)}%)
        </span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${color} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
