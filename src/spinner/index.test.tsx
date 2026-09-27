import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Spinner from './index'

describe('Spinner', () => {
  it('announces a label by default', () => {
    render(<Spinner />)
    expect(screen.getByRole('status')).toHaveTextContent('Loading')
  })

  it('accepts a custom label, size and className', () => {
    const { container } = render(<Spinner label='Saving' size='lg' className='text-lake-accent' />)
    expect(screen.getByRole('status')).toHaveTextContent('Saving')
    expect(screen.getByRole('status')).toHaveClass('text-lake-accent')
    expect(container.querySelector('svg')).toHaveClass('size-6', 'animate-spin')
  })

  it('is decorative with an empty label', () => {
    const { container } = render(<Spinner label='' />)
    expect(screen.queryByRole('status')).not.toBeInTheDocument()
    expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true')
  })
})
