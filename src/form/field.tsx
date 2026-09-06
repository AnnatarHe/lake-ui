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

export function FieldLabel({ label, id, disabled }: { label?: ReactNode, id: string, disabled?: boolean }) {
  return label
    ? (
        <label
          htmlFor={id}
          className={cn(
            'block text-sm font-medium mb-1.5 transition-colors text-gray-700 dark:text-gray-300',
            disabled && 'opacity-60',
          )}
        >
          {label}
        </label>
      )
    : null
}

export function FieldError({ error, id }: { error?: string, id: string }) {
  return error ? <p id={id} className='mt-1.5 text-sm text-red-500 dark:text-red-400'>{error}</p> : null
}

export function fieldClassName(error?: string, disabled?: boolean, className?: string) {
  return cn(
    'w-full rounded-lg border py-2.5 px-3.5 transition-all duration-200',
    'border-gray-200 bg-white text-gray-900 placeholder-gray-400',
    'hover:border-gray-300 hover:shadow-sm',
    'dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:placeholder-gray-500',
    'focus:outline-none focus:ring-2 focus:border-transparent',
    'focus:ring-blue-500/20 focus:border-blue-500 focus:shadow-md',
    'dark:focus:ring-blue-500/30 dark:focus:border-blue-400',
    error && 'border-red-400 focus:ring-red-400/20 focus:border-red-400 dark:border-red-500/70 dark:focus:ring-red-500/30',
    disabled && 'opacity-60 cursor-not-allowed bg-gray-50 hover:border-gray-200 hover:shadow-none dark:bg-gray-700/50',
    className,
  )
}
