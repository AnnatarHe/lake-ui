import { cn } from '@/utils/cn'
import { Loader2 } from 'lucide-react'
import React from 'react'

interface NumberFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | React.ReactNode
  disabled?: boolean
  ref?: React.Ref<HTMLInputElement>
  error?: string
  loading?: boolean
}

function NumberField(props: NumberFieldProps) {
  const { label, disabled, ref, error, loading, ...restProps } = props

  return (
    <div className='w-full'>
      <label
        className={cn(
          'block text-sm font-medium mb-1.5 transition-colors text-gray-700 dark:text-gray-300',
          disabled && 'opacity-60',
        )}
      >
        {label}
      </label>
      <div className='relative'>
        <input
          type='number'
          ref={ref}
          disabled={disabled || loading}
          className={cn(
            'w-full rounded-lg border py-2.5 px-3.5 transition-all duration-200',
            'border-gray-200 bg-white text-gray-900 placeholder-gray-400',
            'hover:border-gray-300 hover:shadow-sm',
            'dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:placeholder-gray-500',
            'focus:outline-none focus:ring-2 focus:border-transparent',
            'focus:ring-blue-500/20 focus:border-blue-500 focus:shadow-md',
            'dark:focus:ring-blue-500/30 dark:focus:border-blue-400',
            error
            && 'border-red-400 focus:ring-red-400/20 focus:border-red-400 dark:border-red-500/70 dark:focus:ring-red-500/30',
            (disabled || loading)
            && 'opacity-60 cursor-not-allowed bg-gray-50 hover:border-gray-200 hover:shadow-none dark:bg-gray-700/50',
          )}
          {...restProps}
        />
        {loading && (
          <div className='absolute right-3 top-1/2 -translate-y-1/2'>
            <Loader2 className='h-4 w-4 animate-spin text-gray-500 dark:text-gray-400' />
          </div>
        )}
      </div>
      {error && (
        <p className='mt-1.5 text-sm text-red-500 dark:text-red-400'>{error}</p>
      )}
    </div>
  )
}

NumberField.displayName = 'NumberField'

export default NumberField
