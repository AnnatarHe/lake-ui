import { cn } from '@/utils/cn'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export interface NavbarContainerProps extends Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'> {
  children: ReactNode
  className?: string
  /** Class for the centered inner row (defaults to a `max-w-7xl` container). */
  innerClassName?: string
  /** Rendered element. Defaults to `header`. */
  as?: ElementType
  variant?: 'default' | 'transparent' | 'solid'
  /** Plays the slide-in entrance animation. */
  animated?: boolean
}

const variantClasses = {
  default: 'bg-lake-surface/95 border-lake-line',
  transparent: 'bg-lake-surface/80 border-lake-line/50',
  solid: 'bg-lake-surface border-lake-line-strong',
}

function NavbarContainer(props: NavbarContainerProps) {
  const {
    children,
    className,
    innerClassName,
    as: Component = 'header',
    variant = 'default',
    animated = true,
    ...rest
  } = props

  return (
    <Component
      {...rest}
      className={cn(
        'sticky top-0 z-20 border-b backdrop-blur-lake shadow-lake-card',
        animated && 'animate-in fade-in-50 slide-in-from-top-2 motion-reduce:animate-none',
        variantClasses[variant],
        className,
      )}
    >
      <div className={cn('mx-auto max-w-7xl px-4 py-3 sm:px-6', innerClassName)}>{children}</div>
    </Component>
  )
}

export default NavbarContainer
