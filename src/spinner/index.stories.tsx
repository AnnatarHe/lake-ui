import type { Meta, StoryObj } from '@storybook/react-vite'
import Spinner from './index'

const meta: Meta<typeof Spinner> = {
  title: 'Feedback/Spinner',
  component: Spinner,
  tags: ['autodocs'],
  argTypes: { size: { control: 'inline-radio', options: ['xs', 'sm', 'md', 'lg'] } },
}

export default meta
type Story = StoryObj<typeof Spinner>

export const Default: Story = {}

export const Sizes: Story = {
  render: () => (
    <div className='flex items-center gap-4 text-lake-accent'>
      <Spinner size='xs' />
      <Spinner size='sm' />
      <Spinner size='md' />
      <Spinner size='lg' label='Syncing highlights' />
    </div>
  ),
}
