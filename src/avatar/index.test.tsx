import { fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import Avatar, { initialsOf } from './index'

describe('Avatar', () => {
  // happy-dom never loads images; pretend they decoded so only onError marks failures.
  beforeEach(() => {
    vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(64)
  })
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders the image with alt text', () => {
    render(<Avatar src='https://example.com/a.png' name='Ada Lovelace' />)
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveAttribute('src', 'https://example.com/a.png')
  })

  it('falls back to initials without a src or after an error', () => {
    const { rerender } = render(<Avatar name='Ada Lovelace' size='lg' />)
    expect(screen.getByRole('img', { name: 'Ada Lovelace' })).toHaveTextContent('AL')
    rerender(<Avatar src='https://example.com/broken.png' name='Ada Lovelace' />)
    fireEvent.error(screen.getByRole('img', { name: 'Ada Lovelace' }))
    expect(screen.getByRole('img', { name: 'Ada Lovelace' }).tagName).toBe('SPAN')
    rerender(<Avatar src='https://example.com/other.png' name='Ada Lovelace' />)
    expect(screen.getByRole('img', { name: 'Ada Lovelace' }).tagName).toBe('IMG')
  })

  it('detects an image that failed before hydration', () => {
    vi.spyOn(HTMLImageElement.prototype, 'naturalWidth', 'get').mockReturnValue(0)
    vi.spyOn(HTMLImageElement.prototype, 'complete', 'get').mockReturnValue(true)
    render(<Avatar src='https://example.com/missing.png' name='Grace Hopper' />)
    expect(screen.getByRole('img', { name: 'Grace Hopper' })).toHaveTextContent('GH')
  })

  it('renders a custom fallback, shape and ring', () => {
    const { container } = render(<Avatar name='Reader' fallback={<svg data-testid='fallback' />} shape='rounded' ring='premium' className='size-12' />)
    expect(screen.getByTestId('fallback')).toBeInTheDocument()
    expect(container.firstElementChild).toHaveClass('rounded-lake-control', 'ring-lake-warning/70', 'size-12')
  })

  it('derives initials from names', () => {
    expect(initialsOf('ada')).toBe('A')
    expect(initialsOf('  Ada   King Lovelace ')).toBe('AL')
    expect(initialsOf('张三')).toBe('张')
    expect(initialsOf('')).toBe('')
  })
})
