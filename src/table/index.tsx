'use client'

import { cn } from '@/utils/cn'
import { ChevronDown, ChevronUp } from 'lucide-react'
import TableEmpty from './table-empty'
import TableEnd from './table-end'
import TableLoadMore from './table-load-more'
import TableLoading from './table-loading'
import type { Column, TableProps } from './types'

const variantClasses = {
  default: {
    table: 'bg-lake-surface',
    header: 'bg-lake-surface-muted',
    row: 'hover:bg-lake-surface-muted/60',
    border: 'border-lake-line',
  },
  bordered: {
    table: 'bg-lake-surface border-2',
    header: 'bg-lake-surface-muted',
    row: 'hover:bg-lake-surface-muted border',
    border: 'border-lake-line-strong',
  },
  striped: {
    table: 'bg-lake-surface',
    header: 'bg-gradient-to-r from-lake-surface-muted to-lake-line/50',
    row: 'odd:bg-lake-surface-muted/60 even:bg-lake-surface hover:bg-lake-accent-soft/50',
    border: 'border-lake-line',
  },
  glass: {
    table: 'bg-lake-surface/60 backdrop-blur-lake',
    header: 'bg-lake-surface/40',
    row: 'hover:bg-lake-surface-muted/60',
    border: 'border-lake-line/50',
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
  endMessage,
  loadingLabel,
  variant = 'default',
  total,
  hasMore,
  onLoadMore,
  loadingMore,
  rowKey,
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
      <div className={cn('overflow-x-auto rounded-lake-control border', styles.border)}>
        <table className={cn('w-full', styles.table)}>
          <thead className={styles.header}>
            <tr>
              {columns.map(column => (
                <th
                  key={column.key as string}
                  className={cn(
                    'px-3 py-2 sm:px-4 sm:py-3 text-left text-xs sm:text-sm font-semibold text-lake-fg-muted',
                    column.sortable && 'cursor-pointer select-none hover:bg-lake-surface-muted outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lake-ring',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right',
                    column.width,
                  )}
                  style={{ width: column.width }}
                  aria-sort={column.sortable
                    ? sortKey === column.key ? (sortDirection === 'desc' ? 'descending' : 'ascending') : 'none'
                    : undefined}
                  tabIndex={column.sortable && onSort ? 0 : undefined}
                  onClick={() => handleSort(column)}
                  onKeyDown={(event) => {
                    if (event.key !== 'Enter' && event.key !== ' ') return
                    event.preventDefault()
                    handleSort(column)
                  }}
                >
                  <div className='flex items-center gap-1'>
                    {column.header}
                    {column.sortable && (
                      <span className='ml-1 inline-flex flex-col'>
                        <ChevronUp
                          aria-hidden='true'
                          className={cn(
                            'h-3 w-3 -mb-1',
                            sortKey === column.key && sortDirection === 'asc'
                              ? 'text-lake-accent'
                              : 'text-lake-fg-subtle/60',
                          )}
                        />
                        <ChevronDown
                          aria-hidden='true'
                          className={cn(
                            'h-3 w-3',
                            sortKey === column.key && sortDirection === 'desc'
                              ? 'text-lake-accent'
                              : 'text-lake-fg-subtle/60',
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
                  <TableLoading colSpan={columns.length} label={loadingLabel} />
                )
              : data.length === 0
                ? (
                    <TableEmpty colSpan={columns.length} message={emptyMessage} />
                  )
                : (
                    data.map((row, rowIndex) => (
                      <tr
                        key={rowKey ? rowKey(row, rowIndex) : rowIndex}
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
                              'px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm text-lake-fg-muted',
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
        <TableLoadMore onLoadMore={onLoadMore} loading={loadingMore} label={loadingLabel} />
      )}
      {!loading && data.length > 0 && hasMore === false && (
        <TableEnd total={total} message={endMessage} />
      )}
    </div>
  )
}

export default Table
export { TableEmpty, TableEnd, TableLoadMore, TableLoading }
export type { Column, TableProps } from './types'
