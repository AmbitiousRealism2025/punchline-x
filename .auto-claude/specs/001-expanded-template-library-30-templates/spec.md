# Specification: Expanded Template Library (30+ Templates)

## Overview

Expand the Punchline X tweet template library from the current 15 templates to 30+ proven templates by adding 7 new categories and doubling the variety of content formats available to users. This enhancement positions templates as the core product differentiator—providing immediate value and teaching users proven engagement patterns that match diverse content styles.

## Workflow Type

**Type**: feature

**Rationale**: This is new feature development that expands existing functionality. We're not fixing bugs or refactoring—we're adding net-new templates and categories to increase product value and user engagement options.

## Task Scope

### Services Involved
- **Frontend App** (primary) - React/TypeScript single-page application
  - Add 15+ new template definitions
  - Add 7 new template categories
  - Update type definitions to support new categories

### This Task Will:
- [ ] Add minimum 15 new template definitions to reach 30+ total
- [ ] Create 7 new template categories (Predictions, Case Studies, Before/After, Lessons Learned, Tool Reviews, and 2 more variations)
- [ ] Ensure all new templates include expected score ranges
- [ ] Provide real tweet examples for each new template
- [ ] Update TypeScript types to include new categories
- [ ] Maintain consistency with existing template data structure

### Out of Scope:
- UI/UX redesign of template browsing interface
- Backend API changes (this is a frontend-only data enhancement)
- Template recommendation algorithm changes
- Analytics or tracking implementations
- Migration of existing user data

## Service Context

### Frontend App

**Tech Stack:**
- Language: TypeScript
- Framework: React + Vite
- Key directories:
  - `./app/src/lib/templates/` - Template data and logic
  - `./app/src/components/templates/` - Template UI components

**Entry Point:** `./app/src/main.tsx`

**How to Run:**
```bash
cd app
npm install
npm run dev
```

**Port:** 5173 (Vite default)

## Files to Modify

| File | Service | What to Change |
|------|---------|---------------|
| `./app/src/lib/templates/data.ts` | Frontend | Add 15+ new template objects to the `templates` array; add new category labels to `categoryLabels` object |
| `./app/src/lib/templates/types.ts` | Frontend | Extend `TemplateCategory` type union to include new categories (predictions, case-study, before-after, lessons-learned, tool-review, etc.) |

## Files to Reference

These files show patterns to follow:

| File | Pattern to Copy |
|------|----------------|
| `./app/src/lib/templates/data.ts` | Existing template object structure (id, name, category, template, placeholders, expectedScore, bestWith, example) |
| `./Content_Templates.md` | Documentation format for template descriptions, score ranges, and examples |

## Patterns to Follow

### Template Object Structure

From `./app/src/lib/templates/data.ts`:

```typescript
{
  id: 'c1-unpopular-opinion',
  name: 'Unpopular Opinion',
  category: 'contrarian',
  template: `Unpopular opinion: {statement}

Here's why:

• {point1}
• {point2}
• {point3}

{question}`,
  placeholders: [
    { key: 'statement', hint: 'A controversial statement most disagree with' },
    { key: 'point1', hint: 'First supporting argument' },
    { key: 'point2', hint: 'Second supporting argument' },
    { key: 'point3', hint: 'Third supporting argument' },
    { key: 'question', hint: 'Open question to invite debate' },
  ],
  expectedScore: [70, 85],
  bestWith: ['image'],
  example: `Unpopular opinion: Scheduling tools are killing your reach.

Here's why:

• The algorithm favors real-time engagement
• Scheduled posts miss trending conversations
• Your audience can tell when you're not "there"

