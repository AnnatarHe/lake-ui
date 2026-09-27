import { Loader2 } from 'lucide-react'
import React from 'react'
import { FieldError, FieldLabel, fieldClassName, useFieldIds } from './field'

export interface NumberFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string | React.ReactNode
  disabled?: boolean
  ref?: React.Ref<HTMLInputElement>
  error?: string
  loading?: boolean
}

function NumberField(props: NumberFieldProps) {
  const {
    label,
    disabled,
    ref,
    error,
    loading,
    className,
    id,
    'aria-describedby': describedBy,
    'aria-invalid': ariaInvalid,
    ...restProps
  } = props

  const ids = useFieldIds(id, describedBy, error)

  return (
    <div className='w-full'>
      <FieldLabel label={label} id={ids.id} disabled={disabled} />
      <div className='relative'>
        <input
          type='number'
          ref={ref}
          disabled={disabled || loading}
          {...restProps}
          className={fieldClassName(error, disabled || loading, className)}
          id={ids.id}
          aria-describedby={ids.describedBy}
          aria-invalid={ariaInvalid ?? (error ? true : undefined)}
        />
        {loading && (
          <div className='absolute right-3 top-1/2 -translate-y-1/2'>
            <Loader2 className='h-4 w-4 animate-spin text-lake-fg-subtle' aria-hidden='true' />
          </div>
        )}
      </div>
      <FieldError error={error} id={ids.errorId} />
    </div>
  )
}

NumberField.displayName = 'NumberField'

export default NumberField
