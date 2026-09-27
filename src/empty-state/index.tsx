import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export interface EmptyStateProps {
  icon?: ReactNode
  title: ReactNode
  description?: ReactNode
  action?: ReactNode
  size?: 'sm' | 'md'
  /** Use 1 for full-page states such as not-found pages. */
  headingLevel?: 1 | 2 | 3
  className?: string
}

function EmptyState({ icon, title, description, action, size = 'md', headingLevel = 3, className }: EmptyStateProps) {
  const Heading = (['h1', 'h2', 'h3'] as const)[headingLevel - 1]
  const small = size === 'sm'
  return (
    <div className={cn('flex flex-col items-center justify-center text-center', small ? 'gap-2 px-4 py-8' : 'gap-3 px-6 py-16', className)}>
      {icon && (
        <div
          aria-hidden='true'
          className={cn(
            'flex items-center justify-center rounded-full bg-lake-surface-muted text-lake-fg-subtle',
            small ? 'mb-1 size-10 [&>svg]:size-5' : 'mb-2 size-12 [&>svg]:size-6',
          )}
        >
          {icon}
        </div>
      )}
      <Heading className={cn('font-semibold text-lake-fg', small ? 'text-sm' : 'text-base')}>{title}</Heading>
      {description && <p className={cn('max-w-sm text-lake-fg-muted', small ? 'text-xs' : 'text-sm')}>{description}</p>}
      {action && <div className={small ? 'mt-1' : 'mt-3'}>{action}</div>}
    </div>
  )
}

export default EmptyState
