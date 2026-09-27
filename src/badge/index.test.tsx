import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Badge from './index'

describe('Badge', () => {
  it('renders a neutral soft pill by default', () => {
    render(<Badge>Draft</Badge>)
    expect(screen.getByText('Draft')).toHaveClass('rounded-full', 'text-lake-fg-muted', 'h-5')
  })

  it.each([
    ['accent', 'soft', 'bg-lake-accent-soft'],
    ['success', 'outline', 'text-lake-success'],
    ['warning', 'soft', 'bg-lake-warning-soft'],
    ['danger', 'solid', 'bg-lake-danger'],
  ] as const)('supports tone %s with variant %s', (tone, variant, expected) => {
    render(<Badge tone={tone} variant={variant}>Label</Badge>)
    expect(screen.getByText('Label')).toHaveClass(expected)
  })

  it('renders an icon and merges className', () => {
    render(<Badge size='md' icon={<svg data-testid='icon' />} className='uppercase'>Pro</Badge>)
    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByText('Pro')).toHaveClass('h-6', 'uppercase')
  })
})
