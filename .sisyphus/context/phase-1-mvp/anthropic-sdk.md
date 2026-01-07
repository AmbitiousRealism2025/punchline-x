# Anthropic SDK (TypeScript)

## Overview
Official TypeScript SDK for Claude API. Use for AI hook generation.

## Installation
```bash
bun add @anthropic-ai/sdk
```

## Basic Usage

```typescript
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY, // Can omit if env var is set
});

const message = await client.messages.create({
  model: 'claude-sonnet-4-5-20250929',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello, Claude' }],
});

console.log(message.content[0].text);
```

## Available Models (2025)

| Model | ID | Best For |
|-------|-----|----------|
| Claude Sonnet 4.5 | `claude-sonnet-4-5-20250929` | Fast, balanced (default) |
| Claude Opus 4 | `claude-4-opus-20250522` | High intelligence |
| Claude Opus 4.5 | `claude-4-5-opus-20251124` | State-of-art reasoning |

## Streaming Responses

```typescript
const stream = await client.messages.create({
  model: 'claude-sonnet-4-5-20250929',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Generate hooks' }],
  stream: true,
});

for await (const chunk of stream) {
  if (chunk.type === 'content_block_delta') {
    if (chunk.delta.type === 'text_delta') {
      process.stdout.write(chunk.delta.text);
    }
  }
}
```

## Bun Server Integration

### Create API Proxy
Never expose API key to frontend. Create a Bun server:

```typescript
// src/server/ai-proxy.ts
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

Bun.serve({
  port: 3001,
  async fetch(req) {
    const url = new URL(req.url);
    
    // CORS
    const headers = {
      'Access-Control-Allow-Origin': 'http://localhost:5173',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };
    
    if (req.method === 'OPTIONS') {
      return new Response(null, { headers });
    }
    
    if (req.method === 'POST' && url.pathname === '/api/generate') {
      const { prompt } = await req.json();
      
      const message = await client.messages.create({
        model: 'claude-sonnet-4-5-20250929',
        max_tokens: 1024,
        messages: [{ role: 'user', content: prompt }],
      });
      
      return new Response(
        JSON.stringify(message.content[0]),
        { headers: { ...headers, 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response('Not found', { status: 404 });
  },
});
```

### Stream Response to Client
```typescript
Bun.serve({
  async fetch(req) {
    const stream = await client.messages.create({
      stream: true,
      // ...
    });
    
    // Convert SDK stream to web ReadableStream
    return new Response(stream.toReadableStream(), {
      headers: { 'Content-Type': 'text/event-stream' },
    });
  },
});
```

## Error Handling

```typescript
import Anthropic from '@anthropic-ai/sdk';

try {
  const response = await client.messages.create({ ... });
} catch (error) {
  if (error instanceof Anthropic.RateLimitError) {
    console.log('Rate limited. Retry after:', error.headers['retry-after']);
    // Implement exponential backoff
  } else if (error instanceof Anthropic.AuthenticationError) {
    console.log('Invalid API key');
  } else if (error instanceof Anthropic.APIError) {
    console.log(`API Error ${error.status}: ${error.message}`);
  }
}
```

## Prompt Pattern for Hook Generation

```typescript
const HOOK_PROMPT = `Generate 5 viral tweet hooks for the given topic.

Use these styles (one each):
1. Contrarian ("Unpopular opinion:", "Actually...")
2. Number-based ("7 things...", "I spent 100 hours...")
3. Story opener ("6 months ago, I...")
4. Question ("What if...", "Why do...")
5. Pattern interrupt ("Stop doing X", "Wait...")

Return ONLY a JSON array:
[{"hook": "...", "style": "contrarian|number|story|question|interrupt"}]

Do not include any other text or markdown.`;

const message = await client.messages.create({
  model: 'claude-sonnet-4-5-20250929',
  max_tokens: 1024,
  messages: [{
    role: 'user',
    content: `${HOOK_PROMPT}\n\nTopic: "${topic}"`,
  }],
});

// Parse response
const text = message.content[0].text;
const hooks = JSON.parse(text);
```

## Extended Thinking (Advanced)

For complex reasoning tasks, enable thinking:

```typescript
const message = await client.messages.create({
  model: 'claude-4-5-opus-20251124',
  max_tokens: 4096,
  thinking: {
    type: 'enabled',
    budget_tokens: 1024, // Tokens for internal reasoning
  },
  messages: [{ role: 'user', content: 'Analyze this tweet...' }],
});

// Access thinking (if enabled)
for (const block of message.content) {
  if (block.type === 'thinking') {
    console.log('Reasoning:', block.thinking);
  } else if (block.type === 'text') {
    console.log('Answer:', block.text);
  }
}
```

## Configuration Options

```typescript
const client = new Anthropic({
  apiKey: 'sk-...',           // API key (or use env var)
  maxRetries: 2,              // Retry failed requests
  timeout: 60_000,            // 60 second timeout
});
```

## Best Practices

1. **Never expose API key in frontend** — Always proxy through server
2. **Use streaming for UX** — Show text as it generates
3. **Handle rate limits** — Implement exponential backoff
4. **Set reasonable max_tokens** — Don't waste tokens
5. **Use system prompts** — For consistent output format
