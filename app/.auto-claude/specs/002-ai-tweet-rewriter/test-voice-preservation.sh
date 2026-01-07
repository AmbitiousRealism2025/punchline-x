#!/bin/bash

# Voice Preservation Testing Script
# Tests the /api/rewrite-tweet endpoint with diverse tweets

API_URL="http://localhost:3001/api/rewrite-tweet"
RESULTS_FILE="./.auto-claude/specs/002-ai-tweet-rewriter/test-results.json"

echo "=== Voice Preservation Testing ==="
echo "Testing API endpoint: $API_URL"
echo ""

# Test counter
TOTAL_TESTS=0
TOTAL_ALTERNATIVES=0
PASSED_TESTS=0

# Array to store results
declare -a RESULTS

# Function to test a tweet
test_tweet() {
    local test_num=$1
    local category=$2
    local tweet_text=$3

    echo "----------------------------------------"
    echo "Test $test_num: $category"
    echo "Original: $tweet_text"
    echo ""

    # Make API request
    RESPONSE=$(curl -s -X POST "$API_URL" \
        -H "Content-Type: application/json" \
        -d "{\"text\":\"$tweet_text\",\"mediaType\":\"none\",\"hasLink\":false}")

    # Check for error
    if echo "$RESPONSE" | grep -q '"error"'; then
        echo "❌ ERROR: $(echo "$RESPONSE" | jq -r '.error')"
        return 1
    fi

    # Extract alternatives
    ALTERNATIVES=$(echo "$RESPONSE" | jq -r '.alternatives[]')
    ALT_COUNT=$(echo "$RESPONSE" | jq '.alternatives | length')

    echo "Generated $ALT_COUNT alternatives:"
    echo ""

    # Display each alternative
    local alt_num=1
    while IFS= read -r alt; do
        echo "Alternative $alt_num:"
        echo "$alt"
        echo ""
        ((alt_num++))
    done <<< "$ALTERNATIVES"

    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    TOTAL_ALTERNATIVES=$((TOTAL_ALTERNATIVES + ALT_COUNT))

    # Store result
    RESULTS+=("$RESPONSE")

    return 0
}

# Test 1: Professional/Technical
test_tweet 1 "Professional/Technical" \
    "Just deployed our new microservices architecture to production. Zero downtime migration thanks to blue-green deployment. The team executed flawlessly."

sleep 2

# Test 2: Casual/Personal
test_tweet 2 "Casual/Personal" \
    "lol just realized i've been writing code for 6 hours straight and forgot to eat lunch. anyone else do this or am i just a mess 😅"

sleep 2

# Test 3: Humorous/Sarcastic
test_tweet 3 "Humorous/Sarcastic" \
    "\"Just add AI to it\" they said. \"It'll be easy\" they said. Me at 2am debugging hallucinations: 🤡"

sleep 2

# Test 4: Inspirational/Motivational
test_tweet 4 "Inspirational/Motivational" \
    "Your first draft will suck. Your second draft will be better. Your tenth draft might be good. Keep going. The only way out is through."

sleep 2

# Test 5: Question/Engagement
test_tweet 5 "Question/Engagement" \
    "What's your unpopular opinion about remote work? Mine: async communication is overrated and real-time collaboration > everything else"

sleep 2

# Test 6: Thread Starter
test_tweet 6 "Thread Starter/Educational" \
    "I've spent 3 years building SaaS products. Here are 7 mistakes I made that cost me \$50k and 18 months:\n\n(Thread 🧵)"

sleep 2

# Test 7: News/Announcement
test_tweet 7 "News/Announcement" \
    "🚀 LAUNCH DAY: After 6 months of development, our team is shipping v2.0 today! New features include dark mode, AI-powered search, and 3x faster load times. Try it now at example.com"

sleep 2

# Test 8: Hot Take/Controversial
test_tweet 8 "Hot Take/Controversial" \
    "Hot take: TypeScript is overkill for 90% of projects. You're spending more time fighting the compiler than shipping features. JavaScript + good tests > TypeScript + no tests."

sleep 2

# Test 9: Story/Narrative
test_tweet 9 "Story/Narrative" \
    "True story: I once spent 3 days debugging a production issue. Turned out to be a single missing comma in a config file. I laughed, I cried, then I wrote a parser to prevent this from ever happening again."

sleep 2

# Test 10: Minimalist/Philosophical
test_tweet 10 "Minimalist/Philosophical" \
    "Code is poetry.\nBugs are typos.\nRefactoring is editing.\n\nWriting software is writing."

sleep 2

# Test 11: Frustrated/Venting
test_tweet 11 "Frustrated/Venting" \
    "Why does every \"simple\" feature request turn into a 2-week refactor of the entire codebase??? Just trying to add a button here people 😤"

sleep 2

# Test 12: Educational/Tutorial
test_tweet 12 "Educational/Tutorial" \
    "Most developers struggle with async/await. Here's a mental model that made it click for me in 5 minutes (no complex diagrams needed):"

echo "========================================"
echo "TESTING COMPLETE"
echo "========================================"
echo "Total tests run: $TOTAL_TESTS"
echo "Total alternatives generated: $TOTAL_ALTERNATIVES"
echo ""
echo "Results saved to: $RESULTS_FILE"
echo ""
echo "⚠️  MANUAL REVIEW REQUIRED:"
echo "Please review each alternative and verify:"
echo "  1. Preserves core message"
echo "  2. Maintains similar tone"
echo "  3. Doesn't contradict original intent"
