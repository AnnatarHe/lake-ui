import type { Meta, StoryObj } from '@storybook/react-vite'
import Progress from './index'

const meta: Meta<typeof Progress> = {
  title: 'Feedback/Progress',
  component: Progress,
  tags: ['autodocs'],
  args: { label: 'Import progress', value: 42, showValue: true },
  argTypes: {
    tone: { control: 'inline-radio', options: ['accent', 'success', 'danger'] },
    size: { control: 'inline-radio', options: ['sm', 'md'] },
    value: { control: { type: 'range', min: 0, max: 100 } },
  },
}

export default meta
type Story = StoryObj<typeof Progress>

export const Default: Story = {}

export const Tones: Story = {
  render: () => (
    <div className='max-w-md space-y-4'>
      <Progress label='Reading' value={65} showValue />
      <Progress label='Synced' value={100} tone='success' showValue />
      <Progress label='Quota' value={92} tone='danger' size='sm' showValue />
    </div>
  ),
}

export const Indeterminate: Story = { args: { value: null } }
