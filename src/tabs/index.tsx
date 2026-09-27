'use client'

import { useId, useRef } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { cn } from '@/utils/cn'
import { tabClasses, tabContent, tabIds, tabListClasses, type TabsSize, type TabsVariant } from './shared'

export type { TabsSize, TabsVariant } from './shared'

export interface TabItem<V extends string> {
  value: V
  label: ReactNode
  icon?: ReactNode
  count?: number
  disabled?: boolean
}

export interface TabsProps<V extends string> {
  'items': TabItem<V>[]
  'value': V
  'onValueChange': (value: V) => void
  'variant'?: TabsVariant
  'size'?: TabsSize
  'aria-label': string
  /** Shared with `TabPanel` to link tabs and panels (aria-controls / aria-labelledby). */
  'idBase'?: string
  /** `auto` selects on arrow-key focus; `manual` waits for Enter or Space. */
  'activation'?: 'auto' | 'manual'
  'className'?: string
}

function Tabs<V extends string>({
  items,
  value,
  onValueChange,
  variant = 'underline',
  size = 'md',
  'aria-label': ariaLabel,
  idBase,
  activation = 'auto',
  className,
}: TabsProps<V>) {
  const generatedId = useId()
  const base = idBase ?? generatedId
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const selectedIndex = items.findIndex(item => item.value === value && !item.disabled)
  const focusableIndex = selectedIndex >= 0 ? selectedIndex : items.findIndex(item => !item.disabled)

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const enabled = items.map((item, index) => (item.disabled ? -1 : index)).filter(index => index >= 0)
    if (enabled.length === 0) return
    const current = tabRefs.current.findIndex(tab => tab === document.activeElement)
    const position = enabled.indexOf(current)
    let next: number | undefined
    if (event.key === 'ArrowRight') next = enabled[(position + 1) % enabled.length]
    else if (event.key === 'ArrowLeft') next = enabled[(position - 1 + enabled.length) % enabled.length]
    else if (event.key === 'Home') next = enabled[0]
    else if (event.key === 'End') next = enabled[enabled.length - 1]
    if (next === undefined) return
    event.preventDefault()
    tabRefs.current[next]?.focus()
    if (activation === 'auto') onValueChange(items[next].value)
  }

  return (
    <div role='tablist' aria-label={ariaLabel} aria-orientation='horizontal' className={tabListClasses(variant, className)} onKeyDown={onKeyDown}>
      {items.map((item, index) => {
        const active = item.value === value
        const ids = tabIds(base, item.value)
        return (
          <button
            key={item.value}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            id={ids.tab}
            type='button'
            role='tab'
            aria-selected={active}
            aria-controls={idBase ? ids.panel : undefined}
            tabIndex={index === focusableIndex ? 0 : -1}
            disabled={item.disabled}
            className={tabClasses(variant, size, active)}
            onClick={() => onValueChange(item.value)}
          >
            {tabContent({ ...item, active })}
          </button>
        )
      })}
    </div>
  )
}

export interface TabPanelProps<V extends string> {
  /** Same `idBase` as the `Tabs`. */
  idBase: string
  value: V
  activeValue: V
  /** Keeps an inactive panel mounted (hidden) to preserve its state. */
  keepMounted?: boolean
  children: ReactNode
  className?: string
}

export function TabPanel<V extends string>({ idBase, value, activeValue, keepMounted = false, children, className }: TabPanelProps<V>) {
  const active = value === activeValue
  if (!active && !keepMounted) return null
  const ids = tabIds(idBase, value)
  return (
    <div
      role='tabpanel'
      id={ids.panel}
      aria-labelledby={ids.tab}
      tabIndex={0}
      hidden={!active}
      className={cn('outline-none focus-visible:ring-2 focus-visible:ring-lake-ring', className)}
    >
      {children}
    </div>
  )
}

export default Tabs
