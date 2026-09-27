import { useId, type ReactNode } from 'react'
import { cn } from '@/utils/cn'

export function useFieldIds(id?: string, describedBy?: string, error?: string) {
  const generatedId = useId()
  const controlId = id ?? generatedId
  const errorId = `${controlId}-error`
  return {
    id: controlId,
    errorId,
    describedBy: [describedBy, error ? errorId : undefined].filter(Boolean).join(' ') || undefined,
  }
}

export function FieldLabel({ label, id, labelId, disabled, className, children }: {
  label?: ReactNode
  id?: string
  labelId?: string
  disabled?: boolean
  className?: string
  children?: ReactNode
}) {
  return label
    ? (
        <label
          id={labelId}
          htmlFor={id}
          className={cn(
            'block text-sm font-medium mb-1.5 transition-colors text-lake-fg-muted',
            disabled && 'opacity-60',
            className,
          )}
        >
          {label}
          {children}
        </label>
      )
    : null
}

export function FieldError({ error, id }: { error?: string, id: string }) {
  return error ? <p id={id} className='mt-1.5 text-sm text-lake-danger'>{error}</p> : null
}

export function fieldClassName(error?: string, disabled?: boolean, className?: string) {
  return cn(
    'w-full rounded-lake-control border py-2.5 px-3.5 transition-all duration-200',
    'border-lake-line bg-lake-field text-lake-fg placeholder:text-lake-fg-subtle',
    'hover:border-lake-line-strong',
    'outline-none focus:ring-2 focus:ring-lake-ring focus:border-lake-accent',
    error && 'border-lake-danger hover:border-lake-danger focus:border-lake-danger focus:ring-lake-danger/20',
    disabled && 'opacity-60 cursor-not-allowed bg-lake-surface-muted hover:border-lake-line',
    className,
  )
}
