import { render, screen } from '@testing-library/react'
import type { ReactElement } from 'react'
import { describe, expect, it } from 'vitest'
import NavTabs from './index'

const items = [
  { key: 'books', label: 'Books', count: 12, active: true, render: <a href='/books' /> },
  { key: 'clips', label: 'Clippings', icon: <svg data-testid='icon' />, active: false, render: <a href='/clips' className='extra' /> },
]

describe('NavTabs', () => {
  it('renders a labelled nav of links with aria-current on the active one', () => {
    render(<NavTabs items={items} aria-label='Library' />)
    const nav = screen.getByRole('navigation', { name: 'Library' })
    const books = screen.getByRole('link', { name: 'Books 12' })
    expect(nav).toContainElement(books)
    expect(books).toHaveAttribute('aria-current', 'page')
    expect(books).toHaveAttribute('href', '/books')
    expect(books).toHaveClass('text-lake-fg')
    const clips = screen.getByRole('link', { name: 'Clippings' })
    expect(clips).not.toHaveAttribute('aria-current')
    expect(clips).toHaveClass('extra', 'text-lake-fg-muted')
  })

  it('supports the pill variant', () => {
    render(<NavTabs items={items} aria-label='Library' variant='pill' />)
    expect(screen.getByRole('link', { name: 'Books 12' })).toHaveClass('rounded-full', 'bg-lake-accent-soft')
  })

  it('adds no function props (server safe)', () => {
    const element = NavTabs({ 'items': items, 'aria-label': 'Library' }) as ReactElement<{ children: ReactElement<Record<string, unknown>>[] }>
    for (const link of element.props.children) {
      expect(Object.values(link.props).some(value => typeof value === 'function')).toBe(false)
    }
  })
})
