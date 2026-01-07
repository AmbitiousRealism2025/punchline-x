# QA Fix Request

**Status**: REJECTED
**Date**: 2026-01-07T03:52:00Z
**QA Session**: 2

---

## Critical Issues to Fix

### 1. Add Test Infrastructure

**Problem**: No test files or test framework configured. QA Acceptance Criteria requires unit, integration, and E2E tests.

**Location**: Entire project

**Required Fix**:

1. Install Vitest test framework
2. Add test script to package.json
3. Create unit test files for endpoint, hook, and serialization helpers
4. Ensure tests cover valid input, error cases, and TinyBase persistence

**Verification**: Run `npm test` and confirm all tests pass

---

### 2. Configure Valid API Key

**Problem**: `.env.local` contains placeholder "your-key-here" instead of real ZAI API key

**Location**: `app/.env.local` line 3

**Required Fix**:

1. Add comments in `.env.local` explaining where to get API key
2. Create `.env.local.example` template
3. Update README.md with setup instructions

**Verification**: API endpoint should return alternatives within 10 seconds

---

### 3. Document Voice Preservation Testing

**Problem**: Voice preservation cannot be verified without working API or test documentation

**Required Fix**:

Create `docs/voice-preservation-testing.md` with:
- Test procedure for 10+ diverse tweets
- Criteria for voice preservation
- Expected pass rate (≥90%)

**Verification**: Manual review confirms testing procedure is clear

---

## After Fixes

1. Commit: `fix: add test infrastructure and API key documentation (qa-requested)`
2. QA will automatically re-run validation
3. Loop continues until approved

---

**QA Agent Session**: 2
**Status**: Awaiting fixes
