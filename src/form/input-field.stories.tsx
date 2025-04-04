import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import InputField from './input-field'

const meta: Meta<typeof InputField> = {
  title: 'Form/InputField',
  component: InputField,
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
type Story = StoryObj<typeof InputField>

export const Default: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username',
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <InputField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const WithValue: Story = {
  args: {
    label: 'Email',
    placeholder: 'Enter your email',
  },
  render: (args) => {
    const [value, setValue] = useState('example@example.com')
    return (
      <InputField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const WithError: Story = {
  args: {
    label: 'Password',
    placeholder: 'Enter your password',
    error: 'Password must be at least 8 characters',
  },
  render: (args) => {
    const [value, setValue] = useState('1234')
    return (
      <InputField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <InputField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const Loading: Story = {
  args: {
    label: 'Loading Input',
    placeholder: 'This input is loading',
    loading: true,
  },
  render: (args) => {
    const [value, setValue] = useState('Loading data...')
    return (
      <InputField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Input without label',
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <InputField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}
