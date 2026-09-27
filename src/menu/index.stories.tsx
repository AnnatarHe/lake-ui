import type { Meta, StoryObj } from '@storybook/react-vite'
import { Copy, MoreHorizontal, Pencil, Share2, Trash2 } from 'lucide-react'
import { useState } from 'react'
import Avatar from '../avatar'
import Button from '../button'
import IconButton from '../icon-button'
import Menu from './index'

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Menu>

export const Default: Story = {
  render: () => (
    <div className='flex justify-center p-10'>
      <Menu
        trigger={<IconButton label='Clipping actions' icon={<MoreHorizontal className='size-4' />} />}
        items={[
          { key: 'edit', label: 'Edit', icon: <Pencil className='size-4' />, shortcut: 'E' },
          { key: 'copy', label: 'Copy text', icon: <Copy className='size-4' />, shortcut: '⌘C' },
          { key: 'share', label: 'Share', icon: <Share2 className='size-4' />, disabled: true },
          { type: 'separator', key: 'sep' },
          { key: 'delete', label: 'Delete', icon: <Trash2 className='size-4' />, tone: 'danger' },
        ]}
      />
    </div>
  ),
}

export const WithHeaderAndRadio: Story = {
  render: () => {
    const [sort, setSort] = useState('recent')
    return (
      <div className='flex justify-center p-10'>
        <Menu
          trigger={<Button variant='ghost' leadingIcon={<Avatar name='Ada Lovelace' size='xs' />}>Ada</Button>}
          header={(
            <div className='text-sm'>
              <p className='font-medium text-lake-fg'>Ada Lovelace</p>
              <p className='text-xs text-lake-fg-subtle'>ada@example.com</p>
            </div>
          )}
          items={[
            { type: 'label', key: 'sort-label', label: 'Sort clippings' },
            { type: 'radio', key: 'recent', label: 'Most recent', checked: sort === 'recent', onSelect: () => setSort('recent') },
            { type: 'radio', key: 'book', label: 'By book', checked: sort === 'book', onSelect: () => setSort('book') },
            { type: 'separator', key: 'sep' },
            { key: 'profile', label: 'Profile', render: <a href='#profile' /> },
            { key: 'signout', label: 'Sign out' },
          ]}
        />
      </div>
    )
  },
}
