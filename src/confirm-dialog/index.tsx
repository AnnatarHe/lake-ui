'use client'

import { useEffect, useId, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import Button from '@/button'
import Modal from '@/modal'

export interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  /** A returned promise keeps the dialog open and locked until it settles; a rejection keeps it open. */
  onConfirm: () => void | Promise<unknown>
  title: ReactNode
  description?: ReactNode
  children?: ReactNode
  /** `danger` styles the confirm button as destructive and focuses Cancel first. */
  tone?: 'default' | 'danger'
  confirmLabel?: string
  cancelLabel?: string
  confirmDisabled?: boolean
  /** Close after a successful confirm. */
  closeOnConfirm?: boolean
  /** Portal host selector, as for Modal. */
  selector?: string
}

function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  children,
  tone = 'default',
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  confirmDisabled = false,
  closeOnConfirm = true,
  selector,
}: ConfirmDialogProps) {
  const [pending, setPending] = useState(false)
  const mounted = useRef(true)
  const descriptionId = useId()

  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  const confirm = async () => {
    if (pending) return
    const result = onConfirm()
    if (!result || typeof (result as Promise<unknown>).then !== 'function') {
      if (closeOnConfirm) onClose()
      return
    }
    setPending(true)
    try {
      await result
      if (mounted.current && closeOnConfirm) onClose()
    }
    catch {
      // Keep the dialog open so the caller can surface the error and the user can retry.
    }
    finally {
      if (mounted.current) setPending(false)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size='sm'
      role='alertdialog'
      selector={selector}
      locked={pending}
      hideCloseButton
      descriptionId={description ? descriptionId : undefined}
      initialFocus={tone === 'danger' ? '[data-confirm-dialog-cancel]' : '[data-confirm-dialog-confirm]:not(:disabled)'}
      footer={(
        <>
          <Button variant='secondary' data-confirm-dialog-cancel='' disabled={pending} onClick={onClose}>
            {cancelLabel}
          </Button>
          <Button
            variant={tone === 'danger' ? 'danger' : 'primary'}
            data-confirm-dialog-confirm=''
            loading={pending}
            disabled={confirmDisabled}
            onClick={confirm}
          >
            {confirmLabel}
          </Button>
        </>
      )}
    >
      {description && <p id={descriptionId} className='text-sm text-lake-fg-muted'>{description}</p>}
      {children && <div className={description ? 'mt-3' : undefined}>{children}</div>}
    </Modal>
  )
}

export default ConfirmDialog
