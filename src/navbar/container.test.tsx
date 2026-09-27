import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import NavbarContainer from './container'

describe('NavbarContainer', () => {
  it('renders a header with token styles and an animated entrance', () => {
    render(<NavbarContainer>Links</NavbarContainer>)
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-lake-surface/95', 'border-lake-line', 'animate-in')
    expect(screen.getByText('Links')).toHaveClass('max-w-7xl')
  })

  it('supports as, innerClassName, attributes and disabling the animation', () => {
    render(
      <NavbarContainer as='nav' aria-label='Primary' variant='solid' animated={false} innerClassName='max-w-3xl' className='top-2'>
        Links
      </NavbarContainer>,
    )
    const nav = screen.getByRole('navigation', { name: 'Primary' })
    expect(nav).toHaveClass('top-2', 'border-lake-line-strong')
    expect(nav).not.toHaveClass('animate-in', 'top-0')
    expect(screen.getByText('Links')).toHaveClass('max-w-3xl')
    expect(screen.getByText('Links')).not.toHaveClass('max-w-7xl')
  })
})
