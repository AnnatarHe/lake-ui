import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import SelectField from './select-field'

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue', disabled: true },
]

describe('SelectField', () => {
  it('links the label, error and invalid state', () => {
    render(<SelectField label='Framework' options={options} error='Pick one' />)
    const select = screen.getByRole('combobox', { name: 'Framework' })
    expect(select).toHaveAccessibleDescription('Pick one')
    expect(select).toHaveAttribute('aria-invalid', 'true')
  })

  it('renders a disabled placeholder that is selected by default', () => {
    render(<SelectField label='Framework' options={options} placeholder='Choose…' />)
    const select = screen.getByRole<HTMLSelectElement>('combobox', { name: 'Framework' })
    const placeholder = screen.getByRole<HTMLOptionElement>('option', { name: 'Choose…' })
    expect(placeholder).toBeDisabled()
    expect(placeholder.value).toBe('')
    expect(select.value).toBe('')
  })

  it('changes value and styles through tokens only', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<SelectField label='Framework' options={options} defaultValue='react' onChange={onChange} className='wrapper' selectClassName='font-serif' />)
    const select = screen.getByRole('combobox', { name: 'Framework' })
    expect(select).toHaveClass('appearance-none', 'bg-lake-field', 'border-lake-line', 'font-serif')
    expect(select.parentElement?.parentElement).toHaveClass('wrapper')
    await user.selectOptions(select, 'react')
    expect(onChange).toHaveBeenCalled()
  })

  it('shows a spinner and disables the select while loading', () => {
    const { container } = render(<SelectField label='Framework' options={options} loading />)
    expect(screen.getByRole('combobox', { name: 'Framework' })).toBeDisabled()
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })
})
