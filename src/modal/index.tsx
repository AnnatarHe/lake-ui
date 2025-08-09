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
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 dark:bg-black/50 p-4 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-2'>
      <div className='w-full max-w-4xl rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800'>
        <div className='flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6'>
          <h3 className='text-lg font-semibold text-gray-900 dark:text-white line-clamp-1'>
            {title}
          </h3>
          <button
            onClick={onClose}
            className='rounded-lg p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700'
          >
            <X className='h-5 w-5' />
          </button>
        </div>
        <div className='p-4 sm:p-6 text-gray-700 dark:text-gray-300'>
          {children}
        </div>
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
