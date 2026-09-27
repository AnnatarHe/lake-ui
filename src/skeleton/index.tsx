import { cn } from '@/utils/cn'

export interface SkeletonProps {
  shape?: 'rect' | 'text' | 'circle'
  /** Number of text lines; the last one is shorter. Only for `shape='text'`. */
  lines?: number
  animated?: boolean
  className?: string
}

function Skeleton({ shape = 'rect', lines = 1, animated = true, className }: SkeletonProps) {
  const block = cn('block bg-lake-line/60', animated && 'animate-pulse motion-reduce:animate-none')

  if (shape === 'text') {
    return (
      <span aria-hidden='true' className={cn('flex w-full flex-col gap-2', className)}>
        {Array.from({ length: Math.max(1, lines) }, (_, index) => (
          <span
            key={index}
            className={cn(block, 'h-3.5 rounded-sm', lines > 1 && index === lines - 1 ? 'w-3/5' : 'w-full')}
          />
        ))}
      </span>
    )
  }

  return (
    <span
      aria-hidden='true'
      className={cn(
        block,
        shape === 'circle' ? 'size-10 rounded-full' : 'h-4 w-full rounded-lake-control',
        className,
      )}
    />
  )
}

export default Skeleton
