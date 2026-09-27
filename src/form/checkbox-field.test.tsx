import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import CheckboxField from './checkbox-field'

describe('CheckboxField', () => {
  it('is named by its label and described by description and error', () => {
    render(<CheckboxField label='Email me' description='Weekly digest' error='Required' onChange={vi.fn()} />)
    const checkbox = screen.getByRole('checkbox', { name: 'Email me' })
    expect(checkbox).toHaveAccessibleDescription('Weekly digest Required')
    expect(checkbox).toHaveAttribute('aria-invalid', 'true')
  })

  it('reports the next checked state from clicks and the label', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<CheckboxField label='Public' checked={false} onChange={onChange} name='public' />)
    await user.click(screen.getByText('Public'))
    expect(onChange).toHaveBeenLastCalledWith(true)
    expect(screen.getByRole('checkbox')).toHaveAttribute('name', 'public')
  })

  it('sets the indeterminate state and respects disabled', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    const { rerender } = render(<CheckboxField label='All' indeterminate onChange={onChange} />)
    expect(screen.getByRole<HTMLInputElement>('checkbox', { name: 'All' }).indeterminate).toBe(true)
    rerender(<CheckboxField label='All' onChange={onChange} disabled />)
    expect(screen.getByRole<HTMLInputElement>('checkbox', { name: 'All' }).indeterminate).toBe(false)
    await user.click(screen.getByRole('checkbox'))
    expect(onChange).not.toHaveBeenCalled()
  })
})
