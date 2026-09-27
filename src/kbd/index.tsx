import type { HTMLAttributes } from 'react'
import { cn } from '@/utils/cn'

export type KbdProps = HTMLAttributes<HTMLElement>

function Kbd({ className, ...rest }: KbdProps) {
  return (
    <kbd
      {...rest}
      className={cn(
        'inline-flex h-5 min-w-5 items-center justify-center rounded-md border border-b-2 border-lake-line',
        'bg-lake-surface-raised px-1.5 font-mono text-[0.6875rem] font-medium text-lake-fg-muted',
        className,
      )}
    />
  )
}

export default Kbd
