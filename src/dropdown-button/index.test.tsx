import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import DropdownButton from './index'

const defaultOptions = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c', disabled: true },
]

describe('DropdownButton Component', () => {
  it('should render main button text', () => {
    render(
      <DropdownButton onSelect={vi.fn()} options={defaultOptions}>
        Download
      </DropdownButton>,
    )
    expect(screen.getByText('Download')).toBeInTheDocument()
  })

  it('should call onClick when main button is clicked', () => {
    const onClick = vi.fn()
    render(
      <DropdownButton onClick={onClick} onSelect={vi.fn()} options={defaultOptions}>
        Download
      </DropdownButton>,
    )
    fireEvent.click(screen.getByText('Download'))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should not show dropdown initially', () => {
    render(
      <DropdownButton onSelect={vi.fn()} options={defaultOptions}>
        Download
      </DropdownButton>,
    )
    expect(screen.queryByText('Option A')).toBeNull()
  })

  it('should show dropdown when chevron is clicked', () => {
    render(
      <DropdownButton onSelect={vi.fn()} options={defaultOptions}>
        Download
      </DropdownButton>,
    )
    const chevronButton = screen.getByRole('button', { expanded: false })
    fireEvent.click(chevronButton)
    expect(screen.getByText('Option A')).toBeInTheDocument()
    expect(screen.getByText('Option B')).toBeInTheDocument()
  })

  it('should call onSelect when an option is clicked', () => {
    const onSelect = vi.fn()
    render(
      <DropdownButton onSelect={onSelect} options={defaultOptions}>
        Download
      </DropdownButton>,
    )
    const chevronButton = screen.getByRole('button', { expanded: false })
    fireEvent.click(chevronButton)
    fireEvent.click(screen.getByText('Option A'))
    expect(onSelect).toHaveBeenCalledWith('a')
  })

  it('should close dropdown after selecting an option', () => {
    render(
      <DropdownButton onSelect={vi.fn()} options={defaultOptions}>
        Download
      </DropdownButton>,
    )
    const chevronButton = screen.getByRole('button', { expanded: false })
    fireEvent.click(chevronButton)
    fireEvent.click(screen.getByText('Option A'))
    expect(screen.queryByText('Option A')).toBeNull()
  })

  it('should not call onSelect for disabled options', () => {
    const onSelect = vi.fn()
    render(
      <DropdownButton onSelect={onSelect} options={defaultOptions}>
        Download
      </DropdownButton>,
    )
    const chevronButton = screen.getByRole('button', { expanded: false })
    fireEvent.click(chevronButton)
    fireEvent.click(screen.getByText('Option C'))
    expect(onSelect).not.toHaveBeenCalled()
  })

  it('should not open dropdown when disabled', () => {
    render(
      <DropdownButton disabled onSelect={vi.fn()} options={defaultOptions}>
        Download
      </DropdownButton>,
    )
    const buttons = screen.getAllByRole('button')
    fireEvent.click(buttons[1])
    expect(screen.queryByText('Option A')).toBeNull()
  })

  it('should render with option icons', () => {
    const optionsWithIcons = [
      { label: 'Download CSV', value: 'csv', icon: <span data-testid='icon-csv'>CSV</span> },
    ]
    render(
      <DropdownButton onSelect={vi.fn()} options={optionsWithIcons}>
        Export
      </DropdownButton>,
    )
    const chevronButton = screen.getByRole('button', { expanded: false })
    fireEvent.click(chevronButton)
    expect(screen.getByTestId('icon-csv')).toBeInTheDocument()
  })
})
