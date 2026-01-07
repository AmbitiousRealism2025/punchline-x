# shadcn/ui Dark Theme (Raycast Style)

## Overview
Raycast-inspired dark theme with cyan accent. Dark mode only, no toggle.

## Installation

```bash
bun x shadcn@latest init
```

When prompted:
- Style: **New York**
- Base color: **Zinc**
- CSS variables: **Yes**

## components.json

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "zinc",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}
```

## Raycast Dark Theme CSS

```css
/* src/index.css */
@import "tailwindcss";

@theme inline {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}

@layer base {
  :root {
    /* Backgrounds */
    --background: 240 10% 3.9%;       /* #09090b - Main background */
    --foreground: 0 0% 98%;           /* #fafafa - Primary text */
    
    /* Cards & Popovers */
    --card: 240 10% 5.9%;             /* #0f0f11 - Elevated surfaces */
    --card-foreground: 0 0% 98%;
    --popover: 240 10% 5.9%;
    --popover-foreground: 0 0% 98%;
    
    /* Primary (Cyan Accent) */
    --primary: 188 91% 43%;           /* #06b6d4 - Cyan-500 */
    --primary-foreground: 0 0% 3.9%;  /* Dark text on cyan */
    
    /* Secondary */
    --secondary: 240 3.7% 15.9%;      /* #27272a - Muted surfaces */
    --secondary-foreground: 0 0% 98%;
    
    /* Muted */
    --muted: 240 3.7% 15.9%;
    --muted-foreground: 240 5% 64.9%; /* #a1a1aa - Subdued text */
    
    /* Accent (same as primary for Raycast feel) */
    --accent: 188 91% 43%;
    --accent-foreground: 0 0% 3.9%;
    
    /* Destructive (errors/warnings) */
    --destructive: 0 62.8% 50%;       /* Red */
    --destructive-foreground: 0 0% 98%;
    
    /* Borders & Inputs */
    --border: 240 3.7% 15.9%;         /* #27272a */
    --input: 240 3.7% 15.9%;
    --ring: 188 91% 43%;              /* Cyan focus ring */
    
    /* Radius */
    --radius: 0.5rem;
  }

  * {
    @apply border-border;
  }
  
  body {
    @apply bg-background text-foreground antialiased;
  }
}
```

## Color Reference (Hex Values)

| Variable | HSL | Hex | Usage |
|----------|-----|-----|-------|
| background | 240 10% 3.9% | #09090b | Main bg |
| foreground | 0 0% 98% | #fafafa | Primary text |
| card | 240 10% 5.9% | #0f0f11 | Cards, elevated |
| primary | 188 91% 43% | #06b6d4 | Cyan accent |
| muted | 240 3.7% 15.9% | #27272a | Subtle surfaces |
| muted-foreground | 240 5% 64.9% | #a1a1aa | Secondary text |
| border | 240 3.7% 15.9% | #27272a | Borders |

## Adding Components

```bash
# Core components for MVP
bun x shadcn@latest add button
bun x shadcn@latest add input
bun x shadcn@latest add textarea
bun x shadcn@latest add card
bun x shadcn@latest add badge
bun x shadcn@latest add toggle
bun x shadcn@latest add toggle-group
bun x shadcn@latest add tooltip
bun x shadcn@latest add dialog
bun x shadcn@latest add command    # For ⌘K palette
```

## Raycast Visual Effects

### Top Shine (Gradient Border)
```css
/* Add to index.css */
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

Usage: `<Card className="raycast-shine">...</Card>`

### Subtle Glow
```css
@utility glow-cyan {
  box-shadow: 0 0 20px -5px rgba(6, 182, 212, 0.3);
}
```

### Keyboard Shortcut Badge
```tsx
function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="min-w-[20px] px-1.5 h-5 rounded bg-zinc-800 border border-zinc-700 text-[10px] font-medium flex items-center justify-center text-zinc-400">
      {children}
    </kbd>
  );
}

// Usage
<Kbd>⌘</Kbd><Kbd>K</Kbd>
```

## Component Styling Patterns

### Card with Hover
```tsx
<Card className="bg-card hover:bg-card/80 transition-colors duration-150">
  ...
</Card>
```

### Button Variants
```tsx
// Primary (cyan)
<Button>Submit</Button>

// Secondary (muted)
<Button variant="secondary">Cancel</Button>

// Ghost (transparent)
<Button variant="ghost">More</Button>

// Outline
<Button variant="outline">Options</Button>
```

### Input with Focus Ring
```tsx
<Input 
  className="focus-visible:ring-primary/50"
  placeholder="Type here..."
/>
```

### Score Display (Colored by Value)
```tsx
function getScoreColor(score: number) {
  if (score >= 85) return 'text-emerald-400';
  if (score >= 70) return 'text-lime-400';
  if (score >= 55) return 'text-yellow-400';
  if (score >= 40) return 'text-orange-400';
  return 'text-red-400';
}

<span className={cn('text-4xl font-bold', getScoreColor(score))}>
  {score}
</span>
```

## Typography

### Hierarchy
```tsx
// Heading
<h1 className="text-2xl font-semibold text-foreground">Title</h1>

// Subheading
<h2 className="text-lg font-medium text-foreground">Subtitle</h2>

// Body
<p className="text-sm text-muted-foreground">Description text...</p>

// Label
<span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
  Label
</span>
```

## Spacing Conventions

- **Card padding**: `p-6`
- **Section gaps**: `space-y-6` or `gap-6`
- **Compact spacing**: `space-y-4` or `gap-4`
- **Border radius**: `rounded-lg` (0.5rem)

## Transitions

Default: 150ms ease for interactions

```tsx
<button className="transition-colors duration-150">
  ...
</button>
```
