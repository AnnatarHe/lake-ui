import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SwitchField from './switch-field'

describe('SwitchField', () => {
  it('is named by its label and described by description and error', () => {
    render(<SwitchField label='Notifications' description='Email me' error='Required' value={false} onChange={vi.fn()} />)
    const toggle = screen.getByRole('switch', { name: 'Notifications' })
    expect(toggle).toHaveAccessibleDescription('Email me Required')
    expect(toggle).toHaveAttribute('aria-invalid', 'true')
    expect(toggle).toHaveAttribute('aria-checked', 'false')
  })

  it('toggles via click and the label', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SwitchField label='Notifications' value onChange={onChange} />)
    await user.click(screen.getByRole('switch'))
    expect(onChange).toHaveBeenLastCalledWith(false)
    await user.click(screen.getByText('Notifications'))
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('is busy and disabled while loading', () => {
    render(<SwitchField label='Sync' value onChange={vi.fn()} loading />)
    const toggle = screen.getByRole('switch', { name: 'Sync' })
    expect(toggle).toBeDisabled()
    expect(toggle).toHaveAttribute('aria-busy', 'true')
  })
})
