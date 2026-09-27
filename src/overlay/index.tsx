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
import { useCallback, useId, useRef } from 'react'
import type { ReactNode } from 'react'
import useBodyScrollLock from '@/hooks/useBodyScrollLock'
import usePortalHost from '@/hooks/usePortalHost'
import { cn } from '@/utils/cn'

export interface OverlayProps {
  isOpen: boolean
  onClose: () => void
  children?: ReactNode
  title?: ReactNode
  /** Actions pinned below the scrolling body. */
  footer?: ReactNode
  /** Portal host selector. Falls back to `document.body` when nothing matches. */
  selector?: string
  /** Blocks Escape, backdrop, and close-button dismissal while work or credentials are pending. */
  locked?: boolean
  role?: 'dialog' | 'alertdialog'
  /** Accessible name for a panel without a visible title. */
  ariaLabel?: string
  descriptionId?: string
  /**
   * CSS selector within the panel. Without a match, focus goes to `[data-autofocus]`,
   * then the first enabled input, textarea or select in the body, then the panel itself.
   */
  initialFocus?: string
  hideCloseButton?: boolean
  closeLabel?: string
  className?: string
  overlayClassName?: string
  headerClassName?: string
  bodyClassName?: string
  footerClassName?: string
}

interface Props extends OverlayProps {
  selector: string
  placement: 'center' | 'left' | 'right'
}

const BODY_FIELDS = ['input:not([type=hidden])', 'textarea', 'select']
  .map(field => `[data-overlay-body] ${field}:not([disabled])`)
  .join(', ')

export default function Overlay({
  selector, title, footer, isOpen, onClose, children, locked = false, role = 'dialog',
  ariaLabel, descriptionId, initialFocus, hideCloseButton = false, closeLabel = 'Close', placement,
  className, overlayClassName, headerClassName, bodyClassName, footerClassName,
}: Props) {
  const host = usePortalHost(selector)
  const titleId = useId()
  const focus = useRef<HTMLElement | null>(null)
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
    focus.current = node && (
      (initialFocus ? node.querySelector<HTMLElement>(initialFocus) : null)
      ?? node.querySelector<HTMLElement>('[data-autofocus]')
      ?? node.querySelector<HTMLElement>(BODY_FIELDS)
      ?? node
    )
  }, [refs, initialFocus])
  useBodyScrollLock(isOpen && !!host)
  if (!isOpen || !host) return null

  return (
    <FloatingPortal root={host}>
      <FloatingOverlay className={cn(
        'fixed inset-0 z-50 flex bg-lake-overlay backdrop-blur-lake',
        placement === 'center' ? 'items-center justify-center p-4' : 'items-stretch',
        placement === 'right' && 'justify-end',
        overlayClassName,
      )}
      >
        <FloatingFocusManager context={context} modal outsideElementsInert returnFocus initialFocus={focus}>
          <section
            {...getFloatingProps()}
            ref={setPanel}
            aria-modal='true'
            aria-labelledby={title ? titleId : undefined}
            aria-label={title ? undefined : (ariaLabel ?? 'Panel')}
            aria-describedby={descriptionId}
            data-placement={placement}
            className={cn(
              'flex w-full min-h-0 flex-col border-lake-line bg-lake-surface-raised shadow-lake-overlay outline-none',
              placement === 'center' ? 'max-h-[calc(100dvh-2rem)] rounded-lake-panel border animate-in fade-in slide-in-from-bottom-2 motion-reduce:animate-none' : 'h-dvh animate-in motion-reduce:animate-none',
              placement === 'left' && 'border-r slide-in-from-left',
              placement === 'right' && 'border-l slide-in-from-right',
              className,
            )}
          >
            {(title || !hideCloseButton) && (
              <div className={cn('flex shrink-0 items-center justify-between gap-4 border-b border-lake-line p-4 sm:p-6', headerClassName)}>
                {title && <h3 id={titleId} className='text-lg font-semibold text-lake-fg'>{title}</h3>}
                {!hideCloseButton && (
                  <button
                    type='button'
                    aria-label={closeLabel}
                    disabled={locked}
                    onClick={onClose}
                    className={cn(
                      'rounded-lake-control p-2 text-lake-fg-subtle transition-colors hover:bg-lake-surface-muted hover:text-lake-fg-muted',
                      'outline-none focus-visible:ring-2 focus-visible:ring-lake-ring disabled:cursor-not-allowed disabled:opacity-50',
                      !title && 'ml-auto',
                    )}
                  >
                    <X className='h-5 w-5' aria-hidden='true' />
                  </button>
                )}
              </div>
            )}
            <div
              data-overlay-body=''
              className={cn('min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-6 text-lake-fg-muted', placement !== 'center' && 'flex-1', bodyClassName)}
            >
              {children}
            </div>
            {footer != null && footer !== false && (
              <div className={cn('flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-lake-line px-4 py-3 sm:px-6', footerClassName)}>
                {footer}
              </div>
            )}
          </section>
        </FloatingFocusManager>
      </FloatingOverlay>
    </FloatingPortal>
  )
}
