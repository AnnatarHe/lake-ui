import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Card from './index'

describe('Card', () => {
  it('renders token styles and lets className win', () => {
    render(<Card className='rounded-none p-2'>Content</Card>)
    const card = screen.getByText('Content')
    expect(card.tagName).toBe('DIV')
    expect(card).toHaveClass('bg-lake-surface/95', 'border-lake-line', 'shadow-lake-card', 'rounded-none', 'p-2')
    expect(card).not.toHaveClass('rounded-lake-panel', 'p-4')
  })

  it('renders a custom element with passthrough attributes', () => {
    render(<Card as='section' aria-label='Stats' data-testid='card' id='stats' variant='bordered' padding='none'>Body</Card>)
    const card = screen.getByRole('region', { name: 'Stats' })
    expect(card.tagName).toBe('SECTION')
    expect(card).toHaveAttribute('id', 'stats')
    expect(card).toHaveClass('border-2', 'bg-lake-surface')
  })

  it('supports the elevated variant', () => {
    render(<Card variant='elevated'>Raised</Card>)
    expect(screen.getByText('Raised')).toHaveClass('shadow-lg', 'from-lake-surface')
  })
})
