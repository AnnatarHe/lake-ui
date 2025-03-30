import { Check, ChevronsUpDown, Loader2, Search, X } from 'lucide-react'
import React, { useCallback } from 'react'

import useClickOutside from '@/hooks/useClickOutside'
import { cn } from '@/utils/cn'

interface Option {
  value: string
  label: string
  labelElement?: React.ReactNode
}

interface MultiSelectProps {
  options: Option[] | string[]
  disabled?: boolean
  value?: string[] | string
  onChange: (value?: string[] | string) => void
  label: string
  placeholder?: string
  maxValues?: number
  searchable?: boolean
  clearable?: boolean
  onBlur?: () => void
  name?: string
  ref: React.RefCallback<HTMLDivElement | null>
  error?: string
  loading?: boolean
}

function MultiSelect(props: MultiSelectProps) {
  const {
    options: propsOptions,
    value: propsValue,
    onChange: propsOnChange,
    disabled,
    clearable,
    searchable,
    label,
    placeholder = 'Select options...',
    maxValues: maxSelections,
    ref: inputRef,
    error,
    loading,
    ...rest
  } = props

  const isSingleSelect = maxSelections === 1

  const value = (isSingleSelect ? [propsValue] : propsValue) as string[]

  const onChange = (value: string[]) => {
    if (isSingleSelect) {
      propsOnChange(value.length === 0 ? undefined : (value![0] as string))
    } else {
      propsOnChange(value)
    }
  }

  const options = React.useMemo(() => {
    if (propsOptions.length === 0) {
      return []
    }

    return propsOptions.map((option) => {
      if (typeof option === 'string') {
        return {
          value: option,
          label: option,
        }
      }
      return option
    })
  }, [propsOptions])
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const searchInputRef = React.useRef<HTMLInputElement>(null)

  const debouncedSearchQuery = React.useMemo(() => {
    return searchQuery.toLowerCase().trim()
  }, [searchQuery])

  const filteredOptions = React.useMemo(() => {
    if (!debouncedSearchQuery) return options
    return options.filter(
      (option) =>
        option.label.toLowerCase().includes(debouncedSearchQuery) ||
        option.value.toLowerCase().includes(debouncedSearchQuery),
    )
  }, [options, debouncedSearchQuery])

  const toggleOption = (optionValue: string) => {
    if (disabled) {
      return
    }

    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue))
      return
    }

    if (isSingleSelect) {
      onChange([optionValue])
      return
    }

    if (!maxSelections || value.length < maxSelections) {
      onChange([...value, optionValue])
    }
  }

  const clearSelection = (e: React.MouseEvent) => {
    if (disabled) return
    e.stopPropagation()
    onChange([])
    setSearchQuery('')
  }

  const selectedLabels = value
    .map((v) => {
      const option = options.find((opt) => opt.value === v)
      if (option) {
        return option.labelElement ?? option.label
      }
      return false
    })
    .filter(Boolean)

  // Focus search input when dropdown opens
  React.useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  const ref = useClickOutside(
    useCallback(() => {
      setIsOpen(false)
      setSearchQuery('')
    }, []),
  )

  return (
    <div
      className={cn('relative w-full', (disabled || loading) && 'opacity-60')}
      ref={(el) => {
        ref.current = el
        inputRef(el)
      }}
      {...rest}
    >
      <label
        className={cn(
          'mb-1.5 block text-sm font-medium transition-colors text-gray-700 dark:text-gray-300',
          (disabled || loading) && 'opacity-60',
        )}
      >
        {label}
        {maxSelections && !isSingleSelect && (
          <span className='ml-1 text-gray-500 dark:text-gray-400'>
            ({value.length}/{maxSelections})
          </span>
        )}
      </label>
      <div
        className={cn(
          'relative rounded-lg border transition-colors border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800/50',
          error && 'border-red-500 dark:border-red-500/70',
        )}
      >
        <button
          type='button'
          className={cn(
            'flex w-full items-center justify-between rounded-lg px-3 py-2 text-left transition-colors',
            'text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/50',
            'focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500',
          )}
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled || loading}
        >
          <div className='flex-1 truncate'>
            {value.length === 0 ? (
              <span className='text-gray-400 dark:text-gray-500'>
                {placeholder}
              </span>
            ) : (
              <div className='flex flex-wrap gap-1'>
                {selectedLabels.map((label, index) => (
                  <span
                    key={index}
                    className='inline-flex items-center rounded px-1.5 text-sm bg-blue-400/20 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400'
                  >
                    {label}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className='ml-2 flex items-center gap-2'>
            {loading ? (
              <Loader2 className='h-4 w-4 animate-spin text-gray-500 dark:text-gray-400' />
            ) : (
              <>
                {value.length > 0 && (
                  <button
                    onClick={clearSelection}
                    className='rounded-full p-1 transition-colors hover:bg-gray-200 dark:hover:bg-gray-700'
                  >
                    <X className='h-4 w-4 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300' />
                  </button>
                )}
                <ChevronsUpDown className='h-4 w-4 opacity-50 text-gray-500 dark:text-gray-400' />
              </>
            )}
          </div>
        </button>

        {isOpen && (
          <div className='absolute z-20 mt-1 w-full rounded-lg border shadow-lg animate-in fade-in-50 slide-in-from-top-2 isolate border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800'>
            <div className='border-b p-2 border-gray-200 dark:border-gray-700'>
              <div className='relative'>
                <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500 dark:text-gray-400' />
                <input
                  ref={searchInputRef}
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className='w-full rounded-md py-1.5 pl-8 pr-4 text-sm focus:outline-none focus:ring-2 bg-gray-100/70 text-gray-700 focus:ring-blue-400 dark:bg-gray-900/50 dark:text-gray-300 dark:focus:ring-blue-500'
                  placeholder='Search options...'
                />
              </div>
            </div>

            <div className='max-h-60 overflow-auto'>
              {filteredOptions.length === 0 ? (
                <div className='px-3 py-2 text-center text-sm text-gray-500 dark:text-gray-400'>
                  No options found
                </div>
              ) : (
                filteredOptions.map((option) => {
                  const isSelected = value.includes(option.value)
                  let isDisabled =
                    !isSelected &&
                    maxSelections &&
                    value.length >= maxSelections

                  if (isSingleSelect) {
                    isDisabled = false
                  }

                  return (
                    <div
                      key={option.value}
                      className={cn(
                        'flex cursor-pointer items-center px-3 py-2 transition-colors',
                        'text-gray-700 hover:bg-gray-100/80 dark:text-gray-300 dark:hover:bg-gray-700/50',
                        isDisabled && 'cursor-not-allowed opacity-50',
                      )}
                      onClick={() => !isDisabled && toggleOption(option.value)}
                    >
                      {!isSingleSelect && (
                        <div className='mr-2 flex h-4 w-4 items-center justify-center rounded border border-gray-400 dark:border-gray-600'>
                          {isSelected && (
                            <Check className='h-3 w-3 text-blue-500 dark:text-blue-400' />
                          )}
                        </div>
                      )}
                      {option.labelElement ?? option.label}
                      {isDisabled && (
                        <span className='ml-auto text-xs text-gray-500 dark:text-gray-400'>
                          Max limit reached
                        </span>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </div>
        )}
      </div>
      {error && (
        <p className='mt-1.5 text-sm text-red-500 dark:text-red-400'>{error}</p>
      )}
    </div>
  )
}

export default MultiSelect
