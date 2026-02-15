import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import useInViewport from '../hooks/useInViewport'
import Table from './index'
import TableEmpty from './table-empty'
import TableEnd from './table-end'
import TableLoadMore from './table-load-more'
import TableLoading from './table-loading'
import type { Column } from './types'

interface TestRow {
  id: number
  name: string
  email: string
}

const columns: Column<TestRow>[] = [
  { key: 'id', header: 'ID' },
  { key: 'name', header: 'Name' },
  { key: 'email', header: 'Email' },
]

const data: TestRow[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' },
  { id: 3, name: 'Charlie', email: 'charlie@example.com' },
]

describe('Table', () => {
  afterEach(() => {
    cleanup()
  })

  it('renders headers correctly', () => {
    render(<Table data={data} columns={columns} />)
    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('renders rows correctly', () => {
    render(<Table data={data} columns={columns} />)
    expect(screen.getByText('Alice')).toBeInTheDocument()
    expect(screen.getByText('bob@example.com')).toBeInTheDocument()
    expect(screen.getByText('Charlie')).toBeInTheDocument()
  })

  it('renders loading state', () => {
    render(<Table data={[]} columns={columns} loading />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
  })

  it('renders empty state with default message', () => {
    render(<Table data={[]} columns={columns} />)
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('renders empty state with custom string message', () => {
    render(<Table data={[]} columns={columns} emptyMessage='Nothing here' />)
    expect(screen.getByText('Nothing here')).toBeInTheDocument()
  })

  it('renders empty state with custom ReactNode message', () => {
    render(
      <Table
        data={[]}
        columns={columns}
        emptyMessage={<span data-testid='custom-empty'>Custom empty</span>}
      />,
    )
    expect(screen.getByTestId('custom-empty')).toBeInTheDocument()
  })

  it('handles sorting', () => {
    const onSort = vi.fn()
    const sortableColumns: Column<TestRow>[] = [
      { key: 'id', header: 'ID', sortable: true },
      { key: 'name', header: 'Name', sortable: true },
      { key: 'email', header: 'Email' },
    ]

    render(
      <Table
        data={data}
        columns={sortableColumns}
        onSort={onSort}
        sortKey='id'
        sortDirection='asc'
      />,
    )

    fireEvent.click(screen.getByText('ID'))
    expect(onSort).toHaveBeenCalledWith('id', 'desc')

    fireEvent.click(screen.getByText('Name'))
    expect(onSort).toHaveBeenCalledWith('name', 'asc')
  })

  it('renders with default variant', () => {
    const { container } = render(<Table data={data} columns={columns} />)
    const table = container.querySelector('table')
    expect(table).toHaveClass('bg-white')
  })

  it('renders with bordered variant', () => {
    const { container } = render(<Table data={data} columns={columns} variant='bordered' />)
    const table = container.querySelector('table')
    expect(table).toHaveClass('border-2')
  })

  it('renders with striped variant', () => {
    const { container } = render(<Table data={data} columns={columns} variant='striped' />)
    const thead = container.querySelector('thead')
    expect(thead).toHaveClass('bg-gradient-to-r')
  })

  it('renders with glass variant', () => {
    const { container } = render(<Table data={data} columns={columns} variant='glass' />)
    const table = container.querySelector('table')
    expect(table).toHaveClass('backdrop-blur-sm')
  })

  it('renders custom column renderer', () => {
    const customColumns: Column<TestRow>[] = [
      { key: 'id', header: 'ID' },
      {
        key: 'name',
        header: 'Name',
        render: value => <strong data-testid='bold-name'>{value}</strong>,
      },
    ]

    render(<Table data={data} columns={customColumns} />)
    const boldNames = screen.getAllByTestId('bold-name')
    expect(boldNames).toHaveLength(3)
  })

  it('renders TableEnd when hasMore is false', () => {
    render(<Table data={data} columns={columns} hasMore={false} />)
    expect(screen.getByText('No more data')).toBeInTheDocument()
  })

  it('renders TableEnd with total count', () => {
    render(<Table data={data} columns={columns} hasMore={false} total={3} />)
    expect(screen.getByText('All 3 items loaded')).toBeInTheDocument()
  })

  it('renders TableLoadMore when hasMore and onLoadMore provided', () => {
    const onLoadMore = vi.fn()
    const { container } = render(
      <Table data={data} columns={columns} hasMore onLoadMore={onLoadMore} loadingMore />,
    )
    const spinners = container.querySelectorAll('.animate-spin')
    expect(spinners.length).toBeGreaterThan(0)
  })

  it('does not render footer when loading', () => {
    render(<Table data={[]} columns={columns} loading hasMore={false} />)
    expect(screen.queryByText('No more data')).not.toBeInTheDocument()
  })

  it('does not render footer when data is empty', () => {
    render(<Table data={[]} columns={columns} hasMore={false} />)
    expect(screen.queryByText('No more data')).not.toBeInTheDocument()
  })
})

describe('TableLoading', () => {
  it('renders spinner with correct colspan', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableLoading colSpan={3} />
        </tbody>
      </table>,
    )
    const td = container.querySelector('td')
    expect(td).toHaveAttribute('colspan', '3')
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableLoading colSpan={2} className='custom-class' />
        </tbody>
      </table>,
    )
    const td = container.querySelector('td')
    expect(td).toHaveClass('custom-class')
  })
})

describe('TableEmpty', () => {
  it('renders default message', () => {
    render(
      <table>
        <tbody>
          <TableEmpty colSpan={3} />
        </tbody>
      </table>,
    )
    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('renders custom string message', () => {
    render(
      <table>
        <tbody>
          <TableEmpty colSpan={3} message='Empty!' />
        </tbody>
      </table>,
    )
    expect(screen.getByText('Empty!')).toBeInTheDocument()
  })

  it('renders custom ReactNode message', () => {
    render(
      <table>
        <tbody>
          <TableEmpty
            colSpan={3}
            message={<span data-testid='custom'>Custom</span>}
          />
        </tbody>
      </table>,
    )
    expect(screen.getByTestId('custom')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(
      <table>
        <tbody>
          <TableEmpty colSpan={2} className='my-class' />
        </tbody>
      </table>,
    )
    const td = container.querySelector('td')
    expect(td).toHaveClass('my-class')
  })
})

describe('TableEnd', () => {
  it('renders default message without total', () => {
    render(<TableEnd />)
    expect(screen.getByText('No more data')).toBeInTheDocument()
  })

  it('renders message with total', () => {
    render(<TableEnd total={42} />)
    expect(screen.getByText('All 42 items loaded')).toBeInTheDocument()
  })

  it('renders custom message', () => {
    render(<TableEnd message='End of list' />)
    expect(screen.getByText('End of list')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    const { container } = render(<TableEnd className='end-class' />)
    const div = container.firstElementChild
    expect(div).toHaveClass('end-class')
  })
})

describe('TableLoadMore', () => {
  let mockObserverInstances: { observe: ReturnType<typeof vi.fn>, disconnect: ReturnType<typeof vi.fn>, callback: IntersectionObserverCallback }[]

  beforeEach(() => {
    mockObserverInstances = []
    vi.stubGlobal('IntersectionObserver', vi.fn((callback: IntersectionObserverCallback) => {
      const instance = {
        observe: vi.fn(),
        disconnect: vi.fn(),
        callback,
      }
      mockObserverInstances.push(instance)
      return instance
    }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    cleanup()
  })

  it('renders spinner when loading', () => {
    const onLoadMore = vi.fn()
    const { container } = render(<TableLoadMore onLoadMore={onLoadMore} loading />)
    expect(container.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('does not render spinner when not loading', () => {
    const onLoadMore = vi.fn()
    const { container } = render(<TableLoadMore onLoadMore={onLoadMore} />)
    expect(container.querySelector('.animate-spin')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    const onLoadMore = vi.fn()
    const { container } = render(<TableLoadMore onLoadMore={onLoadMore} className='load-more' />)
    const div = container.firstElementChild
    expect(div).toHaveClass('load-more')
  })

  it('triggers onLoadMore when intersecting', () => {
    const onLoadMore = vi.fn()
    render(<TableLoadMore onLoadMore={onLoadMore} />)

    expect(mockObserverInstances.length).toBe(1)
    expect(mockObserverInstances[0].observe).toHaveBeenCalled()

    mockObserverInstances[0].callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    )

    expect(onLoadMore).toHaveBeenCalledTimes(1)
  })

  it('does not trigger onLoadMore when not intersecting', () => {
    const onLoadMore = vi.fn()
    render(<TableLoadMore onLoadMore={onLoadMore} />)

    mockObserverInstances[0].callback(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    )

    expect(onLoadMore).not.toHaveBeenCalled()
  })
})

describe('useInViewport', () => {
  let mockObserverInstances: { observe: ReturnType<typeof vi.fn>, disconnect: ReturnType<typeof vi.fn>, callback: IntersectionObserverCallback }[]

  beforeEach(() => {
    mockObserverInstances = []
    vi.stubGlobal('IntersectionObserver', vi.fn((callback: IntersectionObserverCallback) => {
      const instance = {
        observe: vi.fn(),
        disconnect: vi.fn(),
        callback,
      }
      mockObserverInstances.push(instance)
      return instance
    }))
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    cleanup()
  })

  function TestComponent({ callback }: { callback: () => void }) {
    const ref = useInViewport(callback)
    return <div ref={ref} data-testid='sentinel' />
  }

  it('creates IntersectionObserver and observes element', () => {
    const callback = vi.fn()
    render(<TestComponent callback={callback} />)

    expect(mockObserverInstances.length).toBe(1)
    expect(mockObserverInstances[0].observe).toHaveBeenCalled()
  })

  it('calls callback when element intersects', () => {
    const callback = vi.fn()
    render(<TestComponent callback={callback} />)

    mockObserverInstances[0].callback(
      [{ isIntersecting: true } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    )

    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('does not call callback when element is not intersecting', () => {
    const callback = vi.fn()
    render(<TestComponent callback={callback} />)

    mockObserverInstances[0].callback(
      [{ isIntersecting: false } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    )

    expect(callback).not.toHaveBeenCalled()
  })
})
