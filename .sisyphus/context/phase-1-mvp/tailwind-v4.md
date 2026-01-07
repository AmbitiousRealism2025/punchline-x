# Tailwind CSS v4 + Vite Setup

## Overview
Tailwind v4 is a major rewrite with CSS-first configuration. No more `tailwind.config.js`.

## Installation

```bash
bun add -d tailwindcss @tailwindcss/vite
```

## Vite Configuration

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
})
```

## CSS Entry Point

```css
/* src/index.css */
@import "tailwindcss";
```

That's it. Tailwind is now active.

## Theme Configuration (CSS-First)

In v4, use `@theme` directive instead of config file:

```css
@import "tailwindcss";

@theme inline {
  /* Custom fonts */
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  
  /* Custom colors */
  --color-brand: #06b6d4;
  --color-surface: #0f0f11;
  
  /* Custom spacing */
  --spacing-18: 4.5rem;
}
```

## CSS Variables for Dark Theme

shadcn/ui pattern using HSL values:

```css
@import "tailwindcss";

@layer base {
  :root {
    --background: 240 10% 3.9%;      /* HSL without hsl() wrapper */
    --foreground: 0 0% 98%;
    --card: 240 10% 5.9%;
    --primary: 188 91% 43%;          /* Cyan */
    --muted: 240 3.7% 15.9%;
    --border: 240 3.7% 15.9%;
    --ring: 188 91% 43%;
    --radius: 0.5rem;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Using CSS Variables in Classes

```tsx
// These work automatically with the variables above
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Click me
  </button>
</div>
```

## Key Differences from v3

| v3 (Config File) | v4 (CSS-First) |
|------------------|----------------|
| `tailwind.config.js` | `@theme` in CSS |
| `theme.extend.colors` | `--color-*` variables |
| `theme.extend.fontFamily` | `--font-*` variables |
| `plugins: [...]` | `@plugin "..."` in CSS |
| `content: [...]` | Automatic detection |

## Adding Custom Utilities

```css
@utility raycast-shine {
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(6, 182, 212, 0.15) 20%,
      rgba(6, 182, 212, 0.15) 80%,
      transparent
    );
  }
}
```

Then use: `<div className="raycast-shine">...</div>`

## Animations

```css
@theme inline {
  --animate-fade-in: fade-in 0.15s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

Use: `<div className="animate-fade-in">...</div>`

## Path Aliases

For `@/` imports to work:

```typescript
// vite.config.ts
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

```json
// tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Common Gotchas

1. **No `tailwind.config.js`** — Don't create one, use CSS
2. **Content detection is automatic** — No need to specify paths
3. **HSL values without `hsl()`** — Just space-separated: `240 10% 3.9%`
4. **`@apply` still works** — Use in `@layer base` or `@layer components`
5. **Plugins use `@plugin`** — Not JavaScript imports

## Debugging

If styles aren't applying:
1. Check `@import "tailwindcss"` is first line
2. Verify Vite plugin is registered
3. Restart dev server after CSS changes
