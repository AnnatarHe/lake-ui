import type { Meta, StoryObj } from '@storybook/react-vite'
import { BookOpen } from 'lucide-react'
import Button from '../button'
import EmptyState from './index'

const meta: Meta<typeof EmptyState> = {
  title: 'Feedback/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: {
    icon: <BookOpen />,
    title: 'No highlights yet',
    description: 'Upload your Kindle “My Clippings.txt” to start your reading room.',
    action: <Button>Upload clippings</Button>,
  },
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {}

export const Small: Story = { args: { size: 'sm', action: undefined } }
