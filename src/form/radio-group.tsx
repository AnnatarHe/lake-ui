'use client'

import { Loader2 } from 'lucide-react'
import React, { useId } from 'react'

import { cn } from '@/utils/cn'
import { FieldError, FieldLabel } from './field'

export interface RadioGroupProps {
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

  const id = useId()
  const labelId = `${id}-label`
  const errorId = `${id}-error`

  return (
    <div className={cn('w-full', className)}>
      <FieldLabel label={label} labelId={labelId} disabled={disabled || loading} />
      <div
        className={cn(
          'relative space-y-2',
          (disabled || loading) && 'opacity-60',
        )}
        role='radiogroup'
        aria-labelledby={label ? labelId : undefined}
        aria-describedby={error ? errorId : undefined}
        aria-invalid={error ? true : undefined}
        aria-busy={loading || undefined}
      >
        {loading && (
          <div className='absolute right-2 top-2'>
            <Loader2 className='h-4 w-4 animate-spin text-lake-fg-subtle' aria-hidden='true' />
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
                'flex w-full items-start gap-3 rounded-lake-control border p-3 text-left transition-all duration-200',
                'border-lake-line bg-lake-field hover:border-lake-line-strong',
                'outline-none focus-visible:ring-2 focus-visible:ring-lake-ring',
                isSelected && 'border-lake-accent bg-lake-accent-soft/60 hover:border-lake-accent ring-2 ring-lake-ring',
                error && !isSelected && 'border-lake-danger',
                isDisabled && 'cursor-not-allowed opacity-50 hover:border-lake-line',
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
                  isSelected ? 'border-lake-accent' : 'border-lake-line-strong',
                )}
              >
                {isSelected && (
                  <div className='h-2.5 w-2.5 rounded-full bg-lake-accent' />
                )}
              </div>
              {/* Label and description */}
              <div className='flex-1'>
                <span
                  className={cn(
                    'text-sm font-medium',
                    isSelected ? 'text-lake-accent-text' : 'text-lake-fg-muted',
                  )}
                >
                  {option.label}
                </span>
                {option.description && (
                  <p className='mt-0.5 text-xs text-lake-fg-subtle'>
                    {option.description}
                  </p>
                )}
              </div>
            </button>
          )
        })}
      </div>
      <FieldError error={error} id={errorId} />
    </div>
  )
}

export default RadioGroup
