import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import RadioGroup from './radio-group'

const meta: Meta<typeof RadioGroup> = {
  title: 'Form/RadioGroup',
  component: RadioGroup,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    error: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof RadioGroup>

const defaultOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' },
]

export const Default: Story = {
  args: {
    label: 'Choose an option',
    options: defaultOptions,
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return <RadioGroup {...args} value={value} onChange={setValue} />
  },
}

export const WithPreselectedValue: Story = {
  args: {
    label: 'Choose an option',
    options: defaultOptions,
  },
  render: (args) => {
    const [value, setValue] = useState('option2')
    return <RadioGroup {...args} value={value} onChange={setValue} />
  },
}

export const WithDescriptions: Story = {
  args: {
    label: 'Select a plan',
    options: [
      { value: 'free', label: 'Free', description: 'Basic features for personal use' },
      { value: 'pro', label: 'Pro', description: 'Advanced features for professionals' },
      { value: 'enterprise', label: 'Enterprise', description: 'Custom solutions for teams' },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState('free')
    return <RadioGroup {...args} value={value} onChange={setValue} />
  },
}

export const WithError: Story = {
  args: {
    label: 'Required selection',
    options: defaultOptions,
    error: 'Please select an option',
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return <RadioGroup {...args} value={value} onChange={setValue} />
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled group',
    options: defaultOptions,
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState('option1')
    return <RadioGroup {...args} value={value} onChange={setValue} />
  },
}

export const Loading: Story = {
  args: {
    label: 'Loading options',
    options: defaultOptions,
    loading: true,
  },
  render: (args) => {
    const [value, setValue] = useState('option1')
    return <RadioGroup {...args} value={value} onChange={setValue} />
  },
}

export const WithDisabledOption: Story = {
  args: {
    label: 'Some options disabled',
    options: [
      { value: 'a', label: 'Available' },
      { value: 'b', label: 'Unavailable', description: 'This option is currently disabled', disabled: true },
      { value: 'c', label: 'Also available' },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return <RadioGroup {...args} value={value} onChange={setValue} />
  },
}
