import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Skeleton from './index'

describe('Skeleton', () => {
  it('renders a hidden animated block', () => {
    const { container } = render(<Skeleton className='h-8' />)
    const block = container.firstElementChild
    expect(block).toHaveAttribute('aria-hidden', 'true')
    expect(block).toHaveClass('animate-pulse', 'rounded-lake-control', 'h-8')
    expect(block).not.toHaveClass('h-4')
  })

  it('renders text lines with a shorter last line', () => {
    const { container } = render(<Skeleton shape='text' lines={3} />)
    const lines = container.firstElementChild!.children
    expect(lines).toHaveLength(3)
    expect(lines[2]).toHaveClass('w-3/5')
    expect(lines[0]).toHaveClass('w-full')
  })

  it('renders a static circle', () => {
    const { container } = render(<Skeleton shape='circle' animated={false} />)
    expect(container.firstElementChild).toHaveClass('rounded-full')
    expect(container.firstElementChild).not.toHaveClass('animate-pulse')
  })
})
