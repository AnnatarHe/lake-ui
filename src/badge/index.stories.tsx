import type { Meta, StoryObj } from '@storybook/react-vite'
import { Crown } from 'lucide-react'
import Badge from './index'

const meta: Meta<typeof Badge> = {
  title: 'Data Display/Badge',
  component: Badge,
  tags: ['autodocs'],
  args: { children: 'Reading' },
  argTypes: {
    tone: { control: 'inline-radio', options: ['neutral', 'accent', 'success', 'warning', 'danger'] },
    variant: { control: 'inline-radio', options: ['soft', 'outline', 'solid'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
  },
}

export default meta
type Story = StoryObj<typeof Badge>

export const Default: Story = {}

export const Matrix: Story = {
  render: () => (
    <div className='space-y-3'>
      {(['soft', 'outline', 'solid'] as const).map(variant => (
        <div key={variant} className='flex flex-wrap gap-2'>
          {(['neutral', 'accent', 'success', 'warning', 'danger'] as const).map(tone => (
            <Badge key={tone} tone={tone} variant={variant}>{tone}</Badge>
          ))}
        </div>
      ))}
    </div>
  ),
}

export const WithIcon: Story = {
  args: { tone: 'warning', size: 'md', icon: <Crown className='size-3' />, children: 'Premium' },
}
