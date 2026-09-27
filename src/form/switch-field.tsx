import { Loader2 } from 'lucide-react'
import React, { useId } from 'react'

import { cn } from '@/utils/cn'
import { FieldError, FieldLabel, useFieldIds } from './field'

export interface SwitchFieldProps {
  label: string | React.ReactNode
  loading?: boolean
  value: boolean
  onChange: (value: boolean) => Promise<unknown> | void
  children?: React.ReactNode
  disabled?: boolean
  error?: string
  description?: string
  id?: string
  className?: string
}

function SwitchField(props: SwitchFieldProps) {
  const {
    label,
    loading = false,
    value,
    onChange,
    children,
    disabled,
    error,
    description,
    id,
    className,
  } = props

  const descriptionId = useId()
  const ids = useFieldIds(id, description ? descriptionId : undefined, error)

  return (
    <div className={cn('w-full', className)}>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex flex-col'>
          <FieldLabel label={label} id={ids.id} disabled={disabled} className='mb-0' />
          {description && (
            <p id={descriptionId} className='text-xs mt-0.5 text-lake-fg-subtle'>
              {description}
            </p>
          )}
        </div>
        <div className='flex items-center gap-3'>
          <button
            id={ids.id}
            type='button'
            className={cn(
              'relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-all duration-300',
              value
                ? 'bg-lake-accent'
                : 'bg-lake-line hover:bg-lake-line-strong',
              'outline-none focus-visible:ring-2 focus-visible:ring-lake-ring focus-visible:ring-offset-2 focus-visible:ring-offset-lake-surface',
              disabled && 'opacity-50 cursor-not-allowed hover:bg-lake-line',
              error && 'ring-2 ring-lake-danger',
            )}
            role='switch'
            disabled={disabled || loading}
            onClick={() => {
              onChange(!value)
            }}
            aria-checked={value}
            aria-describedby={ids.describedBy}
            aria-invalid={error ? true : undefined}
            aria-busy={loading || undefined}
          >
            <span
              className={cn(
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm',
                value ? 'translate-x-6' : 'translate-x-1',
              )}
            />
            {loading && (
              <div className='absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center rounded-full bg-lake-fg-subtle/50 backdrop-blur-lake'>
                <Loader2 className='h-3 w-3 animate-spin text-white' aria-hidden='true' />
              </div>
            )}
          </button>
          {children}
        </div>
      </div>
      <FieldError error={error} id={ids.errorId} />
    </div>
  )
}

export default SwitchField
