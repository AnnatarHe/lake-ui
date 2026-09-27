import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import CheckboxField from './checkbox-field'

const meta: Meta<typeof CheckboxField> = {
  title: 'Form/CheckboxField',
  component: CheckboxField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof CheckboxField>

export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(true)
    return <CheckboxField label='Email me a weekly digest' description='A short summary of what you read.' checked={checked} onChange={setChecked} />
  },
}

export const SelectAll: Story = {
  render: () => {
    const [selected, setSelected] = useState(['walden'])
    const books = ['walden', 'dune', 'emma']
    const all = selected.length === books.length
    return (
      <div className='space-y-2'>
        <CheckboxField
          label='All books'
          checked={all}
          indeterminate={!all && selected.length > 0}
          onChange={() => setSelected(all ? [] : books)}
        />
        <div className='space-y-2 pl-7'>
          {books.map(book => (
            <CheckboxField
              key={book}
              label={book}
              checked={selected.includes(book)}
              onChange={checked => setSelected(current => (checked ? [...current, book] : current.filter(item => item !== book)))}
            />
          ))}
        </div>
      </div>
    )
  },
}

export const WithError: Story = {
  render: () => <CheckboxField label='I accept the terms' error='Please accept to continue' checked={false} onChange={() => {}} />,
}

export const Disabled: Story = {
  render: () => <CheckboxField label='Sync with Kindle' disabled checked onChange={() => {}} />,
}
