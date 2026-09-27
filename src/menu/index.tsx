'use client'

import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  size,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useListNavigation,
  useMergeRefs,
  useTypeahead,
} from '@floating-ui/react'
import type { Placement } from '@floating-ui/react'
import { Check } from 'lucide-react'
import { cloneElement, isValidElement, useId, useRef, useState } from 'react'
import type { HTMLProps, KeyboardEvent, MouseEvent, ReactElement, ReactNode, Ref } from 'react'
import usePortalHost from '@/hooks/usePortalHost'
import { cn } from '@/utils/cn'

export interface MenuItemEntry {
  type?: 'item'
  key: string
  label: ReactNode
  icon?: ReactNode
  /** Display-only shortcut hint, e.g. `⌘K`. */
  shortcut?: string
  tone?: 'default' | 'danger'
  disabled?: boolean
  onSelect?: () => void
  /** Element to render instead of a button, e.g. `<Link href='/settings' />`. */
  render?: ReactElement
}

export interface MenuRadioEntry {
  type: 'radio'
  key: string
  label: ReactNode
  checked: boolean
  onSelect: () => void
  disabled?: boolean
}

export interface MenuSeparatorEntry {
  type: 'separator'
  key: string
}

export interface MenuLabelEntry {
  type: 'label'
  key: string
  label: ReactNode
}

export type MenuEntry = MenuItemEntry | MenuRadioEntry | MenuSeparatorEntry | MenuLabelEntry

