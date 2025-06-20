# Lake-ui [![Publish](https://github.com/AnnatarHe/lake-ui/actions/workflows/publish.yaml/badge.svg)](https://github.com/AnnatarHe/lake-ui/actions/workflows/publish.yaml) [![codecov](https://codecov.io/gh/AnnatarHe/lake-ui/graph/badge.svg?token=T9HO7II4PJ)](https://codecov.io/gh/AnnatarHe/lake-ui)

A modern, AI-powered, absolutely lightweight UI component library for React applications.

## Installation

```bash
pnpm add @annatarhe/lake-ui
```

## Available Components

### Card
```tsx
import { Card } from '@annatarhe/lake-ui/card'

<Card>
  {/* Your content */}
</Card>
```

### Form Components

#### Input Field
```tsx
import { InputField } from '@annatarhe/lake-ui/form-input-field'

<InputField 
  label="Username"
  value={value}
  onChange={setValue}
/>
```

#### Number Field
```tsx
import { NumberField } from '@annatarhe/lake-ui/form-number-field'

<NumberField 
  label="Amount"
  value={amount}
  onChange={setAmount}
/>
```

#### Select Field
```tsx
import { SelectField } from '@annatarhe/lake-ui/form-select-field'
import '@annatarhe/lake-ui/style.css'

<SelectField 
  label="Category"
  options={options}
  value={selected}
  onChange={setSelected}
/>
```

#### Multi Select
```tsx
import { MultiSelect } from '@annatarhe/lake-ui/form-multi-select'

<MultiSelect 
  label="Tags"
  options={options}
  value={selectedTags}
  onChange={setSelectedTags}
/>
```

### Modal
```tsx
import { Modal } from '@annatarhe/lake-ui/modal'

<Modal
  isOpen={isOpen}
  onClose={handleClose}
>
  {/* Modal content */}
</Modal>
```

### Navbar
```tsx
import { NavbarContainer } from '@annatarhe/lake-ui/navbar'

<NavbarContainer>
  {/* Navigation items */}
</NavbarContainer>
```

### Table
```tsx
import { Table } from '@annatarhe/lake-ui/table'

<Table
  data={data}
  columns={columns}
/>
```

### Tooltip
```tsx
import { Tooltip } from '@annatarhe/lake-ui/tooltip'

<Tooltip content="Helpful information">
  <button>Hover me</button>
</Tooltip>
```

## License

MIT © [AnnatarHe](https://github.com/AnnatarHe)
