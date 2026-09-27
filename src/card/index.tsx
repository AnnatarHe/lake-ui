import { cn } from '@/utils/cn'
import type { ElementType, HTMLAttributes, ReactNode } from 'react'

export interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'className' | 'children'> {
  children: ReactNode
  className?: string
  /** Rendered element, e.g. `section` or `article`. Defaults to `div`. */
  as?: ElementType
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4 sm:p-6',
  lg: 'p-6 sm:p-8',
  xl: 'p-8 sm:p-10',
}

const variantClasses = {
  default: 'bg-lake-surface/95 backdrop-blur-lake border border-lake-line shadow-lake-card hover:shadow-md',
  bordered: 'bg-lake-surface border-2 border-lake-line',
  elevated: 'bg-gradient-to-br from-lake-surface to-lake-surface-muted/50 border border-lake-line shadow-lg hover:shadow-xl duration-300',
}

function Card({
  children,
  className,
  as: Component = 'div',
  variant = 'default',
  padding = 'md',
  ...rest
}: CardProps) {
  return (
    <Component
      {...rest}
      className={cn(
        'rounded-lake-panel transition-all duration-200',
        paddingClasses[padding],
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </Component>
  )
}

export default Card
