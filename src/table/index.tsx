import { cn } from '@/utils/cn'
import { ChevronDown, ChevronUp } from 'lucide-react'
import React from 'react'

interface Column<T> {
  key: keyof T | string
  header: string | React.ReactNode
  render?: (value: any, row: T) => React.ReactNode
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  className?: string
  onSort?: (key: string, direction: 'asc' | 'desc') => void
  sortKey?: string
  sortDirection?: 'asc' | 'desc'
  loading?: boolean
  emptyMessage?: string
  variant?: 'default' | 'bordered' | 'striped'
}

function Table<T extends Record<string, any>>({
  data,
  columns,
  className,
  onSort,
  sortKey,
  sortDirection,
  loading,
  emptyMessage = 'No data available',
  variant = 'default'
}: TableProps<T>) {
  const handleSort = (column: Column<T>) => {
    if (!column.sortable || !onSort) return
    
    const key = column.key as string
    const newDirection = sortKey === key && sortDirection === 'asc' ? 'desc' : 'asc'
    onSort(key, newDirection)
  }

  const variantClasses = {
    default: {
      table: 'bg-white dark:bg-gray-900',
      header: 'bg-gray-50 dark:bg-gray-800',
      row: 'hover:bg-gray-50/50 dark:hover:bg-gray-800/50',
      border: 'border-gray-200 dark:border-gray-700'
    },
    bordered: {
      table: 'bg-white dark:bg-gray-900 border-2',
      header: 'bg-gray-100 dark:bg-gray-800',
      row: 'hover:bg-gray-50 dark:hover:bg-gray-800/50 border',
      border: 'border-gray-300 dark:border-gray-600'
    },
    striped: {
      table: 'bg-white dark:bg-gray-900',
      header: 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850',
      row: 'odd:bg-gray-50/30 even:bg-white hover:bg-blue-50/30 dark:odd:bg-gray-800/30 dark:even:bg-gray-900 dark:hover:bg-gray-700/50',
      border: 'border-gray-200 dark:border-gray-700'
    }
  }

  const styles = variantClasses[variant]

  return (
    <div className={cn('w-full overflow-x-auto rounded-lg border', styles.border, className)}>
      <table className={cn('w-full', styles.table)}>
        <thead className={styles.header}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key as string}
                className={cn(
                  'px-4 py-3 text-left text-sm font-semibold text-gray-700 dark:text-gray-300',
                  column.sortable && 'cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-700',
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right',
                  column.width
                )}
                style={{ width: column.width }}
                onClick={() => handleSort(column)}
              >
                <div className="flex items-center gap-1">
                  {column.header}
                  {column.sortable && (
                    <span className="ml-1 inline-flex flex-col">
                      <ChevronUp 
                        className={cn(
                          'h-3 w-3 -mb-1',
                          sortKey === column.key && sortDirection === 'asc' 
                            ? 'text-blue-500' 
                            : 'text-gray-400'
                        )} 
                      />
                      <ChevronDown 
                        className={cn(
                          'h-3 w-3',
                          sortKey === column.key && sortDirection === 'desc' 
                            ? 'text-blue-500' 
                            : 'text-gray-400'
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
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-8 text-center">
                <div className="flex items-center justify-center">
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
                </div>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td 
                colSpan={columns.length} 
                className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  'transition-colors',
                  styles.row,
                  variant === 'bordered' && styles.border
                )}
              >
                {columns.map((column) => (
                  <td
                    key={column.key as string}
                    className={cn(
                      'px-4 py-3 text-sm text-gray-700 dark:text-gray-300',
                      column.align === 'center' && 'text-center',
                      column.align === 'right' && 'text-right'
                    )}
                  >
                    {column.render 
                      ? column.render(row[column.key as keyof T], row)
                      : row[column.key as keyof T]
                    }
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Table