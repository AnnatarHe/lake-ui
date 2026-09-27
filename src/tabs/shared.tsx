import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export type TabsVariant = 'underline' | 'pill'
export type TabsSize = 'sm' | 'md'

export function tabListClasses(variant: TabsVariant, className?: string) {
  return cn(
    'flex items-center overflow-x-auto',
    variant === 'underline'
      ? 'gap-1 shadow-[inset_0_-1px_0_0_var(--lake-line)]'
      : 'gap-1',
    className,
  )
}

const sizeClasses: Record<TabsVariant, Record<TabsSize, string>> = {
  underline: { sm: 'h-9 px-2.5 text-sm', md: 'h-11 px-3 text-sm' },
  pill: { sm: 'h-7 px-2.5 text-xs', md: 'h-8 px-3 text-sm' },
}

export function tabClasses(variant: TabsVariant, size: TabsSize, active: boolean, className?: string) {
  return cn(
    'relative inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-medium transition-colors duration-150',
    'outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lake-ring',
    'disabled:pointer-events-none disabled:opacity-50',
    sizeClasses[variant][size],
    variant === 'underline'
      ? cn(
          'rounded-t-lake-control after:absolute after:inset-x-2 after:bottom-0 after:h-0.5 after:rounded-full',
          active ? 'text-lake-fg after:bg-lake-accent' : 'text-lake-fg-muted hover:text-lake-fg',
        )
      : cn(
          'rounded-full',
          active ? 'bg-lake-accent-soft text-lake-accent-text' : 'text-lake-fg-muted hover:bg-lake-surface-muted hover:text-lake-fg',
        ),
    className,
  )
}

export function tabContent({ icon, label, count, active }: { icon?: ReactNode, label: ReactNode, count?: number, active: boolean }) {
  return (
    <>
      {icon && <span aria-hidden='true' className='inline-flex shrink-0'>{icon}</span>}
      {label}
      {count != null && (
        <span
          className={cn(
            'min-w-5 rounded-full px-1.5 text-center text-xs leading-5 tabular-nums',
            active ? 'bg-lake-accent/15 text-lake-accent-text' : 'bg-lake-surface-muted text-lake-fg-subtle',
          )}
        >
          {count}
        </span>
      )}
    </>
  )
}

/** Values can hold characters that are not valid in id references. */
export function tabIds(idBase: string, value: string) {
  const safe = value.replace(/[^\w-]/g, '_')
  return { tab: `${idBase}-tab-${safe}`, panel: `${idBase}-panel-${safe}` }
}
