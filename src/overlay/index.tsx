'use client'

import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react'
import { X } from 'lucide-react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import useBodyScrollLock from '@/hooks/useBodyScrollLock'
import { cn } from '@/utils/cn'

export interface OverlayProps {
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
  title?: ReactNode
  selector?: string
  /** Blocks Escape, backdrop, and close-button dismissal while work or credentials are pending. */
  locked?: boolean
  role?: 'dialog' | 'alertdialog'
  /** Accessible name for a panel without a visible title. */
  ariaLabel?: string
  descriptionId?: string
  /** CSS selector within the panel. Falls back to the panel when there is no match. */
  initialFocus?: string
  closeLabel?: string
  className?: string
  overlayClassName?: string
  headerClassName?: string
  bodyClassName?: string
}

interface Props extends OverlayProps {
  selector: string
  placement: 'center' | 'left' | 'right'
}

export default function Overlay({
  selector, title, isOpen, onClose, children, locked = false, role = 'dialog',
  ariaLabel, descriptionId, initialFocus, closeLabel = 'Close', placement,
  className, overlayClassName, headerClassName, bodyClassName,
}: Props) {
  const [host, setHost] = useState<HTMLElement | null>(null)
  const titleId = useId()
  const focus = useRef<HTMLElement | null>(null)
  useEffect(() => {
    setHost(document.querySelector<HTMLElement>(selector))
  }, [selector])
  const { refs, context } = useFloating({
    open: isOpen,
    onOpenChange(open) {
      if (!open && !locked) onClose()
    },
  })
  const dismiss = useDismiss(context, { enabled: !locked, outsidePressEvent: 'click' })
  const semantics = useRole(context, { role })
  const { getFloatingProps } = useInteractions([dismiss, semantics])
  const setPanel = useCallback((node: HTMLElement | null) => {
    refs.setFloating(node)
    focus.current = node?.querySelector<HTMLElement>(initialFocus || 'button') ?? node
  }, [refs, initialFocus])
  useBodyScrollLock(isOpen && !!host)
  if (!isOpen || !host) return null

  return (
    <FloatingPortal root={host}>
      <FloatingOverlay className={cn(
        'fixed inset-0 z-50 flex bg-black/20 dark:bg-black/50 backdrop-blur-sm',
        placement === 'center' ? 'items-center justify-center p-4' : 'items-stretch',
        placement === 'right' && 'justify-end',
        overlayClassName,
      )}
      >
        <FloatingFocusManager context={context} modal outsideElementsInert returnFocus initialFocus={initialFocus ? focus : 0}>
          <section
            {...getFloatingProps()}
            ref={setPanel}
            aria-modal='true'
            aria-labelledby={title ? titleId : undefined}
            aria-label={title ? undefined : (ariaLabel ?? 'Panel')}
            aria-describedby={descriptionId}
            data-placement={placement}
            className={cn(
              'flex w-full min-h-0 flex-col border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800',
              placement === 'center' ? 'max-h-[calc(100dvh-2rem)] rounded-xl border animate-in fade-in slide-in-from-bottom-2 motion-reduce:animate-none' : 'h-dvh animate-in motion-reduce:animate-none',
              placement === 'left' && 'border-r slide-in-from-left',
              placement === 'right' && 'border-l slide-in-from-right',
              className,
            )}
          >
            <div className={cn('flex shrink-0 items-center justify-between gap-4 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6', headerClassName)}>
              {title && <h3 id={titleId} className='text-lg font-semibold text-gray-900 dark:text-white'>{title}</h3>}
              <button
                type='button'
                aria-label={closeLabel}
                disabled={locked}
                onClick={onClose}
                className={cn('rounded-lg p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50', !title && 'ml-auto')}
              >
                <X className='h-5 w-5' aria-hidden='true' />
              </button>
            </div>
            <div className={cn('min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 text-gray-700 dark:text-gray-300', placement !== 'center' && 'flex-1', bodyClassName)}>{children}</div>
          </section>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  )
}