Am I wrong? What's been your experience?`,
}
```

**Key Points:**
- `id` follows kebab-case convention with category prefix
- `template` uses {placeholder} syntax for dynamic content
- `placeholders` array provides user guidance for filling each field
- `expectedScore` is a tuple of [min, max] numbers
- `bestWith` is an array of MediaType values
- `example` is optional but highly valuable for user education

### Category Label Mapping

From `./app/src/lib/templates/data.ts`:

```typescript
export const categoryLabels: Record<string, string> = {
  contrarian: 'Contrarian Takes',
  list: 'Numbered Lists',
  story: 'Story Hooks',
  // Add new categories here
}
```

**Key Points:**
- Maps category ID to human-readable display name
- Used throughout UI for filtering and organization

## Requirements

### Functional Requirements

1. **Minimum 30 Templates Total**
   - Description: Expand from current 15 to at least 30 templates
   - Acceptance: Count of objects in `templates` array ≥ 30

2. **10+ Categories for Organization**
   - Description: Add 7 new categories to existing 9 to reach 10+ total
   - Acceptance: `TemplateCategory` type union includes ≥ 10 category values

3. **Score Range Per Template**
   - Description: Each template shows expected viral score range
   - Acceptance: Every template object has `expectedScore: [min, max]` property with realistic values (50-95 range)

4. **Real Tweet Examples Included**
   - Description: Templates include successful tweet examples demonstrating the format
   - Acceptance: At least 50% of new templates include `example` property with realistic, well-crafted tweet text

### New Categories to Add

Based on requirements analysis, add these 7 categories:

1. **predictions** - "Predictions" - Bold predictions about industry/trends
2. **case-study** - "Case Studies" - Detailed analysis of success/failure examples
3. **before-after** - "Before/After" - Transformation comparisons
4. **lessons-learned** - "Lessons Learned" - Post-mortem insights from experiences
5. **tool-review** - "Tool Reviews" - Product/tool evaluations and recommendations
6. **unpopular-opinion** - "Unpopular Opinions" - (Could merge with contrarian or keep separate)
7. **comparison** - "Comparisons" - Side-by-side evaluations

### Edge Cases

1. **Duplicate Template IDs** - Ensure all new template IDs are unique and don't conflict with existing ones
2. **Missing Placeholders in Template String** - Verify every {placeholder} in template string has corresponding entry in placeholders array
3. **Invalid Score Ranges** - Validate expectedScore values are within 0-100 and min < max
4. **Category Type Mismatch** - TypeScript compiler will catch if category doesn't match TemplateCategory type
5. **Empty Examples** - While examples are optional, aim for 50%+ coverage on new templates

## Implementation Notes

### DO
- Follow the exact object structure pattern from existing templates in `data.ts`
- Use kebab-case for template IDs with category prefix (e.g., `pred1-industry-trend`, `cs1-growth-breakdown`)
- Provide helpful, specific hints in placeholder objects to guide users
- Set realistic expectedScore ranges based on similar existing templates (contrarian: 65-85, questions: 70-85, value: 60-75, etc.)
- Include `example` field for at least 50% of new templates to educate users
- Match the writing style and tone of existing templates (actionable, specific, engagement-focused)
- Test each template string renders correctly with placeholders filled

### DON'T
- Create templates that are too similar to existing ones
- Use placeholder keys with special characters (stick to camelCase)
- Set unrealistic score ranges (avoid 90-100 unless truly high-performing format)
- Copy templates verbatim from external sources without customization
- Add categories that overlap significantly with existing ones
- Forget to update both `types.ts` AND `data.ts` when adding categories

### Template Creation Research

Before implementation, research proven tweet formats for each new category:
- **Predictions**: Look for successful prediction tweets with high engagement
- **Case Studies**: Find examples of detailed breakdown threads
- **Before/After**: Transformation stories with clear contrast
- **Lessons Learned**: Authentic failure/learning narratives
- **Tool Reviews**: Honest product evaluations that performed well

## Development Environment

### Start Services

```bash
# Navigate to app directory
cd app

# Install dependencies (if not already done)
npm install

# Start development server
npm run dev
```

### Service URLs
- Frontend App: http://localhost:5173

### Required Environment Variables
None - This is a frontend-only data change. No environment variables required.

### Verification During Development

```bash
# Type check
npm run type-check

