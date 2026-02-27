'use client'

import { X } from 'lucide-react'
import { JSX, useEffect } from 'react'
import ReactDOM from 'react-dom'

import { cn } from '@/utils/cn'

interface SheetProps {
  isOpen: boolean
  onClose: () => void
  title?: string | React.ReactNode
  children: React.ReactNode
  selector?: string
  className?: string
  side?: 'left' | 'right'
  width?: string
}

function SheetInner(props: SheetProps): JSX.Element | null {
  const {
    isOpen,
    onClose,
    children,
    title,
    className,
    side = 'right',
    width = 'max-w-md',
  } = props

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

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex'>
      {/* Backdrop */}
      <div
        className='fixed inset-0 bg-black/20 dark:bg-black/50 backdrop-blur-sm animate-in fade-in'
        onClick={onClose}
      />
      {/* Sheet panel */}
      <div
        className={cn(
          'fixed inset-y-0 z-50 flex w-full flex-col',
          'border-gray-200 bg-white shadow-2xl',
          'dark:border-gray-700 dark:bg-gray-800',
          width,
          side === 'right' && 'right-0 border-l animate-in slide-in-from-right',
          side === 'left' && 'left-0 border-r animate-in slide-in-from-left',
          className,
        )}
      >
        {/* Header */}
        <div className='flex items-center justify-between border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6'>
          {title && (
            <h3 className='text-lg font-semibold text-gray-900 dark:text-white line-clamp-1'>
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className={cn(
              'rounded-lg p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors',
              'dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700',
              !title && 'ml-auto',
            )}
          >
            <X className='h-5 w-5' />
          </button>
        </div>
        {/* Content */}
        <div className='flex-1 overflow-y-auto p-4 sm:p-6 text-gray-700 dark:text-gray-300'>
          {children}
        </div>
      </div>
    </div>
  )
}

function Sheet(props: SheetProps): JSX.Element | null {
  const { selector = '[data-st-role=sheet]' } = props
  const sheetRoot
    = typeof document !== 'undefined' ? document.querySelector(selector) : null
  if (!sheetRoot) return null
  return ReactDOM.createPortal(<SheetInner {...props} />, sheetRoot)
}

export default Sheet
