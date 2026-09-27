import type { Meta, StoryObj } from '@storybook/react-vite'
import { LayoutGrid, List, Rows3 } from 'lucide-react'
import { useState } from 'react'
import SegmentedControl from './index'

const meta: Meta<typeof SegmentedControl> = {
  title: 'Form/SegmentedControl',
  component: SegmentedControl,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SegmentedControl>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('grid')
    return (
      <SegmentedControl
        aria-label='Layout'
        value={value}
        onValueChange={setValue}
        options={[
          { value: 'grid', label: 'Grid', icon: <LayoutGrid className='size-4' /> },
          { value: 'list', label: 'List', icon: <List className='size-4' /> },
          { value: 'compact', label: 'Compact', icon: <Rows3 className='size-4' />, disabled: true },
        ]}
      />
    )
  },
}

export const FullWidthSmall: Story = {
  render: () => {
    const [value, setValue] = useState('week')
    return (
      <div className='max-w-sm'>
        <SegmentedControl
          aria-label='Range'
          size='sm'
          fullWidth
          value={value}
          onValueChange={setValue}
          options={[
            { value: 'week', label: 'Week' },
            { value: 'month', label: 'Month' },
            { value: 'year', label: 'Year' },
          ]}
        />
      </div>
    )
  },
}
