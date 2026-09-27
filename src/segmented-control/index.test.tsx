import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import SegmentedControl from './index'

const options = [
  { value: 'grid', label: 'Grid' },
  { value: 'list', label: 'List' },
  { value: 'table', label: 'Table', disabled: true },
  { value: 'wall', label: 'Wall' },
]

function Example() {
  const [value, setValue] = useState('grid')
  return <SegmentedControl options={options} value={value} onValueChange={setValue} aria-label='Layout' />
}

describe('SegmentedControl', () => {
  it('renders a radiogroup with roving focus', () => {
    render(<Example />)
    expect(screen.getByRole('radiogroup', { name: 'Layout' })).toBeInTheDocument()
    expect(screen.getByRole('radio', { name: 'Grid' })).toHaveAttribute('aria-checked', 'true')
    expect(screen.getByRole('radio', { name: 'Grid' })).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('radio', { name: 'List' })).toHaveAttribute('tabindex', '-1')
  })

  it('selects with clicks and arrow keys, skipping disabled options', async () => {
    const user = userEvent.setup()
    render(<Example />)
    await user.click(screen.getByRole('radio', { name: 'List' }))
    expect(screen.getByRole('radio', { name: 'List' })).toHaveAttribute('aria-checked', 'true')
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('radio', { name: 'Wall' })).toHaveFocus()
    expect(screen.getByRole('radio', { name: 'Wall' })).toHaveAttribute('aria-checked', 'true')
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('radio', { name: 'Grid' })).toHaveAttribute('aria-checked', 'true')
    await user.keyboard('{ArrowUp}')
    expect(screen.getByRole('radio', { name: 'Wall' })).toHaveAttribute('aria-checked', 'true')
  })

  it('stretches when fullWidth', () => {
    render(<SegmentedControl options={options} value='grid' onValueChange={() => {}} aria-label='Layout' fullWidth size='sm' />)
    expect(screen.getByRole('radiogroup')).toHaveClass('flex', 'w-full')
    expect(screen.getByRole('radio', { name: 'Grid' })).toHaveClass('flex-1', 'h-7')
  })
})
