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
import { Card } from '@annatarhe/lake-ui/card'
import { InputField } from '@annatarhe/lake-ui/form-input-field'

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
import { Card } from '@annatarhe/lake-ui/card'
import '@annatarhe/lake-ui/style.css'

<Card className="p-6">
  <h2>Welcome</h2>
  <p>Your content goes here</p>
</Card>
```

#### Modal
A flexible modal dialog component with portal rendering.

```tsx
import { Modal } from '@annatarhe/lake-ui/modal'
import '@annatarhe/lake-ui/style.css'

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
>
  <p>Are you sure you want to proceed?</p>
</Modal>
```

#### Navbar Container
A responsive navigation container with glass morphism styling.

```tsx
import { NavbarContainer } from '@annatarhe/lake-ui/navbar'
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
import { InputField } from '@annatarhe/lake-ui/form-input-field'
import '@annatarhe/lake-ui/style.css'

<InputField 
  label="Username"
  value={value}
  onChange={setValue}
  error="Username is required"
  required
/>
```

#### Number Field
Numeric input with increment/decrement controls.

```tsx
import { NumberField } from '@annatarhe/lake-ui/form-number-field'
import '@annatarhe/lake-ui/style.css'

<NumberField 
  label="Amount"
  value={amount}
  onChange={setAmount}
  min={0}
  max={100}
  step={5}
/>
```

#### Select Field
Customizable dropdown select with search functionality.

```tsx
import { SelectField } from '@annatarhe/lake-ui/form-select-field'
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
  onChange={setSelected}
  placeholder="Choose a framework"
/>
```

#### Multi Select
Multiple selection dropdown with tag display.

```tsx
import { MultiSelect } from '@annatarhe/lake-ui/form-multi-select'
import '@annatarhe/lake-ui/style.css'

const tags = [
  { value: 'javascript', label: 'JavaScript' },
  { value: 'typescript', label: 'TypeScript' },
  { value: 'react', label: 'React' }
]

<MultiSelect 
  label="Skills"
  options={tags}
  value={selectedTags}
  onChange={setSelectedTags}
  placeholder="Select your skills"
/>
```

#### Switch Field
Toggle switch for boolean values.

```tsx
import { SwitchField } from '@annatarhe/lake-ui/form-switch-field'
import '@annatarhe/lake-ui/style.css'

<SwitchField
  label="Enable notifications"
  checked={isEnabled}
  onChange={setIsEnabled}
/>
```

#### Textarea Field
Multi-line text input with auto-resize option.

```tsx
import { TextareaField } from '@annatarhe/lake-ui/form-textarea-field'
import '@annatarhe/lake-ui/style.css'

<TextareaField
  label="Description"
  value={description}
  onChange={setDescription}
  rows={4}
  maxLength={500}
/>
```

### Data Display Components

#### Table
Sortable data table with customizable columns.

```tsx
import { Table } from '@annatarhe/lake-ui/table'
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
import { Tooltip } from '@annatarhe/lake-ui/tooltip'
import '@annatarhe/lake-ui/style.css'

<Tooltip content="Save your changes" position="top">
  <button>💾 Save</button>
</Tooltip>
```

#### Contribution Wall
GitHub-style activity heatmap visualization.

```tsx
import { ContributionWall } from '@annatarhe/lake-ui/contribution-wall'
import '@annatarhe/lake-ui/style.css'

const contributions = [
  { date: '2024-01-01', count: 5 },
  { date: '2024-01-02', count: 12 },
  // ... more data
]

<ContributionWall
  data={contributions}
  year={2024}
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

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

MIT © [AnnatarHe](https://github.com/AnnatarHe)
