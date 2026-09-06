import { FieldLabel, FieldError, fieldClassName, useFieldIds } from './field'
import { cn } from '@/utils/cn'
import { Loader2 } from 'lucide-react'

export interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | React.ReactNode
  error?: string
  loading?: boolean
}

function TextareaField(props: TextareaFieldProps) {
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
    rows = 3,
    ...rest
  } = props

  const ids = useFieldIds(id, describedBy, error)

  return (
    <div className='w-full'>
      <FieldLabel label={label} id={ids.id} disabled={disabled} />
      <div className='relative'>
        <textarea
          value={value}
          onChange={onChange}
          disabled={disabled || loading}
          rows={rows}
          className={fieldClassName(error, disabled || loading, cn('resize-vertical min-h-[80px]', className))}
          {...rest}
          id={ids.id}
          aria-describedby={ids.describedBy}
          aria-invalid={ariaInvalid ?? (error ? true : undefined)}
        />
        {loading && (
          <div className='absolute right-3 top-4'>
            <Loader2 className='h-4 w-4 animate-spin text-gray-500 dark:text-gray-400' />
          </div>
        )}
      </div>
      <FieldError error={error} id={ids.errorId} />
    </div>
  )
}

export default TextareaField
