import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import IconButton from './index'

describe('IconButton', () => {
  it('is named by its label and square', () => {
    render(<IconButton label='Settings' icon={<svg data-testid='icon' />} />)
    const button = screen.getByRole('button', { name: 'Settings' })
    expect(button).toHaveClass('size-9', 'text-lake-fg-muted')
    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true')
  })

  it('supports variants, sizes, loading and render', () => {
    const { rerender, container } = render(<IconButton label='Delete' icon={<svg />} variant='danger' size='sm' loading />)
    const button = screen.getByRole('button', { name: 'Delete' })
    expect(button).toHaveClass('bg-lake-danger', 'size-8')
    expect(button).toBeDisabled()
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
    rerender(<IconButton label='Open' icon={<svg />} render={<a href='/open' />} />)
    expect(screen.getByRole('link', { name: 'Open' })).toHaveAttribute('href', '/open')
  })
})
