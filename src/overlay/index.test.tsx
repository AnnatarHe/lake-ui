import { act, cleanup, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { StrictMode, useState } from 'react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Modal from '../modal'
import Sheet from '../sheet'

beforeEach(() => {
  const host = document.createElement('div')
  host.id = 'overlay-tests'
  document.body.append(host)
})
afterEach(() => {
  cleanup()
  document.querySelector('#overlay-tests')?.remove()
  document.body.removeAttribute('style')
  vi.restoreAllMocks()
})

describe.each([Modal, Sheet])('accessible overlay: %s', (Component) => {
  it('names the dialog, focuses the requested field, traps focus, and returns it on dismissal', async () => {
    const user = userEvent.setup()
    function Example() {
      const [open, setOpen] = useState(false)
      return (
        <>
          <button onClick={() => setOpen(true)}>Open</button>
          <Component selector='#overlay-tests' title='Edit' isOpen={open} onClose={() => setOpen(false)} initialFocus='input'>
            <input aria-label='Name' />
            <button>Last action</button>
          </Component>
        </>
      )
    }
    render(<StrictMode><Example /></StrictMode>)
    const trigger = screen.getByRole('button', { name: 'Open' })
    await user.click(trigger)
    expect(await screen.findByRole('dialog', { name: 'Edit' })).toHaveAttribute('aria-modal', 'true')
    await waitFor(() => expect(screen.getByRole('textbox')).toHaveFocus())
    screen.getByRole('button', { name: 'Last action' }).focus()
    await user.tab()
    expect(screen.getByRole('button', { name: 'Close' })).toHaveFocus()
    await user.tab({ shift: true })
    expect(screen.getByRole('button', { name: 'Last action' })).toHaveFocus()
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
    await user.click(trigger)
    await user.click((await screen.findByRole('dialog')).parentElement!)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('blocks every dismissal path when locked and permits it after unlocking', async () => {
    const user = userEvent.setup()
    const close = vi.fn()
    const content = (locked: boolean) => (
      <Component selector='#overlay-tests' title='Credentials' isOpen locked={locked} onClose={close} role='alertdialog' descriptionId='credential-description' closeLabel='Dismiss credentials'>
        <p id='credential-description'>Save this value.</p>
        <button>Copy</button>
      </Component>
    )
    const view = render(content(true))
    const dialog = screen.getByRole('alertdialog', { name: 'Credentials' })
    expect(dialog).toHaveAccessibleDescription('Save this value.')
    await user.keyboard('{Escape}')
    await user.click(dialog.parentElement!)
    await user.click(screen.getByRole('button', { name: 'Dismiss credentials' }))
    expect(close).not.toHaveBeenCalled()
    expect(screen.getByRole('button', { name: 'Dismiss credentials' })).toBeDisabled()
    view.rerender(content(false))
    await user.click(screen.getByRole('button', { name: 'Dismiss credentials' }))
    expect(close).toHaveBeenCalledOnce()
  })

  it('does not lock the page without a portal host', () => {
    render(<Component selector='#absent-host' title='Absent' isOpen onClose={vi.fn()}>Content</Component>)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.body.style.overflow).toBe('')
  })
})

it('supports an accessible title-less sheet and styles its slots', () => {
  render(<Sheet selector='#overlay-tests' isOpen onClose={vi.fn()} ariaLabel='Navigation' side='left' width='max-w-sm' className='custom-panel' overlayClassName='custom-backdrop' headerClassName='custom-header' bodyClassName='custom-body'>Links</Sheet>)
  const dialog = screen.getByRole('dialog', { name: 'Navigation' })
  expect(dialog).toHaveAttribute('data-placement', 'left')
  expect(dialog).toHaveClass('custom-panel', 'max-w-sm')
  expect(dialog.parentElement).toHaveClass('custom-backdrop')
  expect(dialog.querySelector('.custom-header')).toBeInTheDocument()
  expect(dialog.querySelector('.custom-body')).toHaveTextContent('Links')
})

it('restores existing inline styles and scroll position on iOS unmount', async () => {
  vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('iPhone')
  const scroll = vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  document.body.style.setProperty('overflow', 'scroll', 'important')
  document.body.style.paddingRight = '7px'
  document.body.style.position = 'relative'
  const original = document.body.style.cssText
  const view = render(<StrictMode><Modal selector='#overlay-tests' title='Edit' isOpen onClose={vi.fn()}>Content</Modal></StrictMode>)
  expect(document.body.style.position).toBe('fixed')
  await act(async () => view.unmount())
  expect(document.body.style.cssText).toBe(original)
  expect(scroll).toHaveBeenCalled()
})
