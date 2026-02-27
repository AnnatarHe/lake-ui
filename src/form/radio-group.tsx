'use client'

import { Loader2 } from 'lucide-react'
import React from 'react'

import { cn } from '@/utils/cn'

interface RadioGroupProps {
  label?: string | React.ReactNode
  options: Array<{
    value: string
    label: string | React.ReactNode
    description?: string
    disabled?: boolean
  }>
  value?: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
  loading?: boolean
  className?: string
  name?: string
}

function RadioGroup(props: RadioGroupProps) {
  const {
    label,
    options,
    value,
    onChange,
    error,
    disabled,
    loading,
    className,
    name,
  } = props

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <label
          className={cn(
            'mb-1.5 block text-sm font-medium transition-colors text-gray-700 dark:text-gray-300',
            (disabled || loading) && 'opacity-60',
          )}
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          'relative space-y-2',
          (disabled || loading) && 'opacity-60',
        )}
        role='radiogroup'
        aria-label={typeof label === 'string' ? label : undefined}
      >
        {loading && (
          <div className='absolute right-2 top-2'>
            <Loader2 className='h-4 w-4 animate-spin text-gray-500 dark:text-gray-400' />
          </div>
        )}
        {options.map((option) => {
          const isSelected = value === option.value
          const isDisabled = disabled || loading || option.disabled

          return (
            <button
              key={option.value}
              type='button'
              className={cn(
                'flex w-full items-start gap-3 rounded-lg border p-3 text-left transition-all duration-200',
                'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm',
                'dark:border-gray-700 dark:bg-gray-800/50 dark:hover:border-gray-600',
                isSelected && [
                  'border-blue-500 bg-blue-50/50 hover:border-blue-500',
                  'dark:border-blue-500 dark:bg-blue-500/10 dark:hover:border-blue-500',
                  'ring-2 ring-blue-500/20 dark:ring-blue-500/30',
                ],
                error && !isSelected && 'border-red-400 dark:border-red-500/70',
                isDisabled && 'cursor-not-allowed opacity-50 hover:border-gray-200 hover:shadow-none',
              )}
              onClick={() => {
                if (!isDisabled) {
                  onChange(option.value)
                }
              }}
              disabled={isDisabled}
              role='radio'
              aria-checked={isSelected}
              name={name}
            >
              {/* Custom radio indicator */}
              <div
                className={cn(
                  'mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all duration-200',
                  isSelected
                    ? 'border-blue-500 dark:border-blue-400'
                    : 'border-gray-300 dark:border-gray-600',
                )}
              >
                {isSelected && (
                  <div className='h-2.5 w-2.5 rounded-full bg-blue-500 dark:bg-blue-400' />
                )}
              </div>
              {/* Label and description */}
              <div className='flex-1'>
                <span
                  className={cn(
                    'text-sm font-medium',
                    isSelected
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-200',
                  )}
                >
                  {option.label}
                </span>
                {option.description && (
                  <p className='mt-0.5 text-xs text-gray-500 dark:text-gray-400'>
                    {option.description}
                  </p>
                )}
              </div>
            </button>
          )
        })}
      </div>
      {error && (
        <p className='mt-1.5 text-sm text-red-500 dark:text-red-400'>{error}</p>
      )}
    </div>
  )
}

export default RadioGroup
