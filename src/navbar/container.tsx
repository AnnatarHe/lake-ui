import { cn } from '@/utils/cn'

type Props = {
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'transparent' | 'solid'
}

function NavbarContainer(props: Props) {
  const { children, className, variant = 'default' } = props
  
  const variantClasses = {
    default: 'bg-white/95 dark:bg-gray-900/95 border-gray-200 dark:border-gray-800',
    transparent: 'bg-white/80 dark:bg-gray-900/80 border-gray-200/50 dark:border-gray-800/50',
    solid: 'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700'
  }
  
  return (
    <header className={cn(
      'sticky top-0 z-20 border-b backdrop-blur-sm',
      'animate-in fade-in-50 slide-in-from-top-2',
      'shadow-sm',
      variantClasses[variant],
      className
    )}>
      <div className='mx-auto max-w-7xl px-4 py-3 sm:px-6'>{children}</div>
    </header>
  )
}

export default NavbarContainer
