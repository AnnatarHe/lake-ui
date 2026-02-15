import type { Meta, StoryObj } from '@storybook/react-vite'
import { useCallback, useState } from 'react'
import Table from './index'
import type { Column } from './types'

interface User {
  id: number
  name: string
  email: string
  role: string
}

const columns: Column<User>[] = [
  { key: 'id', header: 'ID', width: '60px' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
  { key: 'role', header: 'Role' },
]

const sortableColumns: Column<User>[] = columns.map(col => ({
  ...col,
  sortable: col.key !== 'email',
}))

const sampleData: User[] = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 2 === 0 ? 'Admin' : 'Member',
}))

const meta: Meta<typeof Table<User>> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Table<User>>

export const Default: Story = {
  args: {
    data: sampleData,
    columns,
  },
}

export const Bordered: Story = {
  args: {
    data: sampleData,
    columns,
    variant: 'bordered',
  },
}

export const Striped: Story = {
  args: {
    data: sampleData,
    columns,
    variant: 'striped',
  },
}

export const Glass: Story = {
  args: {
    data: sampleData,
    columns,
    variant: 'glass',
  },
  decorators: [
    Story => (
      <div className='bg-gradient-to-br from-purple-500 to-blue-600 p-8 rounded-lg'>
        <Story />
      </div>
    ),
  ],
}

export const WithSorting: Story = {
  args: {
    data: sampleData,
    columns: sortableColumns,
    sortKey: 'id',
    sortDirection: 'asc',
  },
}

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    columns,
    emptyMessage: 'No users found',
  },
}

function InfiniteScrollDemo() {
  const [items, setItems] = useState<User[]>(sampleData)
  const [loadingMore, setLoadingMore] = useState(false)
  const [hasMore, setHasMore] = useState(true)

  const onLoadMore = useCallback(() => {
    if (loadingMore) return
    setLoadingMore(true)
    setTimeout(() => {
      setItems((prev) => {
        const next = Array.from({ length: 5 }, (_, i) => ({
          id: prev.length + i + 1,
          name: `User ${prev.length + i + 1}`,
          email: `user${prev.length + i + 1}@example.com`,
          role: (prev.length + i) % 2 === 0 ? 'Admin' : 'Member',
        }))
        const allItems = [...prev, ...next]
        if (allItems.length >= 30) {
          setHasMore(false)
        }
        return allItems
      })
      setLoadingMore(false)
    }, 1000)
  }, [loadingMore])

  return (
    <Table
      data={items}
      columns={columns}
      hasMore={hasMore}
      onLoadMore={onLoadMore}
      loadingMore={loadingMore}
      total={30}
    />
  )
}

export const InfiniteScroll: Story = {
  render: () => <InfiniteScrollDemo />,
}

export const InfiniteScrollEnd: Story = {
  args: {
    data: sampleData,
    columns,
    hasMore: false,
    total: 5,
  },
}

export const DarkMode: Story = {
  args: {
    data: sampleData,
    columns: sortableColumns,
    sortKey: 'id',
    sortDirection: 'asc',
  },
  decorators: [
    Story => (
      <div className='dark bg-gray-950 p-8 rounded-lg'>
        <Story />
      </div>
    ),
  ],
}
