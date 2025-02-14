import React from 'react'

import { cn } from '@/utils/cn'

interface NumberFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  disabled?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

function NumberField(props: NumberFieldProps) {
  const { label, disabled, ref, ...restProps } = props

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1">
        {label}
      </label>
      <input
        type="number"
        ref={ref}
        disabled={disabled}
        className={cn(
          'w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
        {...restProps}
      />
    </div>
  )
}

NumberField.displayName = 'NumberField'

export default NumberField