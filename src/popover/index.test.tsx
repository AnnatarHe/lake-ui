import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Popover from './index'

describe('Popover', () => {
  it('opens a labelled dialog on click and closes on Escape with focus returned', async () => {
    const user = userEvent.setup()
    render(
      <Popover trigger={<button>Filters</button>} label='Filter options'>
        <button>Apply</button>
      </Popover>,
    )
    const trigger = screen.getByRole('button', { name: 'Filters' })
    await user.click(trigger)
    const dialog = await screen.findByRole('dialog', { name: 'Filter options' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    await waitFor(() => expect(screen.getByRole('button', { name: 'Apply' })).toHaveFocus())
    expect(dialog).toBeInTheDocument()
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('closes on outside click and through the render-prop api', async () => {
    const user = userEvent.setup()
    render(
      <>
        <p>Outside</p>
        <Popover trigger={<button>Open</button>} label='Details'>
          {({ close }) => <button onClick={close}>Done</button>}
        </Popover>
      </>,
    )
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await screen.findByRole('dialog')
    await user.click(screen.getByText('Outside'))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: 'Open' }))
    await user.click(await screen.findByRole('button', { name: 'Done' }))
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument())
  })

  it('focuses the initialFocus selector and supports controlled state and an arrow', async () => {
    const onOpenChange = vi.fn()
    const { container } = render(
      <Popover trigger={<button>Edit</button>} label='Edit' open onOpenChange={onOpenChange} initialFocus='input' arrow portal={false} className='w-72'>
        <button>First</button>
        <input aria-label='Name' />
      </Popover>,
    )
    const dialog = await screen.findByRole('dialog', { name: 'Edit' })
    expect(container).toContainElement(dialog)
    expect(dialog).toHaveClass('w-72')
    expect(dialog.querySelector('svg')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByRole('textbox', { name: 'Name' })).toHaveFocus())
    await userEvent.setup().keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenCalledWith(false)
  })
})
