import type { Meta, StoryObj } from '@storybook/react-vite'
import Skeleton from './index'

const meta: Meta<typeof Skeleton> = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: { shape: { control: 'inline-radio', options: ['rect', 'text', 'circle'] } },
}

export default meta
type Story = StoryObj<typeof Skeleton>

export const Rect: Story = { args: { className: 'h-24' } }

export const Text: Story = { args: { shape: 'text', lines: 4 } }

export const CardPlaceholder: Story = {
  render: () => (
    <div className='flex max-w-md gap-4 rounded-lake-panel border border-lake-line bg-lake-surface p-4'>
      <Skeleton shape='circle' />
      <div className='flex-1 space-y-3'>
        <Skeleton className='h-4 w-1/2' />
        <Skeleton shape='text' lines={3} />
      </div>
    </div>
  ),
}
