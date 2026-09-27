import { cloneElement } from 'react'
import type { ButtonHTMLAttributes, ReactElement, ReactNode, Ref } from 'react'
import { cn } from '@/utils/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg'

/** An element to render instead of `<button>`, e.g. `<Link href='/x' />`. */
export type ButtonRenderElement = ReactElement<{ className?: string, children?: ReactNode }>

export interface ButtonStyleOptions {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  /** Square sizing for icon-only buttons. */
  iconOnly?: boolean
  className?: string
}

const base = [
  'inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-lake-control font-medium',
  'select-none outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-lake-ring',
  'disabled:pointer-events-none disabled:opacity-50 aria-disabled:pointer-events-none aria-disabled:opacity-50',
].join(' ')

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-lake-accent text-lake-accent-fg hover:bg-lake-accent-hover',
  secondary: 'border border-lake-line bg-lake-surface-raised text-lake-fg hover:bg-lake-surface-muted',
  ghost: 'text-lake-fg-muted hover:bg-lake-surface-muted hover:text-lake-fg',
  danger: 'bg-lake-danger text-lake-danger-fg hover:bg-lake-danger/90',
  link: 'h-auto rounded-sm p-0 text-lake-accent-text underline-offset-4 hover:underline',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
}

const iconOnlyClasses: Record<ButtonSize, string> = {
  sm: 'size-8 p-0',
  md: 'size-9 p-0',
  lg: 'size-11 p-0',
}

const linkSizeClasses: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

export const spinnerSizes = { sm: 'xs', md: 'sm', lg: 'md' } as const

/** Class string for a button, usable on any element. */
export function buttonStyles({ variant = 'primary', size = 'md', fullWidth, iconOnly, className }: ButtonStyleOptions = {}) {
  return cn(
    base,
    variant === 'link' ? linkSizeClasses[size] : iconOnly ? iconOnlyClasses[size] : sizeClasses[size],
    variantClasses[variant],
    fullWidth && 'w-full',
    className,
  )
}

interface RenderButtonOptions extends ButtonHTMLAttributes<HTMLButtonElement> {
  classes: string
  body: ReactNode
  loading?: boolean
  render?: ButtonRenderElement
  ref?: Ref<HTMLButtonElement>
}

/**
 * Renders a `<button>` or clones `render`. Only serialisable props are added, so a
 * server component can pass e.g. a Next.js `<Link>` as `render`.
 */
export function renderButton({ classes, body, loading, render, disabled, type = 'button', ...rest }: RenderButtonOptions) {
  const inactive = disabled || loading
  if (render) {
    // Only set what applies, so the render element keeps its own attributes otherwise.
    const props: Record<string, unknown> = { ...rest, className: cn(classes, render.props.className), children: body }
    if (inactive) {
      props['aria-disabled'] = true
      props.tabIndex = -1
    }
    if (loading) props['aria-busy'] = true
    return cloneElement(render, props)
  }
  return (
    <button
      type={type}
      {...rest}
      disabled={inactive}
      aria-busy={loading || undefined}
      className={classes}
    >
      {body}
    </button>
  )
}
