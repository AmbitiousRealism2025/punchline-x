# TinyBase React Integration

## Overview
TinyBase is a reactive data store with granular cell-level reactivity, perfect for real-time scoring updates.

## Installation
```bash
bun add tinybase
```

## Store Setup

### Basic Store
```typescript
import { createStore } from 'tinybase';

export const store = createStore();
```

### With Browser Persistence (localStorage)
```typescript
import { createStore } from 'tinybase';
import { createLocalPersister } from 'tinybase/persisters/persister-browser';

export const store = createStore();

// Initialize with default values
store.setRow('settings', 'user', {
  isPremium: false,
  isVerified: false,
});

store.setRow('currentTweet', 'draft', {
  text: '',
  mediaType: 'none',
  hasLink: false,
});

// Auto-save to localStorage
const persister = createLocalPersister(store, 'app-name');
persister.startAutoSave();  // Saves on every change
persister.startAutoLoad();  // Loads on startup

export { persister };
```

## React Provider

Wrap your app to provide store context:

```tsx
import { Provider } from 'tinybase/ui-react';
import { store } from './lib/store';

function App() {
  return (
    <Provider store={store}>
      <MyComponents />
    </Provider>
  );
}
```

## React Hooks

### useCell — Read single value (most common)
```typescript
import { useCell } from 'tinybase/ui-react';

function ScoreDisplay() {
  // Returns undefined if cell doesn't exist
  const score = useCell('tweets', 'current', 'score') ?? 0;
  return <div>Score: {score}</div>;
}
```

### useRow — Read entire row
```typescript
import { useRow } from 'tinybase/ui-react';

function TweetView() {
  const tweet = useRow('tweets', 'current');
  // tweet = { text: '...', mediaType: 'image', score: 75 }
  return <div>{tweet.text}</div>;
}
```

### useSetCellCallback — Write single value
```typescript
import { useSetCellCallback } from 'tinybase/ui-react';

function TweetInput() {
  const setText = useSetCellCallback(
    'tweets',           // tableId
    'current',          // rowId
    'text',             // cellId
    (newText: string) => newText,  // transform function
    []                  // dependencies
  );
  
  return (
    <textarea 
      onChange={(e) => setText(e.target.value)} 
    />
  );
}
```

### useSetRowCallback — Write entire row
```typescript
import { useSetRowCallback } from 'tinybase/ui-react';

function ResetButton() {
  const resetTweet = useSetRowCallback(
    'tweets',
    'current',
    () => ({ text: '', mediaType: 'none', hasLink: false }),
    []
  );
  
  return <button onClick={resetTweet}>Reset</button>;
}
```

### State Hooks (v7.3+) — Combined read/write
```typescript
import { useCellState, useRowState } from 'tinybase/ui-react';

function TweetInput() {
  // Like useState but persisted to TinyBase
  const [text, setText] = useCellState('tweets', 'current', 'text');
  
  return (
    <textarea 
      value={text ?? ''} 
      onChange={(e) => setText(e.target.value)} 
    />
  );
}
```

## Reactivity Model

TinyBase has **granular reactivity**:

- Components only re-render when their observed cell/row changes
- Updating `score` does NOT re-render components watching `text`
- Perfect for real-time scoring where values update frequently

```tsx
// Only re-renders when 'score' changes
function ScoreDisplay() {
  const score = useCell('tweets', 'current', 'score');
  return <div>{score}</div>;
}

// Only re-renders when 'text' changes
function CharCounter() {
  const text = useCell('tweets', 'current', 'text') ?? '';
  return <div>{text.length}/280</div>;
}
```

## Data Model for Tweet Optimizer

```typescript
// Tables structure
store.setTablesSchema({
  settings: {
    // rowId: 'user'
    isPremium: { type: 'boolean', default: false },
    isVerified: { type: 'boolean', default: false },
    timezone: { type: 'string', default: 'America/Los_Angeles' },
  },
  currentTweet: {
    // rowId: 'draft'
    text: { type: 'string', default: '' },
    mediaType: { type: 'string', default: 'none' },
    hasLink: { type: 'boolean', default: false },
  },
  tweets: {
    // rowId: auto-generated UUID
    content: { type: 'string' },
    mediaType: { type: 'string' },
    preScore: { type: 'number' },
    postedAt: { type: 'number' },
    impressions: { type: 'number' },
    engagements: { type: 'number' },
  },
});
```

## Persistence Options

| Persister | Use Case |
|-----------|----------|
| `createLocalPersister` | Browser localStorage (MVP) |
| `createSessionPersister` | Session storage |
| `createIndexedDbPersister` | Larger datasets |
| `createSqliteBunPersister` | Bun server with SQLite |

## Tips

1. **Always provide default values** when reading cells:
   ```typescript
   const score = useCell('table', 'row', 'cell') ?? 0;
   ```

2. **Use `useCreateStore`** for component-scoped stores:
   ```typescript
   import { useCreateStore } from 'tinybase/ui-react';
   const store = useCreateStore(createStore);
   ```

3. **Debug with Inspector**:
   ```tsx
   import { Inspector } from 'tinybase/ui-react-inspector';
   <Inspector />
   ```
