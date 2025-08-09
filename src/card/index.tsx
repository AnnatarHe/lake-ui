import { cn } from '@/utils/cn'
import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'bordered' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

function Card({ 
  children, 
  className,
  variant = 'default',
  padding = 'md'
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
    xl: 'p-8 sm:p-10'
  }

  const variantClasses = {
    default: cn(
      'bg-white/95 backdrop-blur-md',
      'border border-gray-200/50',
      'shadow-sm hover:shadow-md transition-shadow duration-200',
      'dark:bg-gray-900/95 dark:border-gray-800'
    ),
    bordered: cn(
      'bg-white',
      'border-2 border-gray-200',
      'dark:bg-gray-900 dark:border-gray-700'
    ),
    elevated: cn(
      'bg-gradient-to-br from-white to-gray-50/50',
      'shadow-lg hover:shadow-xl transition-all duration-300',
      'border border-gray-100',
      'dark:from-gray-900 dark:to-gray-800/50 dark:border-gray-800'
    )
  }

  return (
    <div 
      className={cn(
        'rounded-xl',
        'transition-all duration-200',
        paddingClasses[padding],
        variantClasses[variant],
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card
