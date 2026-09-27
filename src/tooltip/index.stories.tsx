import type { Meta, StoryObj } from '@storybook/react-vite'
import Tooltip from './index'

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: () => (
    <div className='flex items-center justify-center p-20'>
      <Tooltip content='This is a tooltip'>
        <button className='rounded-lake-control bg-lake-accent px-4 py-2 text-lake-accent-fg'>
          Hover me
        </button>
      </Tooltip>
    </div>
  ),
}

export const AllSides: Story = {
  render: () => (
    <div className='flex items-center justify-center gap-8 p-20'>
      <Tooltip content='Top tooltip' side='top'>
        <button className='rounded-lake-control bg-lake-accent px-4 py-2 text-lake-accent-fg'>
          Top
        </button>
      </Tooltip>
      <Tooltip content='Bottom tooltip' side='bottom'>
        <button className='rounded-lake-control bg-lake-accent px-4 py-2 text-lake-accent-fg'>
          Bottom
        </button>
      </Tooltip>
      <Tooltip content='Left tooltip' side='left'>
        <button className='rounded-lake-control bg-lake-accent px-4 py-2 text-lake-accent-fg'>
          Left
        </button>
      </Tooltip>
      <Tooltip content='Right tooltip' side='right'>
        <button className='rounded-lake-control bg-lake-accent px-4 py-2 text-lake-accent-fg'>
          Right
        </button>
      </Tooltip>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className='flex items-center justify-center p-20'>
      <Tooltip content='You should not see this' disabled>
        <button className='rounded-lake-control bg-lake-fg-subtle px-4 py-2 text-lake-surface'>
          Hover me (disabled tooltip)
        </button>
      </Tooltip>
    </div>
  ),
}

export const NoWrap: Story = {
  render: () => (
    <div className='flex items-center justify-center p-20'>
      <Tooltip
        content='This is a long tooltip text that should not wrap to a new line'
        noWrap
      >
        <button className='rounded-lake-control bg-lake-accent px-4 py-2 text-lake-accent-fg'>
          Hover for long text
        </button>
      </Tooltip>
    </div>
  ),
}

export const WithCustomContent: Story = {
  render: () => (
    <div className='flex items-center justify-center p-20'>
      <Tooltip
        content={(
          <div>
            <strong className='block'>Custom Title</strong>
            <span className='text-xs text-lake-fg-subtle'>
              With a subtitle underneath
            </span>
          </div>
        )}
      >
        <button className='rounded-lake-control bg-lake-accent px-4 py-2 text-lake-accent-fg'>
          Rich content tooltip
        </button>
      </Tooltip>
    </div>
  ),
}
