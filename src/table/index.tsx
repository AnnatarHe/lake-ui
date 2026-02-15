import { cn } from '@/utils/cn'
import { ChevronDown, ChevronUp } from 'lucide-react'
import TableEmpty from './table-empty'
import TableEnd from './table-end'
import TableLoadMore from './table-load-more'
import TableLoading from './table-loading'
import type { Column, TableProps } from './types'

const variantClasses = {
  default: {
    table: 'bg-white dark:bg-gray-900',
    header: 'bg-gray-50 dark:bg-gray-800',
    row: 'hover:bg-gray-50/50 dark:hover:bg-gray-800/50',
    border: 'border-gray-200 dark:border-gray-700',
  },
  bordered: {
    table: 'bg-white dark:bg-gray-900 border-2',
    header: 'bg-gray-100 dark:bg-gray-800',
    row: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border',
    border: 'border-gray-300 dark:border-gray-600',
  },
  striped: {
    table: 'bg-white dark:bg-gray-900',
    header: 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850',
    row: 'odd:bg-gray-50/30 even:bg-white hover:bg-blue-50/30 dark:odd:bg-gray-800/30 dark:even:bg-gray-900 dark:hover:bg-gray-700/50',
    border: 'border-gray-200 dark:border-gray-700',
  },
  glass: {
    table: 'bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm',
    header: 'bg-white/40 dark:bg-gray-800/40',
    row: 'hover:bg-white/30 dark:hover:bg-gray-700/30',
    border: 'border-white/20 dark:border-gray-700/50',
  },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Table<T extends Record<string, any>>({
  data,
  columns,
  className,
  onSort,
  sortKey,
  sortDirection,
  loading,
  emptyMessage = 'No data available',
  variant = 'default',
  total,
  hasMore,
  onLoadMore,
  loadingMore,
}: TableProps<T>) {
  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !onSort) return

    const key = column.key as string
    const newDirection = sortKey === key && sortDirection === 'asc'
      ? 'desc'
      : 'asc'
    onSort(key, newDirection)
  }

  const styles = variantClasses[variant]

  return (
    <div className={cn('w-full', className)}>
      <div className={cn('overflow-x-auto rounded-lg border', styles.border)}>
        <table className={cn('w-full', styles.table)}>
          <thead className={styles.header}>
            <tr>
              {columns.map(column => (
                <th
                  key={column.key as string}
                  className={cn(
                    'px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300',
                    column.sortable && 'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.width,
                  )}
                  style={{ width: column.width }}
                  onClick={() => handleSort(column)}
                >
                  <div className='flex items-center gap-1'>
                    {column.header}
                    {column.sortable && (
                      <span className='ml-1 inline-flex flex-col'>
                        <ChevronUp
                          className={cn(
                            'h-3 w-3 -mb-1',
                            sortKey === column.key && sortDirection === 'asc'
                              ? 'text-blue-500'
                              : 'text-gray-400 dark:text-gray-600',
                          )}
                        />
                        <ChevronDown
                          className={cn(
                            'h-3 w-3',
                            sortKey === column.key && sortDirection === 'desc'
                              ? 'text-blue-500'
                              : 'text-gray-400 dark:text-gray-600',
                          )}
                        />
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading
              ? (
                  <TableLoading colSpan={columns.length} />
                )
              : data.length === 0
                ? (
                    <TableEmpty colSpan={columns.length} message={emptyMessage} />
                  )
                : (
                    data.map((row, rowIndex) => (
                      <tr
                        key={rowIndex}
                        className={cn(
                          'transition-colors',
                          styles.row,
                          variant === 'bordered' && styles.border,
                        )}
                      >
                        {columns.map(column => (
                          <td
                            key={column.key as string}
                            className={cn(
                              'px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-gray-700 dark:text-gray-300',
                              column.align === 'center' && 'text-center',
                              column.align === 'right' && 'text-right',
                            )}
                          >
                            {column.render
                              ? column.render(row[column.key as keyof T], row)
                              : row[column.key as keyof T]}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
          </tbody>
        </table>
      </div>
      {!loading && data.length > 0 && hasMore && onLoadMore && (
        <TableLoadMore onLoadMore={onLoadMore} loading={loadingMore} />
      )}
      {!loading && data.length > 0 && hasMore === false && (
        <TableEnd total={total} />
      )}
    </div>
  )
}

export default Table
export { TableEmpty, TableEnd, TableLoadMore, TableLoading }
export type { Column, TableProps } from './types'
