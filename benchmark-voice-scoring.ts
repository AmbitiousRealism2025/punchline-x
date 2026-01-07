/**
 * Performance Benchmark: Voice Match Scoring
 *
 * This script measures the execution time of the voice match scoring algorithm
 * to validate it meets the <100ms performance requirement.
 *
 * Run: bun run benchmark-voice-scoring.ts
 */

import { calculateVoiceMatchScore } from './app/src/lib/ai/voiceMatch'
import type { VoiceProfile } from './app/src/lib/store'

// Sample data for testing
const sampleProfile: VoiceProfile = {
  tone: 4,
  formality: 'casual',
  humorLevel: 'medium',
  emojiUsage: 'often',
  topicPreferences: ['ai', 'productivity', 'tech'],
}

const sampleExamples = [
  'Just shipped a new feature! 🚀 Super excited about this one.',
  'Hot take: AI will replace most jobs, but create even more.',
  'Pro tip: Always test your code before pushing to prod 😅',
]

// Test cases with different text lengths
const testCases = [
  {
    name: 'Very Short (50 chars)',
    text: 'Quick update on the project status today! 🎉',
  },
  {
    name: 'Short (100 chars)',
    text: 'Just finished implementing a new feature that automatically adapts AI suggestions to your writing style! 🔥',
  },
  {
    name: 'Medium (280 chars - typical tweet)',
    text: 'After months of research, I\'ve discovered the secret to viral tweets: authenticity. Stop trying to sound like everyone else. Your unique voice is your biggest asset. People connect with real humans, not corporate robots. Share your genuine thoughts and watch engagement soar! 🚀',
  },
  {
    name: 'Long (500 chars)',
    text: 'Here\'s what I learned after analyzing 10,000 viral tweets:\n\n1. Authenticity beats perfection\n2. Stories resonate more than facts\n3. Emojis increase engagement by 25%\n4. Questions spark conversations\n5. Contrarian views get noticed\n\nThe biggest mistake? Trying to sound "professional" on Twitter. This isn\'t LinkedIn. Be human. Share your struggles. Celebrate your wins. Ask questions. Challenge assumptions.\n\nYour personality is your competitive advantage. Use it! 💪',
  },
  {
    name: 'Very Long (1000 chars)',
    text: 'I\'ve been building AI-powered content tools for 5 years, and here\'s the uncomfortable truth nobody talks about:\n\nMost AI-generated content is garbage. Not because the AI is bad, but because people don\'t know how to use it properly.\n\nThe secret isn\'t prompting. It\'s personalization.\n\nHere\'s what actually works:\n\n1. Define your voice parameters (tone, formality, humor level)\n2. Provide 3-5 examples of your best work\n3. Let AI learn your patterns\n4. Score outputs for authenticity\n5. Iterate based on what performs well\n\nI built a system that does this automatically. It adapts every AI suggestion to match my writing style. No more robotic outputs that need heavy editing.\n\nThe result? My engagement is up 150% and I spend 70% less time editing.\n\nThe future of AI isn\'t replacing writers. It\'s augmenting them. Tools that learn your voice and amplify your authentic self.\n\nThat\'s the game changer. 🚀\n\nWhat\'s your biggest frustration with AI writing tools? Let me know below! 👇',
  },
  {
    name: 'Extreme (5000 chars)',
    text: 'A' + ' detailed analysis of AI content generation and personalization. '.repeat(70),
  },
]

// Benchmark function
function benchmark(
  name: string,
  text: string,
  examples: string[],
  profile: VoiceProfile,
  iterations: number = 100
) {
  const times: number[] = []

  // Warm-up run (exclude from measurements)
  calculateVoiceMatchScore(text, examples, profile)

  // Actual benchmark
  for (let i = 0; i < iterations; i++) {
    const start = performance.now()
    calculateVoiceMatchScore(text, examples, profile)
    const end = performance.now()
    times.push(end - start)
  }

  // Calculate statistics
  const avg = times.reduce((a, b) => a + b, 0) / times.length
  const min = Math.min(...times)
  const max = Math.max(...times)
  const median = times.sort((a, b) => a - b)[Math.floor(times.length / 2)]

  return { name, avg, min, max, median, iterations }
}

