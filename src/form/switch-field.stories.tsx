import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import SwitchField from './switch-field'

const meta: Meta<typeof SwitchField> = {
  title: 'Form/SwitchField',
  component: SwitchField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    description: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    error: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof SwitchField>

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
  render: (args) => {
    const [value, setValue] = useState(false)
    return (
      <SwitchField
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    )
  },
}

export const Checked: Story = {
  args: {
    label: 'Dark mode',
  },
  render: (args) => {
    const [value, setValue] = useState(true)
    return (
      <SwitchField
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    )
  },
}

export const WithDescription: Story = {
  args: {
    label: 'Email notifications',
    description: 'Receive email notifications when someone mentions you',
  },
  render: (args) => {
    const [value, setValue] = useState(false)
    return (
      <SwitchField
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    )
  },
}

export const WithError: Story = {
  args: {
    label: 'Accept terms',
    error: 'You must accept the terms to continue',
  },
  render: (args) => {
    const [value, setValue] = useState(false)
    return (
      <SwitchField
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    )
  },
}

export const Disabled: Story = {
  args: {
    label: 'Premium feature',
    description: 'Upgrade your account to enable this feature',
    disabled: true,
  },
  render: (args) => {
    const [value, setValue] = useState(false)
    return (
      <SwitchField
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    )
  },
}

export const Loading: Story = {
  args: {
    label: 'Saving preference',
    loading: true,
  },
  render: (args) => {
    const [value, setValue] = useState(true)
    return (
      <SwitchField
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      />
    )
  },
}

export const WithChildren: Story = {
  args: {
    label: 'Custom content',
  },
  render: (args) => {
    const [value, setValue] = useState(false)
    return (
      <SwitchField
        {...args}
        value={value}
        onChange={(newValue) => setValue(newValue)}
      >
        <span className='ml-2 text-xs text-gray-500 dark:text-gray-400'>
          {value ? 'Enabled' : 'Disabled'}
        </span>
      </SwitchField>
    )
  },
}
