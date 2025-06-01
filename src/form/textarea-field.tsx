import { cn } from '@/utils/cn'
import { Loader2 } from 'lucide-react'

interface TextareaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string | React.ReactNode
  error?: string
  loading?: boolean
}

function TextareaField(props: TextareaFieldProps) {
  const {
    className,
    value,
    onChange,
    label,
    error,
    loading,
    disabled,
    rows = 3,
    ...rest
  } = props

  return (
    <div className='w-full'>
      {label && (
        <label
          className={cn(
            'block text-sm font-medium mb-1.5 transition-colors text-gray-700 dark:text-gray-300',
            disabled && 'opacity-60',
          )}
        >
          {label}
        </label>
      )}
      <div className='relative'>
        <textarea
          value={value}
          onChange={onChange}
          disabled={disabled || loading}
          rows={rows}
          className={cn(
            'w-full rounded-lg border py-2 px-3 transition-colors resize-vertical',
            'border-gray-300 bg-white text-gray-900 placeholder-gray-400',
            'dark:border-gray-700 dark:bg-gray-800/50 dark:text-gray-200 dark:placeholder-gray-500',
            'focus:outline-none focus:ring-2 focus:border-transparent',
            'focus:ring-blue-400 dark:focus:ring-blue-500',
            error
            && 'border-red-500 focus:ring-red-400 dark:border-red-500/70 dark:focus:ring-red-500',
            (disabled || loading)
            && 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-700/50',
            className,
          )}
          {...rest}
        />
        {loading && (
          <div className='absolute right-3 top-4'>
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

export default TextareaField
