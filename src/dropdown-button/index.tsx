'use client'

import { ChevronDown } from 'lucide-react'
import React, { useCallback } from 'react'

import useClickOutside from '@/hooks/useClickOutside'
import { cn } from '@/utils/cn'

interface DropdownButtonOption {
  label: string
  value: string
  icon?: React.ReactNode
  disabled?: boolean
}

interface DropdownButtonProps {
  children: React.ReactNode
  options: DropdownButtonOption[]
  onSelect: (value: string) => void
  onClick?: () => void
  disabled?: boolean
  className?: string
  variant?: 'default' | 'primary'
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
  } = props

  const [isOpen, setIsOpen] = React.useState(false)

  const ref = useClickOutside(
    useCallback(() => {
      setIsOpen(false)
    }, []),
  )

  const variantClasses = {
    default: cn(
      'border-gray-200 bg-white text-gray-700',
      'dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200',
    ),
    primary: cn(
      'border-blue-500 bg-blue-500 text-white',
      'dark:border-blue-600 dark:bg-blue-600',
    ),
  }

  const hoverClasses = {
    default: 'hover:bg-gray-50 dark:hover:bg-gray-700/50',
    primary: 'hover:bg-blue-600 dark:hover:bg-blue-700',
  }

  const dividerClasses = {
    default: 'border-gray-200 dark:border-gray-700',
    primary: 'border-blue-400 dark:border-blue-500',
  }

  return (
    <div className={cn('relative inline-flex', className)} ref={ref}>
      <div
        className={cn(
          'inline-flex rounded-lg border shadow-sm transition-all duration-200',
          variantClasses[variant],
          disabled && 'opacity-60 cursor-not-allowed',
        )}
      >
        {/* Main action button */}
        <button
          type='button'
          className={cn(
            'px-3.5 py-2 text-sm font-medium rounded-l-lg transition-colors',
            'focus:outline-none focus:ring-2 focus:ring-blue-500/20',
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
          type='button'
          className={cn(
            'px-2 py-2 rounded-r-lg transition-colors',
            'border-l',
            dividerClasses[variant],
            hoverClasses[variant],
            'focus:outline-none focus:ring-2 focus:ring-blue-500/20',
            disabled && 'cursor-not-allowed',
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup='listbox'
          aria-expanded={isOpen}
        >
          <ChevronDown
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
            'absolute right-0 top-full z-20 mt-1 min-w-[12rem] rounded-lg border shadow-lg',
            'animate-in fade-in-50 slide-in-from-top-2',
            'border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800',
          )}
          role='listbox'
        >
          {options.map(option => (
            <button
              key={option.value}
              type='button'
              className={cn(
                'flex w-full items-center gap-2 px-3.5 py-2 text-sm text-left transition-colors',
                'text-gray-700 hover:bg-gray-100/80',
                'dark:text-gray-300 dark:hover:bg-gray-700/50',
                'first:rounded-t-lg last:rounded-b-lg',
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
