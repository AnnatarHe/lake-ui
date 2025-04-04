import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import NumberField from './number-field'

const meta: Meta<typeof NumberField> = {
  title: 'Form/NumberField',
  component: NumberField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    error: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof NumberField>

export const Default: Story = {
  args: {
    label: 'Age',
    placeholder: 'Enter your age',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')
    return (
      <NumberField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const WithValue: Story = {
  args: {
    label: 'Quantity',
    placeholder: 'Enter quantity',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('42')
    return (
      <NumberField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const WithMinMax: Story = {
  args: {
    label: 'Rating (1-5)',
    placeholder: 'Enter rating',
    min: 1,
    max: 5,
  },
  render: (args) => {
    const [value, setValue] = useState<string>('3')
    return (
      <NumberField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const WithError: Story = {
  args: {
    label: 'Price',
    placeholder: 'Enter price',
    error: 'Price must be greater than zero',
  },
  render: (args) => {
    const [value, setValue] = useState<string>('0')
    return (
      <NumberField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Number Field',
    placeholder: 'This field is disabled',
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState<string>('')
    return (
      <NumberField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const Loading: Story = {
  args: {
    label: 'Loading Number Field',
    placeholder: 'This field is loading',
    loading: true,
  },
  render: (args) => {
    const [value, setValue] = useState<string>('100')
    return (
      <NumberField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}
