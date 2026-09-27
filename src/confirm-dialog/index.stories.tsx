import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Button from '../button'
import ConfirmDialog from './index'

const meta: Meta<typeof ConfirmDialog> = {
  title: 'Overlays/ConfirmDialog',
  component: ConfirmDialog,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ConfirmDialog>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button onClick={() => setOpen(true)}>Publish list</Button>
        <ConfirmDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={() => new Promise(resolve => setTimeout(resolve, 1200))}
          title='Publish this reading list?'
          description='Anyone with the link will be able to read it.'
          confirmLabel='Publish'
        />
      </>
    )
  },
}

export const Danger: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <>
        <Button variant='danger' onClick={() => setOpen(true)}>Delete book</Button>
        <ConfirmDialog
          isOpen={open}
          onClose={() => setOpen(false)}
          onConfirm={() => new Promise((_, reject) => setTimeout(() => reject(new Error('Network error')), 1000))}
          tone='danger'
          title='Delete “Walden”?'
          description='All 42 highlights will be removed. The request in this story fails, so the dialog stays open.'
          confirmLabel='Delete'
        />
      </>
    )
  },
}
