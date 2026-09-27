import type { Meta, StoryObj } from '@storybook/react-vite'
import { Bookmark, Settings, Share2, Trash2 } from 'lucide-react'
import IconButton from './index'

const meta: Meta<typeof IconButton> = {
  title: 'Actions/IconButton',
  component: IconButton,
  tags: ['autodocs'],
  args: { label: 'Settings', icon: <Settings className='size-4' /> },
  argTypes: {
    variant: { control: 'inline-radio', options: ['ghost', 'secondary', 'primary', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md', 'lg'] },
  },
}

export default meta
type Story = StoryObj<typeof IconButton>

export const Ghost: Story = {}

export const Variants: Story = {
  render: () => (
    <div className='flex items-center gap-3'>
      <IconButton label='Bookmark' icon={<Bookmark className='size-4' />} />
      <IconButton label='Share' variant='secondary' icon={<Share2 className='size-4' />} />
      <IconButton label='Settings' variant='primary' icon={<Settings className='size-4' />} />
      <IconButton label='Delete' variant='danger' icon={<Trash2 className='size-4' />} />
      <IconButton label='Saving' loading icon={<Bookmark className='size-4' />} />
    </div>
  ),
}
