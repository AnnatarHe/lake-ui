'use client'
import {
  FloatingArrow,
  FloatingPortal,
  arrow,
  autoPlacement,
  autoUpdate,
  offset,
  shift,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react'
import {
  cloneElement,
  Fragment,
  isValidElement,
  useLayoutEffect,
  useRef,
  useState,
} from 'react'
import type { ReactElement, ReactNode, Ref } from 'react'

import usePortalHost from '@/hooks/usePortalHost'
import { cn } from '@/utils/cn'

export interface TooltipProps {
  content: ReactNode
  /**
   * A single element receives the trigger ref and props directly; it must accept
   * `ref` and spread unknown props onto a DOM node. Anything else is wrapped in
   * an inline-flex span.
   */
  children: ReactNode
  side?: 'top' | 'bottom' | 'left' | 'right'
  noWrap?: boolean
  className?: string
  disabled?: boolean
  /** Hover open delay in milliseconds. */
  delay?: number
}

const slideClass: Record<string, string> = {
  top: 'slide-in-from-bottom-1',
  bottom: 'slide-in-from-top-1',
  left: 'slide-in-from-right-1',
  right: 'slide-in-from-left-1',
}

type TriggerElement = ReactElement<Record<string, unknown> & { ref?: Ref<Element> }>

function canClone(children: ReactNode): children is TriggerElement {
  return isValidElement(children) && children.type !== Fragment
}

function Tooltip(props: TooltipProps) {
  const { content, disabled = false, children, noWrap, className, side, delay } = props
  const [isOpen, setIsOpen] = useState(false)
  // Children that never attach the reference ref fall back to a wrapper span.
  const [wrap, setWrap] = useState(() => !canClone(children))
  const arrowRef = useRef<SVGSVGElement>(null)
  const open = isOpen && !disabled
  const { refs, floatingStyles, context, placement } = useFloating({
    placement: side ?? 'top',
    open,
    onOpenChange: setIsOpen,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset({ mainAxis: 8 }),
      side ? undefined : autoPlacement(),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
  })
  const hover = useHover(context, { enabled: !disabled, delay: delay ? { open: delay, close: 0 } : undefined })
  const focus = useFocus(context, { enabled: !disabled })
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'tooltip' })
  const { getReferenceProps, getFloatingProps } = useInteractions([hover, focus, dismiss, role])
  const host = usePortalHost('[data-st-role=tooltip]')

  const cloneable = !wrap && canClone(children)
  const childRef = cloneable ? children.props.ref : undefined
  const triggerRef = useMergeRefs([refs.setReference, childRef])

  useLayoutEffect(() => {
    if (!wrap && (!canClone(children) || !refs.domReference.current)) setWrap(true)
  }, [wrap, children, refs])

  const slideAnimation = slideClass[placement.split('-')[0]] ?? 'slide-in-from-bottom-1'

  const trigger = cloneable
    ? cloneElement(children, getReferenceProps({ ...children.props, ref: triggerRef }))
    : (
        <span className='inline-flex' {...getReferenceProps({ ref: triggerRef })}>
          {children}
        </span>
      )

  return (
    <>
      {trigger}
      {open && host && (
        <FloatingPortal root={host}>
          <div
            ref={refs.setFloating}
            style={floatingStyles}
            className='z-50'
            {...getFloatingProps()}
          >
            <FloatingArrow
              ref={arrowRef}
              context={context}
              strokeWidth={1}
              className='z-[51] fill-lake-surface [&>path:first-of-type]:stroke-lake-line'
            />
            <div
              className={cn(
                'px-3 py-2 text-sm backdrop-blur-lake',
                'rounded-lake-control shadow-lake-overlay border',
                'bg-lake-surface/95 text-lake-fg-muted border-lake-line',
                'transition-all duration-200',
                noWrap && 'whitespace-nowrap',
                `animate-in fade-in-50 motion-reduce:animate-none ${slideAnimation}`,
                className,
              )}
            >
              {content}
            </div>
          </div>
        </FloatingPortal>
      )}
    </>
  )
}

export default Tooltip
