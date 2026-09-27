'use client'

import { Check, ChevronsUpDown, Loader2, Search, X } from 'lucide-react'
import React, { useCallback, useId } from 'react'

import useClickOutside from '@/hooks/useClickOutside'
import { cn } from '@/utils/cn'
import { FieldError, FieldLabel } from './field'

interface Option {
  value: string
  label: string
  labelElement?: React.ReactNode
}

export interface MultiSelectProps {
  options: Option[] | string[]
  disabled?: boolean
  value?: string[] | string
  onChange: (value?: string[] | string) => void
  label: string | React.ReactNode
  placeholder?: string
  maxValues?: number
  /** Shows the search box in the dropdown. */
  searchable?: boolean
  /** Shows the clear button when something is selected. */
  clearable?: boolean
  onBlur?: () => void
  /** Accepted for form-library compatibility; no hidden input is rendered. */
  name?: string
  ref?: React.RefCallback<HTMLDivElement | null>
  error?: string
  loading?: boolean
  id?: string
  className?: string
  searchPlaceholder?: string
  noResultsLabel?: string
  clearLabel?: string
  maxReachedLabel?: string
}

function MultiSelect(props: MultiSelectProps) {
  const {
    options: propsOptions,
    value: propsValue,
    onChange: propsOnChange,
    disabled,
    searchable = true,
    clearable = true,
    label,
    placeholder = 'Select options...',
    maxValues: maxSelections,
    ref: inputRef,
    error,
    loading,
    onBlur,
    id,
    className,
    searchPlaceholder = 'Search options...',
    noResultsLabel = 'No options found',
    clearLabel = 'Clear selection',
    maxReachedLabel = 'Max limit reached',
  } = props

  const generatedId = useId()
  const baseId = id ?? generatedId
  const labelId = `${baseId}-label`
  const valueId = `${baseId}-value`
  const listId = `${baseId}-listbox`
  const errorId = `${baseId}-error`

  const isSingleSelect = maxSelections === 1
  const isInactive = disabled || loading

  const value = (isSingleSelect || typeof propsValue === 'string' ? [propsValue] : (propsValue ?? [])).filter(
    (item): item is string => typeof item === 'string',
  )

  const onChange = (value: string[]) => {
    if (isSingleSelect) {
      propsOnChange(value.length === 0 ? undefined : value[0])
    }
    else {
      propsOnChange(value)
    }
  }

  const options = React.useMemo(
    () => propsOptions.map(option => typeof option === 'string' ? { value: option, label: option } : option),
    [propsOptions],
  )
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState('')
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const triggerRef = React.useRef<HTMLButtonElement>(null)
  const listRef = React.useRef<HTMLDivElement>(null)

  const normalizedQuery = searchQuery.toLowerCase().trim()
  const filteredOptions = React.useMemo(() => {
    if (!normalizedQuery) return options
    return options.filter(
      option =>
        option.label.toLowerCase().includes(normalizedQuery)
        || option.value.toLowerCase().includes(normalizedQuery),
    )
  }, [options, normalizedQuery])

  const close = useCallback(() => {
    setIsOpen(false)
    setSearchQuery('')
  }, [])

  const toggleOption = (optionValue: string) => {
    if (isInactive) return

    if (value.includes(optionValue)) {
      onChange(value.filter(v => v !== optionValue))
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

  const clearSelection = () => {
    if (isInactive) return
    onChange([])
    setSearchQuery('')
    triggerRef.current?.focus()
  }

  const selectedLabels = value
    .map(v => options.find(opt => opt.value === v))
    .filter((option): option is Option => !!option)

  const focusOption = (index: number) => {
    const items = listRef.current?.querySelectorAll<HTMLElement>('[role=option]')
    if (!items?.length) return
    items[(index + items.length) % items.length].focus()
  }

  // Focus the search box (or the first option) when the dropdown opens.
  React.useEffect(() => {
    if (!isOpen) return
    if (searchInputRef.current) searchInputRef.current.focus()
    else focusOption(0)
  }, [isOpen])

  const ref = useClickOutside(close)

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && isOpen) {
      event.stopPropagation()
      close()
      triggerRef.current?.focus()
    }
  }

  const onListKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    const items = Array.from(listRef.current?.querySelectorAll<HTMLElement>('[role=option]') ?? [])
    const index = items.indexOf(document.activeElement as HTMLElement)
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      focusOption(index + 1)
    }
    else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (index <= 0 && searchInputRef.current) searchInputRef.current.focus()
      else focusOption(index - 1)
    }
    else if (event.key === 'Home') {
      event.preventDefault()
      focusOption(0)
    }
    else if (event.key === 'End') {
      event.preventDefault()
      focusOption(-1)
    }
  }

  const showClear = clearable && value.length > 0 && !loading

  return (
    <div
      className={cn('relative w-full', isInactive && 'opacity-60', className)}
      ref={(el) => {
        ref.current = el
        inputRef?.(el)
      }}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      <FieldLabel label={label} labelId={labelId} disabled={isInactive}>
        {maxSelections && !isSingleSelect && (
          <span className='ml-1 text-lake-fg-subtle'>
            (
            {value.length}
            /
            {maxSelections}
            )
          </span>
        )}
      </FieldLabel>
      <div
        className={cn(
          'relative rounded-lake-control border transition-all duration-200',
          'border-lake-line bg-lake-field hover:border-lake-line-strong',
          error && 'border-lake-danger hover:border-lake-danger',
        )}
      >
        <button
          ref={triggerRef}
          id={`${baseId}-trigger`}
          type='button'
          className={cn(
            'flex w-full items-center justify-between rounded-lake-control px-3.5 py-2.5 text-left transition-colors',
            'text-lake-fg hover:bg-lake-surface-muted',
            'outline-none focus-visible:ring-2 focus-visible:ring-lake-ring',
            showClear ? 'pr-16' : 'pr-9',
            isInactive && 'cursor-not-allowed',
          )}
          onClick={() => (isOpen ? close() : setIsOpen(true))}
          disabled={isInactive}
          aria-haspopup='listbox'
          aria-expanded={isOpen}
          aria-controls={isOpen ? listId : undefined}
          aria-labelledby={`${labelId} ${valueId}`}
          aria-describedby={error ? errorId : undefined}
          aria-invalid={error ? true : undefined}
          aria-busy={loading || undefined}
        >
          <span id={valueId} className='flex-1 truncate'>
            {selectedLabels.length === 0
              ? (
                  <span className='text-lake-fg-subtle'>
                    {placeholder}
                  </span>
                )
              : (
                  <span className='flex flex-wrap gap-1'>
                    {selectedLabels.map(option => (
                      <span
                        key={option.value}
                        className='inline-flex items-center rounded-md border border-lake-accent/30 bg-lake-accent-soft px-2 py-0.5 text-sm text-lake-accent-text'
                      >
                        {option.labelElement ?? option.label}
                      </span>
                    ))}
                  </span>
                )}
          </span>
        </button>
        <div className='pointer-events-none absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1'>
          {showClear && (
            <button
              type='button'
              aria-label={clearLabel}
              onClick={clearSelection}
              disabled={isInactive}
              className={cn(
                'pointer-events-auto rounded-full p-1 text-lake-fg-subtle transition-colors hover:bg-lake-surface-muted hover:text-lake-fg-muted',
                'outline-none focus-visible:ring-2 focus-visible:ring-lake-ring',
              )}
            >
              <X className='h-4 w-4' aria-hidden='true' />
            </button>
          )}
          {loading
            ? <Loader2 className='h-4 w-4 animate-spin text-lake-fg-subtle' aria-hidden='true' />
            : <ChevronsUpDown className='h-4 w-4 text-lake-fg-subtle' aria-hidden='true' />}
        </div>

        {isOpen && (
          <div className='absolute z-20 mt-1 w-full rounded-lake-control border border-lake-line bg-lake-surface-raised shadow-lake-overlay animate-in fade-in-50 slide-in-from-top-2 motion-reduce:animate-none isolate'>
            {searchable && (
              <div className='border-b border-lake-line p-2'>
                <div className='relative'>
                  <Search className='absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-lake-fg-subtle' aria-hidden='true' />
                  <input
                    ref={searchInputRef}
                    type='text'
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === 'ArrowDown') {
                        event.preventDefault()
                        focusOption(0)
                      }
                    }}
                    className='w-full rounded-md bg-lake-surface-muted py-1.5 pl-8 pr-4 text-sm text-lake-fg placeholder:text-lake-fg-subtle outline-none focus:ring-2 focus:ring-lake-ring'
                    placeholder={searchPlaceholder}
                    aria-label={searchPlaceholder}
                    aria-controls={listId}
                  />
                </div>
              </div>
            )}

            <div
              ref={listRef}
              id={listId}
              role='listbox'
              aria-labelledby={labelId}
              aria-multiselectable={!isSingleSelect || undefined}
              className='max-h-60 overflow-auto py-1'
              onKeyDown={onListKeyDown}
            >
              {filteredOptions.length === 0
                ? (
                    <div className='px-3 py-2 text-center text-sm text-lake-fg-subtle'>
                      {noResultsLabel}
                    </div>
                  )
                : (
                    filteredOptions.map((option) => {
                      const isSelected = value.includes(option.value)
                      const isDisabled = !isSingleSelect && !isSelected && !!maxSelections && value.length >= maxSelections

                      return (
                        <div
                          key={option.value}
                          role='option'
                          tabIndex={-1}
                          aria-selected={isSelected}
                          aria-disabled={isDisabled || undefined}
                          className={cn(
                            'flex cursor-pointer items-center px-3 py-2 text-lake-fg-muted transition-colors',
                            'outline-none hover:bg-lake-surface-muted focus-visible:bg-lake-surface-muted',
                            isDisabled && 'cursor-not-allowed opacity-50',
                          )}
                          onClick={() => !isDisabled && toggleOption(option.value)}
                          onKeyDown={(event) => {
                            if (event.key !== 'Enter' && event.key !== ' ') return
                            event.preventDefault()
                            if (!isDisabled) toggleOption(option.value)
                          }}
                        >
                          {!isSingleSelect && (
                            <span className='mr-2 flex h-4 w-4 items-center justify-center rounded border border-lake-line-strong'>
                              {isSelected && (
                                <Check className='h-3 w-3 text-lake-accent' aria-hidden='true' />
                              )}
                            </span>
                          )}
                          {option.labelElement ?? option.label}
                          {isDisabled && (
                            <span className='ml-auto text-xs text-lake-fg-subtle'>
                              {maxReachedLabel}
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
      <FieldError error={error} id={errorId} />
    </div>
  )
}

export default MultiSelect
