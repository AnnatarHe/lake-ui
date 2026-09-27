import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import MultiSelect from './multi-select'

const options = ['React', 'Vue', 'Svelte']

function Controlled(props: Partial<React.ComponentProps<typeof MultiSelect>>) {
  const [value, setValue] = useState<string[] | string | undefined>(props.value ?? [])
  return <MultiSelect label='Frameworks' options={options} {...props} value={value} onChange={setValue} />
}

describe('MultiSelect', () => {
  it('labels the trigger and never nests buttons', async () => {
    const user = userEvent.setup()
    const { container } = render(<Controlled value={['React']} />)
    const trigger = screen.getByRole('button', { name: /Frameworks/ })
    expect(trigger).toHaveAccessibleName('Frameworks React')
    expect(container.querySelector('button button')).toBeNull()
    await user.click(screen.getByRole('button', { name: 'Clear selection' }))
    expect(screen.getByRole('button', { name: /Frameworks/ })).toHaveAccessibleName('Frameworks Select options...')
  })

  it('filters, toggles options, and uses custom labels', async () => {
    const user = userEvent.setup()
    render(<Controlled searchPlaceholder='Find' noResultsLabel='Nothing' clearLabel='Reset' />)
    await user.click(screen.getByRole('button', { name: /Frameworks/ }))
    const search = screen.getByRole('textbox', { name: 'Find' })
    expect(search).toHaveFocus()
    await user.type(search, 'zzz')
    expect(screen.getByText('Nothing')).toBeInTheDocument()
    await user.clear(search)
    await user.click(screen.getByRole('option', { name: 'Vue' }))
    expect(screen.getByRole('option', { name: 'Vue' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('button', { name: 'Reset' })).toBeInTheDocument()
  })

  it('supports keyboard selection and Escape', async () => {
    const user = userEvent.setup()
    render(<Controlled />)
    const trigger = screen.getByRole('button', { name: /Frameworks/ })
    await user.click(trigger)
    await user.keyboard('{ArrowDown}')
    expect(screen.getByRole('option', { name: 'React' })).toHaveFocus()
    await user.keyboard('{ArrowDown}{Enter}')
    expect(screen.getByRole('option', { name: 'Vue' })).toHaveAttribute('aria-selected', 'true')
    await user.keyboard('{Escape}')
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('returns a single value when maxValues is 1 and shows errors', async () => {
    const user = userEvent.setup()
    const onChange = vi.fn()
    render(<MultiSelect label='One' options={options} maxValues={1} value={undefined} onChange={onChange} error='Required' />)
    const trigger = screen.getByRole('button', { name: /One/ })
    expect(trigger).toHaveAccessibleDescription('Required')
    await user.click(trigger)
    await user.click(screen.getByRole('option', { name: 'Svelte' }))
    expect(onChange).toHaveBeenCalledWith('Svelte')
  })
})
