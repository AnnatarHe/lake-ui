'use client'

import { useRef } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface SegmentedOption<V extends string> {
  value: V
  label: ReactNode
  icon?: ReactNode
  disabled?: boolean
}

export interface SegmentedControlProps<V extends string> {
  'options': SegmentedOption<V>[]
  'value': V
  'onValueChange': (value: V) => void
  'aria-label': string
  'size'?: 'sm' | 'md'
  'fullWidth'?: boolean
  'className'?: string
}

const sizeClasses = {
  sm: 'h-7 px-2.5 text-xs',
  md: 'h-8 px-3 text-sm',
}

function SegmentedControl<V extends string>({
  options,
  value,
  onValueChange,
  'aria-label': ariaLabel,
  size = 'md',
  fullWidth = false,
  className,
}: SegmentedControlProps<V>) {
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([])
  const selectedIndex = options.findIndex(option => option.value === value && !option.disabled)
  const focusableIndex = selectedIndex >= 0 ? selectedIndex : options.findIndex(option => !option.disabled)

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const enabled = options.map((option, index) => (option.disabled ? -1 : index)).filter(index => index >= 0)
    if (enabled.length === 0) return
    const current = optionRefs.current.findIndex(option => option === document.activeElement)
    const position = enabled.indexOf(current)
    let next: number | undefined
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = enabled[(position + 1) % enabled.length]
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = enabled[(position - 1 + enabled.length) % enabled.length]
    else if (event.key === 'Home') next = enabled[0]
    else if (event.key === 'End') next = enabled[enabled.length - 1]
    if (next === undefined) return
    event.preventDefault()
    optionRefs.current[next]?.focus()
    onValueChange(options[next].value)
  }

  return (
    <div
      role='radiogroup'
      aria-label={ariaLabel}
      onKeyDown={onKeyDown}
      className={cn(
        'items-center gap-1 rounded-lake-control bg-lake-surface-muted p-1 ring-1 ring-inset ring-lake-line',
        fullWidth ? 'flex w-full' : 'inline-flex',
        className,
      )}
    >
      {options.map((option, index) => {
        const checked = option.value === value
        return (
          <button
            key={option.value}
            ref={(node) => {
              optionRefs.current[index] = node
            }}
            type='button'
            role='radio'
            aria-checked={checked}
            tabIndex={index === focusableIndex ? 0 : -1}
            disabled={option.disabled}
            onClick={() => onValueChange(option.value)}
            className={cn(
              'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-[calc(var(--lake-radius-control)_-_4px)] font-medium',
              'outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-lake-ring',
              'disabled:pointer-events-none disabled:opacity-50',
              sizeClasses[size],
              fullWidth && 'flex-1',
              checked
                ? 'bg-lake-surface-raised text-lake-fg shadow-lake-card'
                : 'text-lake-fg-muted hover:text-lake-fg',
            )}
          >
            {option.icon && <span aria-hidden='true' className='inline-flex shrink-0'>{option.icon}</span>}
            {option.label}
          </button>
        )
      })}
    </div>
  )
}

export default SegmentedControl
