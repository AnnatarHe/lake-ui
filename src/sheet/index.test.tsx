import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Sheet from './index'

describe('Sheet Component', () => {
  beforeEach(() => {
    const sheetRoot = document.createElement('div')
    sheetRoot.setAttribute('data-st-role', 'sheet')
    document.body.appendChild(sheetRoot)
  })

  it('should not render when isOpen is false', () => {
    render(
      <Sheet isOpen={false} onClose={vi.fn()} title='Test Sheet'>
        <div>Sheet Content</div>
      </Sheet>,
    )
    expect(screen.queryByText('Test Sheet')).toBeNull()
    expect(screen.queryByText('Sheet Content')).toBeNull()
  })

  it('should render when isOpen is true', () => {
    render(
      <Sheet isOpen={true} onClose={vi.fn()} title='Test Sheet'>
        <div>Sheet Content</div>
      </Sheet>,
    )
    expect(screen.getByText('Test Sheet')).toBeInTheDocument()
    expect(screen.getByText('Sheet Content')).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(
      <Sheet isOpen={true} onClose={onClose} title='Test Sheet'>
        <div>Sheet Content</div>
      </Sheet>,
    )
    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should render with custom selector', () => {
    const customRoot = document.createElement('div')
    customRoot.setAttribute('id', 'custom-sheet')
    document.body.appendChild(customRoot)

    render(
      <Sheet isOpen={true} onClose={vi.fn()} title='Custom Sheet' selector='#custom-sheet'>
        <div>Sheet Content</div>
      </Sheet>,
    )
    expect(screen.getByText('Custom Sheet')).toBeInTheDocument()
  })

  it('should render without title', () => {
    render(
      <Sheet isOpen={true} onClose={vi.fn()}>
        <div>Sheet Content</div>
      </Sheet>,
    )
    expect(screen.getByText('Sheet Content')).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should call onClose when Escape key is pressed', () => {
    const onClose = vi.fn()
    render(
      <Sheet isOpen={true} onClose={onClose} title='Test Sheet'>
        <div>Sheet Content</div>
      </Sheet>,
    )
    fireEvent.keyDown(document, { key: 'Escape' })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should call onClose when backdrop is clicked', () => {
    const onClose = vi.fn()
    render(
      <Sheet isOpen={true} onClose={onClose} title='Test Sheet'>
        <div>Sheet Content</div>
      </Sheet>,
    )
    const backdrop = document.querySelector('.backdrop-blur-sm') as HTMLElement
    fireEvent.click(backdrop)
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
