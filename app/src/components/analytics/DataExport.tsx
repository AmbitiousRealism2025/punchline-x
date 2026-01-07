import { useCallback } from 'react'
import { useTable } from 'tinybase/ui-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function DataExport() {
  const tweetLog = useTable('tweetLog')

  const tweets = Object.entries(tweetLog).map(([id, row]) => ({
    id,
    text: row.text as string,
    score: row.score as number,
    mediaType: row.mediaType as string,
    hasLink: row.hasLink as boolean,
    copiedAt: row.copiedAt as number,
    copiedAtDate: new Date(row.copiedAt as number).toISOString(),
  }))

  const exportJSON = useCallback(() => {
    const data = JSON.stringify(tweets, null, 2)
    downloadFile(data, 'tweet-history.json', 'application/json')
  }, [tweets])

  const exportCSV = useCallback(() => {
    const headers = ['id', 'text', 'score', 'mediaType', 'hasLink', 'copiedAt', 'copiedAtDate']
    const csvRows = [
      headers.join(','),
      ...tweets.map((tweet) =>
        headers
          .map((header) => {
            const value = tweet[header as keyof typeof tweet]
            if (typeof value === 'string') {
              return `"${value.replace(/"/g, '""')}"`
            }
            return value
          })
          .join(',')
      ),
    ]
    const csv = csvRows.join('\n')
    downloadFile(csv, 'tweet-history.csv', 'text/csv')
  }, [tweets])

  return (
    <Card className="raycast-shine">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Export Data</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          Download your tweet history for backup or analysis.
        </p>
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={exportJSON}
            disabled={tweets.length === 0}
            className="flex-1"
          >
            Export JSON
          </Button>
          <Button
            variant="secondary"
            onClick={exportCSV}
            disabled={tweets.length === 0}
            className="flex-1"
          >
            Export CSV
          </Button>
        </div>
        {tweets.length === 0 && (
          <p className="text-xs text-muted-foreground text-center mt-3">
            No tweets to export yet.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

function downloadFile(content: string, filename: string, type: string) {
  const blob = new Blob([content], { type })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
