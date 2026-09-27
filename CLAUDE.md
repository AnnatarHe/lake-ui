# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lake UI is a modern React component library with TypeScript support, Tailwind CSS styling, and comprehensive testing. The library provides tree-shakable components with individual package exports.

## Development Commands

```bash
# Install dependencies (uses pnpm)
pnpm install

# Development server with hot reload
pnpm dev

# Build library for production
pnpm build

# Run tests
pnpm test

# Run tests with coverage report
pnpm test:coverage

# Run a single test file
pnpm test src/form/input-field.test.tsx

# Lint code
pnpm lint

# Run Storybook for component development
pnpm storybook

# Build Storybook static site
pnpm build-storybook
```

## Architecture

### Component Structure
Components follow a consistent pattern with each having:
- `index.tsx` - Main component implementation
- `[component].stories.tsx` - Storybook stories
- `[component].test.tsx` - Vitest tests using React Testing Library

### Component Categories
- **Form Components** (`src/form/`): InputField, NumberField, SelectField, MultiSelect, SwitchField, TextareaField, RadioGroup
- **Layout Components**: Card, Modal, Sheet, NavbarContainer
- **Data Visualization**: ContributionWall (GitHub-style activity chart)
- **Interactive Components**: Tooltip, Table, DropdownButton
- **Utilities**: `src/utils/cn.ts` for className merging, `src/hooks/` for custom hooks

### Export Pattern
Each component is exported as a separate package entry point:
```typescript
import Card from '@annatarhe/lake-ui/card'
import InputField from '@annatarhe/lake-ui/form-input-field'
import Sheet from '@annatarhe/lake-ui/sheet'
import DropdownButton from '@annatarhe/lake-ui/dropdown-button'
import RadioGroup from '@annatarhe/lake-ui/form-radio-group'
```

Consumers import the theme once from their Tailwind v4 entry (top level, not inside `@layer`):
```css
@import 'tailwindcss';
@import '@annatarhe/lake-ui/theme.css';
```
`./style.css` is a deprecated empty file kept only so old imports resolve.

### Styling Approach
- Components emit Tailwind class names only; the consumer's Tailwind build compiles them. `src/theme.css` (copied to `dist/theme.css` by `scripts/copy-theme.mjs`) adds `@source "./**/*.js"` so consumers need no `@source` of their own.
- Colors, radii, shadows and blur come from semantic tokens: `--lake-*` variables in `@layer base` (zero specificity, dark values under `.dark, [data-theme=dark]`) exposed through `@theme inline` as `bg-lake-surface`, `text-lake-fg-muted`, `border-lake-line`, `ring-lake-ring`, `rounded-lake-control`, `shadow-lake-card`, `backdrop-blur-lake`, etc.
- Never use raw palette classes (`gray-*`, `blue-*`, `red-*`) or `dark:` variants in components; add or reuse a token instead. Defaults must keep matching the previous gray/blue look.
- Do not add custom `--text-*` size names: tailwind-merge would treat them as colors.
- `cn()` (`src/utils/cn.ts`, exported from `./utils`) extends tailwind-merge with the `lake-*` radius/shadow/blur scales. Always merge `className` last.
- Portaled UI resolves its host after mount (`src/hooks/usePortalHost.ts`) and falls back to `document.body`.
- Every user-facing string must be overridable by a label prop with an English default.
- Storybook compiles Tailwind through `@tailwindcss/vite` (`.storybook/preview.css`); the toolbar "Theme" switches Light / Dark / Editorial light / Editorial dark (`.storybook/editorial.css`).

### Testing Strategy
- Vitest with React Testing Library and Happy DOM environment
- Tests focus on user behavior and accessibility
- Test setup file: `tests/setup.ts`
- Coverage includes all `src/**/*.{ts,tsx}` files

### Build Configuration
- Vite for bundling with React SWC plugin
- TypeScript with strict mode enabled
- Path alias `@/` maps to `src/`
- External dependencies: react, react-dom, lucide-react
- Generates ES modules with TypeScript definitions

### Type Safety
- Strict TypeScript configuration
- No unused locals/parameters allowed
- All components have proper type definitions exported

## Important Conventions

### Component Props Pattern
```typescript
interface ComponentProps {
  className?: string // Always allow className override
  children?: React.ReactNode
  // Other specific props...
}
```

### Error Handling in Forms
Form components support error states with a consistent error prop, rendered through
`FieldError` and linked with `aria-invalid`/`aria-describedby` via `useFieldIds`
(`src/form/field.tsx`):
```typescript
error?: string
```

### Client Boundaries
Only modules that use state, effects, refs or DOM event handlers start with `'use client'`.
Server-safe components (Card, NavbarContainer, ContributionWall, the form inputs) must not.
The Vite build re-emits the directive per module and `scripts/check-package.mjs` asserts
that each package entry keeps the same boundary as its source.

### Styling Pattern
Always use the `cn()` utility for combining classes:
```typescript
className={cn(
  'base-styles',
  variant && 'variant-styles',
  className // Allow prop overrides last
)}
```

### Testing Pattern
Tests should cover:
1. Default rendering
2. User interactions
3. Error states
4. Loading states (where applicable)
5. Accessibility attributes

## Commit Convention

You must follow the Conventional Commits rules, ensuring that the scope and module are included.

For example:

```md
fix(home): add price link on home page
feat(ai): add AI module
refactor(cell): update cell module for better maintenance
perf(parser): improve parser performance by over 30%
```

Additional examples for this project:
```md
fix(form): resolve input validation issue
feat(table): add sorting functionality
refactor(modal): improve portal implementation
perf(contribution-wall): optimize rendering
```