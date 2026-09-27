# Lake UI [![Publish](https://github.com/AnnatarHe/lake-ui/actions/workflows/publish.yaml/badge.svg)](https://github.com/AnnatarHe/lake-ui/actions/workflows/publish.yaml) [![codecov](https://codecov.io/gh/AnnatarHe/lake-ui/graph/badge.svg?token=T9HO7II4PJ)](https://codecov.io/gh/AnnatarHe/lake-ui)

A modern React component library built with TypeScript, Tailwind CSS, and tree-shakable architecture. Lake UI provides elegant, accessible components with built-in dark mode support and glass morphism effects.

## Features

- 🎨 Modern design with Tailwind CSS
- 🌙 Built-in dark mode support
- 📦 Tree-shakable exports for optimal bundle size
- 🔒 Full TypeScript support
- ♿ Accessible components following ARIA guidelines
- 🧪 Comprehensive test coverage
- 📚 Storybook documentation

## Installation

```bash
# Using pnpm (recommended)
pnpm add @annatarhe/lake-ui

# Using npm
npm install @annatarhe/lake-ui

# Using yarn
yarn add @annatarhe/lake-ui
```

## Getting Started

Lake UI ships Tailwind CSS class names plus a small theme file; your Tailwind CSS v4
build compiles them. Import the theme once, at the top level of your Tailwind entry
stylesheet (not inside `@layer`):

```css
/* app.css */
@import 'tailwindcss';
@import 'tw-animate-css'; /* optional: entrance animations (animate-in, fade-in, …) */
@import '@annatarhe/lake-ui/theme.css';

/* Components no longer use `dark:` variants, but your own code may. */
@custom-variant dark (&:where(.dark, .dark *));
```

`theme.css` registers its own `@source` for the built components, so you do not need
an `@source` pointing into `node_modules`.

Then import and use components as needed:

```tsx
import Card from '@annatarhe/lake-ui/card'
import InputField from '@annatarhe/lake-ui/form-input-field'

function App() {
  return (
    <Card>
      <InputField label="Email" type="email" />
    </Card>
  )
}
```

> **Upgrading from 0.0.32 or earlier:** `@annatarhe/lake-ui/style.css` is now an empty,
> deprecated file. Replace it with the `theme.css` import above; without it the
> `lake-*` utilities are not generated and components render unstyled.

## Theming

Every component reads semantic tokens instead of hard-coded palette colors. The
defaults reproduce the previous gray/blue look in light and dark mode. Dark values
apply under `.dark` or `[data-theme=dark]` (on `<html>` or any subtree).

| Group | Tokens (`--lake-*` variable → `*-lake-*` utility) |
| --- | --- |
| Surfaces | `canvas`, `surface`, `surface-raised`, `surface-muted`, `field`, `overlay` |
| Text | `fg`, `fg-muted`, `fg-subtle` |
| Lines | `line`, `line-strong`, `ring` |
| Accent | `accent`, `accent-hover`, `accent-fg`, `accent-text`, `accent-soft` |
| Status | `danger`, `danger-fg`, `danger-soft`, `success`, `success-soft`, `warning`, `warning-soft` |
| Shape | `--lake-radius-control` → `rounded-lake-control`, `--lake-radius-panel` → `rounded-lake-panel` |
| Depth | `--lake-shadow-card` → `shadow-lake-card`, `--lake-shadow-overlay` → `shadow-lake-overlay`, `--lake-blur` → `backdrop-blur-lake` |

Color tokens work with every color utility and opacity modifier, for example
`bg-lake-surface`, `text-lake-fg-muted`, `border-lake-line`, `ring-lake-ring`,
`fill-lake-accent/25`.

The defaults live in a zero-specificity rule inside `@layer base`, so any override
wins. Override the variables, not the utilities:

```css
:root {
  --lake-canvas: #f7f5f0;
  --lake-surface: #fffefb;
  --lake-fg: #1c1a17;
  --lake-accent: #60a5fa;
  --lake-accent-fg: #0b1526;
  --lake-radius-control: 8px;
  --lake-blur: 0px;
}

.dark {
  --lake-canvas: #141311;
  --lake-surface: #1b1a17;
  --lake-fg: #ece7df;
}
```

Storybook's theme toolbar switches between the default light/dark tokens and an
"editorial" preset (`.storybook/editorial.css`) that shows a full override.

### Merging classes

`@annatarhe/lake-ui/utils` exports the `cn()` helper the components use. It extends
`tailwind-merge` so the theme scales conflict correctly (`rounded-lg` vs
`rounded-lake-control`, `shadow-sm` vs `shadow-lake-card`, `backdrop-blur-md` vs
`backdrop-blur-lake`). Components merge your `className` last, so it always wins.

```ts
import { cn, lakeMergeConfig } from '@annatarhe/lake-ui/utils'
import { extendTailwindMerge } from 'tailwind-merge'

cn('rounded-lg shadow-sm', 'rounded-lake-control') // 'shadow-sm rounded-lake-control'
const twMerge = extendTailwindMerge(lakeMergeConfig) // combine with your own config
```

## Available Components

