import type { Meta, StoryObj } from '@storybook/react-vite'
import { ArrowRight, Download, Plus, Trash2 } from 'lucide-react'
import Button from './index'

const meta: Meta<typeof Button> = {
  title: 'Actions/Button',
  component: Button,
  tags: ['autodocs'],
  args: { children: 'Save highlight' },
  argTypes: {
    variant: { control: 'inline-radio', options: ['primary', 'secondary', 'ghost', 'danger', 'link'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
    loading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {}

export const Variants: Story = {
  render: args => (
    <div className='flex flex-wrap items-center gap-3'>
      <Button {...args} variant='primary'>Primary</Button>
      <Button {...args} variant='secondary'>Secondary</Button>
      <Button {...args} variant='ghost'>Ghost</Button>
      <Button {...args} variant='danger' leadingIcon={<Trash2 className='size-4' />}>Delete</Button>
      <Button {...args} variant='link'>Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: args => (
    <div className='flex flex-wrap items-center gap-3'>
      <Button {...args} size='sm'>Small</Button>
      <Button {...args} size='md'>Medium</Button>
      <Button {...args} size='lg'>Large</Button>
    </div>
  ),
}

export const WithIcons: Story = {
  args: {
    leadingIcon: <Plus className='size-4' />,
    trailingIcon: <ArrowRight className='size-4' />,
    children: 'New collection',
  },
}

export const Loading: Story = {
  args: { loading: true, children: 'Exporting', leadingIcon: <Download className='size-4' /> },
}

export const AsLink: Story = {
  args: {
    variant: 'secondary',
    render: <a href='#books' />,
    children: 'Go to books',
  },
}

export const DisabledLink: Story = {
  args: {
    variant: 'secondary',
    render: <a href='#books' />,
    disabled: true,
    children: 'Unavailable',
  },
}
