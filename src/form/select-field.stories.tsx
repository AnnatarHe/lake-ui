import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import SelectField from './select-field'

const meta: Meta<typeof SelectField> = {
  title: 'Form/SelectField',
  component: SelectField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    error: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SelectField>

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

export const Default: Story = {
  args: {
    label: 'Select an option',
    options: defaultOptions,
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <SelectField
        {...args}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    )
  },
}

export const WithPreselectedValue: Story = {
  args: {
    label: 'Favorite Color',
    options: [
      { value: 'red', label: 'Red' },
      { value: 'green', label: 'Green' },
      { value: 'blue', label: 'Blue' },
      { value: 'yellow', label: 'Yellow' },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState('blue')
    return (
      <SelectField
        {...args}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    )
  },
}

export const WithManyOptions: Story = {
  args: {
    label: 'Country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada' },
      { value: 'mx', label: 'Mexico' },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'fr', label: 'France' },
      { value: 'de', label: 'Germany' },
      { value: 'jp', label: 'Japan' },
      { value: 'cn', label: 'China' },
      { value: 'in', label: 'India' },
      { value: 'br', label: 'Brazil' },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <SelectField
        {...args}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    )
  },
}

export const WithError: Story = {
  args: {
    label: 'Required Field',
    options: defaultOptions,
    error: 'Please select an option',
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <SelectField
        {...args}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    )
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    options: defaultOptions,
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <SelectField
        {...args}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    )
  },
}

export const Loading: Story = {
  args: {
    label: 'Loading Options',
    options: defaultOptions,
    loading: true,
  },
  render: (args) => {
    const [value, setValue] = useState('option1')
    return (
      <SelectField
        {...args}
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    )
  },
}
