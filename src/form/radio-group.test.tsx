import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import RadioGroup from './radio-group'

const defaultOptions = [
  { value: 'a', label: 'Option A' },
  { value: 'b', label: 'Option B' },
  { value: 'c', label: 'Option C' },
]

describe('RadioGroup Component', () => {
  it('should render label', () => {
    render(
      <RadioGroup label='Pick one' options={defaultOptions} onChange={vi.fn()} />,
    )
    expect(screen.getByText('Pick one')).toBeInTheDocument()
  })

  it('should render all options', () => {
    render(
      <RadioGroup options={defaultOptions} onChange={vi.fn()} />,
    )
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
    expect(screen.getByText('Option C')).toBeInTheDocument()
  })

  it('should call onChange when an option is clicked', () => {
    const onChange = vi.fn()
    render(
      <RadioGroup options={defaultOptions} onChange={onChange} />,
    )
    fireEvent.click(screen.getByText('Option B'))
    expect(onChange).toHaveBeenCalledWith('b')
  })

  it('should show selected state', () => {
    render(
      <RadioGroup options={defaultOptions} value='a' onChange={vi.fn()} />,
    )
    const radioA = screen.getByRole('radio', { name: /Option A/i })
    expect(radioA).toHaveAttribute('aria-checked', 'true')
    const radioB = screen.getByRole('radio', { name: /Option B/i })
    expect(radioB).toHaveAttribute('aria-checked', 'false')
  })

  it('should render error message', () => {
    render(
      <RadioGroup
        options={defaultOptions}
        onChange={vi.fn()}
        error='Selection required'
      />,
    )
    expect(screen.getByText('Selection required')).toBeInTheDocument()
  })

  it('should not call onChange when disabled', () => {
    const onChange = vi.fn()
    render(
      <RadioGroup options={defaultOptions} onChange={onChange} disabled />,
    )
    fireEvent.click(screen.getByText('Option A'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should not call onChange for individually disabled options', () => {
    const onChange = vi.fn()
    const options = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B', disabled: true },
    ]
    render(
      <RadioGroup options={options} onChange={onChange} />,
    )
    fireEvent.click(screen.getByText('Option B'))
    expect(onChange).not.toHaveBeenCalled()
  })

  it('should render option descriptions', () => {
    const options = [
      { value: 'a', label: 'Option A', description: 'Description for A' },
    ]
    render(
      <RadioGroup options={options} onChange={vi.fn()} />,
    )
    expect(screen.getByText('Description for A')).toBeInTheDocument()
  })

  it('should render loading state', () => {
    const { container } = render(
      <RadioGroup options={defaultOptions} onChange={vi.fn()} loading />,
    )
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('should render without label', () => {
    render(
      <RadioGroup options={defaultOptions} onChange={vi.fn()} />,
    )
    expect(screen.getByText('Option A')).toBeInTheDocument()
  })

  it('should render ReactNode label', () => {
    render(
      <RadioGroup
        label={<span data-testid='custom-label'>Custom Label</span>}
        options={defaultOptions}
        onChange={vi.fn()}
      />,
    )
    expect(screen.getByTestId('custom-label')).toBeInTheDocument()
  })
})
