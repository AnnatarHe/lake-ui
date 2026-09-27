import { act, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { forwardRef, useRef } from 'react'
import { afterEach, describe, expect, it } from 'vitest'
import Tooltip from './index'

afterEach(() => {
  document.querySelector('[data-st-role=tooltip]')?.remove()
})

describe('Tooltip', () => {
  it('attaches to a single element child without wrapper elements', () => {
    const { container } = render(
      <Tooltip content='Save changes'>
        <button className='trigger'>Save</button>
      </Tooltip>,
    )
    expect(container.firstElementChild).toBe(screen.getByRole('button', { name: 'Save' }))
  })

  it('wraps text children in a single inline-flex span', () => {
    const { container } = render(<Tooltip content='Hint'>plain text</Tooltip>)
    expect(container.children).toHaveLength(1)
    expect(container.firstElementChild?.tagName).toBe('SPAN')
    expect(container.firstElementChild).toHaveClass('inline-flex')
  })

  it('shows on focus, links aria-describedby while open, and closes on Escape', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content='Save changes'>
        <button>Save</button>
      </Tooltip>,
    )
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button).not.toHaveAttribute('aria-describedby')
    await user.tab()
    const tooltip = await screen.findByRole('tooltip')
    expect(tooltip).toHaveTextContent('Save changes')
    expect(button).toHaveAccessibleDescription('Save changes')
    await user.keyboard('{Escape}')
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
    expect(button).not.toHaveAttribute('aria-describedby')
  })

  it('shows on hover and renders into the tooltip host when present', async () => {
    const host = document.createElement('div')
    host.setAttribute('data-st-role', 'tooltip')
    document.body.append(host)
    const user = userEvent.setup()
    render(
      <Tooltip content='Hover hint'>
        <button>Target</button>
      </Tooltip>,
    )
    await user.hover(screen.getByRole('button', { name: 'Target' }))
    const tooltip = await screen.findByRole('tooltip')
    expect(host).toContainElement(tooltip)
    await user.unhover(screen.getByRole('button', { name: 'Target' }))
    await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument())
  })

  it('keeps the child ref and handlers', async () => {
    const user = userEvent.setup()
    const focused: string[] = []
    function Example() {
      const ref = useRef<HTMLButtonElement>(null)
      return (
        <Tooltip content='Kept'>
          <button ref={ref} onFocus={() => focused.push(ref.current?.textContent ?? '')}>Ref</button>
        </Tooltip>
      )
    }
    render(<Example />)
    await user.tab()
    expect(focused).toEqual(['Ref'])
    expect(await screen.findByRole('tooltip')).toBeInTheDocument()
  })

  it('falls back to a wrapper when the child does not attach the ref', async () => {
    const user = userEvent.setup()
    // Accepts a ref but never attaches it to the DOM.
    const Opaque = forwardRef<HTMLSpanElement>(function Opaque() {
      return <span tabIndex={0}>Opaque</span>
    })
    const { container } = render(<Tooltip content='Wrapped'><Opaque /></Tooltip>)
    await waitFor(() => expect(container.firstElementChild).toHaveClass('inline-flex'))
    await act(async () => {
      await user.hover(screen.getByText('Opaque'))
    })
    expect(await screen.findByRole('tooltip')).toHaveTextContent('Wrapped')
  })

  it('does not open when disabled', async () => {
    const user = userEvent.setup()
    render(
      <Tooltip content='Hidden' disabled>
        <button>Disabled tip</button>
      </Tooltip>,
    )
    await user.tab()
    await user.hover(screen.getByRole('button'))
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })
})
