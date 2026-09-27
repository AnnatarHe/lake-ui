import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Progress from './index'

describe('Progress', () => {
  it('exposes value, bounds and label', () => {
    render(<Progress value={30} max={60} label='Upload' showValue />)
    const bar = screen.getByRole('progressbar', { name: 'Upload' })
    expect(bar).toHaveAttribute('aria-valuenow', '30')
    expect(bar).toHaveAttribute('aria-valuemin', '0')
    expect(bar).toHaveAttribute('aria-valuemax', '60')
    expect(screen.getByText('50%')).toBeInTheDocument()
    expect(bar.firstElementChild).toHaveStyle({ width: '50%' })
  })

  it('clamps values and applies tone and size', () => {
    render(<Progress value={140} label='Sync' tone='success' size='sm' />)
    const bar = screen.getByRole('progressbar', { name: 'Sync' })
    expect(bar).toHaveAttribute('aria-valuenow', '100')
    expect(bar).toHaveClass('h-1.5')
    expect(bar.firstElementChild).toHaveClass('bg-lake-success')
  })

  it('is indeterminate without a value', () => {
    render(<Progress value={null} label='Loading' showValue />)
    const bar = screen.getByRole('progressbar', { name: 'Loading' })
    expect(bar).not.toHaveAttribute('aria-valuenow')
    expect(bar.firstElementChild).toHaveClass('animate-lake-indeterminate')
    expect(screen.queryByText(/%$/)).not.toBeInTheDocument()
  })
})
