import type { Meta, StoryObj } from '@storybook/react-vite'
import { useRef, useState } from 'react'
import MultiSelect from './multi-select'

const meta: Meta<typeof MultiSelect> = {
  title: 'Form/MultiSelect',
  component: MultiSelect,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    error: { control: 'text' },
    searchable: { control: 'boolean' },
    clearable: { control: 'boolean' },
    maxValues: { control: 'number' },
  },
}

export default meta
type Story = StoryObj<typeof MultiSelect>

const defaultOptions = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
  { value: 'nextjs', label: 'Next.js' },
  { value: 'remix', label: 'Remix' },
]

export const Default: Story = {
  args: {
    label: 'Select frameworks',
    placeholder: 'Choose frameworks',
    options: defaultOptions,
    searchable: true,
    clearable: true,
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>([])
    const ref = useRef<HTMLDivElement>(null)
    return (
      <MultiSelect
        {...args}
        value={value}
        onChange={newValue => setValue(newValue as string[])}
        ref={(r) => {
          ref.current = r
        }}
      />
    )
  },
}

export const WithPreselectedValues: Story = {
  args: {
    label: 'Favorite frameworks',
    placeholder: 'Choose frameworks',
    options: defaultOptions,
    searchable: true,
    clearable: true,
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>(['react', 'nextjs'])
    const ref = useRef<HTMLDivElement>(null)
    return (
      <MultiSelect
        {...args}
        value={value}
        onChange={newValue => setValue(newValue as string[])}
        ref={(r) => {
          ref.current = r
        }}
      />
    )
  },
}

export const SingleSelect: Story = {
  args: {
    label: 'Select one framework',
    placeholder: 'Choose a framework',
    options: defaultOptions,
    searchable: true,
    clearable: true,
    maxValues: 1,
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')
    const ref = useRef<HTMLDivElement>(null)
    return (
      <MultiSelect
        {...args}
        value={value}
        onChange={newValue => setValue(newValue as string)}
        ref={(r) => {
          ref.current = r
        }}
      />
    )
  },
}

export const WithMaxValues: Story = {
  args: {
    label: 'Select up to 2 frameworks',
    placeholder: 'Choose frameworks',
    options: defaultOptions,
    searchable: true,
    clearable: true,
    maxValues: 2,
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>(['react'])
    const ref = useRef<HTMLDivElement>(null)
    return (
      <MultiSelect
        {...args}
        value={value}
        onChange={newValue => setValue(newValue as string[])}
        ref={(r) => {
          ref.current = r
        }}
      />
    )
  },
}

export const WithStringOptions: Story = {
  args: {
    label: 'Select colors',
    placeholder: 'Choose colors',
    options: ['Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange'],
    searchable: true,
    clearable: true,
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>([])
    const ref = useRef<HTMLDivElement>(null)
    return (
      <MultiSelect
        {...args}
        value={value}
        onChange={newValue => setValue(newValue as string[])}
        ref={(r) => {
          ref.current = r
        }}
      />
    )
  },
}

export const WithError: Story = {
  args: {
    label: 'Required selection',
    placeholder: 'Please select at least one option',
    options: defaultOptions,
    searchable: true,
    clearable: true,
    error: 'This field is required',
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>([])
    const ref = useRef<HTMLDivElement>(null)
    return (
      <MultiSelect
        {...args}
        value={value}
        onChange={newValue => setValue(newValue as string[])}
        ref={(r) => {
          ref.current = r
        }}
      />
    )
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled selection',
    placeholder: 'This field is disabled',
    options: defaultOptions,
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>(['react'])
    const ref = useRef<HTMLDivElement>(null)
    return (
      <MultiSelect
        {...args}
        value={value}
        onChange={newValue => setValue(newValue as string[])}
        ref={(r) => {
          ref.current = r
        }}
      />
    )
  },
}

export const Loading: Story = {
  args: {
    label: 'Loading options',
    placeholder: 'Options are loading',
    options: defaultOptions,
    loading: true,
  },
  render: (args) => {
    const [value, setValue] = useState<string[]>(['react'])
    const ref = useRef<HTMLDivElement>(null)
    return (
      <MultiSelect
        {...args}
        value={value}
        onChange={newValue => setValue(newValue as string[])}
        ref={(r) => {
          ref.current = r
        }}
      />
    )
  },
}
