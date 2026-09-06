'use client'

import Overlay from '@/overlay'
import type { OverlayProps } from '@/overlay'
import { cn } from '@/utils/cn'

export interface ModalProps extends OverlayProps {
  title: React.ReactNode
}

export default function Modal({ selector = '[data-st-role=modal]', className, ...props }: ModalProps) {
  return <Overlay {...props} selector={selector} placement='center' className={cn('max-w-4xl', className)} />
}
