import React from 'react'

export interface Column<T> {
  key: keyof T | string
  header: string | React.ReactNode
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  render?: (value: any, row: T) => React.ReactNode
  sortable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
}

export interface TableProps<T> {
  data: T[]
  columns: Column<T>[]
  className?: string
  onSort?: (key: string, direction: 'asc' | 'desc') => void
  sortKey?: string
  sortDirection?: 'asc' | 'desc'
  loading?: boolean
  emptyMessage?: string | React.ReactNode
  /** Message once every row is loaded. Defaults to "All {total} items loaded" or "No more data". */
  endMessage?: string | React.ReactNode
  /** Accessible label of the loading spinners. */
  loadingLabel?: string
  variant?: 'default' | 'bordered' | 'striped' | 'glass'
  total?: number
  hasMore?: boolean
  onLoadMore?: () => void
  loadingMore?: boolean
  /** Stable React key for each row. Falls back to the row index. */
  rowKey?: (row: T, index: number) => React.Key
}

export interface TableLoadingProps {
  className?: string
  colSpan: number
  /** Accessible label of the spinner. */
  label?: string
}

export interface TableEmptyProps {
  message?: string | React.ReactNode
  className?: string
  colSpan: number
}

export interface TableEndProps {
  message?: string | React.ReactNode
  className?: string
  total?: number
}

export interface TableLoadMoreProps {
  onLoadMore: () => void
  loading?: boolean
  className?: string
  /** Accessible label of the spinner. */
  label?: string
}
