import { useState } from 'react'
import { Provider } from 'tinybase/ui-react'
import { store } from '@/lib/store'
import { Shell } from '@/components/layout/Shell'
import {
  TweetInput,
  ScoreDisplay,
  ScoreBreakdown,
  MediaToggles,
  SuggestionList,
} from '@/components/scorer'
import { HookGenerator } from '@/components/ai/HookGenerator'
import { AlternativesList } from '@/components/ai/AlternativesList'
import { useRewriteTweet } from '@/hooks/useRewriteTweet'
import type { Alternative } from '@/lib/store'
import { TemplateGrid, TemplateEditor, TimingAdvisor } from '@/components/templates'
import { AnalyticsDashboard, TweetHistory, DataExport } from '@/components/analytics'
import { CommandPalette } from '@/components/CommandPalette'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import type { Template } from '@/lib/templates'

function App() {
  const [activeTab, setActiveTab] = useState('compose')
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [alternatives, setAlternatives] = useState<Alternative[]>([])
  const { rewrite, isLoading, error } = useRewriteTweet()

  const handleSelectTemplate = (template: Template) => {
    setSelectedTemplate(template)
  }

  const handleCloseEditor = () => {
    setSelectedTemplate(null)
  }

  const handleRewrite = async () => {
    try {
      const result = await rewrite()
      setAlternatives(result.alternatives)
    } catch (err) {
      setAlternatives([])
    }
  }

  const handleRetry = () => {
    handleRewrite()
  }

  return (
    <Provider store={store}>
      <Shell>
        <CommandPalette onNavigate={setActiveTab} />
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="compose">Compose</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="compose">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <TweetInput
                  onRewrite={handleRewrite}
                  isRewriting={isLoading}
                  rewriteError={error}
                />
                <MediaToggles />
                <HookGenerator />
                <AlternativesList
                  alternatives={alternatives}
                  isLoading={isLoading}
                  error={error}
                  onRetry={handleRetry}
                />
              </div>

              <div className="space-y-6">
                <ScoreDisplay />
                <ScoreBreakdown />
                <SuggestionList />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <div className="space-y-6">
              {selectedTemplate ? (
                <TemplateEditor
                  template={selectedTemplate}
                  onClose={handleCloseEditor}
                />
              ) : (
                <>
                  <TimingAdvisor />
                  <TemplateGrid onSelectTemplate={handleSelectTemplate} />
                </>
              )}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="space-y-6">
              <AnalyticsDashboard />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <TweetHistory />
                <DataExport />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </Shell>
    </Provider>
  )
}

export default App
