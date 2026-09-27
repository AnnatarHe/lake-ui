import { Loader2 } from 'lucide-react'
import { cn } from '@/utils/cn'

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg'
  /** Announced to screen readers. Pass an empty string for a decorative spinner. */
  label?: string
  className?: string
}

const sizeClasses = {
  xs: 'size-3',
  sm: 'size-4',
  md: 'size-5',
  lg: 'size-6',
}

function Spinner({ size = 'sm', label = 'Loading', className }: SpinnerProps) {
  const decorative = label === ''
  return (
    <span
      role={decorative ? undefined : 'status'}
      aria-hidden={decorative || undefined}
      className={cn('inline-flex shrink-0 items-center justify-center', className)}
    >
      <Loader2 aria-hidden='true' className={cn('animate-spin', sizeClasses[size])} />
      {!decorative && <span className='sr-only'>{label}</span>}
    </span>
  )
}

export default Spinner
