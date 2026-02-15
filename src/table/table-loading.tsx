import { cn } from '@/utils/cn'
import type { TableLoadingProps } from './types'

function TableLoading({ className, colSpan }: TableLoadingProps) {
  return (
    <tr>
      <td colSpan={colSpan} className={cn('px-3 py-4 sm:px-4 sm:py-8 text-center', className)}>
        <div className='flex items-center justify-center'>
          <div className='h-6 w-6 animate-spin rounded-full border-2 border-gray-300 dark:border-gray-700 border-t-blue-500' />
        </div>
      </td>
    </tr>
  )
}

export default TableLoading
