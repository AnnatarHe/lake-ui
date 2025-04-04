import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'
import Modal from './index'

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Modal>

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title='Default Modal'
        >
          <div className='p-4'>
            <p className='text-gray-300'>Modal content goes here</p>
          </div>
        </Modal>
      </>
    )
  },
}

export const WithLongTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title='This is a very long modal title that should be truncated with ellipsis'
        >
          <div className='p-4'>
            <p className='text-gray-300'>Content with long title</p>
          </div>
        </Modal>
      </>
    )
  },
}

export const WithCustomContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title='Custom Content'
        >
          <div className='p-4'>
            <h4 className='mb-2 text-lg font-medium text-white'>
              Custom Section
            </h4>
            <p className='text-gray-300'>
              This modal has custom structured content
            </p>
            <div className='mt-4 flex justify-end space-x-2'>
              <button onClick={() => setIsOpen(false)}>Cancel</button>
              <button>Confirm</button>
            </div>
          </div>
        </Modal>
      </>
    )
  },
}
