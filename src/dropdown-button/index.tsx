'use client'

import { ChevronDown } from 'lucide-react'
import React, { useCallback, useEffect, useRef } from 'react'

import useClickOutside from '@/hooks/useClickOutside'
import { cn } from '@/utils/cn'

export interface DropdownButtonOption {
  label: string
  value: string
  icon?: React.ReactNode
  disabled?: boolean
}

export interface DropdownButtonProps {
  children: React.ReactNode
  options: DropdownButtonOption[]
  onSelect: (value: string) => void
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: 'default' | 'primary'
  /** Accessible name of the chevron button that opens the menu. */
  menuLabel?: string
}

const variantClasses = {
  default: 'border-lake-line bg-lake-field text-lake-fg-muted',
  primary: 'border-lake-accent bg-lake-accent text-lake-accent-fg',
}

const hoverClasses = {
  default: 'hover:bg-lake-surface-muted',
  primary: 'hover:bg-lake-accent-hover',
}

const dividerClasses = {
  default: 'border-lake-line',
  primary: 'border-lake-accent-fg/25',
}

function DropdownButton(props: DropdownButtonProps) {
  const {
    children,
    options,
    onSelect,
    onClick,
    disabled,
    className,
    variant = 'default',
    menuLabel = 'More options',
  } = props

  const [isOpen, setIsOpen] = React.useState(false)
  const toggleRef = useRef<HTMLButtonElement>(null)

  const ref = useClickOutside(
    useCallback(() => {
      setIsOpen(false)
    }, []),
  )

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setIsOpen(false)
      toggleRef.current?.focus()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  return (
    <div className={cn('relative inline-flex', className)} ref={ref}>
      <div
        className={cn(
          'inline-flex rounded-lake-control border shadow-lake-card transition-all duration-200',
          variantClasses[variant],
          disabled && 'opacity-60 cursor-not-allowed',
        )}
      >
        {/* Main action button */}
        <button
          type='button'
          className={cn(
            'px-3.5 py-2 text-sm font-medium rounded-l-lake-control transition-colors',
            'outline-none focus-visible:ring-2 focus-visible:ring-lake-ring',
            hoverClasses[variant],
            disabled && 'cursor-not-allowed',
          )}
          onClick={onClick}
          disabled={disabled}
        >
          {children}
        </button>
        {/* Divider + Chevron */}
        <button
          ref={toggleRef}
          type='button'
          className={cn(
            'px-2 py-2 rounded-r-lake-control transition-colors',
            'border-l',
            dividerClasses[variant],
            hoverClasses[variant],
            'outline-none focus-visible:ring-2 focus-visible:ring-lake-ring',
            disabled && 'cursor-not-allowed',
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-label={menuLabel}
          aria-haspopup='listbox'
          aria-expanded={isOpen}
        >
          <ChevronDown
            aria-hidden='true'
            className={cn(
              'h-4 w-4 transition-transform duration-200',
              isOpen && 'rotate-180',
            )}
          />
        </button>
      </div>
      {/* Dropdown menu */}
      {isOpen && (
        <div
          className={cn(
            'absolute right-0 top-full z-20 mt-1 min-w-[12rem] rounded-lake-control border shadow-lake-overlay',
            'animate-in fade-in-50 slide-in-from-top-2 motion-reduce:animate-none',
            'border-lake-line bg-lake-surface-raised',
          )}
          role='listbox'
          aria-label={menuLabel}
        >
          {options.map(option => (
            <button
              key={option.value}
              type='button'
              className={cn(
                'flex w-full items-center gap-2 px-3.5 py-2 text-sm text-left transition-colors',
                'text-lake-fg-muted hover:bg-lake-surface-muted hover:text-lake-fg',
                'first:rounded-t-lake-control last:rounded-b-lake-control',
                option.disabled && 'opacity-50 cursor-not-allowed',
              )}
              onClick={() => {
                if (!option.disabled) {
                  onSelect(option.value)
                  setIsOpen(false)
                }
              }}
              disabled={option.disabled}
              role='option'
              aria-selected={false}
            >
              {option.icon && <span className='flex-shrink-0'>{option.icon}</span>}
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default DropdownButton