### Layout Components

#### Card
A versatile container component with glass morphism effects.

```tsx
import Card from '@annatarhe/lake-ui/card'

<Card as="section" aria-labelledby="welcome" className="p-6">
  <h2 id="welcome">Welcome</h2>
  <p>Your content goes here</p>
</Card>
```

#### Modal
A flexible modal dialog component with portal rendering.

```tsx
import Modal from '@annatarhe/lake-ui/modal'

// Optional: add <div data-st-role="modal"></div> to your body (falls back to document.body)

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  size="sm"
  footer={<button onClick={handleClose}>Done</button>}
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

#### Sheet
A slide-in drawer panel from the side of the screen with backdrop overlay.

```tsx
import Sheet from '@annatarhe/lake-ui/sheet'

// Optional: add <div data-st-role="sheet"></div> to your body (falls back to document.body)

<Sheet
  isOpen={isOpen}
  onClose={handleClose}
  title="Settings"
  side="right"
>
  <p>Sheet content goes here</p>
</Sheet>
```

#### Navbar Container
A responsive navigation container with glass morphism styling.

```tsx
import NavbarContainer from '@annatarhe/lake-ui/navbar-container'

<NavbarContainer animated={false} innerClassName="max-w-5xl">
  <nav className="flex items-center justify-between">
    <h1>Logo</h1>
    <ul className="flex gap-4">
      <li>Home</li>
      <li>About</li>
    </ul>
  </nav>
</NavbarContainer>
```

### Form Components

#### Input Field
Text input with label, error state, and validation support.

```tsx
import InputField from '@annatarhe/lake-ui/form-input-field'

<InputField 
  label="Username"
  value={value}
  onChange={(event) => setValue(event.target.value)}
  error="Username is required"
  required
/>
```

#### Number Field
Native numeric input with min, max, and step support.

```tsx
import NumberField from '@annatarhe/lake-ui/form-number-field'

<NumberField 
  label="Amount"
  value={amount}
  onChange={(event) => setAmount(event.target.valueAsNumber)}
  min={0}
  max={100}
  step={5}
/>
```

#### Select Field
Native select with styled options and loading support.

```tsx
import SelectField from '@annatarhe/lake-ui/form-select-field'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' }
]

<SelectField 
  label="Framework"
  options={options}
  value={selected}
  onChange={(event) => setSelected(event.target.value)}
  placeholder="Choose a framework"
/>
```

`placeholder` renders a disabled empty first option. The closed select is styled with
Tailwind only; browsers that support `appearance: base-select` also get a themed
picker. `className` styles the wrapper, `selectClassName` the `<select>`.

#### Multi Select
Multiple selection dropdown with tag display.

```tsx
import MultiSelect from '@annatarhe/lake-ui/form-multi-select'

const tags = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' }
]

<MultiSelect 
  label="Skills"
  options={tags}
  value={selectedTags}
  onChange={(value) => setSelectedTags(Array.isArray(value) ? value : [])}
  placeholder="Select your skills"
  searchPlaceholder="Search skills"
  noResultsLabel="No skills found"
  clearLabel="Clear skills"
/>
```

#### Switch Field
Toggle switch for boolean values.

```tsx
import SwitchField from '@annatarhe/lake-ui/form-switch-field'

<SwitchField
  label="Enable notifications"
  value={isEnabled}
  onChange={setIsEnabled}
/>
```

#### Textarea Field
Multi-line text input with configurable rows.

```tsx
import TextareaField from '@annatarhe/lake-ui/form-textarea-field'

<TextareaField
  label="Description"
  value={description}
  onChange={setDescription}
  rows={4}
  maxLength={500}
/>
```

#### Radio Group
Modern styled radio group for single selection with card-style options.

```tsx
import RadioGroup from '@annatarhe/lake-ui/form-radio-group'

const plans = [
  { value: 'free', label: 'Free', description: 'Basic features for personal use' },
  { value: 'pro', label: 'Pro', description: 'Advanced features for professionals' },
  { value: 'enterprise', label: 'Enterprise', description: 'Custom solutions for teams' }
]

<RadioGroup
  label="Select a plan"
  options={plans}
  value={selectedPlan}
  onChange={setSelectedPlan}
/>
```

### Interactive Components

#### Dropdown Button
A split button with a dropdown menu for alternative actions.

```tsx
import DropdownButton from '@annatarhe/lake-ui/dropdown-button'

<DropdownButton
  onClick={() => handleDownload('default')}
  onSelect={(value) => handleDownload(value)}
  options={[
    { label: 'Download 7 days', value: '7d' },
    { label: 'Download 30 days', value: '30d' },
    { label: 'Download 90 days', value: '90d' }
  ]}
>
  Download
</DropdownButton>
```

The chevron button is named by `menuLabel` (default `More options`); Escape closes the
menu.

### Data Display Components

#### Table
Sortable data table with customizable columns.

```tsx
import Table from '@annatarhe/lake-ui/table'

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role', sortable: true }
]

const data = [
  { name: 'John Doe', email: 'john@example.com', role: 'Admin' },
  { name: 'Jane Smith', email: 'jane@example.com', role: 'User' }
]

