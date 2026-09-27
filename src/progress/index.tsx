import { cn } from '@/utils/cn'

export interface ProgressProps {
  /** Current value; `null` or omitted renders an indeterminate bar. */
  value?: number | null
  max?: number
  /** Accessible name of the progress bar. */
  label: string
  /** Shows the percentage next to the bar. */
  showValue?: boolean
  tone?: 'accent' | 'success' | 'danger'
  size?: 'sm' | 'md'
  className?: string
}

const toneClasses = {
  accent: 'bg-lake-accent',
  success: 'bg-lake-success',
  danger: 'bg-lake-danger',
}

function Progress({ value = null, max = 100, label, showValue = false, tone = 'accent', size = 'md', className }: ProgressProps) {
  const indeterminate = value == null || Number.isNaN(value)
  const safeMax = max > 0 ? max : 100
  const current = indeterminate ? 0 : Math.min(Math.max(value, 0), safeMax)
  const percent = Math.round((current / safeMax) * 100)

  return (
    <div className={cn('flex w-full items-center gap-3', className)}>
      <div
        role='progressbar'
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-valuenow={indeterminate ? undefined : current}
        className={cn('relative w-full overflow-hidden rounded-full bg-lake-line/60', size === 'sm' ? 'h-1.5' : 'h-2.5')}
      >
        <div
          className={cn(
            'h-full rounded-full',
            toneClasses[tone],
            indeterminate
              ? 'w-1/3 animate-lake-indeterminate motion-reduce:animate-none'
              : 'transition-[width] duration-300 ease-out motion-reduce:transition-none',
          )}
          style={indeterminate ? undefined : { width: `${percent}%` }}
        />
      </div>
      {showValue && !indeterminate && (
        <span className='shrink-0 text-xs tabular-nums text-lake-fg-muted'>{`${percent}%`}</span>
      )}
    </div>
  )
}

export default Progress
