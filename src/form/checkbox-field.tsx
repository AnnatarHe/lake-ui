'use client'

import { Check, Minus } from 'lucide-react'
import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { FieldError, useFieldIds } from './field'

export interface CheckboxFieldProps {
  label: ReactNode
  description?: ReactNode
  checked?: boolean
  /** Mixed state, e.g. for a "select all" row. */
  indeterminate?: boolean
  onChange: (checked: boolean) => void
  error?: string
  disabled?: boolean
  id?: string
  name?: string
  className?: string
}

function CheckboxField({
  label,
  description,
  checked,
  indeterminate = false,
  onChange,
  error,
  disabled,
  id,
  name,
  className,
}: CheckboxFieldProps) {
  const descriptionId = useId()
  const ids = useFieldIds(id, description ? descriptionId : undefined, error)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate
  }, [indeterminate])

  const marked = indeterminate || checked

  return (
    <div className={cn('w-full', className)}>
      <div className='flex items-start gap-3'>
        <span className='relative mt-0.5 flex size-4 shrink-0'>
          <input
            ref={inputRef}
            id={ids.id}
            name={name}
            type='checkbox'
            checked={checked}
            disabled={disabled}
            onChange={event => onChange(event.target.checked)}
            aria-describedby={ids.describedBy}
            aria-invalid={error ? true : undefined}
            className={cn(
              'peer size-4 shrink-0 cursor-pointer appearance-none rounded-[0.3rem] border bg-none transition-colors duration-150',
              'border-lake-line-strong bg-lake-field outline-none focus-visible:ring-2 focus-visible:ring-lake-ring focus-visible:ring-offset-1 focus-visible:ring-offset-lake-surface',
              'checked:border-lake-accent checked:bg-lake-accent',
              indeterminate && 'border-lake-accent bg-lake-accent',
              error && !marked && 'border-lake-danger',
              'disabled:cursor-not-allowed disabled:opacity-50',
            )}
          />
          {indeterminate
            ? <Minus aria-hidden='true' strokeWidth={3} className='pointer-events-none absolute inset-0 m-auto size-3 text-lake-accent-fg' />
            : <Check aria-hidden='true' strokeWidth={3} className='pointer-events-none absolute inset-0 m-auto size-3 text-lake-accent-fg opacity-0 peer-checked:opacity-100' />}
        </span>
        <div className='flex min-w-0 flex-col'>
          <label
            htmlFor={ids.id}
            className={cn('cursor-pointer text-sm font-medium text-lake-fg', disabled && 'cursor-not-allowed opacity-60')}
          >
            {label}
          </label>
          {description && <p id={descriptionId} className='mt-0.5 text-xs text-lake-fg-subtle'>{description}</p>}
        </div>
      </div>
      <FieldError error={error} id={ids.errorId} />
    </div>
  )
}

export default CheckboxField
