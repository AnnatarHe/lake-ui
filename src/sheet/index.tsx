'use client'

import Overlay from '@/overlay'
import type { OverlayProps } from '@/overlay'
import { cn } from '@/utils/cn'

export interface SheetProps extends OverlayProps {
  side?: 'left' | 'right'
  width?: string
}

export default function Sheet({ selector = '[data-st-role=sheet]', side = 'right', width = 'max-w-md', className, ...props }: SheetProps) {
  return <Overlay {...props} selector={selector} placement={side} className={cn(width, className)} />
}