# Build to verify no compilation errors
npm run build

# Run development server and test in browser
npm run dev
```

## Success Criteria

The task is complete when:

1. [ ] At least 30 template objects exist in `./app/src/lib/templates/data.ts`
2. [ ] At least 10 categories defined in `TemplateCategory` type in `types.ts`
3. [ ] All new categories have entries in `categoryLabels` object
4. [ ] Each template has valid `expectedScore` range [min, max]
5. [ ] At least 15 new templates include `example` property with realistic tweet text
6. [ ] No TypeScript compilation errors
7. [ ] No console errors when browsing templates in browser
8. [ ] Existing templates still render and function correctly
9. [ ] New templates are visible and selectable in the template grid UI

## QA Acceptance Criteria

**CRITICAL**: These criteria must be verified by the QA Agent before sign-off.

### Unit Tests

| Test | File | What to Verify |
|------|------|----------------|
| Template count validation | `./app/src/lib/templates/data.ts` | Verify `templates.length >= 30` |
| Unique IDs validation | `./app/src/lib/templates/data.ts` | Verify no duplicate template IDs exist |
| Score range validation | `./app/src/lib/templates/data.ts` | Verify all expectedScore values are [min, max] where 0 <= min < max <= 100 |
| Placeholder completeness | `./app/src/lib/templates/data.ts` | Verify every {placeholder} in template string has matching entry in placeholders array |
| Category type consistency | `./app/src/lib/templates/` | Verify all template.category values match TemplateCategory type definition |

### Integration Tests

| Test | Services | What to Verify |
|------|----------|----------------|
| Template retrieval | Frontend | `getTemplatesByCategory()` returns templates for all new categories |
| Template filling | Frontend | `fillTemplate()` correctly replaces placeholders for new templates |
| Category filtering | Frontend | UI correctly groups templates by new categories |

### End-to-End Tests

| Flow | Steps | Expected Outcome |
|------|-------|------------------|
| Browse new categories | 1. Open app 2. Navigate to template selector 3. Filter by new category | New categories appear in category filter list with correct labels |
| Select new template | 1. Filter by new category 2. Click on a new template 3. View template details | Template details display correctly with structure, placeholders, score range, and example (if present) |
| Fill new template | 1. Select new template 2. Fill in placeholders 3. Generate tweet | Generated tweet correctly replaces all placeholders with user input |

### Browser Verification (Frontend)

| Page/Component | URL | Checks |
|----------------|-----|--------|
| Template Grid | `http://localhost:5173` | - New templates appear in grid<br>- Category labels display correctly<br>- Score ranges visible on template cards |
| Template Detail | `http://localhost:5173` (click any new template) | - Template structure displays<br>- Placeholders render with hints<br>- Expected score range shows<br>- Example tweet appears (if defined) |
| Template Editor | `http://localhost:5173` (select template and fill) | - All placeholder inputs render<br>- Generated preview updates correctly<br>- No broken layouts or styling issues |

### Database Verification

Not applicable - this is a frontend data change with no database involved.

### Code Quality Checks

| Check | Command | Expected |
|-------|---------|----------|
| TypeScript compilation | `npm run type-check` | No type errors |
| Build success | `npm run build` | Build completes without errors |
| Linting | `npm run lint` (if configured) | No linting errors in modified files |

### QA Sign-off Requirements

- [ ] All 30+ templates render without errors in browser
- [ ] All 10+ categories appear in category filters
- [ ] Template filling works correctly for all new templates
- [ ] Score ranges are realistic and within valid bounds (0-100)
- [ ] Examples (where provided) are well-written and demonstrate the template effectively
- [ ] No regressions in existing template functionality
- [ ] Code follows established TypeScript/React patterns
- [ ] No console errors or warnings during normal template browsing
- [ ] Documentation in Content_Templates.md is updated (optional but recommended)
- [ ] Performance is not degraded (template loading remains fast)

## Additional Context

### Current Template Count by Category

