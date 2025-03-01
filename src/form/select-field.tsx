import React from 'react'

interface SelectFieldProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string | React.ReactNode
  options: Array<{ value: string; label: string }>
  ref: React.Ref<HTMLSelectElement>
  disabled?: boolean
  hasError?: string
  classNames?: string
}

function SelectField(props: SelectFieldProps) {
  const { label, options, disabled, hasError, classNames, ...rest } = props
  return (
    <div className={classNames}>
      <label className='block text-sm font-medium text-gray-300 mb-1'>
        {label}
      </label>
      <select
        className='w-full bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500'
        disabled={disabled}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectField
