import { FieldLabel, FieldError, fieldClassName, useFieldIds } from './field'
import { Loader2 } from 'lucide-react'

export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string | React.ReactNode
  error?: string
  loading?: boolean
}

function InputField(props: InputFieldProps) {
  const {
    className,
    id,
    'aria-describedby': describedBy,
    'aria-invalid': ariaInvalid,
    value,
    onChange,
    label,
    error,
    loading,
    disabled,
    ...rest
  } = props

  const ids = useFieldIds(id, describedBy, error)

  return (
    <div className='w-full'>
      <FieldLabel label={label} id={ids.id} disabled={disabled} />
      <div className='relative'>
        <input
          type='text'
          value={value}
          onChange={onChange}
          disabled={disabled || loading}
          className={fieldClassName(error, disabled || loading, className)}
          {...rest}
          id={ids.id}
          aria-describedby={ids.describedBy}
          aria-invalid={ariaInvalid ?? (error ? true : undefined)}
        />
        {loading && (
          <div className='absolute right-3 top-1/2 -translate-y-1/2'>
            <Loader2 className='h-4 w-4 animate-spin text-gray-500 dark:text-gray-400' />
          </div>
        )}
      </div>
      <FieldError error={error} id={ids.errorId} />
    </div>
  )
}

export default InputField
