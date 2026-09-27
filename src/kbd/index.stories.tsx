import type { Meta, StoryObj } from '@storybook/react-vite'
import Kbd from './index'

const meta: Meta<typeof Kbd> = {
  title: 'Data Display/Kbd',
  component: Kbd,
  tags: ['autodocs'],
  args: { children: '⌘K' },
}

export default meta
type Story = StoryObj<typeof Kbd>

export const Default: Story = {}

export const InText: Story = {
  render: () => (
    <p className='text-sm text-lake-fg-muted'>
      Press
      {' '}
      <Kbd>⌘</Kbd>
      {' '}
      <Kbd>K</Kbd>
      {' '}
      to search your highlights.
    </p>
  ),
}
