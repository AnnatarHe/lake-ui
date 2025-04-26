import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import TextareaField from './textarea-field'

const meta: Meta<typeof TextareaField> = {
  title: 'Form/TextareaField',
  component: TextareaField,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    disabled: { control: 'boolean' },
    loading: { control: 'boolean' },
    error: { control: 'text' },
    rows: { control: { type: 'number', min: 1, max: 10 } },
  },
}

export default meta
type Story = StoryObj<typeof TextareaField>

export const Default: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description',
    rows: 3,
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <TextareaField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const WithValue: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself',
    rows: 4,
  },
  render: (args) => {
    const [value, setValue] = useState('This is a sample bio text. It demonstrates how text appears in the textarea when the user has entered some content.')
    return (
      <TextareaField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const WithError: Story = {
  args: {
    label: 'Comments',
    placeholder: 'Enter your comments',
    error: 'Comments must be at least 20 characters',
    rows: 3,
  },
  render: (args) => {
    const [value, setValue] = useState('Too short')
    return (
      <TextareaField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    placeholder: 'This textarea is disabled',
    disabled: true,
    rows: 3,
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <TextareaField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const Loading: Story = {
  args: {
    label: 'Loading Textarea',
    placeholder: 'This textarea is loading',
    loading: true,
    rows: 3,
  },
  render: (args) => {
    const [value, setValue] = useState('Loading data...')
    return (
      <TextareaField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const WithoutLabel: Story = {
  args: {
    placeholder: 'Textarea without label',
    rows: 3,
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <TextareaField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}

export const CustomRows: Story = {
  args: {
    label: 'Larger Textarea',
    placeholder: 'This textarea has more rows',
    rows: 6,
  },
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <TextareaField
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
}