export interface MenuProps {
  /** Element that toggles the menu. It must accept `ref` and spread props onto a DOM node. */
  trigger: ReactElement
  items: MenuEntry[]
  /** Non-interactive content above the items, e.g. the signed-in user. */
  header?: ReactNode
  /** Accessible name of the menu. Defaults to the trigger's name. */
  label?: string
  placement?: Placement
  /** `true` portals into `[data-st-role=popover]` (or `document.body`); a string is a custom selector. */
  portal?: boolean | string
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

type TriggerElement = ReactElement<Record<string, unknown> & { ref?: Ref<Element> }>

export const menuItemClasses = (tone: 'default' | 'danger' = 'default') => cn(
  'flex w-full cursor-default select-none items-center gap-2 rounded-[calc(var(--lake-radius-control)_-_2px)] px-2.5 py-1.5 text-left text-sm outline-none',
  'transition-colors duration-100 aria-disabled:pointer-events-none aria-disabled:opacity-50',
  tone === 'danger'
    ? 'text-lake-danger focus:bg-lake-danger-soft'
    : 'text-lake-fg focus:bg-lake-surface-muted',
)

function textOf(label: ReactNode) {
  return typeof label === 'string' || typeof label === 'number' ? String(label) : null
}

function Menu({
  trigger,
  items,
  header,
  label,
  placement = 'bottom-end',
  portal = true,
  open: openProp,
  onOpenChange,
  className,
}: MenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
  const open = openProp ?? uncontrolledOpen
  const setOpen = (next: boolean) => {
    if (openProp === undefined) setUncontrolledOpen(next)
    onOpenChange?.(next)
  }
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const listRef = useRef<Array<HTMLElement | null>>([])
  const menuId = useId()
  const triggerId = useId()

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(6),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      size({
        padding: 8,
        apply({ availableHeight, elements }) {
          elements.floating.style.maxHeight = `${Math.max(160, availableHeight)}px`
        },
      }),
    ],
  })

  const interactive = items.filter(
    (entry): entry is MenuItemEntry | MenuRadioEntry => entry.type !== 'separator' && entry.type !== 'label',
  )
  const labelsRef = useRef<Array<string | null>>([])
  labelsRef.current = interactive.map(entry => textOf(entry.label))

  const click = useClick(context)
  const dismiss = useDismiss(context)
  // Focus the first item on every open, as the menu button pattern expects.
  const listNavigation = useListNavigation(context, { listRef, activeIndex, onNavigate: setActiveIndex, loop: true, focusItemOnOpen: true })
  const typeahead = useTypeahead(context, {
    listRef: labelsRef,
    activeIndex,
    onMatch: open ? setActiveIndex : undefined,
  })
  const { getReferenceProps, getFloatingProps, getItemProps } = useInteractions([click, dismiss, listNavigation, typeahead])

  const host = usePortalHost(typeof portal === 'string' ? portal : '[data-st-role=popover]')
  const triggerElement = trigger as TriggerElement
  const triggerRef = useMergeRefs([refs.setReference, isValidElement(trigger) ? triggerElement.props.ref : undefined])

  const reference = cloneElement(triggerElement, getReferenceProps({
    ...triggerElement.props,
    'id': (triggerElement.props.id as string | undefined) ?? triggerId,
    'ref': triggerRef,
    'aria-haspopup': 'menu',
    'aria-expanded': open,
    'aria-controls': open ? menuId : undefined,
  } as HTMLProps<Element>))

  let index = -1
  const rows = items.map((entry) => {
    if (entry.type === 'separator') {
      return <div key={entry.key} role='separator' className='-mx-1 my-1 h-px bg-lake-line' />
    }
    if (entry.type === 'label') {
      return (
        <div key={entry.key} role='presentation' className='px-2.5 pb-1 pt-2 text-xs font-medium text-lake-fg-subtle'>
          {entry.label}
        </div>
      )
    }

    const itemIndex = ++index
    const disabled = !!entry.disabled
    const select = () => {
      if (disabled) return
      entry.onSelect?.()
      setOpen(false)
    }
    const common = {
      'ref': (node: HTMLElement | null) => {
        listRef.current[itemIndex] = node
      },
      'tabIndex': activeIndex === itemIndex ? 0 : -1,
      'aria-disabled': disabled || undefined,
    }

    if (entry.type === 'radio') {
      return (
        <button
          key={entry.key}
          type='button'
          role='menuitemradio'
          aria-checked={entry.checked}
          className={menuItemClasses()}
          {...getItemProps({ ...common, onClick: select })}
        >
          <span aria-hidden='true' className='inline-flex size-4 shrink-0 items-center justify-center text-lake-accent-text'>
            {entry.checked && <Check className='size-4' />}
          </span>
          <span className='flex-1'>{entry.label}</span>
        </button>
      )
    }

    const content = (
      <>
        {entry.icon && <span aria-hidden='true' className='inline-flex shrink-0 opacity-80'>{entry.icon}</span>}
        <span className='flex-1'>{entry.label}</span>
        {entry.shortcut && <span className='ml-4 text-xs tracking-wide text-lake-fg-subtle'>{entry.shortcut}</span>}
      </>
    )

    if (entry.render) {
      const render = entry.render as ReactElement<Record<string, unknown>>
      const ownClick = render.props.onClick as ((event: MouseEvent<HTMLElement>) => void) | undefined
      return cloneElement(render, {
        key: entry.key,
        role: 'menuitem',
        className: cn(menuItemClasses(entry.tone), render.props.className as string | undefined),
        children: content,
        ...getItemProps({
          ...common,
          onClick(event: MouseEvent<HTMLElement>) {
            if (disabled) {
              event.preventDefault()
              return
            }
            ownClick?.(event)
            select()
          },
          onKeyDown(event: KeyboardEvent<HTMLElement>) {
            // Links activate on Enter only; menu items also activate on Space.
            if (event.key === ' ') {
              event.preventDefault()
              event.currentTarget.click()
            }
          },
        }),
      })
    }

    return (
      <button
        key={entry.key}
        type='button'
        role='menuitem'
        className={menuItemClasses(entry.tone)}
        {...getItemProps({ ...common, onClick: select })}
      >
        {content}
      </button>
    )
  })

  const panel = open && (
    <FloatingFocusManager context={context} modal={false} initialFocus={-1} returnFocus>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className={cn(
          'z-50 flex min-w-44 flex-col overflow-y-auto rounded-lake-control border border-lake-line bg-lake-surface-raised p-1',
          'text-lake-fg shadow-lake-overlay outline-none animate-in fade-in-0 zoom-in-95 motion-reduce:animate-none',
          className,
        )}
        {...getFloatingProps()}
      >
        {header && <div className='-mx-1 -mt-1 mb-1 border-b border-lake-line px-3 py-2.5'>{header}</div>}
        <div
          id={menuId}
          role='menu'
          aria-orientation='vertical'
          aria-label={label}
          aria-labelledby={label ? undefined : ((triggerElement.props.id as string | undefined) ?? triggerId)}
          className='flex flex-col'
        >
          {rows}
        </div>
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

export default Menu
