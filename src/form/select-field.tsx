import { ChevronDown, Loader2 } from 'lucide-react'
import React from 'react'
import { cn } from '@/utils/cn'
import { FieldError, FieldLabel, fieldClassName, useFieldIds } from './field'

export interface SelectFieldProps
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
  /** Rendered as a disabled, empty first option. */
  placeholder?: string
  /** Applied to the outer wrapper. */
  className?: string
  /** Applied to the `<select>` element. */
  selectClassName?: string
}

// Browsers with customizable <select> (appearance: base-select) get a themed picker.
// Never chain another pseudo-element after ::picker(select); some CSS minifiers reject it.
const pickerClasses = [
  'supports-[appearance:base-select]:[appearance:base-select]',
  '[&::picker(select)]:[appearance:base-select]',
  '[&::picker(select)]:mt-1',
  '[&::picker(select)]:max-h-60',
  '[&::picker(select)]:p-1',
  '[&::picker(select)]:rounded-lake-control',
  '[&::picker(select)]:border',
  '[&::picker(select)]:border-lake-line',
  '[&::picker(select)]:bg-lake-surface-raised',
  '[&::picker(select)]:text-lake-fg',
  '[&::picker(select)]:shadow-lake-overlay',
  '[&::picker-icon]:hidden',
  '[&_option]:rounded-[calc(var(--lake-radius-control)-2px)]',
  '[&_option]:px-3',
  '[&_option]:py-2',
  '[&_option]:text-sm',
  '[&_option]:bg-lake-surface-raised',
  '[&_option]:text-lake-fg',
  '[&_option:hover]:bg-lake-surface-muted',
  '[&_option:checked]:bg-lake-accent-soft',
  '[&_option:checked]:text-lake-accent-text',
  '[&_option:disabled]:text-lake-fg-subtle',
]

function SelectField(props: SelectFieldProps) {
  const {
    label,
    options,
    disabled,
    error,
    loading,
    placeholder,
    className,
    selectClassName,
    id,
    'aria-describedby': describedBy,
    'aria-invalid': ariaInvalid,
    ...rest
  } = props

  const ids = useFieldIds(id, describedBy, error)
  const Icon = loading ? Loader2 : ChevronDown
  // An uncontrolled select would otherwise auto-select the first enabled option.
  const defaultValue = placeholder && rest.value === undefined && rest.defaultValue === undefined && !rest.multiple
    ? ''
    : rest.defaultValue

  return (
    <div className={cn('w-full', className)}>
      <FieldLabel label={label} id={ids.id} disabled={disabled || loading} />
      <div className='relative'>
        <select
          disabled={disabled || loading}
          {...rest}
          defaultValue={defaultValue}
          id={ids.id}
          aria-describedby={ids.describedBy}
          aria-invalid={ariaInvalid ?? (error ? true : undefined)}
          aria-busy={loading || undefined}
          className={fieldClassName(
            error,
            disabled || loading,
            cn('appearance-none bg-none pr-10 cursor-pointer disabled:cursor-not-allowed', pickerClasses, selectClassName),
          )}
        >
          {placeholder && (
            <option value='' disabled>
              {placeholder}
            </option>
          )}
          {options.map(option => (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ))}
        </select>
        <Icon
          aria-hidden='true'
          className={cn(
            'pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-lake-fg-subtle',
            loading && 'animate-spin',
          )}
        />
      </div>
      <FieldError error={error} id={ids.errorId} />
    </div>
  )
}

export default SelectField
