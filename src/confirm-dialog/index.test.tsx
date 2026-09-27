import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import ConfirmDialog from './index'

function deferred() {
  let resolve!: () => void
  let reject!: (error: Error) => void
  const promise = new Promise<void>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

describe('ConfirmDialog', () => {
  it('renders an alertdialog with description and focuses confirm by default', async () => {
    render(<ConfirmDialog isOpen onClose={vi.fn()} onConfirm={vi.fn()} title='Publish list?' description='Everyone will see it.' />)
    const dialog = screen.getByRole('alertdialog', { name: 'Publish list?' })
    expect(dialog).toHaveAccessibleDescription('Everyone will see it.')
    expect(dialog).toHaveClass('max-w-sm')
    expect(screen.queryByRole('button', { name: 'Close' })).not.toBeInTheDocument()
    await waitFor(() => expect(screen.getByRole('button', { name: 'Confirm' })).toHaveFocus())
  })

  it('focuses Cancel for the danger tone and uses custom labels', async () => {
    render(<ConfirmDialog isOpen onClose={vi.fn()} onConfirm={vi.fn()} title='Delete book?' tone='danger' confirmLabel='Delete' cancelLabel='Keep' />)
    await waitFor(() => expect(screen.getByRole('button', { name: 'Keep' })).toHaveFocus())
    expect(screen.getByRole('button', { name: 'Delete' })).toHaveClass('bg-lake-danger')
  })

  it('closes after a synchronous confirm and on cancel', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const onConfirm = vi.fn()
    render(<ConfirmDialog isOpen onClose={onClose} onConfirm={onConfirm} title='Sure?' />)
    await user.click(screen.getByRole('button', { name: 'Confirm' }))
    expect(onConfirm).toHaveBeenCalledOnce()
    expect(onClose).toHaveBeenCalledOnce()
    await user.click(screen.getByRole('button', { name: 'Cancel' }))
    expect(onClose).toHaveBeenCalledTimes(2)
  })

  it('locks while the promise is pending and closes when it resolves', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const task = deferred()
    render(<ConfirmDialog isOpen onClose={onClose} onConfirm={() => task.promise} title='Archive?' />)
    await user.click(screen.getByRole('button', { name: 'Confirm' }))
    const confirm = screen.getByRole('button', { name: 'Confirm' })
    expect(confirm).toBeDisabled()
    expect(confirm).toHaveAttribute('aria-busy', 'true')
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled()
    await user.keyboard('{Escape}')
    expect(onClose).not.toHaveBeenCalled()
    await act(async () => task.resolve())
    expect(onClose).toHaveBeenCalledOnce()
  })

  it('stays open after a rejection, and honours closeOnConfirm and confirmDisabled', async () => {
    const user = userEvent.setup()
    const onClose = vi.fn()
    const task = deferred()
    const { rerender } = render(<ConfirmDialog isOpen onClose={onClose} onConfirm={() => task.promise} title='Retry?' />)
    await user.click(screen.getByRole('button', { name: 'Confirm' }))
    await act(async () => task.reject(new Error('nope')))
    expect(onClose).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeEnabled()
    rerender(<ConfirmDialog isOpen onClose={onClose} onConfirm={vi.fn()} title='Retry?' closeOnConfirm={false} />)
    await user.click(screen.getByRole('button', { name: 'Confirm' }))
    expect(onClose).not.toHaveBeenCalled()
    rerender(<ConfirmDialog isOpen onClose={onClose} onConfirm={vi.fn()} title='Retry?' confirmDisabled />)
    expect(screen.getByRole('button', { name: 'Confirm' })).toBeDisabled()
  })
})
