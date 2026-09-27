'use client'

import { ChevronDown } from 'lucide-react'
import React from 'react'

import Menu from '@/menu'
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

  return (
    <div className={cn('relative inline-flex', className)}>
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
        <Menu
          open={isOpen && !disabled}
          onOpenChange={setIsOpen}
          label={menuLabel}
          placement='bottom-end'
          className='min-w-[12rem]'
          items={options.map(option => ({
            key: option.value,
            label: option.label,
            icon: option.icon,
            disabled: option.disabled,
            onSelect: () => onSelect(option.value),
          }))}
          trigger={(
            <button
              type='button'
              className={cn(
                'px-2 py-2 rounded-r-lake-control transition-colors',
                'border-l',
                dividerClasses[variant],
                hoverClasses[variant],
                'outline-none focus-visible:ring-2 focus-visible:ring-lake-ring',
                disabled && 'cursor-not-allowed',
              )}
              disabled={disabled}
              aria-label={menuLabel}
            >
              <ChevronDown
                aria-hidden='true'
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  isOpen && 'rotate-180',
                )}
              />
            </button>
          )}
        />
      </div>
    </div>
  )
}

export default DropdownButton
