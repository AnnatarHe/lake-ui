import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import Tabs, { TabPanel } from './index'

type View = 'books' | 'clips' | 'notes' | 'archive'

const items = [
  { value: 'books' as const, label: 'Books', count: 3 },
  { value: 'clips' as const, label: 'Clippings' },
  { value: 'notes' as const, label: 'Notes', disabled: true },
  { value: 'archive' as const, label: 'Archive' },
]

function Example({ activation, onChange }: { activation?: 'auto' | 'manual', onChange?: (value: View) => void }) {
  const [value, setValue] = useState<View>('books')
  return (
    <>
      <Tabs
        items={items}
        value={value}
        onValueChange={(next) => {
          onChange?.(next)
          setValue(next)
        }}
        aria-label='Library'
        idBase='library'
        activation={activation}
      />
      {items.map(item => (
        <TabPanel key={item.value} idBase='library' value={item.value} activeValue={value}>
          {`${item.value} panel`}
        </TabPanel>
      ))}
    </>
  )
}

describe('Tabs', () => {
  it('implements the tabs pattern with linked panels', () => {
    render(<Example />)
    expect(screen.getByRole('tablist', { name: 'Library' })).toBeInTheDocument()
    const books = screen.getByRole('tab', { name: 'Books 3' })
    expect(books).toHaveAttribute('aria-selected', 'true')
    expect(books).toHaveAttribute('tabindex', '0')
    expect(screen.getByRole('tab', { name: 'Clippings' })).toHaveAttribute('tabindex', '-1')
    const panel = screen.getByRole('tabpanel', { name: 'Books 3' })
    expect(books).toHaveAttribute('aria-controls', panel.id)
    expect(panel).toHaveTextContent('books panel')
    expect(screen.queryByText('clips panel')).not.toBeInTheDocument()
  })

  it('moves and selects with arrow keys, skipping disabled tabs and wrapping', async () => {
    const user = userEvent.setup()
    render(<Example />)
    await user.click(screen.getByRole('tab', { name: 'Books 3' }))
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Clippings' })).toHaveFocus()
    expect(screen.getByRole('tab', { name: 'Clippings' })).toHaveAttribute('aria-selected', 'true')
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Archive' })).toHaveFocus()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Books 3' })).toHaveFocus()
    await user.keyboard('{End}')
    expect(screen.getByRole('tab', { name: 'Archive' })).toHaveAttribute('aria-selected', 'true')
    await user.keyboard('{Home}{ArrowLeft}')
    expect(screen.getByRole('tab', { name: 'Archive' })).toHaveFocus()
  })

  it('waits for Enter in manual activation', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<Example activation='manual' onChange={onChange} />)
    await user.click(screen.getByRole('tab', { name: 'Books 3' }))
    onChange.mockClear()
    await user.keyboard('{ArrowRight}')
    expect(screen.getByRole('tab', { name: 'Clippings' })).toHaveFocus()
    expect(onChange).not.toHaveBeenCalled()
    await user.keyboard('{Enter}')
    expect(onChange).toHaveBeenCalledWith('clips')
  })

  it('keeps inactive panels mounted when asked', () => {
    render(
      <TabPanel idBase='x' value='a' activeValue='b' keepMounted>
        Hidden content
      </TabPanel>,
    )
    expect(screen.getByText('Hidden content')).not.toBeVisible()
  })

  it('supports the pill variant without panel links', () => {
    render(<Tabs items={items} value='books' onValueChange={vi.fn()} aria-label='Filter' variant='pill' size='sm' />)
    const tab = screen.getByRole('tab', { name: 'Books 3' })
    expect(tab).toHaveClass('rounded-full', 'h-7')
    expect(tab).not.toHaveAttribute('aria-controls')
  })
})
