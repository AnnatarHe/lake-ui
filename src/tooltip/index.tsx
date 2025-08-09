'use client'
import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoUpdate,
  flip,
  offset,
  shift,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
} from '@floating-ui/react'
import React from 'react'

import { cn } from '@/utils/cn'

interface TooltipProps {
  content: React.ReactNode
  children: React.ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  noWrap?: boolean
  className?: string
  disabled?: boolean
}

function Tooltip(props: TooltipProps) {
  const { content, disabled, children, noWrap, className } = props
  const [isOpen, setIsOpen] = React.useState(false)
  const arrowRef = React.useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen && !disabled,
    onOpenChange: setIsOpen,
    transform: true,
    whileElementsMounted: autoUpdate,
    middleware: [
      flip(),
      shift(),
      arrow({
        element: arrowRef,
      }),
      offset({
        mainAxis: 8,
      }),
    ],
  })

  const rootDom
    = typeof window === 'undefined'
      ? null
      : (document.querySelector('[data-st-role=tooltip]') as HTMLElement)
  const hover = useHover(context)
  const focus = useFocus(context)
  useInteractions([hover, focus])

  return (
    <div className='relative inline-block' ref={refs.setReference}>
      <div
        className='inline-block'
        aria-describedby='tooltip'
        popoverTarget='tooltip'
        ref={refs.setReference}
      >
        {children}
      </div>
      {isOpen && !disabled && (
        <FloatingPortal root={rootDom}>
          <div ref={refs.setFloating} style={floatingStyles} className='z-50'>
            <div
              className={cn(
                'px-3 py-2 text-sm backdrop-blur-md',
                'rounded-lg shadow-xl border',
                'bg-white/95 text-gray-700 border-gray-200',
                'dark:bg-gray-900/95 dark:text-gray-200 dark:border-gray-700',
                'transition-all duration-200',
                className,
                noWrap && 'whitespace-nowrap',
                'animate-in fade-in-50 slide-in-from-top-1',
              )}
            >
              <FloatingArrow
                ref={arrowRef}
                context={context}
                className='fill-white dark:fill-gray-900 [&>path:first-of-type]:stroke-gray-200 dark:[&>path:first-of-type]:stroke-gray-700'
              />
              {content}
            </div>
          </div>
        </FloatingPortal>
      )}
    </div>
  )
}

export default Tooltip
