import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Button from '../button'
import Menu from './index'
import type { MenuEntry } from './index'

afterEach(() => {
  document.querySelector('[data-st-role=popover]')?.remove()
})

function entries(overrides: Partial<Record<string, () => void>> = {}): MenuEntry[] {
  return [
    { type: 'label', key: 'section', label: 'Book' },
    { key: 'edit', label: 'Edit', shortcut: 'E', onSelect: overrides.edit },
    { key: 'share', label: 'Share', disabled: true, onSelect: overrides.share },
    { key: 'docs', label: 'Docs', render: <a href='/docs' /> },
    { type: 'separator', key: 'sep' },
    { type: 'radio', key: 'grid', label: 'Grid', checked: true, onSelect: overrides.grid ?? (() => {}) },
    { type: 'radio', key: 'list', label: 'List', checked: false, onSelect: overrides.list ?? (() => {}) },
    { key: 'delete', label: 'Delete', tone: 'danger', onSelect: overrides.delete },
  ]
}

describe('Menu', () => {
  it('opens from the trigger with menu semantics and focuses the first item', async () => {
    const user = userEvent.setup()
    render(<Menu trigger={<Button variant='secondary'>Actions</Button>} items={entries()} header={<p>Signed in</p>} />)
    const trigger = screen.getByRole('button', { name: 'Actions' })
    expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
    await user.click(trigger)
    const menu = await screen.findByRole('menu', { name: 'Actions' })
    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(trigger).toHaveAttribute('aria-controls', menu.id)
    expect(screen.getByText('Signed in')).toBeInTheDocument()
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Edit E' })).toHaveFocus())
    expect(screen.getByRole('menuitem', { name: 'Share' })).toHaveAttribute('aria-disabled', 'true')
    expect(screen.getByRole('menuitemradio', { name: 'Grid' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('menuitemradio', { name: 'List' })).toHaveAttribute('aria-checked', 'false')
    expect(screen.getByRole('separator')).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Docs' })).toHaveAttribute('href', '/docs')
  })

  it('navigates with the keyboard, skips disabled items and selects', async () => {
    const user = userEvent.setup()
    const edit = vi.fn()
    const docsClick = vi.fn((event: { preventDefault: () => void }) => event.preventDefault())
    const items = entries({ edit })
    items[3] = { key: 'docs', label: 'Docs', render: <a href='/docs' onClick={docsClick} /> }
    render(<Menu trigger={<button>Actions</button>} items={items} />)
    await user.click(screen.getByRole('button', { name: 'Actions' }))
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Edit E' })).toHaveFocus())
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('menuitem', { name: 'Docs' })).toHaveFocus()
    await user.keyboard(' ')
    expect(docsClick).toHaveBeenCalled()
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
    await user.click(screen.getByRole('button', { name: 'Actions' }))
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Edit E' })).toHaveFocus())
    await user.keyboard('{Enter}')
    expect(edit).toHaveBeenCalledOnce()
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
  })

  it('closes on Escape and returns focus to the trigger', async () => {
    const user = userEvent.setup()
    render(<Menu trigger={<button>Actions</button>} items={entries()} label='Book actions' />)
    const trigger = screen.getByRole('button', { name: 'Actions' })
    await user.click(trigger)
    expect(await screen.findByRole('menu', { name: 'Book actions' })).toBeInTheDocument()
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('menu')).not.toBeInTheDocument())
    await waitFor(() => expect(trigger).toHaveFocus())
  })

  it('ignores disabled items and selects radio items', async () => {
    const user = userEvent.setup()
    const share = vi.fn()
    const list = vi.fn()
    render(<Menu trigger={<button>Actions</button>} items={entries({ share, list })} />)
    await user.click(screen.getByRole('button', { name: 'Actions' }))
    screen.getByRole('menuitem', { name: 'Share' }).click()
    expect(share).not.toHaveBeenCalled()
    await user.click(screen.getByRole('menuitemradio', { name: 'List' }))
    expect(list).toHaveBeenCalledOnce()
  })

  it('supports typeahead', async () => {
    const user = userEvent.setup()
    render(<Menu trigger={<button>Actions</button>} items={entries()} />)
    await user.click(screen.getByRole('button', { name: 'Actions' }))
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Edit E' })).toHaveFocus())
    await user.keyboard('del')
    await waitFor(() => expect(screen.getByRole('menuitem', { name: 'Delete' })).toHaveFocus())
  })

  it('portals into the popover host or renders inline, and can be controlled', async () => {
    const host = document.createElement('div')
    host.setAttribute('data-st-role', 'popover')
    document.body.append(host)
    const onOpenChange = vi.fn()
    const { rerender } = render(<Menu trigger={<button>Actions</button>} items={entries()} open onOpenChange={onOpenChange} />)
    expect(host).toContainElement(await screen.findByRole('menu'))
    rerender(<Menu trigger={<button>Actions</button>} items={entries()} open portal={false} onOpenChange={onOpenChange} />)
    expect(host).not.toContainElement(await screen.findByRole('menu'))
    const user = userEvent.setup()
    await user.keyboard('{Escape}')
    expect(onOpenChange).toHaveBeenCalledWith(false)
    expect(screen.getByRole('menu')).toBeInTheDocument()
  })
})
