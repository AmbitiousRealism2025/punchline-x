import { templates } from './src/lib/templates/data'
import type { TemplateCategory } from './src/lib/templates/types'

// Valid categories from types.ts
const validCategories: TemplateCategory[] = [
  'contrarian',
  'list',
  'story',
  'thread',
  'poll',
  'value',
  'question',
  'milestone',
  'teaching',
  'predictions',
  'case-study',
  'before-after',
  'lessons-learned',
  'tool-review',
  'comparison',
  'unpopular-opinion',
]

interface ValidationResult {
  passed: boolean
  errors: string[]
  warnings: string[]
}

function validateTemplates(): ValidationResult {
  const errors: string[] = []
  const warnings: string[] = []

  console.log('🔍 Validating template library...\n')

  // 1. Check template count >= 30
  console.log(`✓ Template count: ${templates.length}`)
  if (templates.length < 30) {
    errors.push(`Template count (${templates.length}) is less than required minimum of 30`)
  }

  // 2. Check all template IDs are unique
  const idSet = new Set<string>()
  const duplicateIds: string[] = []
  templates.forEach((template) => {
    if (idSet.has(template.id)) {
      duplicateIds.push(template.id)
    }
    idSet.add(template.id)
  })
  if (duplicateIds.length > 0) {
    errors.push(`Duplicate template IDs found: ${duplicateIds.join(', ')}`)
  } else {
    console.log(`✓ All template IDs are unique (${templates.length} templates)`)
  }

  // 3. Validate expectedScore values
  templates.forEach((template) => {
    const [min, max] = template.expectedScore
    if (typeof min !== 'number' || typeof max !== 'number') {
      errors.push(
        `Template "${template.id}": expectedScore must be [number, number], got [${typeof min}, ${typeof max}]`
      )
    } else if (min < 0 || min > 100) {
      errors.push(
        `Template "${template.id}": expectedScore min (${min}) must be between 0 and 100`
      )
    } else if (max < 0 || max > 100) {
      errors.push(
        `Template "${template.id}": expectedScore max (${max}) must be between 0 and 100`
      )
    } else if (min >= max) {
      errors.push(
        `Template "${template.id}": expectedScore min (${min}) must be less than max (${max})`
      )
    }
  })
  console.log(`✓ All expectedScore values validated`)

  // 4. Validate placeholders match template string
  templates.forEach((template) => {
    // Extract placeholders from template string
    const placeholderPattern = /\{([^}]+)\}/g
    const templatePlaceholders = new Set<string>()
    let match
    while ((match = placeholderPattern.exec(template.template)) !== null) {
      templatePlaceholders.add(match[1])
    }

    // Check if all template placeholders have corresponding entries
    const definedPlaceholders = new Set(template.placeholders.map((p) => p.key))

    templatePlaceholders.forEach((placeholder) => {
      if (!definedPlaceholders.has(placeholder)) {
        errors.push(
          `Template "${template.id}": placeholder {${placeholder}} in template string has no matching entry in placeholders array`
        )
      }
    })

    // Check for unused placeholder definitions (warning only)
    definedPlaceholders.forEach((placeholder) => {
      if (!templatePlaceholders.has(placeholder)) {
        warnings.push(
          `Template "${template.id}": placeholder "${placeholder}" defined but not used in template string`
        )
      }
    })
  })
  console.log(`✓ All template placeholders validated`)

  // 5. Validate all category values match TemplateCategory type
  templates.forEach((template) => {
    if (!validCategories.includes(template.category)) {
      errors.push(
        `Template "${template.id}": category "${template.category}" is not a valid TemplateCategory`
      )
    }
  })
  console.log(`✓ All template categories validated`)

  // Additional checks
  console.log('\n📊 Additional Statistics:')

  // Count templates by category
  const categoryCounts = new Map<string, number>()
  templates.forEach((template) => {
    const count = categoryCounts.get(template.category) || 0
    categoryCounts.set(template.category, count + 1)
  })

  console.log('\nTemplates per category:')
  Array.from(categoryCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .forEach(([category, count]) => {
      console.log(`  ${category}: ${count}`)
    })

  // Count templates with examples
  const templatesWithExamples = templates.filter((t) => t.example).length
  const examplePercentage = ((templatesWithExamples / templates.length) * 100).toFixed(1)
  console.log(`\nTemplates with examples: ${templatesWithExamples}/${templates.length} (${examplePercentage}%)`)

  // Summary
  console.log('\n' + '='.repeat(50))
  if (errors.length === 0 && warnings.length === 0) {
    console.log('✅ ALL VALIDATIONS PASSED!')
    console.log(`   - ${templates.length} total templates`)
    console.log(`   - ${validCategories.length} categories`)
    console.log(`   - ${templatesWithExamples} templates with examples (${examplePercentage}%)`)
  } else {
    if (errors.length > 0) {
      console.log(`❌ VALIDATION FAILED with ${errors.length} error(s)`)
      console.log('\nErrors:')
      errors.forEach((error, i) => {
        console.log(`  ${i + 1}. ${error}`)
      })
    }
    if (warnings.length > 0) {
      console.log(`\n⚠️  ${warnings.length} warning(s):`)
      warnings.forEach((warning, i) => {
        console.log(`  ${i + 1}. ${warning}`)
      })
    }
  }
  console.log('='.repeat(50))

  return {
    passed: errors.length === 0,
    errors,
    warnings,
  }
}

// Run validation
const result = validateTemplates()
process.exit(result.passed ? 0 : 1)
