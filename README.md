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

First, import the required CSS file in your application entry point:

```tsx
import '@annatarhe/lake-ui/style.css'
```

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

## Available Components

### Layout Components

#### Card
A versatile container component with glass morphism effects.

```tsx
import Card from '@annatarhe/lake-ui/card'
import '@annatarhe/lake-ui/style.css'

<Card className="p-6">
  <h2>Welcome</h2>
  <p>Your content goes here</p>
</Card>
```

#### Modal
A flexible modal dialog component with portal rendering.

```tsx
import Modal from '@annatarhe/lake-ui/modal'
import '@annatarhe/lake-ui/style.css'

// Add <div data-st-role="modal"></div> to your HTML body

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

#### Sheet
A slide-in drawer panel from the side of the screen with backdrop overlay.

```tsx
import Sheet from '@annatarhe/lake-ui/sheet'
import '@annatarhe/lake-ui/style.css'

// Add <div data-st-role="sheet"></div> to your HTML body

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
import '@annatarhe/lake-ui/style.css'

<NavbarContainer>
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
import '@annatarhe/lake-ui/style.css'

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
import '@annatarhe/lake-ui/style.css'

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
import '@annatarhe/lake-ui/style.css'

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

#### Multi Select
Multiple selection dropdown with tag display.

```tsx
import MultiSelect from '@annatarhe/lake-ui/form-multi-select'
import '@annatarhe/lake-ui/style.css'

const tags = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' }
]

<MultiSelect 
  label="Skills"
  options={tags}
  ref={() => {}}
  value={selectedTags}
  onChange={(value) => setSelectedTags(Array.isArray(value) ? value : [])}
  placeholder="Select your skills"
/>
```

#### Switch Field
Toggle switch for boolean values.

```tsx
import SwitchField from '@annatarhe/lake-ui/form-switch-field'
import '@annatarhe/lake-ui/style.css'

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
import '@annatarhe/lake-ui/style.css'

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
import '@annatarhe/lake-ui/style.css'

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
import '@annatarhe/lake-ui/style.css'

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

### Data Display Components

#### Table
Sortable data table with customizable columns.

```tsx
import Table from '@annatarhe/lake-ui/table'
import '@annatarhe/lake-ui/style.css'

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
/>
```

#### Tooltip
Contextual information overlay on hover or focus.

```tsx
import Tooltip from '@annatarhe/lake-ui/tooltip'
import '@annatarhe/lake-ui/style.css'

<Tooltip content="Save your changes" side="top">
  <button>💾 Save</button>
</Tooltip>
```

#### Contribution Wall
GitHub-style activity heatmap visualization.

```tsx
import ContributionWall from '@annatarhe/lake-ui/contribution-wall'
import '@annatarhe/lake-ui/style.css'

const contributions = [
  { date: Date.UTC(2024, 0, 1) / 1000, count: 5 },
  { date: Date.UTC(2024, 0, 2) / 1000, count: 12 },
  // ... more data
]

<ContributionWall
  data={contributions}
  startDate={new Date(Date.UTC(2024, 0, 1))}
  colorScheme="green"
/>
```

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
