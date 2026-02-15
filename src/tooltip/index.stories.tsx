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
        <button className='rounded bg-blue-500 px-4 py-2 text-white'>
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
        <button className='rounded bg-blue-500 px-4 py-2 text-white'>
          Top
        </button>
      </Tooltip>
      <Tooltip content='Bottom tooltip' side='bottom'>
        <button className='rounded bg-blue-500 px-4 py-2 text-white'>
          Bottom
        </button>
      </Tooltip>
      <Tooltip content='Left tooltip' side='left'>
        <button className='rounded bg-blue-500 px-4 py-2 text-white'>
          Left
        </button>
      </Tooltip>
      <Tooltip content='Right tooltip' side='right'>
        <button className='rounded bg-blue-500 px-4 py-2 text-white'>
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
        <button className='rounded bg-gray-500 px-4 py-2 text-white'>
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
        <button className='rounded bg-blue-500 px-4 py-2 text-white'>
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
        content={
          <div>
            <strong className='block'>Custom Title</strong>
            <span className='text-xs text-gray-500 dark:text-gray-400'>
              With a subtitle underneath
            </span>
          </div>
        }
      >
        <button className='rounded bg-blue-500 px-4 py-2 text-white'>
          Rich content tooltip
        </button>
      </Tooltip>
    </div>
  ),
}
