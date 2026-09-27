import { cloneElement } from 'react'
import type { ReactElement, ReactNode } from 'react'
import { tabClasses, tabContent, tabListClasses, type TabsSize, type TabsVariant } from '@/tabs/shared'
import { cn } from '@/utils/cn'

export interface NavTabItem {
  key: string
  label: ReactNode
  icon?: ReactNode
  count?: number
  active: boolean
  /** The link to render, e.g. `<Link href='/books' />`. */
  render: ReactElement<{ className?: string, children?: ReactNode }>
}

export interface NavTabsProps {
  'items': NavTabItem[]
  'variant'?: TabsVariant
  'size'?: TabsSize
  'aria-label': string
  'className'?: string
}

/** Route-driven tabs: a `<nav>` of links with `aria-current="page"` on the active one. */
function NavTabs({ items, variant = 'underline', size = 'md', 'aria-label': ariaLabel, className }: NavTabsProps) {
  return (
    <nav aria-label={ariaLabel} className={cn(tabListClasses(variant), className)}>
      {items.map((item) => {
        const props: Record<string, unknown> = {
          key: item.key,
          className: tabClasses(variant, size, item.active, item.render.props.className),
          children: tabContent({ ...item, active: item.active }),
        }
        if (item.active) props['aria-current'] = 'page'
        return cloneElement(item.render, props)
      })}
    </nav>
  )
}

export default NavTabs
