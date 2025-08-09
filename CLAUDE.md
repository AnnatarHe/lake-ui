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
- **Form Components** (`src/form/`): InputField, NumberField, SelectField, MultiSelect, SwitchField, TextareaField
- **Layout Components**: Card, Modal, NavbarContainer  
- **Data Visualization**: ContributionWall (GitHub-style activity chart)
- **Interactive Components**: Tooltip, Table
- **Utilities**: `src/utils/cn.ts` for className merging, `src/hooks/` for custom hooks

### Export Pattern
Each component is exported as a separate package entry point:
```typescript
import { Card } from '@annatarhe/lake-ui/card'
import { InputField } from '@annatarhe/lake-ui/form-input-field'
```

CSS must be imported separately:
```typescript
import '@annatarhe/lake-ui/style.css'
```

### Styling Approach
- Uses Tailwind CSS with custom `cn()` utility (located in `src/utils/cn.ts`)
- Dark mode support throughout all components using Tailwind's dark: variants
- Glass morphism effects with backdrop-blur and transparency
- Consistent design tokens for spacing, colors, and border radius

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
Form components support error states with consistent error prop:
```typescript
error?: string | boolean
```

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