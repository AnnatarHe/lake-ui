import { Loader2 } from 'lucide-react'
import React from 'react'

import { cn } from '@/utils/cn'

interface SwitchFieldProps {
  label: string | React.ReactNode
  loading?: boolean
  value: boolean
  onChange: (value: boolean) => Promise<unknown> | void
  children?: React.ReactNode
  disabled?: boolean
  error?: string
  description?: string
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
  } = props

  return (
    <div className='w-full'>
      <div className='flex items-center justify-between'>
        <div className='flex flex-col'>
          <label
            className={cn(
              'text-sm font-medium transition-colors text-gray-700 dark:text-gray-300',
              disabled && 'opacity-60',
            )}
          >
            {label}
          </label>
          {description && (
            <p className='text-xs mt-0.5 text-gray-500 dark:text-gray-400'>
              {description}
            </p>
          )}
        </div>
        <div className='flex items-center gap-3'>
          <button
            type='button'
            className={cn(
              'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
              value
                ? 'bg-blue-500 dark:bg-blue-600'
                : 'bg-gray-300 dark:bg-gray-700',
              'focus:outline-none focus:ring-2',
              'focus:ring-blue-500 focus:ring-offset-1 focus:ring-offset-white',
              'dark:focus:ring-blue-600 dark:focus:ring-offset-2 dark:focus:ring-offset-gray-900',
              disabled && 'opacity-50 cursor-not-allowed',
              error && 'ring-2 ring-red-400 dark:ring-red-500',
            )}
            role='switch'
            disabled={disabled || loading}
            onClick={() => {
              onChange(!value)
            }}
            aria-checked={value}
          >
            <span
              className={cn(
                'inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm',
                value ? 'translate-x-6' : 'translate-x-1',
              )}
            />
            {loading && (
              <div className='absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center rounded-full bg-slate-300/55 dark:bg-slate-500/55 backdrop-blur-md'>
                <Loader2 className='h-3 w-3 animate-spin text-white' />
              </div>
            )}
          </button>
          {children}
        </div>
      </div>
      {error && (
        <p className='mt-1.5 text-sm text-red-500 dark:text-red-400'>{error}</p>
      )}
    </div>
  )
}

export default SwitchField
