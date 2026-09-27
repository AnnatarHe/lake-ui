import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import Tabs, { TabPanel } from './index'

const meta: Meta<typeof Tabs> = {
  title: 'Navigation/Tabs',
  component: Tabs,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Tabs>

type View = 'highlights' | 'notes' | 'bookmarks' | 'export'
const items = [
  { value: 'highlights' as const, label: 'Highlights', count: 128 },
  { value: 'notes' as const, label: 'Notes', count: 12 },
  { value: 'bookmarks' as const, label: 'Bookmarks' },
  { value: 'export' as const, label: 'Export', disabled: true },
]

function Example({ variant, activation }: { variant?: 'underline' | 'pill', activation?: 'auto' | 'manual' }) {
  const [value, setValue] = useState<View>('highlights')
  return (
    <div className='max-w-xl space-y-4'>
      <Tabs items={items} value={value} onValueChange={setValue} aria-label='Book sections' idBase='book' variant={variant} activation={activation} />
      {items.map(item => (
        <TabPanel key={item.value} idBase='book' value={item.value} activeValue={value} className='text-sm text-lake-fg-muted'>
          {`The ${item.value} of this book.`}
        </TabPanel>
      ))}
    </div>
  )
}

export const Underline: Story = { render: () => <Example /> }

export const Pill: Story = { render: () => <Example variant='pill' /> }

export const ManualActivation: Story = { render: () => <Example activation='manual' /> }
