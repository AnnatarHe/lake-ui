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
  variant?: 'default' | 'bordered' | 'striped' | 'glass'
  total?: number
  hasMore?: boolean
  onLoadMore?: () => void
  loadingMore?: boolean
}

export interface TableLoadingProps {
  className?: string
  colSpan: number
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
}
