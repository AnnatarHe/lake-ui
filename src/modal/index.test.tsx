import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import Modal from './index'

describe('Modal Component', () => {
  beforeEach(() => {
    // Setup a modal root element
    const modalRoot = document.createElement('div')
    modalRoot.setAttribute('data-st-role', 'modal')
    document.body.appendChild(modalRoot)
  })

  it('should not render when isOpen is false', () => {
    render(
      <Modal
        isOpen={false}
        onClose={vi.fn()}
        title='Test Modal'
      >
        <div>Modal Content</div>
      </Modal>,
    )

    expect(screen.queryByText('Test Modal')).toBeNull()
    expect(screen.queryByText('Modal Content')).toBeNull()
  })

  it('should render when isOpen is true', () => {
    render(
      <Modal
        isOpen={true}
        onClose={vi.fn()}
        title='Test Modal'
      >
        <div>Modal Content</div>
      </Modal>,
    )

    expect(screen.getByText('Test Modal')).toBeInTheDocument()
    expect(screen.getByText('Modal Content')).toBeInTheDocument()
  })

  it('should call onClose when close button is clicked', () => {
    const onClose = vi.fn()
    render(
      <Modal
        isOpen={true}
        onClose={onClose}
        title='Test Modal'
      >
        <div>Modal Content</div>
      </Modal>,
    )

    const closeButton = screen.getByRole('button')
    fireEvent.click(closeButton)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('should render with custom selector', () => {
    const customRoot = document.createElement('div')
    customRoot.setAttribute('id', 'custom-modal')
    document.body.appendChild(customRoot)

    render(
      <Modal
        isOpen={true}
        onClose={vi.fn()}
        title='Test Modal'
        selector='#custom-modal'
      >
        <div>Modal Content</div>
      </Modal>,
    )

    expect(screen.getByText('Test Modal')).toBeInTheDocument()
  })

  it('should render ReactNode title', () => {
    const titleComponent = <span data-testid='custom-title'>Custom Title</span>
    render(
      <Modal
        isOpen={true}
        onClose={vi.fn()}
        title={titleComponent}
      >
        <div>Modal Content</div>
      </Modal>,
    )

    expect(screen.getByTestId('custom-title')).toBeInTheDocument()
  })
})

describe('Modal size', () => {
  it.each([
    ['sm', 'max-w-sm'],
    ['md', 'max-w-lg'],
    ['lg', 'max-w-2xl'],
    [undefined, 'max-w-4xl'],
    ['full', 'max-w-none'],
  ] as const)('maps %s to %s', (size, expected) => {
    render(<Modal isOpen onClose={vi.fn()} title='Sized' size={size}>Body</Modal>)
    expect(screen.getByRole('dialog', { name: 'Sized' })).toHaveClass(expected)
  })

  it('lets className override the size', () => {
    render(<Modal isOpen onClose={vi.fn()} title='Custom' size='sm' className='max-w-xl'>Body</Modal>)
    const dialog = screen.getByRole('dialog', { name: 'Custom' })
    expect(dialog).toHaveClass('max-w-xl')
    expect(dialog).not.toHaveClass('max-w-sm')
  })
})
