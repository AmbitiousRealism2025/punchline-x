# Tweet Optimizer — Future Enhancements

## Optional Features

| Enhancement | Effort | Description |
|-------------|--------|-------------|
| Delete individual tweets from history | Small | Add trash icon to each tweet in history |
| Clear all history button | Small | Bulk delete with confirmation dialog |
| Score trend chart over time | Medium | Line chart showing score progression |
| Thread composer (multi-tweet) | Medium | Compose connected tweets with thread preview |
| Import tweets from CSV | Small | Upload past tweets for analysis |
| PWA/offline support | Medium | Service worker + manifest for installable app |
| Custom templates (user-created) | Medium | Save/edit personal templates |
| Scheduled posting reminders | Medium | Notify at optimal posting times |
| A/B tweet comparison | Small | Side-by-side scoring of two drafts |
| Hashtag suggestions | Small | AI-powered hashtag recommendations |

## Production Readiness

| Item | Status | Notes |
|------|--------|-------|
| Error boundaries | Not added | Wrap components to catch render errors |
| Loading states | Minimal | Add skeletons for AI generation |
| Mobile responsiveness | Basic | Grid collapses, but could be improved |
| SEO/meta tags | Default | Add Open Graph tags if sharing |
| Favicon | Default Vite | Create custom icon |
| Deploy | Not done | Vercel/Netlify one-click deploy |
| Environment validation | Not done | Check for ANTHROPIC_API_KEY on startup |
| Rate limiting | Not done | Prevent API abuse on proxy server |
| Analytics/telemetry | Not done | Optional usage tracking |

## Performance Optimizations

| Item | Status |
|------|--------|
| React.memo on heavy components | Not done |
| Virtualized tweet history list | Not done (only needed for 100+ tweets) |
| Debounced scoring | Already done |
| Code splitting | Not done |
| Bundle analysis | Not done |

## Testing

| Type | Status |
|------|--------|
| Unit tests (scoring engine) | Not done |
| Component tests (React Testing Library) | Not done |
| E2E tests (Playwright) | Not done |
| Visual regression tests | Not done |

## Accessibility

| Item | Status |
|------|--------|
| Keyboard navigation | Partial (shortcuts work) |
| Screen reader support | Basic (semantic HTML) |
| Focus management | Not audited |
| Color contrast | Should be fine (dark theme) |
| Reduced motion | Not implemented |
