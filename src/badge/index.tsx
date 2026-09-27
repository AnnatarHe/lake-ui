import type { ReactNode } from 'react'
import { cn } from '@/utils/cn'

export type BadgeTone = 'neutral' | 'accent' | 'success' | 'warning' | 'danger'

export interface BadgeProps {
  tone?: BadgeTone
  variant?: 'soft' | 'outline' | 'solid'
  size?: 'sm' | 'md'
  icon?: ReactNode
  children: ReactNode
  className?: string
}

const toneClasses: Record<'soft' | 'outline' | 'solid', Record<BadgeTone, string>> = {
  soft: {
    neutral: 'bg-lake-line/60 text-lake-fg-muted',
    accent: 'bg-lake-accent-soft text-lake-accent-text',
    success: 'bg-lake-success-soft text-lake-success',
    warning: 'bg-lake-warning-soft text-lake-warning',
    danger: 'bg-lake-danger-soft text-lake-danger',
  },
  outline: {
    neutral: 'border border-lake-line-strong text-lake-fg-muted',
    accent: 'border border-lake-accent/40 text-lake-accent-text',
    success: 'border border-lake-success/40 text-lake-success',
    warning: 'border border-lake-warning/50 text-lake-warning',
    danger: 'border border-lake-danger/40 text-lake-danger',
  },
  solid: {
    neutral: 'bg-lake-fg text-lake-surface',
    accent: 'bg-lake-accent text-lake-accent-fg',
    success: 'bg-lake-success text-lake-surface',
    warning: 'bg-lake-warning text-lake-surface',
    danger: 'bg-lake-danger text-lake-danger-fg',
  },
}

const sizeClasses = {
  sm: 'h-5 gap-1 px-2 text-xs',
  md: 'h-6 gap-1.5 px-2.5 text-xs',
}

function Badge({ tone = 'neutral', variant = 'soft', size = 'sm', icon, children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center whitespace-nowrap rounded-full font-medium leading-none',
        sizeClasses[size],
        toneClasses[variant][tone],
        className,
      )}
    >
      {icon && <span aria-hidden='true' className='inline-flex shrink-0'>{icon}</span>}
      {children}
    </span>
  )
}

export default Badge
