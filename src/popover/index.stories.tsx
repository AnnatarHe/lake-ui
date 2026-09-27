import type { Meta, StoryObj } from '@storybook/react-vite'
import { SlidersHorizontal } from 'lucide-react'
import Button from '../button'
import CheckboxField from '../form/checkbox-field'
import Popover from './index'

const meta: Meta<typeof Popover> = {
  title: 'Overlays/Popover',
  component: Popover,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: () => (
    <div className='flex justify-center p-16'>
      <Popover
        label='Filters'
        arrow
        trigger={<Button variant='secondary' leadingIcon={<SlidersHorizontal className='size-4' />}>Filters</Button>}
        className='w-64'
      >
        {({ close }) => (
          <div className='space-y-3'>
            <p className='font-medium'>Show</p>
            <CheckboxField label='Highlights' checked onChange={() => {}} />
            <CheckboxField label='Notes' checked={false} onChange={() => {}} />
            <div className='flex justify-end'>
              <Button size='sm' onClick={close}>Apply</Button>
            </div>
          </div>
        )}
      </Popover>
    </div>
  ),
}
