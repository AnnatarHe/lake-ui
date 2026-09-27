import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import { buttonStyles, renderButton, spinnerSizes, type ButtonRenderElement, type ButtonSize } from '@/button/shared'
import Spinner from '@/spinner'

export interface IconButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  /** Accessible name (aria-label). */
  label: string
  icon: ReactNode
  variant?: 'ghost' | 'secondary' | 'primary' | 'danger'
  size?: ButtonSize
  loading?: boolean
  /** Element to render instead of `<button>`, e.g. `<Link href='/x' />`. */
  render?: ButtonRenderElement
  ref?: Ref<HTMLButtonElement>
}

function IconButton({
  label,
  icon,
  variant = 'ghost',
  size = 'md',
  loading = false,
  className,
  ...rest
}: IconButtonProps) {
  return renderButton({
    ...rest,
    'aria-label': label,
    loading,
    'classes': buttonStyles({ variant, size, iconOnly: true, className }),
    'body': loading
      ? <Spinner size={spinnerSizes[size]} label='' />
      : <span aria-hidden='true' className='inline-flex shrink-0'>{icon}</span>,
  })
}

export default IconButton
