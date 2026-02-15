import { cn } from '@/utils/cn'
import useInViewport from '@/hooks/useInViewport'
import type { TableLoadMoreProps } from './types'

function TableLoadMore({ onLoadMore, loading, className }: TableLoadMoreProps) {
  const sentinelRef = useInViewport(onLoadMore, { rootMargin: '200px' })

  return (
    <div
      ref={sentinelRef}
      className={cn('flex items-center justify-center py-4', className)}
    >
      {loading && (
        <div className='h-5 w-5 animate-spin rounded-full border-2 border-gray-300 dark:border-gray-700 border-t-blue-500' />
      )}
    </div>
  )
}

export default TableLoadMore
