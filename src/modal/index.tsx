'use client'

import Overlay from '@/overlay'
import type { OverlayProps } from '@/overlay'
import { cn } from '@/utils/cn'

export interface ModalProps extends OverlayProps {
  title: React.ReactNode
  /** Maximum panel width. `xl` matches the historical `max-w-4xl`. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const sizeClasses = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  full: 'max-w-none h-[calc(100dvh-2rem)]',
}

export default function Modal({ selector = '[data-st-role=modal]', size = 'xl', className, ...props }: ModalProps) {
  return <Overlay {...props} selector={selector} placement='center' className={cn(sizeClasses[size], className)} />
}
