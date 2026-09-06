import { cleanup, render, screen } from '@testing-library/react'
import { StrictMode } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Modal from '../modal'
import Sheet from '../sheet'

afterEach(() => {
  cleanup()
  document.body.style.overflow = ''
  document.querySelector('#overlays')?.remove()
})

describe('overlay scroll locking', () => {
  it.each([true, false])('keeps the lock until the last overlay closes (modal first: %s)', (modalFirst) => {
    const root = document.createElement('div')
    root.id = 'overlays'
    document.body.append(root)
    document.body.style.overflow = 'scroll'
    const overlay = (modal: boolean, sheet: boolean) => (
      <StrictMode>
        <Modal selector='#overlays' isOpen={modal} title='Modal' onClose={vi.fn()}>Content</Modal>
        <Sheet selector='#overlays' isOpen={sheet} title='Sheet' onClose={vi.fn()}>Content</Sheet>
      </StrictMode>
    )
    const { rerender, unmount } = render(overlay(true, true))
    expect(document.body.style.overflow).toBe('hidden')
    for (const button of screen.getAllByRole('button', { name: 'Close' })) {
      expect(button).toHaveAttribute('type', 'button')
    }
    rerender(overlay(!modalFirst, modalFirst))
    expect(document.body.style.overflow).toBe('hidden')
    rerender(overlay(false, false))
    expect(document.body.style.overflow).toBe('scroll')
    rerender(overlay(true, false))
    unmount()
    expect(document.body.style.overflow).toBe('scroll')
  })
})