<Table
  data={data}
  columns={columns}
  onSort={handleSort}
  rowKey={row => row.email}
  emptyMessage="No members yet"
  endMessage="That's everyone"
  loadingLabel="Loading members"
/>
```

#### Tooltip
Contextual information overlay on hover or focus.

```tsx
import Tooltip from '@annatarhe/lake-ui/tooltip'

<Tooltip content="Save your changes" side="top" delay={300}>
  <button>💾 Save</button>
</Tooltip>
```

A single element child becomes the trigger directly (no wrapper element); it must
accept `ref` and spread props onto a DOM node, as native elements and
`forwardRef`/React 19 ref-forwarding components do. Other children are wrapped in an
`inline-flex` span. The tooltip opens on hover and focus, closes on Escape, and sets
`aria-describedby` on the trigger only while open. It portals into
`[data-st-role=tooltip]` when present, else `document.body`.

#### Contribution Wall
GitHub-style activity heatmap visualization.

```tsx
import ContributionWall from '@annatarhe/lake-ui/contribution-wall'

const contributions = [
  { date: Date.UTC(2024, 0, 1) / 1000, count: 5 },
  { date: Date.UTC(2024, 0, 2) / 1000, count: 12 },
  // ... more data
]

<ContributionWall
  data={contributions}
  startDate={new Date(Date.UTC(2024, 0, 1))}
  colorScheme="accent"
  labels={{ less: 'Less', more: 'More', utc: '(UTC)' }}
  formatTooltip={(date, count) => `${count} highlights on ${date.toDateString()}`}
  locale="en-US"
/>
```

`accent` follows the theme tokens and is recommended. `green` (the default), `blue`,
`purple` and `orange` read their light and dark palettes from `--lake-wall-*`
variables in `theme.css`, so the chart renders the same on the server and client.

## TypeScript Support

All components are fully typed with TypeScript. Type definitions are automatically included when you install the package.

```tsx
import type { InputFieldProps } from '@annatarhe/lake-ui/form-input-field'

const MyInput: React.FC<InputFieldProps> = (props) => {
  // Your custom wrapper
}
```

## Toolchain compatibility

Development and CI use Node 26 and the exact pnpm version in `packageManager`.
React and React DOM remain React 19 peers. Lucide supports the retained 0.475.x
range, 0.539.x, and 1.41.x or newer within major 1; development uses 1.41.
Runtime utilities remain regular dependencies and are externalized in the build.

ESLint stays on 9.x because `eslint-plugin-react` does not support ESLint 10.
TypeScript stays on 5.9.x because the declaration tooling's `tsconfck` dependency
requires TypeScript 5. These compatibility holds should be revisited when their
upstream peer ranges change; installation does not override peer requirements.
The pnpm build-script allowlist covers only SWC and esbuild.

## Development

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Run tests
pnpm test

# Build library
pnpm build

# Run Storybook
pnpm storybook
```

Validate the distributable after building with `pnpm check:package --matrix`.
This packs the library and checks isolated consumer installs against the retained
and current peer versions, including TypeScript resolution and server rendering.
The command downloads public npm dependencies into temporary directories.
CI runs on pull requests and, through the publish workflow, on `main` pushes.
Publishing remains gated on validation and a newly created release.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT © [AnnatarHe](https://github.com/AnnatarHe)


### Accessible overlays

`Modal` and `Sheet` share keyboard focus containment, focus restoration, Escape and
backdrop dismissal, and a reference-counted body scroll lock. Existing portal
selectors remain `[data-st-role=modal]` and `[data-st-role=sheet]`; pass `selector`
to share a custom host. When no element matches, the overlay portals into
`document.body`. Portals resolve after mounting, so server rendering stays safe.

Both components accept optional `footer`, `hideCloseButton`, `locked`, `role`,
`ariaLabel`, `descriptionId`, `initialFocus`, `closeLabel`, `className`,
`overlayClassName`, `headerClassName`, `bodyClassName`, and `footerClassName` props.
`footer` renders a row pinned below the scrolling body, which suits action buttons.
Initial focus goes to the `initialFocus` selector, else an element with
`data-autofocus`, else the first enabled input, textarea or select in the body, else
the panel itself (never the close button). `locked` disables the close button and
blocks Escape and backdrop dismissal; an explicit action in your content can still
update `isOpen`. Use it while submitting or displaying a one-time credential.
Untitled sheets use `ariaLabel` (default `Panel`). `Sheet` retains its `side` and
`width` props; `Modal` adds `size` (`sm`, `md`, `lg`, `xl` (default, `max-w-4xl`),
`full`).

```tsx
<Modal
  title="Confirm archive"
  isOpen={open}
  onClose={() => setOpen(false)}
  locked={pending}
  role="alertdialog"
  descriptionId="archive-description"
  initialFocus="[data-cancel]"
>
  <p id="archive-description">This will archive the selected item.</p>
  <button data-cancel disabled={pending} onClick={() => setOpen(false)}>Cancel</button>
  <button disabled={pending} onClick={archive}>Archive</button>
</Modal>
```

