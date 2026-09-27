import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import EmptyState from './index'

describe('EmptyState', () => {
  it('renders title, description, icon and action', () => {
    render(
      <EmptyState
        icon={<svg data-testid='icon' />}
        title='No highlights yet'
        description='Import your Kindle clippings to get started.'
        action={<button>Import</button>}
      />,
    )
    expect(screen.getByRole('heading', { level: 3, name: 'No highlights yet' })).toBeInTheDocument()
    expect(screen.getByText('Import your Kindle clippings to get started.')).toBeInTheDocument()
    expect(screen.getByTestId('icon').parentElement).toHaveAttribute('aria-hidden', 'true')
    expect(screen.getByRole('button', { name: 'Import' })).toBeInTheDocument()
  })

  it('supports heading level, size and className', () => {
    const { container } = render(<EmptyState title='Empty' headingLevel={2} size='sm' className='border' />)
    expect(screen.getByRole('heading', { level: 2, name: 'Empty' })).toHaveClass('text-sm')
    expect(container.firstElementChild).toHaveClass('py-8', 'border')
  })
})
