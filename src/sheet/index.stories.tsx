import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Sheet from './index'

const meta: Meta<typeof Sheet> = {
  title: 'Components/Sheet',
  component: Sheet,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Sheet>

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white'
          onClick={() => setIsOpen(true)}
        >
          Open Sheet
        </button>
        <Sheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title='Sheet Title'
        >
          <p>Sheet content goes here. You can put any content inside.</p>
        </Sheet>
      </>
    )
  },
}

export const LeftSide: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white'
          onClick={() => setIsOpen(true)}
        >
          Open Left Sheet
        </button>
        <Sheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title='Left Sheet'
          side='left'
        >
          <p>This sheet slides in from the left side.</p>
        </Sheet>
      </>
    )
  },
}

export const CustomWidth: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white'
          onClick={() => setIsOpen(true)}
        >
          Open Wide Sheet
        </button>
        <Sheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title='Wide Sheet'
          width='max-w-2xl'
        >
          <p>This sheet has a wider width.</p>
        </Sheet>
      </>
    )
  },
}

export const WithoutTitle: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white'
          onClick={() => setIsOpen(true)}
        >
          Open Sheet (No Title)
        </button>
        <Sheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <p>This sheet has no title, only a close button.</p>
        </Sheet>
      </>
    )
  },
}

export const WithLongContent: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <button
          className='rounded bg-blue-500 px-4 py-2 text-white'
          onClick={() => setIsOpen(true)}
        >
          Open Sheet (Long Content)
        </button>
        <Sheet
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title='Scrollable Content'
        >
          {Array.from({ length: 30 }, (_, i) => (
            <p key={i} className='mb-4'>
              Paragraph
              {' '}
              {i + 1}
              : Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          ))}
        </Sheet>
      </>
    )
  },
}
