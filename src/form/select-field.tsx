import { cn } from '@/utils/cn'
import React from 'react'
import styles from './select-field.module.css'

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string | React.ReactNode
  options: Array<{
    value: string
    label: string | React.ReactNode
    disabled?: boolean
  }>
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
          'mb-1.5 block text-sm font-medium transition-colors text-gray-700 dark:text-gray-300',
          (disabled || loading) && 'opacity-60',
        )}
      >
        {label}
      </label>
      <div
        className={cn(
          'relative rounded-lg border transition-colors',
          'border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800/50',
          error && 'border-red-500 dark:border-red-500/70',
          (disabled || loading) && 'opacity-60',
        )}
      >
        <select
          className={cn(
            'w-full rounded-lg py-2 px-3 pr-8 transition-colors',
            'text-gray-700 dark:text-gray-200',
            'bg-transparent',
            'focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500 focus:border-transparent',
            'hover:bg-gray-100/80 dark:hover:bg-gray-700/50',
            styles.select,
            loading ? styles.loading : styles.normal,
            error && 'focus:ring-red-400 dark:focus:ring-red-500',
            (disabled || loading) && 'cursor-not-allowed',
          )}
          disabled={disabled || loading}
          {...rest}
        >
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
              className={cn(
                'py-1',
                option.disabled && 'text-gray-400 dark:text-gray-500',
              )}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className='mt-1.5 text-sm text-red-500 dark:text-red-400'>{error}</p>
      )}
    </div>
  )
}

export default SelectField
