import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react'
import Spinner from '@/spinner'
import {
  buttonStyles,
  renderButton,
  spinnerSizes,
  type ButtonRenderElement,
  type ButtonSize,
  type ButtonVariant,
} from './shared'

export { buttonStyles }
export type { ButtonRenderElement, ButtonSize, ButtonStyleOptions, ButtonVariant } from './shared'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
  /** Shows a spinner, sets aria-busy and disables the button. */
  loading?: boolean
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  fullWidth?: boolean
  /**
   * Element to render instead of `<button>`, e.g. `<Link href='/x' />`. It is cloned
   * with the merged className and children, so it works in server components.
   */
  render?: ButtonRenderElement
  ref?: Ref<HTMLButtonElement>
}

function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  leadingIcon,
  trailingIcon,
  fullWidth,
  className,
  children,
  ...rest
}: ButtonProps) {
  const lead = loading ? <Spinner size={spinnerSizes[size]} label='' /> : leadingIcon
  return renderButton({
    ...rest,
    loading,
    classes: buttonStyles({ variant, size, fullWidth, className }),
    body: (
      <>
        {lead != null && lead !== false && <span aria-hidden='true' className='inline-flex shrink-0'>{lead}</span>}
        {children}
        {trailingIcon != null && trailingIcon !== false && <span aria-hidden='true' className='inline-flex shrink-0'>{trailingIcon}</span>}
      </>
    ),
  })
}

export default Button
