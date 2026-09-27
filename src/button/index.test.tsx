import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createRef } from 'react'
import type { ReactElement } from 'react'
import { describe, expect, it, vi } from 'vitest'
import Button, { buttonStyles } from './index'

describe('Button', () => {
  it('renders a primary md button by default', () => {
    render(<Button>Save</Button>)
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button).toHaveAttribute('type', 'button')
    expect(button).toHaveClass('bg-lake-accent', 'text-lake-accent-fg', 'h-9', 'rounded-lake-control', 'focus-visible:ring-lake-ring')
  })

  it.each([
    ['secondary', 'bg-lake-surface-raised'],
    ['ghost', 'text-lake-fg-muted'],
    ['danger', 'bg-lake-danger'],
    ['link', 'text-lake-accent-text'],
  ] as const)('supports the %s variant', (variant, expected) => {
    render(<Button variant={variant}>Go</Button>)
    expect(screen.getByRole('button')).toHaveClass(expected)
  })

  it('shows a spinner, sets aria-busy and disables while loading', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    const { container } = render(<Button loading onClick={onClick} leadingIcon={<svg data-testid='lead' />}>Save</Button>)
    const button = screen.getByRole('button', { name: 'Save' })
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
    expect(screen.queryByTestId('lead')).not.toBeInTheDocument()
    await user.click(button)
    expect(onClick).not.toHaveBeenCalled()
  })

  it('renders icons, full width and lets className win', () => {
    render(<Button fullWidth size='lg' className='rounded-none' leadingIcon={<svg data-testid='lead' />} trailingIcon={<svg data-testid='trail' />}>Next</Button>)
    const button = screen.getByRole('button', { name: 'Next' })
    expect(button).toHaveClass('w-full', 'h-11', 'rounded-none')
    expect(button).not.toHaveClass('rounded-lake-control')
    expect(screen.getByTestId('lead').parentElement).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByTestId('trail')).toBeInTheDocument()
  })

  it('forwards the ref and native attributes', () => {
    const ref = createRef<HTMLButtonElement>()
    render(<Button ref={ref} type='submit' name='intent' value='save'>Submit</Button>)
    expect(ref.current).toBe(screen.getByRole('button'))
    expect(ref.current).toHaveAttribute('type', 'submit')
  })

  it('clones the render element with merged className and children', () => {
    render(<Button variant='secondary' render={<a href='/books' className='extra' />} id='books'>Books</Button>)
    const link = screen.getByRole('link', { name: 'Books' })
    expect(link).toHaveAttribute('href', '/books')
    expect(link).toHaveAttribute('id', 'books')
    expect(link).toHaveClass('extra', 'bg-lake-surface-raised')
    expect(link).not.toHaveAttribute('type')
    expect(link).not.toHaveAttribute('aria-disabled')
  })

  it('marks a disabled render element and adds no function props', () => {
    const element = Button({ render: <a href='/x' />, disabled: true, children: 'Go' }) as ReactElement<Record<string, unknown>>
    expect(element.type).toBe('a')
    expect(element.props['aria-disabled']).toBe(true)
    expect(element.props.tabIndex).toBe(-1)
    expect(Object.values(element.props).some(value => typeof value === 'function')).toBe(false)
  })

  it('exposes buttonStyles for other elements', () => {
    expect(buttonStyles({ variant: 'ghost', size: 'sm' })).toContain('h-8')
    expect(buttonStyles({ iconOnly: true })).toContain('size-9')
    expect(buttonStyles({ className: 'rounded-full' })).not.toContain('rounded-lake-control')
  })
})
