import { Loader2 } from 'lucide-react'
import React from 'react'

import { cn } from '@/utils/cn'

type Props = {
  label: string
  loading: boolean
  value: boolean
  onChange: (value: boolean) => Promise<unknown>
  children?: React.ReactNode
  disabled?: boolean
}

function SwitchField(props: Props) {
  const { label, loading, value, onChange, children, disabled } = props

  return (
    <label className="flex items-center gap-3 cursor-pointer">
      <button
        type='button'
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          value ? 'bg-blue-600' : 'bg-gray-700',
          'focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-gray-900',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        role='switch'
        disabled={disabled}
        onClick={() => {
          onChange(!value)
        }}
        aria-checked={value}
        aria-label={label}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
            value ? 'translate-x-6' : 'translate-x-1'
          )}
        />
        <div
          className={cn(
            'absolute left-0 top-0 z-10 flex h-full w-full items-center justify-center rounded-2xl bg-slate-500 bg-opacity-55 backdrop-blur-md',
            loading ? 'flex' : 'hidden'
          )}
        >
          <Loader2 className={cn('h-3 w-3 animate-spin text-white')} />
        </div>
      </button>
      {children}
    </label>
  )
}

export default SwitchField