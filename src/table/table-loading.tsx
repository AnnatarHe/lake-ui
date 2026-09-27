import { cn } from '@/utils/cn'
import type { TableLoadingProps } from './types'

function TableLoading({ className, colSpan, label = 'Loading' }: TableLoadingProps) {
  return (
    <tr>
      <td colSpan={colSpan} className={cn('px-3 py-4 sm:px-4 sm:py-8 text-center', className)}>
        <div className='flex items-center justify-center' role='status'>
          <div className='h-6 w-6 animate-spin rounded-full border-2 border-lake-line-strong border-t-lake-accent' aria-hidden='true' />
          <span className='sr-only'>{label}</span>
        </div>
      </td>
    </tr>
  )
}

export default TableLoading
