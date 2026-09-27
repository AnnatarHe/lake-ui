'use client'

import {
  FloatingArrow,
  FloatingFocusManager,
  FloatingPortal,
  arrow as arrowMiddleware,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useMergeRefs,
  useRole,
} from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'
import { cloneElement, isValidElement, useCallback, useRef, useState } from 'react'
import type { HTMLProps, ReactElement, ReactNode, Ref } from 'react'
import usePortalHost from '@/hooks/usePortalHost'
import { cn } from '@/utils/cn'

export interface PopoverApi {
  close: () => void
}

export interface PopoverProps {
  /** Element that toggles the popover. It must accept `ref` and spread props onto a DOM node. */
  trigger: ReactElement
  children: ReactNode | ((api: PopoverApi) => ReactNode)
  placement?: Placement
  /** Accessible name of the dialog. */
  label?: string
  /** Traps focus inside the popover while open. */
  modal?: boolean
  /** CSS selector inside the popover to focus on open; defaults to the first tabbable element. */
  initialFocus?: string
  /** `true` portals into `[data-st-role=popover]` (or `document.body`); a string is a custom selector. */
  portal?: boolean | string
  arrow?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

type TriggerElement = ReactElement<Record<string, unknown> & { ref?: Ref<Element> }>

function Popover({
  trigger,
  children,
  placement = 'bottom',
  label,
  modal = false,
  initialFocus,
  portal = true,
  arrow = false,
  open: openProp,
  onOpenChange,
  className,
}: PopoverProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const open = openProp ?? uncontrolledOpen
  const setOpen = useCallback((next: boolean) => {
    if (openProp === undefined) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }, [openProp, onOpenChange])
  const arrowRef = useRef<SVGSVGElement>(null)
  const focusRef = useRef<HTMLElement | null>(null)

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(arrow ? 10 : 6),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      arrow ? arrowMiddleware({ element: arrowRef, padding: 8 }) : undefined,
    ],
  })
  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'dialog' })
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss, role])

  const host = usePortalHost(typeof portal === 'string' ? portal : '[data-st-role=popover]')
  const triggerElement = trigger as TriggerElement
  const triggerRef = useMergeRefs([refs.setReference, isValidElement(trigger) ? triggerElement.props.ref : undefined])
  const setPanel = useCallback((node: HTMLElement | null) => {
    refs.setFloating(node)
    focusRef.current = node && initialFocus ? node.querySelector<HTMLElement>(initialFocus) : null
  }, [refs, initialFocus])
  const close = useCallback(() => setOpen(false), [setOpen])

  const reference = cloneElement(
    triggerElement,
    getReferenceProps({ ...triggerElement.props, ref: triggerRef } as HTMLProps<Element>),
  )

  const panel = open && (
    <FloatingFocusManager context={context} modal={modal} initialFocus={initialFocus ? focusRef : 0} returnFocus>
      <div
        ref={setPanel}
        style={floatingStyles}
        aria-label={label}
        className={cn(
          'z-50 max-w-[calc(100vw-1rem)] rounded-lake-panel border border-lake-line bg-lake-surface-raised p-4 text-sm text-lake-fg',
          'shadow-lake-overlay outline-none animate-in fade-in-0 zoom-in-95 motion-reduce:animate-none',
          className,
        )}
        {...getFloatingProps()}
      >
        {arrow && (
          <FloatingArrow
            ref={arrowRef}
            context={context}
            strokeWidth={1}
            className='fill-lake-surface-raised [&>path:first-of-type]:stroke-lake-line'
          />
        )}
        {typeof children === 'function' ? children({ close }) : children}
      </div>
    </FloatingFocusManager>
  )

  return (
    <>
      {reference}
      {panel && (portal === false ? panel : host && <FloatingPortal root={host}>{panel}</FloatingPortal>)}
    </>
  )
}

export default Popover
