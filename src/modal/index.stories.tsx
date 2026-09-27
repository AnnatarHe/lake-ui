import type { Meta, StoryObj } from '@storybook/react-vite'
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
            <p className='text-lake-fg-muted'>Modal content goes here</p>
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
            <p className='text-lake-fg-muted'>Content with long title</p>
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
            <h4 className='mb-2 text-lg font-medium text-lake-fg'>
              Custom Section
            </h4>
            <p className='text-lake-fg-muted'>
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

export const ProtectedResult: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    const [locked, setLocked] = useState(false)
    return (
      <>
        <div id='protected-modal-host' />
        <button onClick={() => {
          setLocked(false)
          setOpen(true)
        }}
        >
          Open protected form
        </button>
        <Modal selector='#protected-modal-host' title='Create credential' isOpen={open} onClose={() => setOpen(false)} locked={locked} initialFocus='input' descriptionId='protected-description'>
          <p id='protected-description'>Escape and backdrop dismissal are blocked while the result is displayed.</p>
          {locked
            ? (
                <>
                  <code>example-credential</code>
                  <button onClick={() => setOpen(false)}>Done</button>
                </>
              )
            : (
                <>
                  <input aria-label='Name' />
                  <button onClick={() => setLocked(true)}>Create example credential</button>
                </>
              )}
        </Modal>
      </>
    )
  },
}

export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false)
    return (
      <>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title='Rename collection'
          size='md'
          footer={(
            <>
              <button className='rounded-lake-control px-3 py-1.5 text-sm text-lake-fg-muted hover:bg-lake-surface-muted' onClick={() => setIsOpen(false)}>Cancel</button>
              <button className='rounded-lake-control bg-lake-accent px-3 py-1.5 text-sm text-lake-accent-fg hover:bg-lake-accent-hover' onClick={() => setIsOpen(false)}>Save</button>
            </>
          )}
        >
          <label className='block text-sm text-lake-fg-muted'>
            Name
            <input className='mt-1 w-full rounded-lake-control border border-lake-line bg-lake-field px-3 py-2 text-lake-fg' defaultValue='Summer reading' />
          </label>
        </Modal>
      </>
    )
  },
}

export const Sizes: Story = {
  render: () => {
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | 'xl' | 'full' | null>(null)
    return (
      <>
        <div className='flex gap-2'>
          {(['sm', 'md', 'lg', 'xl', 'full'] as const).map(value => (
            <button key={value} onClick={() => setSize(value)}>{value}</button>
          ))}
        </div>
        <Modal isOpen={!!size} onClose={() => setSize(null)} title={`Size ${size}`} size={size ?? 'xl'} hideCloseButton footer={<button onClick={() => setSize(null)}>Done</button>}>
          <p>The close button is hidden; use Escape, the backdrop, or Done.</p>
        </Modal>
      </>
    )
  },
}
