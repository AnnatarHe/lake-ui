'use client'

import { cn } from '@/utils/cn'
import useInViewport from '@/hooks/useInViewport'
import type { TableLoadMoreProps } from './types'

function TableLoadMore({ onLoadMore, loading, className, label = 'Loading more' }: TableLoadMoreProps) {
  const sentinelRef = useInViewport(onLoadMore, { rootMargin: '200px' })

  return (
    <div
      ref={sentinelRef}
      className={cn('flex items-center justify-center py-4', className)}
    >
      {loading && (
        <div role='status'>
          <div className='h-5 w-5 animate-spin rounded-full border-2 border-lake-line-strong border-t-lake-accent' aria-hidden='true' />
          <span className='sr-only'>{label}</span>
        </div>
      )}
    </div>
  )
}

export default TableLoadMore
