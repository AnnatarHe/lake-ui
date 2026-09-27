import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import NumberField from './number-field'

describe('NumberField', () => {
  it('links label and error', () => {
    render(<NumberField label='Amount' error='Too high' />)
    const input = screen.getByRole('spinbutton', { name: 'Amount' })
    expect(input).toHaveAccessibleDescription('Too high')
    expect(input).toHaveAttribute('aria-invalid', 'true')
  })

  it('merges className with the shared field styles', () => {
    render(<NumberField label='Amount' className='w-24' min={0} />)
    const input = screen.getByRole('spinbutton', { name: 'Amount' })
    expect(input).toHaveClass('w-24', 'rounded-lake-control', 'border-lake-line')
    expect(input).not.toHaveClass('w-full')
    expect(input).toHaveAttribute('min', '0')
  })
})