Based on analysis of `./app/src/lib/templates/data.ts`:

| Category | Current Count |
|----------|--------------|
| contrarian | 2 |
| list | 2 |
| story | 2 |
| thread | 1 |
| poll | 1 |
| value | 2 |
| question | 2 |
| milestone | 1 |
| teaching | 2 |
| **TOTAL** | **15** |

### Recommended Distribution for New Templates

To reach 30+ and balance categories:

| Category | Recommended Final Count | Templates to Add |
|----------|------------------------|-----------------|
| Existing categories | 20-22 | +5-7 |
| predictions | 2-3 | +2-3 |
| case-study | 2-3 | +2-3 |
| before-after | 2 | +2 |
| lessons-learned | 2 | +2 |
| tool-review | 2 | +2 |
| comparison | 2 | +2 |
| **TOTAL** | **30-34** | **+15-19** |

### Template Quality Guidelines

Every new template should:
1. **Solve a specific content problem** - Address a clear use case
2. **Be proven in the wild** - Based on real viral tweet patterns
3. **Provide structure** - Give users a clear format to follow
4. **Enable customization** - Allow personalization while maintaining format
5. **Include guidance** - Placeholder hints help users fill correctly
6. **Set realistic expectations** - Score ranges based on actual performance data

### Reference Examples for New Categories

#### Predictions Template Example
```typescript
{
  id: 'pred1-industry-trend',
  name: 'Industry Trend Prediction',
  category: 'predictions',
  template: `Bold prediction for {year}:

{prediction}

Why I believe this:

• {reason1}
• {reason2}
• {reason3}

{question}`,
  placeholders: [
    { key: 'year', hint: 'Year or timeframe (2024, next 5 years)' },
    { key: 'prediction', hint: 'Your bold prediction statement' },
    { key: 'reason1', hint: 'First supporting reason' },
    { key: 'reason2', hint: 'Second supporting reason' },
    { key: 'reason3', hint: 'Third supporting reason' },
    { key: 'question', hint: 'Question to invite discussion' },
  ],
  expectedScore: [65, 80],
  bestWith: ['none', 'image'],
  example: `Bold prediction for 2024:

AI won't replace writers—it will replace writers who don't use AI.

Why I believe this:

• AI augments creativity, doesn't replace it
• The best content will combine human insight + AI speed
• Companies will expect AI proficiency as baseline

Do you agree or think I'm wrong?`,
}
```

#### Case Study Template Example
```typescript
{
  id: 'cs1-growth-breakdown',
  name: 'Growth Case Study',
  category: 'case-study',
  template: `How {subject} went from {start} to {end}:

A breakdown 🧵

{hook}`,
  placeholders: [
    { key: 'subject', hint: 'Company, person, or product' },
    { key: 'start', hint: 'Starting point' },
    { key: 'end', hint: 'Ending point' },
    { key: 'hook', hint: 'Compelling first insight' },
  ],
  expectedScore: [70, 85],
  bestWith: ['image'],
  example: `How @figma went from 0 to $20B:

A breakdown 🧵

Most people don't know they almost failed in year 2...`,
}
```

## Implementation Checklist

- [ ] Research proven tweet formats for each new category
- [ ] Add new category types to `TemplateCategory` union in `types.ts`
- [ ] Add new category labels to `categoryLabels` in `data.ts`
- [ ] Create 2-3 templates for predictions category
- [ ] Create 2-3 templates for case-study category
- [ ] Create 2 templates for before-after category
- [ ] Create 2 templates for lessons-learned category
- [ ] Create 2 templates for tool-review category
- [ ] Create 2 templates for comparison category
- [ ] Add 5-7 more templates to existing categories
- [ ] Write examples for at least 50% of new templates
- [ ] Validate all expectedScore ranges are realistic
- [ ] Test template rendering in browser
- [ ] Run TypeScript type checking
- [ ] Verify no console errors
- [ ] Update Content_Templates.md documentation (optional)