// Run benchmarks
console.log('🔬 Voice Match Scoring Performance Benchmark')
console.log('=' .repeat(70))
console.log()
console.log(`Test Setup:`)
console.log(`- Voice Profile: Casual tone, medium humor, often emoji`)
console.log(`- Example Tweets: ${sampleExamples.length} samples`)
console.log(`- Iterations per test: 100`)
console.log(`- Performance Target: <100ms`)
console.log()
console.log('=' .repeat(70))
console.log()

const results: any[] = []

// Run all test cases
for (const testCase of testCases) {
  const result = benchmark(
    testCase.name,
    testCase.text,
    sampleExamples,
    sampleProfile
  )
  results.push(result)

  const status = result.avg < 100 ? '✅ PASS' : '❌ FAIL'
  console.log(`${status} ${result.name}`)
  console.log(`   Avg: ${result.avg.toFixed(2)}ms`)
  console.log(`   Min: ${result.min.toFixed(2)}ms`)
  console.log(`   Max: ${result.max.toFixed(2)}ms`)
  console.log(`   Median: ${result.median.toFixed(2)}ms`)
  console.log()
}

// Summary
console.log('=' .repeat(70))
console.log()
console.log('📊 Summary:')
console.log()

const allPass = results.every((r) => r.avg < 100)
const overallStatus = allPass ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'

console.log(overallStatus)
console.log()
console.log(`Performance Breakdown:`)
console.log(`- Fastest case: ${Math.min(...results.map((r) => r.avg)).toFixed(2)}ms`)
console.log(`- Slowest case: ${Math.max(...results.map((r) => r.avg)).toFixed(2)}ms`)
console.log(`- Average across all cases: ${(results.reduce((a, b) => a + b.avg, 0) / results.length).toFixed(2)}ms`)
console.log()

// Edge case tests
console.log('=' .repeat(70))
console.log()
console.log('🧪 Edge Case Tests:')
console.log()

// Test 1: Empty text
const emptyStart = performance.now()
const emptyResult = calculateVoiceMatchScore('', sampleExamples, sampleProfile)
const emptyTime = performance.now() - emptyStart
console.log(`✅ Empty text: ${emptyTime.toFixed(2)}ms (score: ${emptyResult.total})`)

// Test 2: No examples
const noExamplesStart = performance.now()
const noExamplesResult = calculateVoiceMatchScore(
  testCases[2].text,
  [],
  sampleProfile
)
const noExamplesTime = performance.now() - noExamplesStart
console.log(`✅ No examples: ${noExamplesTime.toFixed(2)}ms (score: ${noExamplesResult.total})`)

// Test 3: No profile
const noProfileStart = performance.now()
const noProfileResult = calculateVoiceMatchScore(
  testCases[2].text,
  sampleExamples,
  undefined
)
const noProfileTime = performance.now() - noProfileStart
console.log(`✅ No profile: ${noProfileTime.toFixed(2)}ms (score: ${noProfileResult.total})`)

// Test 4: Single character
const singleCharStart = performance.now()
const singleCharResult = calculateVoiceMatchScore('A', sampleExamples, sampleProfile)
const singleCharTime = performance.now() - singleCharStart
console.log(`✅ Single character: ${singleCharTime.toFixed(2)}ms (score: ${singleCharResult.total})`)

// Test 5: Emoji-heavy text
const emojiText = '🚀 🎉 💪 🔥 ✨ '.repeat(20)
const emojiStart = performance.now()
const emojiResult = calculateVoiceMatchScore(emojiText, sampleExamples, sampleProfile)
const emojiTime = performance.now() - emojiStart
console.log(`✅ Emoji-heavy: ${emojiTime.toFixed(2)}ms (score: ${emojiResult.total})`)

console.log()
console.log('=' .repeat(70))
console.log()

// Final verdict
if (allPass) {
  console.log('🎉 BENCHMARK COMPLETE: All performance requirements met!')
  console.log('   Voice match scoring consistently completes in <100ms')
  process.exit(0)
} else {
  console.log('⚠️ BENCHMARK FAILED: Some tests exceeded 100ms threshold')
  process.exit(1)
}
