import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Kbd from './index'

describe('Kbd', () => {
  it('renders a styled kbd element with passthrough props', () => {
    render(<Kbd title='Command' className='text-xs'>⌘K</Kbd>)
    const key = screen.getByText('⌘K')
    expect(key.tagName).toBe('KBD')
    expect(key).toHaveAttribute('title', 'Command')
    expect(key).toHaveClass('font-mono', 'border-lake-line', 'text-xs')
  })
})
