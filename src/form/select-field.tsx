import { cn } from '@/utils/cn'
import { ChevronDown, Loader2 } from 'lucide-react'
import React from 'react'

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string | React.ReactNode
  options: Array<{ value: string; label: string }>
  ref?: React.Ref<HTMLSelectElement>
  disabled?: boolean
  error?: string
  loading?: boolean
  className?: string
}

function SelectField(props: SelectFieldProps) {
  const { label, options, disabled, error, loading, className, ...rest } = props

  return (
    <div className={cn('w-full', className)}>
      <label
        className={cn(
          'block text-sm font-medium mb-1.5 transition-colors text-gray-700 dark:text-gray-300',
          disabled && 'opacity-60',
        )}
      >
        {label}
      </label>
      <div className='relative'>
        <select
          className={cn(
            'w-full rounded-lg border py-2 px-3 pr-8 appearance-none transition-colors',
            'border-gray-300 bg-white text-gray-900',
            'dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200',
            'focus:outline-none focus:ring-2 focus:border-transparent',
            'focus:ring-blue-400 dark:focus:ring-blue-500',
            error &&
              'border-red-500 focus:ring-red-400 dark:border-red-500/70 dark:focus:ring-red-500',
            (disabled || loading) &&
              'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-700/50',
          )}
          disabled={disabled || loading}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className='absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none'>
          {loading ? (
            <Loader2 className='h-4 w-4 animate-spin text-gray-500 dark:text-gray-400' />
          ) : (
            <ChevronDown className='h-4 w-4 text-gray-500 dark:text-gray-400' />
          )}
        </div>
      </div>
      {error && (
        <p className='mt-1.5 text-sm text-red-500 dark:text-red-400'>{error}</p>
      )}
    </div>
  )
}

export default SelectField
