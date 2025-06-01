'use client'

import { X } from 'lucide-react'
import { JSX, useEffect } from 'react'
import ReactDOM from 'react-dom'

type Props = {
  selector?: string
  title: string | React.ReactNode
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

function ModalInner(props: Props): JSX.Element | null {
  const { isOpen, onClose, children, title } = props
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    }
    else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2'>
      <div className='w-full max-w-4xl rounded-xl border border-gray-700 bg-gray-800'>
        <div className='flex items-center justify-between border-b border-gray-700 p-4'>
          <h3 className='text-lg font-medium text-white line-clamp-1'>
            {title}
          </h3>
          <button
            onClick={onClose}
            className='rounded-lg p-1 text-gray-400 hover:text-gray-300'
          >
            <X className='h-5 w-5' />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}

function Modal(props: Props): JSX.Element | null {
  const { selector = '[data-st-role=modal]' } = props
  const modalRoot
    = typeof document !== 'undefined' ? document.querySelector(selector) : null
  if (!modalRoot) return null
  return ReactDOM.createPortal(<ModalInner {...props} />, modalRoot)
}

export default Modal
